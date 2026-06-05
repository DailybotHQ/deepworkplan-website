---
title: GitHub Copilot
description: "El adaptador de DWP para GitHub Copilot, con soporte completo a través de AGENTS.md y procedimientos de comando en Markdown invocados con el prefijo almohadilla."
kind: adapter
lang: es
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# Adaptador de GitHub Copilot

Copilot admite DWP a través de AGENTS.md y procedimientos de comando en Markdown.

## Nivel de soporte

**Completo** — Copilot lee AGENTS.md y los archivos de procedimiento dwp-*, y ejecuta cada comando desde ellos.

## Instalación

DWP distribuye AGENTS.md y los procedimientos de comando en el repositorio; Copilot los lee como contexto del repositorio.

## Invocación

Usa el prefijo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Copilot lee los archivos de procedimiento y ejecuta el flujo secuencial completo de Deep Work Plan.
