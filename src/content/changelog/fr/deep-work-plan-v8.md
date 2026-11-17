---
title: "DWP v8 : spec-first, boucle fermée"
description: "Deep Work Plan v8 réunit des plans spec-first, le dépôt comme harness, Loop engineering et une efficacité mesurée ; la boucle termine les plans approuvés."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: fr
order: 0
featured: true
sourceLabel: "Version du skill 8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Version du skill v8.0.3"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Version du skill 8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "Version du skill 8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.3"
  - label: "LOOP_ENGINEERING.md (normatif, v8)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "Loop engineering dans le lecteur de spécification"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "Schéma plan-contract/v8"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "Schéma journal-event/v8"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "Schéma plan-snapshot/v8"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "Écriture de la file des plans (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Version du skill 7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Version du skill 7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Version du skill 7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.0"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 réunit quatre idées : le développement spec-first, le dépôt comme harness de l’agent, Loop engineering et l’efficacité mesurée. Sa phrase de travail est : « Spec-first, loop-closed : le dépôt est le harness et le plan avance de lui-même jusqu’à son terme. »

## Les quatre piliers

1. **Spec-first.** Le plan et sa spécification sont la source de vérité durable, avec des critères d’acceptation et des contrôles de validation explicites.
2. **Le dépôt est le harness.** Le contexte, les outils, les règles de contrôle et l’état reprenable vivent avec le code, afin que différents agents travaillent depuis le même dépôt.
3. **Loop engineering.** Un plan approuvé peut suivre son cycle de vie consigné jusqu’à son achèvement.
4. **Efficacité mesurée.** L’efficacité s’exprime en octets d’instructions par flux, avec un parcours de mesure publié ; aucun pourcentage de tokens n’est déduit.

## Ce que signifie Loop engineering

Le plan enregistre un responsable et une succession ordonnée. Une personne démarre le daemon Herdr facultatif avec `herdr-peers autopilot --loop` ; ses relances demandent au responsable de continuer sans accorder de nouvelle autorité. Si le responsable n’est plus disponible, le cycle peut demander à un successeur inscrit de prendre le relais. Les événements du plan peuvent parvenir au notificateur Dailybot du pack et la vue de flotte affiche les agents et les plans sur les machines activées. La personne reste responsable du démarrage du daemon ; l’addon Herdr est facultatif.

## Versions qui fournissent les mécanismes

Le renforcement du pack v7.11.0 et les versions v7.12.x d’enregistrement des plans et de notification fournissent les mécanismes côté plan. herdr-peers v1.3.x ajoute le cycle, les rapports et la vue de flotte ; v2.0.0 ajoute le brain du protocole 2 et le consommateur de file. coding-agents-kit v1.3.0 fournit le contrat de lancement pick-v2 et v1.4.0 ajoute l’outil de mise à jour vérifié. herdr-peers v2.1.0 lit les bloqueurs structurés de v8, et coding-agents-kit v1.5.0 ajoute la mesure des tokens uniquement lorsqu’ils sont rapportés. Les descripteurs d’addons du pack 8.0.0 fixent herdr-peers v2.1.0, coding-agents-kit v1.5.0 et devcontainer-kit v1.3.0. Les versions étiquetées sont liées ci-dessus. Le pack fonctionne sans ces addons facultatifs.

## Le contrat v8

La version 8.0.0 implémente le standard DWP 8.0.0. Les nouveaux plans sont créés avec `plan-contract/v8` ; les plans v7, v6 et v5 conservent leur génération enregistrée et ne migrent qu’avec `refine migrate` explicite. Les plans v8 conservent la ligne `plan-manifest/v7`, et `journal-event/v7` reste pris en charge pour les plans existants. La source normative est `LOOP_ENGINEERING.md`, accompagnée de trois schémas publiés.

- **Le bloc `autonomy`.** Bloc facultatif et fermé de `plan-contract/v8` qui enregistre l’autorité de boucle du plan : `stall_budget` (1–10, valeur par défaut 3), panneaux `promptable` (par défaut : responsable uniquement), cibles `notify` (par défaut : aucune), `brain` (par défaut : `false`) et `queue` (`prompt-lead`, `launch` ou `none`, par défaut `none`). En l’absence du bloc, toutes les valeurs par défaut s’appliquent et la personne reste chargée de résoudre.
- **Bloqueurs structurés.** Un bloqueur est un événement `blocker` de `journal-event/v8`, créé et résolu uniquement via l’utilitaire du ledger, avec une tâche, une raison, une ligne `needs`, une classe obligatoire C1 à C7 et un resolver facultatif. `resolver: lead` est refusé pour C1, C2, C5 et C6 ; le cycle ne demande au responsable de résoudre qu’un bloqueur que le plan a lui-même marqué `resolver: lead`. `state.json` devient `plan-snapshot/v8`, avec le bloqueur actif et un état `blocked` dérivé ; `PROGRESS.md` commence par un en-tête de quatre lignes : objectif, tâche actuelle, prochaine action et besoins.
- **La file des plans.** `.dwp/queue.json` (`dwp-queue-v1`) est écrite uniquement par `shared/queue.py` du pack ou par une personne ; `create` ajoute un plan après approbation et le daemon Herdr ne fait que lire la file. Elle contient au plus 64 plans et en exécute un à la fois par dépôt, sauf si le plan définit `parallel: true`. Une file endommagée n’interrompt jamais le cycle de vie.

La dernière version v7 était la **7.12.2**.

Version du skill installé : **8.0.3**.
