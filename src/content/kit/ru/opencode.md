---
title: OpenCode
description: "Адаптер DWP для OpenCode, агента с открытым исходным кодом, с поддержкой через нативный AGENTS.md и командные процедуры в Markdown, вызываемые с префиксом."
kind: adapter
lang: ru
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# Адаптер OpenCode

OpenCode, агент с открытым исходным кодом, поддерживает DWP через нативный AGENTS.md и командные процедуры в Markdown.

## Уровень поддержки

**Полная** (Проверено установкой) — OpenCode нативно читает AGENTS.md и запускает каждую команду dwp-* из своего файла процедуры. Маршрут подтвержден автоматизированными тестами.

## Установка

DWP поставляется с AGENTS.md и командными процедурами в репозитории; OpenCode обнаруживает их как контекст проекта.

Необязательно: [coding-agents-kit](/kit/agentkit) может установить этот CLI и запускать его командой `ak opencode`. Официальный установщик поставщика работает так же хорошо.

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install opencode
```

## Вызов

Используйте префикс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примечания

OpenCode читает файлы процедур и выполняет полный последовательный цикл Deep Work Plan.
