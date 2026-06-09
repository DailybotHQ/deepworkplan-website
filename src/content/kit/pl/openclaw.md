---
title: OpenClaw
description: "Adapter DWP dla OpenClaw: natywne skanowanie .agents/skills, mapowanie wykonania nieobsługiwanego i kontynuacja planu sterowana cronem dla autonomicznych przestrzeni roboczych agenta."
kind: adapter
lang: pl
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# Adapter OpenClaw

OpenClaw to autonomiczna platforma agentów uruchamiająca długotrwałe przestrzenie robocze z zaplanowanymi turami. Natywnie skanuje `<workspace>/.agents/skills/` w poszukiwaniu zainstalowanych pakietów skilli, co oznacza, że skill DWP ładuje się bez żadnego adaptera pośredniego — wystarczy zainstalować go tam, a OpenClaw automatycznie go wykryje.

## Poziom wsparcia

**Pełny** — OpenClaw czyta `AGENTS.md` i ładuje skill zgodnie ze standardem AgentSkills. Wszystkie sub-skille DWP (`onboard`, `create`, `execute`, `refine`, `resume`, `status`, `verify`) są dostępne.

## Instalacja

```bash
openclaw skills install deepworkplan
```

Lub ręcznie: sklonuj `DailybotHQ/deepworkplan-skill` do `<workspace>/.agents/skills/deepworkplan/`.

## Wywołanie

Plain text — OpenClaw nie używa prefiksu komendy slash:

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## Mapowanie wykonania nieobsługiwanego

Prymitywy harmonogramowania OpenClaw mapują bezpośrednio na model kontynuacji DWP:

| Prymityw OpenClaw | Rola w DWP |
|-------------------|------------|
| Katalog główny przestrzeni roboczej | Archetyp [przestrzeni roboczej agenta](/spec/archetypes): `AGENTS.md`, `.agents/`, `.dwp/` w katalogu głównym przestrzeni |
| `<workspace>/.agents/skills/` (natywne skanowanie poziomu 2) | Miejsce, gdzie żyje ten pakiet — nie potrzeba adaptera pośredniego |
| Tura heartbeat lub cron | Jedna tura [zaplanowanej kontynuacji](/spec/agent-protocol#scheduled-continuation): przebudzenie → Protokół Wznowienia DWP → następne zadanie atomowe → aktualizacja stanu → yield |
| Sprawdzenia `HEARTBEAT.md` | Dodaj jedną linię: „Jeśli `.dwp/plans/` ma otwarty plan, wznów go na jedno zadanie." |
| Stałe rozkazy | Granica zatwierdzania planu i ograniczony zakres uprawnień profilu nieobsługiwanego |

Operacyjnie:

1. Człowiek tworzy i zatwierdza plan interaktywnie. Zatwierdzenie jest punktem kontrolnym — tury nieobsługiwane nigdy nie tworzą i nie wykonują planu w jednej turze.
2. Plan MUSI zawierać warstwę stanu odczytywalnego maszynowo (`manifest.json` + `state.json`). W przestrzeni roboczej bez gita `state.json` umożliwia bezpieczne wznowienie po awarii. Zob. [Stan planu](/spec/plan-state).
3. Każda tura heartbeat lub cron wykonuje co najwyżej jedno zadanie, przechodzi przez jego bramkę walidacyjną, atomowo aktualizuje `state.json` i wykonuje yield.
4. Przy dowolnym warunku zatrzymania agent zapisuje pole `blocked` w `state.json` i raportuje przez normalny kanał przestrzeni roboczej. Następne spojrzenie człowieka — lub raport z bicia serca — pokazuje dokładnie to, czego potrzeba.

Wynik: wielodniowy plan, który przeżywa restarty, zmiany modeli i granice sesji, wykonywany przez noc przez demona — z tymi samymi bramkami, które miałoby uruchomienie nadzorowane przez człowieka.

## Uwagi

Przestrzeń robocza OpenClaw to kanoniczny przykład archetypu [przestrzeni roboczej agenta](/spec/archetypes). Integracja `HEARTBEAT.md` pakietu skilla DWP i wymóg `state.json` zostały zaprojektowane z myślą o tej platformie.
