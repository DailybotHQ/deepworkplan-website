---
title: Vue + Vite
description: "An onboarding preset for Vue + Vite projects, with reasoning cues for single-file components, the Composition API, Pinia stores, the router, and Vitest component testing."
kind: preset
lang: en
order: 2
stack: Vue + Vite
---

# Vue + Vite preset

A reasoning guide the onboard flow uses for Vue + Vite projects. It is a checklist, not a template — detected reality wins.

## Signals

- `vite.config.*` and `vue` in dependencies (Vue 3, `<script setup>`).
- `@vitejs/plugin-vue`, `vue-tsc`, `vue-router`, `pinia`.
- Package manager inferred from the lockfile that exists.

## What to reason about

- The real lint, type-check (`vue-tsc --noEmit`), test (Vitest/Jest), and build scripts — captured verbatim.
- The test convention (`*.spec.ts` / `*.test.ts`) and `@vue/test-utils` patterns.
- Stack-appropriate skills: `component`, `store-module`, `composable`, `view`/`route`.

## Notes

If `react` is in deps instead of `vue`, reuse the same reasoning with React-shaped skills.
