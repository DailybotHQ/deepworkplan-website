---
title: Claude Code
description: "El adaptador de DWP para Claude Code, con soporte completo mediante comandos slash nativos y habilidades, incluidos subagentes y agentes de equipo."
kind: adapter
lang: es
order: 1
agent: Claude Code
support: full
prefix: /
---

# Adaptador de Claude Code

Claude Code tiene soporte **completo** de DWP mediante comandos slash nativos y habilidades.

## Nivel de soporte

**Completo**: los cinco comandos de DWP se asignan a comandos slash nativos de Claude Code.

## Instalación

DWP se distribuye como habilidades bajo `.agents/skills/` (resueltas a través del enlace simbólico `.claude/`). Claude Code las descubre automáticamente.

## Invocación

Usa el prefijo `/`:

```
/dwp-create <goal>
/dwp-execute
```

## Notas

Claude Code admite habilidades, subagentes y agentes de equipo: el conjunto completo de características de DWP.
