---
title: "Deep Work Plan — ejecución estructurada para agentes de IA"
description: "Especificación primero, bucle cerrado: Deep Work Plan hace del repositorio el harness de los agentes de IA y cada plan acaba en un bucle iniciado por humanos."
lastUpdated: 2026-11-16
---

## Primero la especificación, con el bucle cerrado: el repositorio es el harness y el plan se ejecuta solo hasta terminar.

Deep Work Plan convierte cualquier repositorio en el harness — contexto, guardarraíles y un plan duradero con puertas de validación — donde cualquier agente de código ejecuta trabajo de largo alcance. Añade el bucle opcional y un plan abierto sigue ejecutándose hasta su fin sin que nadie tenga que vigilarlo.

Deep Work Plan (DWP) es una metodología y un kit abiertos, con licencia MIT, para planificar y ejecutar trabajo de software complejo con agentes de IA. No eliges un método de instalación ni copias una plantilla: copias el prompt de init.md y lo pegas en tu agente:

> Copia el prompt de init.md y pégalo en tu agente de código — Claude Code, Cursor, Codex, o cualquier otro — para hacer de cualquier repositorio uno AI-first.



**El bucle:** Registro (`lead claim`, lead y sucesión) → Daemon (`autopilot --loop`, lo inicia una persona) → Recordatorio (`idle ≥ 5 min`, no añade autoridad) → Relevo (`lead takeover`, primer sucesor disponible) → Aviso (`plan-event-v1`, al comando de la persona) → Terminado (`plan_completed`, gates superados). Cada plan abierto con registro de lead, hasta que su propio estado diga que terminó.

- [Abrir el prompt de /init](/es/quickstart)
- [Leer la metodología](/es/methodology)

---

## En qué se apoya la metodología.

1. **Primero la especificación** — el plan es la fuente de verdad duradera: tareas atómicas, criterios de aceptación y puertas de validación que el agente debe pasar.
2. **El repositorio es el harness** — el contexto, las herramientas, los guardarraíles y el estado viven en el repositorio como archivos planos que cualquier agente puede leer.

4. **Eficiencia medida** — bytes de instrucciones por flujo, medidos y publicados con su método — nunca porcentajes de tokens inventados.

---

## El problema y la respuesta

Un agente de programación rinde de maravilla en tareas cortas. Pero en una misión de largo alcance — una migración, un subsistema nuevo, una refactorización a escala — la deriva llega: el contexto se llena, las decisiones se olvidan y las tareas de varias horas se quedan a medio camino.



El contexto es el recurso más escaso de tu agente. Por eso, el harness mantiene su propia carga de instrucciones liviana y auditable. Las instrucciones se cargan progresivamente, la validación se concentra en los cambios y cada tarea recibe el contexto pertinente. Publicamos en bytes la carga de instrucciones de cada flujo para que ese esfuerzo sea visible. Los planes también se ajustan al trabajo: Lite para una corrección acotada y Full para tareas que se extienden durante horas. El formato sigue el alcance y mantiene el proceso enfocado y trazable.

---

## Los planes llegan a su fin. La autoridad sigue en manos de las personas.

Loop engineering es la forma en que un plan termina sin que una persona tenga que vigilarlo. Las filas siguientes describen contratos publicados del ciclo: la mayoría pertenecen a herdr-peers y la cola de planes es un contrato del paquete. Herdr es opcional; la metodología funciona sin él.



| Contrato | Qué garantiza | Fuente (herdr-peers v2.1.0) |
| --- | --- | --- |
| Registro del plan (`herdr-peers lead claim`) | Un plan que el bucle vigila tiene un registro de lead con una época y una sucesión. Solo quien tiene la época más alta actúa como su lead. | `skills/herdr-peers/protocol.md` §12 |
| Inicio solo humano (`herdr-peers autopilot start --loop`) | Solo una persona inicia el daemon, con sus propias palabras. Ninguna consulta, respuesta o aviso puede iniciarlo, detenerlo ni cambiar lo que hace. | `skills/herdr-peers/autopilot.md` §1 |
| Los recordatorios no añaden autoridad (`plan_stalled`) | El lead inactivo de un plan abierto recibe un único prompt fijo para continuar. Las puertas, las condiciones de parada y las escaladas siguen vigentes como antes; tres prompts sin avance marcan el plan como estancado. | `skills/herdr-peers/autopilot.md` §5.2–5.3 |
| Relevo a los sucesores (`herdr-peers lead takeover`) | Cuando el lead desaparece, se pide al primer sucesor disponible que tome el relevo, y el helper vuelve a comprobar la evidencia. Un carril asume el lead solo con una concesión que la persona registró de antemano. | `skills/herdr-peers/autopilot.md` §5.2, §7 |
| Eventos del plan (`plan-event-v1`) | Cuando un plan se estanca, se bloquea, pierde su lead, arranca desde la cola o termina, un comando elegido por la persona recibe un objeto plan-event-v1. El paquete incluye un notificador de Dailybot para ello. | `docs/schema/plan-event-v1.json` |
| Mapa de la flota (`plans-v1` · `fleet-v1`) | Cada máquina informa sus planes como plans-v1; el daemon mantiene el mapa fleet-v1 de cada máquina, agente, repositorio y plan, y fleet ui lo muestra en solo lectura. | `docs/schema/fleet-v1.json` |
| Cola de planes (`dwp-queue-v1`) | El paquete valida y escribe la cola; el daemon la lee para continuar los planes en espera. | `skills/deepworkplan/shared/queue.py` |
| Verificación del lead (`herdr-peers lead verify`) | Antes de cualquier merge, tag o release, el lead confirma que sigue teniendo el plan en todas las máquinas. Un lead más reciente lo rechaza; una máquina inalcanzable lo detiene, salvo que ese riesgo se acepte y quede registrado. | `skills/herdr-peers/protocol.md` §12 |

El cerebro de decisión (`--brain`) y el nombramiento de lead (`--appoint`) son opciones del mismo daemon que se activan de forma explícita, cada una por una persona. El daemon nunca hace merge, publica releases, inicia sesión ni cambia un permiso.

[Lee el complemento Herdr](/es/kit/herdr)

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

**SPEC · TASKS · CHECKS · STATE · TOOLS**

[Ve qué genera la incorporación](/es/quickstart)

---

## Bytes de instrucciones por flujo, medidos.

El harness publica lo que cada flujo debe leer antes de empezar: el router, el sub-skill y los recursos compartidos que enlaza. Son los conjuntos de lectura obligatoria del paquete publicado.

| Flujo | Paquete de entrada (bytes) |
| --- | ---: |
| `create` | 74.974|
| `execute` | 55.136|
| `resume` | 32.023|
| `refine` | 76.797|
| `onboard` | 82.051|
| `status` | 27.311|
| `verify` | 36.701|

Unidad: bytes del sistema de archivos. Medido sobre el paquete publicado con el comando siguiente: `bash tests/efficiency/measure-instruction-load.sh` (deepworkplan-skill v8.0.0).

No se muestran tokens del proveedor, costes ni estadísticas de cierre del bucle: ninguna fuente etiquetada los mide todavía, así que no tienen fila. La cifra de tokens del script, bytes ÷ 4, es una estimación rotulada, nunca una medición.

[Lee el registro de evaluación](https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/docs/EVALUATION.md)

---

## Qué obtienes

- AGENTS.md en la raíz del repositorio, razonado a partir de tu stack y comandos reales.
- `docs/` categorizado y documentación por módulo.
- Un directorio `.agents/` (skills, agentes, comandos) con el enlace simbólico `.claude` a `.agents`.
- El skill de Deep Work Plan, instalado una sola vez para cada agente — incluida la subhabilidad author, para que el repositorio pueda crear sus propias habilidades, agentes y comandos, además de complementos opcionales como dependency-upgrade y el complemento design-system para cualquier superficie de interfaz orientada al usuario.
- Planes de largo alcance y reanudables en una carpeta `.dwp/` ignorada por git. La metodología en sí no necesita ningún daemon ni estado externo; el daemon opcional del bucle añade continuidad, nunca una dependencia.
- Delegación multiagente y Ecosistema 1.0 — coordina agentes paralelos con seguridad mediante árboles de trabajo aislados, evidencia observada en puertas y complementos fijados opcionales.

---

## Qué ocurre cuando lo ejecutas

1. **Tu agente abre [/init.md](/init.md)** — lee el prompt de incorporación y la metodología, la especificación y el kit que enlaza.
2. **Instala el skill de Deep Work Plan** — el motor, idéntico en todos los repositorios: el router más sus sub-skills (create, execute, refine, resume, status, verify, onboard, author, upgrade), para Claude Code, Cursor, Codex, Gemini y Copilot.
3. **Adapta tu repositorio** — razonando sobre tu stack real (nunca copiando y pegando), escribe AGENTS.md, `docs/`, READMEs por módulo, un kit `.agents/` razonado y un `.dwp/` ignorado por git. Tu repositorio se convierte en el harness.
4. **Planificas y ejecutas** — Deep Work Plans de largo alcance, ejecutados paso a paso contra criterios de aceptación y puertas de validación explícitos, de forma autónoma durante horas.
5. **Una persona inicia el bucle** — opcional, con el complemento Herdr: tú — nunca un agente — ejecutas `herdr-peers autopilot start --loop`. Cada plan abierto con registro de lead sigue ejecutándose hasta su fin, y tu notificador se entera cuando uno se estanca, se bloquea o termina.

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
