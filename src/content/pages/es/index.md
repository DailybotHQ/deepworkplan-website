---
title: "Deep Work Plan — convierte cualquier repositorio en un código AI-first"
description: "Deep Work Plan convierte cualquier repositorio en un código AI-first, pilotable por agentes. Una metodología abierta con licencia MIT y un kit de referencia para una ejecución estructurada, validada y reanudable."
lastUpdated: 2026-05-30
---

## Convierte cualquier repositorio en un código AI-first

Deep Work Plan (DWP) es una metodología y un kit abiertos, con licencia MIT, para planificar y ejecutar trabajo de software complejo con agentes de IA. Documenta tu repositorio — AGENTS.md, docs y un hogar de skills `.agents/` — y produce planes de largo alcance que cualquier agente puede pilotar, validar y reanudar.

> Deep Work Plan es desarrollo guiado por especificación donde el propio repositorio se convierte en el harness.

- [Inicio rápido](/es/quickstart)
- [Leer la metodología](/es/methodology)

---

## El problema y la respuesta

Los agentes de programación de IA son muy eficaces en ráfagas cortas. En trabajo de largo alcance — una migración, un subsistema nuevo, una refactorización en decenas de archivos — se desvían: el contexto se llena, las decisiones se olvidan y las tareas de varias horas se abandonan a medio camino.

Deep Work Plan responde con **desarrollo guiado por especificación**: el plan es la fuente de verdad duradera y los agentes ejecutan contra criterios de aceptación y puertas de validación explícitos. La desviación baja, el trabajo se mantiene verificable y cualquier agente puede reanudarlo entre sesiones. A diferencia de las herramientas guiadas por especificación atadas a un IDE o proveedor (GitHub Spec Kit, Amazon Kiro, Tessl), DWP es independiente de la herramienta y nativa del repositorio.

También es **ingeniería de harness** hecha portable. Un harness de agente es el andamiaje alrededor de un modelo — contexto, herramientas, bucle de control, barreras, estado reanudable — que lo hace fiable. Deep Work Plan instala ese harness en el propio repositorio, para que cualquier agente pueda pilotar cualquier repo.

---

## Qué obtienes

- AGENTS.md en la raíz del repositorio, razonado a partir de tu stack y comandos reales.
- `docs/` categorizado y documentación por módulo.
- Un directorio `.agents/` (skills, agentes, comandos) con el enlace simbólico `.claude` a `.agents`.
- El skill de Deep Work Plan, instalado una sola vez para cada agente.
- Planes de largo alcance y reanudables en una carpeta `.dwp/` ignorada por git.

---

## Cómo adoptarlo

1. Instala el skill desde `DailybotHQ/deepworkplan-skill`.
2. Genera un plan a partir de tu iniciativa.
3. Ejecuta con cualquier agente — Claude Code, Cursor, Codex, Gemini o Copilot.

```
npx skills add DailybotHQ/deepworkplan-skill
```

---

## La metodología, la especificación y el kit

- [Leer la metodología](/es/methodology) — qué es DWP, los principios, el flujo de trabajo y cómo adoptarla.
- [Leer la especificación](/es/spec) — anatomía de tareas, puertas de validación, el protocolo de finalización, arquetipos y addons.
- [Explorar el kit](/es/kit) — presets, adaptadores y comandos para instalar DWP en un repositorio.
- [Ver ejemplos](/es/examples) — recorridos de antes y después de trabajo de ingeniería real.

---

## Quién lo construye

Deep Work Plan surgió del trabajo de ingeniería real en [Dailybot](https://www.dailybot.com) y es mantenida por Dailybot junto con la comunidad de código abierto.

- [Sobre la metodología](/es/about)
- [Comunidad y contacto](/es/contact)
- [Repositorio en GitHub](https://github.com/DailybotHQ/deepworkplan-website)
