---
title: Terraform
description: "Um preset de onboarding para projetos Terraform e IaC, com pistas de raciocínio para módulos, providers, estado do backend, ambientes e o gate fmt/validate/plan."
kind: preset
lang: pt
order: 21
stack: Terraform / IaC
---

# Preset Terraform

Um guia de raciocínio que o fluxo de onboarding usa para projetos Terraform (e OpenTofu). É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- Arquivos `*.tf` — geralmente `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` — mais um `.terraform.lock.hcl` e código reutilizável em `modules/`.
- Um bloco `backend` (estado remoto: S3, GCS, Terraform/Tofu Cloud) e um ou mais blocos `provider`.

## Sobre o que raciocinar

- O gate real: `terraform fmt -check`, `terraform validate`, `tflint` e `terraform plan` — capturados literalmente (`tofu` se OpenTofu estiver em uso).
- Como os ambientes são separados — workspaces vs diretórios por ambiente (`envs/dev`, `envs/prod`) vs arquivos `*.tfvars`.
- Fronteiras de módulo, fixação de versão de provider e onde ficam o estado do backend e os segredos.

## Notas

Plan é somente leitura; `apply` altera a infraestrutura — nunca executá-lo como gate de validação. Observar OpenTofu como uma variante drop-in do Terraform CLI.
