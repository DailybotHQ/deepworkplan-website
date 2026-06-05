---
title: Cline
description: "Adapter DWP dla Cline, agenta open source, z pełnym wsparciem przez reguły markdown i procedury komend wywoływane prefiksem hash."
kind: adapter
lang: pl
order: 9
agent: Cline
support: full
prefix: '#'
---

# Adapter Cline

Cline, open-source'owy agent kodujący, obsługuje DWP poprzez reguły markdown i procedury komend.

## Poziom wsparcia

**Pełny** — Cline odczytuje reguły markdown i uruchamia każdą komendę dwp-* z jej pliku procedury.

## Instalacja

Komendy DWP istnieją jako procedury w markdown, które agent odczytuje przez reguły Cline.

## Wywoływanie

Używaj prefiksu `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Uwagi

Cline odczytuje pliki procedur i wykonuje pełną sekwencyjną pętlę Deep Work Plan.
