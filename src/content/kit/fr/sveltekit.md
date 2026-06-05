---
title: SvelteKit
description: "Un preset d'onboarding pour les projets SvelteKit, avec des indices de raisonnement sur les routes, les fonctions load, les endpoints serveur, l'adaptateur choisi et les tests."
kind: preset
lang: fr
order: 13
stack: SvelteKit
---

# Preset SvelteKit

Un guide de raisonnement que le flux d'onboarding utilise pour les projets SvelteKit. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- `svelte.config.js` et un `vite.config.*`, avec `@sveltejs/kit` dans les dépendances.
- `src/routes/` avec `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte` et des endpoints `+server.ts`.
- Le gestionnaire de paquets est déduit depuis le lockfile présent (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Sur quoi raisonner

- Les scripts réels de lint (`eslint`), de vérification de types (`svelte-check`), de test (Vitest, plus Playwright e2e) et de build (`vite build`) — capturés verbatim.
- Le modèle de routage et de `load` (chargements serveur vs universels), les form actions et les endpoints API `+server.ts` ; l'adaptateur configuré.
- Les skills adaptés à la stack : `route` (`+page` + `load`), `endpoint` (`+server.ts`), `component`.

## Notes

Noter l'adaptateur configuré (`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel) — il détermine le scénario de build et de déploiement.
