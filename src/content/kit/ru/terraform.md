---
title: Terraform
description: "Пресет онбординга для проектов Terraform и IaC с подсказками для рассуждений о модулях, провайдерах, backend-состоянии, окружениях и шлюзе fmt/validate/plan."
kind: preset
lang: ru
order: 21
stack: Terraform / IaC
---

# Пресет Terraform

Руководство-рассуждение, которое процесс onboard использует для проектов Terraform (и OpenTofu). Это чек-лист, а не шаблон — обнаруженная реальность побеждает.

## Сигналы

- Файлы `*.tf` — обычно `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` — плюс `.terraform.lock.hcl` и переиспользуемый код в `modules/`.
- Блок `backend` (удалённое состояние: S3, GCS, Terraform/Tofu Cloud) и один или несколько блоков `provider`.

## О чём рассуждать

- Реальный шлюз: `terraform fmt -check`, `terraform validate`, `tflint` и `terraform plan` — захваченные дословно (`tofu`, если используется OpenTofu).
- Как разделены окружения — воркспейсы, директории на окружение (`envs/dev`, `envs/prod`) или файлы `*.tfvars`.
- Границы модулей, версионирование провайдеров и где хранятся backend-состояние и секреты.

## Примечания

Plan — операция только для чтения; `apply` изменяет инфраструктуру — никогда не запускать в качестве шлюза валидации. Отметить OpenTofu как взаимозаменяемый вариант Terraform CLI.
