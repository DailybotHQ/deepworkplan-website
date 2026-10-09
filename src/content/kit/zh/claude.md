---
title: Claude Code
description: "面向 Claude Code 的 DWP 适配器，通过原生斜杠命令与技能提供完整支持，包括用于完整功能集的子代理与团队代理。"
kind: adapter
lang: zh
order: 1
agent: Claude Code
support: full
prefix: /
---

# Claude Code 适配器

Claude Code 通过原生斜杠命令与技能提供**完整**的 DWP 支持。

## 支持级别

**完整** —— 全部五个 DWP 命令都映射到原生的 Claude Code 斜杠命令。

## 安装

DWP 以技能的形式存放于 `.agents/skills/` 之下（通过 `.claude/` 符号链接解析）。Claude Code 会自动发现它们。

可选：[coding-agents-kit](/kit/agentkit) 可以安装此 CLI，并用 `ak claude` 启动它。使用供应商自己的官方安装程序同样可行。

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install claude
```

## 调用

使用 `/` 前缀：

```
/dwp-create <goal>
/dwp-execute
```

## 备注

Claude Code 支持技能、子代理与团队代理——完整的 DWP 功能集。
