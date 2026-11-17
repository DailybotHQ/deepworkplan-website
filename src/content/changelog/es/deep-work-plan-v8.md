---
title: "DWP v8: spec-first, con el ciclo cerrado"
description: "Deep Work Plan v8 reúne planes spec-first, el repositorio como harness, Loop engineering y eficiencia medida; el ciclo completa los planes aprobados."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: es
order: 0
featured: true
sourceLabel: "Lanzamiento del skill v8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Lanzamiento del skill v8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Lanzamiento del skill v8.0.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "LOOP_ENGINEERING.md (normativo, v8)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "Loop engineering en el lector de especificaciones"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "Esquema plan-contract/v8"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "Esquema journal-event/v8"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "Esquema plan-snapshot/v8"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "Escritor de la cola de planes (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Lanzamiento del skill v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Lanzamiento del skill v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Lanzamiento del skill v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.0"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 reúne cuatro ideas: desarrollo spec-first, el repositorio como harness del agente, Loop engineering y eficiencia medida. Su frase de trabajo es: «Spec-first, loop-closed: el repositorio es el harness y el plan se ejecuta por sí solo hasta completarse».

## Los cuatro pilares

1. **Spec-first.** El plan y su especificación son la fuente duradera de verdad, con criterios de aceptación y controles de validación explícitos.
2. **El repositorio es el harness.** El contexto, las herramientas, las reglas de control y el estado reanudable viven junto al código para que distintos agentes trabajen desde el mismo repositorio.
3. **Loop engineering.** Un plan aprobado puede avanzar por su ciclo de vida registrado hasta completarse.
4. **Eficiencia medida.** La eficiencia se expresa en bytes de instrucciones por flujo, con una ruta de medición publicada; no se infieren porcentajes de tokens.

## Qué significa Loop engineering

El plan registra a un líder y una sucesión ordenada. Una persona inicia el daemon opcional de Herdr con `herdr-peers autopilot --loop`; sus avisos piden al líder que continúe sin conceder autoridad nueva. Si el líder ya no está, el ciclo puede pedir a un sucesor listado que asuma el puesto. Los eventos del plan pueden llegar al notificador Dailybot del paquete y la vista de flota muestra agentes y planes en las máquinas habilitadas. La persona sigue siendo responsable de iniciar el daemon, y el addon Herdr es opcional.

## Versiones que incluyen la maquinaria

El endurecimiento del paquete v7.11.0 y las versiones v7.12.x de registro de planes y notificaciones aportan la maquinaria del plan. herdr-peers v1.3.x añade el ciclo, los informes y la vista de flota; v2.0.0 añade el brain del protocolo 2 y el consumidor de la cola. coding-agents-kit v1.3.0 aporta el contrato de lanzamiento pick-v2 y v1.4.0 añade el actualizador verificado. herdr-peers v2.1.0 lee los bloqueos estructurados de v8, y coding-agents-kit v1.5.0 añade la medición de tokens reportados; los descriptores de addons del paquete 8.0.0 fijan herdr-peers v2.1.0, coding-agents-kit v1.5.0 y devcontainer-kit v1.3.0. Las versiones etiquetadas están enlazadas arriba. El paquete funciona sin estos addons opcionales.

## El contrato v8

La versión 8.0.0 implementa el estándar DWP 8.0.0. Los planes nuevos se crean con `plan-contract/v8`; los planes v7, v6 y v5 conservan la generación registrada y solo cambian mediante una migración explícita `refine migrate`. Los planes v8 mantienen la línea `plan-manifest/v7`, y `journal-event/v7` sigue siendo compatible con los planes existentes. La fuente normativa es `LOOP_ENGINEERING.md`, junto con tres esquemas publicados.

- **El bloque `autonomy`.** Bloque opcional y cerrado de `plan-contract/v8` que registra la autoridad del ciclo: `stall_budget` (1–10, predeterminado 3), paneles `promptable` (predeterminado: solo el líder), destinos `notify` (predeterminado: ninguno), `brain` (predeterminado: `false`) y `queue` (`prompt-lead`, `launch` o `none`, predeterminado `none`). Si el bloque no está, se aplican todos los valores predeterminados y la persona sigue resolviendo.
- **Bloqueos estructurados.** Un bloqueo es un evento `blocker` de `journal-event/v8`, creado y resuelto solo mediante la función auxiliar del ledger, con una tarea, un motivo, una línea de `needs`, una clase obligatoria C1–C7 y un resolver opcional. Se rechaza `resolver: lead` para C1, C2, C5 y C6; el ciclo solo pide al líder resolver un bloqueo que el propio plan marcó con `resolver: lead`. `state.json` pasa a ser `plan-snapshot/v8`, con el bloqueo activo y un estado `blocked` derivado; `PROGRESS.md` comienza con un encabezado de cuatro líneas: objetivo, tarea actual, siguiente acción y necesidades.
- **La cola de planes.** `.dwp/queue.json` (`dwp-queue-v1`) solo la escriben `shared/queue.py` del paquete o una persona; `create` añade un plan al aprobarse y el daemon de Herdr solo la lee. La cola admite como máximo 64 planes, ejecuta un plan a la vez por repositorio salvo que este indique `parallel: true`, y una cola dañada nunca interrumpe el ciclo de vida.

La última versión de v7 fue la **7.12.2**.

Versión del skill instalada: **8.0.1**.
