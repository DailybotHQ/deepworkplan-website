---
title: "DWP v3: eficiencia de tokens desde el diseño"
description: "Deep Work Plan v3 reconstruye el arnés en torno al costo de contexto: divulgación progresiva, validación limitada a lo afectado y una única revisión final obligatoria, mientras eleva el nivel de confianza y conformidad."
date: 2026-09-10
version: "v3 · Eficiencia de tokens"
kind: release
lang: es
order: 3
featured: false
sourceLabel: "Skill release commit d050474"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/d050474bea3a2b7675ce851efb377833b4960367"
---

Hoy publicamos Deep Work Plan v3. El contexto es el recurso más escaso de un agente, y este lanzamiento trata eso como un problema de ingeniería y no como una promesa informal: se comprime el andamiaje, nunca las instrucciones.

`GUIDE.md` se convierte en un índice de enrutamiento en lugar de un documento que cada agente lee por completo, de modo que un agente solo carga la guía que un paso concreto realmente necesita. Las puertas de validación ahora se seleccionan a partir de la superficie afectada de cada tarea, en lugar de volver a ejecutar toda la suite con cada cambio, y crear un plan puede pasar directamente al modo de confianza cuando un desarrollador ya sabe lo que quiere, saltándose la revisión intermedia. Nada de esto debilita las puertas de validación: elimina lecturas repetidas, carga de contexto redundante y trabajo de validación que no corresponde con lo que realmente cambió.

Junto con el trabajo de eficiencia, este lanzamiento eleva el nivel de confianza. Una única revisión final obligatoria sustituye a las tres tareas de cierre que antes terminaban un plan, la revisión local con AI Diff Reviewer pasa a ser un componente obligatorio de la base, y la conformidad ahora parte de cero complementos opcionales: la seguridad y la procedencia son requisitos, no un acabado opcional. `AGENTS.md` registra la procedencia del estándar DWP del repositorio, y los planes heredados conservan su forma registrada con una vía de migración explícita en lugar de reescribirse en silencio.

Este lanzamiento sigue el estándar DWP `2.3.0`. La carga de instrucciones y el comportamiento de repetición se miden frente a un registro público de evaluación, nunca se informan como un porcentaje de ahorro inventado.

Lee la [arquitectura de eficiencia de tokens](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/adr/0001-token-efficiency-architecture.md) y su [registro de evaluación](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/evaluations/token-efficiency.md), o explora la [especificación normativa](https://deepworkplan.com/spec) y el [kit](https://deepworkplan.com/kit/).
