---
title: "DWP v7：可委派任务且全程留痕的计划"
description: "Deep Work Plan v7 沿用 v6 的契约与日志，允许计划把有界任务委派给其他智能体，并新增四个可选附加组件。"
date: 2026-10-09
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
  - label: "Skill release v7.7.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.7.0"
  - label: "Skill release v7.8.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.0"
  - label: "Skill release v7.8.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.1"
  - label: "Skill release v7.9.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.9.0"
---

Deep Work Plan v7 沿用 v6 的方法：契约是权威，仅追加的日志是记忆，调度器决定接下来运行什么，只有当记录在案的证据满足任务的标准时，任务才会关闭。v7 增加了委派能力，并对委派结果保持同样的纪律。

授予 `agent_delegation` 的计划可以把任务标记为 `parallel_safe`，并交给另一个智能体。被委派方的回复作为数据记录，绝不作为指令，并保持 `asserted` 状态，直到计划自身的关卡运行器观察到实际结果。只有运行器才能生成 `observed` 证据，因此委派扩大了覆盖范围，却没有降低完成的标准。

四个可选附加组件把委派变为切实可用的自主能力。Herdr 可以在任意机器上，把任务交给某个窗格中的智能体。Agentkit 用一个 `ak` 命令统一所有终端编程智能体，默认启用自主模式并可选择关闭，还能在 git worktree 中以无界面方式运行有界任务。Devcontainer 为每个仓库提供可复现的容器，默认情况下容器内不含任何 SSH 密钥（通过主机代理基于 SSH 使用 git；仅在明确选择 `[ssh] copy_keys` 时才包含密钥文件）。DeepWorkPlan Vim 是一款带有计划浏览器和 Markdown 查看器的终端编辑器。每个组件都通过标签固定到拥有独立仓库的产品，并且无需 Deep Work Plan 即可使用。仓库不启用其中任何一个也完全合规，`.dwp/config.json` 中的注册表记录了已启用的组件。

基准与学习记录模式会记录每个计划所得到的经验，便于事后分析结论。对整个生态系统的审计以 v7 编排计划的形式运行，每个仓库一个智能体，未发现相对 v6 的行为回归：软件包测试套件在干净环境中 807 项全部通过，每个流程的指令负载增长了 0.1% 到 3.9%（整个软件包为 4.6%），以两个标签上的字节数衡量，而非估算为 token。

v7 是编排与可审计性方面的一次跃升，但尚不是完全无人值守的自主能力。7.2.0 版本弥补了该审计发现的缺口：基准与学习现在可以度量 v7 计划，在前置条件未完成时启动任务会被拒绝，测试套件也以密封方式运行（在干净环境中 815 项通过，共 815 项）。智能体结果的非劣效性尚未度量。现有计划保留其记录的代际，绝不会被隐式迁移；新计划默认使用 v7 契约。

7.6.0 版本（2026-10-11）引入了大规模编排：每个仓库或工作流一条泳道（lane），按剩余额度选择账户（`ak usage`、`ak pick`），无人值守启动，以及能检测每个附加组件、升级正在使用的组件并推荐适用组件的引导流程。

7.7.0 版本（2026-10-12）交付了集群自主性（指南 §17）：容量循环（`shared/swarm.py`）、交接数据包（`dwp-handoff-v1`）、带纪元与隔离的组长接替、泳道间请求、AGENT_PROTOCOL §7.5 升级分类（C1–C7：其余一切由智能体自行决策并记录）、质量门槛（关卡是假说，必须经过验证而非断言），以及来自 23 个仓库中 313 个已执行计划的方法论经验。已知限制：v7 日志没有专门记录泳道交接或组长接替的事件（二者记录为一次已取消的委派加一项观察）。

7.8.0 版本（2026-10-13）确立了 Ecosystem 1.0：该技能包整合的每款产品都达到了首个稳定版本，并按语义化版本固定在 v1.0.0（coding-agents-kit、herdr-peers、devcontainer-kit 和 deepworkplan-vim，各自附带经过验证的 `SHA256SUMS` 摘要），同时固定了 AI Diff Reviewer v3.3.14 与 Dailybot agent-skill v3.23.17；随后 7.8.1（2026-10-14）固定了 coding-agents-kit 和 devcontainer-kit 的 v1.0.1 补丁版本。

7.9.0 版本（2026-10-25）将 Herdr 附加组件固定到 herdr-peers v1.1.0，其原生辩论子技能让主导者组织对等智能体评审团进行多轮讨论，并以决策记录收尾；同时将 AI Diff Reviewer 固定在 v3.3.16。技能包的 CI 现在在 ubuntu-24.04 上运行 Python 3.9 最低版本任务。

已安装的技能版本：**7.9.0**，自 7.0.0 起保持稳定。
