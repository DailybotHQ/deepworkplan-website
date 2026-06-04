---
title: Vue + Vite
description: "Un preset d’onboarding pour les projets Vue + Vite, avec des indices de raisonnement pour les composants monofichiers, la Composition API, les stores Pinia et les tests Vitest."
kind: preset
lang: fr
order: 2
stack: Vue + Vite
---

# Preset Vue + Vite

Un guide de raisonnement que le flux onboard utilise pour les projets Vue + Vite. C’est une liste de contrôle, pas un modèle — la réalité détectée l’emporte.

## Signaux

- `vite.config.*` et `vue` dans les dépendances (Vue 3, `<script setup>`).
- `@vitejs/plugin-vue`, `vue-tsc`, `vue-router`, `pinia`.
- Gestionnaire de paquets déduit du fichier de verrouillage existant.

## Ce sur quoi raisonner

- Les vrais scripts de lint, de vérification de types (`vue-tsc --noEmit`), de test (Vitest/Jest) et de build — capturés verbatim.
- La convention de test (`*.spec.ts` / `*.test.ts`) et les patterns `@vue/test-utils`.
- Des skills adaptés à la stack : `component`, `store-module`, `composable`, `view`/`route`.

## Notes

Si `react` figure dans les dépendances à la place de `vue`, réutilisez le même raisonnement avec des skills façonnés pour React.
