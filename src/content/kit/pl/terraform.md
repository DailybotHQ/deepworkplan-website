---
title: Terraform
description: "Preset onboardingowy dla projektów Terraform i IaC, ze wskazówkami do rozumowania o modułach, providerach, stanie backendu, środowiskach i bramce fmt/validate/plan."
kind: preset
lang: pl
order: 21
stack: Terraform / IaC
---

# Preset Terraform

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla projektów Terraform (i OpenTofu). To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- Pliki `*.tf` — zazwyczaj `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` — plus `.terraform.lock.hcl` i kod wielokrotnego użytku pod `modules/`.
- Blok `backend` (stan zdalny: S3, GCS, Terraform/Tofu Cloud) i jeden lub więcej bloków `provider`.

## O czym należy rozumować

- Rzeczywista bramka: `terraform fmt -check`, `terraform validate`, `tflint` i `terraform plan` — zapisane dosłownie (`tofu`, jeśli używany jest OpenTofu).
- Sposób rozdzielenia środowisk — workspace vs katalogi per środowisko (`envs/dev`, `envs/prod`) vs pliki `*.tfvars`.
- Granice modułów, przypinanie wersji providerów oraz miejsce przechowywania stanu backendu i sekretów.

## Uwagi

Plan jest tylko do odczytu; `apply` mutuje infrastrukturę — nigdy nie uruchamiaj go jako bramki walidacyjnej. Zanotuj OpenTofu jako alternatywę drop-in dla Terraform CLI.
