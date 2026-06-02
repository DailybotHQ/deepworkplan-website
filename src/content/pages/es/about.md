---
title: "Sobre la metodología"
description: "Deep Work Plan es una metodología abierta y agnóstica de framework para trabajo de ingeniería serio con agentes de IA. De dónde viene y quién la mantiene."
lastUpdated: 2026-05-30
---

## Qué es

Deep Work Plan (DWP) es una metodología, no un producto. Define cómo convertir un objetivo en un plan acordado, dividir ese plan en tareas atómicas y verificables de forma independiente, y ejecutar cada tarea en un ciclo enfocado que termina con una verificación.

Es una metodología guiada por especificación: el plan es la fuente de verdad duradera y los agentes ejecutan contra criterios de aceptación y puertas de validación explícitos. A diferencia de los sistemas guiados por especificación atados a una herramienta, como GitHub Spec Kit, Amazon Kiro o Tessl, DWP es independiente de herramientas y nativa del repositorio. Es además ingeniería de harness hecha portable: el contexto, las salvaguardas y el estado reanudable que hacen fiable a un agente se instalan en el propio repositorio (AGENTS.md, docs, el hogar de skills .agents/, la skill de DWP), de modo que cualquier agente puede pilotar cualquier repo.

Es deliberadamente agnóstica respecto al agente de IA o stack que uses — los adaptadores traducen el mismo ciclo central a Claude, Cursor, Copilot, Codex, Gemini y más. El plan, las tareas y el registro de ejecución son todo Markdown plano, así que el trabajo permanece legible, revisable y versionado.

---

## Principios fundamentales

- **Planificar antes de ejecutar** — No se escribe código hasta que el plan está acordado. El plan es un contrato entre tú y el agente. [Leer la metodología](/es/methodology)
- **Las tareas son atómicas** — Cada tarea tiene un alcance que permite ejecutarla y verificarla por sí sola, y luego confirmarla de forma atómica. [Ver la especificación](/es/spec)
- **Verificar todo** — Cada tarea termina con una verificación explícita antes de que comience la siguiente, con el progreso registrado en git. [Explorar el kit](/es/kit)

---

## De un vistazo

- Metodología abierta, con licencia MIT
- Agnóstica de framework y de agente
- Mantenida por Dailybot y la comunidad
- Incluye una especificación, comandos, adaptadores, presets y ejemplos
- Solo Markdown — sin runtime, sin dependencias forzadas
- Convierte cualquier repositorio en un código AI-first, pilotable por agentes

---

## Quién la mantiene

Deep Work Plan surgió del trabajo de ingeniería real en [Dailybot](https://www.dailybot.com) y ahora es mantenida por Dailybot junto con la comunidad de código abierto. La metodología, la especificación y el kit se publican bajo la licencia MIT — libres para usar, adaptar y construir sobre ellos.

- [Leer la metodología](/es/methodology)
- [Inicio rápido](/es/quickstart)
- [Repositorio en GitHub](https://github.com/DailybotHQ/deepworkplan-website)
