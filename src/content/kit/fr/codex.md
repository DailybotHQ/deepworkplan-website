---
title: OpenAI Codex
description: "L’adaptateur DWP pour OpenAI Codex, avec une prise en charge partielle via des procédures de commande en Markdown et le préfixe dièse ; les fonctionnalités de team agents sont indisponibles."
kind: adapter
lang: fr
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# Adaptateur OpenAI Codex

OpenAI Codex prend en charge DWP via des procédures de commande en Markdown.

## Niveau de prise en charge

**Partiel** — les commandes de base fonctionnent ; les fonctionnalités avancées (team agents) sont indisponibles.

## Installation

Les commandes DWP existent sous forme de procédures en Markdown que l’agent lit lors de l’invocation.

## Invocation

Utilisez le préfixe `#` :

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Les fonctionnalités de team agents sont réservées à Claude ; Codex prend en charge le workflow séquentiel.
