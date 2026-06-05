---
title: SvelteKit
description: "Пресет онбордингу для SvelteKit-проєктів із підказками для маршрутів, функцій load, серверних ендпоінтів, обраного адаптера та тестування."
kind: preset
lang: uk
order: 13
stack: SvelteKit
---

# Пресет SvelteKit

Орієнтир для міркувань, який процес онбордингу використовує для SvelteKit-проєктів. Це чек-лист, а не шаблон — виявлена реальність важливіша.

## Сигнали

- `svelte.config.js` і `vite.config.*` з `@sveltejs/kit` у залежностях.
- `src/routes/` з `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte` та ендпоінтами `+server.ts`.
- Менеджер пакетів виводиться з наявного lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Про що міркувати

- Справжні скрипти лінтингу (`eslint`), перевірки типів (`svelte-check`), тестування (Vitest, плюс e2e Playwright) і збірки (`vite build`) — зафіксувати дослівно.
- Модель маршрутизації та `load` (серверні vs універсальні завантаження), дії форм і API-ендпоінти `+server.ts`; налаштований адаптер.
- Відповідні стеку скіли: `route` (`+page` + `load`), `endpoint` (`+server.ts`), `component`.

## Примітки

Зафіксувати налаштований адаптер (`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel) — він визначає процес збірки та розгортання.
