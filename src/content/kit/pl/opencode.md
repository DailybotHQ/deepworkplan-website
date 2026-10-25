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

**Pełne** (Przetestowane instalacyjnie) — OpenCode odczytuje AGENTS.md natywnie i uruchamia każde polecenie dwp-* ze swojego pliku procedury. Trasa potwierdzona przez automatyczne zestawy testów.

## Instalacja

DWP dostarcza AGENTS.md i procedury komend w repozytorium; OpenCode wykrywa je jako kontekst projektu.

Opcjonalnie: [coding-agents-kit](/kit/agentkit) może zainstalować to CLI i uruchamiać je poleceniem `ak opencode`. Oficjalny instalator dostawcy działa równie dobrze.

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install opencode
```

## Wywoływanie

Używaj prefiksu `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Uwagi

OpenCode odczytuje pliki procedur i wykonuje pełną sekwencyjną pętlę Deep Work Plan.
