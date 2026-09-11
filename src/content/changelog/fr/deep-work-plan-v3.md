---
title: "DWP v3 : l'efficacité des tokens par construction"
description: "Deep Work Plan v3 reconstruit le harness autour du coût du contexte — divulgation progressive, validation limitée à ce qui est affecté, et une unique revue finale obligatoire — tout en relevant le niveau de confiance et de conformité."
date: 2026-09-10
version: "v3 · Efficacité des tokens"
kind: release
lang: fr
order: 2
featured: false
sourceLabel: "Skill release commit d050474"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/d050474bea3a2b7675ce851efb377833b4960367"
---

Aujourd'hui, nous publions Deep Work Plan v3. Le contexte est la ressource la plus rare d'un agent, et cette version traite cela comme un problème d'ingénierie plutôt que comme une promesse informelle : on compresse l'échafaudage, jamais les instructions.

`GUIDE.md` devient un index de routage plutôt qu'un document que chaque agent lit intégralement, si bien qu'un agent ne charge que le guide dont une étape donnée a réellement besoin. Les portes de validation sont désormais sélectionnées à partir de la surface affectée de chaque tâche, plutôt que de relancer toute la suite à chaque changement, et la création d'un plan peut passer directement en mode confiance lorsqu'un développeur sait déjà ce qu'il veut, sans revue intermédiaire. Rien de tout cela n'affaiblit les portes de validation : cela supprime les lectures répétées, le chargement de contexte redondant et le travail de validation qui ne correspond pas à ce qui a réellement changé.

Parallèlement au travail d'efficacité, cette version relève le niveau de confiance. Une unique revue finale obligatoire remplace les trois tâches de clôture qui terminaient auparavant un plan, la revue locale AI Diff Reviewer devient un composant obligatoire du socle, et la conformité part désormais de zéro module complémentaire optionnel — la sécurité et la provenance sont des exigences, pas une finition optionnelle. `AGENTS.md` consigne la provenance du standard DWP du dépôt, et les plans hérités conservent leur forme enregistrée avec un chemin de migration explicite, au lieu d'être réécrits silencieusement.

Cette version suit le standard DWP `2.3.0`. La charge d'instructions et le comportement en rejeu sont mesurés par rapport à un registre d'évaluation public, jamais présentés comme un pourcentage d'économie inventé.

Lisez l'[architecture d'efficacité des tokens](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/adr/0001-token-efficiency-architecture.md) et son [registre d'évaluation](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/evaluations/token-efficiency.md), ou explorez la [spécification normative](https://deepworkplan.com/spec) et le [kit](https://deepworkplan.com/kit/).
