---
title: Next.js
description: "Um preset de onboarding para projetos Next.js, com pistas de raciocínio para o App vs Pages Router, Server e Client Components, route handlers e testes."
kind: preset
lang: pt
order: 12
stack: Next.js (React)
---

# Preset Next.js

Um guia de raciocínio que o fluxo de onboarding usa para projetos Next.js. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `package.json` com `next` e `react`, mais um `next.config.js`/`next.config.mjs`/`next.config.ts`.
- `app/` (App Router, Server/Client Components, route handlers) ou `pages/` (Pages Router, API routes) — detectar qual está em uso.
- Gerenciador de pacotes inferido a partir do lockfile presente (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Sobre o que raciocinar

- Os scripts reais de lint (`eslint` com `next/core-web-vitals`), teste (Jest/Vitest, mais Playwright/Cypress e2e) e build (`next build`) — capturados literalmente.
- O modelo de roteador (App vs Pages), a divisão Server vs Client Component e onde ficam o data fetching e os route handlers.
- Skills adequadas à stack: `page`/`route`, `server-component`, `route-handler`, `component`.

## Notas

Detectar o roteador antes de gerar skills — App Router e Pages Router têm convenções de arquivo e modelos de data fetching diferentes.
