---
title: Next.js
description: "Пресет онбординга для проектов Next.js с подсказками для рассуждений об App Router и Pages Router, серверных и клиентских компонентах, обработчиках маршрутов и тестировании."
kind: preset
lang: ru
order: 12
stack: Next.js (React)
---

# Пресет Next.js

Руководство-рассуждение, которое процесс onboard использует для проектов Next.js. Это чек-лист, а не шаблон — обнаруженная реальность побеждает.

## Сигналы

- `package.json` с `next` и `react`, а также `next.config.js`/`next.config.mjs`/`next.config.ts`.
- `app/` (App Router, серверные/клиентские компоненты, обработчики маршрутов) или `pages/` (Pages Router, API-маршруты) — определить, что используется.
- Менеджер пакетов определяется из существующего lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## О чём рассуждать

- Реальные скрипты линтинга (`eslint` с `next/core-web-vitals`), тестирования (Jest/Vitest, плюс e2e Playwright/Cypress) и сборки (`next build`) — захваченные дословно.
- Модель маршрутизации (App Router или Pages Router), разделение серверных и клиентских компонентов, а также где находятся запросы данных и обработчики маршрутов.
- Стек-специфичные навыки: `page`/`route`, `server-component`, `route-handler`, `component`.

## Примечания

Определить маршрутизатор до генерации навыков — App Router и Pages Router используют разные файловые соглашения и модели загрузки данных.
