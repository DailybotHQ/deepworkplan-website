---
title: "DWP v8：spec-first，闭环执行"
description: "Deep Work Plan v8 汇集 spec-first 计划、仓库 harness、Loop engineering 与可测效率，推动已批准计划持续运行并完成。"
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: zh
order: 0
featured: true
sourceLabel: "Skill v8.0.0 发布"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Skill v8.0.0 发布"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Skill v8.0.1 发布"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "Skill v8.0.4 发布"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.4"
  - label: "LOOP_ENGINEERING.md（v8 规范）"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "规范阅读器中的 Loop engineering"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "plan-contract/v8 架构"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "journal-event/v8 架构"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "plan-snapshot/v8 架构"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "计划队列写入器（shared/queue.py）"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Skill v7.11.0 发布"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill v7.12.0 发布"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill v7.12.2 发布"
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
  - label: "coding-agents-kit v1.5.1"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.1"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 汇集四个理念：spec-first 开发、仓库作为智能体 harness、Loop engineering 与可测效率。工作句是：“Spec-first, loop-closed: 仓库就是 harness，计划自行运行直至完成。”

## 四大支柱

1. **Spec-first。** 计划及其规范是持久的事实来源，并设有明确的验收标准和验证门槛。
2. **仓库就是 harness。** 上下文、工具、控制规则和可恢复状态与代码共存，让不同智能体都能基于同一仓库工作。
3. **Loop engineering。** 已批准的计划可以沿着记录的生命周期持续推进，直到完成。
4. **可测效率。** 效率以每个流程的指令字节数报告，并提供公开的测量路径；不推算 token 百分比。

## Loop engineering 的含义

计划登记负责人及有序继任者。由人启动可选的 Herdr daemon：`herdr-peers autopilot --loop`；其提醒要求负责人继续，但不会授予新权限。负责人离开后，循环可请求指定继任者接手。计划事件可发送至技能包的 Dailybot 通知器，fleet 视图展示已启用机器上的智能体和计划。daemon 由人负责启动，Herdr addon 为可选项。

## 承载这些机制的版本

技能包 v7.11.0 的加固以及 v7.12.x 的计划注册和通知版本提供计划侧机制。herdr-peers v1.3.x 增加循环、报告和 fleet 视图；v2.0.0 增加 protocol 2 brain 和队列消费者。coding-agents-kit v1.3.0 提供 pick-v2 启动合约，v1.4.0 增加经验证的更新器。herdr-peers v2.1.0 可读取 v8 结构化阻塞，coding-agents-kit v1.5.0 增加仅报告已有数据的 token 计量；技能包 8.0.0 addon 描述符固定使用 herdr-peers v2.1.0、coding-agents-kit v1.5.0 和 devcontainer-kit v1.3.0。上方链接列出了这些已标记版本。没有这些可选 addon，技能包仍可使用。

## v8 合约

8.0.0 版本实现 DWP 标准 8.0.0。新计划使用 `plan-contract/v8`；v7、v6 和 v5 计划保留各自记录的代际，只能通过显式的 `refine migrate` 迁移。v8 计划继续使用 `plan-manifest/v7`，并继续支持现有计划的 `journal-event/v7`。规范来源是 `LOOP_ENGINEERING.md`，另有三个已发布架构。

- **`autonomy` 块。** `plan-contract/v8` 中可选且封闭的块，用于记录计划的循环权限：`stall_budget`（1–10，默认 3）、`promptable` 面板（默认仅负责人）、`notify` 目标（默认无）、`brain`（默认 `false`）和 `queue`（`prompt-lead`、`launch` 或 `none`，默认 `none`）。缺少该块时采用全部默认值，仍由人类解决问题。
- **结构化阻塞。** 阻塞是 `journal-event/v8` 的 `blocker` 事件，只能通过 ledger helper 创建和解决，包含任务、原因、一行 `needs`、C1–C7 必需类别以及可选 resolver。C1、C2、C5 和 C6 不接受 `resolver: lead`；循环只会请求负责人处理计划自身标记为 `resolver: lead` 的阻塞。`state.json` 转为 `plan-snapshot/v8`，包含当前阻塞和派生的 `blocked` 状态；`PROGRESS.md` 以四行头部开篇：目标、当前任务、下一步行动和需求。
- **计划队列。** `.dwp/queue.json`（`dwp-queue-v1`）只能由技能包的 `shared/queue.py` 或人类写入；获批时 `create` 会追加计划，Herdr daemon 只读取队列。队列最多包含 64 个计划；每个仓库一次运行一个计划，除非计划设置 `parallel: true`；队列损坏不会中断生命周期。

v7 的最后一个版本是 **7.12.2**。

已安装的技能版本：**8.0.4**。
