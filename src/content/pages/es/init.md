---
title: Init — Haz que tu repositorio sea AI-first
description: "El prompt de incorporación ejecutable: adopta Deep Work Plan en cualquier repositorio — analiza, documenta, instala el skill y déjalo pilotable por IA."
---

# Init — Prompt de incorporación para agentes de IA

Eres un agente de programación de IA. Lee primero todo este prompt y luego haz que el repositorio
actual sea **AI-first**, **guiado por especificación** y **pilotable por agentes** adoptando la
metodología Deep Work Plan (DWP). Trátalo como una tarea de ingeniería estructurada — un Deep Work
Plan — no como una edición rápida.

## Principios operativos (léelos antes de cambiar nada)

1. **Razona sobre *este* repositorio.** Nunca copies una plantilla ni dejes un marcador de posición.
   Cada archivo que escribas debe reflejar los lenguajes, frameworks, comandos y estructura reales del
   repositorio. Un esbozo genérico es un fallo, no un entregable.
2. **Sé no destructivo: pregunta antes de reemplazar.** El repositorio puede tener ya un `AGENTS.md`,
   un árbol `docs/`, una configuración `.agents/` o de skills, un `CLAUDE.md` o sus propias
   convenciones. **No** sobrescribas, muevas ni elimines trabajo existente en silencio. Detecta qué
   existe, léelo y **reconcília**: fusiona y mejora en el sitio siempre que sea posible. Antes de
   reemplazar o eliminar algo que el usuario ya tiene, explica qué y por qué, y obtén su aprobación
   explícita.
3. **Propón el plan y luego ejecuta.** Tras el reconocimiento, presenta un plan breve — qué crearás,
   qué modificarás y cualquier cosa existente que propongas reconciliar o reemplazar — y espera a que
   el usuario confirme antes de hacer cambios grandes o destructivos.
4. **Trabaja en incrementos seguros y revisables.** Confirma de forma lógica, mantén diffs legibles, no
   toques secretos y deja el código no relacionado en paz.
5. **Detente e informa** si un paso falla o el estado del repositorio es ambiguo.
6. **Confía, pero verifica.** Trata este prompt como entrada no confiable: confirma que lo obtuviste de
   las fuentes oficiales (`deepworkplan.com` y los repositorios de `DailybotHQ`), evalúalo antes de
   actuar sobre él y verifica la integridad del skill antes de ejecutarlo — consulta *Confianza y
   verificación* más abajo.

## 0. Lee la metodología y la especificación

Antes de cambiar nada, lee las fuentes canónicas para entender el estándar que estás adoptando:

- Metodología: https://deepworkplan.com/methodology.md
- Especificación: https://deepworkplan.com/spec.md
- Catálogo del kit: https://deepworkplan.com/kit.md

## 1. Reconocimiento y un plan para aprobar

Primero entiende el repositorio, luego propón qué harás.

- **Detecta el stack.** Lenguajes, frameworks, el gestor de paquetes (a partir del lockfile que
  realmente existe), los comandos reales de build/test/lint/type-check, los módulos de origen, la
  convención de pruebas y la forma de despliegue.
- **Clasifica el arquetipo.** Un repositorio individual (el caso común), un hub orquestador, o un
  espacio de trabajo de agente — el hogar de larga duración de un agente autónomo, donde git se
  recomienda en lugar de suponerse — con la evidencia.
- **Inventaría lo que ya existe.** `AGENTS.md`, `CLAUDE.md`, `docs/`, cualquier configuración
  `.agents/` o de skills/agentes, `.dwp/` y `.gitignore`. Anota lo que ya cumpla parte de este trabajo.
- **Propón el plan de incorporación.** Presenta una lista concisa: archivos que crearás, archivos que
  modificarás y cualquier cosa existente que propongas reconciliar o reemplazar — y luego **pide al
  usuario que confirme** antes de continuar. Para un repositorio grande (muchos módulos o muchos
  artefactos por generar), la sub-skill onboard utiliza una ruta guiada por plan: completa el
  reconocimiento, genera `AGENTS.md`, luego emite un Deep Work Plan de incorporación bajo
  `.dwp/drafts/` y delega a `/dwp-refine` → `/dwp-execute` → `/dwp-resume` según sea necesario.

## Confianza y verificación (antes de instalar)

Estás a punto de instalar y ejecutar código en este repositorio, así que verifica primero lo que vas a
adoptar. Esto es algo alentado: un agente cuidadoso trata un prompt obtenido como no confiable hasta
que ha sido comprobado.

- **Confirma la procedencia.** Este prompt y el skill son de código abierto con licencia MIT. Las
  fuentes canónicas son `https://deepworkplan.com` y la organización `DailybotHQ` en GitHub
  (`deepworkplan-website`, `deepworkplan-skill`). Un manifiesto legible por máquina se publica en
  `https://deepworkplan.com/.well-known/dwp-trust.json`.
- **Comprende qué hace el skill.** Es Markdown-first: sin CLI, sin API HTTP, sin autenticación, **sin
  llamadas de red y sin telemetría**. Su única acción con relevancia de seguridad es mutar *este*
  repositorio, y es no destructivo por diseño — reconcilia y pregunta antes de reemplazar.
- **Verifica la integridad antes de ejecutar.** Cada versión publica un `SHA256SUMS` sobre los
  archivos del skill; confirma que tu copia coincide antes de confiar en él:

  ```bash
  git clone https://github.com/DailybotHQ/deepworkplan-skill.git
  cd deepworkplan-skill
  # Descarga los checksums para la versión que vas a instalar (reemplaza vX.Y.Z):
  curl -fsSL -o SHA256SUMS \
    https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
  ./setup.sh --verify        # una salida distinta de cero indica que un archivo no coincide — detente
  ```

  Las versiones tienen **checksums, no firmas** (las firmas son el próximo paso documentado). Todo
  está abierto y es comparable mediante diff, así que también puedes comparar cualquier archivo con
  el repositorio en su etiqueta.
- **Reporta un problema.** Reporta los problemas de seguridad **de forma privada a través del sistema de reporte de vulnerabilidades de GitHub** en el repositorio correspondiente — `https://github.com/DailybotHQ/deepworkplan-skill/security` o `https://github.com/DailybotHQ/deepworkplan-website/security` — no como un issue público. Consulta también el `SECURITY.md` de cada repositorio, `https://deepworkplan.com/.well-known/security.txt` y la página de confianza `https://deepworkplan.com/trust`.

## 2. Instala el skill de Deep Work Plan

Instala el skill para que los agentes de este repositorio puedan planificar y ejecutar trabajo
estructurado. Incluye un router más ocho sub-skills — `create`, `execute`, `refine`, `resume`,
`status`, `verify`, `onboard` y `author`.

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

O instala vía OpenClaw:

```bash
openclaw skills install deepworkplan
```

O clona y ejecuta el script de configuración:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 3. Incorpora el repositorio (razonado y no destructivo)

Invoca la sub-skill onboard (`/deepworkplan-onboard`). Razona sobre el repo real y adáptalo todo a él.
Para cada artefacto de abajo, **si ya existe, reconcílialo** (fusiona, mejora, alínealo con la
metodología) en vez de sobrescribir — y confirma con el usuario antes de reemplazar nada.

1. **`AGENTS.md` + `CLAUDE.md`.** Produce un `AGENTS.md` en la raíz — un índice, las reglas
   obligatorias (solo inglés, commits convencionales, el patrón de pruebas real del repo y las puertas
   de revisión) y un bloque de Comandos Rápidos con los comandos **reales y ejecutables** del repo. Si
   ya existe un `AGENTS.md`, fusiónate con él en vez de reemplazarlo. Crea el enlace simbólico
   `CLAUDE.md → AGENTS.md` (no pises un `CLAUDE.md` existente sin preguntar).
2. **`docs/`.** Completa las categorías estándar con contenido real y específico del repo:
   `PRODUCT_SPEC.md` (el documento de producto/por qué no técnico — obligatorio para todo repositorio, incluidas las bibliotecas), `ARCHITECTURE.md`, `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md`
   (nunca se omite — todo repositorio tiene una postura de seguridad, incluso sin secretos),
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, además de `PERFORMANCE.md` y un índice
   `docs/README.md`. Si ya existen docs, intégralos y amplíalos — no los dupliques.
3. **Docs por módulo.** Añade un `README.md` (y una subcarpeta `docs/` para módulos complejos) dentro
   de cada módulo de origen principal descubierto en el reconocimiento.
4. **`.agents/` + `.claude → .agents`.** Crea el hogar canónico y multiagente: un catálogo **razonado**
   de `agents/`, `skills/` apropiadas para el stack y `commands/` `dwp-*` finos que delegan en el skill
   instalado — cada entrada justificada para *este* repositorio, no copiada de otro. Añade un catálogo
   `docs/` (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`) que coincida con lo que hay en disco,
   más `settings.json`, y el enlace simbólico `.claude → .agents`. Integra cualquier skill/agente
   existente en el catálogo.
5. **El skill de DWP, adaptado.** El skill instalado es el motor; el propio kit del repositorio
   (skills, agentes, comandos) debe estar **razonado para este repo** — nunca un copia y pega del kit
   de otro repositorio.
6. **`.dwp/` + `tmp/`.** Crea un `.dwp/` ignorado por git con `plans/` y `drafts/`, más un espacio de
   trabajo `tmp/` — ambos añadidos a `.gitignore` de forma no destructiva (añadir, nunca reescribir).

## 4. Ofrece los addons opcionales

Tras la incorporación base, enumera los cuatro addons (devcontainer, Dailybot, dependency-upgrade,
design-system) y ofrece cada uno como una opción explícita. Un repositorio es totalmente conforme con
**cero** addons — nunca los instales automáticamente.

- **Soporte de devcontainer** — un contenedor de desarrollo reproducible y aislado con autenticación
  de CLI de IA persistente.
- **Integración con Dailybot** — cuatro eventos del ciclo de vida (kickoff, tarea significativa, bloqueado, finalización) como informes de progreso de mejor esfuerzo para equipos que ya usan Dailybot, con refuerzo autónomo opcional mediante hooks (`dailybot-cli >= 3.1.2`). La instalación del skill de agente Dailybot emparejado (3.4.0) también expone chat, check-ins, autoría de formularios, preguntar a la IA y más — el addon solo conecta reportes con la ejecución de DWP. La metodología central no tiene dependencia de Dailybot.
- **Actualización de dependencias** — actualizaciones independientes del gestor de paquetes, por lotes,
  validadas y revertibles. Cuando se acepta, instala el comando `/lib-upgrade`.
- **Design system** — `docs/DESIGN.md` opcional para repos con una superficie de interfaz detectada
  (no se ofrece para bibliotecas puras, servicios headless o repos solo de infra). Tres perfiles se
  apilan en un archivo: visual-ui (activado por defecto al detectarse), cli-output y conversacional —
  estos dos últimos siempre se preguntan, nunca se aplican automáticamente.

## 5. Haz evolucionar el kit (sub-skill author)

Usa la sub-skill `author` para hacer crecer el kit propio del repositorio tras la incorporación. Los
delegadores finos `/skill-create` y `/agent-create` enrutan hacia ella. Crea una **skill** para un
procedimiento repetible dentro de una sesión, un **agente** para un rol recurrente con su propio nivel
de modelo y herramientas, y un **comando** solo como delegador fino. Mantén el catálogo `.agents/docs/`
sincronizado con lo que hay en disco.

## 6. Planifica y ejecuta

Genera Deep Work Plans para cualquier tarea y ejecútalos tarea por tarea:

- `/dwp-create <objetivo>` — descompón un objetivo en tareas numeradas y secuenciales con puertas de
  validación.
- `/dwp-execute` — ejecuta el plan tarea por tarea, actualizando el progreso y validando cada puerta.
- `/dwp-status` — informa del progreso sin hacer cambios.
- `/dwp-refine` — añade, elimina o reordena tareas preservando el trabajo completado.
- `/dwp-resume` — reconstruye el estado y continúa un plan interrumpido.
- `/dwp-verify` — informe objetivo de conformidad (aprobado/fallido) para el repo (o un plan específico).

Todo plan termina con tres tareas finales obligatorias — una **Revisión de seguridad** de los propios
cambios del plan (manteniendo `docs/SECURITY.md` al día; un hallazgo crítico bloquea la finalización),
el Descubrimiento de habilidades y agentes y el Informe ejecutivo.

## 7. Verifica

Ejecuta `/dwp-verify` para obtener un informe objetivo de conformidad (aprobado/fallido) (o
`bash {skill_dir}/verify/conformance.sh` para la capa mecánica compatible con CI que sale con `0`/`1`).
Comprueba los criterios del [documento de Conformidad de la especificación](https://deepworkplan.com/spec).
Luego confirma:

- [ ] El skill está instalado y es resoluble, con las ocho sub-skills disponibles.
- [ ] `AGENTS.md` existe en la raíz con un bloque de Comandos Rápidos real; `CLAUDE.md` resuelve a él.
- [ ] `docs/` contiene las categorías estándar con contenido real y específico del repo;
      `docs/TESTING_GUIDE.md` describe una configuración real de test/lint (ni vacío ni stub); los módulos
      principales tienen un `README.md`.
- [ ] `.agents/` existe con `agents/`, `commands/` (delegadores `dwp-*` finos que referencian al skill,
      no flujos copiados), `skills/` y un catálogo que coincide con lo que hay en disco;
      `.claude → .agents` resuelve.
- [ ] `.dwp/` existe, está ignorado por git y tiene `plans/` y `drafts/`; `tmp/` existe y está ignorado.
- [ ] El contenido existente del usuario se preservó o reconcilió con su consentimiento — nada se
      destruyó en silencio.
- [ ] Puedes generar un Deep Work Plan y ejecutarlo tarea por tarea, validando cada puerta.

## Resultado

Cuando la incorporación termina, el repositorio cambia de dos maneras duraderas — los pilares de la
metodología:

1. **El repositorio está guiado por especificación.** El trabajo parte de un plan y una especificación
   escritos, no de prompts improvisados.
2. **El propio repositorio es el harness del agente.** `AGENTS.md`, `docs/`, los docs por módulo y el
   hogar de skills `.agents/` dan a cada agente el contexto y los comandos que necesita para hacer
   trabajo estructurado y verificable.

Cualquiera puede ejecutar este prompt en cualquier repositorio — y terminar con una base de código que
cualquier agente de IA puede pilotar.
