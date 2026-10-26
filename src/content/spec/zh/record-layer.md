---
title: 记录层
description: "v6 与 v7 记录层：不可变的结果契约、仅追加日志、证据类别、人工签核、契约修订、计划范围的不变量，以及由记录重新计算的回执。"
order: 9
lang: zh
section: Record layer
---

# 记录层

> **版本范围：** 本页重述当前标准 DWP 7.0.0 所依托的规范性 v6 记录层。发布版本 `v7.9.0` 的规范来源：[`V6_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_CONTRACT.md) 与 [`V6_LIFECYCLE.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_LIFECYCLE.md)。本页与这些文件不一致时，以文件为准。v5 计划保留 [plan state](/spec/plan-state) 状态层，绝不会被隐式迁移。

**版本 6.0.0，在 7.0.0 中扩展。状态：稳定。** 记录层以记录取代叙述式的完成声明：契约是权威，日志是记忆，由辅助工具负责写入，每个生成的文件都是一份投影。关键词 MUST、MUST NOT、SHOULD、SHOULD NOT 与 MAY 应按 RFC 2119 中所述加以解释。

## 一句话模型

一份计划由两类编写的产物和一个受保护的序列组成。计划 Markdown（`README.md` 与任务文件）说明将要做什么。**结果契约**（`contract.json`）说明什么算作完成，以及计划被允许做什么。**日志**（`journal.ndjson`）记录实际发生了什么。`state.json` 与 `views/` 从日志重新生成，MUST NOT 手动编辑；当生成的文件与日志不一致时，以日志为准，并重新生成该文件。

## 代际检测

一个计划文件夹当且仅当带有一个 `contract` 指针可解析的 `manifest.json`、一个 `contract.json` 或一条 `contracts/` 修订链时，才是 v6 系列计划。检测 MUST 依据这些产物，绝不依据已安装技能包的版本：当前的技能包可能持有 v5 计划，而较旧的技能包也可能遇到 v6 计划。

契约的 `schema` URL 标明其**代际**，清单与每个日志事件都与之保持一致：

| 代际 | 契约 | 日志事件 | 清单 | 新增内容 |
| --- | --- | --- | --- | --- |
| v6 | [`plan-contract/v6`](https://deepworkplan.com/schema/plan-contract/v6.json) | [`journal-event/v6`](https://deepworkplan.com/schema/journal-event/v6.json) | [`plan-manifest/v6`](https://deepworkplan.com/schema/plan-manifest/v6.json) | — |
| v7 | [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json) | [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json) | [`plan-manifest/v7`](https://deepworkplan.com/schema/plan-manifest/v7.json) | `parallel_safe` 与 `delegation` 事件（[委派](/spec/delegation)） |

7.x 技能包创建的新计划默认是 v7；明确的 `v6` 请求仍会物化一份 v6 契约。计划绝不改变代际，混合了不同代际的日志 MUST 被拒绝。两个代际都投影到同一个 [`plan-snapshot/v6`](https://deepworkplan.com/schema/plan-snapshot/v6.json) 形态。

## 结果契约

每份计划一份契约，符合其代际的模式。它包含结果陈述与成功定义、验收标准、任务及其前置条件、触及面与关卡意图、计划范围的不变量、作用范围（允许的路径、命令类别、禁止的操作）、资源包络、调度限制、权限以及授权记录。

- **身份。** `contract_id` 是不含 id 字段的契约规范字节的 SHA-256。在该契约下产生的每条记录都引用它。
- **不可变性。** 执行一旦开始，契约 MUST NOT 改变。变更后的契约是 `contracts/` 下的一个新**修订版本**，引用其父版本，修订编号连续，并带有新记录的授权。
- **稳定的 id。** 标准（`AC-*`）、不变量（`INV-*`）与任务（`T-*`）MUST 唯一，记录引用 id，绝不引用列表位置。任务图 MUST 无环，每个关卡意图 MUST 引用一项已声明的标准。
- **权限。** 已授予与未授予的能力 MUST 是一个封闭集合中互不相交的子集：`gate_command_exec`、`fs_write_plan_scope`、`fs_write_repo_scope`、`git_operations`、`network_access`、`host_adapter_metering`、`agent_delegation`、`context_export`。
- **授权。** 机制只能是 `plan_authorship`（人类在执行前编写或审阅了计划）或 `pre_authorization`（一项声明了包络的长期授予，如信任模式）。两者的关卡判定完全相同；只有记录的授权来源不同。
- **可关闭性。** 每项标准 MUST 可关闭：由任务设关卡的标准，根据其接受的证据类别，通过其关卡的 `observed` 证据或通过 `asserted` 的人工签核来关闭。两者都不接受的草案标准会被拒绝。

## 物化

计划由随附的辅助工具（`ledger.py materialize`）物化，绝不手动完成，并严格按以下顺序进行，每一步都是幂等且可恢复的：

1. **`manifest.json`**，带有契约指针，最先写入，以便即使物化被中断，也能发现计划的代际。
2. **`contract.json`**，经过验证并按内容寻址。
3. **`approval`** 日志事件，引用契约 id 与计划 Markdown 的摘要。

只有这个批准事件才会打开任务开始的关卡。缺少它的手工复制契约会在任务开始时被拒绝；指针与正在物化的契约不匹配的清单会被拒绝，而不会被改写。

## 日志

`journal.ndjson` 是仅追加的：每行一个封闭的 JSON 对象，绝不编辑或删除。更正是一个后续事件。每个事件都带有其模式、类型、严格递增的 `seq`、时间戳、计划、`contract_id` 以及执行者（`helper`、`agent`、`host_adapter` 或 `human`）。事件目录涵盖任务开始、批准、关卡运行、观察、调整、修订、干预、资源采样、对照组、调度选择、拒绝、视图渲染、协调与日志修复；v7 新增委派事件。每一次拒绝本身也会被记录。

## 证据类别

携带证据的事件会记录一个**信任**标签：

1. **observed** —— 由随附的辅助工具亲自执行检查，并声明工作目录、环境、超时与捕获的输出。只有关卡运行器（`ledger.py gate`）能产生 observed 关卡证据；仅仅写下自己所报告结果的代理不能。
2. **imported** —— 取自具有来源证明的匹配外部来源，例如证据指针可以解析的、迁移而来的 v5 关卡记录。
3. **asserted** —— 未经独立确认的陈述。

每项标准声明其接受哪些类别，因此仅接受 observed 的标准绝不会因一项声明而关闭。校验和确立的是字节一致性，而非语义真实性；记录层检查结构与来源，不证明产品语义。

## 人工签核

需要由人类判断的标准，通过 `ledger.py signoff --criterion <AC> --evidence-path <artifact> --authority <who>` 关闭。签核被记录为 `asserted`，引用其所依据的产物，只在声明该标准的任务的证据窗口内有效，并且只关闭接受 `asserted` 的标准。代理绝不代替人类签核。在物化之外写入的人类执行者记录带有明确的授权标记（由人类写下、按路径与摘要记录的说明，或一次交互式确认）；账本无法验证一个人的身份，因此该标记使这一声明可审计，而不是 observed。

## 受控标准

声明为回归或区分对照的标准，只能通过一个**具有区分力的对照组**关闭：检查在起始修订上失败，在新修订上通过。两侧都通过的对照组被记录为无区分力，绝不被向上取整；起始状态不干净或旧的一侧不可用时，被记录为对照不可用，绝不伪造。

## 执行与完成

调度来自确定性的调度器（`scheduler.py ready`），`ledger.py start` 会拒绝前置条件未完成的任务。每次任务开始都会记录工作树的指纹，只有在指纹等价时，证据才会被同一任务与同一标准复用。

**不变量的作用范围是整个计划。** 每个已声明的不变量在整份计划中都成立，并在每个边界处作为一次观察进行评估（`INV-<id>: pass` 或 `INV-<id>: fail: <reason>`）。只有部分任务必须满足的属性，是这些任务的验收标准，绝不是不变量。

**完成是推导出来的，绝不是声明出来的。** 只要任何标准缺少被接受的窗口内证据，或任何不变量缺少一次新的通过评估，`ledger.py complete` 就会拒绝，并记录该拒绝。快照恰好在记录支持时才将任务显示为已完成。

## 调整与契约修订

运行中途的变更是向调度器提出的提议，限定在一个封闭集合内：`split`、`reorder`、`insert`、`change_strategy` 与 `retry`。调整 MUST NOT 删除要求、削弱或替换验收、扩大作用范围或权限、超出包络支出，或将未执行的场景标记为完成。

对作用范围、验收标准、权限或包络的变更是一次**契约修订**：`ledger.py amend` 将修订后的契约暂存为下一个修订版本，记录该修订以及其早先证据因此失效的标准，要求一次带有人类授权标记的新批准，然后才切换现行契约。被中断的修订从第一个缺失的步骤恢复；计划编写的授权绝不会延续到新的修订版本。

## 回执、视图与导出

`outcomes.py receipt` 根据记录重新计算计划的结果，因此记录变化时它也随之变化；它绝不是手写的。`views.py render` 重新生成人类可读的视图；被人类编辑过的视图会被报告，绝不被静默覆盖，而协调过程本身也会被记录。由于 `.dwp/` 被 gitignore，`ledger.py export --dest <dir>` 会将日志、快照、契约链以及每个被引用的证据产物打包，以便长期保存或交给另一个宿主。

## 只读接口与恢复

`status` 与 `verify` 绝不写入 v6 系列计划；它们通过纯命令与生成的投影进行报告。恢复执行的宿主按固定顺序恢复（检查、验证、投影、以记录的授权渲染），并将过期的指纹视为需要重新运行的失效证据，绝不视为可复用的结果。日志绝不作为对话上下文重放：工作通过执行循环恢复，并使用逐任务的[上下文清单](/zh/spec/resources-and-abilities#逐任务上下文清单)。

## 共存与迁移

v5 与 v6 系列计划 MAY 在同一个 `.dwp/plans/` 中共存，每份计划在其整个生命周期内都按自己的代际运行。从 v5 到 v6 的唯一途径是一次明确的、可预览的迁移（`migrate_v6.py`，通过 `refine` 运行），并带有经过验证的备份与回滚；迁移而来的 v5 历史在其证据可以解析时为 `imported`，否则为 `asserted`，绝不为 `observed`。不存在反向迁移。

## 相关内容

- [资源与能力](/spec/resources-and-abilities) —— 上下文清单、资源包络、宿主能力与附加组件注册表。
- [委派](/spec/delegation) —— v7 在这一层之上新增的内容。
- [Plan state](/spec/plan-state) —— 保留的 v5 状态层。
