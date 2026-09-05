import { process } from "@/lib/site-data";

export function Process() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <h2 className="font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
          Como é o primeiro contato
        </h2>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {process.map((p) => (
            <li key={p.step} className="flex flex-col">
              <span className="font-display text-4xl text-brass-dim">
                {p.step}
              </span>
              <h3 className="mt-4 text-lg font-medium text-ink">{p.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
