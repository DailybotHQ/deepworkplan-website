---
title: Terraform
description: "Terraform 및 IaC 프로젝트를 위한 온보딩 프리셋으로, 모듈, 프로바이더, 백엔드 상태, 환경, fmt/validate/plan 게이트에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 21
stack: Terraform / IaC
---

# Terraform 프리셋

onboard 흐름이 Terraform(및 OpenTofu) 프로젝트에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `*.tf` 파일 — 주로 `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` — 그리고 `.terraform.lock.hcl`과 `modules/` 아래의 재사용 가능한 코드.
- `backend` 블록(원격 상태: S3, GCS, Terraform/Tofu Cloud)과 하나 이상의 `provider` 블록.

## 추론할 사항

- 실제 게이트: `terraform fmt -check`, `terraform validate`, `tflint`, `terraform plan` — 그대로 포착합니다(OpenTofu 사용 시 `tofu`).
- 환경 분리 방식 — 워크스페이스 대 환경별 디렉터리(`envs/dev`, `envs/prod`) 대 `*.tfvars` 파일.
- 모듈 경계, 프로바이더/버전 고정, 백엔드 상태와 시크릿의 위치.

## 참고

plan은 읽기 전용입니다; `apply`는 인프라를 변경합니다 — 검증 게이트로 실행하지 마세요. OpenTofu는 Terraform CLI의 드롭인 대안입니다.
