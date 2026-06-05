---
title: Cline
description: "面向 Cline（开源代理）的 DWP 适配器，通过 Markdown 规则与命令过程提供完整支持，使用井号前缀调用。"
kind: adapter
lang: zh
order: 9
agent: Cline
support: full
prefix: '#'
---

# Cline 适配器

Cline 是一款开源编码代理，通过 Markdown 规则与命令过程支持 DWP。

## 支持级别

**完整** —— Cline 读取 Markdown 规则，并从其过程文件运行每一个 dwp-* 命令。

## 安装

DWP 命令以代理通过 Cline 规则读取的 Markdown 过程的形式存在。

## 调用

使用 `#` 前缀：

```
#dwp-create <goal>
#dwp-execute
```

## 备注

Cline 会读取过程文件并执行完整的顺序 Deep Work Plan 循环。
