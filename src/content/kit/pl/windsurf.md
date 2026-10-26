---
title: Windsurf
description: "Adapter DWP dla Windsurf z pełnym wsparciem przez system reguł i procedury komend w markdown wywoływane prefiksem hash z pełną weryfikacją."
kind: adapter
lang: pl
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Adapter Windsurf

Windsurf obsługuje DWP poprzez system reguł i procedury komend w markdown.

## Poziom wsparcia

**Pełne** (Przetestowane instalacyjnie) — Windsurf odczytuje reguły projektu i uruchamia każde polecenie dwp-* ze swojego pliku procedury. Trasa potwierdzona przez automatyczne zestawy testów.

## Instalacja

Komendy DWP istnieją jako procedury w markdown, które agent odczytuje poprzez system reguł Windsurf.

## Wywoływanie

Używaj prefiksu `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Uwagi

Windsurf odczytuje pliki procedur i wykonuje pełną sekwencyjną pętlę Deep Work Plan.
