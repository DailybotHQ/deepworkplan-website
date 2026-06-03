---
title: Antigravity
description: "El adaptador de DWP para Antigravity, con soporte parcial mediante procedimientos en Markdown y el prefijo almohadilla que guían el flujo secuencial."
kind: adapter
lang: es
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# Adaptador de Antigravity

Antigravity admite DWP mediante procedimientos de comando en Markdown.

## Nivel de soporte

**Parcial**: los comandos básicos funcionan mediante archivos de procedimiento.

## Instalación

Los comandos de DWP viven como procedimientos en Markdown que el agente lee al invocarlos.

## Invocación

Usa el prefijo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Antigravity lee los archivos de procedimiento y ejecuta el flujo de trabajo secuencial de DWP.
