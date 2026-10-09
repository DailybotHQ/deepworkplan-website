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
7. Installer la revue locale requise d’AI Diff Reviewer, proposer les addons facultatifs, puis effectuer une auto-vérification.

## Notes

Un dépôt est pleinement conforme avec zéro addon optionnel ; la revue locale d’AI Diff Reviewer fait partie de la ligne de base depuis le standard 2.3.0. La réalité détectée l’emporte toujours sur les hypothèses des presets.

## Références des schémas v7

Pour les plans v7 — le défaut du pack 7.x actuel —, le catalogue des schémas lisibles par machine est publié à ces URL stables. La projection active est un instantané partagé avec v6 ; ni `plan-state/v6.json` ni `plan-state/v7.json` n’existent.

- **Manifeste du plan :** https://deepworkplan.com/schema/plan-manifest/v7.json
- **Contrat du plan :** https://deepworkplan.com/schema/plan-contract/v7.json (le contrat v6 plus un marqueur de tâche optionnel `parallel_safe`)
- **Événement du journal :** https://deepworkplan.com/schema/journal-event/v7.json (ajoute l’événement `delegation`)
- **Instantané du plan (projection active, partagée avec v6) :** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Manifeste de contexte (partagé avec v6) :** https://deepworkplan.com/schema/context-manifest/v6.json

Les plans v6 conservent leurs schémas v6 ([manifeste](https://deepworkplan.com/schema/plan-manifest/v6.json), [contrat](https://deepworkplan.com/schema/plan-contract/v6.json), [événement du journal](https://deepworkplan.com/schema/journal-event/v6.json)) ; les plans v5 existants continuent d’utiliser le schéma d’état v5, et les anciens plans ne sont jamais réécrits silencieusement.

Le pack 7.x actuel crée les nouveaux plans en v7 par défaut. Les plans existants conservent leur génération enregistrée ; une migration exige une demande explicite. Les nouveaux plans reçoivent des ID numériques croissants, sur au moins trois chiffres (par exemple `PLAN_001_add_payment_webhooks/`). Comme les schémas v5 figés comptent l’ID numérique comme un mot, les slugs v5 comportent 2 à 4 mots ; les slugs v7, 2 à 5. Les dossiers existants non numérotés `PLAN_<slug>/` restent lisibles et ne sont jamais renommés. S’il existe des plans numérotés, `latest` désigne celui dont l’ID numérique est le plus élevé.
