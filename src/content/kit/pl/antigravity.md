---
title: Antigravity
description: "Adapter DWP dla Antigravity z pełnym wsparciem przez procedury komend w markdown i prefiks hash, które napędzają kompletną pętlę Deep Work Plan."
kind: adapter
lang: pl
order: 6
agent: Antigravity
support: full
prefix: '#'
---

# Adapter Antigravity

Antigravity obsługuje DWP poprzez procedury komend w markdown.

## Poziom wsparcia

**Pełne** (Przetestowane instalacyjnie) — każde polecenie dwp-* działa z pliku procedury. Trasa potwierdzona przez automatyczne zestawy testów; przepływy behawioralne działają na sekwencyjnej linii bazowej.

## Instalacja

Komendy DWP istnieją jako procedury w markdown, które agent odczytuje przy wywołaniu.

## Wywoływanie

Używaj prefiksu `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Uwagi

Antigravity odczytuje pliki procedur i wykonuje pełną sekwencyjną pętlę Deep Work Plan.
