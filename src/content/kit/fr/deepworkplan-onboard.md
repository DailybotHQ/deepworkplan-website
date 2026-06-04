---
title: deepworkplan-onboard
description: "Rendre un dépôt AI-first en raisonnant sur sa stack et son archétype, puis en générant un AGENTS.md adapté, des docs/, un .agents/ et un .dwp/ ignoré par git."
kind: command
lang: fr
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

Transformer un dépôt en une base de code AI-first, pilotée par la spécification. C’est le sous-skill onboard du skill Deep Work Plan.

## Ce qu’il fait

`deepworkplan-onboard` inspecte le dépôt **réel** — langages, frameworks, gestionnaire de paquets, commandes de build/test/lint, modules, convention de test, forme du déploiement — et génère des artefacts adaptés à celui-ci. Il raisonne ; il ne copie jamais un modèle et ne laisse jamais d’espace réservé.

## Utilisation

```
/deepworkplan-onboard
```

## Comportement

1. Reconnaissance — détecter la stack réelle et les commandes de validation ; faire correspondre le preset d’onboarding le plus proche.
2. Archétype — classer comme dépôt individuel ou hub orchestrateur.
3. Générer `AGENTS.md` + le lien symbolique `CLAUDE.md` avec un bloc Quick Commands réel.
4. Générer `docs/` (architecture, standards, tests, sécurité, et davantage) et la doc par module.
5. Générer `.agents/` (agents, commandes `dwp-*` légères, skills adaptés à la stack, catalogue) + `.claude → .agents`.
6. Installer le skill et échafauder un `.dwp/` ignoré par git (plans, ébauches) et un espace de travail temporaire `tmp/`.
7. Proposer les addons facultatifs, puis effectuer une auto-vérification.

## Notes

Un dépôt est pleinement conforme avec zéro addon. La réalité détectée l’emporte toujours sur les hypothèses des presets.
