---
title: "DWP v8: spec-first i zamknięta pętla"
description: "Deep Work Plan v8 łączy plany spec-first, repozytorium jako harness, Loop engineering i mierzoną wydajność; pętla kończy zatwierdzone plany."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: pl
order: 0
featured: true
sourceLabel: "Wydania z tagami i szkic kontraktu v8"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
sourceLinks:
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
---

Deep Work Plan v8 łączy rozwój spec-first, repozytorium jako harness agenta, Loop engineering i mierzoną wydajność. Zdanie robocze: „Spec-first, zamknięta pętla: repozytorium jest harness, a plan sam działa aż do końca”.

## Cztery filary

1. **Spec-first:** plan i specyfikacja są trwałym źródłem prawdy z kryteriami akceptacji i bramkami walidacji. 2. **Repozytorium jest harness:** kontekst, narzędzia, reguły i stan wznowienia są przy kodzie. 3. **Loop engineering:** zatwierdzony plan przechodzi zapisany cykl do końca. 4. **Mierzona wydajność:** bajty instrukcji na przepływ i publiczna ścieżka pomiaru; bez wyliczania procentów tokenów.

## Znaczenie Loop engineering

Plan rejestruje lidera i uporządkowanych następców. Człowiek uruchamia opcjonalny daemon Herdr poleceniem herdr-peers autopilot --loop; ponaglenia proszą o kontynuację bez nowych uprawnień. Następca może przejąć rolę pod nieobecność lidera. Zdarzenia trafiają do notifiera Dailybot, fleet pokazuje agentów i plany na aktywnych maszynach. Daemon uruchamia człowiek; Herdr jest opcjonalny.

## Wydania z mechanizmami

Wzmocnienie pakietu v7.11.0 oraz rejestracja planów i powiadomienia v7.12.x dostarczają mechanizmy planu. herdr-peers v1.3.x dodaje pętlę, raporty i fleet; v2.0.0 brain protokołu 2 i konsumenta kolejki. coding-agents-kit v1.3.0 dostarcza pick-v2, v1.4.0 zweryfikowany aktualizator. Tagi są podlinkowane wyżej; addon są opcjonalne.

## Kontrakt v8 — RE-VERIFY AT 8.0.0

Szkic origin/feat/v8-line dodaje autonomy do plan-contract/v8: budżet zastoju, adresy pane do ponagleń, cele powiadomień, uprawnienia brain i zachowanie kolejki. Definiuje też dwp-queue-v1 dla .dwp/queue.json; pakiet zapisuje kolejkę, Herdr ją czyta. Przed publikacją sprawdzić te tymczasowe twierdzenia w artefaktach tagu 8.0.0.
