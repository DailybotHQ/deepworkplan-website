---
title: Cline
description: "Адаптер DWP для Cline, агента с открытым исходным кодом, с полной поддержкой через правила Markdown и командные процедуры, вызываемые с префиксом через решётку."
kind: adapter
lang: ru
order: 9
agent: Cline
support: full
prefix: '#'
---

# Адаптер Cline

Cline, агент с открытым исходным кодом, поддерживает DWP через правила Markdown и командные процедуры.

## Уровень поддержки

**Полная** — Cline читает правила Markdown и запускает каждую команду dwp-* из соответствующего файла процедуры.

## Установка

Команды DWP живут как процедуры в Markdown, которые агент читает через правила Cline.

Необязательно: [coding-agents-kit](/kit/agentkit) может установить этот CLI и запускать его командой `ak cline`. Официальный установщик поставщика работает так же хорошо.

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cline
```

## Вызов

Используйте префикс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примечания

Cline читает файлы процедур и выполняет полный последовательный цикл Deep Work Plan.
