---
title: SvelteKit
description: "Preset onboardingowy dla projektów SvelteKit, ze wskazówkami do rozumowania o trasach, funkcjach load, endpointach serwera, wybranym adapterze i testowaniu."
kind: preset
lang: pl
order: 13
stack: SvelteKit
---

# Preset SvelteKit

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla projektów SvelteKit. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `svelte.config.js` i `vite.config.*` z `@sveltejs/kit` w zależnościach.
- `src/routes/` z plikami `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte` oraz endpointami `+server.ts`.
- Menedżer pakietów wnioskowany z istniejącego pliku blokady (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## O czym należy rozumować

- Rzeczywiste skrypty lint (`eslint`), type-check (`svelte-check`), test (Vitest plus Playwright e2e) i build (`vite build`) — zapisane dosłownie.
- Model routingu i `load` (ładowania po stronie serwera vs uniwersalne), akcje formularzy oraz endpointy API `+server.ts`; skonfigurowany adapter.
- Skille właściwe dla stosu: `route` (`+page` + `load`), `endpoint` (`+server.ts`), `component`.

## Uwagi

Zanotuj skonfigurowany adapter (`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel) — kształtuje on historię budowania i wdrożenia.
