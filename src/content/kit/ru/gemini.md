---
title: Google Gemini
description: "Адаптер DWP для Google Gemini с полной поддержкой через командные процедуры в Markdown и префикс через решётку, управляющие полным циклом Deep Work Plan."
kind: adapter
lang: ru
order: 5
agent: Google Gemini
support: full
prefix: '#'
---

# Адаптер Google Gemini

Google Gemini поддерживает DWP через командные процедуры в Markdown.

## Уровень поддержки

**Полная** — каждая команда dwp-* запускается из своего файла процедуры. Требуется Gemini 2.5 Pro или новее для нативного WebFetch.

## Установка

Команды DWP живут как процедуры в Markdown, которые агент читает при вызове.

## Вызов

Используйте префикс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примечания

Gemini читает файлы процедур и выполняет полный последовательный цикл Deep Work Plan.
