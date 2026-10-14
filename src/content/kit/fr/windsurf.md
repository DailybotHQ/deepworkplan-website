---
title: Windsurf
description: "L'adaptateur DWP pour Windsurf, avec une support complet via son système de règles et des procédures de commande en Markdown invoquées avec le préfixe dièse."
kind: adapter
lang: fr
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Adaptateur Windsurf

Windsurf prend en charge DWP via son système de règles et des procédures de commande en Markdown.

## Niveau de prise en charge

**Complet** (Validé par l'installation) — Windsurf lit les règles du projet et exécute chaque commande dwp-* depuis son fichier de procédure. Itinéraire validé par des suites de tests automatisées.

## Installation

Les commandes DWP existent sous forme de procédures en Markdown que l'agent lit via le système de règles de Windsurf.

## Invocation

Utilisez le préfixe `#` :

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Windsurf lit les fichiers de procédure et exécute l'intégralité de la boucle séquentielle Deep Work Plan.
