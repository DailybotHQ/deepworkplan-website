---
title: Herdr
description: "可选的 v7 附加组件：让计划把一项任务交给任意机器上 Herdr 窗格中的另一个编码代理，并记录其唯一一条获授权的回复。"
kind: addon
lang: zh
order: 7
---

# Herdr 附加组件

[Herdr](https://herdr.dev) 把编码代理放进窗格中，既可在你的机器上，也可在它通过 SSH 连接到的机器上。这个附加组件让 Deep Work Plan 把这些代理当作**对等方**来使用：计划可以把一项有边界的任务交给另一个窗格中的代理，接收恰好一条获授权的回复，并保留这次交互的记录。

它是 **DWP v7**（`v7.0.0`）的一个可选附加组件。没有它，方法论的运作方式完全相同：附加组件缺失或被禁用时，每项任务都在当前会话中运行，与以往完全一样。

## 它集成了什么

该附加组件是一个轻量的集成层。实际工作由 **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)** 完成，它是一个独立的 MIT 技能，固定在 **`v0.1.0`**，脱离 Deep Work Plan 也能使用。它定义了 Herdr 本身留白的部分：谁可以回答，答复如何跨机器返回，两个代理如何避免无休止地互相回答，以及“我提问、它回答”的记录存放在哪里。

| 项目 | 值 |
|---|---|
| 产品 | `DailybotHQ/herdr-peers`，标签 `v0.1.0`，协议 1 |
| 注册表键 | `.dwp/config.json` 中的 `herdr` |
| 传输方式 | 交互式：Herdr 窗格中的一个对等方 |
| 提供 | `subagents`、`cancel_children` |
| 要求 | 计划契约中的 `agent_delegation` 授权 |

## 安装

安装 herdr-peers 及其所依赖的 Herdr 官方技能。凡是其代理需要作答的机器，也都需要安装该技能。

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v0.1.0 --skill herdr-peers -g -y
npx --yes skills add https://github.com/herdrdev/herdr/tree/v0.9.3 --skill herdr -g -y
```

要求：Herdr 0.9.1 或更新版本、`bash`，以及 `python3` 3.9 或更新版本（仅使用标准库）。接入流程会提供该附加组件，并把你的回答记录在附加组件注册表中；未经同意，它绝不会被启用。

## 它为计划添加了什么

- **委派给对等方。** 在契约授予 `agent_delegation` 的 v7 计划中，`execute` 可以把一项 `parallel_safe` 任务或一个只读问题，交给另一个窗格中的代理，无论该代理在本机还是在另一台机器上。
- **一条获授权的回复。** 请求带有一个戳记，只授权恰好一条答复。对等方通过辅助程序回复一次，回复本身也带有自己的戳记。
- **先记录，后依赖。** 每次委派都会在回复被使用之前写入计划的 `analysis_results/delegations.ndjson`，并对应 v7 的 `delegation` 日志事件。
- **结果在核验前仍是声明。** 对等方的答复在计划自身的门控运行器观察到它之前，都属于 `asserted` 证据。它绝不会独自关闭一项任务。

## 安全模型

| 规则 | 含义 |
|---|---|
| 先有授权 | 仅当计划契约授予 `agent_delegation` 时才会进行委派。 |
| 深度上限 1 | 带有 `depth=1` 或 `reply-to=` 戳记的消息绝不会被回答，被委派者也绝不会再委派。 |
| 扇出上限 | 默认情况下，每个调用方最多四个对等方。 |
| 是数据，不是指令 | 回复绝不会授予接收方原本没有的权限。 |
| 每条路径一个写入者 | 会写入文件的对等方在自己的 git worktree 中工作。 |

herdr-peers 不对发送方进行身份验证：戳记中的 `from=` 字段只是一项声明。缓解措施是 `HERDR_PEERS_SCOPE` 允许列表，它限定了对等方所接受的工作区和机器。

## Herdr 还是 agentkit

两个附加组件实现同一个委派接口——`launch`、`observe`、`collect`、`cancel`——但使用不同的传输方式。

| 情形 | 使用 |
|---|---|
| 一项有边界、声明了输出的 `parallel_safe` 任务 | [agentkit](/kit/agentkit)（在 worktree 中以无头方式运行 `ak run`） |
| 任务需要交互、运行时间长，或位于另一台机器上 | Herdr（窗格中的一个对等方） |

## 备注

可选且绝非必需。一个仓库在不带任何可选附加组件时即完全符合规范，也没有任何流程依赖这个附加组件。双窗格、跨机器的往返由针对模拟 Herdr 的测试覆盖；请为首次运行安排有人监督。
