---
title: OpenAI Codex
description: "El adaptador de DWP para OpenAI Codex, con soporte completo mediante procedimientos de comando en Markdown y el prefijo almohadilla que ejecutan el flujo completo de Deep Work Plan."
kind: adapter
lang: es
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# Adaptador de OpenAI Codex

Codex admite DWP mediante procedimientos de comando en Markdown.

## Nivel de soporte

**Completo** — cada comando dwp-* se ejecuta desde su archivo de procedimiento.

## Instalación

Los comandos de DWP viven como procedimientos en Markdown que el agente lee al invocarlos; las reglas se instalan en `.codex/`.

## Invocación

Usa el prefijo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Codex lee los archivos de procedimiento y ejecuta el flujo secuencial completo de Deep Work Plan.
