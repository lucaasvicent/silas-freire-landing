import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.silasfreireadv.com.br"),
  title: "Silas Freire Advocacia | Advogado em Guarulhos-SP",
  description:
    "Advocacia em Guarulhos-SP com atendimento direto e nota 5,0 no Google. Atuação em Direito do Trabalho, Pensão Alimentícia e Direito Criminal. Fale agora no WhatsApp.",
  keywords: [
    "advogado Guarulhos",
    "advogado trabalhista Guarulhos",
    "advogado pensão alimentícia Guarulhos",
    "advogado criminal Guarulhos",
    "Silas Freire Advocacia",
    "consultoria jurídica Guarulhos",
  ],
  openGraph: {
    title: "Silas Freire Advocacia | Advogado em Guarulhos-SP",
    description:
      "Atendimento direto e nota 5,0 no Google. Direito do Trabalho, Pensão Alimentícia e Direito Criminal.",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
