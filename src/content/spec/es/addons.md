---
title: Complementos
description: "Addons de DWP: cuatro opcionales (devcontainer, Dailybot, dependency-upgrade, design-system), la revisión local requerida de AI Diff Reviewer con superficie de CI opcional, contrato de addon y conceptos del kit."
order: 6
lang: es
section: Addons
---

# Complementos

**Versión 4.0.0.** Los complementos son extensiones de la metodología central de Deep Work Plan. Cuatro de los cinco son opcionales y **nunca obligatorios para el cumplimiento** — un repositorio sin addons opcionales es plenamente AI-first y conforme con DWP. Cada addon opcional se ofrece durante la incorporación, se acepta o rechaza explícitamente y — cuando se acepta — **reconcilia** con la configuración existente en lugar de sobrescribirla. Un componente es la excepción declarada: desde el estándar 2.3.0 la **revisión local de AI Diff Reviewer** es parte de la línea base requerida — el onboarding la instala y cada Final Review la ejecuta — mientras que su superficie de CI sigue siendo opcional.

## El contrato de addon

Cada addon activo incluye cuatro componentes obligatorios:

| Componente | Propósito |
|-----------|---------|
| **Spec** | Descripción normativa RFC-2119 de lo que aporta el addon y qué significa «conforme con este addon» |
| **Plantillas de razonamiento** | Guías que el agente completa razonando sobre el stack del repo objetivo — no copiar y pegar |
| **Hook de incorporación** | Punto de entrada `SKILL.md` que el flujo `onboard` invoca cuando el desarrollador acepta |
| **Paso de validación** | Lista de comprobación que confirma que el addon se aplicó correctamente |

Descubrimiento: el flujo `onboard` enumera `skills/deepworkplan/addons/` y presenta cada addon como un paso opcional en la **Fase 7b**, tras el andamiaje central.

## Addons activos (cinco)

Hoy se distribuyen cinco addons — cuatro opcionales más la revisión local requerida. Cada uno tiene una **página del catálogo del kit** con detalle orientado al usuario y una **spec normativa** dentro de la skill de Deep Work Plan.

### Devcontainer (primer addon)

Una configuración `.devcontainer/` + `docker/` basada en compose, razonada a partir del stack detectado.

- **Página del kit:** [Devcontainer](/kit/devcontainer)
- **Qué añade:** volúmenes persistentes de auth de CLI de IA (Claude, Codex, Cursor, gh, Dailybot), `dailybot-project-network`, `DOCKER_DEV_ENV=vscode`, alias de validación (`codecheck`, `check`, `fix`, `test`), higiene de secretos en OSS público
- **Comportamiento:** ~85 % esqueleto estable; ~15 % razonado por stack. Los devcontainers existentes se reconcilian, nunca se sobrescriben
- **Cuándo se ofrece:** la mayoría de repos con Docker o servicios que se benefician de un contenedor de desarrollo aislado

### Dailybot (segundo addon)

Una conexión opcional al **equipo de Dailybot** del desarrollador para visibilidad del avance del agente.

- **Página del kit:** [Dailybot](/kit/dailybot) — referencia completa de capacidades
- **Qué conecta el addon de DWP:** cuatro reportes del ciclo de vida del plan (inicio, tarea significativa, bloqueado, finalización) vía la sub-skill `report` de dailybot; refuerzo determinístico opcional mediante hooks (`dailybot hook`, CLI `>= 3.7.0`)
- **Skill emparejada:** instalar [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (actualmente **3.10.3**) expone **14 capacidades** — chat en Slack/Teams/Discord/Google Chat, check-ins, autoría de formularios, ask AI, kudos, claves API por repo (`.dailybot/env.json`), correo y más. El addon de DWP solo conecta **report**; el resto de capacidades se invocan directamente mediante la skill de Dailybot
- **Auth:** totalmente delegada a la skill de Dailybot (`dailybot login` o `DAILYBOT_API_KEY`); este addon nunca almacena credenciales
- **Salvaguarda neutral respecto al proveedor:** el DWP central tiene **cero** dependencia de Dailybot; nunca instalar automáticamente para todos
- **Cuándo se ofrece:** el desarrollador o el equipo ya usan Dailybot, o piden explícitamente reportes al equipo

### Dependency upgrade (tercer addon)

Actualizaciones de dependencias por lotes, validadas y reversibles, agnósticas al gestor de paquetes.

- **Página del kit:** [Dependency upgrade](/kit/dependency-upgrade)
- **Qué añade:** detecta el gestor **real** del repo (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), actualiza en lotes clasificados por semver, ejecuta la puerta de validación del repo tras cada lote, revierte fallos, resume sin confirmar automáticamente
- **Comando:** instala `/lib-upgrade` en `.agents/commands/` solo cuando se acepta
- **Cuándo se ofrece:** se ofrece para todo repositorio con dependencias declaradas; el delegador inerte `/lib-upgrade` se instala bajo el consentimiento del onboarding salvo rechazo explícito — una instalación no ejecuta ninguna actualización

### Design system (cuarto addon)

Un `DESIGN.md` con alcance de superficie de interfaz que cualquier agente de codificación lee para una salida coherente de UI, CLI o conversacional.

- **Página del kit:** [Design system](/kit/design-system)
- **Qué añade:** `docs/DESIGN.md` (referenciado desde `AGENTS.md`) con hasta tres **perfiles** apilados en un solo archivo: **visual-ui** (tokens y componentes de UI renderizada), **cli-output** (estilos semánticos de terminal, degradación TTY/`NO_COLOR`), **conversational** (voz, anatomía del mensaje, renderizado por plataforma con alternativas en texto plano)
- **Fuerza del perfil:** la detección hace obligatoria la oferta; la instalación está protegida por aceptación tanto en modo guiado como en modo de confianza — visual-ui es **recomendado con fuerza cuando se detecta**; cli-output y conversational se **recomiendan cuando se detectan, siempre se preguntan, nunca se aplican automáticamente**
- **Cuándo se ofrece:** solo cuando se detecta una superficie de interfaz orientada al usuario — no para bibliotecas puras, servicios sin interfaz o repos solo de infraestructura

### AI Diff Reviewer (quinto addon — revisión local requerida, superficie de CI opcional)

El **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **«AI Diff Reviewer»**, versión actual **v2.0.1**) da al pase de seguridad del Final Review obligatorio una revisión local estructurada y, opcionalmente, bloquea los pull requests en CI. Desde el estándar 2.3.0 la **revisión local es parte de la línea base**; solo la superficie de CI es opcional.

- **Página del kit:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — referencia completa de capacidades
- **Requerido en el onboarding (Fase 7a):** instalación fijada por tag de la skill vendorizada (`npx --yes skills add DailybotHQ/ai-diff-reviewer@v2.0.1 --skill ai-diff-reviewer -y`) más un `.review/extension.md` a medida del repo (vía `generate-extension`), bajo el consentimiento del onboarding; una actualización dirigida del harness reconcilia ambos cuando faltan; un rechazo se registra como excepción declarada y `verify` lo reporta hasta que se instale
- **Requerido en cada Final Review:** el pase de seguridad ejecuta el flujo padre por defecto de la skill upstream sobre el conjunto acumulado de cambios y añade su salida al `analysis_results/SECURITY_REVIEW.md` local del plan (dentro del folder propio del plan, nunca en la raíz del repositorio); una skill o extensión ausente es un hallazgo registrado `local reviewer not installed` — nunca una omisión silenciosa, y nunca un arranque sorpresa: la instalación pertenece al consentimiento del onboarding o a una invocación explícita del addon; los hallazgos `critical` de un pase completado bloquean la finalización hasta que se corrijan o se acepten explícitamente
- **Superficie de CI opcional (Flujo B):** `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v2`) vía la sub-skill `setup` de la skill upstream, más `apply-review` como compañero invocable por el desarrollador — se ofrece explícitamente, nunca se instala sin pedirlo, nunca es el valor por defecto, nunca una tarea del plan
- **Nunca bloquea (solo invocación):** una revisión local que pudo iniciar pero termina con error se avisa una vez, se registra y se continúa; nunca falla la tarea por ello
- **Paridad (Flujo B):** el `prompt.md` compartido + extensión alinean metodología/severidad; la Revisión Consciente de Iteraciones de CI puede acortar la ronda 2+ mientras el pase local permanece completo
- **Salvaguarda neutral respecto al proveedor:** ningún flujo de Deep Work Plan exige un servicio comercial, un proveedor de CI o un secreto — el revisor es una skill MIT fijada por tag ejecutada por el propio agente de codificación del desarrollador
- **Conformidad:** `verify` reporta un revisor local ausente como fallo para los repositorios que declaran el estándar 2.3.0 o posterior, y como hallazgo de versión del harness para los repositorios heredados

## Habilidades

Las habilidades son procedimientos reutilizables que se invocan por nombre. Una habilidad empaqueta un flujo de trabajo repetible (ejecutar pruebas, corregir el linter, crear un componente).

La metodología incluye un pequeño conjunto de subhabilidades centrales. Entre ellas, la subhabilidad **author** permite que un repositorio **cree su propio kit**: invocada mediante `/skill-create` y `/agent-create`, razona sobre el esquema `.agents/` existente y sus convenciones, y luego crea una nueva habilidad, agente o comando delegador ligero que encaja con ellas, manteniendo el catálogo sincronizado. Esta misma subhabilidad respalda el pase de reconciliación de skills del Final Review.

Entrada del kit: [Skill create](/kit/skill-create), [Agent create](/kit/agent-create).

## Agentes

Los agentes son trabajadores especializados con un rol definido (revisor, ejecutor, arquitecto). Viven bajo `.agents/agents/` y se catalogan en `.agents/docs/`.

## Complementos de mantenimiento

El complemento **dependency-upgrade** (arriba) es el complemento de mantenimiento principal. Razona sobre el gestor de paquetes real del repositorio en lugar de asumir npm, clasifica actualizaciones por semver, actualiza en lotes seguros, ejecuta validación tras cada lote y revierte cualquier lote que falle.

## Complemento de sistema de diseño

Ver [Design system](/kit/design-system) en addons activos. El `DESIGN.md` a nivel de repo es distinto de un documento de diseño técnico por función: el README del plan de DWP, los criterios de aceptación de tareas y las puertas de validación ya cubren el diseño por función. El addon design-system aporta contexto de diseño de **interfaz** duradero y nativo del repo.

## Presets

Los presets adaptan DWP a un stack tecnológico concreto (Django, React, Go, Astro + Svelte y más). Explora el [catálogo del kit](/kit).

## Adaptadores

Los adaptadores mapean los comandos de DWP al sistema de comandos de un agente concreto (Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw y otros). Las entradas de adaptador viven en el kit bajo el nombre de cada agente.

## Ejemplos

Los ejemplos demuestran DWP en la práctica: comparaciones antes/después, planes de muestra, casos de estudio. Ver [Examples](/examples) y [Dogfood this site](/kit/dogfood-this-site).

## Recordatorio de conformidad

Un repositorio **DEBE** ser plenamente conforme con **cero** addons. Los addons son capacidades opcionales en capas — nunca precondiciones. Ver [Conformance](/spec/conformance).
