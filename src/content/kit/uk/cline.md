---
title: Cline
description: "Адаптер DWP для Cline, відкритого агента, з повною підтримкою через правила markdown і процедури команд, що викликаються префіксом-решіткою."
kind: adapter
lang: uk
order: 9
agent: Cline
support: full
prefix: '#'
---

# Адаптер Cline

Cline, відкритий агент програмування, підтримує DWP через правила markdown і процедури команд.

## Рівень підтримки

**Повний** — Cline читає правила markdown і виконує кожну команду dwp-* зі свого файлу процедур.

## Встановлення

Команди DWP існують як процедури markdown, які агент читає через правила Cline.

Необов’язково: [coding-agents-kit](/kit/agentkit) може встановити цей CLI і запускати його командою `ak cline`. Офіційний інсталятор постачальника працює так само добре.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cline
```

## Виклик

Використовуйте префікс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примітки

Cline читає файли процедур і виконує повний послідовний цикл Deep Work Plan.
