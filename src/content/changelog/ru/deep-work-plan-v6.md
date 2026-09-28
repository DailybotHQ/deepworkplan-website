---
title: "DWP v6: та же методика, более строгий контракт"
description: "Deep Work Plan v6 сохраняет методологию v5 и добавляет более строгую структуру выполнения. Неухудшение результатов агентов не измерялось."
date: 2026-09-28
version: "v6 · Более строгая структура"
kind: release
lang: ru
order: 0
featured: true
sourceLabel: "Опубликованный набор схем v6"
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

Deep Work Plan v6 сохраняет методологию v5, набор команд и расположение `.dwp/plans/`. Он добавляет более строгую структуру для представления полномочий плана, доказательств выполнения, контекста задачи, планирования и текущего состояния.

Набор схем v6 определяет манифест идентичности, контракт результатов и полномочий, события журнала только для добавления, манифест контекста для каждой задачи и активный снимок. Активная проекция v6 — это снимок, поэтому `plan-state/v5.json` остаётся схемой состояния для планов v5; `plan-state/v6.json` не существует. Существующие планы сохраняют записанное поколение и никогда не переписываются незаметно.

Архитектурное решение — GO: v6 сохраняет ту же методологию с более строгой инженерной структурой. Это не заявление об эмпирическом превосходстве. Неухудшение результатов агентов не измерялось.

Новые планы получают монотонно возрастающие числовые ID длиной не менее трёх цифр (например, `PLAN_001_add_payment_webhooks/`). Замороженные схемы v5 считают числовую ID одним словом, поэтому slug v5 содержит 2–4 слова, а slug v6 — 2–5. Существующие папки без номера `PLAN_<slug>/` остаются доступными для чтения и никогда не переименовываются. Если есть нумерованные планы, `latest` указывает на план с наибольшим числовым ID.
