---
title: Cursor
description: "Адаптер DWP для Cursor AI з повною підтримкою через систему правил проєкту й префікс-решітку для команд, оскільки Cursor резервує слеш для себе."
kind: adapter
lang: uk
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Адаптер Cursor

Cursor підтримує DWP через правила проєкту й файли команд.

## Рівень підтримки

**Повний** — команди DWP працюють через систему правил Cursor.

## Встановлення

Команди DWP існують як markdown у проєкті. Cursor читає їх через свою систему правил.

Необов’язково: [coding-agents-kit](/kit/agentkit) може встановити цей CLI і запускати його командою `ak cursor`. Офіційний інсталятор постачальника працює так само добре.

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cursor
```

## Виклик

Використовуйте префікс `#` (Cursor перехоплює `/`):

```
#dwp-create <goal>
#dwp-execute
```

## Примітки

Використовуйте `#`, оскільки Cursor резервує `/` для власних команд.
