---
title: "DWP v7：可委派任务且全程留痕的计划"
description: "Deep Work Plan v7 沿用 v6 的契约与日志，允许计划把有界任务委派给其他智能体，并新增四个可选附加组件。"
date: 2026-10-10
version: "v7 · 带证据的委派"
kind: release
lang: zh
order: 0
featured: true
sourceLabel: "已发布的 v7 架构集合"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
---

Deep Work Plan v7 沿用 v6 的方法：契约是权威，仅追加的日志是记忆，调度器决定接下来运行什么，只有当记录在案的证据满足任务的标准时，任务才会关闭。v7 增加了委派能力，并对委派结果保持同样的纪律。

授予 `agent_delegation` 的计划可以把任务标记为 `parallel_safe`，并交给另一个智能体。被委派方的回复作为数据记录，绝不作为指令，并保持 `asserted` 状态，直到计划自身的关卡运行器观察到实际结果。只有运行器才能生成 `observed` 证据，因此委派扩大了覆盖范围，却没有降低完成的标准。

四个可选附加组件把委派变为切实可用的自主能力。Herdr 可以在任意机器上，把任务交给某个窗格中的智能体。Agentkit 用一个 `ak` 命令统一所有终端编程智能体，默认启用自主模式并可选择关闭，还能在 git worktree 中以无界面方式运行有界任务。Devcontainer 为每个仓库提供可复现的容器，容器内不含任何 SSH 密钥。DeepWorkPlan Vim 是一款带有计划浏览器和 Markdown 查看器的终端编辑器。每个组件都通过标签固定到拥有独立仓库的产品，并且无需 Deep Work Plan 即可使用。仓库不启用其中任何一个也完全合规，`.dwp/config.json` 中的注册表记录了已启用的组件。

基准与学习记录模式会记录每个计划所得到的经验，便于事后分析结论。对整个生态系统的审计以 v7 编排计划的形式运行，每个仓库一个智能体，未发现相对 v6 的行为回归：软件包测试套件在干净环境中 807 项全部通过，每个流程的指令负载增长了 0.1% 到 3.9%（整个软件包为 4.6%），以两个标签上的字节数衡量，而非估算为 token。

v7 是编排与可审计性方面的一次跃升，但尚不是完全无人值守的自主能力。基准与学习循环目前还不能自动度量 v7 计划，智能体结果的非劣效性也尚未度量。现有计划保留其记录的代际，绝不会被隐式迁移；新计划默认使用 v7 契约。

已安装的技能版本：**7.1.4**，自 7.0.0 起保持稳定。
