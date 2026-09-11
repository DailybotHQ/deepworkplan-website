---
title: "DWP v4 : des plans à la mesure du travail"
description: "Deep Work Plan v4 fait en sorte que le format du plan suive le travail, et non l'inverse — un plan Lite est désormais une proposition complète et exécutable pour les tâches bornées, et l'étape séparée de brouillon disparaît."
date: 2026-09-11
version: "v4 · Plans Lite-first"
kind: release
lang: fr
order: 1
featured: true
sourceLabel: "Skill release commit 3daab90"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/3daab90"
---

Aujourd'hui, nous publions Deep Work Plan v4. Cette version porte sur l'agilité et la polyvalence : la même méthodologie doit rester légère pour une correction bornée tout en tenant la route pour un travail qui s'étend sur des heures, voire des jours, sans obliger un développeur à choisir le format « sérieux » juste pour obtenir de vraies portes de validation.

Créer un plan pour un travail borné ne signifie plus écrire un brouillon jetable pour révision, puis un plan final séparé. `create` matérialise désormais directement un **plan Lite** : une proposition compacte et entièrement exécutable, avec des fiches de tâches en ligne, chacune assortie de ses propres critères d'acceptation, de sa porte de validation et de son journal de clôture. Il n'y a plus d'étape intermédiaire `.dwp/drafts/` — le brouillon et le plan sont le même artefact, révisable et exécutable dès l'instant où il est écrit.

Les plans complets à fichiers de tâches restent exactement à leur place : le travail plus long et plus risqué continue de recevoir un fichier par tâche, un rapport d'analyse dédié et la même couche d'état reprenable. Un plan Lite peut être promu en Full dès qu'une exigence ou une porte de validation ne tient plus dans une fiche compacte, et le choix de la représentation de départ suit des signaux explicites et consignés — nombre de tâches, surface affectée, risque, réversibilité — jamais une supposition.

Cette version suit le standard DWP `2.4.0`. Lisez la [spécification normative](https://deepworkplan.com/spec), explorez le [kit](https://deepworkplan.com/kit/), ou démarrez l'adoption depuis [`/init`](https://deepworkplan.com/init).
