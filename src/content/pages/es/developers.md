---
title: "Desarrolladores — la API para agentes de Deep Work Plan"
description: "La superficie para agentes de Deep Work Plan: API versionada de solo lectura sin autenticación, OpenAPI, servidor MCP y Markdown por página en 17 idiomas."
---

## Sin autenticación por diseño

No hay claves de API que generar, ningún flujo de OAuth y ningún sandbox separado de producción — la propia superficie de producción es el sandbox. Es una propiedad deliberada de la metodología: los agentes no pueden rellenar formularios de "contactar con ventas", así que el sitio nunca pide uno.

- **Solo lectura** — cada operación es un GET seguro y almacenable en caché, excepto el endpoint MCP (POST). No hay operaciones de escritura en ninguna parte.
- **Sin claves de API** — sin registro, tokens ni niveles de límite de peticiones. El acceso anónimo es el contrato documentado, declarado en [/auth.md](https://deepworkplan.com/auth.md).
- **Gratis y de código abierto** — el contenido del sitio y la skill DWP tienen licencia MIT.
- **Pensado para las máquinas** — errores JSON estructurados en `/api/*`, cuerpos de recuperación 404 en Markdown, un catálogo de API RFC 9727 y un manifiesto de capacidades ARD.

## Planifica y ejecuta con la skill

La API descrita arriba permite a un agente leer este sitio. La skill DWP es lo que permite a un agente ejecutar la metodología — instálala una vez en un repositorio y proporciona un enrutador más nueve sub-skills, invocadas como comandos de barra (o por su nombre, para agentes que interceptan `/` — la mayoría usa `#` en su lugar, por ejemplo `#dwp-execute`).

Cada plan elige un valor en cada uno de los dos ejes independientes:

- **Lite** — los registros de tareas viven en línea en el README del plan, tras anclas estables `#task-N`. Pensado para trabajo pequeño y acotado: un solo asunto, aproximadamente una sesión.
- **Full** — un archivo por tarea bajo `N.task_<slug>.md`, para trabajo de largo horizonte que se extiende por horas o días, o cuando las tareas tienen dependencias reales. Un plan Lite se promueve a Full más tarde con `/dwp-refine promote`.
- **Guided (por defecto)** — `dwp-create` analiza el objetivo, lo descompone y materializa un plan revisable, y luego pregunta: conservarlo, promover Lite a Full, editarlo o detenerse. Una persona permanece en el bucle antes de que empiece cualquier trabajo de producto.
- **Trust (o auto)** — añade `trust` (o `auto`) como última palabra, por ejemplo `/dwp-create <goal> trust`, y el agente se salta la ronda de revisión y devuelve directamente el comando de ejecución.

Las nueve sub-skills:

| Comando | Propósito |
|---------|-----------|
| `/dwp-create <goal>` | Convierte un objetivo en un plan — Lite por defecto, Full para trabajo más grande. |
| `/dwp-execute` | Ejecuta un plan existente tarea por tarea: lo lee por completo, ejecuta cada tarea en orden, valida su puerta, actualiza el progreso. |
| `/dwp-refine` | Añade, elimina o reordena tareas en un plan existente preservando el trabajo completado y su evidencia registrada. |
| `/dwp-resume` | Reconstruye el estado a partir de los propios archivos del plan y continúa un plan interrumpido desde su primera tarea incompleta. |
| `/dwp-status` | Informa del progreso de un plan — tareas completadas, en curso, pendientes — sin hacer ningún cambio. |
| `/dwp-verify` | Comprueba, mecánicamente, si el repositorio es AI-first y si sus planes están bien formados. No cambia nada; informa de aprobado o no aprobado. |
| `/deepworkplan-onboard` | Hace que un repositorio sea AI-first: razona sobre su stack y luego genera un `AGENTS.md` adaptado, `docs/`, `.agents/` y un `.dwp/` ignorado por git. |
| `/skill-create`, `/agent-create` | La sub-skill autora: hace crecer el kit propio del repositorio — una skill reutilizable para un procedimiento repetible, o un agente para un rol recurrente con su propio modelo y herramientas. |
| `/dwp-upgrade` | Comprueba si hay una versión más reciente de la skill publicada y, solo tras aprobación explícita, la instala y vuelve a ejecutar la incorporación. |

Una corrección pequeña y acotada — Lite, trust:

```bash
# A small, bounded fix: skip the review round, run it directly.
/dwp-create fix the flaky checkout test trust
/dwp-execute
```

Trabajo de largo horizonte — Full, guided:

```bash
# Long-horizon work with real stakes: review before anything runs.
/dwp-create migrate the billing service to the new payments API
# ...review the proposed plan, then:
/dwp-execute
# ...interrupted? pick up again, even in a fresh session:
/dwp-resume
```

La salida de cada plan — manifiesto, registro de progreso, registros de tareas, evidencia de puertas — vive en un directorio `.dwp/` ignorado por git en el propio repositorio. Nada se envía a ni se almacena por deepworkplan.com; la skill no realiza ninguna llamada de red.

## Endpoints

| Método | Ruta | Propósito |
|--------|------|-----------|
| GET | `/openapi.json` | Especificación OpenAPI 3.1 de toda la API para agentes. |
| GET | `/llms.txt` | Índice curado de guía para LLM — el punto de entrada recomendado. |
| GET | `/init.md` | El prompt canónico de adopción de DWP. |
| GET | `/{page}.md` | Cualquier página como Markdown fuente, en los 17 idiomas. |
| GET | `/api/health.json` | Marcador de estado estático. |
| GET | `/api/v1/index.json` | Catálogo versionado de la familia v1: rutas de endpoints, versión del sitio y enlaces a la especificación. |
| GET | `/api/v1/sections.json` | El mapa del sitio como JSON tipado — nombre, ruta y descripción por sección. |
| GET | `/api/v1/pages.json` | Cada endpoint de Markdown en cada idioma, agrupados por código de idioma. |
| GET | `/api/v1/health.json` | Marcador de estado versionado — el espejo v1 de `/api/health.json`. |
| POST | `/api/mcp` | Servidor MCP (Streamable HTTP, sin estado). |
| GET | `/.well-known/ai-catalog.json` | Manifiesto de capacidades ARD (agentmap). |

Las rutas `/api/*` desconocidas devuelven un error JSON estructurado con una pista de resolución, nunca una página de error HTML.

## Versionado y deprecación

La familia JSON versionada vive bajo `/api/v1/` — index, sections, pages y health — y las rutas canónicas sin versión (`/llms.txt`, `/{page}.md`, `/api/mcp`) pertenecen al mismo contrato v1. Los cambios rompedores se publican solo en una nueva familia `/api/v{N+1}/`, nunca dentro de v1. Cuando un endpoint se depreca, sus respuestas llevan `Deprecation: true` y una fecha `Sunset` al menos 180 días antes de su eliminación, y una cabecera `Link` apunta al sucesor.

## Límites de peticiones

Las respuestas en `/api/*` llevan cabeceras de límite RFC 9331 — `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` y `RateLimit-Policy` — para que los agentes puedan autoajustar su ritmo en tiempo real; una respuesta `429` añade `Retry-After`. La aplicación es best-effort en el edge (120 peticiones por 60 segundos por visitante) y el acceso sigue siendo anónimo: sin claves, sin registro, sin niveles.

## Servidor MCP

Un servidor de Model Context Protocol sin estado sobre Streamable HTTP en `https://deepworkplan.com/api/mcp`. Tres herramientas de solo lectura:

- `get_init_prompt` — el prompt canónico de adopción de /init.md.
- `list_site_sections` — el mapa del sitio con descripciones de una línea.
- `read_page` — cualquier página como Markdown fuente nativo, p. ej. `/init` o `/es/methodology/01-manifesto`.

```bash
curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize",
       "params":{"protocolVersion":"2025-06-18","capabilities":{},
                 "clientInfo":{"name":"curl","version":"1.0"}}}'

curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'

curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call",
       "params":{"name":"read_page","arguments":{"path":"/init"}}}'
```

Se admiten las versiones de protocolo 2025-03-26 y 2025-06-18; no se requiere ninguna sesión. Manifiesto: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json). Tarjeta del servidor: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json).

## Markdown para agentes

Cada página renderizada se publica como Markdown fuente nativo — no como una conversión de HTML:

```bash
# Content negotiation on any URL
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# Or fetch the .md mirror directly — every page, every language
curl -s https://deepworkplan.com/es/developers.md
```

## Instala el kit

La ruta de instalación oficial de la skill Deep Work Plan — el mismo comando que el endpoint /init da a los agentes. Funciona con cualquier agente de programación compatible con skills (Claude Code, Cursor, Codex, Gemini y otros):

```bash
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

La skill se vendoriza en `.agents/skills/deepworkplan/` dentro de tu repositorio, de modo que cada agente que toca el repositorio comparte la misma metodología. La CLI oficial `deepworkplan` — un cliente sin dependencias sobre esta misma API (`init`, `sections`, `read`, `open`, `mcp`) — está preparada para npm y vive en el directorio [cli/](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) del repositorio del sitio hasta su publicación.

## Recursos legibles por máquina

- [Especificación OpenAPI](https://deepworkplan.com/openapi.json)
- [Declaración de acceso y autenticación de agentes](https://deepworkplan.com/auth.md)
- [Catálogo de API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Manifiesto MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Contacto de seguridad](https://deepworkplan.com/.well-known/security.txt)
- [Descriptor del repositorio del sitio](https://deepworkplan.com/.well-known/dwp.json)
