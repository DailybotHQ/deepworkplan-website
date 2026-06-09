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

## Poziom wsparcia

**Pełny** — Hermes czyta `AGENTS.md` i ładuje skill zgodnie z ładowaniem standardu AgentSkills. Wszystkie sub-skille DWP są dostępne.

## Instalacja

Zainstaluj pakiet skilla do katalogu `.agents/skills/` przestrzeni roboczej lub użyj menedżera skilli platformy, jeśli jest dostępny.

## Wywołanie

Plain text:

```
create a plan for <goal>
resume the open plan
```

## Synergia pamięci epizodycznej

Hermes indeksuje pamięć agenta, aby wcześniejsza praca była odtwarzalna w przyszłych sesjach. Rekordy wyników `state.json` DWP zostały zaprojektowane dokładnie do tego celu: każde ukończone zadanie zawiera informacje o tym, co `tried` (próbowano), co `failed` (zawiodło), co `worked` (zadziałało) oraz swobodne notatki w ustrukturyzowanym polu JSON. Gdy Hermes indeksuje pliki stanu `.dwp/plans/` przestrzeni roboczej, ukończone plany stają się odtwarzalną pamięcią epizodyczną — agent może później przypomnieć sobie, jak rozwiązano konkretny problem, a nie tylko że plan został wykonany.

Oznacza to, że plany DWP na Hermes są trwałe na dwa sposoby: pliki Markdown są ludzkoczytelnym zapisem, a rekordy wyników `state.json` są pamięcią indeksowaną maszynowo. Zob. [Stan planu](/spec/plan-state#outcome-records-as-episodic-memory).

## Kontynuacja sterowana cronem

Na platformach z harmonogramowaniem cronem kontynuacja przebiega według tego samego wzorca co na innych platformach autonomicznych: każda zaplanowana tura przebudza się, uruchamia Protokół Wznowienia DWP, wykonuje co najwyżej jedno zadanie, aktualizuje `state.json` i wykonuje yield. Plan, a nie sesja, jest jednostką ciągłości.

Warstwa stanu odczytywalnego maszynowo (`manifest.json` + `state.json`) jest WYMAGANA przy wykonaniu nieobsługiwanym. Pełny protokół warunków zatrzymania i eskalacji znajdziesz w [Protokole agenta](/spec/agent-protocol#execution-profiles).

## Uwagi

Hermes i OpenClaw to obie autonomiczne platformy agentów wymienione w tabeli obsługiwanych agentów w [Protokole agenta](/spec/agent-protocol). Obie działają pod profilem wykonania nieobsługiwanego i obie korzystają z równoważności `state.json`-jako-dziennik-git archetypu przestrzeni roboczej agenta.
