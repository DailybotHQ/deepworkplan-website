---
title: "DWP v4: planes a la medida del trabajo"
description: "Deep Work Plan v4 hace que el formato del plan siga al trabajo, y no al revés: un plan Lite es ahora una propuesta completa y ejecutable para tareas acotadas, y el paso independiente de borrador desaparece."
date: 2026-09-11
version: "v4 · Planes Lite primero"
kind: release
lang: es
order: 2
featured: false
sourceLabel: "Skill release commit 3daab90"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/3daab90"
---

Hoy publicamos Deep Work Plan v4. Este lanzamiento trata sobre agilidad y versatilidad: la misma metodología debe sentirse ligera para una corrección acotada y, al mismo tiempo, sostener trabajo que se extiende durante horas o días, sin obligar a un desarrollador a elegir el formato "serio" solo para obtener puertas de validación reales.

Crear un plan para trabajo acotado ya no significa escribir un borrador desechable para revisión y luego un plan final aparte. `create` ahora materializa directamente un **plan Lite**: una propuesta compacta y totalmente ejecutable con registros de tareas en línea, cada uno con sus propios criterios de aceptación, puerta de validación y registro de finalización. Ya no existe el paso intermedio `.dwp/drafts/`: el borrador y el plan son el mismo artefacto, revisable y ejecutable desde el momento en que se escribe.

Los planes completos con archivos de tarea siguen exactamente donde deben estar: el trabajo más largo y de mayor riesgo sigue recibiendo un archivo por tarea, un registro de análisis dedicado y la misma capa de estado reanudable. Un plan Lite puede promoverse a Full en cualquier momento en que un requisito o una puerta de validación ya no quepan en un registro compacto, y qué representación usar como punto de partida sigue señales explícitas y registradas —número de tareas, superficie afectada, riesgo, reversibilidad— nunca una suposición.

Este lanzamiento sigue el estándar DWP `2.4.0`. Lee la [especificación normativa](https://deepworkplan.com/spec), explora el [kit](https://deepworkplan.com/kit/), o comienza la adopción desde [`/init`](https://deepworkplan.com/init).
