---
title: Estado del plan
description: "La capa de estado del plan legible por máquina: manifest.json y state.json, registros de puertas, registros de resultados como memoria episódica, reconciliación y cuándo se requiere."
order: 7
lang: es
section: State
---

# Estado del plan

**Versión 1.0. Estado: estable.** Este documento especifica la capa de estado del plan legible por máquina de la metodología Deep Work Plan. Las palabras clave MUST (DEBE), MUST NOT (NO DEBE), SHOULD (DEBERÍA), SHOULD NOT (NO DEBERÍA) y MAY (PUEDE) se interpretan según las describe el RFC 2119.

Dos artefactos JSON — `manifest.json` (la identidad estática del plan) y `state.json` (el estado de ejecución activo por tarea, incluidos los resultados de las puertas de validación) — que todo plan PUEDE llevar junto con sus archivos Markdown, y que la ejecución desatendida (véase [Protocolo del agente](/spec/agent-protocol#execution-profiles)) y los espacios de trabajo de agente sin git (véase [Arquetipos](/spec/archetypes) §3) DEBEN llevar.

El plan en Markdown sigue siendo la **fuente de verdad legible para personas**. La capa JSON es una **proyección derivada**: la regenera el agente en puntos de protocolo definidos, nunca se edita manualmente y nunca puede discrepar en silencio con el Markdown. Su propósito es la interoperabilidad — linting, comprobación de conformidad, diffs, paneles de control, descubrimiento de registros y sincronización con infraestructura de sesiones externa — ninguna de las cuales se puede construir de forma fiable sobre prosa.

## Por qué existe esto

Hasta la v1.1, los planes eran solo Markdown en prosa. Eso los mantenía auditables e independientes del agente, pero no dejaba nada que una herramienta pudiera validar, comparar ni consumir: ninguna puerta de conformidad, ninguna detección de desincronización entre `README.md` y `PROGRESS.md`, ninguna forma para que un demonio o una sesión en la nube conociera el estado de un plan sin analizar prosa. La v1.2 añade la proyección JSON sin degradar el Markdown — la proyección se deriva del Markdown, igual que un archivo de bloqueo se deriva de un manifiesto.

## Ubicación

Un plan que usa la capa de estado tiene esta estructura:

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← fuente de verdad para personas (sin cambios)
├── PROGRESS.md          ← registro narrativo (sin cambios)
├── PROMPTS.md           ← sin cambios
├── manifest.json        ← identidad estática (escrito en la materialización)
├── state.json           ← estado activo (reescrito en los puntos de protocolo)
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json` DEBE escribirse exactamente una vez, cuando el flujo `create` materializa el plan, y NO DEBE cambiar después, salvo en una migración de versión de spec registrada en `PROGRESS.md`.

`state.json` DEBE ser reescrito por el agente en cada uno de estos puntos de protocolo: materialización del plan (todas las tareas en `pending`), inicio de tarea (`in_progress`), cada ejecución de puerta de validación (registro de puerta añadido o actualizado) y finalización de tarea (`completed`, como parte del protocolo de finalización de tarea en [Especificación de DWP](/spec/dwp-specification#task-completion-protocol)).

Ambos archivos DEBEN escribirse de forma atómica: escribir en un archivo temporal en el mismo directorio y luego renombrarlo sobre el destino. Una escritura interrumpida NO DEBE dejar un archivo JSON truncado en su lugar.

## Cuándo se requiere la capa

- Para la ejecución **interactiva** en un repositorio git, la capa de estado es RECOMENDADA para planes nuevos y OPCIONAL para planes anteriores a la v1.2. Un plan sin ella sigue siendo conforme.
- Para la ejecución **desatendida**, la capa de estado es REQUERIDA.
- En un **espacio de trabajo de agente** sin git, la capa de estado es REQUERIDA: `state.json` lleva la información de recuperación que el registro de git lleva en un repositorio.

## `manifest.json` — identidad del plan

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v1.json",
  "spec_version": "2.2.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at` y `task_count` son REQUERIDOS.

`archetype` DEBE ser uno de `individual`, `orchestrator-hub`, `agent-workspace`.

`rigor` DEBE ser uno de `micro`, `standard`, `deep` (véase [Rigor proporcional](/spec/dwp-specification#proportional-rigor)).

`parent_plan` vincula un plan hijo con su plan orquestador (`{repo}:{plan_name}`, o `null`).

`created_by` DEBERÍA identificar el agente y el modelo que crearon el plan. NO DEBE contener secretos, tokens ni identificadores de usuario más allá de un nombre de visualización.

## `state.json` — estado de ejecución activo

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v1.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "tasks": [
    {
      "id": 1,
      "file": "1.task_webhook_endpoint.md",
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "file": "3.task_retry_queue.md",
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

### Entradas de tarea

Cada archivo de tarea del plan DEBE tener exactamente una entrada en `tasks`, identificada por su número (`id`) y nombre de archivo (`file`).

`status` DEBE ser uno de `pending`, `in_progress`, `completed`, `blocked`, `skipped`. `skipped` solo es válido cuando el usuario eliminó explícitamente la tarea del alcance mediante `refine`; `state.json` NO DEBE usarse para omitir trabajo en silencio.

Una entrada `completed` DEBE llevar `completed_at` y, cuando el plan hace commits, el hash corto `commit` — este es el enlace de trazabilidad entre el plan y el código.

### Registros de puertas

Cada ejecución de un comando de validación DEBERÍA registrarse como un registro de puerta: `command`, `passes` (booleano), `exit_code`, `last_run` y una cadena `evidence` breve y legible para personas (una línea de resumen o una ruta bajo `analysis_results/`, nunca la salida completa del comando).

Una tarea NO DEBE marcarse como `completed` en `state.json` mientras alguno de sus registros de puerta tenga `passes: false` sin una ejecución posterior que pase. Los registros de puertas son el equivalente en máquina de "nunca marcar como completado sin evidencia" — el patrón de un indicador `passes` por elemento que evita la finalización prematura.

### Registros de resultados como memoria episódica

Una tarea `completed` DEBERÍA llevar un registro de `outcome`: qué se `tried` (intentó), qué `failed` (falló), qué `worked` (funcionó) y notas libres en `notes`. Mantener cada entrada en una línea.

Los registros de resultados convierten un plan terminado en **memoria episódica** recuperable: un agente (o una plataforma de indexación de memoria) puede recordar más adelante cómo se resolvió un problema, no solo que se resolvió. Alimentan la tarea obligatoria de Descubrimiento de Skills y Agentes, que DEBERÍA leerlos al buscar patrones. En plataformas como Hermes que indexan la memoria del agente, los registros de resultados en `state.json` hacen que los planes completados sean directamente recuperables en sesiones futuras.

### Estado de punto de control y de bloqueo

`checkpoint` registra el punto de reanudación más detallado dentro de la tarea actual: el `id` de la tarea, un localizador de `step` en texto libre, una marca de tiempo y una nota de una línea. Un agente DEBERÍA actualizarlo cada vez que haga una pausa dentro de una tarea; DEBE actualizarlo antes de cualquier interrupción planificada en modo desatendido.

`blocked` es `null` o `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`. Un agente desatendido que llega a una condición de parada DEBE rellenar `blocked` antes de detenerse — así es como el siguiente latido de un demonio, o un ser humano, sabe por qué se detuvo el plan.

## Proyección y reconciliación

El Markdown DEBE ganar cada desacuerdo. Si `state.json` dice que la tarea 4 está `completed` pero el README del plan muestra una casilla sin marcar, el archivo de estado está obsoleto.

Un agente que reanuda DEBE comparar la lista de casillas del README con `state.json` antes de continuar. En caso de desincronización DEBE regenerar `state.json` a partir del Markdown (y del registro git, cuando esté disponible), registrar la reconciliación en `PROGRESS.md` y solo entonces continuar.

La sub-skill `verify` DEBE tratar la desincronización como un hallazgo de conformidad: reportar qué tareas discrepan y en qué dirección.

Las herramientas distintas del agente ejecutor DEBEN tratar ambos archivos JSON como de solo lectura.

## Versionado de esquemas

Ambos esquemas están versionados por URL (`/v1.json`). Los campos aditivos están permitidos dentro de una versión; renombrar o cambiar el tipo de un campo requiere `/v2.json` y una nota de migración en el registro de cambios de la especificación. El campo `spec_version` del manifiesto fija la versión de la especificación DWP con la que se creó el plan; un agente que encuentre un plan más nuevo que su especificación instalada DEBERÍA informar de ello en lugar de suponer.
