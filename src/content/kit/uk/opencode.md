---
title: OpenCode
description: "Адаптер DWP для OpenCode, відкритого агента, з повною підтримкою через нативний AGENTS.md і процедури команд у форматі markdown, що викликаються префіксом-решіткою."
kind: adapter
lang: uk
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# Адаптер OpenCode

OpenCode, відкритий агент програмування, підтримує DWP через нативний AGENTS.md і процедури команд у форматі markdown.

## Рівень підтримки

**Повний** — OpenCode нативно читає AGENTS.md і виконує кожну команду dwp-* зі свого файлу процедур.

## Встановлення

DWP постачає AGENTS.md і процедури команд у репозиторії; OpenCode виявляє їх як контекст проєкту.

## Виклик

Використовуйте префікс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примітки

OpenCode читає файли процедур і виконує повний послідовний цикл Deep Work Plan.
