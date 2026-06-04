---
title: 文档标准
description: "关于 Deep Work Plan 如何记录其结构、任务与进展的规范性标准：README 规则、状态标记，以及两项强制收尾任务。"
order: 1
lang: zh
section: Standard
---

# 文档标准

**版本 1.0。** 本标准界定了 Deep Work Plan 如何记录其结构、任务与进展。它适用于在 DWP 方法论下创建的每一份计划。关键词 MUST、SHOULD 与 MAY 按 RFC 2119 中所定义使用。

## 计划 README

每份计划 MUST 拥有一个 `README.md`，其中包含：

- **标题** —— `# Deep Work Plan: <name>`。
- **目标** —— 一段散文式的计划目标陈述。
- **源材料** —— 指向规范输入的链接或路径（可选）。
- **任务** —— 一个 Markdown 表格，含任务编号、名称与一个状态复选框。
- **状态** —— 一行形如 `<n>/<total> tasks complete` 的内容。

## 任务文件

每个任务文件 MUST 命名为 `<n>.task_<slug>.md`，并包含九段式结构。

## PROGRESS.md

`PROGRESS.md` 是一份只追加的执行日志。每条记录 MUST 记下：

- 一个 ISO 8601 时间戳。
- 任务编号与名称。
- 做了什么。
- 任何偏差或跳过的原因。

## 状态标记

- `[ ]` —— 未开始。
- `[~]` —— 进行中。
- `[x]` —— 已完成。
- `[!]` —— 受阻。

## 标题

所有标题 MUST 采用首字母句式（sentence case）。文档 SHOULD 避免使用营销式语言与感叹号。

## 两项强制收尾任务

每份计划 MUST 以两项标准任务收尾：

1. **Skills & Agents Discovery** —— 识别所创建的可复用技能与代理。
2. **Executive Report** —— 一份面向利益相关者的成果总结。
