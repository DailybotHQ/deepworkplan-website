---
title: skill-create
description: "通过 author 子技能在当前仓库中创建一个新的可复用技能——一个带参数的、在会话中运行的过程——并让目录保持同步。"
kind: command
lang: zh
order: 7
usage: /skill-create
---

# skill-create

在当前仓库中创建一个新技能。一个委派给 Deep Work Plan **author** 子技能的轻量委派器。

## 它做了什么

`skill-create` 路由到 author 子技能的技能创建流程。技能是一个可复用、带参数、在会话中运行的过程（例如 `/fix-lint`）。它编码的是“如何做 X”，并存放于 `.agents/skills/<name>/SKILL.md`。

## 用法

```
/skill-create
```

## 行为

1. 检测仓库的 `.agents/` 布局与本地约定。
2. 确认存在一个真实、可重复的工作流；以 kebab-case 命名它。
3. 搭建并填充 `SKILL.md`（Goal、When-to-use、Steps、Validation）。
4. 在需要时添加一个轻量命令委派器。
5. 更新 `.agents/docs/` 目录以保持一致。

## 备注

代理请使用 `/agent-create`。逻辑存于技能之中；命令保持轻量。
