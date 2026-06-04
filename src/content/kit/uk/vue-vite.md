---
title: Vue + Vite
description: "Пресет онбордингу для проєктів на Vue + Vite з підказками щодо однофайлових компонентів, Composition API, сховищ Pinia й тестування Vitest."
kind: preset
lang: uk
order: 2
stack: Vue + Vite
---

# Пресет Vue + Vite

Орієнтир для міркувань, який процес онбордингу використовує для проєктів на Vue + Vite. Це чек-лист, а не шаблон — виявлена реальність важливіша.

## Сигнали

- `vite.config.*` і `vue` в залежностях (Vue 3, `<script setup>`).
- `@vitejs/plugin-vue`, `vue-tsc`, `vue-router`, `pinia`.
- Менеджер пакетів виводиться з наявного lock-файла.

## Про що міркувати

- Справжні скрипти лінтингу, перевірки типів (`vue-tsc --noEmit`), тестування (Vitest/Jest) і збірки — фіксуються дослівно.
- Домовленість щодо тестів (`*.spec.ts` / `*.test.ts`) і патерни `@vue/test-utils`.
- Доречні для стека скіли: `component`, `store-module`, `composable`, `view`/`route`.

## Примітки

Якщо в залежностях `react` замість `vue`, застосуйте ті самі міркування зі скілами під React.
