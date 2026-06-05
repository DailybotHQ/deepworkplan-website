---
title: GitHub Copilot
description: "L’adaptateur DWP pour GitHub Copilot, avec une prise en charge complète via AGENTS.md et des procédures de commande en Markdown invoquées avec le préfixe dièse."
kind: adapter
lang: fr
order: 4
agent: GitHub Copilot
support: full
prefix: ‘#’
---

# Adaptateur GitHub Copilot

Copilot prend en charge DWP via AGENTS.md et des procédures de commande en Markdown.

## Niveau de prise en charge

**Complet** — Copilot lit AGENTS.md et les fichiers de procédure dwp-*, et exécute chaque commande depuis ceux-ci.

## Installation

DWP fournit AGENTS.md et les procédures de commande dans le dépôt ; Copilot les lit comme contexte du dépôt.

## Invocation

Utilisez le préfixe `#` :

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Copilot lit les fichiers de procédure et exécute l’intégralité de la boucle séquentielle Deep Work Plan.
