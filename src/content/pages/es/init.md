---
title: Init — Convierte tu repositorio en AI-first
description: Adopta la metodología Deep Work Plan en cualquier repositorio. Instala la skill, ejecuta la incorporación del agente, evoluciona el kit y planifica y ejecuta trabajo estructurado con cualquier agente de IA.
---

# Init — Instrucción de incorporación para agentes de IA

Eres un agente de programación con IA. Tu tarea es convertir el repositorio actual en **AI-first**
y **guiado por especificación** adoptando la metodología Deep Work Plan (DWP). Sigue estos pasos en
orden. Razona sobre el repositorio real: nunca copies una plantilla ni dejes un marcador de posición.
Detente e informa si un paso falla.

## 0. Lee la metodología y la especificación

Antes de cambiar nada, lee las fuentes canónicas para entender el estándar que vas a adoptar:

- Metodología: https://deepworkplan.com/methodology.md
- Especificación: https://deepworkplan.com/spec.md
- Catálogo del kit: https://deepworkplan.com/kit.md

## 1. Instala la skill de Deep Work Plan

Instala la skill para que los agentes de este repositorio puedan planificar y ejecutar trabajo
estructurado. La skill incluye un enrutador y siete sub-skills: `create`, `execute`, `refine`,
`resume`, `status`, `onboard` y `author`.

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

O clona y ejecuta el script de instalación:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 2. Ejecuta la incorporación del repositorio

Invoca la sub-skill de onboard (`/deepworkplan-onboard`). No copies una plantilla: **razona sobre el
repositorio real** y adáptalo todo a él. El flujo:

1. **Reconocimiento.** Detecta los lenguajes, los frameworks, el gestor de paquetes (a partir del
   lockfile que realmente existe), los comandos reales de compilación/pruebas/lint/verificación de
   tipos, los módulos de código, la convención de pruebas y la forma de despliegue. Usa el preset de
   incorporación más cercano (Django, Vue + Vite, Astro/Svelte, servicio Node/TS, paquete/CLI de
   Python o genérico) como guía de razonamiento — la realidad detectada siempre gana.
2. **Arquetipo.** Clasifica el repo como repositorio individual (el caso común) o como hub
   orquestador, y registra la evidencia.
3. **`AGENTS.md` + `CLAUDE.md`.** Genera un `AGENTS.md` en la raíz: un índice, las reglas obligatorias
   (solo inglés, commits convencionales, el patrón de pruebas real del repo y sus puertas de revisión)
   y un bloque de Comandos rápidos con los comandos **reales y ejecutables** del repo. Crea el enlace
   simbólico `CLAUDE.md → AGENTS.md`.
4. **`docs/`.** Genera las categorías estándar con contenido real y específico del repo:
   `ARCHITECTURE.md`, `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md`,
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, además de `PERFORMANCE.md` y un índice
   `docs/README.md`.
5. **Docs por módulo.** Añade un `README.md` (y una subcarpeta `docs/` para módulos complejos) dentro
   de cada módulo de código importante descubierto en el reconocimiento.
6. **`.agents/` + `.claude → .agents`.** Crea el hogar canónico y multiagente: `agents/` razonados,
   `skills/` adaptadas al stack, `commands/` con delegadores ligeros `dwp-*` que delegan en la skill
   instalada, un catálogo `docs/` (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`) que coincide
   con lo que creaste y `settings.json`. Añade el enlace simbólico `.claude → .agents`.
7. **Skill + `.dwp/`.** Haz que la skill sea descubrible en el repo y crea un `.dwp/` ignorado por git
   con `plans/` y `drafts/`, más un espacio de trabajo `tmp/` — ambos añadidos a `.gitignore` sin
   sobrescribir.

## 3. Evoluciona el kit (sub-skill author)

Usa la sub-skill `author` para hacer crecer el kit del propio repositorio. Los delegadores ligeros
`/skill-create` y `/agent-create` enrutan a ella. Crea una **skill** para un procedimiento repetible
en sesión, un **agente** para un rol recurrente con su propia gama de modelo y herramientas, y un
**comando** solo como delegador ligero. Mantén el catálogo `.agents/docs/` sincronizado con lo que
existe en disco.

## 4. Ofrece los addons opcionales

Tras la base, enumera los tres addons y ofrece cada uno como una opción explícita. Un repo es
plenamente conforme con **cero** addons — nunca los instales automáticamente para todos.

- **Soporte de devcontainer** — un contenedor de desarrollo reproducible y aislado con autenticación
  de CLI de IA persistente.
- **Integración con Dailybot** — reportes de avance/hito de mejor esfuerzo para equipos que ya usan
  Dailybot. La metodología central tiene cero dependencia de Dailybot.
- **Actualización de dependencias** — actualizaciones agnósticas del gestor de paquetes, por lotes,
  validadas y reversibles. Cuando se acepta, instala el comando `/lib-upgrade`.

## 5. Planifica y ejecuta

Genera Deep Work Plans para cualquier tarea y ejecútalos tarea por tarea:

- `/dwp-create <goal>` — descompone un objetivo en tareas numeradas y secuenciales con compuertas de
  validación.
- `/dwp-execute` — ejecuta el plan tarea por tarea, actualizando el avance y validando cada compuerta.
- `/dwp-status` — reporta el avance sin hacer cambios.
- `/dwp-refine` — agrega, quita o reordena tareas preservando el trabajo completado.
- `/dwp-resume` — reconstruye el estado y continúa un plan interrumpido.

## 6. Verifica

Confirma que el repositorio ya está listo para agentes:

- [ ] La skill está instalada y se puede resolver, con las siete sub-skills disponibles.
- [ ] `AGENTS.md` existe en la raíz con un bloque de Comandos rápidos real; `CLAUDE.md` resuelve a él.
- [ ] `docs/` contiene las categorías estándar con contenido real y específico del repo; los módulos
      importantes tienen un `README.md`.
- [ ] `.agents/` existe con `agents/`, `commands/` (delegadores ligeros `dwp-*`), `skills/` y un
      catálogo que coincide con la realidad; `.claude → .agents` resuelve.
- [ ] `.dwp/` existe, está ignorado por git y tiene `plans/` y `drafts/`; `tmp/` existe y está
      ignorado por git.
- [ ] Puedes generar un Deep Work Plan y ejecutarlo tarea por tarea, validando cada compuerta.

## Resultado

Cuando la incorporación se completa, el repositorio queda cambiado de dos maneras duraderas — los
pilares de la metodología:

1. **El repositorio es guiado por especificación.** El trabajo comienza desde un plan y una
   especificación escritos, no desde prompts improvisados.
2. **El repositorio mismo es el harness del agente.** `AGENTS.md`, `docs/`, las docs por módulo y el
   hogar de skills `.agents/` dan a cada agente el contexto y los comandos que necesita para hacer
   trabajo estructurado y verificable.
