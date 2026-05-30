---
title: OpenAI Codex
description: "El adaptador de DWP para OpenAI Codex, con soporte parcial mediante procedimientos en Markdown y el prefijo almohadilla. Los comandos básicos funcionan; los agentes de equipo no están disponibles."
kind: adapter
lang: es
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# Adaptador de OpenAI Codex

OpenAI Codex admite DWP mediante procedimientos de comando en Markdown.

## Nivel de soporte

**Parcial**: los comandos básicos funcionan; las características avanzadas (agentes de equipo) no están disponibles.

## Instalación

Los comandos de DWP viven como procedimientos en Markdown que el agente lee al invocarlos.

## Invocación

Usa el prefijo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Las características de agentes de equipo son exclusivas de Claude; Codex admite el flujo de trabajo secuencial.
