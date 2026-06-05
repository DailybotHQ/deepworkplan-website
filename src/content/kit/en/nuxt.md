---
title: Nuxt
description: "An onboarding preset for Nuxt projects, with reasoning cues for pages, server API routes, composables, the Nitro server engine, and testing."
kind: preset
lang: en
order: 14
stack: Nuxt (Vue)
---

# Nuxt preset

A reasoning guide the onboard flow uses for Nuxt projects. It is a checklist, not a template — detected reality wins.

## Signals

- `nuxt.config.ts` and `nuxt` in dependencies, with an `app.vue` entrypoint.
- `pages/` (file-based routing), `server/api/` (Nitro endpoints), `composables/`, and auto-imported `components/`.
- Package manager inferred from the lockfile that exists (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## What to reason about

- The real lint (`eslint`), type-check (`nuxi typecheck`), test (Vitest with `@nuxt/test-utils`), and build (`nuxt build`) scripts — captured verbatim.
- Routing and data fetching (`useFetch`/`useAsyncData`), Nitro `server/api/` routes, composables, and auto-import conventions; the rendering mode (SSR/SSG/SPA).
- Stack-appropriate skills: `page`/`route`, `server-route` (`server/api`), `composable`, `component`.

## Notes

Auto-imports (components, composables, utils) are a Nuxt convention — account for them rather than adding explicit imports everywhere.
