import { systemPrompt, summaryPrompt } from "@/lib/chat-prompt";

// Padrão: Groq (plano gratuito). Qualquer provedor compatível com a API da
// OpenAI funciona trocando só as variáveis de ambiente.
// A chave só existe no servidor: nunca use NEXT_PUBLIC_ aqui.
const API_KEY = process.env.AI_API_KEY;
const API_URL =
  process.env.AI_API_URL || "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.AI_MODEL || "openai/gpt-oss-120b";
// Usado quando o modelo principal bate no limite do plano gratuito (429).
const FALLBACK_MODEL = process.env.AI_FALLBACK_MODEL || "";

const MAX_MESSAGES = 30;
const MAX_CHARS_PER_MESSAGE = 1200;

// Limite simples por IP para evitar abuso da chave. Em serverless cada
// instância tem sua própria memória, então é um freio, não uma garantia.
const RATE_LIMIT = 20; // requisições
const RATE_WINDOW_MS = 10 * 60 * 1000; // por 10 minutos
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES) {
    return null;
  }

  const messages: ChatMessage[] = [];
  for (const m of raw) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      !m.content.trim() ||
      m.content.length > MAX_CHARS_PER_MESSAGE
    ) {
      return null;
    }
    messages.push({ role: m.role, content: m.content.trim() });
  }
  return messages;
}

// gpt-oss (Groq) raciocina antes de responder e aceita estes parâmetros extras.
function isReasoningModel(model: string) {
  return model.startsWith("openai/gpt-oss");
}

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!API_KEY) {
    return jsonError("Assistente indisponível no momento.", 503);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (isRateLimited(ip)) {
    return jsonError("Muitas mensagens em pouco tempo. Tente novamente em alguns minutos.", 429);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Requisição inválida.", 400);
  }

  const messages = parseMessages(body);
  if (!messages) return jsonError("Requisição inválida.", 400);

  const wantsSummary = (body as { mode?: unknown }).mode === "summary";

  type CallOptions = { model: string; stream: boolean; effort: "low" | "medium" };

  const callModel = ({ model, stream, effort }: CallOptions) =>
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
          ...(wantsSummary ? [{ role: "user", content: summaryPrompt }] : []),
        ],
        temperature: wantsSummary ? 0.2 : 0.5,
        // Modelos de raciocínio gastam tokens "pensando" antes de responder,
        // por isso o limite é maior.
        max_tokens: isReasoningModel(model) ? 1500 : wantsSummary ? 250 : 400,
        ...(isReasoningModel(model)
          ? { reasoning_effort: effort, include_reasoning: false }
          : {}),
        stream,
      }),
    }).catch(() => null);

  // Resposta completa (sem streaming), usada como segunda tentativa.
  const complete = async (model: string) => {
    const res = await callModel({ model, stream: false, effort: "low" });
    if (!res?.ok) return "";
    const data = await res.json().catch(() => null);
    return (data?.choices?.[0]?.message?.content ?? "").trim() as string;
  };

  // "medium" segue melhor o roteiro da triagem; o resumo é simples.
  const primary: CallOptions = {
    model: MODEL,
    stream: !wantsSummary,
    effort: wantsSummary ? "low" : "medium",
  };

  // Plano gratuito: se o modelo principal bater no limite (429), tenta o
  // reserva; se os dois estiverem no limite, espera o tempo indicado pelo
  // provedor (até 8s) e tenta o principal de novo.
  let upstream = await callModel(primary);
  if (upstream?.status === 429 && FALLBACK_MODEL) {
    console.warn(`IA: limite atingido em ${MODEL}, usando ${FALLBACK_MODEL}.`);
    upstream = await callModel({ ...primary, model: FALLBACK_MODEL, effort: "low" });
  }
  if (upstream?.status === 429) {
    const wait = Number(upstream.headers.get("retry-after"));
    if (wait > 0 && wait <= 8) {
      await new Promise((r) => setTimeout(r, wait * 1000));
      upstream = await callModel(primary);
    }
  }

  if (!upstream || !upstream.ok) {
    if (upstream) {
      const detail = await upstream.text().catch(() => "");
      console.error(
        upstream.status === 429
          ? "IA: limite do plano gratuito atingido (429)."
          : upstream.status === 401
            ? "IA: chave inválida (401). Confira AI_API_KEY."
            : `IA: erro ${upstream.status} do provedor.`,
        detail
      );
    }
    return jsonError("Assistente indisponível no momento.", 502);
  }

  const retryModel = FALLBACK_MODEL || MODEL;

  if (wantsSummary) {
    const data = await upstream.json().catch(() => null);
    let summary: string = (data?.choices?.[0]?.message?.content ?? "").trim();
    if (!summary) summary = await complete(retryModel);
    return Response.json({ summary });
  }

  // Converte o SSE do provedor em um stream de texto puro para o widget.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body!.getReader();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      let sent = false;
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") continue;
            try {
              const delta = JSON.parse(payload)?.choices?.[0]?.delta?.content;
              if (delta) {
                controller.enqueue(encoder.encode(delta));
                sent = true;
              }
            } catch {
              // linha parcial ou keep-alive: ignora
            }
          }
        }

        // Às vezes o modelo gasta tudo raciocinando e não escreve nada:
        // tenta mais uma vez, sem streaming, antes de desistir.
        if (!sent) {
          console.warn("IA: resposta vazia, tentando novamente.");
          const text = await complete(retryModel);
          if (text) controller.enqueue(encoder.encode(text));
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
