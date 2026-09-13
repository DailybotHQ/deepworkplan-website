---
title: "Programiści — agentowe API Deep Work Plan"
description: "Powierzchnia agentowa Deep Work Plan: wersjonowane, tylko-do-odczytu API bez uwierzytelniania, ze specyfikacją OpenAPI, serwerem MCP i Markdown w 17 językach."
---

## Z założenia bez uwierzytelniania

Nie ma tu kluczy API do wygenerowania, żadnego tańca z OAuth i żadnej piaskownicy oddzielonej od produkcji — to powierzchnia produkcyjna sama w sobie jest piaskownicą. To celowa własność metodyki: agenci nie potrafią wypełniać formularzy „kontaktu z działem sprzedaży”, więc witryna nigdy o to nie prosi.

- **Tylko do odczytu** — każda operacja to bezpieczne, cacheowalne GET, z wyjątkiem punktu końcowego MCP (POST). Nie istnieją żadne operacje zapisu.
- **Bez kluczy API** — bez rejestracji, tokenów i progów limitów zapytań. Anonimowy dostęp to udokumentowana umowa, zadeklarowana w [/auth.md](https://deepworkplan.com/auth.md).
- **Bezpłatnie i open source** — treści witryny i umiejętność DWP są na licencji MIT.
- **Najpierw maszyny** — ustrukturyzowane błędy JSON na `/api/*`, treści odzyskiwania 404 w Markdown, katalog API RFC 9727 i manifest możliwości ARD.

## Planuj i wykonuj za pomocą skilla

Powyższe API pozwala agentowi czytać tę witrynę. Skill DWP to to, co pozwala agentowi uruchamiać metodykę — zainstaluj go raz w repozytorium, a przyniesie router plus dziewięć sub-skilli, wywoływanych jako komendy ze slashem.

- **Lite** — zapisy zadań bezpośrednio w README planu, dla małej, ograniczonej pracy.
- **Full** — jeden plik na zadanie, dla pracy długoterminowej lub z realnymi zależnościami między zadaniami.
- **Guided (domyślnie)** — agent materializuje plan gotowy do recenzji i pyta przed rozpoczęciem pracy produktowej.
- **Trust (lub auto)** — pomija rundę recenzji i od razu wykonuje wcześniej zatwierdzony plan.

| Komenda | Opis |
|---------|------|
| `/dwp-create <goal>` | Zamienia cel w plan — Lite domyślnie, Full dla większej pracy. |
| `/dwp-execute` | Wykonuje istniejący plan zadanie po zadaniu: czyta go w całości, wykonuje każde zadanie po kolei, waliduje jego bramkę, aktualizuje postęp. |
| `/dwp-refine` | Dodaje, usuwa lub zmienia kolejność zadań w istniejącym planie, zachowując ukończoną pracę i jej zarejestrowane dowody. |
| `/dwp-resume` | Odtwarza stan z własnych plików planu i kontynuuje przerwany plan od pierwszego nieukończonego zadania. |
| `/dwp-status` | Raportuje postęp planu — ukończone, w toku, oczekujące — bez wprowadzania żadnych zmian. |
| `/dwp-verify` | Mechanicznie sprawdza, czy repozytorium jest AI-first i czy jego plany są dobrze skonstruowane. Niczego nie zmienia; raportuje pass albo fail. |
| `/deepworkplan-onboard` | Czyni repozytorium AI-first: analizuje jego stack, a następnie generuje dostosowany AGENTS.md, docs/, .agents/ i ignorowany przez git .dwp/. |
| `/skill-create`, `/agent-create` | Sub-skill autorski: rozwija własny kit repozytorium — skilla albo agenta. |
| `/dwp-upgrade` | Sprawdza, czy jest nowsze wydanie skilla, i dopiero po zgodzie instaluje je oraz ponownie uruchamia onboarding. |

Mała, ograniczona poprawka — Lite, trust:

```bash
# A small, bounded fix: skip the review round, run it directly.
/dwp-create fix the flaky checkout test trust
/dwp-execute
```

Praca długoterminowa — Full, guided:

```bash
# Long-horizon work with real stakes: review before anything runs.
/dwp-create migrate the billing service to the new payments API
# ...review the proposed plan, then:
/dwp-execute
# ...interrupted? pick up again, even in a fresh session:
/dwp-resume
```

Wynik każdego planu — manifest, log postępu, zapisy zadań, dowody bramek — żyje pod ignorowanym przez git katalogiem `.dwp/` w samym repozytorium. Nic nie jest wysyłane do deepworkplan.com ani przez niego przechowywane; skill nie wykonuje żadnych połączeń sieciowych.

## Punkty końcowe

| Metoda | Ścieżka | Cel |
|--------|------|---------|
| GET | `/openapi.json` | Specyfikacja OpenAPI 3.1 całego agentowego API. |
| GET | `/llms.txt` | Wyselekcjonowany indeks wskazówek dla LLM — zalecany punkt wejścia. |
| GET | `/init.md` | Kanoniczny prompt adopcji DWP. |
| GET | `/{page}.md` | Każda strona jako Markdown źródłowy, we wszystkich 17 językach. |
| GET | `/api/health.json` | Statyczny znacznik stanu. |
| GET | `/api/v1/index.json` | Wersjonowany katalog rodziny v1: ścieżki endpointów, wersja serwisu i odnośniki do specyfikacji. |
| GET | `/api/v1/sections.json` | Mapa serwisu jako typowane JSON — nazwa, ścieżka i opis dla każdej sekcji. |
| GET | `/api/v1/pages.json` | Każdy endpoint Markdown w każdym języku, pogrupowane według kodu języka. |
| GET | `/api/v1/health.json` | Wersjonowany wskaźnik stanu — lustrzany v1 odpowiednik `/api/health.json`. |
| POST | `/api/mcp` | Serwer MCP (Streamable HTTP, bezstanowy). |
| GET | `/.well-known/ai-catalog.json` | Manifest możliwości ARD (agentmap). |

Nieznane ścieżki `/api/*` zwracają ustrukturyzowany błąd JSON z podpowiedzią rozwiązania, nigdy stronę błędu HTML.

## Wersjonowanie i wycofywanie

Wersjonowana rodzina JSON żyje pod `/api/v1/` — index, sections, pages i health — a kanoniczne ścieżki bez wersji (`/llms.txt`, `/{page}.md`, `/api/mcp`) należą do tego samego kontraktu v1. Zmiany łamiące zgodność wchodzą wyłącznie w nowej rodzinie `/api/v{N+1}/`, nigdy wewnątrz v1. Gdy endpoint jest wycofywany, jego odpowiedzi niosą `Deprecation: true` i datę `Sunset` co najmniej 180 dni przed usunięciem, a nagłówek `Link` wskazuje następcę.

## Limity zapytań

Odpowiedzi na `/api/*` niosą nagłówki limitów RFC 9331 — `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` i `RateLimit-Policy` — dzięki czemu agenci mogą sami dostosowywać tempo w czasie rzeczywistym; odpowiedź `429` dodaje `Retry-After`. Egzekwowanie jest best-effort na krawędzi (120 zapytań na 60 sekund na odwiedzającego), a dostęp pozostaje anonimowy: bez kluczy, bez rejestracji, bez poziomów.

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
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

Umiejętność wdraża się (vendoring) do `.agents/skills/deepworkplan/` wewnątrz Twojego repozytorium, więc każdy agent dotykający repozytorium dzieli tę samą metodykę. Oficjalna CLI `deepworkplan` — klient bez zależności na tym samym API (`init`, `sections`, `read`, `open`, `mcp`) — jest przygotowana na npm i do publikacji żyje w katalogu [cli/](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) repozytorium serwisu.

## Zasoby czytelne maszynowo

- [Specyfikacja OpenAPI](https://deepworkplan.com/openapi.json)
- [Deklaracja dostępu i uwierzytelniania agentów](https://deepworkplan.com/auth.md)
- [Katalog API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Manifest MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Kontakt bezpieczeństwa](https://deepworkplan.com/.well-known/security.txt)
- [Deskryptor repozytorium witryny](https://deepworkplan.com/.well-known/dwp.json)
