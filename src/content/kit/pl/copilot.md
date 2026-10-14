---
title: GitHub Copilot
description: "Adapter DWP dla GitHub Copilot z pełnym wsparciem przez AGENTS.md i procedury komend w markdown wywoływane prefiksem hash z pełną weryfikacją."
kind: adapter
lang: pl
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# Adapter GitHub Copilot

GitHub Copilot obsługuje DWP poprzez AGENTS.md i procedury komend w markdown.

## Poziom wsparcia

**Pełne** (Przetestowane instalacyjnie) — Copilot odczytuje AGENTS.md oraz pliki procedur dwp-* i uruchamia z nich każde polecenie. Trasa potwierdzona przez automatyczne zestawy testów.

## Instalacja

DWP dostarcza AGENTS.md i procedury komend w repozytorium; Copilot odczytuje je jako kontekst repozytorium.

## Wywoływanie

Używaj prefiksu `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Uwagi

Copilot odczytuje pliki procedur i wykonuje pełną sekwencyjną pętlę Deep Work Plan.
