---
title: Next.js
description: "An onboarding preset for Next.js projects, with reasoning cues for the App vs Pages Router, Server and Client Components, route handlers, and testing."
kind: preset
lang: en
order: 12
stack: Next.js (React)
---

# Next.js preset

A reasoning guide the onboard flow uses for Next.js projects. It is a checklist, not a template — detected reality wins.

## Signals

- `package.json` with `next` and `react`, plus a `next.config.js`/`next.config.mjs`/`next.config.ts`.
- `app/` (App Router, Server/Client Components, route handlers) or `pages/` (Pages Router, API routes) — detect which is in use.
- Package manager inferred from the lockfile that exists (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## What to reason about

- The real lint (`eslint` with `next/core-web-vitals`), test (Jest/Vitest, plus Playwright/Cypress e2e), and build (`next build`) scripts — captured verbatim.
- The router model (App vs Pages), the Server vs Client Component split, and where data fetching and route handlers live.
- Stack-appropriate skills: `page`/`route`, `server-component`, `route-handler`, `component`.

## Notes

Detect the router before generating skills — App Router and Pages Router have different file conventions and data-fetching models.
