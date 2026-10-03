---
title: "DeepWorkPlan Vim"
description: "DeepWorkPlan Vim 是 Deep Work Plan 的终端编辑器：Neovim 0.12+ 配置，内置生成的命令索引、计划浏览器与 Markdown 查看器。"
lastUpdated: 2026-10-03
---

## 简介

为人类和长驻终端的编程代理准备的 Neovim 配置——你的 Deep Work Plans、文档和命令索引，一键即达。

## 安装

一行命令即可将 DeepWorkPlan Vim 安装为你的 Neovim 配置。安装程序会说明它将做什么，并在改动现有配置之前征得同意。

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

先征得同意：现有的 Neovim 配置绝不未经你的明确批准而被覆盖。安装程序会停下来，并给出手动安装路径。

在 Windows 上不适用这一行命令；仓库 README 记录了手动安装路径。 [Windows 安装路径](https://github.com/DailybotHQ/deepworkplan-vim#install-host)

## 它做什么

五项功能，范围经过克制的设计。每一项都对应一个可在生成的命令索引中查到的按键绑定。

| 功能 | 说明 | 按键映射 |
|---|---|---|
| 生成的命令索引 | 命令索引由当前配置实时生成，按键绑定的列表始终是最新的。 | `SPC h h` |
| 类 VS Code 的操作习惯 | 来自图形编辑器的编辑手势：全选，以及复制到系统剪贴板。 | `<C-a>`, `y`, `<leader>y` |
| Deep Work Plan 浏览器 | 一个浏览仓库中计划的面板——不离开编辑器即可阅读计划、任务及其验证关卡。 | `SPC P` |
| Markdown 查看器 | 在浏览器中预览 Markdown，或在缓冲区内直接渲染——文档与计划就在工作发生的地方。 | `SPC m p`, `SPC m r` |
| 一行安装器 | 面向 macOS 与 Linux 的自包含安装器，并为 Windows 提供文档化的手动路径。 | — |

## 系统要求

- Neovim 0.12 或更高版本，且 Lua（lua、lua5.4 或 luajit）可用
- macOS 与 Linux；Windows 通过文档化的手动路径提供支持
- 采用 GPL-3.0 许可——可自由使用、研究与修改

## 相关内容

- [阅读 kit 中的 addon 文档](/kit/vim)
- [查看源码仓库](https://github.com/DailybotHQ/deepworkplan-vim)
- 安装 DeepWorkPlan Vim，打开 Neovim，在与代理相同的终端里阅读你的 Deep Work Plans。
