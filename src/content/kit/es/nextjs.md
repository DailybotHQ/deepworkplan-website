---
title: Next.js
description: "Preset de incorporación para proyectos Next.js, con pistas de razonamiento para App vs Pages Router, Server y Client Components, route handlers y pruebas."
kind: preset
lang: es
order: 12
stack: Next.js (React)
---

# Preset Next.js

Guía de razonamiento que el flujo de onboard usa para proyectos Next.js. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `package.json` con `next` y `react`, más un `next.config.js`/`next.config.mjs`/`next.config.ts`.
- `app/` (App Router, Server/Client Components, route handlers) o `pages/` (Pages Router, API routes) — detectar cuál está en uso.
- El gestor de paquetes se infiere del lockfile que exista (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Qué razonar

- Los scripts reales de lint (`eslint` con `next/core-web-vitals`), pruebas (Jest/Vitest, más Playwright/Cypress e2e) y compilación (`next build`) — capturados al pie de la letra.
- El modelo de router (App vs Pages), la separación Server vs Client Component y dónde viven la obtención de datos y los route handlers.
- Skills adecuadas al stack: `page`/`route`, `server-component`, `route-handler`, `component`.

## Notas

Detecta el router antes de generar skills — App Router y Pages Router tienen diferentes convenciones de archivos y modelos de obtención de datos.
