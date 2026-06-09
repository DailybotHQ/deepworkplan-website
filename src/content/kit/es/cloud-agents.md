---
title: Cloud agents
description: "El adaptador DWP para agentes en la nube y en segundo plano: tareas remotas de Claude Code, Codex en la nube, agentes tipo Jules — sesiones efímeras que ejecutan contra un plan .dwp/ duradero."
kind: adapter
lang: es
order: 12
agent: Cloud agents
support: full
prefix: plain text
---

# Adaptador de agentes en la nube

Los agentes en la nube y en segundo plano — tareas remotas de Claude Code, OpenAI Codex en la nube, agentes tipo Jules y entornos de ejecución asíncrona similares — son efímeros por diseño: una sesión arranca, ejecuta durante un tiempo acotado y termina. DWP convierte esa limitación en una ventaja haciendo del plan el artefacto duradero, no la sesión.

## La idea central

El directorio `.dwp/` del repositorio es la **capa de especificación y estado duradera**. Las sesiones en la nube son **ejecutores efímeros**. El plan le dice al ejecutor qué hacer; `state.json` le dice dónde reanudar. La sesión puede ser cualquier cosa — un modelo diferente, un proveedor distinto, un contenedor nuevo — y el plan continúa exactamente desde donde se quedó.

## Nivel de soporte

**Completo** — cualquier agente en la nube que lea el repositorio, siga `AGENTS.md` y pueda ejecutar comandos de shell soporta DWP sin un adaptador específico de plataforma.

## El bucle despertar-reanudar-ceder

Cada turno de agente en la nube sigue este patrón:

1. **Despertar** — la sesión arranca (activada por un horario cron, un evento de CI o una acción del usuario).
2. **Ejecutar el Protocolo de Reanudación DWP** — leer el README del plan, localizar el punto de control, reconciliar `state.json` con el Markdown, inspeccionar la costura, ejecutar una prueba de humo. Véase [Especificación de DWP](/spec/dwp-specification#the-dwp-resume-protocol).
3. **Comprobar el estado de bloqueo** — si `state.json.blocked` está establecido, reportar el motivo y ceder sin ejecutar.
4. **Ejecutar la siguiente tarea atómica** — una tarea, pasando su puerta de validación completa.
5. **Actualizar la capa de estado** — reescribir `state.json` de forma atómica con el nuevo estado de la tarea, los registros de puertas, el registro de resultados y el hash del commit.
6. **Ceder** — la sesión termina limpiamente; el siguiente turno continúa desde el estado actualizado.

## Requisitos

- El plan DEBE llevar la capa de estado legible por máquina (`manifest.json` + `state.json`). Sin ella, una sesión efímera no tiene una forma fiable de determinar la posición de reanudación. Véase [Estado del plan](/spec/plan-state).
- El plan DEBE haber sido aprobado por un ser humano antes de cualquier turno desatendido en la nube. La aprobación del plan es el punto de control.
- El agente opera con autoridad acotada: NO DEBE ampliar el alcance, realizar acciones destructivas que el plan no autorice explícitamente ni improvisar más allá de las instrucciones de la tarea actual. Véase [Protocolo del agente](/spec/agent-protocol#execution-profiles).

## Notas

Las sesiones de agente en la nube son el caso extremo del perfil de ejecución desatendida: cero continuidad de sesión, máxima durabilidad del plan. El directorio `.dwp/` de DWP está diseñado específicamente para que esto funcione — todo el estado que un agente necesita para comenzar, continuar y completar un conjunto de trabajo vive en archivos Markdown y JSON simples que cualquier sesión puede leer desde un checkout limpio.
