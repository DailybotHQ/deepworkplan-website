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

## Odnośniki do schematów v6

Dla planów v6 katalog schematów czytelnych maszynowo jest opublikowany pod tymi stałymi adresami URL. Aktywna projekcja v6 to migawka; `plan-state/v6.json` nie istnieje. Istniejące plany v5 nadal korzystają ze schematu stanu v5, a starsze plany nigdy nie są po cichu przepisywane.

- **Plan manifest:** https://deepworkplan.com/schema/plan-manifest/v6.json
- **Plan snapshot (v6 live projection):** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Plan contract:** https://deepworkplan.com/schema/plan-contract/v6.json
- **Journal event:** https://deepworkplan.com/schema/journal-event/v6.json
- **Context manifest:** https://deepworkplan.com/schema/context-manifest/v6.json

Nowe plany otrzymują monotonicznie rosnące identyfikatory liczbowe o długości co najmniej trzech cyfr (na przykład `PLAN_001_add_payment_webhooks/`). Zamrożone schematy v5 liczą identyfikator liczbowy jako jedno słowo, dlatego slug v5 ma 2–4 słowa, a slug v6 ma 2–5. Istniejące nienumerowane foldery `PLAN_<slug>/` pozostają czytelne i nigdy nie są przemianowywane. Jeśli istnieją plany numerowane, `latest` wskazuje plan o najwyższym identyfikatorze liczbowym.
