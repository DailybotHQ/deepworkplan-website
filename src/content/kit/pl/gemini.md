---
title: Google Gemini
description: "Adapter DWP dla Google Gemini z częściowym wsparciem przez procedury komend w markdown i prefiks hash, które napędzają sekwencyjny przepływ pracy."
kind: adapter
lang: pl
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# Adapter Google Gemini

Google Gemini obsługuje DWP poprzez procedury komend w markdown.

## Poziom wsparcia

**Częściowy** — podstawowe komendy działają przez pliki procedur.

## Instalacja

Komendy DWP istnieją jako procedury w markdown, które agent odczytuje.

## Wywoływanie

Używaj prefiksu `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Uwagi

Gemini odczytuje pliki procedur i wykonuje sekwencyjny przepływ pracy DWP.
