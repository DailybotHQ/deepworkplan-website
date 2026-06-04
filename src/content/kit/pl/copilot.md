---
title: GitHub Copilot
description: "Adapter DWP dla GitHub Copilot z częściowym wsparciem przez procedury komend w markdown i prefiks hash; część automatyzacji wykonywana jest ręcznie."
kind: adapter
lang: pl
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# Adapter GitHub Copilot

GitHub Copilot obsługuje DWP poprzez procedury komend w markdown.

## Poziom wsparcia

**Częściowy** — podstawowe komendy działają przez pliki procedur; część automatyzacji jest ręczna.

## Instalacja

Komendy DWP istnieją jako procedury w markdown w repozytorium.

## Wywoływanie

Używaj prefiksu `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Uwagi

Copilot odczytuje pliki procedur, lecz wykonuje je mniej autonomicznie niż Claude Code.
