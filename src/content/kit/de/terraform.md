---
title: Terraform
description: "Ein Onboarding-Preset für Terraform- und IaC-Projekte mit Reasoning-Hinweisen zu Modulen, Providern, Backend-State, Umgebungen und dem fmt/validate/plan-Gate."
kind: preset
lang: de
order: 21
stack: Terraform / IaC
---

# Terraform-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Terraform- (und OpenTofu-) Projekte nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `*.tf`-Dateien — üblicherweise `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` — sowie eine `.terraform.lock.hcl` und wiederverwendbarer Code unter `modules/`.
- Ein `backend`-Block (Remote-State: S3, GCS, Terraform/Tofu Cloud) und ein oder mehrere `provider`-Blöcke.

## Worüber nachzudenken ist

- Das echte Gate: `terraform fmt -check`, `terraform validate`, `tflint` und `terraform plan` — wortwörtlich erfasst (`tofu`, falls OpenTofu im Einsatz ist).
- Wie Umgebungen getrennt werden — Workspaces vs. umgebungsspezifische Verzeichnisse (`envs/dev`, `envs/prod`) vs. `*.tfvars`-Dateien.
- Modulgrenzen, Provider/Versions-Pinning sowie der Ort von Backend-State und Geheimnissen.

## Hinweise

Plan ist schreibgeschützt; `apply` verändert die Infrastruktur — niemals als Validierungs-Gate ausführen. OpenTofu als Drop-in-Variante der Terraform-CLI notieren.
