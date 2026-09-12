---
title: "Entwickler — die Deep-Work-Plan-Agent-API"
description: "Die Agentenoberfläche von Deep Work Plan: versionierte, read-only API ohne Authentifizierung — mit OpenAPI-Spec, MCP-Server und Markdown pro Seite in 17 Sprachen."
---

## Bewusst ohne Authentifizierung

Es gibt keine API-Schlüssel zu erzeugen, keinen OAuth-Aufwand und keine von der Produktion getrennte Sandbox — die Produktionsoberfläche selbst ist die Sandbox. Das ist eine bewusste Eigenschaft der Methodik: Agenten können keine „Kontakt zum Vertrieb“-Formulare ausfüllen, also verlangt die Website nie eines.

- **Nur lesend** — jede Operation ist ein sicheres, cachebares GET, mit Ausnahme des MCP-Endpunkts (POST). Es gibt nirgends Schreiboperationen.
- **Keine API-Schlüssel** — keine Registrierung, keine Token, keine Rate-Limit-Stufen. Anonymer Zugriff ist der dokumentierte Vertrag, erklärt in [/auth.md](https://deepworkplan.com/auth.md).
- **Kostenlos und Open Source** — die Website-Inhalte und das DWP-Skill sind MIT-lizenziert.
- **Maschinen zuerst** — strukturierte JSON-Fehler auf `/api/*`, Markdown-Wiederherstellungstexte bei 404, ein RFC-9727-API-Katalog und ein ARD-Fähigkeitsmanifest.

## Endpunkte

| Methode | Pfad | Zweck |
|--------|------|---------|
| GET | `/openapi.json` | OpenAPI-3.1-Spezifikation der gesamten Agent-API. |
| GET | `/llms.txt` | Kuratierter LLM-Leitfaden-Index — der empfohlene Einstiegspunkt. |
| GET | `/init.md` | Der kanonische DWP-Adoptions-Prompt. |
| GET | `/{page}.md` | Jede Seite als Quell-Markdown, in allen 17 Sprachen. |
| GET | `/api/health.json` | Statischer Health-Marker. |
| GET | `/api/v1/index.json` | Versionierter Katalog der v1-Familie: Endpunkt-Pfade, Website-Version und Links zur Spec. |
| GET | `/api/v1/sections.json` | Die Sitemap als typisiertes JSON — Name, Pfad und Beschreibung je Abschnitt. |
| GET | `/api/v1/pages.json` | Alle Markdown-Endpunkte in jeder Sprache, gruppiert nach Sprachcode. |
| GET | `/api/v1/health.json` | Versionierter Health-Marker — das v1-Pendant zu `/api/health.json`. |
| POST | `/api/mcp` | MCP-Server (Streamable HTTP, zustandslos). |
| GET | `/.well-known/ai-catalog.json` | ARD-Fähigkeitsmanifest (Agentmap). |

Unbekannte `/api/*`-Pfade geben einen strukturierten JSON-Fehler mit einem Lösungshinweis zurück, nie eine HTML-Fehlerseite.

## Versionierung und Deprecation

Die versionierte JSON-Familie liegt unter `/api/v1/` — index, sections, pages und health — und die unversionierten kanonischen Pfade (`/llms.txt`, `/{page}.md`, `/api/mcp`) gehören zum selben v1-Vertrag. Breaking Changes erscheinen ausschließlich in einer neuen Familie `/api/v{N+1}/`, nie innerhalb von v1. Wird ein Endpunkt deprecated, tragen seine Antworten `Deprecation: true` und ein `Sunset`-Datum mindestens 180 Tage vor der Abschaltung, und ein `Link`-Header verweist auf den Nachfolger.

## Rate-Limits

Antworten auf `/api/*` tragen RFC-9331-Rate-Limit-Header — `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` und `RateLimit-Policy` —, damit Agents sich in Echtzeit selbst drosseln können; eine `429`-Antwort ergänzt `Retry-After`. Die Durchsetzung ist Best-Effort an der Edge (120 Anfragen pro 60 Sekunden pro Besucher), und der Zugriff bleibt anonym: keine Schlüssel, keine Registrierung, keine Stufen.

## MCP-Server

Ein zustandsloser Model-Context-Protocol-Server über Streamable HTTP unter `https://deepworkplan.com/api/mcp`. Drei nur lesende Tools:

- `get_init_prompt` — der kanonische /init.md-Adoptions-Prompt.
- `list_site_sections` — die Siteübersicht mit einzeiligen Beschreibungen.
- `read_page` — jede Seite als natives Quell-Markdown, z. B. `/init` oder `/es/methodology/01-manifesto`.

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

Die Protokollversionen 2025-03-26 und 2025-06-18 werden unterstützt; eine Sitzung ist nicht erforderlich. Manifest: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json). Serverkarte: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json).

## Markdown für Agenten

Jede gerenderte Seite wird als natives Quell-Markdown veröffentlicht — nicht als HTML-Konvertierung:

```bash
# Content-Negotiation auf jeder URL
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# Oder den .md-Spiegel direkt abrufen — jede Seite, jede Sprache
curl -s https://deepworkplan.com/es/developers.md
```

## Das Kit installieren

Der offizielle Installationspfad für das Deep Work Plan Skill — derselbe Befehl, den der /init-Endpunkt Agenten übergibt. Er funktioniert mit jedem Skills-kompatiblen Coding-Agenten (Claude Code, Cursor, Codex, Gemini und andere):

```bash
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

Das Skill wird unter `.agents/skills/deepworkplan/` in Ihr Repository eingebettet, sodass jeder Agent, der das Repository bearbeitet, dieselbe Methodik teilt. Die offizielle `deepworkplan`-CLI — ein Client ohne Abhängigkeiten über dieselbe API (`init`, `sections`, `read`, `open`, `mcp`) — ist für npm vorbereitet und liegt bis zur Veröffentlichung im Verzeichnis [cli/](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) des Website-Repositorys.

## Maschinenlesbare Ressourcen

- [OpenAPI-Spezifikation](https://deepworkplan.com/openapi.json)
- [Erklärung zu Agentenzugriff & Authentifizierung](https://deepworkplan.com/auth.md)
- [API-Katalog, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [MCP-Manifest](https://deepworkplan.com/.well-known/mcp.json)
- [Sicherheitskontakt](https://deepworkplan.com/.well-known/security.txt)
- [Website-Repo-Deskriptor](https://deepworkplan.com/.well-known/dwp.json)
