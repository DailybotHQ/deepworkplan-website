---
title: Terraform
description: "面向 Terraform 与 IaC 项目的接入预设，包含模块、provider、后端状态、环境以及 fmt/validate/plan 关卡的推理提示。"
kind: preset
lang: zh
order: 21
stack: Terraform / IaC
---

# Terraform 预设

onboard 流程用于 Terraform（以及 OpenTofu）项目的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- `*.tf` 文件——通常包括 `main.tf`、`variables.tf`、`outputs.tf`、`providers.tf`——以及 `.terraform.lock.hcl` 与 `modules/` 下的可复用代码。
- 一个 `backend` 块（远程状态：S3、GCS、Terraform/Tofu Cloud）以及一个或多个 `provider` 块。

## 需要推理的内容

- 真实的关卡：`terraform fmt -check`、`terraform validate`、`tflint` 与 `terraform plan`——原样捕获（如使用 OpenTofu，则为 `tofu`）。
- 环境的隔离方式——workspace 与各环境目录（`envs/dev`、`envs/prod`）与 `*.tfvars` 文件之间的区别。
- 模块边界、provider 与版本锁定，以及后端状态与密钥的存放位置。

## 备注

`plan` 是只读操作；`apply` 会变更基础设施——绝不能将其作为验证关卡运行。注意 OpenTofu 是 Terraform CLI 的直接替代变体。
