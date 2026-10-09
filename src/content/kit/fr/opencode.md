---
title: OpenCode
description: "L'adaptateur DWP pour OpenCode, l'agent open source, avec une prise en charge complète via AGENTS.md natif et des procédures de commande en Markdown invoquées avec le préfixe dièse."
kind: adapter
lang: fr
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# Adaptateur OpenCode

OpenCode, l'agent de code open source, prend en charge DWP via AGENTS.md natif et des procédures de commande en Markdown.

## Niveau de prise en charge

**Complet** — OpenCode lit AGENTS.md nativement et exécute chaque commande dwp-* depuis son fichier de procédure.

## Installation

DWP fournit AGENTS.md et les procédures de commande dans le dépôt ; OpenCode les découvre comme contexte du projet.

Facultatif : [coding-agents-kit](/kit/agentkit) peut installer cette CLI et la lancer avec `ak opencode`. L’installateur officiel de l’éditeur fonctionne tout aussi bien.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install opencode
```

## Invocation

Utilisez le préfixe `#` :

```
#dwp-create <goal>
#dwp-execute
```

## Notes

OpenCode lit les fichiers de procédure et exécute l'intégralité de la boucle séquentielle Deep Work Plan.
