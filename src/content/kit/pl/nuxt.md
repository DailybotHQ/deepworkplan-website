---
title: Nuxt
description: "Preset onboardingowy dla projektów Nuxt, ze wskazówkami do rozumowania o stronach, trasach API serwera, composables, silniku Nitro i testowaniu."
kind: preset
lang: pl
order: 14
stack: Nuxt (Vue)
---

# Preset Nuxt

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla projektów Nuxt. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `nuxt.config.ts` i `nuxt` w zależnościach z punktem wejścia `app.vue`.
- `pages/` (routing oparty na plikach), `server/api/` (endpointy Nitro), `composables/` oraz auto-importowane `components/`.
- Menedżer pakietów wnioskowany z istniejącego pliku blokady (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## O czym należy rozumować

- Rzeczywiste skrypty lint (`eslint`), type-check (`nuxi typecheck`), test (Vitest z `@nuxt/test-utils`) i build (`nuxt build`) — zapisane dosłownie.
- Routing i pobieranie danych (`useFetch`/`useAsyncData`), trasy Nitro `server/api/`, composables i konwencje auto-importu; tryb renderowania (SSR/SSG/SPA).
- Skille właściwe dla stosu: `page`/`route`, `server-route` (`server/api`), `composable`, `component`.

## Uwagi

Auto-importy (komponenty, composables, utils) to konwencja Nuxt — uwzględniaj je zamiast dodawać wszędzie jawne importy.
