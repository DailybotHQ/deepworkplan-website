---
title: Next.js
description: "Un preset d'onboarding pour les projets Next.js, avec des indices de raisonnement sur App vs Pages Router, les Server et Client Components, les route handlers et les tests."
kind: preset
lang: fr
order: 12
stack: Next.js (React)
---

# Preset Next.js

Un guide de raisonnement que le flux d'onboarding utilise pour les projets Next.js. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- `package.json` avec `next` et `react`, plus un `next.config.js`/`next.config.mjs`/`next.config.ts`.
- `app/` (App Router, Server/Client Components, route handlers) ou `pages/` (Pages Router, routes API) — détecter lequel est utilisé.
- Le gestionnaire de paquets est déduit depuis le lockfile présent (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Sur quoi raisonner

- Les scripts réels de lint (`eslint` avec `next/core-web-vitals`), de test (Jest/Vitest, plus Playwright/Cypress e2e) et de build (`next build`) — capturés verbatim.
- Le modèle de routeur (App vs Pages), la séparation Server vs Client Component, et l'endroit où vivent le data fetching et les route handlers.
- Les skills adaptés à la stack : `page`/`route`, `server-component`, `route-handler`, `component`.

## Notes

Détecter le routeur avant de générer les skills — App Router et Pages Router ont des conventions de fichiers et des modèles de data fetching différents.
