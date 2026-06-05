---
title: SvelteKit
description: "Preset di onboarding per progetti SvelteKit, con spunti di ragionamento per route, load function, endpoint server, l'adapter scelto e il testing."
kind: preset
lang: it
order: 13
stack: SvelteKit
---

# Preset SvelteKit

Una guida di ragionamento che il flusso di onboard usa per i progetti SvelteKit. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `svelte.config.js` e un `vite.config.*`, con `@sveltejs/kit` nelle dipendenze.
- `src/routes/` con `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte` ed endpoint `+server.ts`.
- Package manager dedotto dal lockfile presente (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Su cosa ragionare

- Gli script reali di lint (`eslint`), type-check (`svelte-check`), test (Vitest, più Playwright e2e) e build (`vite build`) — catturati alla lettera.
- Il modello di routing e `load` (caricamenti server vs universali), le form action e gli endpoint API `+server.ts`; l'adapter configurato.
- Skill adatte allo stack: `route` (`+page` + `load`), `endpoint` (`+server.ts`), `component`.

## Note

Annotare l'adapter configurato (`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel) — definisce il build e la storia di deploy.
