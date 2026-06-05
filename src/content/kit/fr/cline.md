---
title: Cline
description: "L'adaptateur DWP pour Cline, l'agent open source, avec une prise en charge complète via des règles Markdown et des procédures de commande invoquées avec le préfixe dièse."
kind: adapter
lang: fr
order: 9
agent: Cline
support: full
prefix: '#'
---

# Adaptateur Cline

Cline, l'agent de code open source, prend en charge DWP via des règles Markdown et des procédures de commande.

## Niveau de prise en charge

**Complet** — Cline lit les règles Markdown et exécute chaque commande dwp-* depuis son fichier de procédure.

## Installation

Les commandes DWP existent sous forme de procédures en Markdown que l'agent lit via les règles de Cline.

## Invocation

Utilisez le préfixe `#` :

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Cline lit les fichiers de procédure et exécute l'intégralité de la boucle séquentielle Deep Work Plan.
