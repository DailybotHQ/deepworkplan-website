---
title: OpenCode
description: "Adapter DWP dla OpenCode, agenta open source, z pełnym wsparciem przez natywny AGENTS.md i procedury komend w markdown wywoływane prefiksem hash."
kind: adapter
lang: pl
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# Adapter OpenCode

OpenCode, open-source'owy agent kodujący, obsługuje DWP poprzez natywny AGENTS.md i procedury komend w markdown.

## Poziom wsparcia

**Pełny** — OpenCode natywnie odczytuje AGENTS.md i uruchamia każdą komendę dwp-* z jej pliku procedury.

## Instalacja

DWP dostarcza AGENTS.md i procedury komend w repozytorium; OpenCode wykrywa je jako kontekst projektu.

## Wywoływanie

Używaj prefiksu `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Uwagi

OpenCode odczytuje pliki procedur i wykonuje pełną sekwencyjną pętlę Deep Work Plan.
