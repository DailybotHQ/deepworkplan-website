---
title: Antigravity
description: "L’adaptateur DWP pour Antigravity, avec une prise en charge complète via des procédures de commande en Markdown et le préfixe dièse qui pilotent l’intégralité de la boucle Deep Work Plan."
kind: adapter
lang: fr
order: 6
agent: Antigravity
support: full
prefix: ‘#’
---

# Adaptateur Antigravity

Antigravity prend en charge DWP via des procédures de commande en Markdown.

## Niveau de prise en charge

**Complet** — chaque commande dwp-* s’exécute depuis son fichier de procédure via la surface de commandes native.

## Installation

Les commandes DWP existent sous forme de procédures en Markdown que l’agent lit lors de l’invocation.

## Invocation

Utilisez le préfixe `#` :

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Antigravity lit les fichiers de procédure et exécute l’intégralité de la boucle séquentielle Deep Work Plan.
