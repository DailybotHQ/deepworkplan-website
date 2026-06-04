---
title: Antigravity
description: "面向 Antigravity 的 DWP 适配器，通过驱动顺序工作流的 Markdown 命令过程与井号前缀提供部分支持。"
kind: adapter
lang: zh
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# Antigravity 适配器

Antigravity 通过 Markdown 命令过程支持 DWP。

## 支持级别

**部分** —— 核心命令通过过程文件运作。

## 安装

DWP 命令以代理在调用时读取的 Markdown 过程的形式存在。

## 调用

使用 `#` 前缀：

```
#dwp-create <goal>
#dwp-execute
```

## 备注

Antigravity 会读取过程文件并执行顺序的 DWP 工作流。
