---
title: dwp-status
description: "Reporta el estado de un Deep Work Plan sin ejecutarlo. El agente lee el plan y el registro de avance, y resume las tareas completadas, en curso y pendientes."
kind: command
lang: es
order: 5
usage: /dwp-status [plan]
aliases:
  - dwp:status
---

# dwp-status

Reporta el estado de un Deep Work Plan sin ejecutar.

## Qué hace

`dwp-status` resume el avance del plan sin hacer cambios. Reporta las tareas completadas, en curso y pendientes.

## Uso

```
/dwp-status [plan]
```

## Comportamiento

1. Lee el plan y `PROGRESS.md`.
2. Resume las tareas completadas.
3. Resume las tareas en curso.
4. Resume las tareas pendientes.
5. Reporta sin modificar nada.

## Alias

- `dwp:status`
