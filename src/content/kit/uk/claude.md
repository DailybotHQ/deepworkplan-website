---
title: Claude Code
description: "Адаптер DWP для Claude Code з повною підтримкою через нативні slash-команди та скіли, включно з субагентами й командними агентами для повного набору можливостей."
kind: adapter
lang: uk
order: 1
agent: Claude Code
support: full
prefix: /
---

# Адаптер Claude Code

Claude Code має **повну** підтримку DWP через нативні slash-команди та скіли.

## Рівень підтримки

**Повний** — усі п'ять команд DWP зіставляються з нативними slash-командами Claude Code.

## Встановлення

DWP постачається як скіли в `.agents/skills/` (розв'язуються через символьне посилання `.claude/`). Claude Code виявляє їх автоматично.

Необов’язково: [coding-agents-kit](/kit/agentkit) може встановити цей CLI і запускати його командою `ak claude`. Офіційний інсталятор постачальника працює так само добре.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install claude
```

## Виклик

Використовуйте префікс `/`:

```
/dwp-create <goal>
/dwp-execute
```

## Примітки

Claude Code підтримує скіли, субагентів і командних агентів — повний набір можливостей DWP.
