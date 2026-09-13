---
title: "Sviluppatori — l’API per agenti di Deep Work Plan"
description: "La superficie per agenti di Deep Work Plan: API versionata, di sola lettura e senza autenticazione, con OpenAPI, server MCP e Markdown per pagina in 17 lingue."
---

## Senza autenticazione per scelta progettuale

Non ci sono chiavi API da generare, nessun flusso di OAuth e nessun sandbox separato dalla produzione — è la superficie di produzione stessa a fare da sandbox. È una proprietà deliberata della metodologia: gli agenti non possono compilare moduli «contatta le vendite», quindi il sito non ne chiede mai uno.

- **Sola lettura** — ogni operazione è un GET sicuro e memorizzabile in cache, tranne l’endpoint MCP (POST). Non esistono operazioni di scrittura da nessuna parte.
- **Nessuna chiave API** — nessuna registrazione, token o livelli di rate limit. L’accesso anonimo è il contratto documentato, dichiarato in [/auth.md](https://deepworkplan.com/auth.md).
- **Gratuito e open source** — i contenuti del sito e la skill DWP sono sotto licenza MIT.
- **Orientato alle macchine** — errori JSON strutturati su `/api/*`, corpi di recupero 404 in Markdown, un catalogo API RFC 9727 e un manifest di capacità ARD.

## Pianificare ed eseguire con la skill

L’API descritta sopra permette a un agente di leggere questo sito. La skill DWP è ciò che permette a un agente di eseguire la metodologia — installatela una volta in un repository e fornisce un router più nove sub-skill, invocate come comandi slash (o per nome, per gli agenti che intercettano `/` — la maggior parte usa `#` al suo posto, ad esempio `#dwp-execute`).

Ogni piano sceglie un valore su ciascuno dei due assi indipendenti:

- **Lite** — i record dei task vivono in linea nel README del piano, dietro ancore stabili `#task-N`. Pensato per lavoro piccolo e delimitato: una sola questione, circa una sessione.
- **Full** — un file per task sotto `N.task_<slug>.md`, per lavoro a lungo termine che si estende su ore o giorni, o quando i task hanno vere dipendenze. Un piano Lite viene promosso a Full in seguito con `/dwp-refine promote`.
- **Guided (predefinito)** — `dwp-create` analizza l’obiettivo, lo scompone e materializza un piano revisionabile, poi chiede: mantenerlo, promuovere Lite a Full, modificarlo o fermarsi. Una persona resta nel loop prima che inizi qualsiasi lavoro sul prodotto.
- **Trust (o auto)** — aggiungete `trust` (o `auto`) come ultima parola, ad esempio `/dwp-create <goal> trust`, e l’agente salta il giro di revisione e restituisce direttamente il comando di esecuzione.

Le nove sub-skill:

| Comando | Scopo |
|---------|-------|
| `/dwp-create <goal>` | Trasforma un obiettivo in un piano — Lite per impostazione predefinita, Full per lavoro più grande. |
| `/dwp-execute` | Esegue un piano esistente task per task: lo legge integralmente, esegue ogni task in ordine, valida il suo gate, aggiorna l’avanzamento. |
| `/dwp-refine` | Aggiunge, rimuove o riordina i task in un piano esistente preservando il lavoro completato e le sue evidenze registrate. |
| `/dwp-resume` | Ricostruisce lo stato dai file stessi del piano e continua un piano interrotto dal suo primo task incompleto. |
| `/dwp-status` | Riporta l’avanzamento di un piano — task completati, in corso, in sospeso — senza apportare alcuna modifica. |
| `/dwp-verify` | Verifica, meccanicamente, se il repository è AI-first e se i suoi piani sono ben formati. Non cambia nulla; riporta superato o non superato. |
| `/deepworkplan-onboard` | Rende un repository AI-first: ragiona sul suo stack, poi genera un `AGENTS.md` adattato, `docs/`, `.agents/` e un `.dwp/` escluso da git. |
| `/skill-create`, `/agent-create` | La sub-skill autrice: fa crescere il kit proprio del repository — una skill riutilizzabile per una procedura ripetibile, o un agente per un ruolo ricorrente con il proprio modello e i propri strumenti. |
| `/dwp-upgrade` | Verifica se esiste una release più recente della skill pubblicata e, solo dopo approvazione esplicita, la installa e riesegue l’onboarding. |

Una correzione piccola e delimitata — Lite, trust:

```bash
# A small, bounded fix: skip the review round, run it directly.
/dwp-create fix the flaky checkout test trust
/dwp-execute
```

Lavoro a lungo termine — Full, guided:

```bash
# Long-horizon work with real stakes: review before anything runs.
/dwp-create migrate the billing service to the new payments API
# ...review the proposed plan, then:
/dwp-execute
# ...interrupted? pick up again, even in a fresh session:
/dwp-resume
```

L’output di ogni piano — manifest, log di avanzamento, record dei task, evidenze dei gate — vive in una directory `.dwp/` esclusa da git, nel repository stesso. Nulla viene inviato a o memorizzato da deepworkplan.com; la skill non effettua alcuna chiamata di rete.

## Endpoint

| Metodo | Percorso | Scopo |
|--------|----------|-------|
| GET | `/openapi.json` | Specifica OpenAPI 3.1 dell’intera API per agenti. |
| GET | `/llms.txt` | Indice curato di indicazioni per LLM — il punto d’ingresso consigliato. |
| GET | `/init.md` | Il prompt canonico di adozione di DWP. |
| GET | `/{page}.md` | Qualsiasi pagina come Markdown sorgente, in tutte le 17 lingue. |
| GET | `/api/health.json` | Indicatore di salute statico. |
| GET | `/api/v1/index.json` | Catalogo versionato della famiglia v1: percorsi degli endpoint, versione del sito e collegamenti alla specifica. |
| GET | `/api/v1/sections.json` | La mappa del sito come JSON tipizzato — nome, percorso e descrizione per sezione. |
| GET | `/api/v1/pages.json` | Tutti gli endpoint Markdown in ogni lingua, raggruppati per codice lingua. |
| GET | `/api/v1/health.json` | Indicatore di stato versionato — il mirror v1 di `/api/health.json`. |
| POST | `/api/mcp` | Server MCP (Streamable HTTP, senza stato). |
| GET | `/.well-known/ai-catalog.json` | Manifest di capacità ARD (agentmap). |

I percorsi `/api/*` sconosciuti restituiscono un errore JSON strutturato con un suggerimento di risoluzione, mai una pagina di errore HTML.

## Versionamento e deprecazione

La famiglia JSON versionata vive sotto `/api/v1/` — index, sections, pages e health — e i percorsi canonici senza versione (`/llms.txt`, `/{page}.md`, `/api/mcp`) appartengono allo stesso contratto v1. Le modifiche che rompono la compatibilità arrivano solo in una nuova famiglia `/api/v{N+1}/`, mai dentro v1. Quando un endpoint viene deprecato, le sue risposte contengono `Deprecation: true` e una data `Sunset` almeno 180 giorni prima della rimozione, e un header `Link` punta al successore.

## Limiti di richieste

Le risposte su `/api/*` contengono header di limite RFC 9331 — `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` e `RateLimit-Policy` — così gli agenti possono autoregolarsi in tempo reale; una risposta `429` aggiunge `Retry-After`. L’applicazione è best-effort al bordo (120 richieste ogni 60 secondi per visitatore) e l’accesso resta anonimo: senza chiavi, senza registrazione, senza livelli.

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
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

La skill viene vendorizzata in `.agents/skills/deepworkplan/` dentro il Suo repository, così ogni agente che tocca il repository condivide la stessa metodologia. La CLI ufficiale `deepworkplan` — un client senza dipendenze sulla stessa API (`init`, `sections`, `read`, `open`, `mcp`) — è pronta per npm e vive nella directory [cli/](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) del repository del sito fino alla pubblicazione.

## Risorse leggibili dalle macchine

- [Specifica OpenAPI](https://deepworkplan.com/openapi.json)
- [Dichiarazione di accesso e autenticazione degli agenti](https://deepworkplan.com/auth.md)
- [Catalogo API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Manifest MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Contatto per la sicurezza](https://deepworkplan.com/.well-known/security.txt)
- [Descrittore del repository del sito](https://deepworkplan.com/.well-known/dwp.json)
