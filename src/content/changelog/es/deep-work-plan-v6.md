---
title: "DWP v6: la misma metodología, un contrato más estricto"
description: "Deep Work Plan v6 conserva la metodología v5 y añade una estructura de ejecución más estricta. No se ha medido la no inferioridad de sus resultados."
date: 2026-09-28
version: "v6 · Estructura más estricta"
kind: release
lang: es
order: 0
featured: true
sourceLabel: "Conjunto de esquemas v6 publicado"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6 conserva la metodología de v5, la superficie de comandos y la ubicación `.dwp/plans/`. Añade una estructura más estricta para representar la autoridad del plan, la evidencia de ejecución, el contexto de cada tarea, la planificación y el estado activo.

El conjunto de esquemas v6 define el manifiesto de identidad, el contrato de resultados y autoridad, los eventos del diario de solo anexado, el manifiesto de contexto por tarea y el snapshot activo. La proyección activa de v6 es un snapshot, así que `plan-state/v5.json` sigue siendo el esquema de estado para los planes v5; no existe `plan-state/v6.json`. Los planes existentes conservan la generación registrada y nunca se reescriben silenciosamente.

La decisión de arquitectura es GO: v6 conserva la misma metodología con una estructura de ingeniería más estricta. Esto no es una afirmación de superioridad empírica. No se ha medido la no inferioridad de los resultados de agentes.

Los planes nuevos reciben identificadores numéricos monotónicos de al menos tres dígitos (por ejemplo, `PLAN_001_add_payment_webhooks/`). Como los esquemas v5 congelados cuentan el ID numérico como una palabra, los slugs v5 tienen 2–4 palabras; los slugs v6 tienen 2–5. Las carpetas existentes sin numerar `PLAN_<slug>/` siguen siendo legibles y nunca se renombran. Si hay planes numerados, `latest` resuelve al plan con el ID numérico más alto.
