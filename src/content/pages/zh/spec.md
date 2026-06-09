---
title: "Deep Work Plan 规范"
description: "Deep Work Plan 方法论的可读规范：DWP 格式、代理协议、原型、文档标准与附加组件机制。"
lastUpdated: 2026-05-30
---

## Deep Work Plan 规范

规范是这套方法论精确、可读的定义——人类与代理共享的结构与协议。它以规范性的 RFC-2119 措辞陈述了一份规范驱动的计划如何组织，以及代理必须如何依据它执行：计划是事实来源，验证关卡是二元的，而代码仓库本身携带着代理所需的 harness。它被组织为一系列有序的文档：

- **文档标准** —— AI-first 的代码仓库结构。
- **DWP 规范**（v1.2）—— 计划结构、任务结构、执行循环、用于存量代码行为变更的 Delta 段落、DWP 恢复协议、比例严格度层级（micro/standard/deep），以及机器可读计划状态层。
- **代理协议**（v1.2）—— 必需的跨代理行为、命令映射、受支持代理（包括 OpenClaw 与 Hermes），以及执行配置文件（交互式与无人值守），含停止条件与计划续行。
- **原型**（v1.1）—— 单一仓库、编排枢纽，以及代理工作区（自主代理的长期驻地：OpenClaw 工作区、Hermes 服务目录、云端代理卷）；归类判定法则及接入差异。
- **附加组件** —— 用于叠加可选能力的可选机制，包括 author 子技能（使一个仓库培育自己的套件）与诸如 dependency-upgrade 这样的维护类附加组件，以及前端的 design-system 附加组件（一份从仓库真实设计 token 推理而来的 `docs/DESIGN.md`）。
- **符合性** —— 对一个 AI-first 代码仓库的规范性定义：仓库 MUST 与 SHOULD 拥有的产物、什么使一份计划结构良好，以及如何用 `/dwp-verify` 客观地验证它。
- **Plan state** —— 机器可读状态层：`manifest.json` 与 `state.json`、关卡记录、作为情节记忆的 outcome 记录、协调机制（Markdown 获胜），以及何时需要该层。

- [阅读规范](/spec)
- [阅读方法论](/methodology)
