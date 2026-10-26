---
title: 资源与能力
description: "逐任务上下文清单、资源包络、宿主能力、.dwp/config.json 附加组件注册表，以及已启用附加组件所提供的能力。"
order: 10
lang: zh
section: Record layer
---

# 资源与能力

> **版本范围：** 本页重述当前标准 DWP 7.0.0 在发布版本 `v7.9.0` 中的四份规范性文档：[`V6_CONTEXT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_CONTEXT.md)、[`V6_RESOURCES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_RESOURCES.md)、[`CONFIG.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/CONFIG.md) 与 [`V7_ABILITIES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_ABILITIES.md)。本页与这些文件不一致时，以文件为准。

**状态：稳定（上下文与资源自 6.0.0 起；配置与能力自 7.0.0 起）。** 这些规则约束 v6 系列计划（[记录层](/spec/record-layer)）；v5 标准不受影响。关键词 MUST、MUST NOT、SHOULD、SHOULD NOT 与 MAY 应按 RFC 2119 中所述加以解释。

## 逐任务上下文清单

在每项任务之前，代理从契约与完整日志推导出一份**上下文清单**（`context_manifest.py`）。它是一个派生视图，绝不作为状态存储：从相同记录推导两次 MUST 产生完全相同的字节，并且清单 MUST NOT 读取计划及其仓库之外的内容。其形态发布为 [`context-manifest/v6`](https://deepworkplan.com/schema/context-manifest/v6.json)。

| 部分 | 推导来源 |
| --- | --- |
| `identity` | 计划名称、现行契约 id 与修订版本 |
| `authorization` | 原样引用的批准事件，包括同意检查点 |
| `repository_rules` | 契约作用范围，以及不变量及其当前评估状态 |
| `acceptance` | 任务的标准及其关闭状态 |
| `touched_surface` | 已声明的文件及其当前内容哈希；缺失的文件显示为缺失 |
| `evidence` | 在磁盘上可以解析的窗口内证据指针 |
| `dead_ends` | 失败的关卡、拒绝、被拒绝的调整与无区分力的对照 |
| `freshness` | 清单所概括输入的指纹 |
| `next_action` | 恰好一个下一步，附带具体命令 |

`authorization`、`repository_rules` 与 `acceptance` 是**必需的**：上下文裁剪绝不能隐藏验收或授权的边界。下一步动作的阶梯是有序的（批准、开始、授权、对照、证据、完成），绝不会把一个普通的通过关卡呈现为关闭了受控标准。

**死路会被保留。** 只有在经证实的记录事实下（同一指纹后来通过、一次更新的重复拒绝取代了它，或一次契约修订使其过期），条目才会离开摘要；仅仅是接触面发生变化 MUST NOT 使其被丢弃。**新鲜度会被检查：** 记录的输入指纹不再匹配的摘要是过期的，没有指纹的摘要按构造即为过期。**历史只在触发时加载** —— 一次已记录的交接或一次影响该任务的契约修订；否则，清单本身就是该任务的全部上下文。

## 四量计量

指令负载与成本按四个不同的量报告：静态的**指令字节**、**提供方 token**（仅在宿主计量器记录了它们时）、**货币成本**（仅来自记录的真实费率采样）以及**实际耗时**（来自事件时间戳）。缺失的量会被报告为缺失并注明原因，绝不推算；字节绝不换算为 token 或金额。

## 宿主能力

运行时宿主从一个封闭集合中声明其**能力**：`stop_agent`、`meter_spend`、`meter_tokens`、`meter_wall_clock`、`cancel_children`、`model_routing`、`subagents`、`telemetry`。未知的能力 MUST 被拒绝，未声明的能力为 `false`。**最小宿主** —— 不能切换模型、没有子代理、没有遥测、不能停止 —— 是受支持的状态，绝不是错误；每个需要缺失能力的限制都会降级为建议性，并注明所缺失的能力。

能力不是授予。契约中的授予是权限；能力是环境实际能够做到的事。每种需要某项能力的运行姿态，仍然需要相应的授予。

## 资源包络

契约 MAY 在其资源包络中声明限制。只有当一个限制指明了真实的计量来源时，它才是**强制性的**；否则它是**建议性的**，并且绝不声称各宿主之间的强制执行一致。

- **计数来源。** 日志可观察的计数器（实际耗时跨度、关卡重试、调度调用）根据计划自身的记录计算。仅宿主可得的计数器（支出、提供方 token）需要相应的计量能力以及来自宿主适配器的 observed 采样；缺失的计数器并不意味着免费使用。
- **预留。** 限制 MAY 声明一个 `reserve`，使验证、重试与恢复不会被普通工作耗尽：当已用量加上待定量将超过限制减去预留时，调度会被拒绝。
- **耗尽。** 达到限制时会持久化一个未完成的检查点，记录 `LIMIT: exhausted <id>: <detail>`，并暂停调度，直到出现明确的 `LIMIT: recovered <id>` 记录。耗尽绝不能满足一项验收标准。
- **取消结算。** 进行中的预留只结算一次，结果为释放或提交；相互冲突的第二次结算会被拒绝，绝不仲裁。
- **路由姿态。** 默认是固定模型。切换模型层级需要 `model_routing` 授予与同名能力两者；并行调度需要 `agent_delegation` 授予与 `subagents` 能力两者。路由姿态是一项权限声明，绝不是效果声明。

## 配置文件与附加组件注册表

`.dwp/config.json`（仓库）与 `~/.dwp/config.json`（用户）共享同一形态，发布为 [`dwp-config/v1`](https://deepworkplan.com/schema/dwp-config/v1.json)，并使用同一个解析器（`config.py`）。**方法论在没有配置文件、没有任何附加组件的情况下也能工作**；文件中的任何内容都不能使计划、流程或符合性依赖于某个附加组件。

- **默认纳入版本控制。** 仓库文件只保存决策，绝不保存机密，并被纳入版本控制，使团队成员与 CI 读取同一份注册表：onboarding 会写入 `.gitignore` 规则 `.dwp/*` 加上 `!.dwp/config.json`。计划与基准记录仍被忽略。
- **优先级。** 仓库文件优先于用户文件，文件不存在即表示全部未启用。`addons` 键按每个附加组件的键分别解析；`benchmark` 键整体解析。
- **注册表键**是技能包内附加组件的目录名：`ai-diff-reviewer`、`agentkit`、`dailybot`、`dependency-upgrade`、`design-system`、`devcontainer`、`herdr`、`vim`。每个条目包含 `enabled`（只有 `true` 表示启用）、可选的 `version` 以及可选的单行 `note`。未知的键会被忽略，并给出一条警告。
- **不存在即未启用。** 只有在开发者同意下的 onboarding、附加组件自身的安装步骤或人类才能启用任何东西。已启用但未被检测到、且带有说明的附加组件会被报告为已推迟。
- **失败即关闭的读取。** 无法读取的文件或格式错误的值不贡献任何内容，并恰好产生一条警告；读取方绝不中止流程，也绝不对其丢弃的内容保持沉默。写入方以原子方式进行协调，并拒绝覆盖它无法解析的文件。
- **宿主记录。** 可选的 `host` 键记录这台机器声明的能力（来自封闭集合的布尔值）。`telemetry: true` 仍需要开发者的同意。
- **基线不变。** 无论注册表是否列出它，AI Diff Reviewer 本地审查始终是每次 Final Review 的一部分。

## 附加组件提供的能力

自 7.0.0 起，已启用的附加组件可以在运行时增加能力：

`effective abilities = host-declared abilities ∪ abilities provided by every addon that is enabled, described by a valid addon.json, detected, and on a compatible interface version`

即：有效能力 = 宿主声明的能力，并上每个满足以下条件的附加组件所提供的能力：已启用、由有效的 `addon.json` 描述、已被检测到，且接口版本兼容。

- **描述符。** 每个技能包内的附加组件都附带一个 `addon.json`（[`addon-descriptor/v1`](https://deepworkplan.com/schema/addon-descriptor/v1.json)），声明其键、所提供的内容以及检测方式。
- **检测是只读的。** 检测命令在没有 shell 的情况下运行，stdin 关闭，超时 10 秒，它打印的任何内容都不会被执行。报告的接口主版本与固定版本不同的产品视为不可用，并给出一条警告。
- **未启用即不查询。** 被禁用的附加组件，其描述符不会被打开，其检测命令也不会运行。该并集是单调的：启用一个附加组件只会增加能力。
- **绝不持久化。** 有效能力在每次调用时重新计算，MUST NOT 写入计划。计划记录的是它实际使用了什么 —— 委派事件会注明其传输方式与附加组件 —— 而不是有什么可用。
- **能力不是权限。** agentkit 附加组件可以提供 `subagents`、`cancel_children` 与 `model_routing`；Herdr 附加组件可以提供 `subagents` 与 `cancel_children`。委派仍然需要契约的 `agent_delegation` 授予（[委派](/spec/delegation)）。

`resources.py abilities` 打印有效能力集合以及每项能力的来源；它是只读的。

## 相关内容

- [记录层](/spec/record-layer) —— 契约、日志与证据。
- [委派](/spec/delegation) —— 计划如何使用 `subagents` 能力。
- [附加组件](/spec/addons) —— 可选附加组件本身。
