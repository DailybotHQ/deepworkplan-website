---
title: "DWP v7: planes que delegan, con registro de todo"
description: "Deep Work Plan v7 conserva el contrato y el diario de v6, permite que un plan delegue tareas acotadas a otros agentes y añade cuatro addons opcionales."
date: 2026-10-10
version: "v7 · Delegación con evidencia"
kind: release
lang: es
order: 0
featured: true
sourceLabel: "Conjunto de esquemas v7 publicado"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
---

Deep Work Plan v7 conserva el método de v6: el contrato es la autoridad, el diario de solo anexado es la memoria, el planificador decide qué se ejecuta a continuación y una tarea solo se cierra cuando la evidencia registrada cumple sus criterios. v7 añade la capacidad de delegar y mantiene la misma disciplina sobre el resultado.

Un plan que concede `agent_delegation` puede marcar una tarea como `parallel_safe` y entregarla a otro agente. La respuesta del delegado se registra como dato, nunca como instrucciones, y permanece `asserted` hasta que el ejecutor de puertas del propio plan observa el resultado. Solo el ejecutor genera evidencia `observed`, de modo que la delegación amplía el alcance sin rebajar el listón para dar una tarea por completada.

Cuatro addons opcionales convierten la delegación en autonomía práctica. Herdr entrega una tarea a un agente en un panel, en cualquier máquina. Agentkit coloca un único comando `ak` sobre todos los agentes de programación de terminal, con autonomía por defecto y la posibilidad de desactivarla, y ejecuta tareas acotadas sin interfaz en un worktree de git. Devcontainer da a cada repositorio un contenedor reproducible sin ninguna clave SSH en su interior. DeepWorkPlan Vim es un editor de terminal con explorador de planes y visor de Markdown. Cada uno está fijado por etiqueta a un producto con su propio repositorio y funciona sin Deep Work Plan. Un repositorio es plenamente conforme sin ninguno de ellos, y el registro en `.dwp/config.json` indica cuáles están habilitados.

El modo de benchmark y aprendizajes registra lo que enseña cada plan, de modo que los hallazgos puedan analizarse después. Una auditoría de todo el ecosistema, ejecutada como un plan orquestador v7 con un agente por repositorio, no encontró ninguna regresión de comportamiento frente a v6: la suite del paquete pasa 807 de 807 en un entorno limpio, y la carga de instrucciones creció entre 0.1% y 3.9% por flujo (4.6% para el paquete completo), medida en bytes sobre ambas etiquetas y no estimada como tokens.

v7 supone un salto en orquestación y auditabilidad, pero todavía no es una autonomía totalmente desatendida. El bucle de benchmark y aprendizajes aún no mide automáticamente los planes v7, y no se ha medido la no inferioridad de los resultados de los agentes. Los planes existentes conservan la generación registrada y nunca se migran de forma implícita; los planes nuevos usan el contrato v7 por defecto.

Versión del skill instalada: **7.1.4**, estable desde 7.0.0.
