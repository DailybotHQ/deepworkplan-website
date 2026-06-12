---
title: "Deep Work Plan 套件"
description: "让 Deep Work Plan 可在任何地方运行的技能及其八个子技能、命令、代理适配器、接入预设、可选附加组件与示例。"
lastUpdated: 2026-05-31
---

## Deep Work Plan 套件

套件是你在实践中运行这套方法论所需的一切。它从
`DailybotHQ/deepworkplan-skill` 安装：

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### 技能及其各子技能

Deep Work Plan 技能是一个路由器外加八个子技能：

- **create** —— 把一个目标分解为一份结构化的计划（`/dwp-create`）。
- **execute** —— 逐任务运行一份计划，验证每一道关卡（`/dwp-execute`）。
- **refine** —— 在保全已完成工作的同时增加、删除或重排任务（`/dwp-refine`）。
- **resume** —— 重建状态并继续一份被中断的计划（`/dwp-resume`）。
- **status** —— 报告进展而不做任何改动（`/dwp-status`）。
- **verify** —— 客观地核查仓库与计划的符合性（`/dwp-verify`）。
- **onboard** —— 让一个仓库 AI-first（`/deepworkplan-onboard`）。
- **author** —— 创建或演化仓库自己的技能、代理与命令（`/skill-create`、`/agent-create`）。

### 命令

轻量的斜杠命令委派给各子技能与附加组件：

- `dwp-create`、`dwp-execute`、`dwp-refine`、`dwp-resume`、`dwp-status`、`dwp-verify` —— “规划-执行-验证”循环。
- `skill-create`、`agent-create` —— 委派给 author 子技能。
- `lib-upgrade` —— 委派给 dependency-upgrade 附加组件（仅在该附加组件被采纳时才安装）。

### 适配器

面向 Claude Code、Cursor、OpenAI Codex、GitHub Copilot、Google Gemini、OpenCode、Windsurf、Cline 与 Antigravity 的轻量化逐代理集成，以及面向自主代理平台的集成：OpenClaw 与 Hermes（通过心跳或 cron 调度以无人值守执行配置文件运行计划），以及云端与后台代理（Claude Code 远程任务、Codex 云端、Jules 类代理）。

### 接入预设

onboard 流程所使用的逐技术栈推理指南，用于适配文档、技能与验证命令——
绝非模板。共六个预设：Django、Vue + Vite、Astro/Svelte、Node/TS 服务、Python 包/CLI，
以及一个通用兜底预设。

### 附加组件（可选）

onboard 流程可向仓库叠加的可选能力——绝非 AI-first 基线的一部分：

- **Devcontainer** —— 一个可复现、隔离的开发容器，具备持久的 AI-CLI 认证。
- **Dailybot** —— 面向使用 Dailybot 的团队的尽力而为式进展与里程碑报告。
- **Dependency upgrade** —— 包管理器无关、分批次、经验证、可回退的升级。
- **Design system** —— 一份限定于界面范围的 `DESIGN.md`（位于 `docs/DESIGN.md`，从 `AGENTS.md` 引用），从仓库真实的设计来源推理而来，并为可视化 UI、带样式的 CLI 输出与会话式消息提供配置档，使代理生成契合品牌的界面输出；当检测到一套设计系统时可视化配置档默认开启，CLI 与会话式配置档在检测到时被推荐且始终先询问。

### 示例

完整的前后对比演示。

- [浏览套件](/kit)
- [快速开始](/quickstart)
- [查看示例](/examples)
