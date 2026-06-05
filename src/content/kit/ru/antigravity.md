---
title: Antigravity
description: "Адаптер DWP для Antigravity с полной поддержкой через командные процедуры в Markdown и префикс через решётку, управляющие полным циклом Deep Work Plan."
kind: adapter
lang: ru
order: 6
agent: Antigravity
support: full
prefix: '#'
---

# Адаптер Antigravity

Antigravity поддерживает DWP через командные процедуры в Markdown.

## Уровень поддержки

**Полная** — каждая команда dwp-* запускается из своего файла процедуры через нативный набор команд.

## Установка

Команды DWP живут как процедуры в Markdown, которые агент читает при вызове.

## Вызов

Используйте префикс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примечания

Antigravity читает файлы процедур и выполняет полный последовательный цикл Deep Work Plan.
