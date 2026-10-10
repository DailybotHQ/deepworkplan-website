---
title: Cursor
description: "L’adaptateur DWP pour Cursor AI, avec une prise en charge complète via le système de règles de projet et le préfixe de commande dièse, car Cursor réserve la barre oblique pour lui-même."
kind: adapter
lang: fr
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Adaptateur Cursor

Cursor prend en charge DWP via les règles de projet et les fichiers de commande.

## Niveau de prise en charge

**Complet** — les commandes DWP fonctionnent via le système de règles de Cursor.

## Installation

Les commandes DWP existent sous forme de Markdown dans le projet. Cursor les lit via son système de règles.

Facultatif : [coding-agents-kit](/kit/agentkit) peut installer cette CLI et la lancer avec `ak cursor`. L’installateur officiel de l’éditeur fonctionne tout aussi bien.

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cursor
```

## Invocation

Utilisez le préfixe `#` (Cursor intercepte `/`) :

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Utilisez `#` car Cursor réserve `/` pour ses propres commandes.
