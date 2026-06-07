---
title: "Deep Work Plan — 面向 AI 编码代理的结构化执行"
description: "上下文比模型更重要。Deep Work Plan 将任意代码仓库转化为结构化环境，让任意编码代理都能完成长周期工作。"
lastUpdated: 2026-06-03
---

## 模型很重要。上下文更重要。

Deep Work Plan 将任意代码仓库转化为结构化环境——上下文、防护栏与一份持久的计划——让任意编码代理都能精准执行并完成长周期工作。

Deep Work Plan（DWP）是一套开放、采用 MIT 许可的方法论与套件，用于与 AI 代理一同规划并执行复杂的软件工作。你无需挑选安装方式或复制模板——你复制 init.md 提示并将其粘贴到你的代理：

> 复制 init.md 提示并将其粘贴到你的编码代理中——Claude Code、Cursor、Codex 或任何其他代理——让任意代码仓库变为 AI-first。

> Deep Work Plan 是一种规范驱动的开发方式，在其中代码仓库本身成为执行的 harness（运行支架）。

- [打开 /init 提示](/init)
- [阅读方法论](/methodology)

---

## 问题与答案

AI 编码代理在短时冲刺中效果惊人。但在长周期工作上——一次迁移、一个新子系统、一次跨越数十个文件的重构——它们会发生漂移：上下文被填满，决策被遗忘，多小时的任务在半途被放弃。

Deep Work Plan 以**规范驱动的开发方式**作答：计划是持久的事实来源，代理依据明确的验收标准与验证关卡来执行。漂移随之减少，工作保持可验证，任意代理都能跨会话恢复它。与那些绑定于单一 IDE 或供应商的规范驱动工具（GitHub Spec Kit、Amazon Kiro、Tessl）不同，DWP 是工具无关、仓库原生的。

它同时也是被打磨为可移植形态的 **harness 工程**。代理的 harness（运行支架）是围绕模型构建的脚手架——上下文、工具、控制循环、防护栏、可恢复状态——它让模型变得可靠。Deep Work Plan 将这套 harness 安装进代码仓库本身，让任意代理都能驾驭任意仓库。

---

## 你将获得什么

- 位于代码仓库根目录的 AGENTS.md，从你真实的技术栈与命令推理而来。
- 分类的 `docs/` 与各模块文档。
- 一个 `.agents/` 目录（技能、代理、命令），含 `.claude` 到 `.agents` 的符号链接。
- Deep Work Plan 技能，为每个代理一次性安装——包括 author 子技能，使代码仓库得以培育自己的技能、代理与命令，外加诸如 dependency-upgrade 与前端 design-system 这样的可选附加组件。
- 存放于被 gitignore 的 `.dwp/` 目录中的长周期、可恢复的计划。

---

## 运行后会发生什么

1. **你的代理打开 [/init.md](/init.md)** —— 它会阅读接入提示，以及其中链接的方法论、规范与套件。
2. **它安装 Deep Work Plan 技能** —— 这个引擎在每个仓库中都完全相同：路由器及其各子技能（create、execute、refine、resume、status、verify、onboard、author），适用于 Claude Code、Cursor、Codex、Gemini 与 Copilot。
3. **它让你的代码仓库适配** —— 它针对你真实的技术栈进行推理（绝不复制粘贴），写出 AGENTS.md、`docs/`、各模块的 README、一份经过推理的 `.agents/` 套件，以及被 gitignore 的 `.dwp/`。你的代码仓库由此成为 harness（运行支架）。
4. **你来规划并执行** —— 长周期的 Deep Work Plan，依据明确的验收标准与验证关卡逐步运行，自主运行数小时。

技能是可复用的引擎，在各处都以相同方式安装；被适配的是你的代码仓库。安装的具体机制（Skills CLI、OpenClaw 或 git clone）写在 [/init.md](/init.md) 提示与[快速开始](/quickstart)中。

---

## 方法论、规范与套件

- [阅读方法论](/methodology) —— DWP 是什么、各项原则、工作流，以及如何采纳它。
- [阅读规范](/spec) —— 任务结构、验证关卡、完成协议、原型与附加组件。
- [探索套件](/kit) —— 用于将 DWP 安装进代码仓库的预设、适配器与命令。
- [查看示例](/examples) —— 对真实工程工作的前后对比演示。

---

## 由谁构建

Deep Work Plan 脱胎于 [Dailybot](https://www.dailybot.com) 真实的工程工作，并由 Dailybot 与开源社区共同维护。

- [关于这套方法论](/about)
- [社区与联系](/contact)
- [GitHub 仓库](https://github.com/DailybotHQ/deepworkplan-website)
