---
title: Windsurf
description: "面向 Windsurf 的 DWP 适配器，通过其规则系统与 Markdown 命令过程提供完整支持，使用井号前缀调用。"
kind: adapter
lang: zh
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Windsurf 适配器

Windsurf 通过其规则系统与 Markdown 命令过程支持 DWP。

## 支持级别

**完整** —— Windsurf 读取项目规则，并从其过程文件运行每一个 dwp-* 命令。

## 安装

DWP 命令以代理通过 Windsurf 规则系统读取的 Markdown 过程的形式存在。

## 调用

使用 `#` 前缀：

```
#dwp-create <goal>
#dwp-execute
```

## 备注

Windsurf 会读取过程文件并执行完整的顺序 Deep Work Plan 循环。
