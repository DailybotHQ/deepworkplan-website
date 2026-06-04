---
title: Claude Code
description: "L’adaptateur DWP pour Claude Code, avec une prise en charge complète via les commandes slash natives et les skills, dont les subagents et les team agents pour l’ensemble des fonctionnalités."
kind: adapter
lang: fr
order: 1
agent: Claude Code
support: full
prefix: /
---

# Adaptateur Claude Code

Claude Code dispose d’une prise en charge **complète** de DWP via les commandes slash natives et les skills.

## Niveau de prise en charge

**Complet** — les cinq commandes DWP correspondent à des commandes slash natives de Claude Code.

## Installation

DWP est livré sous forme de skills sous `.agents/skills/` (résolus via le lien symbolique `.claude/`). Claude Code les découvre automatiquement.

## Invocation

Utilisez le préfixe `/` :

```
/dwp-create <goal>
/dwp-execute
```

## Notes

Claude Code prend en charge les skills, les subagents et les team agents — l’ensemble des fonctionnalités de DWP.
