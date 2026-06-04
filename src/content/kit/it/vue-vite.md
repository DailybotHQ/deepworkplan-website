---
title: Vue + Vite
description: "Un preset di onboarding per progetti Vue + Vite, con spunti di ragionamento per i single-file component, la Composition API, gli store Pinia e il testing con Vitest."
kind: preset
lang: it
order: 2
stack: Vue + Vite
---

# Preset Vue + Vite

Una guida di ragionamento che il flusso di onboard usa per i progetti Vue + Vite. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `vite.config.*` e `vue` nelle dipendenze (Vue 3, `<script setup>`).
- `@vitejs/plugin-vue`, `vue-tsc`, `vue-router`, `pinia`.
- Package manager dedotto dal lockfile esistente.

## Su cosa ragionare

- Gli script reali di lint, type-check (`vue-tsc --noEmit`), test (Vitest/Jest) e build — catturati alla lettera.
- La convenzione di test (`*.spec.ts` / `*.test.ts`) e i pattern di `@vue/test-utils`.
- Skill adatte allo stack: `component`, `store-module`, `composable`, `view`/`route`.

## Note

Se nelle dipendenze c’è `react` anziché `vue`, riutilizzi lo stesso ragionamento con skill modellate su React.
