---
title: "Caso de estudio: este sitio web"
description: "Cómo deepworkplan.com funciona sobre Deep Work Plan — un relato real de un repositorio Astro de producción hecho AI-first con la metodología que documenta."
kind: example
lang: es
order: 2
---

# Caso de estudio: este sitio web

El sitio que estás leyendo funciona sobre la metodología que documenta. Aplica Deep Work Plan a sí mismo: el mismo skill, el mismo flujo de `/init`, los mismos planes en `.dwp/` que usaría cualquier otro repositorio. Este es un relato real, no hipotético.

## Antes

Como la mayoría de los repositorios, este no estaba hecho para agentes. El contexto vivía en la cabeza de las personas y en notas dispersas, no había una única fuente de verdad que un agente pudiera leer, e incorporar un agente nuevo significaba volver a explicar el proyecto en cada sesión. El trabajo de largo alcance se desviaba.

## Adoptar DWP

El repositorio se hizo AI-first con un solo Deep Work Plan, descompuesto en tareas atómicas con puertas de validación:

1. Instalar el skill de Deep Work Plan como instalación por referencia, fijada por `skills-lock.json`.
2. Ejecutar la incorporación para generar un `AGENTS.md` razonado, el árbol `docs/` y la documentación por módulo a partir del stack real del repositorio.
3. Construir el kit multiagente `.agents/` — delegadores de comando `dwp-*` finos y un catálogo que coincide con lo que hay en disco.
4. Crear el espacio `.dwp/` ignorado por git para planes y borradores.
5. Verificar la conformidad con `/dwp-verify`.

Cada tarea se validó contra las puertas reales del repositorio — `biome`, `astro:check`, la suite de pruebas, el build de producción y la comprobación de paridad de endpoints para agentes — antes de marcarse como completada.

## Después

El repositorio ahora es AI-first según su propia especificación: un `AGENTS.md` razonado, un árbol `docs/` categorizado, un kit `.agents/` multiagente y un espacio `.dwp/` ignorado por git. Cualquier agente — Claude Code, Cursor, Codex, Gemini, Copilot — puede abrirlo, leer el harness y ejecutar planes de largo alcance sin asistencia en cada sesión.

## Resultado

La metodología se demuestra sobre su propio código: este sitio se construye y se mantiene de la misma forma que te dice que construyas el tuyo — siguiendo [`/init.md`](/init.md). Si el estándar funciona aquí, en producción, también funciona para tu repositorio.
