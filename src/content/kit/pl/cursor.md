---
title: Cursor
description: "Adapter DWP dla Cursor AI z pełnym wsparciem przez system reguł projektu i prefiks komend hash, ponieważ Cursor sam rezerwuje znak slash."
kind: adapter
lang: pl
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Adapter Cursor

Cursor obsługuje DWP poprzez reguły projektu i pliki komend.

## Poziom wsparcia

**Pełny** — komendy DWP działają przez system reguł Cursor.

## Instalacja

Komendy DWP istnieją jako pliki markdown w projekcie. Cursor odczytuje je przez swój system reguł.

## Wywoływanie

Używaj prefiksu `#` (Cursor przechwytuje `/`):

```
#dwp-create <goal>
#dwp-execute
```

## Uwagi

Używaj `#`, ponieważ Cursor rezerwuje `/` dla własnych komend.
