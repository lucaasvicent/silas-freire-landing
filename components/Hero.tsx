"use client";

import { buildWhatsappLink, whatsappMessages } from "@/lib/site-data";
import { motion } from "framer-motion";
import Image from "next/image";
import { CtaButton } from "./CtaButton";
import { RatingBadge } from "./RatingBadge";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden bg-ink pt-28 text-ivory md:pt-36"
    >
      <div className="container-page grid gap-12 pb-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-10 md:pb-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-xl"
        >
          <motion.p variants={item} className="mb-5 text-sm text-brass-light">
            Advocacia em Guarulhos-SP
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-[2.5rem] leading-[1.1] tracking-tight text-ivory md:text-[3.4rem]"
          >
            Defendendo seus direitos com foco total no seu caso.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ivory/75"
          >
            Atendimento direto e humano nas áreas trabalhista, criminal e de
            pensão alimentícia — do primeiro contato até a solução do seu
            caso.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <CtaButton href={buildWhatsappLink(whatsappMessages.default)}>
              Falar agora no WhatsApp
            </CtaButton>
            <a
              href="#servicos"
              className="text-sm text-ivory/70 underline decoration-ivory/30 underline-offset-4 transition-colors hover:text-ivory"
            >
              Ver áreas de atuação
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10">
            <RatingBadge tone="dark" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-sm md:mx-0 md:ml-auto"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/silas-profile.jpeg"
              alt="Dr. Silas Freire, advogado, em pé no escritório"
              fill
              priority
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
