---
title: "DWP v8: spec-first і замкнений цикл"
description: "Deep Work Plan v8 поєднує плани spec-first, репозиторій як harness, Loop engineering і виміряну ефективність; цикл завершує схвалені плани."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: uk
order: 0
featured: true
sourceLabel: "Реліз skill v8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Реліз skill v8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Реліз skill v8.0.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "Реліз skill v8.0.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.2"
  - label: "LOOP_ENGINEERING.md (нормативний документ v8)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "Loop engineering у переглядачі специфікації"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "Схема plan-contract/v8"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "Схема journal-event/v8"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "Схема plan-snapshot/v8"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "Запис черги планів (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Реліз skill v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Реліз skill v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Реліз skill v7.12.2"
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

Deep Work Plan v8 поєднує чотири ідеї: розробку spec-first, репозиторій як harness агента, Loop engineering і виміряну ефективність. Робоче речення: «Spec-first, loop-closed: репозиторій є harness, а план сам виконується до завершення».

## Чотири засади

1. **Spec-first.** План і його специфікація — довговічне джерело істини з чіткими критеріями приймання та перевірками.
2. **Репозиторій є harness.** Контекст, інструменти, правила керування та стан відновлення зберігаються поруч із кодом, щоб різні агенти працювали в одному репозиторії.
3. **Loop engineering.** Схвалений план може пройти записаний життєвий цикл до завершення.
4. **Виміряна ефективність.** Ефективність подається в байтах інструкцій на потік із опублікованим шляхом вимірювання; відсотки токенів не виводяться.

## Що означає Loop engineering

План реєструє керівника й упорядкованих наступників. Людина запускає необов’язковий daemon Herdr командою `herdr-peers autopilot --loop`; нагадування просять керівника продовжити, не надаючи нових повноважень. Якщо керівник недоступний, цикл може попросити зазначеного наступника перебрати роль. Події плану можуть надходити до сповіщувача Dailybot пакета, а мапа fleet показує агентів і плани на ввімкнених машинах. Daemon запускає людина; addon Herdr необов’язковий.

## Релізи з механізмами

Посилення пакета v7.11.0 і релізи v7.12.x з реєстрацією планів та сповіщеннями забезпечують механізми плану. herdr-peers v1.3.x додає цикл, звіти й мапу fleet; v2.0.0 додає brain протоколу 2 і споживач черги. coding-agents-kit v1.3.0 надає контракт запуску pick-v2, а v1.4.0 — перевірений оновлювач. herdr-peers v2.1.0 читає структуровані blocker v8, а coding-agents-kit v1.5.0 вимірює лише повідомлені токени. Дескриптори addon пакета 8.0.0 фіксують herdr-peers v2.1.0, coding-agents-kit v1.5.0 і devcontainer-kit v1.3.0. Посилання на релізи з тегами наведені вище. Пакет працює і без цих необов’язкових addon.

## Контракт v8

Реліз 8.0.0 реалізує стандарт DWP 8.0.0. Нові плани створюються за `plan-contract/v8`; плани v7, v6 і v5 зберігають записане покоління та переходять лише через явну міграцію `refine migrate`. Плани v8 зберігають лінію `plan-manifest/v7`, а `journal-event/v7` і далі підтримується для наявних планів. Нормативне джерело — `LOOP_ENGINEERING.md` і три опубліковані схеми.

- **Блок `autonomy`.** Необов’язковий закритий блок `plan-contract/v8`, що реєструє повноваження циклу плану: `stall_budget` (1–10, типово 3), панелі `promptable` (типово лише керівник), цілі `notify` (типово немає), `brain` (типово `false`) і `queue` (`prompt-lead`, `launch` або `none`, типово `none`). За відсутності блоку застосовуються всі типові значення, а вирішення залишається за людиною.
- **Структуровані blocker.** Blocker — це подія `blocker` з `journal-event/v8`, яку створюють і вирішують лише через helper ledger. Вона містить завдання, причину, один рядок `needs`, обов’язковий клас C1–C7 і необов’язковий resolver. `resolver: lead` відхиляється для C1, C2, C5 і C6; цикл просить керівника вирішити лише blocker, який сам план позначив як `resolver: lead`. `state.json` стає `plan-snapshot/v8` з активним blocker і похідним станом `blocked`; `PROGRESS.md` починається із заголовка на чотири рядки: мета, поточне завдання, наступна дія та потреби.
- **Черга планів.** `.dwp/queue.json` (`dwp-queue-v1`) може записувати лише `shared/queue.py` пакета або людина; після схвалення `create` додає план, а daemon Herdr тільки читає чергу. Черга вміщує до 64 планів і запускає по одному плану на репозиторій, якщо план не задає `parallel: true`. Пошкоджена черга не перериває життєвий цикл.

Останнім релізом v7 був **7.12.2**.

Встановлений реліз skill: **8.0.2**.
