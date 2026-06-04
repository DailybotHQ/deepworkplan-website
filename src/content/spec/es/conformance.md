---
title: Conformidad
description: "Definición normativa de un repositorio conforme con DWP y AI-first: artefactos que DEBE y DEBERÍA tener, qué hace que un plan sea válido y cómo verificarlo."
order: 6
lang: es
section: Conformidad
---

# Conformidad

**Versión 1.0. Estado: Estable.** Este documento define qué significa que un repositorio sea *conforme con Deep Work Plan* — es decir, AI-first y pilotable por agentes. Las palabras clave DEBE, NO DEBE, DEBERÍA, NO DEBERÍA y PUEDE se interpretan como se describe en el RFC 2119.

La conformidad existe para que "AI-first" sea una propiedad objetiva y comprobable, no una impresión. Un repositorio cumple los criterios de abajo o no los cumple. La [sub-skill `verify`](/es/kit) (`/dwp-verify`) los comprueba de forma mecánica.

## Un repositorio conforme

Un repositorio conforme con DWP DEBE cumplir todo lo siguiente. Cada artefacto DEBE estar **razonado para el repositorio** — adaptado a sus lenguajes, frameworks y comandos reales. Un esbozo genérico, un marcador de posición o contenido copiado de otro repositorio no satisface un criterio.

1. **`AGENTS.md` en la raíz.** El repositorio DEBE contener un `AGENTS.md` en la raíz que incluya (a) un índice de la documentación, (b) las reglas obligatorias del repositorio y (c) un bloque de Comandos Rápidos cuyos comandos sean **reales y ejecutables** en este repositorio. NO DEBEN aparecer comandos de marcador de posición (por ejemplo, `npm test` en un repositorio que no usa npm).
2. **`CLAUDE.md` resuelve a `AGENTS.md`.** DEBE existir un `CLAUDE.md` que resuelva a `AGENTS.md` (un enlace simbólico o un equivalente que garantice una única fuente de verdad). Ambos NO DEBEN divergir.
3. **Una jerarquía `docs/`.** El repositorio DEBE contener un directorio `docs/` que cubra las categorías estándar (arquitectura, estándares, pruebas, comandos de desarrollo, seguridad e incorporación de agentes) con contenido real y específico del repositorio. Los módulos complejos DEBERÍAN llevar su propio `README.md`.
4. **Un hogar `.agents/`.** El repositorio DEBE contener un directorio `.agents/` con `agents/`, `commands/` y `skills/`, además de un catálogo en `.agents/docs/` que **coincida con lo que hay en disco**. Los comandos `dwp-*` DEBEN ser delegadores finos hacia el skill instalado. Una ruta `.claude` DEBE resolver a `.agents`.
5. **Un espacio `.dwp/` ignorado por git.** El repositorio DEBE contener un directorio `.dwp/` con `plans/` y `drafts/`, y `.dwp/` DEBE estar ignorado por git. Un espacio de trabajo `tmp/` DEBERÍA existir y DEBERÍA estar ignorado por git.
6. **El skill de la metodología es resoluble.** El skill de Deep Work Plan DEBE estar instalado o referenciado de modo que un agente en el repositorio pueda invocar sus sub-skills.

Un repositorio es **totalmente conforme con cero addons**. Los addons (devcontainer, Dailybot, dependency-upgrade) son opcionales y NO DEBEN ser requeridos para la conformidad.

## Un plan bien formado

Un Deep Work Plan en `.dwp/plans/` está bien formado cuando:

1. Cada tarea DEBE declarar un **alcance** explícito, **criterios de aceptación** y al menos una **puerta de validación** (un comando o comprobación que pase o falle de forma objetiva).
2. El plan DEBE persistir el progreso para que el trabajo sobreviva a la interrupción y pueda ser reanudado por un agente distinto.
3. El plan DEBE incluir las dos tareas finales obligatorias — Descubrimiento de Skills y Agentes y el Reporte Ejecutivo.
4. Las tareas DEBERÍAN reanclarse al objetivo del plan antes de ejecutarse, para evitar la desviación en un horizonte largo.

## Verificar la conformidad

La conformidad DEBERÍA verificarse de forma mecánica y no por inspección. Ejecutar `/dwp-verify` produce un informe de aprobado/fallido frente a los criterios de arriba: la presencia y el contenido real de `AGENTS.md`, la resolución de `CLAUDE.md`, las categorías de `docs/`, la coincidencia catálogo-versus-disco de `.agents/`, el estado de gitignore de `.dwp/` y `tmp/` y — para un plan — que cada tarea lleve criterios de aceptación y una puerta de validación.

Un repositorio DEBERÍA reverificarse tras la incorporación y tras cada plan completado, de modo que la conformidad se mantenga en lugar de afirmarse una sola vez.
