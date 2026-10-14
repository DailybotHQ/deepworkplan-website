---
title: Antigravity
description: "L’adaptateur DWP pour Antigravity, avec une support complet via des procédures Markdown et le préfixe dièse qui pilotent l’intégralité de la boucle Deep Work."
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

**Complet** (Validé par l'installation) — chaque commande dwp-* s’exécute depuis son fichier de procédure. Itinéraire validé par des suites de tests automatisées ; les flux comportementaux s'exécutent sur la référence séquentielle.

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
