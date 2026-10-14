---
title: Google Gemini
description: "Adapter DWP dla Google Gemini z pełnym wsparciem przez procedury komend w markdown i prefiks hash, które uruchamiają kompletną pętlę Deep Work Plan."
kind: adapter
lang: pl
order: 5
agent: Google Gemini
support: full
prefix: '#'
---

# Adapter Google Gemini

Google Gemini obsługuje DWP poprzez procedury komend w markdown.

## Poziom wsparcia

**Pełne** (Przetestowane instalacyjnie) — każde polecenie dwp-* działa z pliku procedury. Trasa potwierdzona przez automatyczne zestawy testów; przepływy behawioralne działają na sekwencyjnej linii bazowej. Wymaga wykonywania narzędzi i dostępu do plików obszaru roboczego.

## Instalacja

Komendy DWP istnieją jako procedury w markdown, które agent odczytuje przy wywołaniu.

## Wywoływanie

Używaj prefiksu `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Uwagi

Gemini odczytuje pliki procedur i wykonuje pełną sekwencyjną pętlę Deep Work Plan.
