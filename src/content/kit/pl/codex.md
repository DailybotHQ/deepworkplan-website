---
title: OpenAI Codex
description: "Adapter DWP dla OpenAI Codex z częściowym wsparciem przez procedury komend w markdown i prefiks hash; funkcje agentów zespołowych są niedostępne."
kind: adapter
lang: pl
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# Adapter OpenAI Codex

OpenAI Codex obsługuje DWP poprzez procedury komend w markdown.

## Poziom wsparcia

**Częściowy** — podstawowe komendy działają; zaawansowane funkcje (agenci zespołowi) są niedostępne.

## Instalacja

Komendy DWP istnieją jako procedury w markdown, które agent odczytuje przy wywołaniu.

## Wywoływanie

Używaj prefiksu `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Uwagi

Funkcje agentów zespołowych są dostępne tylko w Claude; Codex obsługuje przepływ sekwencyjny.
