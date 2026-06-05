---
title: OpenCode
description: "面向 OpenCode（开源代理）的 DWP 适配器，通过原生 AGENTS.md 与 Markdown 命令过程提供完整支持，使用井号前缀调用。"
kind: adapter
lang: zh
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# OpenCode 适配器

OpenCode 是一款开源编码代理，通过原生 AGENTS.md 与 Markdown 命令过程支持 DWP。

## 支持级别

**完整** —— OpenCode 原生读取 AGENTS.md，并从其过程文件运行每一个 dwp-* 命令。

## 安装

DWP 将 AGENTS.md 与命令过程存放于仓库中；OpenCode 将其作为项目上下文自动发现。

## 调用

使用 `#` 前缀：

```
#dwp-create <goal>
#dwp-execute
```

## 备注

OpenCode 会读取过程文件并执行完整的顺序 Deep Work Plan 循环。
