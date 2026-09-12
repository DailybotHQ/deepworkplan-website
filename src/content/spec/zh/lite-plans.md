---
title: Lite 计划
description: "Lite 计划：紧凑、完全可执行、内联于 README.md 的任务记录，及其创建、格式选择与晋升为 Full 计划的方式。"
order: 3
lang: zh
section: Workflow
---

# Lite 计划

**版本 4.0.0。状态：稳定。** 本文档规定了与 [DWP 规范](/spec/dwp-specification) 一同引入的 Lite 计划形态：一种面向中小规模、边界清晰工作的计划格式，直接物化，不设不可执行的草案阶段。关键词 MUST、MUST NOT、SHOULD、SHOULD NOT 与 MAY 应按 RFC 2119 中所述加以解释。

## 形态与生命周期

一份计划 MUST 是以下两种形态之一，在 `manifest.json` 中以 `plan_format` 一次性记录：**Full** 在 `<n>.task_<slug>.md` 下为每项任务存储一个文件；**Lite** 将紧凑、可执行的任务记录以内联形式存放在 `README.md` 中，每条记录都位于一个稳定的 `{#task-N}` 锚点之后。一份 Lite 计划并非部分或非正式的 Full 计划：每条任务记录仍然 MUST 携带目标、触及面、验收标准、验证关卡与完成日志，其规范性结构与 [任务结构](/spec/dwp-specification#task-anatomy) 为 Full 所定义的完全相同。

有四个维度描述计划的状态，MUST 被独立追踪，而不是混为一谈：

| 维度 | 取值 | 含义 |
|------|------|------|
| 格式 | `lite`、`full` | 任务记录存放在何处 |
| 物化 | `materializing`、`ready`、`promoting` | 计划文件夹正在写入、已完成，还是正处于晋升过程中 |
| 批准 | `pending`、`approved`、`pre_approved` | 是否有人审阅过该计划，或信任模式是否已预先批准它 |
| 执行 | `pending`、`in_progress`、`blocked`、`completed` | 逐任务及整体的进度 |

引导式 create 写出的是一份**可供审阅的待批准提案**——无论 Lite 或 Full，都已经是真正的计划，绝非可丢弃的草案。信任模式直接物化出一份**已就绪、已预批准**的计划，并立即交还控制权。`create` 与晋升都绝不执行产品工作；一次显式的 `execute` 或 `resume` 请求会批准计划当前就绪的范围，并且 MUST 在开始工作前记录该批准；没有该请求，`pending` 提案不可执行；进行中的未完成晋升 MUST 先行恢复。

## 创建与格式选择

`/dwp-create` 在各个规模上都服务于规划意图，而不仅限于大型工作。规模小、边界清晰的工作——单一关注点，大约一次坐下即可完成，无需协调——是 Lite 计划的目标场景；具有实际范围的多步骤工作则默认为 Full，依据 [比例严格度](/spec/dwp-specification#proportional-rigor)。直接编辑、解释说明、状态检查、续行，或明确的不建计划请求，各自保留自己的路径，绝不会变成一份计划。

`lite` 与 `full` 是**格式偏好**；`trust` 与 `auto` 是各自独立的**交互选项**，任意一种选项 MAY 出现在请求的任一端，顺序不限：

```text
/dwp-create trust fix the label
/dwp-create lite trust fix the label
/dwp-create fix the label trust lite
/dwp-create fix the migration full trust
```

重复同一个选项是幂等的；同时要求 `lite` 与 `full` 是一个错误。`--` 结束选项解析。

当未给出格式偏好时，`create` 会推荐一个并说明理由。明确的 **Full** 请求总是获胜。明确的 **Lite** 请求会被采纳，除非该工作的需求或验证关卡无法容纳于紧凑的内联记录中——在这种情况下，`create` 会记录为何转而要求 Full。该选择 MUST 记录其背后所观察到的范围、依赖关系、所需的指令细节与未知因素——这是一项可审计的判断，而非在所有模型或代理上都成立的保证。

## 晋升与兼容性

一份 Lite 计划 MAY 在任意时刻通过 `/dwp-refine promote {plan_name}` **晋升**为 Full（参见 [dwp-refine](/kit/dwp-refine)）。晋升**仅涉及形态**：它记录意图，写出目标任务文件，核实 Lite 记录所携带的每一项需求与关卡仍被覆盖，将权威副本从内联的 README 记录切换到任务文件，然后清除进行中标记。当晋升标记仍处于设置状态时，`execute` 与 `resume` MUST 拒绝继续。已记录的任务编号与完成证据 MUST NOT 被晋升重写；晋升过程中发现的新范围改由 `refine` 处理，并且只使其所影响的证据失效。

晋升绝不会自动反向进行：一份 Full 计划不会被静默地收拢回 Lite。在更早的规范版本下编写的计划——包括完全没有 `plan_format` 字段的 v1 版 Full 计划——保留其已记录的形态并仍然符合规范；一次 `refine` 会话 MAY 有意迁移它，但没有任何机制会隐式地这样做。

`manifest.json` 的 `plan_format` 一旦写入即不可变；一次晋升会更改 `state.json` 的 `format` 并清除其 `promotion` 标记，绝不重写清单。确切的 `plan_format`、`format`、`materialization`、`approval`、`promotion` 与 `locator` 字段及其 v2 模式 URL，参见 [Plan state](/spec/plan-state)。
