---
title: OpenClaw
description: "面向 OpenClaw 的 DWP 适配器：原生 .agents/skills 扫描、无人值守执行映射，以及由 cron 驱动的计划续行，适用于自主代理工作区。"
kind: adapter
lang: zh
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# OpenClaw 适配器

OpenClaw 是一个自主代理平台，运行具有计划轮次的长期工作区。它原生扫描 `<workspace>/.agents/skills/`，因此 DWP 技能无需任何适配垫片即可加载——将其安装在该目录后，OpenClaw 便会自动识别。

## 支持级别

**完整** —— OpenClaw 读取 `AGENTS.md` 并通过 AgentSkills 标准加载技能。所有 DWP 子技能（`onboard`、`create`、`execute`、`refine`、`resume`、`status`、`verify`）均可使用。

## 安装

```bash
openclaw skills install deepworkplan
```

或手动操作：将 `DailybotHQ/deepworkplan-skill` 克隆到 `<workspace>/.agents/skills/deepworkplan/`。

## 调用

纯文本——OpenClaw 不使用斜杠命令前缀：

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## 无人值守执行映射

OpenClaw 的调度原语直接对应 DWP 的续行模型：

| OpenClaw 原语 | DWP 角色 |
|--------------------|----------|
| 工作区根目录 | [代理工作区](/spec/archetypes) 原型：`AGENTS.md`、`.agents/`、`.dwp/` 位于工作区根目录 |
| `<workspace>/.agents/skills/`（原生二级扫描） | 本套件所在之处——无需适配垫片 |
| 心跳或 cron 轮次 | 一次[计划续行](/spec/agent-protocol#scheduled-continuation)轮次：唤醒 → DWP 恢复协议 → 下一个原子任务 → 更新状态 → 让出 |
| `HEARTBEAT.md` 检查 | 添加一行："若 `.dwp/plans/` 中有未完成的计划，续行执行一个任务。" |
| 常设指令 | 计划审批边界以及无人值守配置文件的受限权限范围 |

操作流程：

1. 人类以交互方式创建并审批一份计划。审批是控制点——无人值守轮次绝不在单次轮次内既创建又执行计划。
2. 计划必须携带机器可读状态层（`manifest.json` + `state.json`）。在没有 git 的工作区中，`state.json` 是实现崩溃安全续行的关键。参见 [Plan state](/spec/plan-state)。
3. 每次心跳或 cron 轮次最多执行一项任务，通过其验证关卡，原子性地更新 `state.json`，然后让出。
4. 遇到任何停止条件时，代理将 `state.json` 的 `blocked` 字段写入并通过工作区的正常渠道报告。下一次人工查看——或心跳报告——会准确显示所需信息。

结果是：一份历经重启、模型更换与会话边界而仍能存续的多日计划，由守护进程在夜间执行——拥有与人工监督运行完全相同的验证关卡。

## 备注

OpenClaw 的工作区是[代理工作区](/spec/archetypes)原型的典型示例。DWP 技能套件的 `HEARTBEAT.md` 集成与 `state.json` 要求正是为该平台而设计的。
