---
title: Google Gemini
description: "Адаптер DWP для Google Gemini с частичной поддержкой через командные процедуры в Markdown и префикс через решётку, управляющие последовательным рабочим процессом."
kind: adapter
lang: ru
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# Адаптер Google Gemini

Google Gemini поддерживает DWP через командные процедуры в Markdown.

## Уровень поддержки

**Частичная** — основные команды работают через файлы процедур.

## Установка

Команды DWP живут как процедуры в Markdown, которые читает агент.

## Вызов

Используйте префикс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примечания

Gemini читает файлы процедур и выполняет последовательный рабочий процесс DWP.
