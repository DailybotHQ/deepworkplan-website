---
title: Vue + Vite
description: "Ein Onboarding-Preset für Vue-+-Vite-Projekte, mit Reasoning-Hinweisen für Single-File-Components, die Composition API, Pinia-Stores und Vitest-Tests."
kind: preset
lang: de
order: 2
stack: Vue + Vite
---

# Vue + Vite Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Vue-+-Vite-Projekte nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `vite.config.*` und `vue` in den Abhängigkeiten (Vue 3, `<script setup>`).
- `@vitejs/plugin-vue`, `vue-tsc`, `vue-router`, `pinia`.
- Paketmanager wird aus der vorhandenen Lockfile abgeleitet.

## Worüber nachzudenken ist

- Die echten Lint-, Type-Check- (`vue-tsc --noEmit`), Test- (Vitest/Jest) und Build-Skripte — wortwörtlich erfasst.
- Die Test-Konvention (`*.spec.ts` / `*.test.ts`) und die `@vue/test-utils`-Muster.
- Stack-passende Skills: `component`, `store-module`, `composable`, `view`/`route`.

## Hinweise

Steht statt `vue` `react` in den Abhängigkeiten, dieselbe Logik mit React-förmigen Skills wiederverwenden.
