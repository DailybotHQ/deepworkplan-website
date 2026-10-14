---
title: Google Gemini
description: "El adaptador de DWP para Google Gemini, con soporte total por procedimientos Markdown y el prefijo almohadilla que ejecutan el flujo completo de Deep Work Plan."
kind: adapter
lang: es
order: 5
agent: Google Gemini
support: full
prefix: '#'
---

# Adaptador de Google Gemini

Gemini admite DWP mediante procedimientos de comando en Markdown.

## Nivel de soporte

**Completo** (Comprobado por instalación) — cada comando dwp-* se ejecuta desde su archivo de procedimiento. Ruta verificada mediante suites de pruebas automatizadas; los flujos de comportamiento se ejecutan en la línea base secuencial. Requiere ejecución de herramientas y acceso a archivos del espacio de trabajo.

## Instalación

Los comandos de DWP viven como procedimientos en Markdown que el agente lee al invocarlos.

## Invocación

Usa el prefijo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Gemini lee los archivos de procedimiento y ejecuta el flujo secuencial completo de Deep Work Plan.
