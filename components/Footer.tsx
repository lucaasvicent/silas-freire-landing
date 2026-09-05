import { MapPin, Phone, Instagram, Clock } from "lucide-react";
import { business, buildWhatsappLink, whatsappMessages } from "@/lib/site-data";
import Image from "next/image";
import Link from "next/link";

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

        {/* Contato */}
        <div className="flex flex-col gap-3 text-sm">
          <a
            href={buildWhatsappLink(whatsappMessages.default)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 transition-colors hover:text-ivory"
          >
            <Phone
              size={16}
              className="shrink-0 text-brass-light"
              aria-hidden="true"
            />

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
              className="shrink-0 text-brass-light"
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
      <div className="container-page mt-12 border-t border-ivory/10 pt-3">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-center text-xs text-ivory/40 sm:text-left">
            © {new Date().getFullYear()} Silas Freire Advocacia. Todos os
            direitos reservados.
          </p>
          <div className="flex shrink-0 items-center justify-center">
            <Link href="https://www.linkedin.com/in/lucas-vicente0408/" target="_blank" rel="noopener noreferrer">
              <Image
                alt="Logo Silas Freire Advocacia"
                src="/images/logoMe.png"
                width={700}
                height={100}
                priority
                className="
                h-auto
                w-64
                object-contain
                sm:w-72
                md:w-80
                lg:w-96
              "
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}