---
title: "DWP v6: та сама методика, суворіший контракт"
description: "Deep Work Plan v6 зберігає методологію v5 і додає суворішу структуру виконання. Не-гіршість результатів агентів поки не вимірювалася."
date: 2026-09-28
version: "v6 · Суворіша структура"
kind: release
lang: uk
order: 0
featured: true
sourceLabel: "Опублікований набір схем v6"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6 зберігає методологію v5, набір команд і розташування `.dwp/plans/`. Він додає суворішу структуру для представлення повноважень плану, доказів виконання, контексту завдань, планування та активного стану.

Набір схем v6 визначає маніфест ідентичності, контракт результатів і повноважень, події журналу лише для додавання, маніфест контексту для завдання та активний знімок. Активна проєкція v6 — це знімок, тому `plan-state/v5.json` залишається схемою стану для планів v5; `plan-state/v6.json` не існує. Наявні плани зберігають зафіксоване покоління і ніколи не переписуються непомітно.

Архітектурне рішення — GO: v6 зберігає ту саму методологію із суворішою інженерною структурою. Це не твердження про емпіричну перевагу. Не-гіршість результатів агентів не вимірювалася.

Нові плани отримують монотонно зростаючі числові ID завдовжки щонайменше три цифри (наприклад, `PLAN_001_add_payment_webhooks/`). Заморожені схеми v5 рахують числовий ID як одне слово, тому slug v5 містить 2–4 слова, а slug v6 — 2–5. Наявні папки без номера `PLAN_<slug>/` залишаються доступними для читання й ніколи не перейменовуються. Якщо є нумеровані плани, `latest` вказує на план із найбільшим числовим ID.
