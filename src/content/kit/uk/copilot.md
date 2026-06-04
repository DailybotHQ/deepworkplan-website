---
title: GitHub Copilot
description: "Адаптер DWP для GitHub Copilot з частковою підтримкою через процедури команд у форматі markdown і префікс-решітку; частину автоматизації виконують вручну."
kind: adapter
lang: uk
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# Адаптер GitHub Copilot

GitHub Copilot підтримує DWP через процедури команд у форматі markdown.

## Рівень підтримки

**Частковий** — основні команди працюють через файли процедур; частину автоматизації виконують вручну.

## Встановлення

Команди DWP існують як процедури markdown у репозиторії.

## Виклик

Використовуйте префікс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примітки

Copilot читає файли процедур, але має менш автономне виконання, ніж Claude Code.
