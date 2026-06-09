---
title: OpenClaw
description: "El adaptador DWP para OpenClaw: escaneo nativo de .agents/skills, mapeo de ejecución desatendida y continuación de planes por cron para espacios de trabajo de agente autónomos."
kind: adapter
lang: es
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# Adaptador de OpenClaw

OpenClaw es una plataforma de agentes autónomos que ejecuta espacios de trabajo de larga duración con turnos programados. Escanea de forma nativa `<workspace>/.agents/skills/` en busca de paquetes de skills instalados, lo que significa que la skill DWP se carga sin ningún adaptador intermedio — instálala allí y OpenClaw la detecta automáticamente.

## Nivel de soporte

**Completo** — OpenClaw lee `AGENTS.md` y carga la skill mediante el estándar AgentSkills. Todas las sub-skills de DWP (`onboard`, `create`, `execute`, `refine`, `resume`, `status`, `verify`) están disponibles.

## Instalación

```bash
openclaw skills install deepworkplan
```

O manualmente: clonar `DailybotHQ/deepworkplan-skill` en `<workspace>/.agents/skills/deepworkplan/`.

## Invocación

Texto plano — OpenClaw no usa prefijo de comandos de barra:

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## Mapeo de ejecución desatendida

Las primitivas de programación de OpenClaw se corresponden directamente con el modelo de continuación de DWP:

| Primitiva de OpenClaw | Rol en DWP |
|-----------------------|-----------|
| Raíz del workspace | Arquetipo [espacio de trabajo de agente](/spec/archetypes): `AGENTS.md`, `.agents/`, `.dwp/` en la raíz del workspace |
| `<workspace>/.agents/skills/` (escaneo nativo nivel 2) | Donde vive este paquete — sin adaptador intermedio |
| Turno de latido o cron | Un turno de [continuación programada](/spec/agent-protocol#scheduled-continuation): despertar → Protocolo de Reanudación DWP → siguiente tarea atómica → actualizar estado → ceder |
| Comprobaciones de `HEARTBEAT.md` | Añadir una línea: "Si `.dwp/plans/` tiene un plan abierto, reanudarlo durante una tarea." |
| Órdenes permanentes | El límite de aprobación del plan y la autoridad acotada del perfil desatendido |

En la práctica:

1. Un ser humano crea y aprueba un plan de forma interactiva. La aprobación es el punto de control — los turnos desatendidos nunca crean y ejecutan en un mismo turno.
2. El plan debe llevar la capa de estado legible por máquina (`manifest.json` + `state.json`). En un workspace sin git, `state.json` es lo que hace posible la reanudación segura ante fallos. Véase [Estado del plan](/spec/plan-state).
3. Cada turno de latido o cron ejecuta como máximo una tarea, pasa su puerta de validación, actualiza `state.json` de forma atómica y cede.
4. Ante cualquier condición de parada, el agente escribe el campo `blocked` de `state.json` e informa a través del canal habitual del workspace. La próxima revisión humana — o el informe del latido — verá exactamente lo que se necesita.

El resultado: un plan de varios días que sobrevive a reinicios, cambios de modelo y límites de sesión, ejecutado por el demonio de noche — con las mismas puertas que tendría una ejecución supervisada por un humano.

## Notas

El workspace de OpenClaw es el ejemplo canónico del arquetipo de [espacio de trabajo de agente](/spec/archetypes). La integración de `HEARTBEAT.md` y el requisito de `state.json` del paquete de skill DWP fueron diseñados con esta plataforma en mente.
