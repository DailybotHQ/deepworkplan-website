---
title: Google Gemini
description: "L’adaptateur DWP pour Google Gemini, avec une prise en charge complète via des procédures de commande en Markdown et le préfixe dièse qui pilotent l’intégralité de la boucle Deep Work Plan."
kind: adapter
lang: fr
order: 5
agent: Google Gemini
support: full
prefix: ‘#’
---

# Adaptateur Google Gemini

Gemini prend en charge DWP via des procédures de commande en Markdown.

## Niveau de prise en charge

**Complet** — chaque commande dwp-* s’exécute depuis son fichier de procédure. Nécessite Gemini 2.5 Pro ou une version plus récente pour le WebFetch natif.

## Installation

Les commandes DWP existent sous forme de procédures en Markdown que l’agent lit lors de l’invocation.

## Invocation

Utilisez le préfixe `#` :

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Gemini lit les fichiers de procédure et exécute l’intégralité de la boucle séquentielle Deep Work Plan.
