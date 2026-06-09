---
title: Hermes
description: "El adaptador DWP para Hermes: carga de skills mediante el estándar AgentSkills, sinergia de memoria episódica a través de los registros de resultados en state.json y continuación de planes por cron."
kind: adapter
lang: es
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Adaptador de Hermes

Hermes es una plataforma de agentes autónomos que carga skills mediante el estándar AgentSkills y mantiene memoria episódica entre sesiones. DWP se integra con ambas superficies: el paquete de skill se carga desde `.agents/skills/` igual que cualquier otro paquete compatible con AgentSkills, y los registros de resultados de `state.json` alimentan directamente el índice de memoria de Hermes.

## Nivel de soporte

**Completo** — Hermes lee `AGENTS.md` y carga la skill mediante carga estándar AgentSkills. Todas las sub-skills de DWP están disponibles.

## Instalación

Instala el paquete de skill en el directorio `.agents/skills/` del workspace, o usa el gestor de skills de la plataforma si está disponible.

## Invocación

Texto plano:

```
create a plan for <goal>
resume the open plan
```

## Sinergia de memoria episódica

Hermes indexa la memoria del agente para hacer recuperable el trabajo pasado en sesiones futuras. Los registros de resultados de `state.json` de DWP están diseñados exactamente para este uso: cada tarea completada lleva lo que se `tried` (intentó), lo que `failed` (falló), lo que `worked` (funcionó) y notas libres en un campo JSON estructurado. Cuando Hermes indexa los archivos de estado de `.dwp/plans/` del workspace, los planes completados se convierten en memoria episódica recuperable — un agente puede recordar más adelante cómo se resolvió un problema concreto, no solo que un plan se ejecutó.

Esto significa que los planes DWP en Hermes son duraderos de dos formas: los archivos Markdown son el registro legible para personas, y los registros de resultados de `state.json` son la memoria indexable por máquina. Véase [Estado del plan](/spec/plan-state#outcome-records-as-episodic-memory).

## Continuación por cron

En plataformas con programación por cron, la continuación sigue el mismo patrón que otras plataformas autónomas: cada turno programado despierta, ejecuta el Protocolo de Reanudación DWP, ejecuta como máximo una tarea, actualiza `state.json` y cede. El plan, no la sesión, es la unidad de continuidad.

La capa de estado legible por máquina (`manifest.json` + `state.json`) es REQUERIDA para la ejecución desatendida. Véase [Protocolo del agente](/spec/agent-protocol#execution-profiles) para el protocolo completo de condiciones de parada y escalación.

## Notas

Hermes y OpenClaw son plataformas de agentes autónomos que aparecen en la tabla de agentes compatibles de [Protocolo del agente](/spec/agent-protocol). Ambas ejecutan bajo el perfil de ejecución desatendida y ambas se benefician de la equivalencia `state.json`-como-registro-git del arquetipo de espacio de trabajo de agente.
