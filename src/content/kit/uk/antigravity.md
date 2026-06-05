---
title: Antigravity
description: "Адаптер DWP для Antigravity з повною підтримкою через процедури команд у форматі markdown і префікс-решітку, що керують повним циклом Deep Work Plan."
kind: adapter
lang: uk
order: 6
agent: Antigravity
support: full
prefix: '#'
---

# Адаптер Antigravity

Antigravity підтримує DWP через процедури команд у форматі markdown.

## Рівень підтримки

**Повний** — кожна команда dwp-* виконується зі свого файлу процедур через нативну поверхню команд.

## Встановлення

Команди DWP існують як процедури markdown, які агент читає під час виклику.

## Виклик

Використовуйте префікс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примітки

Antigravity читає файли процедур і виконує повний послідовний цикл Deep Work Plan.
