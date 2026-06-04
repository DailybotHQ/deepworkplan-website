---
title: Google Gemini
description: "L’adaptateur DWP pour Google Gemini, avec une prise en charge partielle via des procédures de commande en Markdown et le préfixe dièse qui pilotent le workflow séquentiel."
kind: adapter
lang: fr
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# Adaptateur Google Gemini

Google Gemini prend en charge DWP via des procédures de commande en Markdown.

## Niveau de prise en charge

**Partiel** — les commandes de base fonctionnent via des fichiers de procédure.

## Installation

Les commandes DWP existent sous forme de procédures en Markdown que l’agent lit.

## Invocation

Utilisez le préfixe `#` :

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Gemini lit les fichiers de procédure et exécute le workflow séquentiel de DWP.
