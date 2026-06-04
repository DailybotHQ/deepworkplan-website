---
title: Standard de documentation
description: "Standard normatif sur la façon dont les Deep Work Plans documentent leur structure, leurs tâches et leur progression : règles du README, marqueurs de statut et les deux tâches finales obligatoires."
order: 1
lang: fr
section: Standard
---

# Standard de documentation

**Version 1.0.** Ce standard définit comment les Deep Work Plans documentent leur structure, leurs tâches et leur progression. Il s’applique à tout plan créé sous la méthodologie DWP. Les mots-clés MUST, SHOULD et MAY sont employés tels que définis dans la RFC 2119.

## README du plan

Tout plan MUST avoir un `README.md` contenant :

- **Title** — `# Deep Work Plan: <name>`.
- **Goal** — un énoncé en prose de l’objectif du plan.
- **Source material** — des liens ou chemins vers les entrées canoniques (optionnel).
- **Tasks** — un tableau Markdown avec le numéro de la tâche, son nom et une case de statut.
- **Status** — une ligne sous la forme `<n>/<total> tasks complete`.

## Fichiers de tâche

Chaque fichier de tâche MUST être nommé `<n>.task_<slug>.md` et contenir l’anatomie en neuf sections.

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

## Deux tâches finales obligatoires

Tout plan MUST se terminer par deux tâches standard :

1. **Skills & Agents Discovery** — identifier les skills et agents réutilisables créés.
2. **Executive Report** — un résumé des résultats pour les parties prenantes.
