import { ChevronRight } from "lucide-react";
import { services, buildWhatsappLink, whatsappMessages } from "@/lib/site-data";

export function Services() {
  return (
    <section id="servicos" className="bg-paper-dim py-20 md:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
            Áreas de atuação
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-stone">
            Atendimento nas principais frentes do Direito que afetam o dia a
            dia das pessoas.
          </p>
        </div>

        <div className="mt-12 border-t border-ink/10 md:grid md:grid-cols-2">
          {services.map((service, i) => (
            <a
              key={service.title}
              href={buildWhatsappLink(whatsappMessages.services)}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col justify-between gap-4 border-b border-ink/10 py-8 pr-6 transition-colors hover:bg-ink/[0.02] md:py-10 ${
                i % 2 === 0 ? "md:border-r md:pr-10" : "md:pl-10"
              }`}
            >
              <div>
                <h3 className="font-display text-xl text-ink md:text-[1.4rem]">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-stone">
                  {service.description}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm text-brass-dim">
                Falar sobre meu caso
                <ChevronRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </a>
          ))}
        </div>

        <p className="mt-8 text-sm text-stone-light">
          Não encontrou a sua situação na lista? Fale pelo WhatsApp e explique
          o seu caso — a orientação inicial ajuda a entender o próximo passo.
        </p>
      </div>
    </section>
  );
}
