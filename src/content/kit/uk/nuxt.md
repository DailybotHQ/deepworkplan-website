---
title: Nuxt
description: "Пресет онбордингу для Nuxt-проєктів із підказками для сторінок, серверних API-маршрутів, composables, рушія Nitro та тестування."
kind: preset
lang: uk
order: 14
stack: Nuxt (Vue)
---

# Пресет Nuxt

Орієнтир для міркувань, який процес онбордингу використовує для Nuxt-проєктів. Це чек-лист, а не шаблон — виявлена реальність важливіша.

## Сигнали

- `nuxt.config.ts` і `nuxt` у залежностях з точкою входу `app.vue`.
- `pages/` (файлова маршрутизація), `server/api/` (ендпоінти Nitro), `composables/` та автоімпортовані `components/`.
- Менеджер пакетів виводиться з наявного lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Про що міркувати

- Справжні скрипти лінтингу (`eslint`), перевірки типів (`nuxi typecheck`), тестування (Vitest із `@nuxt/test-utils`) і збірки (`nuxt build`) — зафіксувати дослівно.
- Маршрутизація та завантаження даних (`useFetch`/`useAsyncData`), маршрути Nitro `server/api/`, composables і конвенції автоімпорту; режим рендерингу (SSR/SSG/SPA).
- Відповідні стеку скіли: `page`/`route`, `server-route` (`server/api`), `composable`, `component`.

## Примітки

Автоімпорти (компоненти, composables, utils) — конвенція Nuxt; враховувати їх, а не додавати явні імпорти скрізь.
