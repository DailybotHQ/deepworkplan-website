---
title: Standard de documentation
description: "Standard normatif sur la façon dont les Deep Work Plans documentent leur structure, leurs tâches et leur progression : règles du README, marqueurs de statut, l’anatomie de tâche en dix sections et le Final Review."
order: 1
lang: fr
section: Standard
---

# Standard de documentation

**Version 1.1.** Ce standard définit comment les Deep Work Plans documentent leur structure, leurs tâches et leur progression. Il s’applique à tout plan créé sous la méthodologie DWP. Les mots-clés MUST, SHOULD et MAY sont employés tels que définis dans la RFC 2119.

## README du plan

Tout plan MUST avoir un `README.md` contenant :

- **Title** — `# Deep Work Plan: <name>`.
- **Goal** — un énoncé en prose de l’objectif du plan.
- **Source material** — des liens ou chemins vers les entrées canoniques (optionnel).
- **Tasks** — un tableau Markdown avec le numéro de la tâche, son nom et une case de statut.
- **Status** — une ligne sous la forme `<n>/<total> tasks complete`.

## Fichiers de tâche

Chaque fichier de tâche MUST être nommé `<n>.task_<slug>.md` et contenir l’anatomie en dix sections — les neuf sections classiques plus la **Surface touchée** : le contrat entre ce que la tâche modifie et ce qui doit être validé (surface planifiée vs. réelle, consommateurs affectés, une classe de risque parmi *isolée*, *couture*, *partagée/cœur* ou *inconnue*, le mappage de tests utilisé, et la porte sélectionnée avec sa raison).

## PROGRESS.md

`PROGRESS.md` est un journal d’exécution en ajout seul. Chaque entrée MUST consigner :

- Un horodatage ISO 8601.
- Le numéro et le nom de la tâche.
- Ce qui a été fait.
- Tout écart ou raison de saut.

## Marqueurs de statut

- `[ ]` — non commencé.
- `[~]` — en cours.
- `[x]` — fait.
- `[!]` — bloqué.

## Titres

Tous les titres MUST utiliser la casse de phrase. Les documents SHOULD éviter le langage marketing et les points d’exclamation.

## Le Final Review, les décisions de skills par tâche et le rapport optionnel

Tout plan rédigé sous cette version MUST se terminer par exactement une tâche obligatoire : le **Final Review** — la passe de sécurité sur l’ensemble des changements du plan, la validation de l’état final sur le dernier état pertinent, et la réconciliation des décisions de skills. Une découverte de sécurité critique bloque l’achèvement.

- **Décisions de skills par tâche.** Le Completion & Log de chaque tâche porte une **disposition de skills** — `aucune`, une mise à jour d’un skill ou d’un agent existant, une création nommée, ou un report avec motif et responsable. La rédaction justifiée a lieu à l’intérieur de la tâche qui la motive, avant sa porte de validation, après une vérification de doublons contre le catalogue `.agents/` ; les entrées justifiées sont enregistrées comme candidates stables (`T{task}-{seq}`) dans le registre des candidates de skills du plan.
- **L’Executive Report est optionnel, sur demande.** Il est proposé une fois à l’achèvement ; il n’est généré que sur demande explicite, à partir de preuves durables. Sans réponse, ou lors d’une exécution non surveillée, le plan reste achevé sans lui.
- **Plans hérités.** Les plans rédigés sous des versions antérieures se terminent par les trois tâches finales obligatoires et restent conformes — un vérificateur de conformité MUST accepter cette forme.
