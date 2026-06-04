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
7. Zaproponowanie opcjonalnych addonów, a następnie autoweryfikacja.

## Uwagi

Repozytorium jest w pełni zgodne nawet bez żadnego addonu. Wykryta rzeczywistość zawsze ma pierwszeństwo przed założeniami presetu.
