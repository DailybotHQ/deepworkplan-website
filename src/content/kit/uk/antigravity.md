---
title: Antigravity
description: "Адаптер DWP для Antigravity з частковою підтримкою через процедури команд у форматі markdown і префікс-решітку, що керують послідовним робочим процесом."
kind: adapter
lang: uk
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# Адаптер Antigravity

Antigravity підтримує DWP через процедури команд у форматі markdown.

## Рівень підтримки

**Частковий** — основні команди працюють через файли процедур.

## Встановлення

Команди DWP існують як процедури markdown, які агент читає під час виклику.

## Виклик

Використовуйте префікс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примітки

Antigravity читає файли процедур і виконує послідовний робочий процес DWP.
