---
title: deepworkplan-onboard
description: "通过对仓库的技术栈与原型进行推理，然后生成与之适配的 AGENTS.md、docs/、.agents/ 与一个被 gitignore 的 .dwp/，让仓库 AI-first。"
kind: command
lang: zh
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

把一个仓库转化为 AI-first、规范驱动的代码库。这是 Deep Work Plan 技能的 onboard 子技能。

## 它做了什么

`deepworkplan-onboard` 检视**真实的**仓库——语言、框架、包管理器、build/test/lint 命令、模块、测试约定、部署形态——并生成与之适配的产物。它进行推理；绝不复制模板，也绝不留下占位符。

## 用法

```
/deepworkplan-onboard
```

## 行为

1. 勘察——检测真实的技术栈与验证命令；匹配最接近的接入预设。
2. 原型——归类为单一仓库或编排枢纽。
3. 生成 `AGENTS.md` + `CLAUDE.md` 符号链接，并带有一个真实的 Quick Commands 块。
4. 生成 `docs/`（架构、规范、测试、安全等）与各模块文档。
5. 生成 `.agents/`（代理、轻量 `dwp-*` 命令、与技术栈相适配的技能、目录）+ `.claude → .agents`。
6. 安装技能，并搭建一个被 gitignore 的 `.dwp/`（plans、drafts）与一个 `tmp/` 草稿空间。
7. 安装必备的 AI Diff Reviewer 本地审查，提供可选的附加组件，然后进行自检。

## 备注

一个仓库在不带任何可选附加组件时即完全符合规范；自标准 2.3.0 起，AI Diff Reviewer 本地审查属于基线的一部分。检测到的现实始终优先于预设的假设。

## v6 架构引用

v6 计划的机器可读架构目录发布在以下稳定 URL。v6 实时投影是快照；不存在 `plan-state/v6.json`。现有 v5 计划继续使用 v5 状态架构，旧计划不会被静默重写。

- **Plan manifest:** https://deepworkplan.com/schema/plan-manifest/v6.json
- **Plan snapshot (v6 live projection):** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Plan contract:** https://deepworkplan.com/schema/plan-contract/v6.json
- **Journal event:** https://deepworkplan.com/schema/journal-event/v6.json
- **Context manifest:** https://deepworkplan.com/schema/context-manifest/v6.json

当前 7.x 技能包默认使用 v7 创建新计划。现有计划保留记录的代际；迁移必须明确请求。 新计划会获得至少三位数、单调递增的数字 ID（例如 `PLAN_001_add_payment_webhooks/`）。冻结的 v5 schema 会把数字 ID 计作一个单词，因此 v5 slug 为 2–4 个单词；v7 slug 为 2–5 个单词。现有未编号的 `PLAN_<slug>/` 文件夹继续可读，且永不重命名。存在编号计划时，`latest` 指向数字 ID 最大的计划。
