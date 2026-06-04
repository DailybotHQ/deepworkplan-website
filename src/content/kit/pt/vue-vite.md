---
title: Vue + Vite
description: "Um preset de onboarding para projetos Vue + Vite, com pistas de raciocínio para single-file components, a Composition API, stores Pinia e testes com Vitest."
kind: preset
lang: pt
order: 2
stack: Vue + Vite
---

# Preset Vue + Vite

Um guia de raciocínio que o fluxo de onboarding usa para projetos Vue + Vite. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `vite.config.*` e `vue` nas dependências (Vue 3, `<script setup>`).
- `@vitejs/plugin-vue`, `vue-tsc`, `vue-router`, `pinia`.
- Gerenciador de pacotes inferido a partir do lockfile existente.

## Sobre o que raciocinar

- Os scripts reais de lint, verificação de tipos (`vue-tsc --noEmit`), teste (Vitest/Jest) e build — capturados literalmente.
- A convenção de testes (`*.spec.ts` / `*.test.ts`) e os padrões de `@vue/test-utils`.
- Skills apropriadas à stack: `component`, `store-module`, `composable`, `view`/`route`.

## Notas

Se `react` estiver nas dependências em vez de `vue`, reutilize o mesmo raciocínio com skills no formato React.
