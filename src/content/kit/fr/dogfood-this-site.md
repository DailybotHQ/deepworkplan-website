---
title: "Étude de cas : ce site web"
description: "Comment deepworkplan.com lui-même fonctionne avec Deep Work Plan — un compte rendu réel d’un dépôt Astro de production rendu AI-first avec la méthodologie qu’il documente."
kind: example
lang: fr
order: 2
---

# Étude de cas : ce site web

Le site que vous lisez fonctionne avec la méthodologie qu’il documente. Il pratique le dogfooding de Deep Work Plan : le même skill, le même flux `/init`, les mêmes plans `.dwp/` que tout autre dépôt utiliserait. C’est un compte rendu réel, pas une hypothèse.

## Avant

Comme la plupart des dépôts, celui-ci n’était pas conçu pour les agents. Le contexte résidait dans la tête des gens et dans des notes éparses, il n’existait aucune source de vérité unique qu’un agent pouvait lire, et intégrer un nouvel agent signifiait réexpliquer le projet à chaque session. Le travail de longue haleine dérivait.

## Adopter DWP

Le dépôt a été rendu AI-first avec un seul Deep Work Plan, décomposé en tâches atomiques assorties de portes de validation :

1. Installer le skill Deep Work Plan en installation de référence, épinglée par `skills-lock.json`.
2. Lancer l’onboarding pour générer un `AGENTS.md` raisonné, l’arborescence `docs/` et la doc par module à partir de la stack réelle du dépôt.
3. Construire le kit `.agents/` partagé entre agents — des délégateurs de commande `dwp-*` légers et un catalogue qui correspond à ce qui est sur disque.
4. Échafauder l’espace de travail `.dwp/` ignoré par git pour les plans et les ébauches.
5. Vérifier la conformité avec `/dwp-verify`.

Chaque tâche a été validée face aux vraies portes du dépôt — `biome`, `astro:check`, la suite de tests, le build de production et la vérification de parité des endpoints d’agent — avant d’être marquée comme achevée.

## Après

Le dépôt est désormais AI-first selon sa propre spécification : un `AGENTS.md` raisonné, une arborescence `docs/` catégorisée, un kit `.agents/` partagé entre agents et un espace de travail `.dwp/` ignoré par git. N’importe quel agent — Claude Code, Cursor, Codex, Gemini, Copilot — peut l’ouvrir, lire le harness et exécuter des plans de longue haleine sans assistance à chaque session.

## Résultat

La méthodologie fait ses preuves sur sa propre source : ce site est construit et maintenu de la même manière qu’il vous dit de construire le vôtre — en suivant [`/init.md`](/init.md). Si le standard fonctionne ici, en production, il fonctionne aussi pour votre dépôt.
