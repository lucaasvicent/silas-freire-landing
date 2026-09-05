import { Quote } from "lucide-react";
import { testimonials } from "@/lib/site-data";
import { RatingBadge } from "./RatingBadge";

export function SocialProof() {
  return (
    <section id="depoimentos" className="bg-paper-dim py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
            O que dizem os clientes?
          </h2>
          <RatingBadge />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
          {testimonials.map((t) => (
            <figure key={t.quote} className="max-w-md">
              <Quote
                size={22}
                className="text-brass"
                aria-hidden="true"
              />
              <blockquote className="mt-4 font-display text-xl leading-snug text-ink md:text-[1.35rem]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm text-stone-light">
                {t.source}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
