---
title: Next.js
description: "Ein Onboarding-Preset für Next.js-Projekte mit Reasoning-Hinweisen zu App vs. Pages Router, Server- und Client-Komponenten, Route-Handlern und Testing."
kind: preset
lang: de
order: 12
stack: Next.js (React)
---

# Next.js-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Next.js-Projekte nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `package.json` mit `next` und `react` sowie eine `next.config.js`/`next.config.mjs`/`next.config.ts`.
- `app/` (App Router, Server/Client Components, Route Handler) oder `pages/` (Pages Router, API-Routen) — erkennen, was im Einsatz ist.
- Paketmanager wird aus der vorhandenen Lockfile abgeleitet (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Worüber nachzudenken ist

- Die echten Lint- (`eslint` mit `next/core-web-vitals`), Test- (Jest/Vitest plus Playwright/Cypress e2e) und Build-Skripte (`next build`) — wortwörtlich erfasst.
- Das Router-Modell (App vs. Pages), die Aufteilung Server- vs. Client-Komponenten sowie der Ort von Datenabruf und Route-Handlern.
- Stack-passende Skills: `page`/`route`, `server-component`, `route-handler`, `component`.

## Hinweise

Den Router erkennen, bevor Skills generiert werden — App Router und Pages Router haben unterschiedliche Dateikonventionen und Datenabruf-Modelle.
