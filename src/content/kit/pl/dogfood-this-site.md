---
title: "Studium przypadku: ta witryna"
description: "Jak deepworkplan.com sam działa na Deep Work Plan — rzeczywista relacja z produkcyjnego repozytorium Astro uczynionego AI-first metodyką, którą dokumentuje."
kind: example
lang: pl
order: 2
---

# Studium przypadku: ta witryna

Witryna, którą czytasz, działa na metodyce, którą dokumentuje. Stosuje Deep Work Plan na sobie samej: ten sam skill, ten sam przepływ `/init`, te same plany `.dwp/`, których użyłoby każde inne repozytorium. To rzeczywista relacja, a nie hipoteza.

## Przed

Jak większość repozytoriów, to również nie powstało z myślą o agentach. Kontekst tkwił w głowach ludzi i rozproszonych notatkach, nie istniało jedno źródło prawdy, które agent mógłby odczytać, a wdrożenie nowego agenta oznaczało ponowne tłumaczenie projektu w każdej sesji. Praca długodystansowa traciła kierunek.

## Wdrożenie DWP

Repozytorium uczyniono AI-first za pomocą jednego Deep Work Plan, rozłożonego na atomowe zadania z bramkami walidacji:

1. Instalacja skilla Deep Work Plan jako instalacji referencyjnej, przypiętej przez `skills-lock.json`.
2. Uruchomienie onboardingu, aby na podstawie rzeczywistego stacku repozytorium wygenerować przemyślany `AGENTS.md`, drzewo `docs/` oraz dokumentację poszczególnych modułów.
3. Zbudowanie międzyagentowego zestawu `.agents/` — cienkich delegatorów komend `dwp-*` oraz katalogu odpowiadającego temu, co znajduje się na dysku.
4. Utworzenie szkieletu pomijanej przez git przestrzeni roboczej `.dwp/` na plany i szkice.
5. Weryfikacja zgodności za pomocą `/dwp-verify`.

Każde zadanie było walidowane względem rzeczywistych bramek repozytorium — `biome`, `astro:check`, zestawu testów, builda produkcyjnego oraz sprawdzenia parytetu endpointów agenta — zanim zostało oznaczone jako ukończone.

## Po

Repozytorium jest teraz AI-first zgodnie z własną specyfikacją: przemyślany `AGENTS.md`, skategoryzowane drzewo `docs/`, międzyagentowy zestaw `.agents/` oraz pomijana przez git przestrzeń robocza `.dwp/`. Każdy agent — Claude Code, Cursor, Codex, Gemini, Copilot — może je otworzyć, odczytać harness i wykonywać plany długodystansowe bez prowadzenia za rękę w każdej sesji.

## Rezultat

Metodyka dowodzi swojej skuteczności na własnym źródle: ta witryna jest budowana i utrzymywana dokładnie tak, jak każe budować twoje — według [`/init.md`](/init.md). Jeśli standard działa tutaj, na produkcji, zadziała też w twoim repozytorium.
