---
title: OpenAI Codex
description: "Adapter DWP dla OpenAI Codex z pełnym wsparciem przez procedury komend w markdown i prefiks hash, które uruchamiają kompletną pętlę Deep Work Plan."
kind: adapter
lang: pl
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# Adapter OpenAI Codex

OpenAI Codex obsługuje DWP poprzez procedury komend w markdown.

## Poziom wsparcia

**Pełny** — każda komenda dwp-* uruchamiania jest z jej pliku procedury.

## Instalacja

Komendy DWP istnieją jako procedury w markdown, które agent odczytuje przy wywołaniu; reguły instalowane są w katalogu `.codex/`.

Opcjonalnie: [coding-agents-kit](/kit/agentkit) może zainstalować to CLI i uruchamiać je poleceniem `ak codex`. Oficjalny instalator dostawcy działa równie dobrze.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install codex
```

## Wywoływanie

Używaj prefiksu `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Uwagi

Codex odczytuje pliki procedur i wykonuje pełną sekwencyjną pętlę Deep Work Plan.
