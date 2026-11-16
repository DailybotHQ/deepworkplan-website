---
title: "DWP v8 : spec-first, boucle fermée"
description: "Deep Work Plan v8 réunit des plans spec-first, le dépôt comme harness, Loop engineering et une efficacité mesurée ; la boucle termine les plans approuvés."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: fr
order: 0
featured: true
sourceLabel: "Versions étiquetées et brouillon du contrat v8"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
sourceLinks:
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
---

Deep Work Plan v8 réunit quatre idées : développement spec-first, dépôt comme harness des agents, Loop engineering et efficacité mesurée. Phrase de travail : « Spec-first, boucle fermée : le dépôt est le harness et le plan va jusqu’au bout. »

## Les quatre piliers

1. **Spec-first :** plan et spécification comme source durable, avec acceptation et validation explicites. 2. **Le dépôt est le harness :** contexte, outils, règles et état reprenable sont avec le code. 3. **Loop engineering :** un plan approuvé suit son cycle jusqu’au bout. 4. **Efficacité mesurée :** octets d’instructions par flux, parcours de mesure publié ; aucun pourcentage de tokens déduit.

## Ce que signifie Loop engineering

Le plan enregistre un responsable et une succession ordonnée. Un humain lance le daemon Herdr facultatif avec herdr-peers autopilot --loop ; les relances demandent de continuer sans accorder de nouvelle autorité. En cas d’absence, un successeur inscrit peut prendre le relais. Les événements atteignent le notifier Dailybot ; la vue de flotte montre les agents et plans activés. L’humain lance le daemon ; Herdr est facultatif.

## Versions qui portent les mécanismes

Le renforcement du pack v7.11.0, puis l’enregistrement des plans et notifications v7.12.x fournissent les mécanismes. herdr-peers v1.3.x ajoute boucle, rapports et flotte ; v2.0.0 ajoute brain protocole 2 et consommateur de file. coding-agents-kit v1.3.0 fournit pick-v2, v1.4.0 l’updater vérifié. Versions liées ci-dessus ; addons facultatifs.

## Contrat v8 — RE-VERIFY AT 8.0.0

Le brouillon origin/feat/v8-line ajoute autonomy à plan-contract/v8 : budget de stagnation, panneaux sollicitables, cibles de notification, autorisation du brain et comportement de file. Il définit aussi dwp-queue-v1 pour .dwp/queue.json ; le pack écrit la file et Herdr la lit. Affirmations provisoires à vérifier dans les artefacts taggés 8.0.0 avant publication.
