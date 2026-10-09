---
title: deepworkplan-onboard
description: "Uczyń repozytorium AI-first, rozumując o jego stacku i archetypie, a następnie generując dostosowane AGENTS.md, docs/, .agents/ oraz pomijane przez git .dwp/."
kind: command
lang: pl
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

Przekształć repozytorium w bazę kodu AI-first, sterowaną specyfikacją (spec-driven). To sub-skill onboard należący do skilla Deep Work Plan.

## Co robi

`deepworkplan-onboard` bada **rzeczywiste** repozytorium — języki, frameworki, menedżer pakietów, komendy build/test/lint, moduły, konwencję testów, kształt wdrożenia — i generuje dostosowane do niego artefakty. Rozumuje; nigdy nie kopiuje szablonu ani nie zostawia symbolu zastępczego.

## Użycie

```
/deepworkplan-onboard
```

## Zachowanie

1. Rozpoznanie — wykrycie rzeczywistego stacku i komend walidacji; dopasowanie najbliższego presetu onboardingu.
2. Archetyp — klasyfikacja jako pojedyncze repozytorium lub hub orkiestratora.
3. Wygenerowanie `AGENTS.md` wraz z dowiązaniem symbolicznym `CLAUDE.md` zawierającym rzeczywisty blok Quick Commands.
4. Wygenerowanie `docs/` (architektura, standardy, testowanie, bezpieczeństwo i inne) oraz dokumentacji poszczególnych modułów.
5. Wygenerowanie `.agents/` (agenci, cienkie komendy `dwp-*`, skille odpowiednie dla stacku, katalog) oraz `.claude → .agents`.
6. Instalacja skilla i utworzenie szkieletu pomijanego przez git `.dwp/` (plany, szkice) oraz przestrzeni roboczej `tmp/`.
7. Zainstalowanie wymaganego lokalnego przeglądu AI Diff Reviewer, zaproponowanie opcjonalnych addonów, a następnie autoweryfikacja.

## Uwagi

Repozytorium jest w pełni zgodne nawet bez żadnego opcjonalnego addonu; lokalny przegląd AI Diff Reviewer jest częścią linii bazowej od standardu 2.3.0. Wykryta rzeczywistość zawsze ma pierwszeństwo przed założeniami presetu.

## Odnośniki do schematów v7

Dla planów v7 — domyślnych w aktualnym pakiecie 7.x — katalog schematów czytelnych maszynowo jest opublikowany pod tymi stałymi adresami URL. Aktywna projekcja to migawka współdzielona z v6; nie istnieje ani `plan-state/v6.json`, ani `plan-state/v7.json`.

- **Manifest planu:** https://deepworkplan.com/schema/plan-manifest/v7.json
- **Kontrakt planu:** https://deepworkplan.com/schema/plan-contract/v7.json (kontrakt v6 plus opcjonalny znacznik zadania `parallel_safe`)
- **Zdarzenie dziennika:** https://deepworkplan.com/schema/journal-event/v7.json (dodaje zdarzenie `delegation`)
- **Migawka planu (aktywna projekcja, współdzielona z v6):** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Manifest kontekstu (współdzielony z v6):** https://deepworkplan.com/schema/context-manifest/v6.json

Plany v6 zachowują swoje schematy v6 ([manifest](https://deepworkplan.com/schema/plan-manifest/v6.json), [kontrakt](https://deepworkplan.com/schema/plan-contract/v6.json), [zdarzenie dziennika](https://deepworkplan.com/schema/journal-event/v6.json)); istniejące plany v5 nadal korzystają ze schematu stanu v5, a starsze plany nigdy nie są po cichu przepisywane.

Aktualny pakiet 7.x domyślnie tworzy nowe plany w v7. Istniejące plany zachowują zapisaną generację; migracja wymaga wyraźnego polecenia. Nowe plany otrzymują monotonicznie rosnące identyfikatory liczbowe o długości co najmniej trzech cyfr (na przykład `PLAN_001_add_payment_webhooks/`). Zamrożone schematy v5 liczą identyfikator liczbowy jako jedno słowo, dlatego slug v5 ma 2–4 słowa, a slug v7 ma 2–5. Istniejące nienumerowane foldery `PLAN_<slug>/` pozostają czytelne i nigdy nie są przemianowywane. Jeśli istnieją plany numerowane, `latest` wskazuje plan o najwyższym identyfikatorze liczbowym.
