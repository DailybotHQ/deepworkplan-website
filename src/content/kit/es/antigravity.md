---
title: Antigravity
description: "El adaptador de DWP para Antigravity, con soporte total por procedimientos Markdown y el prefijo almohadilla que impulsan el flujo completo de Deep Work Plan."
kind: adapter
lang: es
order: 6
agent: Antigravity
support: full
prefix: '#'
---

# Adaptador de Antigravity

Antigravity admite DWP mediante procedimientos de comando en Markdown.

## Nivel de soporte

**Completo** (Comprobado por instalación) — cada comando dwp-* se ejecuta desde su archivo de procedimiento. Ruta verificada mediante suites de pruebas automatizadas; los flujos de comportamiento se ejecutan en la línea base secuencial.

## Instalación

Los comandos de DWP viven como procedimientos en Markdown que el agente lee al invocarlos.

## Invocación

Usa el prefijo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Antigravity lee los archivos de procedimiento y ejecuta el flujo secuencial completo de Deep Work Plan.
