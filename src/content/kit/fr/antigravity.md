---
title: Antigravity
description: "L’adaptateur DWP pour Antigravity, avec une prise en charge partielle via des procédures de commande en Markdown et le préfixe dièse qui pilotent le workflow séquentiel."
kind: adapter
lang: fr
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# Adaptateur Antigravity

Antigravity prend en charge DWP via des procédures de commande en Markdown.

## Niveau de prise en charge

**Partiel** — les commandes de base fonctionnent via des fichiers de procédure.

## Installation

Les commandes DWP existent sous forme de procédures en Markdown que l’agent lit lors de l’invocation.

## Invocation

Utilisez le préfixe `#` :

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Antigravity lit les fichiers de procédure et exécute le workflow séquentiel de DWP.
