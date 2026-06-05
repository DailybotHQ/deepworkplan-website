---
title: "El Kit de Deep Work Plan"
description: "La skill y sus ocho sub-skills, comandos, adaptadores, presets de incorporación, addons opcionales y ejemplos que hacen ejecutable DWP en cualquier stack."
lastUpdated: 2026-05-31
---

## El Kit de Deep Work Plan

El kit es todo lo que necesitas para ejecutar la metodología en la práctica. Se instala desde
`DailybotHQ/deepworkplan-skill`:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### La skill y sus sub-skills

La skill de Deep Work Plan es un enrutador más ocho sub-skills:

- **create** — descompone un objetivo en un plan estructurado (`/dwp-create`).
- **execute** — ejecuta un plan tarea por tarea, validando cada compuerta (`/dwp-execute`).
- **refine** — agrega, quita o reordena tareas preservando el trabajo completado (`/dwp-refine`).
- **resume** — reconstruye el estado y continúa un plan interrumpido (`/dwp-resume`).
- **status** — reporta el avance sin hacer cambios (`/dwp-status`).
- **verify** — comprueba de forma objetiva la conformidad del repositorio y de los planes (`/dwp-verify`).
- **onboard** — convierte un repositorio en AI-first (`/deepworkplan-onboard`).
- **author** — crea o evoluciona las skills, agentes y comandos del propio repo (`/skill-create`, `/agent-create`).

### Comandos

Comandos de barra ligeros delegan en las sub-skills y los addons:

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — el bucle planificar-ejecutar-verificar.
- `skill-create`, `agent-create` — delegan en la sub-skill author.
- `lib-upgrade` — delega en el addon dependency-upgrade (se instala solo cuando se acepta ese addon).

### Adaptadores

Integraciones ligeras por agente para Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini,
OpenCode, Windsurf, Cline y Antigravity.

### Presets de incorporación

Guías de razonamiento por stack que el flujo de onboard usa para adaptar docs, skills y comandos de
validación — nunca plantillas. Seis presets: Django, Vue + Vite, Astro/Svelte, servicio Node/TS,
paquete/CLI de Python y una reserva genérica.

### Addons (opcionales)

Capacidades opcionales que el flujo de onboard puede sumar a un repo — nunca forman parte de la base
AI-first:

- **Devcontainer** — un contenedor de desarrollo reproducible y aislado con autenticación de CLI de IA persistente.
- **Dailybot** — reportes de avance e hitos de mejor esfuerzo para equipos que usan Dailybot.
- **Actualización de dependencias** — actualizaciones agnósticas del gestor de paquetes, por lotes, validadas y reversibles.

### Ejemplos

Recorridos resueltos de antes y después.

- [Explorar el kit](/es/kit)
- [Inicio rápido](/es/quickstart)
- [Ver ejemplos](/es/examples)
