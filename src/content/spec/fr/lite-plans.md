---
title: Plans Lite
description: "Plans Lite : enregistrements de tâche compacts et exécutables en ligne dans README.md, leur création, la sélection de format, et la promotion vers un plan Full."
order: 3
lang: fr
section: Workflow
---

# Plans Lite

**Version 2.4.0. Statut : stable.** Ce document spécifie la représentation de plan Lite introduite aux côtés de la [Spécification DWP](/spec/dwp-specification) : un format de plan pour un travail borné de petite à moyenne taille qui est matérialisé directement, sans étape d'ébauche non exécutable. Les mots-clés MUST, MUST NOT, SHOULD, SHOULD NOT et MAY doivent être interprétés comme décrit dans la RFC 2119.

## Représentation et cycle de vie

Un plan MUST être l'une de deux représentations, consignée une fois dans `manifest.json` sous `plan_format` : **Full** stocke un fichier par tâche sous `<n>.task_<slug>.md` ; **Lite** stocke des enregistrements de tâche compacts et exécutables en ligne dans `README.md`, chacun derrière une ancre stable `{#task-N}`. Un plan Lite n'est pas un plan Full partiel ou informel : chaque enregistrement de tâche MUST toujours porter un objectif, une Surface touchée, des critères d'acceptation, une porte de validation, et un Completion & Log, selon la même forme normative que l'[Anatomie d'une tâche](/spec/dwp-specification#task-anatomy) définit pour Full.

Quatre axes décrivent l'état d'un plan, et MUST être suivis indépendamment plutôt que confondus :

| Axe | Valeurs | Signification |
|------|--------|-------------|
| Format | `lite`, `full` | Où vivent les enregistrements de tâche |
| Matérialisation | `materializing`, `ready`, `promoting` | Si le dossier du plan est en cours d'écriture, terminé, ou en cours de promotion |
| Approbation | `pending`, `approved`, `pre_approved` | Si un humain a relu le plan, ou si le mode trust l'a pré-approuvé |
| Exécution | `pending`, `in_progress`, `blocked`, `completed` | Progression par tâche et globale |

Le create guidé écrit une **proposition en attente relisible** — Lite ou Full, déjà le plan réel, jamais une ébauche jetable. Trust matérialise un plan **prêt et pré-approuvé** et redonne immédiatement la main. `create` et une promotion n'exécutent jamais de travail produit ; `execute` MUST rejeter une proposition `pending` en attente d'approbation et MUST rejeter un plan avec une promotion non résolue en cours.

## Création et sélection du format

`/dwp-create` sert l'intention de planification à toute échelle, pas seulement pour du travail important. Un travail petit et borné — une seule préoccupation, environ une session, sans coordination — est la cible du plan Lite ; un travail multi-étapes avec un périmètre réel se rabat par défaut sur Full, selon la [Rigueur proportionnelle](/spec/dwp-specification#proportional-rigor). Une édition directe, une explication, une vérification de statut, une reprise, ou une demande explicite de ne pas créer de plan conservent leur propre route et ne deviennent jamais un plan.

`lite` et `full` sont des **préférences de format** ; `trust` et `auto` sont des **options d'interaction** distinctes, et l'un ou l'autre type d'option MAY apparaître à l'une ou l'autre extrémité de la requête, dans n'importe quel ordre :

```text
/dwp-create trust fix the label
/dwp-create lite trust fix the label
/dwp-create fix the label trust lite
/dwp-create fix the migration full trust
```

Répéter la même option est idempotent ; demander `lite` et `full` ensemble est une erreur. `--` termine l'analyse des options.

Lorsqu'aucune préférence de format n'est donnée, `create` en recommande une et explique pourquoi. Une demande explicite de **Full** l'emporte toujours. Une demande explicite de **Lite** est honorée à moins que les exigences ou les portes de validation du travail ne tiennent pas dans des enregistrements compacts en ligne — dans ce cas `create` consigne pourquoi Full est requis à la place. La sélection MUST consigner le périmètre observé, les dépendances, le niveau de détail d'instruction requis, et les inconnues derrière le choix — un jugement auditable, pas une garantie qui tienne pour tout modèle ou agent.

## Promotion et compatibilité

Un plan Lite MAY être **promu** vers Full à tout moment, via `/dwp-refine promote {plan_name}` (voir [dwp-refine](/kit/dwp-refine)). La promotion est **uniquement une question de représentation** : elle consigne l'intention, écrit les fichiers de tâche de destination, valide que chaque exigence et porte que l'enregistrement Lite portait reste couverte, fait basculer la copie faisant autorité des enregistrements en ligne du README vers les fichiers de tâche, puis efface le marqueur en cours. `execute` et `resume` MUST refuser de continuer tant qu'un marqueur de promotion reste défini. Les ID de tâche et les preuves d'achèvement déjà consignés MUST NOT être réécrits par une promotion ; un nouveau périmètre découvert pendant la promotion passe par `refine` à la place et n'invalide que les preuves qu'il affecte.

La promotion ne fonctionne jamais automatiquement dans l'autre sens : un plan Full n'est pas silencieusement réduit à Lite. Un plan rédigé sous une version de spec antérieure — y compris un plan Full v1 sans aucun champ `plan_format` — conserve sa forme consignée et reste conforme ; une session `refine` MAY le migrer délibérément, mais rien ne le fait implicitement.

Le `plan_format` de `manifest.json` est immuable une fois écrit ; une promotion modifie le `format` de `state.json` et efface son marqueur `promotion`, et ne réécrit jamais le manifeste. Voir [État du plan](/spec/plan-state) pour les champs exacts `plan_format`, `format`, `materialization`, `approval`, `promotion` et `locator`, et leurs URL de schéma v2.
