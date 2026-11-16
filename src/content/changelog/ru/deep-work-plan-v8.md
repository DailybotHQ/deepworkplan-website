---
title: "DWP v8: spec-first и замкнутый цикл"
description: "Deep Work Plan v8 объединяет планы spec-first, репозиторий как harness, Loop engineering и измеряемую эффективность; цикл завершает одобренные планы."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: ru
order: 0
featured: true
sourceLabel: "Релизы с тегами и черновик контракта v8"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
sourceLinks:
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
---

Deep Work Plan v8 объединяет spec-first-разработку, репозиторий как harness агента, Loop engineering и измеряемую эффективность. Рабочая формулировка: «Spec-first, замкнутый цикл: репозиторий — harness, а план сам выполняется до конца».

## Четыре опоры

1. **Spec-first:** план и спецификация — долговременный источник истины с явными критериями приёмки и проверками. 2. **Репозиторий — harness:** контекст, инструменты, правила и возобновляемое состояние хранятся рядом с кодом. 3. **Loop engineering:** одобренный план проходит записанный цикл до завершения. 4. **Измеряемая эффективность:** байты инструкций на поток с опубликованным методом; проценты токенов не выводятся.

## Что означает Loop engineering

План регистрирует лидера и упорядоченных преемников. Человек запускает необязательный daemon Herdr командой herdr-peers autopilot --loop; напоминания просят продолжить, не добавляя полномочий. При отсутствии лидера преемник может принять руководство. События плана поступают в уведомитель Dailybot, а fleet показывает агентов и планы на включённых машинах. Daemon запускает человек; Herdr необязателен.

## Релизы с нужными механизмами

Усиление пакета в v7.11.0 и выпуски v7.12.x с регистрацией планов и уведомлениями дают механизмы плана. herdr-peers v1.3.x добавляет цикл, отчёты и fleet; v2.0.0 — brain протокола 2 и обработчик очереди. coding-agents-kit v1.3.0 предоставляет pick-v2, v1.4.0 — проверенное обновление. Ссылки на теги выше; addon необязательны.

## Контракт v8 — RE-VERIFY AT 8.0.0

Черновик origin/feat/v8-line добавляет autonomy в plan-contract/v8: лимит застоя, адресатов напоминаний, цели уведомлений, право brain действовать и поведение очереди. Он определяет dwp-queue-v1 для .dwp/queue.json; пакет записывает очередь, Herdr читает. Перед публикацией утверждения нужно сверить с артефактами тега 8.0.0.
