---
title: "Spécification Deep Work Plan"
description: "La spécification lisible de la méthodologie Deep Work Plan : le format DWP, le protocole d'agent, les archétypes, le standard de documentation et le mécanisme des add-ons."
lastUpdated: 2026-05-30
---

## Spécification Deep Work Plan

La spécification est la définition précise et lisible de la méthodologie — les structures et protocoles que les humains et les agents partagent. Elle énonce, en termes normatifs RFC 2119, comment un plan piloté par la spécification est structuré et comment un agent doit s'exécuter face à lui : le plan est la source de vérité, les portes de validation sont binaires, et le dépôt lui-même porte le harness dont un agent a besoin. Elle est organisée en documents ordonnés :

- **Standard de documentation** — la structure de dépôt AI-first.
- **Spécification DWP** (v1.2) — la structure du plan, l'anatomie d'une tâche, la boucle d'exécution, la section Delta pour les changements sur du code existant, le Protocole de reprise DWP, les niveaux de rigueur proportionnelle (micro/standard/deep) et la couche d'état du plan lisible par machine.
- **Protocole de l'agent** (v1.2) — le comportement inter-agents requis, le mappage des commandes, les agents supportés (dont OpenClaw et Hermes) et les profils d'exécution (interactif vs sans surveillance) avec les conditions d'arrêt et la continuation planifiée.
- **Archétypes** (v1.1) — dépôts individuels, hubs orchestrateurs et espace de travail d'agent (le foyer durable d'un agent autonome : espace de travail OpenClaw, répertoire de service Hermes, volume d'agent cloud) ; l'heuristique de classification et en quoi l'onboarding diffère.
- **Add-ons** — le mécanisme facultatif pour superposer des capacités optionnelles, dont le sous-skill author (pour qu'un dépôt fasse grandir son propre kit), des add-ons de maintenance comme dependency-upgrade, et l'add-on design-system (un `docs/DESIGN.md` raisonné à partir de la véritable source de conception du dépôt, avec des profils pour l'UI visuelle, la sortie CLI et les surfaces conversationnelles).
- **Conformité** — la définition normative d'un dépôt AI-first : les artefacts qu'un dépôt MUST et SHOULD posséder, ce qui rend un plan bien formé, et comment le vérifier objectivement avec `/dwp-verify`.
- **État du plan** — la couche d'état lisible par machine : `manifest.json` et `state.json`, enregistrements de portes, enregistrements de résultats comme mémoire épisodique, réconciliation (le markdown l'emporte), et quand la couche est requise.

- [Lire la spécification](/spec)
- [Lire la méthodologie](/methodology)
