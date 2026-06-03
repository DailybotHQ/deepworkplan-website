---
title: Google Gemini
description: "El adaptador de DWP para Google Gemini, con soporte parcial mediante procedimientos en Markdown y el prefijo almohadilla que guían el flujo secuencial."
kind: adapter
lang: es
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# Adaptador de Google Gemini

Google Gemini admite DWP mediante procedimientos de comando en Markdown.

## Nivel de soporte

**Parcial**: los comandos básicos funcionan mediante archivos de procedimiento.

## Instalación

Los comandos de DWP viven como procedimientos en Markdown que el agente lee.

## Invocación

Usa el prefijo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Gemini lee los archivos de procedimiento y ejecuta el flujo de trabajo secuencial de DWP.
