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

可选：[coding-agents-kit](/kit/agentkit) 可以安装此 CLI，并用 `ak cline` 启动它。使用供应商自己的官方安装程序同样可行。

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cline
```

## 调用

使用 `#` 前缀：

```
#dwp-create <goal>
#dwp-execute
```

## 备注

Cline 会读取过程文件并执行完整的顺序 Deep Work Plan 循环。
