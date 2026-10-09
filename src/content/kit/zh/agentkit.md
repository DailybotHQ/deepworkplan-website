---
title: Agentkit
description: "基于 coding-agents-kit 的可选 v7 附加组件：一个 ak 命令覆盖所有终端编码代理，并以无头方式委派有边界的计划任务。"
kind: addon
lang: zh
order: 8
---

# Agentkit 附加组件

每个终端编码代理都有自己的一套参数用于继续会话，有自己的方式隔离第二个账户，有自己的无头模式，也有自己用于跳过权限提示的开关。**[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** 在它们之上提供统一的命令界面：`ak <kind> [@profile]`。

这个附加组件把该工具包集成进 **DWP v7**（`v7.0.0`），作为**无头**委派传输方式。它是可选的：没有它，每项任务都在当前会话中运行，与以往完全一样。工具包本身是一个 MIT 产品，脱离 Deep Work Plan 也能使用。

## 工具包为你提供什么

- **所有 CLI 共用一套语法。** `ak claude`、`ak codex`、`ak cursor`、`ak opencode`、`ak pi`、`ak cline` 和 `ak grok`，以及各提供方变体（GLM、Azure、xAI），使用相同的会话参数：`-c` 继续，`-r <id>` 恢复。
- **配置档。** `ak claude @work` 在独立的主目录中运行第二个账户，与第一个账户相互隔离。
- **无头运行。** `ak run <kind> -- "<prompt>"` 以非交互方式运行一条提示，并返回有文档说明的退出码，也可选择以单个 JSON 对象返回。
- **诊断工具。** `ak doctor --json` 报告已安装哪些 CLI、有哪些配置档，以及已设置的密钥的名称——绝不报告其值。
- **安装。** `ak install <cli>` 从供应商的官方渠道安装缺失的 CLI。

## 安装

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

要求：macOS 或 Linux 上的 `bash`，以及 `python3` 3.9 或更新版本；仅此而已。Windows 使用 `install.ps1`。请固定 `v0.1.1`：它取代了 `v0.1.0`，并包含一项安全修复。可使用发布版本的 `SHA256SUMS` 资产对其进行校验。

| 项目 | 值 |
|---|---|
| 产品 | `DailybotHQ/coding-agents-kit`，标签 `v0.1.1`，接口 1 |
| 注册表键 | `.dwp/config.json` 中的 `agentkit` |
| 传输方式 | 无头：每个被委派者在专用的 git worktree 中执行一次 `ak run` |
| 提供 | `subagents`、`cancel_children`、`model_routing` |
| 要求 | 计划契约中的 `agent_delegation` 授权 |

## 权限原样透传

`ak <kind>` **不**添加任何绕过权限的参数。自主模式需要显式选择启用：在单条命令上使用 `--auto`，或在环境中设置 `AGENTKIT_PERMISSIONS=auto`，即可为该次启动加上 CLI 自身的自主参数。`classic` 别名预设可重建 `claudex` 之类的快捷方式，默认处于关闭状态。

该附加组件绝不会自行添加自主参数。计划只有在开发者明确且有记录地选择启用时才使用 `--auto`，并且只在隔离的 worktree 或容器内使用。

## 它为计划添加了什么

在契约授予 `agent_delegation` 的 v7 计划中，`execute` 可以把一项 `parallel_safe` 任务交给另一个 CLI：它创建一个专用的 git worktree，在其中带超时地运行 `ak run`，并把结果收集到计划的 `analysis_results/delegations/` 中。在计划自身的门控运行器观察到之前，该结果都属于 `asserted` 证据。取消一个被委派者会停止其整个进程树。

## Agentkit 还是 Herdr

| 情形 | 使用 |
|---|---|
| 一项有边界、声明了输出的 `parallel_safe` 任务 | Agentkit（无头） |
| 任务需要交互、运行时间长，或位于另一台机器上 | [Herdr](/kit/herdr)（窗格中的一个对等方） |

二者可以组合：herdr-peers 可以使用 `ak env <kind> @profile` 输出的环境，在窗格中启动一个对等方。

## 备注

可选且绝非必需。API 密钥的值绝不会被打印、记录到日志或写入配置文件；有文档说明的例外是 Cline，它通过命令行接收密钥。OpenCode、Pi、Cline 和 Grok 的结果提取依据供应商文档构建，尚未在真实账户上实际运行过；无法识别的输出会回退为原始文本。
