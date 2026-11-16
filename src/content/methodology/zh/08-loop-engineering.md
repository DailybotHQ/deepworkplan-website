---
title: Loop engineering
description: "人工启动的 daemon 如何在已记录权限内，通过注册、继任、提醒、事件和通知推动已批准的 Deep Work Plan 持续运行。"
order: 8
lang: zh
summary: 在已记录权限范围内推动已批准计划持续运行的完整生命周期。
icon: repeat
---

# Loop engineering

**规范先行、闭环运行：代码仓库就是 harness，计划自行运行直至完成。** 本章介绍一种可选机制，让计划在首次执行轮次后继续推进。计划仍是持久规范；循环提供连续性，不会创造新权限。

## 注册计划

启用 Herdr 插件后，pack 的 `execute` 流程会认领计划的 lead 记录（`resume` 会再次认领），并在计划指定了继任者时添加继任顺序；只有记录了继任顺序，故障转移才会生效。该记录明确循环要观察的计划、当前 lead、epoch 和按顺序排列的继任者。没有 lead 记录的计划不会被监视。插件是可选的；没有它，核心方法仍可在单个会话中运行，或由人协调交接。

注册计划不会批准工作，也不会扩大计划的授权。在 v8 中，已批准计划会在自身记录的权限内运行至结束。验收标准和 gates 在整个执行期间始终具有约束力。

## 人工启动 daemon

由人类在 Herdr 环境中启动 `herdr-peers autopilot --loop`。它是本地后台 daemon，不是登录项或系统服务。它观察所有已启用机器上的已注册计划；当计划仍未完成、没有 lane 正在工作且没有待处理回复时，会提醒空闲 lead 继续。提示语固定为：在遵守 gates 和已记录权限的前提下，将已批准计划执行到底。

daemon 不处理登录、凭据提示或 Claude 的 bypass-permissions 确认。它绝不会选择拒绝项、自由文本选项，或会扩大 agent 权限的选项。提醒只要求 agent 继续，不会增加授权。lead 仍需记录阻塞并遵守计划 gates。三次提醒都没有进展后，daemon 停止提醒并报告 `plan_stalled`。

## 保持领导权受控

如果 lead 消失，daemon 会请列表中第一个可联系的继任者执行接管流程。lead 记录的 epoch 随之递增，接收方会强制执行继任顺序。协议 2 也支持任命 lead，但前提是人类已在计划中记录授权（`lead claim --allow-appointment`），并以 `--appoint` 启动 daemon；daemon 不能自行授予该权限。任何 merge、tag 或 release 前，当前 lead 都要运行 `herdr-peers lead verify --plan <id>`，检查计划各机器上的记录。

继任者继承计划及其 gates。继任或任命都不会更改验收标准，也不会允许超出已记录权限的工作。如果计划遇到按 C1–C7 规则必须由人处理的 gate，循环会报告需求并停在该 gate。凭据和登录也必须由人处理。其他进展会通知人类，无需人类逐步看护。

## 可选的 brain 和队列

可选的 `--brain` 会启动专用决策 agent，处理 daemon 规则无法判定的情况。它需要 coding-agents-kit 1.3.0 或更高版本；否则，以 `--brain` 启动的 daemon 会拒绝启动。brain 只能从 daemon 针对每种情况确定的封闭操作列表中选择：再提醒一次、向 lead 发送一条固定请求以解决计划标记为可由 lead 解决的阻塞、通知人类，或保持不变。daemon 始终是唯一执行者：它验证选择并执行符合条件的操作；绝不执行 brain 的自由文本。在 v8 中，计划还会在其 autonomy 块中记录 brain 是否可以对其采取行动。

计划队列使用 `.dwp/queue.json` 中的 `dwp-queue-v1` 文档。由计划工具写入；daemon 是有界的只读消费者。当 `after` 依赖已完成（或不存在）且批准仍有效时，排队的计划才符合条件。daemon 只会向队列指定的 lead 发送一条固定提示来启动计划：“Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.”此循环不会启动 `launch` 项。随着执行和收尾推进，队列状态由 pack 维护。

## 报告与观察

计划事件涵盖计划停滞、受阻、失去 lead 或完成，以及排队计划启动或无法启动。可选的 `--notify` 命令会针对受支持事件接收 `plan-event-v1` 对象；pack 的 Dailybot notifier 会将其转为团队更新。通知用于报告进展或阻塞，不会授权操作，也不会取代计划记录。

舰队报告和 `herdr-peers fleet ui` 展示多台机器上的 agents 与计划，包括需要关注的工作。界面只读：不会写入计划状态，也不会提醒任何 agent。它让人了解循环状态，但不会成为另一个控制平面。

## 边界

Loop engineering 围绕已批准规范闭合执行循环。它让继续执行、继任和报告成为常规流程，同时让计划继续作为权限来源，让 daemon 保持受限。人类启动 daemon、处理凭据和登录，并且只解决计划自身的 C1–C7 gates 或已记录权限无法满足的其他需求。循环的目标是让已批准计划在无需人工看护的情况下到达其定义的终点。
