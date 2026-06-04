---
title: GitHub Copilot
description: "Адаптер DWP для GitHub Copilot с частичной поддержкой через командные процедуры в Markdown и префикс через решётку; часть автоматизации выполняется вручную."
kind: adapter
lang: ru
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# Адаптер GitHub Copilot

GitHub Copilot поддерживает DWP через командные процедуры в Markdown.

## Уровень поддержки

**Частичная** — основные команды работают через файлы процедур; часть автоматизации выполняется вручную.

## Установка

Команды DWP живут как процедуры в Markdown в репозитории.

## Вызов

Используйте префикс `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Примечания

Copilot читает файлы процедур, но обладает меньшей автономностью выполнения, чем Claude Code.
