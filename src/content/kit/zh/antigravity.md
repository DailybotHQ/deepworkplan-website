---
title: Antigravity
description: "面向 Antigravity 的 DWP 适配器，通过 Markdown 命令过程与井号前缀提供完整支持，可驱动完整的 Deep Work Plan 循环。"
kind: adapter
lang: zh
order: 6
agent: Antigravity
support: full
prefix: '#'
---

# Antigravity 适配器

Antigravity 通过 Markdown 命令过程支持 DWP。

## 支持级别

**完整** —— 每个 dwp-* 命令均通过其过程文件，经由原生命令界面运行。

## 安装

DWP 命令以代理在调用时读取的 Markdown 过程的形式存在。

## 调用

使用 `#` 前缀：

```
#dwp-create <goal>
#dwp-execute
```

## 备注

Antigravity 会读取过程文件并执行完整的顺序 Deep Work Plan 循环。
