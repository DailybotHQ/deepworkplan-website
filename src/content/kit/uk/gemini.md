---
title: Google Gemini
description: "Адаптер DWP для Google Gemini з частковою підтримкою через процедури команд у форматі markdown і префікс-решітку, що керують послідовним робочим процесом."
kind: adapter
lang: uk
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# Адаптер Google Gemini

Google Gemini підтримує DWP через процедури команд у форматі markdown.

## Рівень підтримки

**Частковий** — основні команди працюють через файли процедур.

## Встановлення

Команди DWP існують як процедури markdown, які агент читає.

## Виклик

Використовуйте префікс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примітки

Gemini читає файли процедур і виконує послідовний робочий процес DWP.
