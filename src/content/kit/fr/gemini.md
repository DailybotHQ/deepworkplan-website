---
title: Google Gemini
description: "L’adaptateur DWP pour Google Gemini, avec une support complet via des procédures Markdown et le préfixe dièse qui pilotent l’intégralité de la boucle Deep Work."
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

**Complet** (Validé par l'installation) — chaque commande dwp-* s’exécute depuis son fichier de procédure. Itinéraire validé par des suites de tests automatisées ; les flux comportementaux s'exécutent sur la référence séquentielle. Nécessite l'exécution d'outils et l'accès aux fichiers de l'espace de travail.

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
