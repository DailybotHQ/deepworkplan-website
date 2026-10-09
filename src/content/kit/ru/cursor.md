---
title: Cursor
description: "Адаптер DWP для Cursor AI с полной поддержкой через систему правил проекта и префикс команд через решётку, поскольку Cursor резервирует слеш за собой."
kind: adapter
lang: ru
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Адаптер Cursor

Cursor поддерживает DWP через правила проекта и командные файлы.

## Уровень поддержки

**Полная** — команды DWP работают через систему правил Cursor.

## Установка

Команды DWP живут как Markdown внутри проекта. Cursor читает их через свою систему правил.

Необязательно: [coding-agents-kit](/kit/agentkit) может установить этот CLI и запускать его командой `ak cursor`. Официальный установщик поставщика работает так же хорошо.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cursor
```

## Вызов

Используйте префикс `#` (Cursor перехватывает `/`):

```
#dwp-create <goal>
#dwp-execute
```

## Примечания

Используйте `#`, потому что Cursor резервирует `/` за собственными командами.
