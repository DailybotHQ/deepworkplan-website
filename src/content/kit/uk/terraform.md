---
title: Terraform
description: "Пресет онбордингу для Terraform та IaC-проєктів із підказками для модулів, провайдерів, стану бекенду, середовищ та ворот fmt/validate/plan."
kind: preset
lang: uk
order: 21
stack: Terraform / IaC
---

# Пресет Terraform

Орієнтир для міркувань, який процес онбордингу використовує для Terraform (і OpenTofu) проєктів. Це чек-лист, а не шаблон — виявлена реальність важливіша.

## Сигнали

- Файли `*.tf` — зазвичай `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` — плюс `.terraform.lock.hcl` і багаторазовий код у `modules/`.
- Блок `backend` (віддалений стан: S3, GCS, Terraform/Tofu Cloud) і один або більше блоків `provider`.

## Про що міркувати

- Справжні ворота: `terraform fmt -check`, `terraform validate`, `tflint` і `terraform plan` — зафіксувати дослівно (`tofu`, якщо використовується OpenTofu).
- Як розділені середовища — воркспейси, каталоги для кожного середовища (`envs/dev`, `envs/prod`) або файли `*.tfvars`.
- Межі модулів, прив'язка провайдерів/версій і місця зберігання стану бекенду та секретів.

## Примітки

Plan є операцією лише для читання; `apply` змінює інфраструктуру — ніколи не запускати як ворота валідації. Відзначити OpenTofu як взаємозамінний варіант Terraform CLI.
