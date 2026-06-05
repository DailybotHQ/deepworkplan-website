---
title: SvelteKit
description: "Пресет онбординга для проектов SvelteKit с подсказками для рассуждений о маршрутах, функциях load, серверных эндпоинтах, выбранном адаптере и тестировании."
kind: preset
lang: ru
order: 13
stack: SvelteKit
---

# Пресет SvelteKit

Руководство-рассуждение, которое процесс onboard использует для проектов SvelteKit. Это чек-лист, а не шаблон — обнаруженная реальность побеждает.

## Сигналы

- `svelte.config.js` и `vite.config.*` с `@sveltejs/kit` в зависимостях.
- `src/routes/` с файлами `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte` и `+server.ts`.
- Менеджер пакетов определяется из существующего lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## О чём рассуждать

- Реальные скрипты линтинга (`eslint`), проверки типов (`svelte-check`), тестирования (Vitest, плюс e2e Playwright) и сборки (`vite build`) — захваченные дословно.
- Модель маршрутизации и функций `load` (серверные и универсальные загрузки), form actions и API-эндпоинты `+server.ts`; настроенный адаптер.
- Стек-специфичные навыки: `route` (`+page` + `load`), `endpoint` (`+server.ts`), `component`.

## Примечания

Зафиксировать настроенный адаптер (`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel) — он определяет процесс сборки и деплоя.
