---
title: "El Kit de Deep Work Plan"
description: "La skill y sus nueve sub-skills, comandos, adaptadores, presets de incorporación, addons opcionales y ejemplos que hacen ejecutable DWP en cualquier stack."
lastUpdated: 2026-10-09
---

## El Kit de Deep Work Plan

El kit es todo lo que necesitas para ejecutar la metodología en la práctica. Se instala desde
`DailybotHQ/deepworkplan-skill`:

```bash
npx --yes skills add https://github.com/DailybotHQ/deepworkplan-skill/tree/v7.0.1 --skill deepworkplan -y
```

El paquete 7.x actual crea planes nuevos con v7 de forma predeterminada. Los planes existentes conservan su generación registrada; la migración requiere una solicitud explícita.

### La skill y sus sub-skills

La skill de Deep Work Plan es un enrutador más nueve sub-skills:

- **create** — descompone un objetivo en un plan estructurado (`/dwp-create`).
- **execute** — ejecuta un plan tarea por tarea, validando cada compuerta (`/dwp-execute`).
- **refine** — agrega, quita o reordena tareas preservando el trabajo completado (`/dwp-refine`).
- **resume** — reconstruye el estado y continúa un plan interrumpido (`/dwp-resume`).
- **status** — reporta el avance sin hacer cambios (`/dwp-status`).
- **verify** — comprueba de forma objetiva la conformidad del repositorio y de los planes (`/dwp-verify`).
- **onboard** — convierte un repositorio en AI-first (`/deepworkplan-onboard`).
- **author** — crea o evoluciona las skills, agentes y comandos del propio repo (`/skill-create`, `/agent-create`).
- **upgrade** — lleva una skill instalada a una versión más reciente de forma segura (`/dwp-upgrade`).

### Comandos

Comandos de barra ligeros delegan en las sub-skills y los addons:

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — el bucle planificar-ejecutar-verificar.
- `skill-create`, `agent-create` — delegan en la sub-skill author.
- `lib-upgrade` — delega en el addon dependency-upgrade (se instala solo cuando se acepta ese addon).

### Adaptadores

Integraciones ligeras por agente para Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini,
OpenCode, Windsurf, Cline y Antigravity. Para plataformas de agentes autónomos: OpenClaw y Hermes ejecutan
planes bajo el perfil de ejecución desatendida, impulsados por latido o programación cron; los agentes en la
nube y en segundo plano (tareas remotas de Claude Code, Codex en la nube, tipo Jules) usan la capa de estado
del plan para la reanudación entre sesiones efímeras.

### Presets de incorporación

Guías de razonamiento por stack que el flujo de onboard usa para adaptar docs, skills y comandos de
validación — nunca plantillas. Seis presets: Django, Vue + Vite, Astro/Svelte, servicio Node/TS,
paquete/CLI de Python y una reserva genérica.

### Addons (opcionales)

Capacidades que el flujo de onboard suma a un repo. Siete son opcionales y nunca forman parte de la base
AI-first; la revisión local de AI Diff Reviewer es requerida desde el estándar 2.3.0:

- **Devcontainer** — un contenedor de desarrollo reproducible y aislado con autenticación de CLI de IA persistente.
- **Dailybot** — reportes de avance e hitos de mejor esfuerzo para equipos que usan Dailybot.
- **Actualización de dependencias** — actualizaciones agnósticas del gestor de paquetes, por lotes, validadas y reversibles.
- **Sistema de diseño** — un `DESIGN.md` con alcance de interfaz (en `docs/DESIGN.md`, referenciado desde `AGENTS.md`) razonado a partir de la fuente de diseño real del repo, con perfiles para UI visual, salida de CLI con estilo y mensajería conversacional, para que los agentes generen salida de interfaz fiel a la marca; cuando se detecta un sistema de diseño la oferta es obligatoria mientras la instalación está protegida por aceptación — el perfil visual es recomendado con fuerza cuando se detecta, y los perfiles de CLI y conversacional se recomiendan cuando se detectan y siempre se preguntan.
- **AI Diff Reviewer** — la revisión local requerida: el onboarding instala [AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) v3 + `.review/extension.md`, y el pase de seguridad de cada Final Review la ejecuta; el Flujo B opcional añade una compuerta de fusión de PR en CI que comparte la misma extensión, ofrecida explícitamente y nunca instalada sin pedirlo.
- **[Herdr](/es/kit/herdr)** — delegación interactiva: un plan entrega una tarea acotada a un agente de codificación en otro panel de Herdr y registra su única respuesta autorizada.
- **[DeepWorkPlan Vim](/es/kit/vim)** — el editor de terminal para Deep Work Plan, con un índice de comandos, un explorador de planes de solo lectura y un visor de Markdown.
- **[Agentkit](/es/kit/agentkit)** — un único comando `ak` para todos los agentes de codificación de terminal, y delegación sin interfaz (headless) de tareas acotadas del plan.

### Ecosistema

**La metodología funciona sola. Los addons la amplifican.** Cada addon es un integrador ligero dentro de la skill de Deep Work Plan, fijado por etiqueta a un producto con su propio repositorio, versión y versión de interfaz. Cada producto funciona sin Deep Work Plan, y ningún addon es obligatorio.

- **Skill de Deep Work Plan** — Crea, ejecuta, verifica, reanuda y refina planes. No necesita ningún addon.
- **[herdr](/es/kit/herdr)** — Pares en paneles de Herdr, en cualquier máquina: delegación interactiva con una única respuesta autorizada. Fijado en `herdr-peers@v0.1.0`.
- **[agentkit](/es/kit/agentkit)** — Un solo comando ak para cada agente de programación en terminal: delegación sin interfaz en un worktree. Fijado en `coding-agents-kit@v0.1.1`.
- **[devcontainer](/es/kit/devcontainer)** — Una plantilla de Dev Containers e imágenes base que se distribuyen sin agentes de programación. Fijado en `devcontainer-kit@v0.1.4`.
- **[vim](/es/kit/vim)** — El editor de terminal, con un explorador de planes de solo lectura y un visor de Markdown. Fijado en `deepworkplan-vim@v0.4.2`.

El registro de addons y los descriptores se distribuyen en Deep Work Plan v7: `v7.0.0`

### Ejemplos

Recorridos resueltos de antes y después.

- [Explorar el kit](/es/kit)
- [Inicio rápido](/es/quickstart)
- [Ver ejemplos](/es/examples)
