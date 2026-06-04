---
title: Astro / Svelte
description: "Um preset de onboarding para sites Astro, opcionalmente com ilhas Svelte, com pistas de raciocínio para content collections, validação de schema e hidratação de ilhas."
kind: preset
lang: pt
order: 3
stack: Astro / Svelte
---

# Preset Astro / Svelte

Um guia de raciocínio que o fluxo de onboarding usa para sites Astro, opcionalmente com ilhas Svelte. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `astro.config.*`; opcionalmente `@astrojs/svelte` e componentes `.svelte`.
- Content Collections em `src/content/` com schemas Zod.

## Sobre o que raciocinar

- Os scripts reais de lint, verificação de tipos (`astro check`), teste e build — capturados literalmente.
- Os schemas das content collections e as convenções de hidratação de ilhas (`client:visible` em vez de `client:load`).
- Skills apropriadas à stack para componentes, páginas e entradas de conteúdo.

## Notas

Útil para sites orientados a conteúdo que usam a arquitetura de ilhas do Astro com interatividade seletiva.
