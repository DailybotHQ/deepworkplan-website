---
title: Claude Code
description: "Adapter DWP dla Claude Code z pełnym wsparciem przez natywne komendy slash i skille, w tym subagentów i agentów zespołowych dla kompletnego zestawu funkcji."
kind: adapter
lang: pl
order: 1
agent: Claude Code
support: full
prefix: /
---

# Adapter Claude Code

Claude Code zapewnia **pełne** wsparcie DWP poprzez natywne komendy slash i skille.

## Poziom wsparcia

**Pełny** — wszystkie pięć komend DWP odpowiada natywnym komendom slash w Claude Code.

## Instalacja

DWP dostarczany jest jako skille w `.agents/skills/` (rozwiązywane przez dowiązanie symboliczne `.claude/`). Claude Code wykrywa je automatycznie.

Opcjonalnie: [coding-agents-kit](/kit/agentkit) może zainstalować to CLI i uruchamiać je poleceniem `ak claude`. Oficjalny instalator dostawcy działa równie dobrze.

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install claude
```

## Wywoływanie

Używaj prefiksu `/`:

```
/dwp-create <goal>
/dwp-execute
```

## Uwagi

Claude Code obsługuje skille, subagentów i agentów zespołowych — pełny zestaw funkcji DWP.
