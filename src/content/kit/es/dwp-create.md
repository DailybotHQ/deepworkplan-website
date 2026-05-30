---
title: dwp-create
description: "Crea un nuevo Deep Work Plan a partir de un objetivo de alto nivel. El agente analiza el objetivo, descompone el trabajo en tareas y escribe los archivos del plan en .dwp."
kind: command
lang: es
order: 1
usage: /dwp-create <goal>
aliases:
  - dwp:create
---

# dwp-create

Crea un nuevo Deep Work Plan a partir de un objetivo de alto nivel.

## Qué hace

`dwp-create` toma un objetivo de alto nivel y lo convierte en un plan estructurado. Analiza el objetivo, formula preguntas aclaratorias si hace falta, descompone el trabajo en tareas secuenciales y escribe los archivos del plan.

## Uso

```
/dwp-create <goal>
```

## Comportamiento

1. Analiza el objetivo y el contexto del repositorio.
2. Formula preguntas aclaratorias si es ambiguo.
3. Descompone en tareas secuenciales.
4. Escribe README, archivos de tarea y PROGRESS.
5. Termina con las dos tareas finales obligatorias.

## Alias

- `dwp:create`
