---
title: Nuxt
description: "Preset di onboarding per progetti Nuxt, con spunti di ragionamento per pagine, route API server, composable, il motore Nitro e il testing."
kind: preset
lang: it
order: 14
stack: Nuxt (Vue)
---

# Preset Nuxt

Una guida di ragionamento che il flusso di onboard usa per i progetti Nuxt. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `nuxt.config.ts` e `nuxt` nelle dipendenze, con un entrypoint `app.vue`.
- `pages/` (routing basato su file), `server/api/` (endpoint Nitro), `composables/` e `components/` con auto-import.
- Package manager dedotto dal lockfile presente (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Su cosa ragionare

- Gli script reali di lint (`eslint`), type-check (`nuxi typecheck`), test (Vitest con `@nuxt/test-utils`) e build (`nuxt build`) — catturati alla lettera.
- Routing e data fetching (`useFetch`/`useAsyncData`), route Nitro in `server/api/`, composable e convenzioni di auto-import; la modalità di rendering (SSR/SSG/SPA).
- Skill adatte allo stack: `page`/`route`, `server-route` (`server/api`), `composable`, `component`.

## Note

Gli auto-import (component, composable, util) sono una convenzione di Nuxt — tenerne conto anziché aggiungere import espliciti ovunque.
