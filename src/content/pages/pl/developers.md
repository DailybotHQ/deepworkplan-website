---
title: "Programiści — agentowe API Deep Work Plan"
description: "Agentowa powierzchnia deepworkplan.com dla programistów i agentów AI: API tylko do odczytu bez logowania, opisane przez OpenAPI, bezstanowy serwer MCP pod /api/mcp, Markdown dla każdej strony w 17 językach i instalacja przez npx skills."
---

## Z założenia bez uwierzytelniania

Nie ma tu kluczy API do wygenerowania, żadnego tańca z OAuth i żadnej piaskownicy oddzielonej od produkcji — to powierzchnia produkcyjna sama w sobie jest piaskownicą. To celowa własność metodyki: agenci nie potrafią wypełniać formularzy „kontaktu z działem sprzedaży”, więc witryna nigdy o to nie prosi.

- **Tylko do odczytu** — każda operacja to bezpieczne, cacheowalne GET, z wyjątkiem punktu końcowego MCP (POST). Nie istnieją żadne operacje zapisu.
- **Bez kluczy API** — bez rejestracji, tokenów i progów limitów zapytań. Anonimowy dostęp to udokumentowana umowa, zadeklarowana w [/auth.md](https://deepworkplan.com/auth.md).
- **Bezpłatnie i open source** — treści witryny i umiejętność DWP są na licencji MIT.
- **Najpierw maszyny** — ustrukturyzowane błędy JSON na `/api/*`, treści odzyskiwania 404 w Markdown, katalog API RFC 9727 i manifest możliwości ARD.

## Punkty końcowe

| Metoda | Ścieżka | Cel |
|--------|------|---------|
| GET | `/openapi.json` | Specyfikacja OpenAPI 3.1 całego agentowego API. |
| GET | `/llms.txt` | Wyselekcjonowany indeks wskazówek dla LLM — zalecany punkt wejścia. |
| GET | `/init.md` | Kanoniczny prompt adopcji DWP. |
| GET | `/{page}.md` | Każda strona jako Markdown źródłowy, we wszystkich 17 językach. |
| GET | `/api/health.json` | Statyczny znacznik stanu. |
| POST | `/api/mcp` | Serwer MCP (Streamable HTTP, bezstanowy). |
| GET | `/.well-known/ai-catalog.json` | Manifest możliwości ARD (agentmap). |

Nieznane ścieżki `/api/*` zwracają ustrukturyzowany błąd JSON z podpowiedzią rozwiązania, nigdy stronę błędu HTML.

## Serwer MCP

Bezstanowy serwer Model Context Protocol przez Streamable HTTP pod adresem `https://deepworkplan.com/api/mcp`. Trzy narzędzia tylko do odczytu:

- `get_init_prompt` — kanoniczny prompt adopcji /init.md.
- `list_site_sections` — mapa witryny z jednolinijkowymi opisami.
- `read_page` — każda strona jako natywny Markdown źródłowy, np. `/init` lub `/es/methodology/01-manifesto`.

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

Obsługiwane wersje protokołu to 2025-03-26 i 2025-06-18; sesja nie jest wymagana. Manifest: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json). Karta serwera: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json).

## Markdown dla agentów

Każda wyrenderowana strona jest publikowana jako natywny Markdown źródłowy — nie konwersja z HTML:

```bash
# Negocjacja treści na dowolnym adresie URL
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# Albo pobierz bezpośrednio lustro .md — każda strona, każdy język
curl -s https://deepworkplan.com/es/developers.md
```

## Zainstaluj zestaw

Oficjalna ścieżka instalacji umiejętności Deep Work Plan — ta sama komenda, którą punkt końcowy /init przekazuje agentom. Działa z każdym agentem do kodu zgodnym ze skills (Claude Code, Cursor, Codex, Gemini i inne):

```bash
npx skills add DailybotHQ/deepworkplan-skill@latest
```

Umiejętność wdraża się (vendoring) do `.agents/skills/deepworkplan/` wewnątrz Twojego repozytorium, więc każdy agent dotykający repozytorium dzieli tę samą metodykę.

## Zasoby czytelne maszynowo

- [Specyfikacja OpenAPI](https://deepworkplan.com/openapi.json)
- [Deklaracja dostępu i uwierzytelniania agentów](https://deepworkplan.com/auth.md)
- [Katalog API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Manifest MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Kontakt bezpieczeństwa](https://deepworkplan.com/.well-known/security.txt)
- [Deskryptor repozytorium witryny](https://deepworkplan.com/.well-known/dwp.json)
