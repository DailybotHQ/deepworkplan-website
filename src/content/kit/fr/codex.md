---
title: OpenAI Codex
description: "L’adaptateur DWP pour OpenAI Codex, avec une prise en charge complète via des procédures de commande en Markdown et le préfixe dièse qui pilotent l’intégralité de la boucle Deep Work Plan."
kind: adapter
lang: fr
order: 3
agent: OpenAI Codex
support: full
prefix: ‘#’
---

# Adaptateur OpenAI Codex

Codex prend en charge DWP via des procédures de commande en Markdown.

## Niveau de prise en charge

**Complet** — chaque commande dwp-* s’exécute depuis son fichier de procédure.

## Installation

Les commandes DWP existent sous forme de procédures en Markdown que l’agent lit lors de l’invocation ; les règles sont installées sous `.codex/`.

## Invocation

Utilisez le préfixe `#` :

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Codex lit les fichiers de procédure et exécute l’intégralité de la boucle séquentielle Deep Work Plan.
