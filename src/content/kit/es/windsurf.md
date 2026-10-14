---
title: Windsurf
description: "El adaptador de DWP para Windsurf, con soporte completo a través de su sistema de reglas y procedimientos Markdown invocados con el prefijo almohadilla."
kind: adapter
lang: es
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Adaptador de Windsurf

Windsurf admite DWP a través de su sistema de reglas y procedimientos de comando en Markdown.

## Nivel de soporte

**Completo** (Comprobado por instalación) — Windsurf lee las reglas del proyecto y ejecuta cada comando dwp-* desde su archivo de procedimiento. Ruta verificada mediante suites de pruebas automatizadas.

## Instalación

Los comandos de DWP viven como procedimientos en Markdown que el agente lee a través del sistema de reglas de Windsurf.

## Invocación

Usa el prefijo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Windsurf lee los archivos de procedimiento y ejecuta el flujo secuencial completo de Deep Work Plan.
