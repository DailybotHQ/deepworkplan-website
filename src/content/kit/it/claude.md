---
title: Claude Code
description: "L’adapter DWP per Claude Code, con supporto completo tramite slash command e skill nativi, inclusi subagent e team agent per l’intero set di funzionalità."
kind: adapter
lang: it
order: 1
agent: Claude Code
support: full
prefix: /
---

# Adapter Claude Code

Claude Code ha supporto DWP **completo** tramite slash command e skill nativi.

## Livello di supporto

**Completo** — tutti e cinque i comandi DWP corrispondono a slash command nativi di Claude Code.

## Installazione

DWP è distribuito come skill sotto `.agents/skills/` (risolte tramite il symlink `.claude/`). Claude Code le rileva automaticamente.

## Invocazione

Usi il prefisso `/`:

```
/dwp-create <goal>
/dwp-execute
```

## Note

Claude Code supporta skill, subagent e team agent — l’intero set di funzionalità DWP.
