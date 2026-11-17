---
title: "DWP v8: spec-first и замкнутый цикл"
description: "Deep Work Plan v8 объединяет планы spec-first, репозиторий как harness, Loop engineering и измеряемую эффективность; цикл завершает одобренные планы."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: ru
order: 0
featured: true
sourceLabel: "Релиз skill v8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Релиз skill v8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Релиз skill v8.0.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "Релиз skill v8.0.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.2"
  - label: "LOOP_ENGINEERING.md (нормативный документ v8)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "Loop engineering в обозревателе спецификации"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "Схема plan-contract/v8"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "Схема journal-event/v8"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "Схема plan-snapshot/v8"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "Запись очереди планов (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Релиз skill v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Релиз skill v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Релиз skill v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.0"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 объединяет четыре идеи: разработку spec-first, репозиторий как harness агента, Loop engineering и измеренную эффективность. Рабочая фраза: «Spec-first, loop-closed: репозиторий — это harness, а план самостоятельно движется до завершения».

## Четыре принципа

1. **Spec-first.** План и его спецификация — долговечный источник истины с явными критериями приемки и проверками.
2. **Репозиторий — это harness.** Контекст, инструменты, правила управления и возобновляемое состояние хранятся рядом с кодом, чтобы разные агенты работали в одном репозитории.
3. **Loop engineering.** Утвержденный план может проходить записанный жизненный цикл до завершения.
4. **Измеренная эффективность.** Эффективность выражается в байтах инструкций на поток с опубликованным способом измерения; проценты токенов не выводятся расчетом.

## Что означает Loop engineering

В плане регистрируются ведущий и упорядоченные преемники. Человек запускает необязательный daemon Herdr командой `herdr-peers autopilot --loop`; его напоминания просят ведущего продолжить, не предоставляя новых полномочий. Если ведущий недоступен, цикл может попросить указанного преемника принять роль. События плана могут поступать в уведомитель Dailybot пакета, а карта fleet показывает агентов и планы на включенных машинах. Запуск daemon остается ответственностью человека; addon Herdr необязателен.

## Релизы с этими механизмами

Укрепление пакета v7.11.0 и выпуски v7.12.x с регистрацией планов и уведомлениями предоставляют механизмы на стороне плана. herdr-peers v1.3.x добавляет цикл, отчеты и карту fleet; v2.0.0 добавляет brain протокола 2 и потребителя очереди. coding-agents-kit v1.3.0 предоставляет контракт запуска pick-v2, а v1.4.0 — проверенный обновлятор. herdr-peers v2.1.0 читает структурированные блокировки v8, а coding-agents-kit v1.5.0 измеряет только сообщенные значения токенов. Дескрипторы addon пакета 8.0.0 фиксируют herdr-peers v2.1.0, coding-agents-kit v1.5.0 и devcontainer-kit v1.3.0. Ссылки на версии с тегами приведены выше. Пакет работает и без этих необязательных addon.

## Контракт v8

Релиз 8.0.0 реализует стандарт DWP 8.0.0. Новые планы создаются по `plan-contract/v8`; планы v7, v6 и v5 сохраняют записанное поколение и мигрируют только через явную команду `refine migrate`. Планы v8 сохраняют линию `plan-manifest/v7`, а `journal-event/v7` продолжает поддерживаться для существующих планов. Нормативный источник — `LOOP_ENGINEERING.md` и три опубликованные схемы.

- **Блок `autonomy`.** Необязательный закрытый блок `plan-contract/v8`, записывающий полномочия цикла плана: `stall_budget` (1–10, по умолчанию 3), панели `promptable` (по умолчанию только ведущий), цели `notify` (по умолчанию отсутствуют), `brain` (по умолчанию `false`) и `queue` (`prompt-lead`, `launch` или `none`, по умолчанию `none`). Если блока нет, действуют все значения по умолчанию, а разрешение остается за человеком.
- **Структурированные блокировки.** Блокировка — это событие `blocker` из `journal-event/v8`, которое создается и разрешается только через ledger helper. Оно содержит задачу, причину, строку `needs`, обязательный класс C1–C7 и необязательный resolver. Для C1, C2, C5 и C6 значение `resolver: lead` отклоняется; цикл просит ведущего разрешить только блокировку, которую сам план пометил `resolver: lead`. `state.json` становится `plan-snapshot/v8` с активной блокировкой и производным статусом `blocked`; `PROGRESS.md` начинается с четырех строк: цель, текущая задача, следующее действие и потребности.
- **Очередь планов.** `.dwp/queue.json` (`dwp-queue-v1`) записывается только `shared/queue.py` пакета или человеком; при утверждении `create` добавляет план, а daemon Herdr только читает очередь. Она содержит не более 64 планов и выполняет по одному плану на репозиторий, если план не задает `parallel: true`. Поврежденная очередь не прерывает жизненный цикл.

Последним релизом v7 был **7.12.2**.

Установленный релиз skill: **8.0.2**.
