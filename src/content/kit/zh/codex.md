---
title: OpenAI Codex
description: "面向 OpenAI Codex 的 DWP 适配器，通过 Markdown 命令过程与井号前缀提供部分支持；团队代理功能不可用。"
kind: adapter
lang: zh
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# OpenAI Codex 适配器

OpenAI Codex 通过 Markdown 命令过程支持 DWP。

## 支持级别

**部分** —— 核心命令可用；高级功能（团队代理）不可用。

## 安装

DWP 命令以代理在调用时读取的 Markdown 过程的形式存在。

## 调用

使用 `#` 前缀：

```
#dwp-create <goal>
#dwp-execute
```

## 备注

团队代理功能为 Claude 专属；Codex 支持顺序工作流。
