---
title: Agentkit
description: "基于 coding-agents-kit 的可选 v7 附加组件：一个 ak 命令覆盖所有终端编码代理，默认自主运行并可选择退出，另支持无头委派。"
kind: addon
lang: zh
order: 8
---

# Agentkit 附加组件

每个终端编码代理都有自己的一套参数用于继续会话，有自己的方式隔离第二个账户，有自己的无头模式，也有自己用于跳过权限提示的开关。**[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** 在它们之上提供统一的命令界面：`ak <kind> [@profile]`。

这个附加组件把该工具包集成进 **DWP v7**（技能包 `v7.1.4`），作为**无头**委派传输方式。它是可选的：没有它，每项任务都在当前会话中运行，与以往完全一样。工具包本身是一个 MIT 产品，脱离 Deep Work Plan 也能使用。

## 工具包为你提供什么

- **所有 CLI 共用一套语法。** `ak claude`、`ak codex`、`ak cursor`、`ak opencode`、`ak pi`、`ak cline` 和 `ak grok`，以及各提供方变体（GLM、Azure、xAI），使用相同的会话参数：`-c` 继续，`-r <id>` 恢复。
- **配置档。** `ak claude @work` 在独立的主目录中运行第二个账户，与第一个账户相互隔离。
- **无头运行。** `ak run <kind> -- "<prompt>"` 以非交互方式运行一条提示，并返回有文档说明的退出码，也可选择以单个 JSON 对象返回。
- **诊断工具。** `ak doctor --json` 报告已安装哪些 CLI、有哪些配置档，以及已设置的密钥的名称——绝不报告其值。
- **经校验的安装。** `ak install <cli>` 从供应商的官方渠道以固定版本安装缺失的 CLI，并对照固定的 sha256 或 npm 注册表的完整性信息进行校验。
- **熟悉的名称。** 两个别名预设，在你启用之前保持关闭：`classic`（`claudex`、`codexx`、`cursorx`、`opencodex`、`pix`、`clinex`、`grokx`）和 `providers`（`claude-glm`、`codex-azure`、`codex-xai`、`pi-glm`、…），每个都对应一个 `ak <kind>`。

## 安装

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

要求：macOS 或 Linux 上的 `bash`，以及 `python3` 3.9 或更新版本；仅此而已。Windows 使用 `install.ps1`。请固定 `v0.3.0`：`v0.2.0` 和 `v0.2.1` 不受支持。可使用发布版本的 `SHA256SUMS` 资产对其进行校验。

| 项目 | 值 |
|---|---|
| 产品 | `DailybotHQ/coding-agents-kit`，标签 `v0.3.0`，接口 1 |
| 注册表键 | `.dwp/config.json` 中的 `agentkit` |
| 传输方式 | 无头：每个被委派者在专用的 git worktree 中执行一次 `ak run` |
| 提供 | `subagents`、`cancel_children`、`model_routing` |
| 要求 | 计划契约中的 `agent_delegation` 授权 |

## 默认自主运行，退出选项始终优先

自 `v0.2.0` 起，`ak <kind>` 以**自主模式**启动每个代理：它会添加 CLI 自身的自主参数，该参数只保存在工具包的 `providers.toml` 中。自主模式面向可丢弃或沙箱化的环境，例如开发容器。

**退出选项始终优先**：在单条命令上使用 `--ask`，或在环境或工具包的 env 文件中设置 `AGENTKIT_PERMISSIONS=ask`，即可抑制该参数，即使同一条命令带有 `--auto` 也是如此。已选择退出的会话会把退出选项传递给它启动的代理。在主机上，请设置退出选项。

该附加组件不写入任何自主参数，也从不传递 `--auto`。当计划记录了退出选项时，它会传递 `--ask`。在主机上授予 `agent_delegation` 的计划，即接受被限制在各自 worktree 中的自主被委派者，而 worktree 并不是沙箱。

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
