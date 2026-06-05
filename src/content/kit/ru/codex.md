---
title: OpenAI Codex
description: "Адаптер DWP для OpenAI Codex с полной поддержкой через командные процедуры в Markdown и префикс через решётку, управляющие полным циклом Deep Work Plan."
kind: adapter
lang: ru
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# Адаптер OpenAI Codex

OpenAI Codex поддерживает DWP через командные процедуры в Markdown.

## Уровень поддержки

**Полная** — каждая команда dwp-* запускается из соответствующего файла процедуры.

## Установка

Команды DWP живут как процедуры в Markdown, которые агент читает при вызове; правила устанавливаются в `.codex/`.

## Вызов

Используйте префикс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примечания

Codex читает файлы процедур и выполняет полный последовательный цикл Deep Work Plan.
