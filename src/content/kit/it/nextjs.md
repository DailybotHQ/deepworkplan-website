---
title: Next.js
description: "Preset di onboarding per progetti Next.js, con spunti di ragionamento per App vs Pages Router, Server e Client Component, route handler e testing."
kind: preset
lang: it
order: 12
stack: Next.js (React)
---

# Preset Next.js

Una guida di ragionamento che il flusso di onboard usa per i progetti Next.js. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `package.json` con `next` e `react`, più un `next.config.js`/`next.config.mjs`/`next.config.ts`.
- `app/` (App Router, Server/Client Component, route handler) o `pages/` (Pages Router, API route) — rilevare quale è in uso.
- Package manager dedotto dal lockfile presente (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Su cosa ragionare

- Gli script reali di lint (`eslint` con `next/core-web-vitals`), test (Jest/Vitest, più Playwright/Cypress e2e) e build (`next build`) — catturati alla lettera.
- Il modello di router (App vs Pages), la suddivisione Server vs Client Component e dove risiedono il data fetching e i route handler.
- Skill adatte allo stack: `page`/`route`, `server-component`, `route-handler`, `component`.

## Note

Rilevare il router prima di generare le skill — App Router e Pages Router hanno convenzioni di file e modelli di data fetching diversi.
