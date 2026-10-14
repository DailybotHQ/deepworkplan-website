---
title: GitHub Copilot
description: "Адаптер DWP для GitHub Copilot з повною підтримкою через AGENTS.md і процедури команд у форматі markdown, що викликаються префіксом-решіткою."
kind: adapter
lang: uk
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# Адаптер GitHub Copilot

Copilot підтримує DWP через AGENTS.md і процедури команд у форматі markdown.

## Рівень підтримки

**Повна** (Перевірено встановленням) — Copilot читає AGENTS.md та файли процедур dwp-*, запускаючи з них кожну команду. Маршрут підтверджено автоматизованими тестами.

## Встановлення

DWP постачає AGENTS.md і процедури команд у репозиторії; Copilot читає їх як контекст репозиторію.

## Виклик

Використовуйте префікс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примітки

Copilot читає файли процедур і виконує повний послідовний цикл Deep Work Plan.
