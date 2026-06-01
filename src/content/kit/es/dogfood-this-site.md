---
title: "Caso de estudio: este sitio web"
description: "Cómo deepworkplan.com se hizo AI-first con Deep Work Plan — un antes y después real de adoptar la metodología en un repositorio Astro de producción."
kind: example
lang: es
order: 2
---

# Caso de estudio: este sitio web

El sitio que estás leyendo aplica a sí mismo la metodología que documenta. Este es un relato real, no hipotético.

## Antes

El repositorio tenía un sistema de "deep work plan" hecho a medida y mantenido a mano dentro de `.agent_commands/` — procedimientos en prosa que solo funcionaban aquí, se desviaban del código y no podían viajar a otro repo. Incorporar un agente nuevo significaba volver a explicar el proyecto en cada sesión.

## El plan

Un solo Deep Work Plan guió la migración, descompuesto en tareas atómicas con puertas de validación:

1. Promover los generadores a medida al skill instalable (la sub-skill `author`).
2. Instalar el skill de Deep Work Plan como instalación por referencia, fijada por `skills-lock.json`.
3. Reemplazar los comandos caseros por delegadores `dwp-*` finos.
4. Retirar `.agent_commands/`; pasar toda la salida de planes a un `.dwp/` ignorado por git.
5. Documentar el resultado en `AGENTS.md`, `docs/` y el catálogo `.agents/`.

Cada tarea se validó contra las puertas reales del repositorio — `biome`, `astro:check`, la suite de pruebas, el build de producción y la comprobación de paridad de endpoints para agentes — antes de marcarse como completada.

## Después

El repositorio ahora es AI-first según su propia especificación: un `AGENTS.md` razonado, un árbol `docs/` categorizado, un kit `.agents/` multiagente y un espacio `.dwp/` ignorado por git. Cualquier agente — Claude Code, Cursor, Codex, Gemini, Copilot — puede abrirlo, leer el harness y ejecutar planes de largo alcance sin asistencia en cada sesión.

## Resultado

La metodología se demostró sobre su propio código. Lo que era maquinaria específica del repo se convirtió en un estándar portable que el repositorio simplemente *usa* — el mismo estándar que cualquier otro repositorio adopta siguiendo [`/init.md`](/es/init.md).
