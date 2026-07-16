---
title: AI Diff Reviewer
description: "可选的DWP附加组件：为Security Review提供本地AI Diff Reviewer通道、可选的Flow B CI合并门控（v2）、共享的.review/extension文件，以及apply-review伴侣流程，使本地审查与CI审查两边保持一致。"
kind: addon
lang: zh
order: 5
---

# AI Diff Reviewer 附加组件

将 Deep Work Plan 的执行连接到 **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**（marketplace 上的 **"AI Diff Reviewer"**，当前版本 **v2.0.0**），使强制性最终任务**安全审查**获得结构化的本地审查——裁决、结果表和严重程度——并且在选择 Flow B 时，每个 pull request 都可以在 CI 中受到同样审查的门控。这是一个**可选**附加组件，从不要求用于 AI-first 符合性。

Deep Work Plan 的核心方法论对 AI Diff Reviewer 有**零**依赖。零附加组件的仓库完全符合规范。仅当开发者或团队希望获得结构化的审查质量时才提供此附加组件；绝不为所有人自动安装。始终询问 Flow A 还是 Flow B——绝不假设默认值。

## 何时使用

| 信号 | 操作 |
|--------|--------|
| 团队希望在 CI 中有结构化结果的 PR 合并门控 | 在接入时**推荐 Flow B** |
| 个人或实验性仓库；本地预推送审查已足够 | **提供 Flow A** |
| 不希望增加额外的审查层面 | **跳过** — 基础安全审查仍然适用 |

## 两种采用流程

| 流程 | 获得内容 |
|------|----------------|
| **A — 仅限本地** | 内嵌 skill + 必需的 `.review/extension.md`（通过 `generate-extension`）。使用本地通道增强安全审查。无 GitHub Actions 工作流。 |
| **B — 双层面** | Flow A 加上 `setup` 写入 `.github/workflows/pr-review.yml`（Action `@v2`），本地和 CI 使用相同的扩展文件。CI 发布结果后可选 `apply-review` 伴随工具。 |

安全审查增强的检测需要**skill + 扩展文件**，位于以下之一：`.review/extension.md`、`.github/ai-diff-reviewer/extension.md` 或 `.github/ai-pr-reviewer/extension.md`。仅 skill 本身是不够的。

## 此附加组件连接的内容（有意限制范围）

DWP 附加组件**不**重新发明审查器。它将安装、方法论、CI 向导、扩展创作、PR 草稿及 CI 后遍历委托给上游 skill 的五个子技能（父级默认流、`generate-extension`、`setup`、`open-pr`、`apply-review`）。

### 安全审查增强

检测到时，`create` / `execute` 会向强制性安全审查任务添加本地审查步骤。输出追加在 `analysis_results/SECURITY_REVIEW.md` 的 `## AI Diff Reviewer local review` 下。

- **软失败（仅调用）：** skill 缺失、扩展缺失或调用错误 → 警告一次并继续；绝不因此使任务失败。
- **完整通道后的门控：** `critical` 结果仍然阻止安全审查完成，直到修复或明确接受（现有 SR 合同）。`warning` / `info` 已记录但不阻塞。
- **Flow A 不需要 CI 密钥。** 未设置的 `CURSOR_API_KEY` 不得抑制本地通道。

### Flow B CI 门控（可选）

固定 Action `DailybotHQ/ai-diff-reviewer@v2`，通常由标签门控（`ready`），带有用于分支保护的稳定命名 **AI review gate** 作业，以及可选跳过标签 `skip-review-label: skip-ai-review`。共享的 `prompt.md` + 扩展对齐方法论和严重程度；在迭代感知审查下，CI 第 2+ 轮可能更短，而本地通道保持完整。

### 可选 `apply-review` 伴随工具

CI 发布审查后，开发者可以在 `execute` 期间调用 `apply-review` 逐项遍历结果（应用 / 延迟 / 跳过），需获得同意。默认只读；绝不作为计划任务文件（会破坏强制性最终任务顺序）。

## 行为

- **询问流程；绝不猜测。** 未经请求安装工作流的代价大于保持在 Flow A。
- **调和，不覆盖。** 现有 skill、扩展或 `pr-review.yml` 均被保留；仅填补空缺。
- **认证延后。** CI 的提供商密钥由维护者配置；此附加组件绝不存储凭据。
- **供应商中立。** 拒绝后仍留有完全 AI-first 的仓库。

## 注意事项

可选且从不要求。上游 skill：[DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)。规格页面：[Add-ons](/spec/addons)。
