---
title: "DWP v6 : la même méthode, un contrat plus strict"
description: "Deep Work Plan v6 conserve la méthodologie v5 et ajoute une structure d’exécution plus stricte. La non-infériorité des résultats des agents n’a pas été mesurée."
date: 2026-09-28
version: "v6 · Structure plus stricte"
kind: release
lang: fr
order: 1
featured: true
sourceLabel: "Ensemble de schémas v6 publié"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6 conserve la méthodologie v5, la surface de commandes et l’emplacement `.dwp/plans/`. Il ajoute une structure plus stricte pour représenter l’autorité du plan, les preuves d’exécution, le contexte de chaque tâche, la planification et l’état actif.

L’ensemble de schémas v6 définit le manifeste d’identité, le contrat de résultats et d’autorité, les événements du journal en ajout seul, le manifeste de contexte par tâche et l’instantané actif. La projection active de v6 est un instantané ; `plan-state/v5.json` reste donc le schéma d’état pour les plans v5. `plan-state/v6.json` n’existe pas. Les plans existants conservent leur génération enregistrée et ne sont jamais réécrits silencieusement.

La décision d’architecture est GO : v6 conserve la même méthodologie avec une structure d’ingénierie plus stricte. Il ne s’agit pas d’une affirmation de supériorité empirique. La non-infériorité des résultats des agents n’a pas été mesurée.

Les nouveaux plans reçoivent des ID numériques croissants, sur au moins trois chiffres (par exemple `PLAN_001_add_payment_webhooks/`). Comme les schémas v5 figés comptent l’ID numérique comme un mot, les slugs v5 comportent 2 à 4 mots ; les slugs v6, 2 à 5. Les dossiers existants non numérotés `PLAN_<slug>/` restent lisibles et ne sont jamais renommés. S’il existe des plans numérotés, `latest` désigne celui dont l’ID numérique est le plus élevé.
