import { differentials } from "@/lib/site-data";

export function Differentials() {
  return (
    <section className="bg-ink py-20 text-ivory md:py-28">
      <div className="container-page">
        <h2 className="max-w-lg font-display text-3xl leading-tight tracking-tight md:text-4xl">
          Por que clientes confiam no escritório?
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {differentials.map((d) => (
            <div
              key={d.title}
              className="border-t border-ivory/15 pt-6"
            >
              <h3 className="font-display text-xl text-brass-light">
                {d.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/70">
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
