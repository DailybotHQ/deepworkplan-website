---
title: "Spécification Deep Work Plan"
description: "La spécification lisible de la méthodologie Deep Work Plan : le format DWP, le protocole d'agent, les archétypes, le standard de documentation et le mécanisme des add-ons."
lastUpdated: 2026-09-28
---

## Spécification Deep Work Plan

**Norme actuelle : DWP 8.0.0 (version `v8.0.0`).** La base conservée comprend la couche d’enregistrement v6 et les extensions v7 ; les nouveaux plans utilisent `plan-contract/v8` par défaut. Les plans v5, v6 et v7 existants conservent leur génération enregistrée et ne migrent qu’au moyen d’un `refine migrate` explicite. v8 conserve `plan-manifest/v7` et ajoute `plan-contract/v8`, `journal-event/v8` et `plan-snapshot/v8` ; les schémas de manifeste et d’événement de journal v7 restent pris en charge pour les plans existants. [Manifeste v7](https://deepworkplan.com/schema/plan-manifest/v7.json), [contrat v8](https://deepworkplan.com/schema/plan-contract/v8.json), [événement de journal v8](https://deepworkplan.com/schema/journal-event/v8.json) et [instantané v8](https://deepworkplan.com/schema/plan-snapshot/v8.json).

La spécification est la définition précise et lisible de la méthodologie — les structures et protocoles que les humains et les agents partagent. Elle énonce, en termes normatifs RFC 2119, comment un plan piloté par la spécification est structuré et comment un agent doit s'exécuter face à lui : le plan est la source de vérité, les portes de validation sont binaires, et le dépôt lui-même porte le harness dont un agent a besoin. Elle est organisée en documents ordonnés :

- **Couche de registre** — la couche de registre fondée sur des preuves : contrat, journal, classes de preuves (affirmées vs observées), approbations et reçus.
- **Ressources et capacités** — exécution bornée : manifeste de contexte, enveloppe de ressources, capacités de l hôte, registre d extensions et capacités.
- **Délégation** — exécution multi-agents et en essaim : worktrees parallèles, événements de délégation, transports et succession par époques.
- **État du plan** — la couche d état lisible par machine : instantané dérivé du journal en v6/v7 (`ledger.py project`), couche d état historique v5 et réconciliation.
- **Spécification DWP** — la structure du plan, l'anatomie d'une tâche, la boucle d'exécution, la section Delta pour les changements sur du code existant, le Protocole de reprise DWP, les niveaux de rigueur proportionnelle (micro/standard/deep) et la couche d'état du plan lisible par machine.
- **Protocole de l'agent** — le comportement inter-agents requis, le mappage des commandes, les agents supportés (dont OpenClaw et Hermes) et les profils d'exécution (interactif vs sans surveillance) avec les conditions d'arrêt et la continuation planifiée.
- **Archétypes** — dépôts individuels, hubs orchestrateurs et espace de travail d'agent (le foyer durable d'un agent autonome : espace de travail OpenClaw, répertoire de service Hermes, volume d'agent cloud) ; l'heuristique de classification et en quoi l'onboarding diffère.
- **Add-ons** — le mécanisme facultatif pour superposer des capacités optionnelles, dont le sous-skill author (pour qu'un dépôt fasse grandir son propre kit), des add-ons de maintenance comme dependency-upgrade, et l'add-on design-system (un `docs/DESIGN.md` raisonné à partir de la véritable source de conception du dépôt, avec des profils pour l'UI visuelle, la sortie CLI et les surfaces conversationnelles).
- **Conformité** — la définition normative d'un dépôt AI-first : les artefacts qu'un dépôt MUST et SHOULD posséder, ce qui rend un plan bien formé, et comment le vérifier objectivement avec `/dwp-verify`.
- **État du plan** — la couche d'état lisible par machine : `manifest.json` et `state.json`, enregistrements de portes, enregistrements de résultats comme mémoire épisodique, réconciliation (le markdown l'emporte), et quand la couche est requise.

- [Lire la spécification](/spec)
- [Lire la méthodologie](/methodology)
