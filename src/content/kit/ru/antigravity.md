---
title: Antigravity
description: "Адаптер DWP для Antigravity с частичной поддержкой через командные процедуры в Markdown и префикс через решётку, управляющие последовательным рабочим процессом."
kind: adapter
lang: ru
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# Адаптер Antigravity

Antigravity поддерживает DWP через командные процедуры в Markdown.

## Уровень поддержки

**Частичная** — основные команды работают через файлы процедур.

## Установка

Команды DWP живут как процедуры в Markdown, которые агент читает при вызове.

## Вызов

Используйте префикс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примечания

Antigravity читает файлы процедур и выполняет последовательный рабочий процесс DWP.
