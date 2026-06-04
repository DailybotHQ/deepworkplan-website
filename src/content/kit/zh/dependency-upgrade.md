---
title: Dependency upgrade
description: "一个可选、包管理器无关的附加组件，以经验证、可回退的批次升级仓库的依赖，检测真实的包管理器，而非假定 npm。"
kind: addon
lang: zh
order: 3
---

# Dependency-upgrade 附加组件

以一套分批次、经验证、可回退的工作流，把仓库的依赖更新到最新。Deep Work Plan 的第三个可选附加组件。

## 它添加了什么

- 从存在的清单与锁文件中检测仓库的**真实**包管理器（npm/pnpm/yarn + ncu、pip/poetry/uv、cargo、go mod、bundler、composer 等）。
- 一个安装到 `.agents/commands/` 的 `/lib-upgrade` 命令，**仅在被采纳时**。

## 行为

1. 要求一个干净的（或已备份的）工作树。
2. 按 semver 对升级进行分类——patch、minor、major；major 需要明确批准。
3. 以小而连贯的批次升级；绝不一次全部进行。
4. 在每个批次后运行仓库真实的验证关卡；回退任何失败的批次。
5. 总结升级了什么、跳过了什么、回退了什么；交由开发者提交。

## 备注

包管理器无关——绝不在一个非 JS 仓库中运行 npm/ncu。可选，绝非必需，且绝不自动提交。
