---
title: Hermes
description: "Adapter DWP dla Hermes: ładowanie skilla zgodne ze standardem AgentSkills, synergia pamięci epizodycznej przez rekordy wyników w state.json i kontynuacja planu sterowana cronem."
kind: adapter
lang: pl
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Adapter Hermes

Hermes to autonomiczna platforma agentów, która ładuje skille zgodnie ze standardem AgentSkills i utrzymuje pamięć epizodyczną między sesjami. DWP integruje się z obydwiema powierzchniami: pakiet skilla ładuje się z `.agents/skills/` tak samo jak każdy inny pakiet zgodny z AgentSkills, a rekordy wyników `state.json` zasilają bezpośrednio indeks pamięci Hermes.

W planach v6 i v7 stan jest rzutowany z dziennika tylko do dopisywania (`journal.ndjson`) za pomocą `ledger.py project`, a nie ręcznie przepisywany w plikach stanu.

## Poziom wsparcia

**Pełne** (Udokumentowane) — Hermes odczytuje `AGENTS.md` i ładuje umiejętność za pośrednictwem standardowego ładowania AgentSkills. Wszystkie podumiejętności DWP są dostępne.

## Instalacja

Zainstaluj pakiet skilla do katalogu `.agents/skills/` przestrzeni roboczej lub użyj menedżera skilli platformy, jeśli jest dostępny.

## Wywołanie

Plain text:

```
create a plan for <goal>
resume the open plan
```

## Synergia pamięci epizodycznej

W planach v6 i v7 deterministyczne pokwitowania weryfikacji DWP (`outcomes.py receipt`) i rekordy wyników zasilają bezpośrednio indeks pamięci Hermes: każde ukończone zadanie przenosi to, co wypróbowano, co się nie powiodło i co zadziałało, w ustrukturyzowanym schemacie JSON. Ukończone plany stają się możliwą do odzyskania pamięcią epizodyczną — agent może przypomnieć sobie, jak rozwiązano problem.

Ulomne sesje dopisują zdarzenia do `journal.ndjson` i rzutują `state.json` za pomocą `ledger.py project`, zamiast ręcznie przepisywać pliki stanu. Zobacz [Stan planu](/spec/plan-state#outcome-records-as-episodic-memory).

## Kontynuacja sterowana cronem

Na platformach z harmonogramowaniem cronem kontynuacja przebiega według tego samego wzorca co na innych platformach autonomicznych: każda zaplanowana tura przebudza się, uruchamia Protokół Wznowienia DWP, wykonuje co najwyżej jedno zadanie, aktualizuje `state.json` i wykonuje yield. Plan, a nie sesja, jest jednostką ciągłości.

Warstwa stanu odczytywalnego maszynowo (`manifest.json` + `state.json`) jest WYMAGANA przy wykonaniu nieobsługiwanym. Pełny protokół warunków zatrzymania i eskalacji znajdziesz w [Protokole agenta](/spec/agent-protocol#execution-profiles).

## Uwagi

Hermes i OpenClaw to obie autonomiczne platformy agentów wymienione w tabeli obsługiwanych agentów w [Protokole agenta](/spec/agent-protocol). Obie działają pod profilem wykonania nieobsługiwanego i obie korzystają z równoważności `state.json`-jako-dziennik-git archetypu przestrzeni roboczej agenta.
