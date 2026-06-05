---
title: GitHub Copilot
description: "Адаптер DWP для GitHub Copilot с полной поддержкой через AGENTS.md и командные процедуры в Markdown, вызываемые с префиксом через решётку."
kind: adapter
lang: ru
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# Адаптер GitHub Copilot

GitHub Copilot поддерживает DWP через AGENTS.md и командные процедуры в Markdown.

## Уровень поддержки

**Полная** — Copilot читает AGENTS.md и файлы процедур dwp-* и выполняет каждую команду из них.

## Установка

DWP поставляется с AGENTS.md и командными процедурами в репозитории; Copilot читает их как контекст репозитория.

## Вызов

Используйте префикс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примечания

Copilot читает файлы процедур и выполняет полный последовательный цикл Deep Work Plan.
