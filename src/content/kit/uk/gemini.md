---
title: Google Gemini
description: "Адаптер DWP для Google Gemini з повною підтримкою через процедури команд у форматі markdown і префікс-решітку, що керують повним циклом Deep Work Plan."
kind: adapter
lang: uk
order: 5
agent: Google Gemini
support: full
prefix: '#'
---

# Адаптер Google Gemini

Gemini підтримує DWP через процедури команд у форматі markdown.

## Рівень підтримки

**Повний** — кожна команда dwp-* виконується зі свого файлу процедур. Потрібен Gemini 2.5 Pro або новіший для нативного WebFetch.

## Встановлення

Команди DWP існують як процедури markdown, які агент читає під час виклику.

## Виклик

Використовуйте префікс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примітки

Gemini читає файли процедур і виконує повний послідовний цикл Deep Work Plan.
