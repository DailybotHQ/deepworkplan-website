---
title: Cline
description: "El adaptador de DWP para Cline, el agente de código abierto, con soporte completo mediante reglas en Markdown y procedimientos de comando invocados con el prefijo almohadilla."
kind: adapter
lang: es
order: 9
agent: Cline
support: full
prefix: '#'
---

# Adaptador de Cline

Cline, el agente de programación de código abierto, admite DWP mediante reglas en Markdown y procedimientos de comando.

## Nivel de soporte

**Completo** — Cline lee las reglas en Markdown y ejecuta cada comando dwp-* desde su archivo de procedimiento.

## Instalación

Los comandos de DWP viven como procedimientos en Markdown que el agente lee a través de las reglas de Cline.

## Invocación

Usa el prefijo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Cline lee los archivos de procedimiento y ejecuta el flujo secuencial completo de Deep Work Plan.
