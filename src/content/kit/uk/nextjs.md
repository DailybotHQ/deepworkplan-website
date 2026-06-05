---
title: Next.js
description: "Пресет онбордингу для Next.js-проєктів із підказками для App vs Pages Router, серверних і клієнтських компонентів, обробників маршрутів та тестування."
kind: preset
lang: uk
order: 12
stack: Next.js (React)
---

# Пресет Next.js

Орієнтир для міркувань, який процес онбордингу використовує для Next.js-проєктів. Це чек-лист, а не шаблон — виявлена реальність важливіша.

## Сигнали

- `package.json` із `next` і `react`, а також `next.config.js`/`next.config.mjs`/`next.config.ts`.
- `app/` (App Router, Server/Client Components, обробники маршрутів) або `pages/` (Pages Router, API-маршрути) — визначити, який використовується.
- Менеджер пакетів виводиться з наявного lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Про що міркувати

- Справжні скрипти лінтингу (`eslint` з `next/core-web-vitals`), тестування (Jest/Vitest, плюс e2e Playwright/Cypress) і збірки (`next build`) — зафіксувати дослівно.
- Модель маршрутизатора (App vs Pages), розподіл Server vs Client Component і місця розташування завантаження даних та обробників маршрутів.
- Відповідні стеку скіли: `page`/`route`, `server-component`, `route-handler`, `component`.

## Примітки

Визначити маршрутизатор перед генерацією скілів — App Router і Pages Router мають різні файлові конвенції та моделі завантаження даних.
