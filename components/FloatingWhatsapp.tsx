import { buildWhatsappLink, whatsappMessages } from "@/lib/site-data";
import { WhatsappIcon } from "./WhatsappIcon";

export function FloatingWhatsapp() {
  return (
    <a
      href={buildWhatsappLink(whatsappMessages.default)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com Silas Freire Advocacia"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brass text-ink shadow-lg transition-transform duration-200 hover:scale-105 lg:hidden"
    >
      <WhatsappIcon className="h-6 w-6" />
    </a>
  );
}
