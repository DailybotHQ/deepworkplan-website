---
title: Nuxt
description: "Пресет онбординга для проектов Nuxt с подсказками для рассуждений о страницах, серверных API-маршрутах, composables, движке Nitro и тестировании."
kind: preset
lang: ru
order: 14
stack: Nuxt (Vue)
---

# Пресет Nuxt

Руководство-рассуждение, которое процесс onboard использует для проектов Nuxt. Это чек-лист, а не шаблон — обнаруженная реальность побеждает.

## Сигналы

- `nuxt.config.ts` и `nuxt` в зависимостях с точкой входа `app.vue`.
- `pages/` (файловая маршрутизация), `server/api/` (эндпоинты Nitro), `composables/` и автоимпортируемые `components/`.
- Менеджер пакетов определяется из существующего lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## О чём рассуждать

- Реальные скрипты линтинга (`eslint`), проверки типов (`nuxi typecheck`), тестирования (Vitest с `@nuxt/test-utils`) и сборки (`nuxt build`) — захваченные дословно.
- Маршрутизация и получение данных (`useFetch`/`useAsyncData`), маршруты Nitro `server/api/`, composables и соглашения автоимпорта; режим рендеринга (SSR/SSG/SPA).
- Стек-специфичные навыки: `page`/`route`, `server-route` (`server/api`), `composable`, `component`.

## Примечания

Автоимпорты (компоненты, composables, utils) — соглашение Nuxt; учитывать их, а не добавлять явные импорты повсюду.
