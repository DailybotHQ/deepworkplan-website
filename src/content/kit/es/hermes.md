---
title: Hermes
description: "El adaptador DWP para Hermes: skills mediante el estándar AgentSkills, memoria episódica a partir de los resultados del plan y continuación de planes por cron."
kind: adapter
lang: es
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Adaptador de Hermes

Hermes es una plataforma de agentes autónomos que carga skills mediante el estándar AgentSkills y mantiene memoria episódica entre sesiones. DWP se integra con ambas superficies: el paquete de skill se carga desde `.agents/skills/` igual que cualquier otro paquete compatible con AgentSkills, y los registros de resultados de `state.json` alimentan directamente el índice de memoria de Hermes.

En planes v6 y v7, el estado se proyecta desde el diario de solo adición (`journal.ndjson`) mediante `ledger.py project` en lugar de reescribir manualmente los archivos de estado.

## Nivel de soporte

**Completo** (Documentado) — Hermes lee `AGENTS.md` y carga la skill mediante carga estándar AgentSkills. Todas las sub-skills de DWP están disponibles.

## Instalación

Instala el paquete de skill en el directorio `.agents/skills/` del workspace, o usa el gestor de skills de la plataforma si está disponible.

## Invocación

Texto plano:

```
create a plan for <goal>
resume the open plan
```

## Sinergia de memoria episódica

En planes v6 y v7, los recibos de verificación deterministas de DWP (`outcomes.py receipt`) y los registros de resultados alimentan directamente el índice de memoria de Hermes: cada tarea completada lleva lo que se probó, falló y funcionó en un esquema JSON estructurado. Los planes completados se convierten en memoria episódica recuperable — un agente puede recordar cómo se resolvió un problema.

Las sesiones efímeras añaden eventos a `journal.ndjson` y proyectan `state.json` mediante `ledger.py project` en lugar de reescribir manualmente los archivos de estado. Véase [Estado del plan](/spec/plan-state#outcome-records-as-episodic-memory).

## Continuación por cron

En plataformas con programación por cron, la continuación sigue el mismo patrón que otras plataformas autónomas: cada turno programado despierta, ejecuta el Protocolo de Reanudación DWP, ejecuta como máximo una tarea, actualiza `state.json` y cede. El plan, no la sesión, es la unidad de continuidad.

La capa de estado legible por máquina (`manifest.json` + `state.json`) es REQUERIDA para la ejecución desatendida. Véase [Protocolo del agente](/spec/agent-protocol#execution-profiles) para el protocolo completo de condiciones de parada y escalación.

## Notas

Hermes y OpenClaw son plataformas de agentes autónomos que aparecen en la tabla de agentes compatibles de [Protocolo del agente](/spec/agent-protocol). Ambas ejecutan bajo el perfil de ejecución desatendida y ambas se benefician de la equivalencia `state.json`-como-registro-git del arquetipo de espacio de trabajo de agente.
