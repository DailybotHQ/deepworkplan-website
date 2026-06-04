---
title: Antigravity
description: "Adapter DWP dla Antigravity z częściowym wsparciem przez procedury komend w markdown i prefiks hash, które napędzają sekwencyjny przepływ pracy."
kind: adapter
lang: pl
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# Adapter Antigravity

Antigravity obsługuje DWP poprzez procedury komend w markdown.

## Poziom wsparcia

**Częściowy** — podstawowe komendy działają przez pliki procedur.

## Instalacja

Komendy DWP istnieją jako procedury w markdown, które agent odczytuje przy wywołaniu.

## Wywoływanie

Używaj prefiksu `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Uwagi

Antigravity odczytuje pliki procedur i wykonuje sekwencyjny przepływ pracy DWP.
