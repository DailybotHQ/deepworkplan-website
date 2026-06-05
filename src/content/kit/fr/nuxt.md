---
title: Nuxt
description: "Un preset d'onboarding pour les projets Nuxt, avec des indices de raisonnement sur les pages, les routes API serveur, les composables, le moteur serveur Nitro et les tests."
kind: preset
lang: fr
order: 14
stack: Nuxt (Vue)
---

# Preset Nuxt

Un guide de raisonnement que le flux d'onboarding utilise pour les projets Nuxt. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- `nuxt.config.ts` et `nuxt` dans les dépendances, avec un point d'entrée `app.vue`.
- `pages/` (routage basé sur les fichiers), `server/api/` (endpoints Nitro), `composables/` et des `components/` auto-importés.
- Le gestionnaire de paquets est déduit depuis le lockfile présent (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Sur quoi raisonner

- Les scripts réels de lint (`eslint`), de vérification de types (`nuxi typecheck`), de test (Vitest avec `@nuxt/test-utils`) et de build (`nuxt build`) — capturés verbatim.
- Le routage et le data fetching (`useFetch`/`useAsyncData`), les routes Nitro `server/api/`, les composables et les conventions d'auto-import ; le mode de rendu (SSR/SSG/SPA).
- Les skills adaptés à la stack : `page`/`route`, `server-route` (`server/api`), `composable`, `component`.

## Notes

Les auto-imports (composants, composables, utils) sont une convention Nuxt — en tenir compte plutôt que d'ajouter des imports explicites partout.
