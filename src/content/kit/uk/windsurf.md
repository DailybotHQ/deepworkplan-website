---
title: Windsurf
description: "Адаптер DWP для Windsurf з повною підтримкою через систему правил і процедури команд у форматі markdown, що викликаються префіксом-решіткою."
kind: adapter
lang: uk
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Адаптер Windsurf

Windsurf підтримує DWP через систему правил і процедури команд у форматі markdown.

## Рівень підтримки

**Повний** — Windsurf читає правила проєкту і виконує кожну команду dwp-* зі свого файлу процедур.

## Встановлення

Команди DWP існують як процедури markdown, які агент читає через систему правил Windsurf.

## Виклик

Використовуйте префікс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примітки

Windsurf читає файли процедур і виконує повний послідовний цикл Deep Work Plan.
