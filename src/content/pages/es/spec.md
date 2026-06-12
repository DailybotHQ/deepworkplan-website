---
title: "Especificación de Deep Work Plan"
description: "La especificación legible de Deep Work Plan: el formato DWP, el protocolo de agentes, los arquetipos, el estándar de documentación y los complementos."
lastUpdated: 2026-05-30
---

## Especificación de Deep Work Plan

La especificación es la definición precisa y legible de la metodología — las estructuras y protocolos que comparten las personas y los agentes. Establece, en términos normativos RFC-2119, cómo se estructura un plan guiado por especificación y cómo un agente debe ejecutar contra él: el plan es la fuente de verdad, las puertas de validación son binarias y el propio repositorio lleva el harness que un agente necesita. Está organizada en documentos ordenados:

- **Estándar de documentación** — la estructura de repositorio AI-first.
- **Especificación DWP** (v1.2) — estructura del plan, anatomía de las tareas, el bucle de ejecución, la sección Delta para cambios brownfield, el Protocolo de Reanudación DWP, los niveles de rigor proporcional (micro/standard/deep) y la capa de estado del plan legible por máquina.
- **Protocolo de agentes** (v1.2) — el comportamiento requerido entre agentes, el mapeo de comandos, los agentes compatibles (incluidos OpenClaw y Hermes) y los perfiles de ejecución (interactivo frente a desatendido) con condiciones de parada y continuación programada.
- **Arquetipos** (v1.1) — repos individuales, hubs orquestadores y el espacio de trabajo de agente (el hogar de larga duración de un agente autónomo: workspace de OpenClaw, directorio de servicio de Hermes, volumen de agente en la nube); la heurística de clasificación y cómo difiere la incorporación.
- **Complementos** — el mecanismo opcional para añadir capacidades, incluida la subhabilidad author (para que un repositorio cree su propio kit), los complementos de mantenimiento como dependency-upgrade y el complemento design-system (un `docs/DESIGN.md` razonado a partir de la fuente de diseño real del repo, con perfiles para UI visual, salida de CLI y superficies conversacionales).
- **Conformidad** — la definición normativa de un repositorio AI-first: los artefactos que un repositorio DEBE y DEBERÍA tener, qué hace que un plan esté bien formado y cómo verificarlo de forma objetiva con `/dwp-verify`.
- **Estado del plan** — la capa de estado legible por máquina: `manifest.json` y `state.json`, registros de puertas, registros de resultados como memoria episódica, reconciliación (el Markdown gana) y cuándo se requiere la capa.

- [Leer la especificación](/es/spec)
- [Leer la metodología](/es/methodology)
