---
title: OpenAI Codex
description: "Адаптер DWP для OpenAI Codex з повною підтримкою через процедури команд у форматі markdown і префікс-решітку, що керують повним циклом Deep Work Plan."
kind: adapter
lang: uk
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# Адаптер OpenAI Codex

Codex підтримує DWP через процедури команд у форматі markdown.

## Рівень підтримки

**Повний** — кожна команда dwp-* виконується зі свого файлу процедур.

## Встановлення

Команди DWP існують як процедури markdown, які агент читає під час виклику; правила встановлюються в `.codex/`.

## Виклик

Використовуйте префікс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примітки

Codex читає файли процедур і виконує повний послідовний цикл Deep Work Plan.
