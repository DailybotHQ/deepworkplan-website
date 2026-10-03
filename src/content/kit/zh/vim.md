---
title: DeepWorkPlan Vim
description: "可选 DWP 附加组件：DeepWorkPlan Vim——Deep Work Plan 的终端编辑器，提供生成的命令索引、计划浏览与 Neovim 中的 Markdown 阅读。"
kind: addon
lang: zh
order: 6
---

# DeepWorkPlan Vim 附加组件

**DeepWorkPlan Vim** 是 Deep Work Plan 的终端编辑器：一套 Neovim 配置（它本身就是编辑器，不是仓库文件），让方法论的作业面只需一次按键即可到达。kit 中的其他条目把 harness 安装进仓库，而这个附加组件装备的是人——以及任何以 headless 方式驱动 Neovim 的代理——得到一个原生支持 DWP 的编辑器。

它要求 **Neovim 0.12 或更高版本**，运行于 **macOS 与 Linux**（Windows 通过有文档说明的手动路径支持），并采用 **GPL-3.0** 许可证——可自由使用、学习和修改。

## 它带来什么

| # | 功能 | 作用 | 映射 |
|---|---------|--------------|---------|
| F1 | **生成的命令索引** | 整个编辑器，一览无余：每个命令附其映射与一行描述，从活配置生成，索引因此不会与编辑器漂移。 | `SPC h h` |
| F2 | **类 VS Code 的操作习惯** | 全选、复制与剪贴板 yank，落在肌肉记忆早已熟悉的组合键上。 | `<C-a>`, `y`, `<leader>y` |
| F3 | **Deep Work Plan 浏览器** | 打开驱动仓库的计划——任务、验证关卡与完成状态——无需离开编辑器。 | `SPC P` |
| F4 | **Markdown 查看器** | 像代理那样读 Markdown：渲染预览，或保留复制粘贴保真度的原始源码。 | `SPC m p`, `SPC m r` |
| F5 | **一行安装器** | 面向 macOS 与 Linux 的 consent-first `install.sh`；Windows 由有文档说明的手动路径覆盖。 | `curl -fsSL https://deepworkplan.com/vim/install.sh \| bash` |

## 安装

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

安装器是 **consent-first** 的：既有的、属于他人的 Neovim 配置绝不会被覆盖。在无终端的管道环境下，它会中止并给出说明，而不动任何东西；在交互环境下，它会在挪动既有配置之前先征求同意。插件在首次启动时以 headless 方式安装，无需退出后重新打开。

Windows 不是 `curl | bash` 的目标。有文档说明的手动路径（winget 配合 Git Bash，或 WSL）见仓库 README。

完整界面，无截图、以合同为界：[/vim 页面](/vim)。

## 何时选用它

| 信号 | 动作 |
|--------|--------|
| 开发者常驻终端，按计划驱动仓库 | **提供**该附加组件 |
| 长周期 DWP 执行中，计划浏览器（`SPC P`）让状态持续可见 | **推荐** |
| 开发者的编辑器已有配置且不容商量 | **跳过**——该附加组件在设计上就是可选的 |
| 纯 Windows 且无 WSL 的团队 | **跳过**，或指向有文档说明的手动路径 |

## 相关 kit 条目

- [Devcontainer](/kit/devcontainer) — 可复现的开发环境（第一个附加组件）
- [Dailybot](/kit/dailybot) — 团队可见的计划生命周期报告（第二个附加组件）
- [AI Diff Reviewer](/kit/ai-diff-reviewer) — 计划最终评审期间的本地评审（第五个附加组件）
