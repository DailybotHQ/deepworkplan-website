---
title: "Sviluppatori — l’API per agenti di Deep Work Plan"
description: "La superficie di deepworkplan.com per sviluppatori e agenti AI: un’API in sola lettura e senza autenticazione descritta con OpenAPI, un server MCP senza stato in /api/mcp, Markdown per pagina in 17 lingue e la CLI di installazione npx skills."
---

## Senza autenticazione per scelta progettuale

Non ci sono chiavi API da generare, nessun flusso di OAuth e nessun sandbox separato dalla produzione — è la superficie di produzione stessa a fare da sandbox. È una proprietà deliberata della metodologia: gli agenti non possono compilare moduli «contatta le vendite», quindi il sito non ne chiede mai uno.

- **Sola lettura** — ogni operazione è un GET sicuro e memorizzabile in cache, tranne l’endpoint MCP (POST). Non esistono operazioni di scrittura da nessuna parte.
- **Nessuna chiave API** — nessuna registrazione, token o livelli di rate limit. L’accesso anonimo è il contratto documentato, dichiarato in [/auth.md](https://deepworkplan.com/auth.md).
- **Gratuito e open source** — i contenuti del sito e la skill DWP sono sotto licenza MIT.
- **Orientato alle macchine** — errori JSON strutturati su `/api/*`, corpi di recupero 404 in Markdown, un catalogo API RFC 9727 e un manifest di capacità ARD.

## Endpoint

| Metodo | Percorso | Scopo |
|--------|----------|-------|
| GET | `/openapi.json` | Specifica OpenAPI 3.1 dell’intera API per agenti. |
| GET | `/llms.txt` | Indice curato di indicazioni per LLM — il punto d’ingresso consigliato. |
| GET | `/init.md` | Il prompt canonico di adozione di DWP. |
| GET | `/{page}.md` | Qualsiasi pagina come Markdown sorgente, in tutte le 17 lingue. |
| GET | `/api/health.json` | Indicatore di salute statico. |
| POST | `/api/mcp` | Server MCP (Streamable HTTP, senza stato). |
| GET | `/.well-known/ai-catalog.json` | Manifest di capacità ARD (agentmap). |

I percorsi `/api/*` sconosciuti restituiscono un errore JSON strutturato con un suggerimento di risoluzione, mai una pagina di errore HTML.

## Server MCP

Un server Model Context Protocol senza stato su Streamable HTTP in `https://deepworkplan.com/api/mcp`. Tre strumenti in sola lettura:

- `get_init_prompt` — il prompt canonico di adozione di /init.md.
- `list_site_sections` — la mappa del sito con descrizioni di una riga.
- `read_page` — qualsiasi pagina come Markdown sorgente nativo, ad es. `/init` o `/es/methodology/01-manifesto`.

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

Sono supportate le versioni di protocollo 2025-03-26 e 2025-06-18; non è richiesta alcuna sessione. Manifest: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json). Scheda del server: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json).

## Markdown per gli agenti

Ogni pagina renderizzata è pubblicata come Markdown sorgente nativo — non una conversione da HTML:

```bash
# Content negotiation on any URL
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# Or fetch the .md mirror directly — every page, every language
curl -s https://deepworkplan.com/es/developers.md
```

## Installare il kit

Il percorso di installazione ufficiale della skill Deep Work Plan — lo stesso comando che l’endpoint /init dà agli agenti. Funziona con qualsiasi agente di coding compatibile con le skills (Claude Code, Cursor, Codex, Gemini e altri):

```bash
npx skills add DailybotHQ/deepworkplan-skill@latest
```

La skill viene vendorizzata in `.agents/skills/deepworkplan/` dentro il Suo repository, così ogni agente che tocca il repository condivide la stessa metodologia.

## Risorse leggibili dalle macchine

- [Specifica OpenAPI](https://deepworkplan.com/openapi.json)
- [Dichiarazione di accesso e autenticazione degli agenti](https://deepworkplan.com/auth.md)
- [Catalogo API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Manifest MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Contatto per la sicurezza](https://deepworkplan.com/.well-known/security.txt)
- [Descrittore del repository del sito](https://deepworkplan.com/.well-known/dwp.json)
