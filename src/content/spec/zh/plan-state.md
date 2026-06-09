---
title: Plan state
description: "机器可读的计划状态层：manifest.json 与 state.json、关卡记录、作为情节记忆的 outcome 记录、协调机制，以及何时需要该层。"
order: 7
lang: zh
section: State
---

# Plan state

**版本 1.0。状态：稳定。** 本文档规定了 Deep Work Plan 方法论的机器可读计划状态层。关键词 MUST、MUST NOT、SHOULD、SHOULD NOT 与 MAY 应按 RFC 2119 中所述加以解释。

两个 JSON 产物——`manifest.json`（计划的静态标识）与 `state.json`（包含验证关卡结果的实时逐任务执行状态）——每份计划 MAY 将其与 Markdown 文件一并携带，而无人值守执行（参见 [代理协议](/spec/agent-protocol#execution-profiles)）与无 git 的工作区（参见 [原型](/spec/archetypes) §3）MUST 携带。

Markdown 计划仍是**人类可读的事实来源**。JSON 层是一份**派生投影**：由代理在既定的协议节点处重新生成，从不手动编辑，也绝不允许与 Markdown 静默地产生分歧。其目的是实现互操作性——代码检查、符合性核验、差异对比、仪表板、注册表发现，以及与外部会话基础设施的同步——而这些都无法可靠地建立在散文之上。

## 为何需要它

在 v1.1 之前，计划仅为散文 Markdown。这保持了其可审计性与代理无关性，但没有留下任何工具可以验证、差异对比或消费的内容：没有符合性关卡，没有 `README.md` 与 `PROGRESS.md` 之间的去同步检测，守护进程或云端会话也无法在不解析散文的情况下知晓计划的状态。v1.2 在不降低 Markdown 地位的情况下添加了 JSON 投影——该投影从 Markdown 派生，就如同锁文件从清单派生一样。

## 存放位置

使用状态层的计划具有以下布局：

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← 人类事实来源（不变）
├── PROGRESS.md          ← 叙事日志（不变）
├── PROMPTS.md           ← 不变
├── manifest.json        ← 静态标识（在物化时写入）
├── state.json           ← 实时状态（在协议节点处重写）
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json` MUST 在 `create` 流程物化计划时恰好写入一次，此后 MUST NOT 更改，除非在 `PROGRESS.md` 中记录了规范版本迁移。

`state.json` MUST 由代理在以下每个协议节点处重写：计划物化（所有任务 `pending`）、任务开始（`in_progress`）、每次验证关卡运行（关卡记录追加或更新），以及任务完成（`completed`，作为 [DWP 规范](/spec/dwp-specification#task-completion-protocol) 中任务完成协议的一部分）。

两个文件均 MUST 原子性写入：先向同目录下的临时文件写入，再重命名覆盖目标文件。崩溃写入 MUST NOT 在原位留下被截断的 JSON 文件。

## 何时需要该层

- 对于在 git 代码仓库中进行的**交互式**执行，状态层对新计划 RECOMMENDED，对 v1.2 之前的计划 OPTIONAL。没有它的计划仍然符合规范。
- 对于**无人值守**执行，状态层 REQUIRED。
- 在没有 git 的**代理工作区**中，状态层 REQUIRED：`state.json` 携带了 git 日志在代码仓库中所携带的恢复信息。

## `manifest.json` —— 计划标识

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v1.json",
  "spec_version": "2.2.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`、`spec_version`、`name`、`archetype`、`rigor`、`created_at` 与 `task_count` 为 REQUIRED。

`archetype` MUST 为 `individual`、`orchestrator-hub`、`agent-workspace` 之一。

`rigor` MUST 为 `micro`、`standard`、`deep` 之一（参见 [比例严格度](/spec/dwp-specification#proportional-rigor)）。

`parent_plan` 将子计划链接至其编排者计划（`{repo}:{plan_name}`，或 `null`）。

`created_by` SHOULD 标识创建代理与模型。它 MUST NOT 包含机密信息、令牌或显示名称以外的用户标识符。

## `state.json` —— 实时执行状态

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v1.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "tasks": [
    {
      "id": 1,
      "file": "1.task_webhook_endpoint.md",
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "file": "3.task_retry_queue.md",
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

### 任务条目

计划中的每个任务文件 MUST 在 `tasks` 中恰好有一条记录，以其编号（`id`）和文件名（`file`）为键。

`status` MUST 为 `pending`、`in_progress`、`completed`、`blocked`、`skipped` 之一。`skipped` 仅在用户通过 `refine` 明确将任务从范围中移除时有效；`state.json` MUST NOT 被用于静默跳过工作。

`completed` 条目 MUST 携带 `completed_at`，以及在计划提交的情况下，携带短 `commit` 哈希——这是计划到代码的可追溯性链接。

### 关卡记录

验证命令的每次运行都 SHOULD 被记录为一条关卡记录：`command`、`passes`（布尔值）、`exit_code`、`last_run`，以及一段简短的人类可读 `evidence` 字符串（摘要行或 `analysis_results/` 下的路径，绝非完整的命令输出）。

任务 MUST NOT 在 `state.json` 中被标记为 `completed`，如果其任何关卡记录的 `passes: false` 且没有后续通过的运行。关卡记录是"在没有证据的情况下绝不标记完成"这一模式的机器等价物——每条记录中 `passes` 标志防止过早完成的模式。

### 作为情节记忆的 outcome 记录

已 `completed` 的任务 SHOULD 携带一条 `outcome` 记录：尝试了什么（`tried`）、失败了什么（`failed`）、有效的是什么（`worked`），以及自由格式的 `notes`。每条记录保持一行。

outcome 记录使已完成的计划成为可检索的**情节记忆**：代理（或记忆索引平台）日后可以回想起某个问题是如何解决的，而不仅仅是知道它被解决了。它们馈送给强制性的技能与代理发现任务，该任务在挖掘模式时 SHOULD 读取它们。在 Hermes 等对代理记忆建立索引的平台上，`state.json` 中的 outcome 记录使已完成的计划可在未来的会话中直接检索。

### 检查点与阻塞状态

`checkpoint` 记录当前任务内最细粒度的续行点：任务 `id`、自由格式的 `step` 定位符、时间戳，以及一行备注。代理 SHOULD 在任何时候暂停任务内部时更新它；在无人值守模式下的任何计划中断前 MUST 更新它。

`blocked` 为 `null` 或 `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`。遇到停止条件的无人值守代理 MUST 在停止前填充 `blocked`——这是守护进程的下一次心跳或人类了解计划为何停止的方式。

## 投影与协调

Markdown MUST 在每次分歧中获胜。若 `state.json` 显示任务 4 已 `completed`，但计划 README 显示未勾选的复选框，则状态文件已过时。

续行代理 MUST 在继续之前将 README 复选框列表与 `state.json` 进行比较。若出现去同步，它 MUST 从 Markdown（以及在有 git 的情况下从 git 日志）重新生成 `state.json`，在 `PROGRESS.md` 中记录此次协调，然后才能继续。

`verify` 子技能 MUST 将去同步视为符合性发现：报告哪些任务产生分歧以及分歧方向。

执行代理以外的工具 MUST 将两个 JSON 文件视为只读。

## 模式版本控制

两个模式均通过 URL 进行版本控制（`/v1.json`）。版本内允许添加字段；重命名或重新定义字段类型需要 `/v2.json` 及规范变更日志中的迁移说明。清单中的 `spec_version` 字段固定了计划创建时所依据的 DWP 规范版本；遇到比其已安装规范更新的计划时，代理 SHOULD 明确说明，而非猜测。
