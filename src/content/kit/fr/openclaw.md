---
title: OpenClaw
description: "L'adaptateur DWP pour OpenClaw : scan natif de .agents/skills, mappage de l'exécution sans surveillance, et continuation de plan pilotée par cron pour les espaces de travail d'agents autonomes."
kind: adapter
lang: fr
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# Adaptateur OpenClaw

OpenClaw est une plateforme d'agents autonomes qui exécute des espaces de travail durables avec des tours planifiés. Il scanne nativement `<workspace>/.agents/skills/` à la recherche de skill packs installés, ce qui signifie que le skill DWP se charge sans aucun shim d'adaptateur — il suffit de l'installer là et OpenClaw le récupère automatiquement.

## Niveau de support

**Complet** — OpenClaw lit `AGENTS.md` et charge le skill via le standard AgentSkills. Tous les sous-skills DWP (`onboard`, `create`, `execute`, `refine`, `resume`, `status`, `verify`) sont disponibles.

## Installation

```bash
openclaw skills install deepworkplan
```

Ou manuellement : cloner `DailybotHQ/deepworkplan-skill` dans `<workspace>/.agents/skills/deepworkplan/`.

## Invocation

Texte simple — OpenClaw n'utilise pas de préfixe de commande slash :

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## Mappage de l'exécution sans surveillance

Les primitives de planification d'OpenClaw correspondent directement au modèle de continuation de DWP :

| Primitive OpenClaw | Rôle DWP |
|--------------------|----------|
| Racine de l'espace de travail | Archétype [espace de travail d'agent](/spec/archetypes) : `AGENTS.md`, `.agents/`, `.dwp/` à la racine de l'espace de travail |
| `<workspace>/.agents/skills/` (scan natif de niveau 2) | Là où ce pack réside — aucun shim d'adaptateur nécessaire |
| Tour heartbeat ou cron | Un tour de [continuation planifiée](/spec/agent-protocol#scheduled-continuation) : réveil → Protocole de reprise DWP → tâche atomique suivante → mise à jour de l'état → yield |
| Vérifications `HEARTBEAT.md` | Ajouter une ligne : « Si `.dwp/plans/` a un plan ouvert, le reprendre pour une tâche. » |
| Ordres permanents | La limite d'approbation du plan et l'autorité bornée du profil sans surveillance |

Opérationnellement :

1. Un humain crée et approuve un plan de façon interactive. L'approbation est le point de contrôle — les tours sans surveillance ne créent et n'exécutent jamais en un seul tour.
2. Le plan doit porter la couche d'état lisible par machine (`manifest.json` + `state.json`). Dans un espace de travail sans git, `state.json` est ce qui rend possible la reprise après crash. Voir [État du plan](/spec/plan-state).
3. Chaque tour heartbeat ou cron exécute au plus une tâche, passe sa porte de validation, met à jour `state.json` de façon atomique, et cède la main.
4. En cas de condition d'arrêt, l'agent renseigne le champ `blocked` de `state.json` et signale via le canal normal de l'espace de travail. Le prochain regard humain — ou le rapport heartbeat — voit exactement ce qui est nécessaire.

Le résultat : un plan multi-jours qui survit aux redémarrages, aux changements de modèle et aux limites de session, exécuté la nuit par le daemon — avec les mêmes portes qu'une exécution supervisée par un humain.

## Notes

L'espace de travail OpenClaw est l'exemple canonique de l'archétype [espace de travail d'agent](/spec/archetypes). L'intégration `HEARTBEAT.md` du skill pack DWP et l'exigence `state.json` ont été conçues avec cette plateforme à l'esprit.
