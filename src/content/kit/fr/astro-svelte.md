---
title: Astro / Svelte
description: "Un preset d’onboarding pour les sites Astro, éventuellement avec des îlots Svelte, avec des indices de raisonnement pour les content collections, la validation de schéma et l’hydratation des îlots."
kind: preset
lang: fr
order: 3
stack: Astro / Svelte
---

# Preset Astro / Svelte

Un guide de raisonnement que le flux onboard utilise pour les sites Astro, éventuellement avec des îlots Svelte. C’est une liste de contrôle, pas un modèle — la réalité détectée l’emporte.

## Signaux

- `astro.config.*` ; éventuellement `@astrojs/svelte` et des composants `.svelte`.
- Des Content Collections sous `src/content/` avec des schémas Zod.

## Ce sur quoi raisonner

- Les vrais scripts de lint, de vérification de types (`astro check`), de test et de build — capturés verbatim.
- Les schémas de content collection et les conventions d’hydratation des îlots (`client:visible` plutôt que `client:load`).
- Des skills adaptés à la stack pour les composants, les pages et les entrées de contenu.

## Notes

Utile pour les sites pilotés par le contenu utilisant l’architecture en îlots d’Astro avec une interactivité sélective.
