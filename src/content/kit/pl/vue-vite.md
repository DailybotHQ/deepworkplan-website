---
title: Vue + Vite
description: "Preset onboardingowy dla projektów Vue + Vite, z wskazówkami do rozumowania o komponentach jednoplikowych, Composition API, store'ach Pinia i testach Vitest."
kind: preset
lang: pl
order: 2
stack: Vue + Vite
---

# Preset Vue + Vite

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla projektów Vue + Vite. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `vite.config.*` oraz `vue` w zależnościach (Vue 3, `<script setup>`).
- `@vitejs/plugin-vue`, `vue-tsc`, `vue-router`, `pinia`.
- Menedżer pakietów wywnioskowany z istniejącego pliku lock.

## O czym należy rozumować

- Rzeczywiste skrypty lint, sprawdzania typów (`vue-tsc --noEmit`), testów (Vitest/Jest) i builda — zapisane dosłownie.
- Konwencja testów (`*.spec.ts` / `*.test.ts`) oraz wzorce `@vue/test-utils`.
- Skille odpowiednie dla stacku: `component`, `store-module`, `composable`, `view`/`route`.

## Uwagi

Jeśli w zależnościach zamiast `vue` znajduje się `react`, zastosuj to samo rozumowanie ze skillami w kształcie Reacta.
