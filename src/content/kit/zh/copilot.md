---
title: GitHub Copilot
description: "面向 GitHub Copilot 的 DWP 适配器，通过 Markdown 命令过程与井号前缀提供部分支持；部分自动化需手工完成。"
kind: adapter
lang: zh
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# GitHub Copilot 适配器

GitHub Copilot 通过 Markdown 命令过程支持 DWP。

## 支持级别

**部分** —— 核心命令通过过程文件运作；部分自动化需手工完成。

## 安装

DWP 命令以 Markdown 过程的形式存在于仓库中。

## 调用

使用 `#` 前缀：

```
#dwp-create <goal>
#dwp-execute
```

## 备注

Copilot 会读取过程文件，但其自主执行能力弱于 Claude Code。
