---
title: GitHub Copilot
description: "El adaptador de DWP para GitHub Copilot, con soporte parcial mediante procedimientos en Markdown y el prefijo almohadilla; parte de la automatización es manual."
kind: adapter
lang: es
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# Adaptador de GitHub Copilot

GitHub Copilot admite DWP mediante procedimientos de comando en Markdown.

## Nivel de soporte

**Parcial**: los comandos básicos funcionan mediante archivos de procedimiento; parte de la automatización es manual.

## Instalación

Los comandos de DWP viven como procedimientos en Markdown dentro del repositorio.

## Invocación

Usa el prefijo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Copilot lee los archivos de procedimiento, pero tiene menos ejecución autónoma que Claude Code.
