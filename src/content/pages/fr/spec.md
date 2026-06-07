---
title: "Spécification Deep Work Plan"
description: "La spécification lisible de la méthodologie Deep Work Plan : le format DWP, le protocole d’agent, les archétypes, le standard de documentation et le mécanisme des add-ons."
lastUpdated: 2026-05-30
---

## Spécification Deep Work Plan

La spécification est la définition précise et lisible de la méthodologie — les structures et protocoles que les humains et les agents partagent. Elle énonce, en termes normatifs RFC 2119, comment un plan piloté par la spécification est structuré et comment un agent doit s’exécuter face à lui : le plan est la source de vérité, les portes de validation sont binaires, et le dépôt lui-même porte le harness dont un agent a besoin. Elle est organisée en documents ordonnés :

- **Standard de documentation** — la structure de dépôt AI-first.
- **Spécification DWP** — la structure du plan, l’anatomie d’une tâche et la boucle d’exécution.
- **Protocole de l’agent** — le comportement inter-agents requis et le mappage des commandes.
- **Archétypes** — dépôts individuels versus hubs orchestrateurs.
- **Add-ons** — le mécanisme facultatif pour superposer des capacités optionnelles, dont le sous-skill author (pour qu’un dépôt fasse grandir son propre kit), des add-ons de maintenance comme dependency-upgrade, et l’add-on frontend design-system (un `docs/DESIGN.md` raisonné à partir des véritables tokens de conception du dépôt).
- **Conformité** — la définition normative d’un dépôt AI-first : les artefacts qu’un dépôt MUST et SHOULD posséder, ce qui rend un plan bien formé, et comment le vérifier objectivement avec `/dwp-verify`.

- [Lire la spécification](/spec)
- [Lire la méthodologie](/methodology)
