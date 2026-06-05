---
title: Terraform
description: "Preset onboarding cho dự án Terraform và IaC, với gợi ý suy luận về module, provider, backend state, môi trường và cổng fmt/validate/plan."
kind: preset
lang: vi
order: 21
stack: Terraform / IaC
---

# Terraform preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho dự án Terraform (và OpenTofu). Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- Các file `*.tf` — thường là `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` — cùng `.terraform.lock.hcl` và mã tái sử dụng trong `modules/`.
- Một block `backend` (remote state: S3, GCS, Terraform/Tofu Cloud) và một hoặc nhiều block `provider`.

## Cần suy luận về điều gì

- Cổng kiểm chứng thực tế: `terraform fmt -check`, `terraform validate`, `tflint`, và `terraform plan` — ghi lại nguyên văn (`tofu` nếu OpenTofu đang dùng).
- Cách các môi trường được phân tách — workspace vs thư mục theo môi trường (`envs/dev`, `envs/prod`) vs file `*.tfvars`.
- Ranh giới module, ghim version provider, và nơi lưu trữ backend state cũng như secret.

## Ghi chú

Plan là thao tác chỉ đọc; `apply` làm thay đổi hạ tầng — không bao giờ chạy nó như cổng kiểm chứng. Ghi chú OpenTofu là biến thể thay thế của Terraform CLI.
