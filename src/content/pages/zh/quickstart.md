---
title: "快速开始 — Deep Work Plan"
description: "安装技能，接入你的代码仓库，然后用任意代理规划并执行——让你的仓库变得规范驱动、可被代理驾驭的各个步骤。"
lastUpdated: 2026-05-31
---

## 快速开始

安装技能，接入你的代码仓库，然后用任意代理规划并执行——让
你的仓库变得规范驱动、可被代理驾驭的各个步骤。

## 采纳路径

### 1. 安装 Deep Work Plan 技能

把技能添加到你的代码仓库。它附带一个路由器外加八个子技能——create、execute、refine、
resume、status、verify、onboard 与 author。使用 Skills CLI 是最快的方式：

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

或者在具备 git 与 shell 的环境中克隆仓库并运行 setup：

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### 2. 接入代码仓库

运行 onboard 子技能，让代理对你真实的仓库进行推理——它的技术栈、包
管理器与真实的验证命令：

```bash
/deepworkplan-onboard
```

它会生成 `AGENTS.md`、一套 `docs/` 知识库、各模块文档，以及一个跨代理的 `.agents/` 目录
（含 `.claude → .agents` 符号链接），接入轻量的 `dwp-*` 命令，并搭建一个被 gitignore 的
`.dwp/` 以存放计划与草稿。没有任何东西套用模板；一切都适配于你的代码仓库。

### 3. 演化套件并采纳附加组件

使用 `/skill-create` 与 `/agent-create`（author 子技能）来培育与技术栈相适配的技能、
代理与命令。接入流程还会提供四个可选附加组件——devcontainer、Dailybot、
dependency-upgrade 与 design-system——你只在它们契合时才采纳。一个仓库即便不带任何附加组件，也完全符合规范。

### 4. 规划并执行

生成一份 Deep Work Plan 并逐任务运行它：

```bash
/dwp-create <goal>
/dwp-execute
```

随着工作推进，使用 `/dwp-status`、`/dwp-refine` 与 `/dwp-resume`。每份计划都带有编号任务、
验证关卡与一套完成协议，使工作保持结构化，并可跨会话恢复。

## 成果

你的代码仓库变得规范驱动、可被代理驾驭：计划是持久的事实来源，而
代码仓库本身成为任意代理依据其运行的 harness（运行支架）。

- [阅读方法论](/methodology)
- [浏览规范](/spec)
- [探索套件](/kit)
