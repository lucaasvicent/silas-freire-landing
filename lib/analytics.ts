// Camada fina sobre o gtag do GA4. Se o GA não estiver configurado
// (NEXT_PUBLIC_GA_ID vazio), as chamadas viram no-op silenciosamente.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: GtagParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params);
}
