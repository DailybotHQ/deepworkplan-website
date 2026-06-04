---
title: Cursor
description: "面向 Cursor AI 的 DWP 适配器，通过项目规则系统与井号命令前缀提供完整支持，因为 Cursor 自身保留了斜杠。"
kind: adapter
lang: zh
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Cursor 适配器

Cursor 通过项目规则与命令文件支持 DWP。

## 支持级别

**完整** —— DWP 命令通过 Cursor 的规则系统运作。

## 安装

DWP 命令以 Markdown 的形式存在于项目中。Cursor 通过其规则系统读取它们。

## 调用

使用 `#` 前缀（Cursor 会截获 `/`）：

```
#dwp-create <goal>
#dwp-execute
```

## 备注

使用 `#` 是因为 Cursor 把 `/` 保留给它自己的命令。
