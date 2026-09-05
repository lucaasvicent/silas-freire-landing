<div align="center">

# ⚖️ Silas Freire Advocacia

### Landing page institucional para escritório de advocacia em Guarulhos-SP

[![Deploy](https://img.shields.io/badge/deploy-vercel-black?logo=vercel)](https://silas-freire-landing.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

**[🔗 Ver demo ao vivo](https://silas-freire-landing.vercel.app/)**

</div>

---

## Sobre o projeto

Landing page desenvolvida para a **Silas Freire Advocacia**, escritório individual de advocacia em Guarulhos-SP, com atuação em Direito do Trabalho, Direito Criminal, Pensão Alimentícia e Consultoria Jurídica.

O objetivo principal da página é converter visitantes em contato direto via WhatsApp, apoiado em prova social real (nota 5,0 no Google com 68 avaliações) e em uma identidade visual sóbria e tradicional, coerente com o segmento jurídico.

O projeto nasceu de um processo de 3 etapas — análise estratégica do negócio → blueprint de conversão e copy → desenvolvimento — em vez de partir direto para o código. Isso está refletido na forma como o conteúdo foi escrito: nenhuma informação (avaliação, nota, preço, tempo de experiência) foi inventada; tudo o que não pôde ser confirmado nos materiais originais do cliente foi marcado explicitamente no código como pendência.

## Demonstração

🔗 **[silas-freire-landing.vercel.app](https://silas-freire-landing.vercel.app/)**

## Stack utilizada

| Camada | Tecnologia |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) |
| Estilização | [Tailwind CSS](https://tailwindcss.com/) |
| Ícones | [Lucide React](https://lucide.dev/) |
| Animação | [Framer Motion](https://www.framer.com/motion/) |
| Deploy | [Vercel](https://vercel.com/) |

## Funcionalidades

- Botão de WhatsApp com link `wa.me` e mensagem pré-preenchida diferente por seção (hero, serviços, CTA final)
- Botão flutuante de WhatsApp fixo no mobile
- Seção de FAQ em acordeão, acessível via teclado (`aria-expanded`, `aria-controls`)
- Menu mobile responsivo com navegação por âncoras
- SEO configurado: `metadata`, Open Graph, `robots.ts` e `sitemap.ts` gerados automaticamente pelo App Router
- Foco visível customizado e suporte a `prefers-reduced-motion` para acessibilidade
- Conteúdo centralizado em `lib/site-data.ts` — telefone, endereço, serviços, depoimentos e FAQ ficam em um único arquivo, sem strings espalhadas pelos componentes

## Rodando localmente

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou superior.

```bash
git clone https://github.com/<seu-usuario>/silas-freire-landing.git
cd silas-freire-landing
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

> O `next/font/google` baixa as fontes (Fraunces e Work Sans) durante o `npm run build`/`npm run dev` — é necessário ter internet ativa nesse momento. Depois de compiladas, as fontes ficam self-hosted, sem chamada externa em runtime.

## Estrutura do projeto

```
app/
├── layout.tsx        → fontes, metadata e SEO globais
├── page.tsx          → composição da página
├── globals.css       → estilos base, foco visível, reduced motion
├── robots.ts         → robots.txt gerado
└── sitemap.ts        → sitemap.xml gerado

components/
├── Header.tsx             → navegação + CTA fixo
├── Hero.tsx                → seção de abertura com animação de entrada
├── About.tsx                → apresentação do advogado
├── Services.tsx              → áreas de atuação
├── Differentials.tsx          → diferenciais do escritório
├── Process.tsx                 → como funciona o primeiro contato
├── SocialProof.tsx              → depoimentos reais e nota do Google
├── Faq.tsx                       → perguntas frequentes (acordeão acessível)
├── FinalCta.tsx                   → chamada final para contato
├── Footer.tsx                      → contato, endereço e redes sociais
├── FloatingWhatsapp.tsx             → botão flutuante (mobile)
├── CtaButton.tsx                     → botão de CTA reutilizável
├── RatingBadge.tsx                    → selo de avaliação reutilizável
├── ImagePlaceholder.tsx                → placeholder identificado para fotos pendentes
└── WhatsappIcon.tsx                     → ícone de marca (não incluído no lucide-react)

lib/
└── site-data.ts  → fonte única de verdade dos dados do negócio
```

## Pendências conhecidas

Sinalizadas para acompanhamento antes da divulgação oficial da página:

- [ ] Substituir as fotos placeholder (`Hero` e `About`) por fotos reais do Dr. Silas Freire
- [ ] Confirmar a 4ª área de atuação (cortada na ficha original do Google, assumida como "Consultoria Jurídica")
- [ ] Confirmar horário de funcionamento completo do escritório
- [ ] Validar as respostas do FAQ (preço de consulta, abrangência de atendimento, tempo médio de retorno) com o cliente
- [ ] Confirmar domínio final de publicação (`silasfreireadv.com.br`, citado na bio do Instagram, ainda não confirmado como site oficial)

## Licença

Projeto de uso privado, desenvolvido para a Silas Freire Advocacia. Não licenciado para reuso público.