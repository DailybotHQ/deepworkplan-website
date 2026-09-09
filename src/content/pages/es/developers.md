---
title: "Desarrolladores — la API para agentes de Deep Work Plan"
description: "La superficie de deepworkplan.com para desarrolladores y agentes de IA: una API de solo lectura y sin autenticación descrita con OpenAPI, un servidor MCP sin estado en /api/mcp, Markdown por página en 17 idiomas y la CLI de instalación npx skills."
---

## Sin autenticación por diseño

No hay claves de API que generar, ningún flujo de OAuth y ningún sandbox separado de producción — la propia superficie de producción es el sandbox. Es una propiedad deliberada de la metodología: los agentes no pueden rellenar formularios de "contactar con ventas", así que el sitio nunca pide uno.

- **Solo lectura** — cada operación es un GET seguro y almacenable en caché, excepto el endpoint MCP (POST). No hay operaciones de escritura en ninguna parte.
- **Sin claves de API** — sin registro, tokens ni niveles de límite de peticiones. El acceso anónimo es el contrato documentado, declarado en [/auth.md](https://deepworkplan.com/auth.md).
- **Gratis y de código abierto** — el contenido del sitio y la skill DWP tienen licencia MIT.
- **Pensado para las máquinas** — errores JSON estructurados en `/api/*`, cuerpos de recuperación 404 en Markdown, un catálogo de API RFC 9727 y un manifiesto de capacidades ARD.

## Endpoints

| Método | Ruta | Propósito |
|--------|------|-----------|
| GET | `/openapi.json` | Especificación OpenAPI 3.1 de toda la API para agentes. |
| GET | `/llms.txt` | Índice curado de guía para LLM — el punto de entrada recomendado. |
| GET | `/init.md` | El prompt canónico de adopción de DWP. |
| GET | `/{page}.md` | Cualquier página como Markdown fuente, en los 17 idiomas. |
| GET | `/api/health.json` | Marcador de estado estático. |
| POST | `/api/mcp` | Servidor MCP (Streamable HTTP, sin estado). |
| GET | `/.well-known/ai-catalog.json` | Manifiesto de capacidades ARD (agentmap). |

Las rutas `/api/*` desconocidas devuelven un error JSON estructurado con una pista de resolución, nunca una página de error HTML.

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
npx skills add DailybotHQ/deepworkplan-skill@latest
```

La skill se vendoriza en `.agents/skills/deepworkplan/` dentro de tu repositorio, de modo que cada agente que toca el repositorio comparte la misma metodología.

## Recursos legibles por máquina

- [Especificación OpenAPI](https://deepworkplan.com/openapi.json)
- [Declaración de acceso y autenticación de agentes](https://deepworkplan.com/auth.md)
- [Catálogo de API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Manifiesto MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Contacto de seguridad](https://deepworkplan.com/.well-known/security.txt)
- [Descriptor del repositorio del sitio](https://deepworkplan.com/.well-known/dwp.json)
