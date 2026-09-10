---
title: "Deep Work Plan — ejecución estructurada para agentes de IA"
description: "El contexto importa más que el modelo. Deep Work Plan hace de cualquier repositorio un entorno estructurado donde un agente completa trabajo de largo aliento."
lastUpdated: 2026-09-10
---

## Los modelos importan. El contexto importa más.

Deep Work Plan convierte cualquier repositorio en un entorno estructurado — contexto, guardrails y un plan duradero — donde cualquier agente de código ejecuta con precisión y completa el trabajo de largo aliento.

Deep Work Plan (DWP) es una metodología y un kit abiertos, con licencia MIT, para planificar y ejecutar trabajo de software complejo con agentes de IA. No eliges un método de instalación ni copias una plantilla: copias el prompt de init.md y lo pegas en tu agente:

> Copia el prompt de init.md y pégalo en tu agente de código — Claude Code, Cursor, Codex, o cualquier otro — para hacer de cualquier repositorio uno AI-first.

> Deep Work Plan es desarrollo guiado por especificación donde el propio repositorio se convierte en el harness.

- [Abrir el prompt de /init](/es/init)
- [Leer la metodología](/es/methodology)

---

## Los humanos dirigen. Los agentes ejecutan.

Tú decides qué significa «hecho» y dónde están los límites. El plan lleva tu intención; los agentes ponen las horas — sin supervisión constante, sin corregir cada veinte minutos.

- Tú: intención, criterios de aceptación, revisión
- Agentes: ejecución, tarea a tarea
- El plan: el contrato entre ambos

[Lee la metodología](/es/methodology)

---

## Un plan del que los agentes no pueden desviarse.

Las tareas largas llenan el contexto de cualquier modelo. Los detalles se pierden y el agente se desvía. Un plan escrito — tareas atómicas, puertas de validación, estado reanudable — es aquello a lo que vuelve, vuelta tras vuelta.

1. Plan
2. Tareas atómicas
3. Puertas de validación
4. Finalización
5. Estado reanudable

[Ve el bucle principal](/es/methodology)

---

## Hecho es un contrato, no una intuición.

Cada tarea nombra sus criterios de aceptación y las comprobaciones que deben pasar. El agente no puede sentirse terminado — tiene que pasar, o la tarea sigue abierta.

- Los tests pasan
- Los tipos se verifican
- Los criterios de aceptación se cumplen
- O la tarea sigue abierta

[Lee la especificación](/es/spec)

---

## El repositorio es el harness.

El contexto, las herramientas, los guardarraíles y el estado viven en tu repositorio como archivos planos que cualquier agente puede leer. Sin dependencias, sin cerebro externo — sobrevive a los reinicios de contexto.

- Especificación duradera en disco
- Puertas de validación, no corazonadas
- Sobrevive a los reinicios de contexto

**PE · ASK · HECK · TAT · OOL**

[Ve qué genera la incorporación](/es/quickstart)
---

## Qué obtienes

- AGENTS.md en la raíz del repositorio, razonado a partir de tu stack y comandos reales.
- `docs/` categorizado y documentación por módulo.
- Un directorio `.agents/` (skills, agentes, comandos) con el enlace simbólico `.claude` a `.agents`.
- El skill de Deep Work Plan, instalado una sola vez para cada agente — incluida la subhabilidad author, para que el repositorio pueda crear sus propias habilidades, agentes y comandos, además de complementos opcionales como dependency-upgrade y el complemento design-system para cualquier superficie de interfaz orientada al usuario.
- Planes de largo alcance y reanudables en una carpeta `.dwp/` ignorada por git.

---

## Qué ocurre cuando lo ejecutas

1. **Tu agente abre [/init.md](/init.md)** — lee el prompt de incorporación y la metodología, la especificación y el kit que enlaza.
2. **Instala el skill de Deep Work Plan** — el motor, idéntico en todos los repositorios: el router más sus sub-skills (create, execute, refine, resume, status, verify, onboard, author), para Claude Code, Cursor, Codex, Gemini y Copilot.
3. **Adapta tu repositorio** — razonando sobre tu stack real (nunca copiando y pegando), escribe AGENTS.md, `docs/`, READMEs por módulo, un kit `.agents/` razonado y un `.dwp/` ignorado por git. Tu repositorio se convierte en el harness.
4. **Planificas y ejecutas** — Deep Work Plans de largo alcance, ejecutados paso a paso contra criterios de aceptación y puertas de validación explícitos, de forma autónoma durante horas.

El skill es el motor reutilizable, instalado igual en todas partes; lo que se adapta es tu repositorio. La mecánica de instalación (Skills CLI, OpenClaw o git clone) vive en el prompt [/init.md](/init.md) y en el [inicio rápido](/es/quickstart).

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
