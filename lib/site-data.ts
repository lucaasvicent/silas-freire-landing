// Fonte única de verdade para os dados reais do negócio.
// Qualquer alteração de telefone, endereço ou textos institucionais deve
// começar por aqui — os componentes apenas consomem estes dados.

export const business = {
  name: "Silas Freire Advocacia",
  whatsappDisplay: "(11) 94151-1906",
  whatsappNumber: "5511941511906", // formato internacional para wa.me
  instagram: "@silasfreireadv",
  instagramUrl: "https://instagram.com/silasfreireadv",
  address: {
    line1: "Praça Mali, 28 — Jardim Presidente Dutra",
    line2: "Guarulhos - SP, 07173-141",
  },
  rating: {
    value: "5,0",
    count: 68,
  },
};

export function buildWhatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${business.whatsappNumber}?text=${encoded}`;
}

export const whatsappMessages = {
  default: "Olá, Dr. Silas. Vim pelo site e gostaria de falar sobre o meu caso.",
  services: "Olá, Dr. Silas. Vi as áreas de atuação no site e quero entender melhor o meu caso.",
  final: "Olá, Dr. Silas. Estou pronto para conversar sobre o meu caso.",
};

export const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Áreas de atuação" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "Perguntas frequentes" },
  { href: "#contato", label: "Contato" },
];

export const services = [
  {
    title: "Direito do Trabalho",
    description:
      "Demissão, verbas rescisórias, condições de trabalho e demais direitos garantidos ao trabalhador.",
  },
  {
    title: "Pensão Alimentícia",
    description:
      "Fixação, revisão ou cobrança de pensão alimentícia, com acompanhamento em cada etapa do processo.",
  },
  {
    title: "Direito Criminal",
    description:
      "Defesa em processos criminais, com atuação presente do início ao fim do caso.",
  },
  {
    title: "Consultoria Jurídica",
    description:
      "Orientação jurídica geral para dúvidas e decisões que exigem clareza antes de agir.",
  },
];

export const differentials = [
  {
    title: "Nota 5,0 no Google",
    body: "São 68 avaliações reais de clientes atendidos — você não precisa decidir às escuras.",
  },
  {
    title: "Atendimento direto com o advogado",
    body: "Você fala com quem conduz o seu caso, sem intermediários e sem repetir sua história para várias pessoas.",
  },
  {
    title: "Foco individual em cada caso",
    body: "Segundo relatos de clientes, a atenção está no que é específico da sua situação — não em volume de processos.",
  },
];

export const process = [
  {
    step: "1",
    title: "Você entra em contato pelo WhatsApp",
    body: "Explica, com suas palavras, o que está acontecendo.",
  },
  {
    step: "2",
    title: "Retorno rápido",
    body: "O Dr. Silas avalia o caso e orienta os próximos passos.",
  },
  {
    step: "3",
    title: "Acompanhamento do processo",
    body: "Você é informado sobre cada etapa — sem ficar no escuro.",
  },
];

export const testimonials = [
  {
    quote: "Ele foi profissional, teve foco no meu caso, excelente!",
    source: "Avaliação no Google",
  },
  {
    quote:
      "Excelente advogado, sempre em busca dos direitos do trabalhador, nota 10.",
    source: "Avaliação no Google",
  },
];

export const faqs = [
  {
    question: "Quanto custa uma consulta?",
    answer:
      "O valor é definido conforme a análise do seu caso. Fale no WhatsApp para entender as condições.",
  },
  {
    question: "O escritório atende apenas em Guarulhos?",
    answer:
      "O atendimento presencial é em Guarulhos-SP. Para confirmar atendimento em outras regiões, fale diretamente pelo WhatsApp.",
  },
  {
    question: "Quanto tempo demora para ter um retorno?",
    answer:
      "O retorno costuma ser rápido — normalmente ainda no mesmo dia útil.",
  },
  {
    question: "Preciso ir até o escritório na primeira conversa?",
    answer:
      "Não necessariamente. O primeiro contato pode ser feito pelo WhatsApp, que já orienta os próximos passos do seu caso.",
  },
];
