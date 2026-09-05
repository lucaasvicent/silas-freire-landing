# Silas Freire Advocacia — Landing Page

Landing page profissional desenvolvida em Next.js 14 (App Router) + TypeScript + Tailwind CSS, com base no Blueprint estratégico definido previamente.

## Como rodar o projeto

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Build de produção

```bash
npm run build
npm start
```

> Importante: o build baixa as fontes Fraunces e Work Sans diretamente do Google Fonts durante a compilação (via `next/font/google`), então é necessário ter acesso à internet no momento do `npm run build`. Depois de compiladas, as fontes ficam self-hosted — não há chamada externa em tempo de execução.

## Estrutura

```
app/
  layout.tsx      → fontes, metadata e SEO globais
  page.tsx        → composição da página
  globals.css     → estilos base, foco visível, reduced motion
  robots.ts       → robots.txt gerado
  sitemap.ts      → sitemap.xml gerado
components/
  Header.tsx
  Hero.tsx
  About.tsx
  Services.tsx
  Differentials.tsx
  Process.tsx
  SocialProof.tsx
  Faq.tsx
  FinalCta.tsx
  Footer.tsx
  FloatingWhatsapp.tsx
  CtaButton.tsx
  RatingBadge.tsx
  ImagePlaceholder.tsx
  WhatsappIcon.tsx
lib/
  site-data.ts    → fonte única de verdade: telefone, endereço, textos, serviços, depoimentos, FAQ
```

## Pontos que precisam de atenção antes de publicar

Estes itens estão sinalizados no código (busca por "Substituir por foto real" e nos comentários) e também constavam no Blueprint como pendências de validação com o cliente:

1. **Fotos reais** — há 2 placeholders claramente identificados (`ImagePlaceholder`) no Hero e na seção Sobre, esperando fotos reais do Dr. Silas Freire. Nenhuma foto foi inventada ou usada sem autorização.
2. **4ª área de atuação** — a ficha do Google mostrava uma área cortada na captura de tela ("Advogado Direit..."). Foi assumida como "Consultoria Jurídica" (com base na bio do Instagram), mas vale confirmar com o cliente.
3. **Horário de funcionamento completo** — só havia confirmação de "fecha às 17h" em um dia específico; o footer evita afirmar uma grade de horários não confirmada.
4. **Respostas do FAQ** (preço de consulta, abrangência de atendimento fora de Guarulhos, tempo de retorno) — foram escritas de forma genérica e segura; recomenda-se validar com o cliente antes de publicar.
5. **Site atual** — a bio do Instagram lista `www.silasfreireadv.com.br`, mas o briefing informou que a empresa não possui site. Vale confirmar antes de decidir o domínio final de publicação.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- lucide-react (ícones)
- Framer Motion (animação de entrada do Hero)
