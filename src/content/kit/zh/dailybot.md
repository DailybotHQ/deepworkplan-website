---
title: Dailybot
description: "可选 DWP 附加组件：将计划生命周期连接到 Dailybot 团队，可选钩子强制层，以及完整的 Dailybot 代理技能 3.10.3（聊天、签到、表单、Ask AI 等）。"
kind: addon
lang: zh
order: 2
---

# Dailybot 附加组件

将 Deep Work Plan 执行连接到 **Dailybot 团队**，让人类了解代理正在构建什么——启动、计划中期进展、阻塞与完成——而无需增加会议或第二套工具链。面向已在使用 [Dailybot](https://www.dailybot.com) 的团队的**可选**附加组件。

核心 Deep Work Plan 方法论对 Dailybot **零**依赖。零附加组件的仓库完全符合规范。仅在开发者或团队已在使用 Dailybot 时提供此附加组件；切勿为所有人自动安装。

## 何时使用

| 信号 | 操作 |
|------|------|
| 团队已在使用 Dailybot（Slack、Teams、Discord、Google Chat 或控制台） | 接入期间**推荐** |
| 开发者要求代理进展可见性或站会式更新 | **提供**此附加组件 |
| 无 Dailybot 账户的全新仓库 | **跳过**——供应商中立的基线已足够 |
| 受 NDA 约束、进展不得离开仓库的客户工作 | **跳过**，或提交 `.dailybot/disabled` 作为本地终止开关 |

## 此附加组件接入的内容（刻意保持精简）

DWP Dailybot 附加组件**不会**重新发明 Dailybot。它将计划执行连接到 dailybot **`report`** 子技能，并可选择提交 harness 钩子。其余一切——安装、同意、认证、书写风格——均**延后**至官方 [Dailybot 代理技能](https://github.com/DailybotHQ/agent-skill)（当前 **3.10.3**）。

### 四个生命周期事件

在 DWP `create` / `execute` 期间，此附加组件接入**四个尽力而为的代理更新**。每个事件均有条件（Dailybot 存在且已认证）、非阻塞，并尊重 `.dailybot/disabled`。

| 事件 | 触发条件 | 级别 | 要求 |
|------|----------|------|------|
| **Kickoff** | 计划物化并获批，或首次 `execute` 回合 | regular | SHOULD |
| **Significant task** | 功能、缺陷修复或重大重构完成——非搭建杂务 | regular | MAY |
| **Blocked** | 计划暂停；`state.json.blocked` 已填充（`reason`、`needs`） | regular + blockers | SHOULD |
| **Completion** | 所有任务完成；计划结束 | **milestone** | SHOULD |

当存在时，载荷从计划的状态层（`state.json`）派生：`completed` 为成果（非任务编号），`in_progress` 来自当前任务，`blockers` 来自 `state.json.blocked`。消息描述**构建了什么以及为何**——绝不包含文件路径、git 统计、分支名或计划 ID。

### 可选钩子强制层

使用 `dailybot-cli >= 3.7.0` 时，此附加组件**可以**提交仓库级 harness 钩子（`dailybot hook session-start | activity | post-commit | stop | dismiss`），由本地每仓库台账支撑。当遗漏生命周期事件时，harness 在回合结束时提醒代理——对提示词指令逐渐失效的长时间无人值守会话至关重要。

成功的生命周期报告会**重置**钩子台账，因此两层机制不会重复报告。钩子命令仅读取本地状态并始终以 `0` 退出。

### 仓库身份与报告策略

可选择提交 `.dailybot/profile.json`（或 `.dailybot_example/profile.json` 作为模板），使每位贡献者与代理以相同方式签署报告。**切勿**在该文件中存放凭据——`key` 字段为硬性错误。

同一文件可携带钩子遵循的报告策略：

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` 对研究型或文档密集型仓库尤其有用：非提交类工作（分析、设计文档、计划）会更快收到提醒。

## 安装（全部可选）

此附加组件**提供**安装路径；Dailybot 技能拥有同意与验证流程。

| 组件 | 命令 / 路径 |
|------|-------------|
| **Dailybot 代理技能**（推荐） | `npx skills add DailybotHQ/agent-skill` |
| **更新现有技能** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git 克隆** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI**（最低 `>= 3.7.0`） | 首次使用时由技能通过已验证的 `shared/auth.md` 安装；或 `pip install 'dailybot-cli>=3.7.0'`、Homebrew，或 [cli.dailybot.com](https://cli.dailybot.com) 上的校验和验证安装器 |

检查版本：`dailybot --version` 和 `dailybot version --check`。升级：`dailybot upgrade`。

## 认证——延后处理

此附加组件**从不**提示输入电子邮件、OTP 或 API 密钥，也**从不**存储凭据。认证由 Dailybot 技能的 [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md) 负责：

- `dailybot login`（电子邮件 OTP），或
- `DAILYBOT_API_KEY` / `dailybot config key=...`，或
- 可选的、被 gitignore 忽略的 `.dailybot/env.json` 每仓库密钥文件（`dailybot env add/use`，CLI `>= 3.7.0`），使开发者能够在不同仓库中登录不同组织。

认证解析采用 **Bearer 优先**：会话令牌优先，并在遇到 `401`/`403` 时透明地从 Bearer→API 密钥重试，因此过期令牌绝不会阻塞有效密钥。若拒绝认证或认证不可用，则静默跳过报告——工作继续进行。

## 配套的 Dailybot 技能——14 项能力（3.10.3）

安装 Dailybot 代理技能带来的远不止 DWP 附加组件所接入的内容。官方技能包（技能 **3.10.3**，CLI 基线 **>= 3.7.0**，当前发布 **3.7.3**）暴露 **14 个协调子技能**：

| 子技能 | 功能 |
|--------|------|
| **Progress reports** | 向 Dailybot 控制台发送站会式代理更新 |
| **Ask the AI** | 向 Dailybot AI 助手发起一次性无头查询 |
| **Message polling** | 在会话开始或空闲时检查团队指令 |
| **Email** | 发送电子邮件，含强制发送前安全检查 |
| **Chat** | 在 Slack、Microsoft Teams、Discord 或 Google Chat 上发送或编辑——频道、私信、团队、报告式线程、以用户身份发送（Slack，管理员） |
| **Conversations** | 打开或复用与机器人和指定队友的 Slack 群组私信；在同一调用中发布报告 |
| **Health and status** | 为长时间运行会话宣布代理在线/离线 |
| **Check-ins** | 完成站会；**编写**签到（日程、参与者、问题、提醒、AI 设置） |
| **Kudos** | 表彰队友或整个团队；浏览认可动态、组织动态、荣誉墙 |
| **Teams** | 列出团队、查看成员、将名称解析为 UUID；`me`、`org`、用户资料 |
| **Forms** | 列出（现默认**组织范围**，可用 `--mine` 和 `--owner` 收窄）、提交、更新、流转表单；**编写**表单（工作流状态、权限、ChatOps）；分页、搜索与日期筛选 |
| **Workflows** | 读取组织工作流（`workflow list` / `workflow get`；只读） |
| **Report channels** | 发现用于表单或签到的频道 UUID |
| **Per-repo API keys** | 管理 `.dailybot/env.json`——一个可选的、被 gitignore 忽略的、按环境组织的 API 密钥 + URL 文件（`dailybot env add / use / show / list / remove / off / on`，CLI `>= 3.7.0`） |

**DWP 附加组件仅将 `report` 接入计划执行。** 直接调用 Dailybot 技能处理其余一切——例如，向 `#releases` 发布部署摘要、完成站会，或请 Dailybot AI 总结签到趋势。

公开参考：[dailybot.com/skill.md](https://www.dailybot.com/skill.md)。源码：[DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill)。信任模型：技能包中的 [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md)。

## 行为——延后，绝不阻塞

| 规则 | 详情 |
|------|------|
| **延后** | Dailybot 技能拥有安装、同意、认证、钩子模板、书写风格 |
| **绝不阻塞** | CLI 缺失、认证失败、网络错误 → 警告一次，继续主要工作 |
| **不重试** | 不进入诊断循环；报告为尽力而为 |
| **调和** | 保留现有技能、CLI、配置文件、钩子或报告接入——仅填补缺口 |
| **供应商中立** | DWP 不要求 Dailybot；此附加组件为附加的团队可见性 |

## 接入流程

在 DWP `onboard` **第 7b 阶段**，核心 AI-first 脚手架完成后，流程提供五个可选附加组件。若开发者接受 Dailybot：

1. 检测现有设置（技能、CLI、`.dailybot/profile.json`、钩子、报告步骤）。
2. 通过 Dailybot 的同意流程提供技能/CLI 安装。
3. 将认证延后至 `shared/auth.md`。
4. 将四个生命周期事件接入 `AGENTS.md` / `docs/AI_AGENT_COLLAB.md`。
5. 可选择提供钩子强制层和 `.dailybot/profile.json`。
6. 运行验证（技能 `addons/dailybot/SPEC.md` 中的 SPEC §8）。

Deep Work Plan 技能中的规范性合约：`addons/dailybot/SPEC.md`（版本 **2.3.0**）。

## 相关套件条目

- [Devcontainer](/kit/devcontainer)——可复现的开发环境，含 Dailybot CLI 持久化（第一个附加组件）
- [Dependency upgrade](/kit/dependency-upgrade)——分批、经验证的依赖升级（第三个附加组件）
- [Design system](/kit/design-system)——面向代理的界面表面 `DESIGN.md`（第四个附加组件）
- [Deep Work Plan onboard](/kit/deepworkplan-onboard)——提供附加组件的接入子技能
