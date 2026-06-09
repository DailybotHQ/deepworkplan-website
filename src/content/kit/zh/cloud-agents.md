---
title: Cloud agents
description: "面向云端与后台代理的 DWP 适配器：Claude Code 远程任务、Codex 云、Jules 类代理——临时会话依托持久的 .dwp/ 计划执行。"
kind: adapter
lang: zh
order: 12
agent: Cloud agents
support: full
prefix: plain text
---

# 云端代理适配器

云端与后台代理——Claude Code 远程任务、OpenAI Codex 云端、Jules 类代理及类似的异步执行环境——在设计上是临时性的：一次会话启动、运行有限时长，然后终止。DWP 将这一限制转化为优势，使计划成为持久产物，而非会话。

## 核心洞察

代码仓库的 `.dwp/` 目录是**持久的规范与状态层**。云端会话是**临时的执行者**。计划告诉执行者该做什么；`state.json` 告诉它从哪里续行。会话可以是任何东西——不同的模型、不同的提供商、全新的容器——计划将从上次离开的确切位置继续。

## 支持级别

**完整** —— 任何能够读取代码仓库、遵循 `AGENTS.md` 并可执行 shell 命令的云端代理，均无需特定于平台的适配器即可支持 DWP。

## 唤醒-续行-让出循环

每次云端代理轮次遵循以下模式：

1. **唤醒** —— 会话启动（由 cron 计划、CI 事件或用户操作触发）。
2. **运行 DWP 恢复协议** —— 读取计划 README，定位检查点，将 `state.json` 与 Markdown 对照核对，检查接缝，运行冒烟测试。参见 [DWP specification](/spec/dwp-specification#the-dwp-resume-protocol)。
3. **检查阻塞状态** —— 若 `state.json.blocked` 已设置，报告原因并让出，不执行任何操作。
4. **执行下一个原子任务** —— 一项任务，通过其完整的验证关卡。
5. **更新状态层** —— 以新的任务状态、关卡记录、outcome 记录和提交哈希原子性地重写 `state.json`。
6. **让出** —— 会话干净地终止；下一轮次从更新后的状态继续。

## 要求

- 计划 MUST 携带机器可读状态层（`manifest.json` + `state.json`）。没有它，临时会话将无法可靠地确定续行位置。参见 [Plan state](/spec/plan-state)。
- 在任何无人值守的云端轮次之前，计划 MUST 已由人类审批。计划审批是控制点。
- 代理在受限权限范围内运作：它 MUST NOT 扩展范围，不得执行计划未明确授权的破坏性或对外操作，也不得将任务的指令延伸以涵盖已发现但未计划的工作——已发现的工作应记录以备下次 `refine`，而非即兴发挥。参见 [Agent protocol](/spec/agent-protocol#execution-profiles)。

## 备注

云端代理会话是无人值守执行配置文件的极端情形：零会话连续性，计划持久性最大化。DWP 的 `.dwp/` 目录正是专为此而设计的——代理开始、继续和完成一项工作所需的全部状态，均以任何会话都能从全新检出读取的纯 Markdown 与 JSON 文件的形式存在。
