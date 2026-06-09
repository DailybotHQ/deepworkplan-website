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

## 支持级别

**完整** —— Hermes 读取 `AGENTS.md` 并通过 AgentSkills 标准加载技能。所有 DWP 子技能均可使用。

## 安装

将技能套件安装到工作区的 `.agents/skills/` 目录，或使用平台的技能管理器（如有）。

## 调用

纯文本：

```
create a plan for <goal>
resume the open plan
```

## 情节记忆协同

Hermes 为代理记忆建立索引，使过去的工作可在未来的会话中检索。DWP 的 `state.json` outcome 记录正是为此而设计：每项已完成的任务都在一个结构化 JSON 字段中记录了尝试了什么（`tried`）、失败了什么（`failed`）、有效的是什么（`worked`）以及自由格式的备注。当 Hermes 对工作区的 `.dwp/plans/` 状态文件建立索引时，已完成的计划便成为可检索的情节记忆——代理日后可以回想起某个特定问题是如何解决的，而不仅仅是知道一份计划运行过。

这意味着 DWP 计划在 Hermes 上以两种方式持久存在：Markdown 文件是人类可读的记录，而 `state.json` 的 outcome 记录是机器可索引的记忆。参见 [Plan state](/spec/plan-state#outcome-records-as-episodic-memory)。

## Cron 驱动的续行

在具有 cron 调度的平台上，续行遵循与其他自主平台相同的模式：每次计划轮次唤醒、运行 DWP 恢复协议、最多执行一项任务、更新 `state.json`，然后让出。计划——而非会话——是连续性的单元。

无人值守执行 REQUIRED 机器可读状态层（`manifest.json` + `state.json`）。完整的停止条件与上报协议参见 [Agent protocol](/spec/agent-protocol#execution-profiles)。

## 备注

Hermes 与 OpenClaw 均为 [代理协议](/spec/agent-protocol) 中受支持代理表里的自主代理平台。二者均在无人值守执行配置文件下运行，均受益于代理工作区原型中 `state.json` 等价于 git 日志的设计。
