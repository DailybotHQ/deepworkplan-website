---
title: "Especificación de Deep Work Plan"
description: "La especificación legible de Deep Work Plan: el formato DWP, el protocolo de agentes, los arquetipos, el estándar de documentación y los complementos."
lastUpdated: 2026-09-28
---

## Especificación de Deep Work Plan

**Estándar actual: DWP 8.0.0 (release `v8.0.0`).** La base conservada incluye la capa de registros v6 y las extensiones v7; los planes nuevos usan `plan-contract/v8` de forma predeterminada. Los planes v5, v6 y v7 existentes conservan su generación registrada y solo se migran mediante un `refine migrate` explícito. V8 conserva `plan-manifest/v7` y añade `plan-contract/v8`, `journal-event/v8` y `plan-snapshot/v8`; los esquemas de manifiesto y eventos de diario v7 siguen admitidos para planes existentes. [Manifiesto v7](https://deepworkplan.com/schema/plan-manifest/v7.json), [contrato v8](https://deepworkplan.com/schema/plan-contract/v8.json), [evento de diario v8](https://deepworkplan.com/schema/journal-event/v8.json) y [snapshot v8](https://deepworkplan.com/schema/plan-snapshot/v8.json).

La especificación es la definición precisa y legible de la metodología — las estructuras y protocolos que comparten las personas y los agentes. Establece, en términos normativos RFC-2119, cómo se estructura un plan guiado por especificación y cómo un agente debe ejecutar contra él: el plan es la fuente de verdad, las puertas de validación son binarias y el propio repositorio lleva el harness que un agente necesita. Está organizada en documentos ordenados:

- **Estándar de documentación** — la estructura de repositorio AI-first.
- **Capa de registro** — la capa de registro respaldada por evidencia: contrato, diario, clases de evidencia (afirmada vs observada), aprobación, enmiendas y recibos.
- **Recursos y habilidades** — ejecución acotada: manifiesto de contexto, envolvente de recursos, capacidades del host, registro de complementos y habilidades provistas por complementos.
- **Delegación** — ejecución multiagente y en enjambre: árboles de trabajo seguros en paralelo, eventos de delegación, transportes y sucesión de líderes por épocas.
- **Estado del plan** — la capa de estado legible por máquina: instantánea derivada del diario en v6/v7 (`ledger.py project`), capa de estado histórica de v5 (`manifest.json` y `state.json`) y reconciliación.
- **Protocolo de agentes** — el comportamiento requerido entre agentes, el mapeo de comandos, los agentes compatibles (incluidos OpenClaw y Hermes) y los perfiles de ejecución (interactivo frente a desatendido) con condiciones de parada y continuación programada.
- **Arquetipos** — repos individuales, hubs orquestadores y el espacio de trabajo de agente (el hogar de larga duración de un agente autónomo: workspace de OpenClaw, directorio de servicio de Hermes, volumen de agente en la nube); la heurística de clasificación y cómo difiere la incorporación.
- **Complementos** — el mecanismo opcional para añadir capacidades, incluida la subhabilidad author (para que un repositorio cree su propio kit), los complementos de mantenimiento como dependency-upgrade y el complemento design-system (un `docs/DESIGN.md` razonado a partir de la fuente de diseño real del repo, con perfiles para UI visual, salida de CLI y superficies conversacionales).
- **Conformidad** — la definición normativa de un repositorio AI-first: los artefactos que un repositorio DEBE y DEBERÍA tener, qué hace que un plan esté bien formado y cómo verificarlo de forma objetiva con `/dwp-verify`.
- **Estado del plan** — la capa de estado legible por máquina: `manifest.json` y `state.json`, registros de puertas, registros de resultados como memoria episódica, reconciliación (el Markdown gana) y cuándo se requiere la capa.

- [Leer la especificación](/es/spec)
- [Leer la metodología](/es/methodology)
