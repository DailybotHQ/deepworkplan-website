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

Необов’язково: [coding-agents-kit](/kit/agentkit) може встановити цей CLI і запускати його командою `ak codex`. Офіційний інсталятор постачальника працює так само добре.

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install codex
```

## Виклик

Використовуйте префікс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примітки

Codex читає файли процедур і виконує повний послідовний цикл Deep Work Plan.
