---
title: GitHub Copilot
description: "L’adaptateur DWP pour GitHub Copilot, avec une prise en charge partielle via des procédures de commande en Markdown et le préfixe dièse ; une partie de l’automatisation se fait manuellement."
kind: adapter
lang: fr
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# Adaptateur GitHub Copilot

GitHub Copilot prend en charge DWP via des procédures de commande en Markdown.

## Niveau de prise en charge

**Partiel** — les commandes de base fonctionnent via des fichiers de procédure ; une partie de l’automatisation est manuelle.

## Installation

Les commandes DWP existent sous forme de procédures en Markdown dans le dépôt.

## Invocation

Utilisez le préfixe `#` :

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Copilot lit les fichiers de procédure mais offre une exécution moins autonome que Claude Code.
