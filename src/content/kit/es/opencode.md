---
title: OpenCode
description: "El adaptador de DWP para OpenCode, el agente de código abierto, con soporte completo a través de AGENTS.md nativo y procedimientos de comando en Markdown invocados con el prefijo almohadilla."
kind: adapter
lang: es
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# Adaptador de OpenCode

OpenCode, el agente de programación de código abierto, admite DWP a través de AGENTS.md nativo y procedimientos de comando en Markdown.

## Nivel de soporte

**Completo** — OpenCode lee AGENTS.md de forma nativa y ejecuta cada comando dwp-* desde su archivo de procedimiento.

## Instalación

DWP distribuye AGENTS.md y los procedimientos de comando en el repositorio; OpenCode los descubre como contexto del proyecto.

## Invocación

Usa el prefijo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

OpenCode lee los archivos de procedimiento y ejecuta el flujo secuencial completo de Deep Work Plan.
