---
title: Dependency upgrade
description: "Opcjonalny, niezależny od menedżera pakietów addon, który aktualizuje zależności repozytorium w zwalidowanych, odwracalnych partiach, wykrywając prawdziwy menedżer."
kind: addon
lang: pl
order: 3
---

# Addon Dependency-upgrade

Zaktualizuj zależności repozytorium w przepływie partii — zwalidowanym i odwracalnym. Trzeci opcjonalny addon Deep Work Plan.

## Co dodaje

- Wykrywanie **rzeczywistego** menedżera pakietów repozytorium (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer i inne) na podstawie istniejącego manifestu i pliku lock.
- Komendę `/lib-upgrade` instalowaną w `.agents/commands/`, **wyłącznie po zaakceptowaniu**.

## Zachowanie

1. Wymaganie czystego (lub zabezpieczonego kopią) drzewa roboczego.
2. Klasyfikacja aktualizacji według semver — patch, minor, major; aktualizacje major wymagają wyraźnego zatwierdzenia.
3. Aktualizacja w małych, spójnych partiach; nigdy wszystkiego naraz.
4. Uruchomienie rzeczywistej bramki walidacji repozytorium po każdej partii; wycofanie każdej, która zawiedzie.
5. Podsumowanie tego, co zaktualizowano, pominięto i wycofano; pozostawienie commita programiście.

## Uwagi

Niezależny od menedżera pakietów — nigdy nie uruchamia npm/ncu w repozytorium spoza świata JS. Opcjonalny, nigdy wymagany i nigdy nie commituje automatycznie.
