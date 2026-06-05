---
title: GitHub Copilot
description: "面向 GitHub Copilot 的 DWP 适配器，通过 AGENTS.md 与 Markdown 命令过程提供完整支持，使用井号前缀调用。"
kind: adapter
lang: zh
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# GitHub Copilot 适配器

GitHub Copilot 通过 AGENTS.md 与 Markdown 命令过程支持 DWP。

## 支持级别

**完整** —— Copilot 读取 AGENTS.md 与 dwp-* 过程文件，并从中运行每一个命令。

## 安装

DWP 将 AGENTS.md 与命令过程存放于仓库中；Copilot 将其作为仓库上下文读取。

## 调用

使用 `#` 前缀：

```
#dwp-create <goal>
#dwp-execute
```

## 备注

Copilot 会读取过程文件并执行完整的顺序 Deep Work Plan 循环。
