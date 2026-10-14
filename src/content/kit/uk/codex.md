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

**Повна** (Перевірено поведінкою) — кожна команда dwp-* запускається зі свого файлу процедури, що доведено у двонаправлених бенчмарках створення та відновлення між моделями.

## Встановлення

Команди DWP існують як процедури markdown, які агент читає під час виклику; правила встановлюються в `.codex/`.

Необов’язково: [coding-agents-kit](/kit/agentkit) може встановити цей CLI і запускати його командою `ak codex`. Офіційний інсталятор постачальника працює так само добре.

```bash
git clone --branch v1.0.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
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
