---
title: Claude Code
description: "Адаптер DWP для Claude Code с полной поддержкой через нативные слеш-команды и навыки, включая субагентов и команды агентов для полного набора возможностей."
kind: adapter
lang: ru
order: 1
agent: Claude Code
support: full
prefix: /
---

# Адаптер Claude Code

Claude Code имеет **полную** поддержку DWP через нативные слеш-команды и навыки.

## Уровень поддержки

**Полная** — все пять команд DWP сопоставлены с нативными слеш-командами Claude Code.

## Установка

DWP поставляется как навыки в `.agents/skills/` (разрешаются через символьную ссылку `.claude/`). Claude Code обнаруживает их автоматически.

Необязательно: [coding-agents-kit](/kit/agentkit) может установить этот CLI и запускать его командой `ak claude`. Официальный установщик поставщика работает так же хорошо.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install claude
```

## Вызов

Используйте префикс `/`:

```
/dwp-create <goal>
/dwp-execute
```

## Примечания

Claude Code поддерживает навыки, субагентов и команды агентов — полный набор возможностей DWP.
