---
title: Agenci chmurowi
description: "Adapter DWP dla agentów chmurowych i działających w tle: zdalne zadania Claude Code, chmura Codex, agenci klasy Jules — efemeryczne sesje wykonywane w."
kind: adapter
lang: pl
order: 12
agent: Cloud agents
support: full
prefix: plain text
---

# Adapter agentów chmurowych

Agenci chmurowi i działający w tle — zdalne zadania Claude Code, chmura OpenAI Codex, agenci klasy Jules i podobne środowiska wykonania asynchronicznego — są z założenia efemeryczni: sesja startuje, działa przez ograniczony czas i kończy się. DWP zamienia to ograniczenie w atut, czyniąc plan trwałym artefaktem, a nie sesję.

## Kluczowy wgląd

Katalog `.dwp/` repozytorium to **trwała warstwa specyfikacji i stanu**. Sesje chmurowe to **efemeryczni wykonawcy**. Plan mówi wykonawcy, co robić; `state.json` mówi mu, od czego wznowić. Sesja może być czymkolwiek — innym modelem, innym dostawcą, nowym kontenerem — a plan będzie kontynuowany dokładnie od miejsca, w którym skończyła poprzednia.

## Poziom wsparcia

**Pełne** (Udokumentowane) — platformy agentów w chmurze odczytują `AGENTS.md` lub natywne instrukcje i wykonują polecenia za pośrednictwem środowiska terminala lub kontenera.

## Pętla przebudzenie-wznowienie-yield

Każda tura agenta chmurowego przebiega według wzorca:

1. **Przebudzenie** — sesja startuje (wyzwolona przez harmonogram cron, zdarzenie CI lub akcję użytkownika).
2. **Uruchomienie Protokołu Wznowienia DWP** — odczytanie README planu, zlokalizowanie punktu kontrolnego, uzgodnienie `state.json` z Markdown, zbadanie szwu, uruchomienie testu dymnego. Zob. [Specyfikacja DWP](/spec/dwp-specification#the-dwp-resume-protocol).
3. **Sprawdzenie stanu zablokowania** — jeśli ustawione jest `state.json.blocked`, zgłoszenie przyczyny i yield bez wykonywania.
4. **Wykonanie następnego zadania atomowego** — jedno zadanie, przejście przez pełną bramkę walidacyjną.
5. **Zapisz w dzienniku** — dopisz zdarzenia do `journal.ndjson` za pomocą czasowników `ledger.py` (`start`, `gate`, `complete`); `ledger.py project` atomowo aktualizuje projekcję migawki `state.json`. W starszych planach v5 zachowana jest bezpośrednia aktualizacja pliku stanu.
6. **Yield** — sesja kończy się czysto; następna tura wznawia od zaktualizowanego stanu.

## Wymagania

- Plan MUSI zawierać warstwę stanu odczytywalną maszynowo (`manifest.json` + `state.json`). Bez niej efemeryczna sesja nie ma niezawodnego sposobu na określenie pozycji wznowienia. Zob. [Stan planu](/spec/plan-state).
- Plan MUSI zostać zatwierdzony przez człowieka przed jakąkolwiek nieobsługiwaną turą chmurową. Zatwierdzenie planu jest punktem kontrolnym.
- Agent działa pod ograniczonym zakresem uprawnień: NIE MOŻE rozszerzać zakresu, wykonywać destrukcyjnych lub zewnętrznych akcji, których plan nie autoryzuje jawnie, ani improwizować poza instrukcjami bieżącego zadania w celu pokrycia odkrytej, ale nieplanowanej pracy — odkryta praca jest rejestrowana do następnego `refine`, a nie improwizowana. Zob. [Protokół agenta](/spec/agent-protocol#execution-profiles).

## Uwagi

Sesje agentów chmurowych to ekstremalny przypadek profilu wykonania nieobsługiwanego: zerowa ciągłość sesji, maksymalna trwałość planu. Katalog `.dwp/` DWP został specjalnie zaprojektowany, aby to umożliwić — cały stan potrzebny agentowi do rozpoczęcia, kontynuowania i ukończenia pracy żyje w zwykłych plikach Markdown i JSON, które każda sesja może odczytać z nowego checkoutu.
