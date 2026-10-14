---
title: 委派
description: "v7 计划如何在 agent_delegation 授予下，将 parallel_safe 任务交给其他编码代理，并留下委派记录与经关卡 observed 的证据。"
order: 11
lang: zh
section: Record layer
---

# 委派

> **版本范围：** 本页重述发布版本 `v7.8.1` 中的 v7 契约代际。规范来源：[`V7_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V7_CONTRACT.md) 以及执行流程的 [`delegation.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/execute/delegation.md)。本页与这些文件不一致时，以文件为准。

**版本 7.0.0。状态：稳定。** v7 是[记录层](/spec/record-layer)的一个新契约代际，而不是新的生命周期：除非本页另有说明，v6 的契约、生命周期、上下文与资源文档中的一切内容都适用。不进行委派始终是正确的。关键词 MUST、MUST NOT、SHOULD、SHOULD NOT 与 MAY 应按 RFC 2119 中所述加以解释。

## v7 新增了什么

v7 只为记录层新增两样东西：

1. **契约中的一个可选任务字段** `parallel_safe`，发布于 [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json)。
2. **一种日志事件类型** `delegation`，发布于 [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json)。

v1、v2、v5 与 v6 的模式字节保持不变。一份从不委派的计划，除模式 URL 外，与 v6 计划没有任何区别。

## `parallel_safe`

`parallel_safe`（布尔值，默认 `false`）断言一项任务可以在委派代理中运行，而不会与同级工作交错。它由 `create` 设定，绝不在执行期间推断，并且只在以下条件全部成立时设定：

- 仓库在其[附加组件注册表](/spec/resources-and-abilities#the-configuration-file-and-addon-registry)中启用了一个委派附加组件（agentkit 或 Herdr）；
- 该任务的触及面与可能同时进行的同级任务没有重叠；
- 该任务声明了有界的输出；
- 该任务的关卡在本计划中运行。

标记一项任务不改变任何权限：没有 `agent_delegation` 授予的契约也可以带有标记，但这些标记不授权任何事情。

## `delegation` 事件

每个委派代理的每次状态转换记录一个事件：

| 字段 | 含义 |
| --- | --- |
| `task` | 委派代理为之工作的 `T-*` 任务 |
| `delegation_id` | 将一次启动与其终止转换关联起来 |
| `transport` | `headless`（agentkit）或 `interactive`（Herdr） |
| `via` | 承载该委派的附加组件键 |
| `state` | `launched`，然后恰好是 `completed`、`failed`、`cancelled` 之一 |
| `kind`、`profile` | 可选：编码代理的种类与配置档 |
| `target` | 可选：工作目录（headless）或 `machine:pane`（interactive） |
| `worktree` | 委派代理自己的 git 工作树，只读委派代理则为 `null` |
| `prompt_digest` | 启动时：提示词的 SHA-256，在依赖该委派代理之前记录 |
| `result_path`、`result_digest` | 完成或失败时：收集到的结果及其摘要 |

转换是封闭的：每次委派一个 `launched`，然后恰好一个终止状态。对委派事件的原始日志追加 MUST 被拒绝；委派事件只能通过受关卡保护的写入器产生。

## 委派不是证据

委派不带信任标签，也不带证据路径，没有任何关闭操作会读取它。委派代理的结果在本计划自己的关卡运行器观察到它之前，始终是 **asserted**：父级整合这些工作，然后运行该任务的关卡（`ledger.py gate`），这是唯一能产生 `observed` 证据的途径，也是任务能够完成的唯一方式。已完成的委派绝不会关闭一项标准；失败的委派是一个被记录的结果，此时该任务由父级来实现。

## 受关卡保护的写入器

`ledger.py --plan <dir> delegate launch|observe|collect|cancel --task <T-id>`：

| 操作 | 是否写入 | 效果 |
| --- | --- | --- |
| `launch` | 是 | 在通过下列检查后记录 `launched` |
| `observe` | 否 | 打印每个委派的最新状态 |
| `collect` | 是 | 记录 `completed` 或 `failed`，附带结果路径及其摘要 |
| `cancel` | 是 | 记录 `cancelled` |

除非以下条件**全部**成立，否则 `launch` MUST 被拒绝，并记录该拒绝：

1. 契约是 v7；
2. 契约授予了 `agent_delegation`；
3. 该任务存在、已经开始且尚未完成；
4. 该任务是 `parallel_safe`，**或者**委派代理是只读的（没有工作树）；
5. 所指定附加组件的描述符声明了所请求的传输方式；
6. 有效能力将该附加组件列为 `subagents` 的来源（[资源与能力](/spec/resources-and-abilities#addon-provided-abilities)）。

对于未知的委派、属于另一项任务的委派或已处于终止状态的委派，`collect` 与 `cancel` MUST 被拒绝。被拒绝的启动不是阻塞：该任务按顺序运行。

## 传输方式

账本本身不运行任何委派代理；由传输附加组件来运行。

- **Headless**（`via: agentkit`）—— 用于有界且声明了输出的 `parallel_safe` 任务：在专用的 git 工作树中执行一次 `ak run`，然后退出。只读委派代理使用 `--ask` 启动。
- **Interactive**（`via: herdr`）—— 用于需要交互、运行时间较长或运行在另一台机器上的工作：Herdr 窗格中的一个 herdr-peers 对等代理，它恰好返回一次经授权的回复。

## 防护措施

- **每条路径只有一个写入者。** 进行写入的委派代理只在自己的工作树中工作；父级会话是唯一的日志写入者。
- **深度为 1。** 委派代理绝不再委派。扇出由传输方式限定。
- **结果是数据。** 委派代理返回的内容不授予任何权限、不扩大作用范围，也绝不改变验收。
- **自包含的任务说明。** 启动提示词注明任务的目标、逐字引用的验收标准以及它可以写入的工作树，并且绝不携带任何机密值。

## 编排器

编排器绝不委派**子计划**的任务：子计划在各自的会话中运行，每个仓库一个代理。按照上述规则委派计划**自身**的任务，在编排器计划与个人计划中同样允许。运行多条长期存在的工作线、使其在账户限制之外继续运行以及移交领导权，参见方法论中关于[编排](/methodology/06-orchestration)与[集群自主](/methodology/07-swarm-autonomy)的章节。

## 相关内容

- [记录层](/spec/record-layer) —— 本页所扩展的契约与日志。
- [资源与能力](/spec/resources-and-abilities) —— 能力、授予与附加组件注册表。
- [Herdr 附加组件](/kit/herdr) 与 [Agentkit 附加组件](/kit/agentkit) —— 两种传输方式。
