---
title: "Deep Work Plan — convierte cualquier repositorio en un código AI-first"
description: "Deep Work Plan convierte cualquier repositorio en un código AI-first, pilotable por agentes. Una metodología abierta con licencia MIT y un kit de referencia para una ejecución estructurada, validada y reanudable."
lastUpdated: 2026-05-30
---

## Haz que cualquier repositorio sea AI-first. Dale a tu agente una sola instrucción.

Deep Work Plan (DWP) es una metodología y un kit abiertos, con licencia MIT, para planificar y ejecutar trabajo de software complejo con agentes de IA. No eliges un método de instalación ni copias una plantilla: le das a tu agente una sola línea:

> Lee y sigue las instrucciones en https://deepworkplan.com/init.md para hacer este repositorio AI-first.

Tu agente lee el plan, instala el kit e incorpora tu repositorio, razonando sobre tu stack real, sin pegar una plantilla.

> Deep Work Plan es desarrollo guiado por especificación donde el propio repositorio se convierte en el harness.

- [Abrir el prompt de /init](/es/init)
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
- El skill de Deep Work Plan, instalado una sola vez para cada agente — incluida la subhabilidad author, para que el repositorio pueda crear sus propias habilidades, agentes y comandos, además de complementos de mantenimiento opcionales como dependency-upgrade.
- Planes de largo alcance y reanudables en una carpeta `.dwp/` ignorada por git.

---

## Qué ocurre cuando lo ejecutas

1. **Tu agente abre [/init](/es/init)** — lee el prompt de incorporación y la metodología, la especificación y el kit que enlaza.
2. **Instala el skill de Deep Work Plan** — el router más sus sub-skills (create, execute, refine, resume, status, onboard, author), para Claude Code, Cursor, Codex, Gemini y Copilot.
3. **Incorpora tu repositorio** — razonando sobre tu stack real, escribe AGENTS.md, `docs/`, READMEs por módulo, el kit `.agents/` y un `.dwp/` ignorado por git. Sin plantillas, sin marcadores de posición.
4. **Planificas y ejecutas** — Deep Work Plans de largo alcance, ejecutados paso a paso contra criterios de aceptación y puertas de validación explícitos.

¿Prefieres instalar el skill tú mismo? La instrucción de arriba lo hace por ti, pero cualquiera de estas opciones funciona; luego pídele a tu agente que haga el repositorio AI-first:

```
npx skills add DailybotHQ/deepworkplan-skill
openclaw skills install deepworkplan
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
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
