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
7. 提供可选的附加组件，然后进行自检。

## 备注

一个仓库在不带任何附加组件时即完全符合规范。检测到的现实始终优先于预设的假设。
