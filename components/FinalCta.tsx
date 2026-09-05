import { buildWhatsappLink, whatsappMessages } from "@/lib/site-data";
import { CtaButton } from "./CtaButton";

export function FinalCta() {
  return (
    <section className="bg-ink py-20 text-ivory md:py-28">
      <div className="container-page flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-lg">
          <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
            Pronto para colocar seu caso em boas mãos?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ivory/70">
            Fale agora com o Dr. Silas Freire e entenda os próximos passos do
            seu caso.
          </p>
        </div>

        <CtaButton
          href={buildWhatsappLink(whatsappMessages.final)}
          className="shrink-0"
        >
          Falar no WhatsApp agora
        </CtaButton>
      </div>
    </section>
  );
}
