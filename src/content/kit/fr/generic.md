---
title: Générique
description: "Le preset d’onboarding de repli pour tout projet, avec des indices de raisonnement indépendants de la stack qui détectent les commandes de build et de test depuis le dépôt."
kind: preset
lang: fr
order: 100
stack: Generic
---

# Preset générique

Le guide de raisonnement de repli que le flux onboard utilise lorsqu’aucun preset spécifique à une stack ne s’applique. C’est une liste de contrôle, pas un modèle — la réalité détectée l’emporte.

## Ce sur quoi raisonner

- Détecter les vraies commandes de build et de test depuis le manifeste, le Makefile ou la CI — capturées verbatim.
- Appliquer des conventions générales ; ne faire aucune hypothèse propre à une stack.
- Générer uniquement les skills, agents et docs qui correspondent aux workflows réels du dépôt.

## Notes

Le repli lorsqu’aucun des presets Django, Vue + Vite, Astro/Svelte, service Node/TS ou package/CLI Python ne correspond.
