---
title: agent-create
description: "通过 author 子技能在当前仓库中创建一个新代理——一个有自己的模型档位与工具的专职工作者——并让目录保持同步。"
kind: command
lang: zh
order: 8
usage: /agent-create
---

# agent-create

在当前仓库中创建一个新代理。一个委派给 Deep Work Plan **author** 子技能的轻量委派器。

## 它做了什么

`agent-create` 路由到 author 子技能的代理创建流程。代理是一份专职工作者定义（角色、模型档位、工具、系统提示），被派遣去处理某一类任务。它编码的是“谁来做 X”，并存放于 `.agents/agents/<name>.md`。

## 用法

```
/agent-create
```

## 行为

1. 检测仓库的 `.agents/` 布局与本地约定。
2. 确认一个有独特模型/工具需求的反复出现的角色；以 kebab-case 命名它。
3. 搭建并填充该代理（Role、Inputs、Process、Output、升级处理）。
4. 选择一个有理有据的模型档位——light、standard 或 heavy——而不硬编码供应商的模型 ID。
5. 更新 `.agents/docs/` 目录以保持一致。

## 备注

过程请使用 `/skill-create`。让模型档位保持抽象，并在仓库配置中映射它们。
