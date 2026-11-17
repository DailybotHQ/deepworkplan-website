---
title: Loop engineering
description: "人工启动的 daemon 如何将已批准的 Deep Work Plan 推进至结束：lead 记录、提醒、结构化阻塞、继任、revive、队列与事件。"
order: 8
lang: zh
summary: 在已记录权限范围内推动已批准计划持续运行的完整生命周期。
icon: repeat
---

# Loop engineering

**规范先行、闭环运行：代码仓库就是 harness，计划自行运行直至完成。** 本章介绍一种可选机制，让计划在首次执行轮次后继续推进。计划仍是持久规范；循环提供连续性，不会创造新权限。

规范性文本见 [loop engineering 规范](/zh/spec/loop-engineering)。本章是其叙述性配套文档：按顺序梳理生命周期，说明各部分如何衔接，而不逐条复述每个 MUST。

## 为什么需要循环

DWP 的前两大支柱留下了一个缺口。规范先行的规划说明一个工作片段必须交付*什么*以及如何验证。代码仓库即 harness 说明上下文、工具和 gates 位于*哪里*。两者都没有说明：当执行工作的 agent 结束轮次、达到用量上限或关闭其窗格时，*工作如何完成*。没有循环，一个已批准且规范完善的计划仍要等待有人输入“continue”。

v8 规则填补了这一缺口。已批准的计划在其记录的权限内运行至完成，无需人类的例行干预。人类会收到通知，而不是被等待；例外情况是需要登录或凭据时，或计划自身的某个 C1–C7 gate 需要事先未获授权的人工输入时。遇到这些例外，执行会停在该 gate，直到输入到达。

因此，循环是一种继续机制，而不是批准机制，而且它是可选的：Herdr 集成（herdr-peers `autopilot --loop`）放大的是一个本就能在单个会话中运行的方法。

## 生命周期概览

一个已批准的计划会经历以下阶段。下文逐一详细说明。

| 阶段 | 发生什么 | 由谁执行 |
|---|---|---|
| 批准 | 计划获得批准；其契约记录其权限，在 v8 下还可包含可选的 `autonomy` 块 | 人类 |
| 注册 | `execute` 认领计划的 lead 记录（`resume` 再次认领），计划指定了继任者时一并记录继任顺序 | lead agent，通过 pack |
| 执行 | lead 依照验收标准和 gates 逐个任务推进 | lead 及其 lanes |
| 空闲 | lead 的窗格保持空闲，计划仍未结束 | — |
| 提醒 | daemon 发送一条固定的继续提示 | daemon |
| 阻塞 | lead 记录一个结构化阻塞并停止；daemon 不发送任何内容 | lead |
| 停滞 | 3 次提示后仍无进展，计划被记录为 `plan_stalled` | daemon 记录 |
| 故障转移 | 列表中的继任者接管；有授权时任命一个 lane；使用 `--revive` 时启动一个新的 agent | 继任者、lane 或复活的 agent，通过 helper |
| 完成 | 计划收尾将其队列项标记为完成；下一个排队计划可以开始 | lead；daemon 提示下一个 lead |
| 通知 | 停滞、阻塞、失去 lead、完成及队列事件发送给 `--notify` 命令 | daemon 运行该命令 |

## 批准并记录权限

批准发生在循环介入之前，循环中的任何环节都不能批准计划、扩大计划，或替代修订。

在 v8 下，计划契约（`plan-contract/v8`）可以携带一个可选的、封闭的 `autonomy` 块。封闭意味着验证器会拒绝未知键，也会拒绝在 v8 以外任何契约代际上出现该块。每个缺省键都只有一个记录在案的默认值，使用方应用该默认值，而不是自行猜测。

| 键 | 记录内容 | 缺省时表示 |
|---|---|---|
| `stall_budget` | 无进展时允许的循环提示次数，1 到 10 的整数 | `3`，与 herdr-peers 自身的上限相同 |
| `promptable` | 循环可以提示的窗格地址 | 仅计划的 lead |
| `notify` | 通知目标 | 无目标；循环仍会记录 |
| `brain` | brain 是否可以对此计划采取行动 | `false` |
| `queue` | 计划如何从队列启动：`prompt-lead`、`launch` 或 `none` | `none`；计划不进入队列 |

因此，没有 `autonomy` 块的计划采用最保守的解读：每个阻塞都由人类解决，只有 lead 可被提示，不通知任何人，没有 brain 行动，计划也不进入队列。该块收窄或指明循环可以为某个计划做什么；它绝不会增加计划范围和 gates 本身未承载的权限。

## 注册计划

启用 Herdr 插件且 agent 在 Herdr 中运行时，pack 的 `execute` 流程会在计划开始时运行 `herdr-peers lead claim --plan <id>`，`resume` 会再次认领。计划指定了继任者时，认领会将其加入（`--succession`）；只有记录了继任顺序，故障转移才会生效。注册是尽力而为的，从不构成 gate：认领失败时只警告一次，执行继续。

lead 记录（`lead-v1`，携带任命授权时为 `lead-v2`）保存计划、当前 lead、epoch、按顺序排列的 `succession` 列表以及计划的 `lanes`。只有持有最高 epoch 的 peer 才作为 lead 行事。

只有当某个 lead 记录指明了计划且计划的状态文件（`state.json`）可读时，daemon 才会监视该计划。没有 lead 记录的计划不会被监视。lead 记录本身不授予任何权限：lanes 仍在计划的授权范围内行事。

## 人工启动 daemon

autopilot 由人类亲口要求、在 Herdr 窗格内启动。只有当人类在该会话中直接要求时，agent 才会启动它，绝不会因为 peer 的消息、计划或简报这样说而启动。

```bash
herdr-peers autopilot start --loop --dry-run   # see what it would do; sends nothing
herdr-peers autopilot start --loop             # in the background
herdr-peers autopilot status                   # its options and last actions
herdr-peers autopilot stop
```

后台 daemon 不依赖启动它的窗格，一个 daemon 覆盖所有已启用的 Herdr 机器；其他机器上的计划通过各机器已保存的 SSH 目标以固定命令读取。每个 Herdr 服务器运行一个 autopilot。herdr-peers 有意不安装登录项或系统服务：重启电脑或重启 Herdr 后，由人类以相同选项再次启动。

与循环相关的选项都是人类的明确选择：

| 选项 | 启用内容 |
|---|---|
| `--loop` | 让每个未结束的已注册计划持续运行至结束 |
| `--notify "<command>"` | 当计划停滞、受阻、失去 lead 或完成时，以及发生队列事件时，以 `plan-event-v1` 对象运行一条命令 |
| `--brain` | 一个专用决策 agent，处理规则无法判定的少数情况 |
| `--appoint` | 当 lead 和每个继任者都消失时，依据已记录的任命授权行事 |
| `--revive` | 为记录中无人能接管的计划启动一个新的 agent |
| `--dry-run`、`--scope`、`--exclude` | 只查看决策而不发送；限定机器；让某个窗格不受触及 |

## 空闲不等于停止

只有当计划未结束且以下条件全部成立时，daemon 才会请 lead 继续：lead 的窗格处于空闲或完成状态，且 5 分钟内没有变化；计划没有正在工作的 lane，lead 也没有在等待回复；其屏幕不是对话框、登录或用量上限；其输入行没有人类草稿；自上次提示以来它自行进行过一个轮次；且过去一小时内收到的提示少于 3 次。

提示是固定的，只填入计划 id：

> "Plan P is not finished and you are its lead. Continue executing it to its end, respecting its gates and the authority already recorded in the plan. Never weaken a gate to pass it. If the plan cannot go on without something only the developer can provide, record the blocker in the plan state and stop."

提醒只是请求，绝不授权。daemon 只提示 lead，因为 lanes 由其 lead 驱动。3 次循环提示后计划状态仍无进展，计划即被记录为 `plan_stalled`，并在其状态改变之前不再被打扰。拥有多个未结束计划的 lead 每轮只收到一条提示。

## 结构化阻塞

v8 计划将无法继续的原因记录为数据，因此循环、舰队地图和恢复执行的 agent 读取的是同样的字段，而不是去解读散文。阻塞通过 ledger 的 helper（`ledger.py block`）提出，并通过 `ledger.py unblock` 解决，作为 `journal-event/v8` 的 `blocker` 事件。直接追加阻塞事件会被拒绝。

| 字段 | 含义 |
|---|---|
| `task` | 被阻塞的任务；证据已关闭的任务不能被阻塞 |
| `reason` | 任务无法继续的原因（最多 1000 个字符） |
| `needs` | 一行文字说明解除阻塞所需的条件（最多 500 个字符） |
| `class` | 必填：C1–C7 之一 |
| `resolver` | 可选：`lead` 或 `human`；缺省时视为 `human` |

`resolver: "lead"` 表示该阻塞可在计划已记录的权限内解决，无需凭据、登录、同意、付款、推送到 main、发布或删除。它对 C1、C2、C5 和 C6 会被拒绝。每个计划最多只有一个活动阻塞，阻塞未解决期间其任务无法完成。

读取方可在计划的 `state.json`（即 `plan-snapshot/v8`）中找到阻塞：活动阻塞或 `null`，`blocked` 作为派生的任务状态。`PROGRESS.md` 以四行固定的标题行开头，每次状态转换时刷新：

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

循环克制地对待受阻计划。它不向其发送任何内容，并只记录一次 `plan_blocked`。daemon 及其 brain 都不能请 lead 去解决计划未标记为 `resolver: "lead"` 的阻塞；其余一切都等待人类。较早代际（v6 和 v7）的计划不记录阻塞事件，它们报告的每个阻塞都归人类处理。

## daemon 绝不做的事

daemon 绝不会：

- 触碰登录、sign-in、API 密钥或设备码提示，或 Claude 的 bypass-permissions 确认；登录由人类完成；
- 选择拒绝项、自由文本项，或会扩大 agent 常设权限的选项；
- 提示输入行中有人类草稿的窗格，或超出其范围的窗格；
- 提示受阻的计划，或其状态无法读取的计划；
- 写入或编辑 lead 记录、发送协议消息，或任命不在记录中的窗格；
- 写入计划队列。

如果权限对话框的每个选项都是拒绝或扩大权限，该对话框会被拒绝，而不会被搁置阻塞，随后 agent 会收到一次提示，要求在计划 gates 内另寻方式继续，或记录一个阻塞。如果是 agent 自己提出的问题且所有选项都是拒绝，则留给人类处理，因为那是关于工作本身的决定。

## 领导权：epoch、继任与接管

领导权由 epoch 加以隔离。每次转移 lead 的变更（交接、接管、释放、任命）都会使 epoch 递增，只有持有最高 epoch 的一方才作为 lead 行事。重新出现的前任 lead 会发现更高的 epoch，其 lead 命令会被拒绝，下一次 lead 通知会让它退位。

当 lead 消失时（其窗格连续两次列表都不存在），daemon 会请记录 `succession` 中第一个可联系的地址运行 `herdr-peers lead takeover --plan P`，每个 epoch 一次。它不传递原因，因此由 helper 自身的检查决定 lead 是否真的消失。达到用量上限的 lead 并未消失：daemon 每 30 分钟重试一次。如果继任顺序中无人可被请求，daemon 记录 `plan_no_lead`。

继任者继承计划、其验收标准及其 gates。继任改变的是由谁执行，绝不改变授权内容。

## 任命与 revive

对于 lead 和继任者都已消失的计划，还有两条路径。每条都需要人类的明确行为，并把接管交给 agent 自己完成，由 helper 检查。

**任命（协议 2）。** 它需要两项人类行为：记录在 lead 记录上的授权（`lead claim --allow-appointment`，lead 只有在其人类明确要求时才运行）以及以 `--appoint` 启动的 daemon。daemon 不能自行授予该权限。当 lead 和每个继任者在至少相隔 15 分钟的两次观察中都已消失且没有进展时，daemon 会请计划的第一个存活 lane 运行 `lead takeover --plan P --as-lane`。该 helper 会再次检查授权，确认这是一个在计划代码仓库中工作的 lane，并对 lead、每个继任者和每个较早的 lane 探测两次，间隔一分钟；任何存活迹象都会导致拒绝。每个计划最多允许两次任命。

**Revive（herdr-peers 2.2.0）。** 以 `--loop --revive` 启动 daemon 本身即是授权。当计划的 lead、其继任顺序和 lanes 中的每个成员都已消失且无人能接管时，daemon 可以在计划的检出目录中启动一个新的 agent，写入一次性票据，并指示它运行 `lead takeover --plan P --reason revive`。helper 只有在持有该票据且其自身检查确认每个成员都已消失后，才接受接管；复活后的记录只在 daemon 所在机器上被采用。lead 仍然存活的停滞计划绝不会被从它手中夺走：只会请该 lead 交接一次。revive 的上限为每个计划每 6 小时一次、每个计划总计两次，整个舰队每小时两次。

**不可逆步骤前先验证。** 被任命或复活的 lead 与任何 lead 一样，在任何 merge、tag 或 release 前运行 `herdr-peers lead verify --plan <id>`。当另一台机器显示该计划处于更高的 epoch 时，它会拒绝；当计划的某台机器无法连接时，它以非零状态退出。

## 可选的 brain

daemon 的规则几乎决定一切。对于规则无法判定的少数情况，`--brain` 会保留一个由 daemon 自行以 ask 模式启动的专用决策 agent，且只在一个封闭的操作列表内听从它。它需要 coding-agents-kit 1.3.0 或更高版本；否则，以 `--brain` 启动的 daemon 会拒绝启动，而不是在缺少所要求的 brain 的情况下运行。

| 情况 | 允许的操作 |
|---|---|
| 计划停滞 | 再提醒一次（每个计划一次）、告知人类，或保持不变 |
| 计划受阻，带有 `resolver: "lead"`、属于 lead 可处理的类别（C3、C4、C7）且不涉及敏感事项 | 向 lead 发送一条固定请求，要求在已记录权限内解决、告知人类，或保持不变 |
| agent 停在 daemon 无法识别的屏幕上 | 告知人类，或保持不变 |

如果 3 分钟内没有有效答复，默认保持不变。brain 的文本绝不会被输入、按键或执行；它不能任命 lead、启动 agent、merge、release、登录或更改权限。daemon 始终是唯一执行者。在 v8 下，计划的 `autonomy.brain` 记录 brain 是否可以对该计划采取任何行动。

## 计划队列

代码仓库可以在 `.dwp/queue.json` 中保存已批准计划的队列，模式为 `dwp-queue-v1`。由 pack（`shared/queue.py`）或人类写入；daemon 只读取它，有界读取并整体验证。当开发者要求排队时（或 v8 契约记录的 `autonomy.queue` 不是 `none` 时），create 会在批准时追加计划；人类或 lead 调整其顺序；当计划在其 lead 下开始时，execute 将该项标记为 `started`，计划收尾后标记为 `done`。一个队列最多容纳 64 项。依赖仅限于队列内部：`after` 指向一个已排队的计划。除非队列带有 `parallel: true`，否则每个代码仓库一次只运行一个计划。

使用 `--loop` 时，当代码仓库的当前计划结束，下一个就绪项会通过向队列指定的 lead 发送一条固定提示来启动：“Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.”只有当其 `after` 计划已完成、该代码仓库没有其他计划正在运行、它指定了 lead，且其批准仍是该计划针对当前契约的最新批准或修订事件时，该项才算就绪。`launch` 条目不会由循环启动；与未批准的项或缺少 lead 的项一样，它会被报告为 `queue_blocked`。损坏的队列按空队列读取，绝不会破坏计划生命周期。

## 事件、通知与舰队地图

daemon 以一个 `plan-event-v1` JSON 对象，通过 `--notify` 命令的标准输入报告计划事件：事件、计划、机器、lead、代码仓库以及阻塞的类别。事件包括 `plan_stalled`、`plan_blocked`、`plan_no_lead`、`plan_lead_moved` 和 `plan_completed`（每个计划和情况各一次），以及 `plan_queued_started`、`queue_blocked`、任命与 revive 事件，和来自 brain 的 `needs_human`。失败会被记录，但绝不会中止本轮处理。

pack 的 Herdr 插件附带一个 Dailybot notifier（`scripts/notify-dailybot.py`），通过已安装的 Dailybot CLI，将完成、停滞、受阻、无 lead 和 lead 转移事件转为一条便于阅读的团队更新。当 CLI 不存在、未登录或发送失败时，它会静默退出。通知用于报告进展或需求；它们绝不授权操作，也不取代计划记录。

要观察循环，`herdr-peers plans` 打印一台机器的计划（`plans-v1`），`herdr-peers fleet` 打印合并后的地图（`fleet-v1`）：机器、agents、计划，以及每个 agent 作为 lead、继任者或 lane 的角色。`herdr-peers fleet ui` 实时展示该地图，可按计划、代码仓库、机器或队列分组，并提供需要关注、活动中、等待中或已完成的视图。界面只读：不会写入计划状态，也不会提示任何 agent。

## 示例：一个计划的一夜

以下演示仅作说明；每一步都遵循上文记录的规则。

1. 晚上，开发者批准一个计划，其 `autonomy` 块除 `notify` 外均保留默认值。agent 运行 `execute`，以一个继任者认领 lead 记录。
2. 开发者启动 `herdr-peers autopilot start --loop --notify "<notifier>"` 后离线。
3. lead 完成三个任务并结束其轮次。五分钟后，在没有 lane 工作且没有待处理回复的情况下，daemon 发送固定的继续提示，lead 从下一个任务继续。
4. 某个任务需要计划未持有的密钥。lead 提出一个 C1 阻塞，未填写 resolver（视为 `human`），然后停止。daemon 不向该计划发送任何内容，记录 `plan_blocked`，notifier 发布一条注明阻塞类别的团队更新。
5. 早上，开发者提供所需输入，lead 用 `ledger.py unblock` 解决阻塞，执行继续。之后 lead 的窗格关闭；连续两次列表中都没有它后，daemon 请继任者运行 `lead takeover`，epoch 递增，继任者在相同 gates 下继续。
6. 在计划最终 merge 前，新 lead 运行 `lead verify`。计划完成，`plan_completed` 送达 notifier；如果代码仓库有队列，下一个已批准计划的 lead 会收到固定的队列提示。

在整个过程中，daemon 从未批准任何事项、输入凭据，或决定工作应当是什么。

## 权限边界

循环恰好止于计划权限的边界。agent 协议的升级类别标出了这条界线：C1 权限（超出计划授权的操作、处于同意检查点的操作或涉及密钥的操作）、C2 同意屏幕（权限、登录、凭据或付款屏幕，绝不由 agent 按键操作）、C3 不可消除的歧义、C4 不削弱就无法通过的 gate、C5 损害、C6 条款，以及 C7 能力耗尽。当其中任何一项在未经预先授权的情况下出现时，执行会停在该 gate，需求被记录并报告。

登录和凭据始终是人类的操作。人类启动 daemon，明确授予任命或 revive，并解决已记录权限无法满足的需求。其他一切都会通知人类，而不是要求人类逐步看护。

## 不使用插件时

以上都不是必需的。没有 Herdr，或插件被禁用时，pack 的行为就像循环不存在一样：计划在一个会话中执行，通过 `resume` 从第一个未完成任务恢复，或通过人类协调的交接移交给另一个 agent。计划契约、结构化阻塞和 `PROGRESS.md` 标题以同样方式工作，因此人类或另一个 agent 读取的正是循环本会读取的状态。
