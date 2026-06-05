---
title: SvelteKit
description: "Um preset de onboarding para projetos SvelteKit, com pistas de raciocínio para rotas, funções load, server endpoints, o adaptador escolhido e testes."
kind: preset
lang: pt
order: 13
stack: SvelteKit
---

# Preset SvelteKit

Um guia de raciocínio que o fluxo de onboarding usa para projetos SvelteKit. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `svelte.config.js` e um `vite.config.*`, com `@sveltejs/kit` nas dependências.
- `src/routes/` com `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte` e endpoints `+server.ts`.
- Gerenciador de pacotes inferido a partir do lockfile presente (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Sobre o que raciocinar

- Os scripts reais de lint (`eslint`), verificação de tipos (`svelte-check`), teste (Vitest, mais Playwright e2e) e build (`vite build`) — capturados literalmente.
- O modelo de roteamento e `load` (carregamentos server vs universal), form actions e endpoints de API `+server.ts`; o adaptador configurado.
- Skills adequadas à stack: `route` (`+page` + `load`), `endpoint` (`+server.ts`), `component`.

## Notas

Observar o adaptador configurado (`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel) — ele define a história de build e deploy.
