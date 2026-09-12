---
title: "DWP v4：贴合工作的计划"
description: "Deep Work Plan v4 让计划的形式服从于工作本身，而不是反过来——Lite 计划现在是面向范围明确任务的完整、可执行提案，独立的草稿暂存环节已被取消。"
date: 2026-09-11
version: "v4 · Lite 优先的计划"
kind: release
lang: zh
order: 2
featured: false
sourceLabel: "Skill release commit 3daab90"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/3daab90"
---

今天，我们发布 Deep Work Plan v4。这次发布关乎敏捷性与多面性：同一套方法论，面对范围明确的小改动时应当足够轻盈，面对持续数小时甚至数天的工作时依然经得起考验，而不必让开发者仅仅为了获得真正的关卡而去选择「正式」的形式。

为范围明确的工作创建计划，不再意味着先写一份用于审阅的一次性草稿，再另外编写一份最终计划。`create` 现在会直接生成一份 **Lite 计划**：一份紧凑、完全可执行的提案，包含内联的任务记录，每条记录都有各自的验收标准、验证关卡与完成日志。不再有 `.dwp/drafts/` 暂存环节——草稿与计划是同一份成果物，从写下的那一刻起就既可审阅、也可执行。

以文件为单位的 Full 计划仍然保留在它应有的位置：更长、风险更高的工作依旧按任务拆分为独立文件，配有专门的分析记录，并使用同样可恢复的状态层。当某项需求或验证关卡在紧凑记录中已经放不下时，Lite 计划可以随时升级为 Full；而从哪种形式起步，遵循的是任务数量、触及范围、风险、可逆性等明确且被记录下来的信号——而不是猜测。

本次发布遵循 DWP 标准 `2.4.0`。阅读[规范文档](https://deepworkplan.com/spec)、探索[工具包](https://deepworkplan.com/kit/)，或从 [`/init`](https://deepworkplan.com/init) 开始采用。
