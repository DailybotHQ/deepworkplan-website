---
title: "DWP v1: od pętli planowania do przenośnego harnessu"
description: "Deep Work Plan przechodzi od prostej pętli pisania planów do przenośnego zestawu wdrożeniowego — zaufania i pochodzenia, szerszego wsparcia dla hostów agentów oraz kontrolera zgodności, który może uruchomić każde repozytorium."
date: 2026-06-12
version: "v1 · Fundament"
kind: foundation
lang: pl
order: 4
featured: false
sourceLabel: "Skill changelog 2.3.0–2.16.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md"
---

Do tej pory Deep Work Plan był pętlą pisania planów, którą jeden agent realizował w obrębie pojedynczej sesji. Ta seria wydań zmienia go w coś, co repozytorium może przyjąć na własnych zasadach — to pierwsza wersja poświęcona wyjściu poza jednego agenta i jedno posiedzenie.

Skill zyskuje oświadczenie zaufania z sumami kontrolnymi potwierdzającymi pochodzenie, dzięki czemu deweloper dokładnie widzi, co skill czyta i zapisuje, zanim go zainstaluje. Znacznie poszerza się liczba presetów wdrożeniowych i obsługiwanych hostów agentów, dyscyplina testowania staje się pełnoprawną częścią każdego zadania, a nie czymś dodatkowym, a kontroler zgodności pozwala repozytorium zweryfikować — obiektywnie, a nie na zasadzie założenia — że spełnia standard. Protokół stanu i wznawiania oznacza, że przerwany plan może kontynuować od miejsca przerwania zamiast zaczynać od nowa. W tle kompatybilność `.claude` i `.cursor` zbiega się w jednym kanonicznym katalogu `.agents`, dzięki czemu każdy obsługiwany agent czyta ten sam zestaw.

Razem te wydania kładą fundament pod kolejny etap: repozytorium przestaje być tylko miejscem przechowywania planu, a zaczyna być roboczym harnessem agenta.

Zapoznaj się z [historią wydań skilla](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md), aby zobaczyć pełną sekwencję.
