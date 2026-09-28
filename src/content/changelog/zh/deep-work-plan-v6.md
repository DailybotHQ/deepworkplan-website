---
title: "DWP v6：方法不变，契约更严格"
description: "Deep Work Plan v6 保留 v5 方法论，并增加更严格的执行结构。尚未在实际软件任务中测量代理结果的非劣效性。"
date: 2026-09-28
version: "v6 · 更严格的结构"
kind: release
lang: zh
order: 0
featured: true
sourceLabel: "已发布的 v6 架构集合"
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

Deep Work Plan v6 保留 v5 方法论、命令界面和 `.dwp/plans/` 位置。它增加了更严格的结构，以表示计划授权、执行证据、任务上下文、调度和实时状态。

v6 架构集合定义身份清单、结果与授权契约、只追加日志事件、逐任务上下文清单和实时快照。v6 实时投影是快照，因此 `plan-state/v5.json` 仍是 v5 计划的状态架构；不存在 `plan-state/v6.json`。现有计划保留其记录的代际，不会被静默重写。

架构决策为 GO：v6 保留相同方法论并采用更严格的工程结构。这不是经验性优越声明。尚未测量代理结果的非劣效性。

新计划会获得至少三位数、单调递增的数字 ID（例如 `PLAN_001_add_payment_webhooks/`）。冻结的 v5 schema 会把数字 ID 计作一个单词，因此 v5 slug 为 2–4 个单词；v6 slug 为 2–5 个单词。现有未编号的 `PLAN_<slug>/` 文件夹继续可读，且永不重命名。存在编号计划时，`latest` 指向数字 ID 最大的计划。

已安装的技能版本：**6.0.1**。6.x 技能包默认使用 v6 创建新计划。现有计划保留记录的代际；迁移必须明确请求并先行预览。
