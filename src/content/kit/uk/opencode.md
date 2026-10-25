---
title: OpenCode
description: "Адаптер DWP для OpenCode, відкритого агента, з повною підтримкою через нативний AGENTS.md і процедури команд у форматі markdown, що викликаються."
kind: adapter
lang: uk
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# Адаптер OpenCode

OpenCode, відкритий агент програмування, підтримує DWP через нативний AGENTS.md і процедури команд у форматі markdown.

## Рівень підтримки

**Повна** (Перевірено встановленням) — OpenCode нативно читає AGENTS.md і запускає кожну команду dwp-* зі свого файлу процедури. Маршрут підтверджено автоматизованими тестами.

## Встановлення

DWP постачає AGENTS.md і процедури команд у репозиторії; OpenCode виявляє їх як контекст проєкту.

Необов’язково: [coding-agents-kit](/kit/agentkit) може встановити цей CLI і запускати його командою `ak opencode`. Офіційний інсталятор постачальника працює так само добре.

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install opencode
```

## Виклик

Використовуйте префікс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примітки

OpenCode читає файли процедур і виконує повний послідовний цикл Deep Work Plan.
