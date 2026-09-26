"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { buildWhatsappLink, whatsappMessages } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";
import { WhatsappIcon } from "./WhatsappIcon";

type Message = { role: "user" | "assistant"; content: string };

const GREETING =
  "Olá! Sou o assistente virtual do escritório Silas Freire Advocacia. Me conte rapidamente o que está acontecendo: eu te ajudo a chegar até o Dr. Silas com o seu caso bem explicado.";

const SUGGESTIONS = [
  "Fui demitido e tenho dúvidas",
  "Preciso de ajuda com pensão alimentícia",
  "Preciso de defesa criminal",
];

const FALLBACK_ERROR =
  "Não consegui responder agora. Você pode falar direto com o Dr. Silas pelo WhatsApp, no botão abaixo.";

const MAX_INPUT = 1000;

// O modelo às vezes devolve markdown ou marcadores de template ({{user}});
// o chat mostra texto puro e sem esses restos.
function cleanText(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^#+\s*/gm, "")
    .replace(/,?\s*\{\{[^}]*\}\}/g, "")
    .replace(/,?\s*\{\{[^}]*$/, "");
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [handingOff, setHandingOff] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const hasUserMessage = messages.some((m) => m.role === "user");

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeChat();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function openChat() {
    setOpen(true);
    trackEvent("chat_open");
  }

  function closeChat() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  async function send(text: string) {
    const content = text.trim().slice(0, MAX_INPUT);
    if (!content || streaming) return;

    const history: Message[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);
    trackEvent("chat_message_sent", {
      message_index: history.filter((m) => m.role === "user").length,
    });

    const setLastAssistant = (value: string) =>
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", content: value };
        return next;
      });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-30) }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "erro");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setLastAssistant(cleanText(answer));
      }
      if (!answer.trim()) throw new Error("vazio");
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      trackEvent("chat_error", { reason: message.slice(0, 80) });
      setLastAssistant(
        message.startsWith("Muitas mensagens") ? message : FALLBACK_ERROR
      );
    } finally {
      setStreaming(false);
      inputRef.current?.focus();
    }
  }

  async function handoffToWhatsapp() {
    if (handingOff) return;
    setHandingOff(true);
    trackEvent("whatsapp_click", { cta_location: "chat_ia" });

    // A janela é aberta já no clique para não ser barrada pelo bloqueador
    // de pop-ups; o endereço é definido quando o resumo chega.
    const win = window.open("", "_blank");

    let text = whatsappMessages.default;
    try {
      const history = messages.filter((m) => m.content.trim());
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-30), mode: "summary" }),
      });
      const data = await res.json();
      if (res.ok && data.summary) {
        text = `Olá, Dr. Silas. Vim pelo site e fiz a triagem com o assistente virtual:\n\n${cleanText(data.summary)}`;
      }
    } catch {
      // segue com a mensagem padrão
    }

    const url = buildWhatsappLink(text);
    try {
      // Alguns navegadores tratam a aba em branco como outra origem e
      // bloqueiam o acesso a ela; nesse caso, abre na própria aba.
      if (!win || win.closed) throw new Error("sem janela");
      win.location.replace(url);
    } catch {
      try {
        win?.close();
      } catch {
        // ignora
      }
      window.location.href = url;
    } finally {
      setHandingOff(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={openChat}
          aria-label="Abrir assistente virtual"
          className="fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center gap-2 rounded-full border border-brass/60 bg-ink text-ivory shadow-lg transition-transform duration-200 hover:scale-105 lg:bottom-6 lg:right-6 lg:h-auto lg:w-auto lg:px-5 lg:py-3.5"
        >
          <MessageCircle className="h-6 w-6 text-brass-light lg:h-5 lg:w-5" aria-hidden="true" />
          <span className="hidden text-sm font-medium lg:inline">
            Tire sua dúvida
          </span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Assistente virtual Silas Freire Advocacia"
          className="fixed inset-3 z-[60] flex flex-col overflow-hidden rounded-md border border-ink/10 bg-paper shadow-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(600px,calc(100vh-3rem))] sm:w-[380px]"
        >
          <div className="flex items-center justify-between bg-ink px-4 py-3.5 text-ivory">
            <div>
              <p className="font-display text-base leading-tight">
                Assistente virtual
              </p>
              <p className="text-xs text-ivory/60">
                Silas Freire Advocacia
              </p>
            </div>
            <button
              type="button"
              onClick={closeChat}
              aria-label="Fechar assistente"
              className="rounded-sm p-1.5 text-ivory/70 transition-colors hover:text-ivory"
            >
              <X size={20} />
            </button>
          </div>

          <div
            ref={listRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            <Bubble role="assistant" content={GREETING} />
            {messages.map((m, i) => (
              <Bubble
                key={i}
                role={m.role}
                content={m.content}
                pending={streaming && i === messages.length - 1 && !m.content}
              />
            ))}

            {!hasUserMessage && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-ink/15 px-3 py-1.5 text-left text-[0.8rem] text-ink transition-colors hover:border-brass hover:text-brass-dim"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {hasUserMessage && (
            <div className="border-t border-ink/10 px-4 pt-3">
              <button
                type="button"
                onClick={handoffToWhatsapp}
                disabled={streaming || handingOff}
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-brass px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brass-light disabled:opacity-60"
              >
                <WhatsappIcon className="h-4 w-4" />
                {handingOff ? "Preparando resumo..." : "Enviar resumo pelo WhatsApp"}
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 px-4 pb-2 pt-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Sua mensagem
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={MAX_INPUT}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Escreva sua mensagem..."
              className="max-h-28 min-h-[2.75rem] flex-1 resize-none rounded-sm border border-ink/15 bg-white px-3 py-2.5 text-[0.95rem] text-ink placeholder:text-stone-light focus:border-brass focus:outline-none"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              aria-label="Enviar mensagem"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-ink text-ivory transition-opacity disabled:opacity-40"
            >
              <Send size={18} />
            </button>
          </form>

          <p className="px-4 pb-3 text-[0.7rem] leading-snug text-stone-light">
            Assistente automático: não substitui a análise do advogado. Não
            envie CPF, documentos ou dados pessoais sensíveis.
          </p>
        </div>
      )}
    </>
  );
}

function Bubble({
  role,
  content,
  pending = false,
}: Message & { pending?: boolean }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[85%] whitespace-pre-wrap rounded-md px-3.5 py-2.5 text-[0.9rem] leading-relaxed ${
          isUser ? "bg-ink text-ivory" : "bg-paper-dim text-ink"
        }`}
      >
        {pending ? (
          <span className="inline-flex gap-1" aria-label="Digitando">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-stone-light" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-stone-light [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-stone-light [animation-delay:300ms]" />
          </span>
        ) : (
          content
        )}
      </p>
    </div>
  );
}
