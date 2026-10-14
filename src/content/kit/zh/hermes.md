---
title: Hermes
description: "面向 Hermes 的 DWP 适配器：AgentSkills 标准技能加载、通过 state.json 中 outcome 记录实现的情节记忆协同，以及由 cron 驱动的计划续行。"
kind: adapter
lang: zh
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Hermes 适配器

Hermes 是一个自主代理平台，通过 AgentSkills 标准加载技能，并在会话之间维护情节记忆。DWP 与这两个层面均有集成：技能套件从 `.agents/skills/` 加载，方式与任何其他 AgentSkills 兼容套件相同；而 `state.json` 的 outcome 记录则直接馈送到 Hermes 的记忆索引中。

在 v6 与 v7 计划中，状态是通过 `ledger.py project` 从仅追加日志（`journal.ndjson`）中投影出来的，而不是手动重写状态文件。

## 支持级别

**完整**（已文档化）—— Hermes 读取 `AGENTS.md` 并通过 AgentSkills 标准加载技能。所有 DWP 子技能均可使用。

## 安装

将技能套件安装到工作区的 `.agents/skills/` 目录，或使用平台的技能管理器（如有）。

## 调用

纯文本：

```
create a plan for <goal>
resume the open plan
```

## 情节记忆协同

在 v6 与 v7 计划中，DWP 的确定性验证凭证（`outcomes.py receipt`）和 outcome 记录直接馈入 Hermes 的记忆索引：每个完成的任务都在结构化 JSON 模式中携带尝试过的内容、失败的内容以及有效的内容。完成的计划成为可检索的情节记忆——代理可以回忆起具体问题是如何解决的。

临时会话将事件追加到 `journal.ndjson` 并通过 `ledger.py project` 投影 `state.json`，而不是手动重写状态文件。参见 [Plan state](/spec/plan-state#outcome-records-as-episodic-memory)。

## Cron 驱动的续行

在具有 cron 调度的平台上，续行遵循与其他自主平台相同的模式：每次计划轮次唤醒、运行 DWP 恢复协议、最多执行一项任务、更新 `state.json`，然后让出。计划——而非会话——是连续性的单元。

无人值守执行 REQUIRED 机器可读状态层（`manifest.json` + `state.json`）。完整的停止条件与上报协议参见 [Agent protocol](/spec/agent-protocol#execution-profiles)。

## 备注

Hermes 与 OpenClaw 均为 [代理协议](/spec/agent-protocol) 中受支持代理表里的自主代理平台。二者均在无人值守执行配置文件下运行，均受益于代理工作区原型中 `state.json` 等价于 git 日志的设计。
