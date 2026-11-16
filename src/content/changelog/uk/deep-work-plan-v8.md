---
title: "DWP v8: spec-first і замкнений цикл"
description: "Deep Work Plan v8 поєднує плани spec-first, репозиторій як harness, Loop engineering і виміряну ефективність; цикл завершує схвалені плани."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: uk
order: 0
featured: true
sourceLabel: "Релізи з тегами та проєкт контракту v8"
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

Deep Work Plan v8 поєднує розробку spec-first, репозиторій як harness агента, Loop engineering і виміряну ефективність. Робоче речення: «Spec-first, замкнений цикл: репозиторій є harness, а план сам виконується до завершення».

## Чотири засади

1. **Spec-first:** план і специфікація — тривале джерело істини з критеріями приймання й перевірками. 2. **Репозиторій — harness:** контекст, інструменти, правила та стан відновлення поруч із кодом. 3. **Loop engineering:** схвалений план проходить записаний цикл до завершення. 4. **Виміряна ефективність:** байти інструкцій на потік із відкритим шляхом вимірювання; без відсотків токенів.

## Що означає Loop engineering

План реєструє керівника й упорядкованих наступників. Людина запускає необов’язковий daemon Herdr командою herdr-peers autopilot --loop; нагадування просять продовжити без нових повноважень. За відсутності керівника наступник може перебрати роль. Події надходять до сповіщувача Dailybot; fleet показує агентів і плани на ввімкнених машинах. Daemon запускає людина; Herdr необов’язковий.

## Релізи з механізмами

Посилення пакета v7.11.0 і випуски v7.12.x з реєстрацією планів та сповіщеннями забезпечують механізми плану. herdr-peers v1.3.x додає цикл, звіти й fleet; v2.0.0 — brain протоколу 2 і споживач черги. coding-agents-kit v1.3.0 надає pick-v2, v1.4.0 перевірений оновлювач. Теги наведені вище; addon необов’язкові.

## Контракт v8 — RE-VERIFY AT 8.0.0

Проєкт origin/feat/v8-line додає autonomy до plan-contract/v8: бюджет простою, панелі для нагадувань, адресатів, дозвіл brain діяти й поведінку черги. Він також визначає dwp-queue-v1 для .dwp/queue.json; пакет записує чергу, Herdr читає. Перед публікацією ці попередні твердження слід звірити з артефактами тегу 8.0.0.
