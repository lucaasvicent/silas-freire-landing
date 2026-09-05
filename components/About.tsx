import Image from "next/image";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function About() {
  return (
    <section id="sobre" className="bg-paper py-20 md:py-28">
      <div className="container-page grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden order-2 md:order-1">
          <Image
            src="/images/silas-about.jpeg"
            alt="Dr. Silas Freire no escritório"
            fill
            className="object-cover"
          />
        </div>

        <div className="order-1 max-w-prose md:order-2">
          <h2 className="font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
            Quem vai cuidar do seu caso?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-stone">
            Sou Silas Freire, advogado atuante em Guarulhos-SP. Meu trabalho é
            simples de explicar: ouvir com atenção, entender o que realmente
            está em jogo no seu caso e agir com foco até a solução.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-stone">
            É o que os próprios clientes destacam nas avaliações —
            profissionalismo e dedicação real a cada processo, do início ao
            fim.
          </p>
        </div>
      </div>
    </section>
  );
}
