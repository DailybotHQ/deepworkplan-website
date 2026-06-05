---
title: Terraform
description: "Preset de incorporación para proyectos Terraform e IaC, con pistas de razonamiento para módulos, providers, estado del backend, entornos y la compuerta fmt/validate/plan."
kind: preset
lang: es
order: 21
stack: Terraform / IaC
---

# Preset Terraform

Guía de razonamiento que el flujo de onboard usa para proyectos Terraform (y OpenTofu). Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- Archivos `*.tf` — habitualmente `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` — más un `.terraform.lock.hcl` y código reutilizable bajo `modules/`.
- Un bloque `backend` (estado remoto: S3, GCS, Terraform/Tofu Cloud) y uno o más bloques `provider`.

## Qué razonar

- La compuerta real: `terraform fmt -check`, `terraform validate`, `tflint` y `terraform plan` — capturados al pie de la letra (`tofu` si se usa OpenTofu).
- Cómo se separan los entornos — workspaces vs directorios por entorno (`envs/dev`, `envs/prod`) vs archivos `*.tfvars`.
- Límites de módulos, fijación de versiones de providers y dónde viven el estado del backend y los secretos.

## Notas

Plan es de solo lectura; `apply` muta la infraestructura — nunca lo ejecutes como compuerta de validación. Anota OpenTofu como variante compatible con el CLI de Terraform.
