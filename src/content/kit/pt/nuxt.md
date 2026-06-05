---
title: Nuxt
description: "Um preset de onboarding para projetos Nuxt, com pistas de raciocínio para páginas, rotas de API server, composables, o engine Nitro e testes."
kind: preset
lang: pt
order: 14
stack: Nuxt (Vue)
---

# Preset Nuxt

Um guia de raciocínio que o fluxo de onboarding usa para projetos Nuxt. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `nuxt.config.ts` e `nuxt` nas dependências, com um entrypoint `app.vue`.
- `pages/` (roteamento baseado em arquivo), `server/api/` (endpoints Nitro), `composables/` e `components/` com auto-import.
- Gerenciador de pacotes inferido a partir do lockfile presente (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Sobre o que raciocinar

- Os scripts reais de lint (`eslint`), verificação de tipos (`nuxi typecheck`), teste (Vitest com `@nuxt/test-utils`) e build (`nuxt build`) — capturados literalmente.
- Roteamento e data fetching (`useFetch`/`useAsyncData`), rotas `server/api/` do Nitro, composables e convenções de auto-import; o modo de renderização (SSR/SSG/SPA).
- Skills adequadas à stack: `page`/`route`, `server-route` (`server/api`), `composable`, `component`.

## Notas

Os auto-imports (components, composables, utils) são uma convenção do Nuxt — levá-los em conta em vez de adicionar imports explícitos em todo lugar.
