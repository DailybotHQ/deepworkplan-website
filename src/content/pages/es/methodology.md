---
title: "La Metodología Deep Work Plan"
description: "Cinco capítulos, del manifiesto a los arquetipos: principios, bucle central, plantillas, skills y adaptaciones de la metodología Deep Work Plan."
lastUpdated: 2026-05-30
---

## La Metodología Deep Work Plan

Deep Work Plan (DWP) es una metodología abierta y agnóstica de frameworks para ejecutar trabajo de ingeniería estructurado y autónomo con agentes de programación con IA. Convierte un objetivo difuso en un plan revisable que un agente puede ejecutar, pausar, reanudar y reportar — sin perder el contexto.

DWP se apoya en dos pilares.

**Desarrollo guiado por especificación.** En vez de tratar una transcripción de chat como la fuente de verdad, primero escribes *qué* debe ser cierto — objetivo, alcance, criterios de aceptación y las comprobaciones que prueban que está hecho — y el agente ejecuta contra esa especificación. En DWP el plan *es* la especificación: plan → tareas atómicas → puertas de validación → finalización. Escribir primero la especificación reduce la desviación (el agente se mide frente a criterios declarados), hace el trabajo verificable (cada puerta pasa o falla) y lo hace reanudable (la especificación sobrevive a cualquier sesión o agente). Independiente de herramientas y nativa del repositorio, se distingue de los sistemas guiados por especificación atados a una herramienta como GitHub Spec Kit, Amazon Kiro y Tessl.

**Ingeniería de harness — el repositorio se convierte en el harness.** Un modelo de lenguaje por sí solo es solo un predictor de texto; lo que lo hace un ingeniero fiable es el *harness* que lo rodea — contexto, herramientas, un bucle de control, salvaguardas y estado persistente. La ingeniería de harness es diseñar ese andamiaje de forma deliberada. La posición de DWP es que debe vivir en el repositorio, no en una herramienta: el contexto como `AGENTS.md` + `docs/`, las herramientas como el kit `.agents/`, el bucle de control como el plan, las salvaguardas como las puertas de validación y el estado como el `.dwp/` ignorado por git. Como cada parte es un archivo del repo, el harness es portable — de modo que cualquier agente puede pilotar cualquier repo.

La metodología se explica en cinco capítulos:

1. **Manifiesto** — qué es un Deep Work Plan y por qué importa la ejecución estructurada.
2. **Bucle central** — el ciclo planificar-ejecutar-verificar que impulsa cada tarea.
3. **Plantillas** — las estructuras de plan y tarea que comparten agentes y personas.
4. **Skills y agentes** — cómo encajan los comandos y los roles de agente, el kit vivo (cómo un repositorio crea sus propias habilidades mediante la subhabilidad author) y los complementos opcionales como dependency-upgrade y el complemento de frontend design-system.
5. **Arquetipos** — adaptar la metodología a repos individuales y hubs orquestadores.

- [Leer la metodología](/es/methodology)
- [Leer la especificación](/es/spec)
- [Explorar el kit](/es/kit)
