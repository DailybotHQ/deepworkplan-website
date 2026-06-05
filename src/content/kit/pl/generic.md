---
title: Generic
description: "Zapasowy preset onboardingowy dla dowolnego projektu, z niezależnymi od stacku wskazówkami do rozumowania, które wykrywają komendy builda i testów z repozytorium."
kind: preset
lang: pl
order: 100
stack: Generic
---

# Preset Generic

Zapasowy przewodnik po rozumowaniu, którego przepływ onboardingu używa, gdy nie pasuje żaden preset specyficzny dla stacku. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## O czym należy rozumować

- Wykryj rzeczywiste komendy builda i testów z manifestu, pliku Makefile lub CI — zapisane dosłownie.
- Zastosuj ogólne konwencje; nie czyń założeń specyficznych dla stacku.
- Generuj wyłącznie te skille, agentów i dokumentację, które odpowiadają faktycznym przepływom pracy repozytorium.

## Uwagi

Rozwiązanie zapasowe, gdy nie pasuje żaden z presetów Django, Vue + Vite, Astro/Svelte, Node/TS service ani Python package/CLI.
