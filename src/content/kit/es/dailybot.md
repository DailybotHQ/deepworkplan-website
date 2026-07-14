---
title: Dailybot
description: "Addon DWP opcional: conecta el plan con un equipo Dailybot, hooks opcionales y la skill de agente 3.10.3 (chat, check-ins, formularios, ask AI y más)."
kind: addon
lang: es
order: 2
---

# Addon de Dailybot

Conecta la ejecución de Deep Work Plan con un **equipo de Dailybot** para que las personas vean lo que los agentes están construyendo — inicio, avance a mitad de plan, bloqueos y finalización — sin añadir reuniones ni una segunda cadena de herramientas. Un addon **opcional** para equipos que ya usan [Dailybot](https://www.dailybot.com).

La metodología central de Deep Work Plan tiene **cero** dependencia de Dailybot. Un repositorio sin addons es plenamente conforme. Ofrece este addon solo cuando el desarrollador o el equipo ya usan Dailybot; nunca lo instales automáticamente para todos.

## Cuándo usarlo

| Señal | Acción |
|--------|--------|
| El equipo ya usa Dailybot (Slack, Teams, Discord, Google Chat o el panel) | **Recomendar** durante la incorporación |
| El desarrollador pide visibilidad del avance del agente o actualizaciones tipo standup | **Ofrecer** el addon |
| Repositorio greenfield sin cuenta de Dailybot | **Omitir** — la línea base neutral respecto al proveedor es suficiente |
| Trabajo con cliente bajo NDA donde el avance no debe salir del repo | **Omitir**, o confirmar `.dailybot/disabled` como interruptor local |

## Qué conecta este addon (deliberadamente acotado)

El addon Dailybot de DWP **no** reinventa Dailybot. Conecta la ejecución del plan con la sub-skill **`report`** de dailybot y, opcionalmente, confirma hooks del harness. Todo lo demás — instalación, consentimiento, autenticación, estilo de redacción — se **delega** a la [skill de agente Dailybot](https://github.com/DailybotHQ/agent-skill) oficial (actualmente **3.10.3**).

### Cuatro eventos del ciclo de vida

Durante `create` / `execute` de DWP, el addon conecta **cuatro actualizaciones de agente de mejor esfuerzo**. Cada evento es condicional (Dailybot presente y autenticado), no bloqueante y respeta `.dailybot/disabled`.

| Evento | Disparador | Nivel | Requisito |
|-------|---------|-------|-------------|
| **Inicio (Kickoff)** | Plan materializado y aprobado, o primer turno de `execute` | regular | SHOULD |
| **Tarea significativa** | Una función, corrección de error o refactor importante se completa — no tareas de configuración | regular | MAY |
| **Bloqueado** | El plan se detiene; `state.json.blocked` poblado (`reason`, `needs`) | regular + blockers | SHOULD |
| **Finalización** | Todas las tareas hechas; el plan termina | **milestone** | SHOULD |

Las cargas útiles se derivan de la capa de estado del plan (`state.json`) cuando está presente: `completed` como resultados (no números de tarea), `in_progress` desde la tarea actual, `blockers` desde `state.json.blocked`. El mensaje describe **qué se construyó y por qué** — nunca rutas de archivo, estadísticas de git, nombres de rama ni IDs de plan.

### Refuerzo opcional mediante hooks

Con `dailybot-cli >= 3.7.0`, el addon **puede** confirmar hooks del harness a nivel de repo (`dailybot hook session-start | activity | post-commit | stop | dismiss`) respaldados por un registro local por repo. El harness recuerda al agente al final del turno cuando se omitió un evento del ciclo de vida — crítico para sesiones largas sin supervisión donde las instrucciones del prompt se diluyen.

Un reporte de ciclo de vida exitoso **reinicia** el registro de hooks, de modo que las dos capas nunca reportan en doble. Los comandos de hooks solo leen estado local y siempre terminan con `0`.

### Identidad del repo y política de reportes

Opcionalmente confirma `.dailybot/profile.json` (o `.dailybot_example/profile.json` como plantilla) para que cada colaborador y agente firme los reportes de la misma forma. **Nunca** pongas credenciales en ese archivo — un campo `key` es un error grave.

El mismo archivo puede llevar la política de reportes que los hooks respetan:

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` es especialmente útil para repos de investigación o documentación: el trabajo sin commits (análisis, documentos de diseño, planes) recibe recordatorios antes.

## Instalación (todo opcional)

El addon **ofrece** rutas de instalación; la skill de Dailybot es dueña del consentimiento y la verificación.

| Componente | Comando / ruta |
|-----------|----------------|
| **Skill de agente Dailybot** (recomendado) | `npx skills add DailybotHQ/agent-skill` |
| **Actualizar skill existente** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git clone** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI** (mínimo `>= 3.7.0`) | Instalada por la skill en el primer uso vía `shared/auth.md` verificado; o `pip install 'dailybot-cli>=3.7.0'`, Homebrew, o el instalador con checksum verificado en [cli.dailybot.com](https://cli.dailybot.com) |

Comprueba versiones: `dailybot --version` y `dailybot version --check`. Actualiza: `dailybot upgrade`.

## Autenticación — delegada

Este addon **nunca** pide correo, OTP ni claves API, y **nunca** almacena credenciales. La autenticación la gestiona [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md) de la skill de Dailybot:

- `dailybot login` (OTP por correo), o
- `DAILYBOT_API_KEY` / `dailybot config key=...`, o
- un archivo de claves por repo `.dailybot/env.json`, opcional e ignorado por git (`dailybot env add/use`, CLI `>= 3.7.0`), para que un desarrollador pueda estar autenticado en distintas organizaciones en distintos repos.

La resolución de autenticación es **Bearer primero**: un token de sesión tiene prioridad, con un reintento transparente de Bearer→clave API ante `401`/`403`, de modo que un token caducado nunca bloquea una clave válida. Si se rechaza la autenticación o no está disponible, el reporte se omite en silencio — el trabajo continúa.

## La skill emparejada de Dailybot — 14 capacidades (3.10.3)

Instalar la skill de agente Dailybot aporta mucho más de lo que conecta el addon de DWP. El paquete oficial de skills (skill **3.10.3**, CLI base **>= 3.7.0**, publicación actual **3.7.3**) expone **14 sub-skills coordinadas**:

| Sub-skill | Qué hace |
|-----------|--------------|
| **Reportes de avance** | Actualizaciones de agente tipo standup al panel de Dailybot |
| **Ask the AI** | Consultas puntuales sin interfaz al asistente de IA de Dailybot |
| **Sondeo de mensajes** | Comprobar instrucciones del equipo al iniciar sesión o en inactividad |
| **Correo** | Enviar correos con comprobaciones de seguridad obligatorias antes del envío |
| **Chat** | Enviar o editar en Slack, Microsoft Teams, Discord o Google Chat — canales, MD, equipos, hilos tipo reporte, enviar-como-usuario (Slack, admin) |
| **Conversaciones** | Abrir o reutilizar un MD grupal de Slack con el bot y compañeros nombrados; publicar un reporte en la misma llamada |
| **Salud y estado** | Anunciar agente en línea/fuera de línea para sesiones de larga duración |
| **Check-ins** | Completar standups; **autorar** check-ins (programación, participantes, preguntas, recordatorios, ajustes de IA) |
| **Kudos** | Reconocer compañeros o equipos enteros; explorar feed de reconocimiento, feed de la org, muro de la fama |
| **Equipos** | Listar equipos, inspeccionar miembros, resolver nombres a UUIDs; `me`, `org`, perfiles de usuario |
| **Formularios** | Listar (ahora **con alcance de org** por defecto, con `--mine` y `--owner` para acotar), enviar, actualizar, transicionar formularios; **autorar** formularios (estados de workflow, permisos, ChatOps); paginación, búsqueda y filtros por fecha |
| **Workflows** | Leer workflows de la org (`workflow list` / `workflow get`; solo lectura) |
| **Canales de reporte** | Descubrir UUIDs de canal para formularios o check-ins |
| **Claves API por repo** | Gestionar `.dailybot/env.json` — un archivo opcional e ignorado por git con claves API + URLs por entorno (`dailybot env add / use / show / list / remove / off / on`, CLI `>= 3.7.0`) |

**El addon de DWP solo conecta `report` a la ejecución del plan.** Invoca la skill de Dailybot directamente para todo lo demás — por ejemplo, publicar un resumen de despliegue en `#releases`, completar un standup o pedir a la IA de Dailybot que resuma tendencias de check-ins.

Referencia pública: [dailybot.com/skill.md](https://www.dailybot.com/skill.md). Código fuente: [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill). Modelo de confianza: [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md) en el paquete de skills.

## Comportamiento — delegar, nunca bloquear

| Regla | Detalle |
|------|--------|
| **Delegar** | La skill de Dailybot es dueña de instalación, consentimiento, auth, plantillas de hooks y estilo de redacción |
| **Nunca bloquear** | CLI ausente, fallo de auth, error de red → advertir una vez, continuar el trabajo principal |
| **Sin reintentos** | No entrar en bucles de diagnóstico; el reporte es de mejor esfuerzo |
| **Reconciliar** | Skill, CLI, perfil, hooks o cableado de reporte existente se preservan — solo rellenar huecos |
| **Neutral respecto al proveedor** | DWP no requiere Dailybot; este addon es visibilidad aditiva para el equipo |

## Flujo de incorporación

Durante la **Fase 7b** de `onboard` de DWP, tras el andamiaje AI-first central, el flujo ofrece cuatro addons opcionales. Si el desarrollador acepta Dailybot:

1. Detectar configuración existente (skill, CLI, `.dailybot/profile.json`, hooks, paso de reporte).
2. Ofrecer instalación de skill/CLI mediante los flujos de consentimiento de Dailybot.
3. Delegar la autenticación a `shared/auth.md`.
4. Conectar los cuatro eventos del ciclo de vida en `AGENTS.md` / `docs/AI_AGENT_COLLAB.md`.
5. Ofrecer opcionalmente refuerzo mediante hooks y `.dailybot/profile.json`.
6. Ejecutar validación (SPEC §8 en `addons/dailybot/SPEC.md` de la skill).

Contrato normativo en la skill de Deep Work Plan: `addons/dailybot/SPEC.md` (versión **2.3.0**).

## Entradas relacionadas del kit

- [Devcontainer](/kit/devcontainer) — entorno de desarrollo reproducible con persistencia de CLI de Dailybot (primer addon)
- [Dependency upgrade](/kit/dependency-upgrade) — actualizaciones de dependencias por lotes y validadas (tercer addon)
- [Design system](/kit/design-system) — `DESIGN.md` orientado a agentes para superficies de interfaz (cuarto addon)
- [Deep Work Plan onboard](/kit/deepworkplan-onboard) — la sub-skill de incorporación que ofrece addons
