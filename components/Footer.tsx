import { MapPin, Phone, Instagram, Clock } from "lucide-react";
import { business, buildWhatsappLink, whatsappMessages } from "@/lib/site-data";

export function Footer() {
  return (
    <footer id="contato" className="bg-ink-soft py-16 text-ivory/80">
      <div className="container-page grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl text-ivory">
            Silas Freire
            <span className="text-brass-light"> Advocacia</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/60">
            Advocacia em Guarulhos-SP, com foco em Direito do Trabalho,
            Direito Criminal, Pensão Alimentícia e Consultoria Jurídica.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <a
            href={buildWhatsappLink(whatsappMessages.default)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 transition-colors hover:text-ivory"
          >
            <Phone size={16} className="text-brass-light" aria-hidden="true" />
            {business.whatsappDisplay}
          </a>
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 transition-colors hover:text-ivory"
          >
            <Instagram
              size={16}
              className="text-brass-light"
              aria-hidden="true"
            />
            {business.instagram}
          </a>
          <p className="flex items-start gap-2.5">
            <Clock
              size={16}
              className="mt-0.5 shrink-0 text-brass-light"
              aria-hidden="true"
            />
            <span>
              Consulte horários de atendimento pelo WhatsApp
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <p className="flex items-start gap-2.5">
            <MapPin
              size={16}
              className="mt-0.5 shrink-0 text-brass-light"
              aria-hidden="true"
            />
            <span>
              {business.address.line1}
              <br />
              {business.address.line2}
            </span>
          </p>
        </div>
      </div>

      <div className="container-page mt-12 border-t border-ivory/10 pt-6">
        <p className="text-xs text-ivory/40">
          © {new Date().getFullYear()} Silas Freire Advocacia. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
}
