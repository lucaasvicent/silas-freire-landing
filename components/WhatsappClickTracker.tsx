"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// Um único listener para todos os links de WhatsApp da página.
// A posição do CTA vem do atributo data-cta de cada link.
export function WhatsappClickTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>('a[href^="https://wa.me/"]');
      if (!link) return;

      trackEvent("whatsapp_click", {
        cta_location: link.dataset.cta ?? "desconhecido",
      });
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
