---
title: "DWP v8: spec-first i zamknięta pętla"
description: "Deep Work Plan v8 łączy plany spec-first, repozytorium jako harness, Loop engineering i mierzoną wydajność; pętla kończy zatwierdzone plany."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: pl
order: 0
featured: true
sourceLabel: "Wydanie skilla v8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Wydanie skilla v8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Wydanie skilla v8.0.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "Wydanie skilla v8.0.3"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.3"
  - label: "LOOP_ENGINEERING.md (normatywny, v8)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "Loop engineering w czytniku specyfikacji"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "Schemat plan-contract/v8"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "Schemat journal-event/v8"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "Schemat plan-snapshot/v8"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "Zapis kolejki planów (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Wydanie skilla v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Wydanie skilla v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Wydanie skilla v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.0"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 łączy cztery idee: rozwój spec-first, repozytorium jako harness agenta, Loop engineering i mierzoną wydajność. Zdanie robocze brzmi: „Spec-first, loop-closed: repozytorium jest harness, a plan sam działa aż do zakończenia”.

## Cztery filary

1. **Spec-first.** Plan i jego specyfikacja są trwałym źródłem prawdy z jawnymi kryteriami akceptacji i bramkami walidacji.
2. **Repozytorium jest harness.** Kontekst, narzędzia, reguły kontroli i stan wznowienia znajdują się przy kodzie, aby różni agenci pracowali na tym samym repozytorium.
3. **Loop engineering.** Zatwierdzony plan może przejść zapisany cykl życia aż do ukończenia.
4. **Mierzona wydajność.** Wydajność podaje się w bajtach instrukcji na przepływ wraz z opublikowaną ścieżką pomiaru; nie wylicza się procentów tokenów.

## Znaczenie Loop engineering

Plan rejestruje lidera i uporządkowanych następców. Człowiek uruchamia opcjonalny daemon Herdr poleceniem `herdr-peers autopilot --loop`; ponaglenia proszą lidera o kontynuację bez nadawania nowych uprawnień. Gdy lider jest nieobecny, pętla może poprosić wymienionego następcę o przejęcie roli. Zdarzenia planu mogą trafiać do powiadamiacza Dailybot pakietu, a widok fleet pokazuje agentów i plany na włączonych maszynach. Za uruchomienie daemona odpowiada człowiek, a addon Herdr jest opcjonalny.

## Wydania zawierające mechanizmy

Utwardzenie pakietu v7.11.0 oraz rejestracja planów i powiadomienia z wydań v7.12.x zapewniają mechanizmy po stronie planu. herdr-peers v1.3.x dodaje pętlę, raporty i widok fleet; v2.0.0 dodaje brain protokołu 2 i konsumenta kolejki. coding-agents-kit v1.3.0 dostarcza kontrakt uruchamiania pick-v2, a v1.4.0 zweryfikowany aktualizator. herdr-peers v2.1.0 odczytuje ustrukturyzowane blokery v8, a coding-agents-kit v1.5.0 mierzy wyłącznie zgłoszone tokeny. Deskryptory addonów pakietu 8.0.0 przypinają herdr-peers v2.1.0, coding-agents-kit v1.5.0 i devcontainer-kit v1.3.0. Wydania z tagami są podlinkowane powyżej. Pakiet działa bez tych opcjonalnych addonów.

## Kontrakt v8

Wydanie 8.0.0 wdraża standard DWP 8.0.0. Nowe plany powstają na `plan-contract/v8`; plany v7, v6 i v5 zachowują zapisaną generację i są migrowane wyłącznie przez jawne `refine migrate`. Plany v8 zachowują linię `plan-manifest/v7`, a `journal-event/v7` nadal jest obsługiwany dla istniejących planów. Źródłem normatywnym jest `LOOP_ENGINEERING.md` oraz trzy opublikowane schematy.

- **Blok `autonomy`.** Opcjonalny, zamknięty blok w `plan-contract/v8`, który zapisuje uprawnienia pętli planu: `stall_budget` (1–10, domyślnie 3), panele `promptable` (domyślnie tylko lider), cele `notify` (domyślnie brak), `brain` (domyślnie `false`) oraz `queue` (`prompt-lead`, `launch` lub `none`, domyślnie `none`). Bez bloku obowiązują wszystkie wartości domyślne, a rozwiązywanie pozostaje po stronie człowieka.
- **Ustrukturyzowane blokery.** Bloker to zdarzenie `blocker` z `journal-event/v8`, tworzone i rozwiązywane wyłącznie przez helper ledger. Zawiera zadanie, przyczynę, jedną linię `needs`, wymaganą klasę C1–C7 i opcjonalny resolver. `resolver: lead` jest odrzucany dla C1, C2, C5 i C6; pętla prosi lidera o rozwiązanie tylko blokera oznaczonego przez sam plan jako `resolver: lead`. `state.json` staje się `plan-snapshot/v8` z aktywnym blokerem i wyprowadzonym stanem `blocked`; `PROGRESS.md` zaczyna się czterowierszowym nagłówkiem: cel, bieżące zadanie, następne działanie i potrzeby.
- **Kolejka planów.** `.dwp/queue.json` (`dwp-queue-v1`) może zapisywać wyłącznie `shared/queue.py` pakietu lub człowiek; po zatwierdzeniu `create` dodaje plan, a daemon Herdr tylko odczytuje kolejkę. Mieści maksymalnie 64 plany i uruchamia po jednym na repozytorium, chyba że plan ustawi `parallel: true`. Uszkodzona kolejka nie przerywa cyklu życia.

Ostatnim wydaniem v7 było **7.12.2**.

Zainstalowane wydanie skilla: **8.0.3**.
