---
title: TypeScript Lambda
description: "面向 Serverless TypeScript Lambda 项目的接入预设，包含处理器、Serverless/SAM/CDK 工具链以及 IAM 最小权限原则的推理提示。"
kind: preset
lang: zh
order: 22
stack: TS Lambda (Serverless)
---

# TypeScript Lambda 预设

onboard 流程用于 Serverless TypeScript Lambda 项目的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- 一个部署描述文件：`serverless.yml`（Serverless Framework）、`template.yaml`（AWS SAM）或 `cdk.json`（AWS CDK），以及 `tsconfig.json`。
- 导出 `handler` 的处理器函数，通常位于 `src/functions/` 或 `src/handlers/` 下，每个函数一个入口点。

## 需要推理的内容

- 真实的关卡：代码检查（`eslint`）、类型检查（`tsc --noEmit`）、测试（Jest/Vitest）、打包（esbuild/tsc），以及合成/打包（`sls package`、`sam build`、`cdk synth`）——原样捕获。
- 各函数的结构、事件来源（API Gateway、SQS、EventBridge），以及冷启动与包体积预算。
- IAM 权限范围——每个函数遵循最小权限原则——以及密钥与配置的存放位置（SSM、Secrets Manager、环境变量）。

## 备注

在 SECURITY 文档中强调最小权限 IAM 配置。合成/打包是安全的关卡；部署会变更账户中的资源，绝不能作为验证关卡运行。
