---
title: "DWP v8：spec-first，闭环执行"
description: "Deep Work Plan v8 汇集 spec-first 计划、仓库 harness、Loop engineering 与可测效率，推动已批准计划持续运行并完成。"
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: zh
order: 0
featured: true
sourceLabel: "已发布版本与 v8 合约草案"
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

Deep Work Plan v8 汇集四个理念：spec-first 开发、仓库作为智能体 harness、Loop engineering 与可测效率。工作句：“Spec-first，闭环执行：仓库就是 harness，计划自行运行直至完成。”

## 四大支柱

1. **Spec-first**：计划与规范是持久事实来源，包含明确验收标准和验证门槛。2. **仓库即 harness**：上下文、工具、控制规则和可恢复状态与代码共存。3. **Loop engineering**：已批准计划沿记录的生命周期推进直至完成。4. **可测效率**：按每个流程的指令字节数报告并公开测量路径；不推算 token 百分比。

## Loop engineering 的含义

计划登记负责人和有序继任者。由人启动可选 Herdr daemon：herdr-peers autopilot --loop；提示要求继续但不授予新权限。负责人离开时，可请求登记的继任者接手。计划事件可发送至技能包 Dailybot 通知器，fleet 显示已启用机器上的智能体与计划。daemon 由人启动，Herdr addon 可选。

## 承载这些机制的版本

技能包 v7.11.0 加固及 v7.12.x 计划注册和通知版本提供计划侧机制。herdr-peers v1.3.x 增加循环、报告和 fleet；v2.0.0 增加 protocol 2 brain 与队列消费者。coding-agents-kit v1.3.0 提供 pick-v2 启动合约，v1.4.0 增加经验证的更新器。版本链接见上；addon 均可选。

## v8 合约 — RE-VERIFY AT 8.0.0

origin/feat/v8-line 草案为 plan-contract/v8 增加 autonomy：停滞预算、可提示面板、通知目标、brain 行动权限和队列行为。还为 .dwp/queue.json 定义 dwp-queue-v1；技能包写入队列，Herdr 读取。发布前须依据标记为 8.0.0 的工件重新核验这些暂定声明。
