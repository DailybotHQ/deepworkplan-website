---
title: 循环工程 (loop engineering)
description: "v8 循环的规范语义：已记录权限、人工启动的持续执行、继任、阻塞、队列、通知、舰队可见性及权限限制和默认值说明补充指南。"
order: 12
lang: zh
section: 循环工程
---

# 循环工程 (loop engineering)

本页定义循环工程的计划契约。**计划**仍是权限依据；循环提供连续执行和可见性。插件可以增强方法，但不能扩大计划已记录的权限。

## 1. v8 规则

已批准计划会在没有人工逐步看护的情况下执行至结束。自主运行的默认范围是**计划已记录的权限内**；人类会收到通知，无需等待人类处理日常进展。登录和凭据仍需人工处理；计划自身的 C1–C7 gates（例如发布、推送或对外消息）仍会停止执行，除非计划记录了预授权。v7 规则不变：核心方法可独立运行，插件只提供增强。

### 1.1. 循环语义

### 注册与观察
启用 Herdr 插件后，v8 pack 的 `execute` 流程会认领 lead 记录并登记计划继任者。只有存在 lead 记录且状态可读的计划才会被观察。由人类启动 `herdr-peers autopilot --loop`；它是 daemon，不是登录项或系统服务。一个 daemon 可观察所有已启用 Herdr 机器报告的计划。没有 lead 记录的计划不会被观察。

### 持续执行、停滞和故障转移

对于开放计划，daemon 只提示 lead，并且必须通过空闲检查：lead 已空闲或完成五分钟，没有 lane 正在工作、没有待回复；pane 在允许范围内且未排除；屏幕不是对话框、登录、使用限额，也没有人类草稿。固定提示要求 lead 遵守 gates 和已记录权限，把计划执行到底。提示不授予任何权限。计划状态连续三次提示仍无进展后，daemon 记录 `plan_stalled` 并等待状态变化。已阻塞的计划会被报告，不会被反复提示。

lead 消失时，daemon 会请列表中第一个可联系的继任者运行 `herdr-peers lead takeover --plan <id>`。helper 会验证继任顺序并增加 epoch；daemon 不会写 lead 记录，也不会选择名单外的 pane。单有使用限额不能证明 lead 已消失。协议 2 也支持从计划 lane 中任命 lead，但必须由人类先运行 `lead claim --allow-appointment` 记录明确授权，并以 `--appoint` 启动 daemon。任何 merge、tag 或 release 前，当前 lead 都须运行 `herdr-peers lead verify --plan <id>`。

### brain、事件和舰队

可选 `--brain` 会为 daemon 规则无法判断的情况启动专用决策 agent。它只能从封闭的操作列表中选择。daemon 始终是唯一执行者：验证允许的选择并执行操作，绝不执行 brain 的自由文本。计划的 `autonomy` 块也必须允许 brain。

循环会记录停滞、阻塞、lead 丢失、完成和队列结果等计划事件。启用可选 `--notify` 集成时，daemon 会把 `plan-event-v1` 对象发给配置的 notifier；pack 的 Dailybot notifier 会将支持的事件转为团队更新。通知不会批准工作或更改计划记录。舰队地图和 `herdr-peers fleet ui` 显示多台机器上的 agent 与计划。界面只读，不更改计划状态，也不提示 agent。标记版本的行为见 [herdr-peers v2.1.0 autopilot 文档](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/autopilot.md)和[协议文档](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/protocol.md)。

## 2. `autonomy` 块（plan-contract/v8）

可选顶层对象 `autonomy` 是封闭结构，未知字段无效。规范字段名和类型见[plan-contract/v8 schema](https://deepworkplan.com/schema/plan-contract/v8.json)。缺少整个块时应用所有默认值；块存在时，每个省略字段保留各自默认值。消费者不得自行猜测。

| 字段 | 类型与允许值 | 省略时默认值 |
|---|---|---|
| `stall_budget` | 1 到 10 的整数 | `3` 次无进展提示 |
| `promptable` | 非空 Herdr pane 地址列表 | 仅计划 lead |
| `notify` | 非空目标列表；当前为 `dailybot` | 无目标；循环仍记录事件 |
| `brain` | 布尔值 | `false`；brain 不得对计划采取行动 |
| `queue` | `prompt-lead`、`launch` 或 `none` | `none`；计划不进入队列 |

Pane 地址严格采用 Herdr 格式：`(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`。机器 ID 不能以 `-` 开头。这些设置限制哪些 pane 可被提示、谁接收事件、brain 是否能行动，以及计划如何参与队列；它们不会修改验收标准或 gates。

## 3. 结构化阻塞
### 3.1. 阻塞记录

### 3.2. 读取位置
被阻塞的计划会在 `state.json` 的 `blocked` 或 `blocker` 记录中写入 C 类别和可选 `resolver`。`resolver` 可为 `lead` 或 `human`；省略表示 `human`。`lead` 表示可在已记录权限内解决，且不需要凭据、登录、同意、付款、推送到 main、发布或删除。循环（包括 brain）只能请求 lead 解决标为 `lead` 的阻塞。其他阻塞会报告给人类，不会通过提示绕过。
### 3.3. 循环可执行的操作

已发布的 herdr-peers 舰队地图最多显示计划自身 `PROGRESS.md` 的 14 行净化摘要。这是观察数据，不是权限授予，也不是机器可读进度头的已发布 schema。pack v8 线计划的进度头格式须在 8.0.0 tag 上核验后才能作为规范。

## 4. 计划队列

队列位于 `.dwp/queue.json`，schema 为 `dwp-queue-v1`。只有 pack 会写入：`create` 在批准时追加；人类或 lead 通过计划流程调整顺序；`execute` 认领 lead 时标为 `started`（并记录 lead 地址）；最终完成时标为 `done`；`create` 或 `refine` 可用单行说明标为 `skipped`。队列项包含计划、可选 `after` 依赖（指向队列中已有计划）、状态、lead 和启动模式。除非队列明确设置 `parallel: true`，每个仓库一次运行一个计划。

daemon 是有界的只读消费者。损坏队列按空队列处理，不影响计划生命周期。只有依赖已完成（或不存在）、计划已批准、lead 已指定，且同仓库没有其他运行计划（除非允许并行）时才能启动。`prompt-lead` 模式只向指定 lead 发送一条固定提示：“计划 P 是此仓库队列中的下一个计划，且已获批准；请遵守 gates 将其执行到底。”daemon 不写队列状态。除非发布契约明确加入此行为，循环不会执行 `launch` 模式。

## 5. v8 保留的内容

v8 保留 v7 的 `tasks[].parallel_safe`、delegation 和 journal 契约。v8 journal 事件集与 v7 相同；代际顺序递进，因此标为 v7 的功能在 v8 及后续代际仍可用。在记录层中，v8 保留 v7 manifest 和 journal-event schema URL，只为新一代增加 `plan-contract/v8` URL。v5、v6、v7 计划继续保留已记录代际，不会静默迁移。

v8 不要求安装插件。没有 Herdr 时，核心方法仍让计划在自身记录权限内执行。启用 Herdr 后，注册、有限持续执行、继任、通知、队列和只读舰队视图增强同一计划生命周期。
