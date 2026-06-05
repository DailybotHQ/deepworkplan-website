---
title: Terraform
description: "Preset di onboarding per progetti Terraform e IaC, con spunti di ragionamento per moduli, provider, state backend, ambienti e il gate fmt/validate/plan."
kind: preset
lang: it
order: 21
stack: Terraform / IaC
---

# Preset Terraform

Una guida di ragionamento che il flusso di onboard usa per i progetti Terraform (e OpenTofu). È una checklist, non un template — vince la realtà rilevata.

## Segnali

- File `*.tf` — comunemente `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` — più un `.terraform.lock.hcl` e codice riutilizzabile sotto `modules/`.
- Un blocco `backend` (stato remoto: S3, GCS, Terraform/Tofu Cloud) e uno o più blocchi `provider`.

## Su cosa ragionare

- Il gate reale: `terraform fmt -check`, `terraform validate`, `tflint` e `terraform plan` — catturati alla lettera (`tofu` se si usa OpenTofu).
- Come vengono separati gli ambienti — workspace vs directory per ambiente (`envs/dev`, `envs/prod`) vs file `*.tfvars`.
- Confini dei moduli, pinning di provider e versioni, e dove risiedono lo state backend e i segreti.

## Note

Plan è in sola lettura; `apply` modifica l'infrastruttura — non eseguirlo mai come gate di validazione. Annotare OpenTofu come variante drop-in della CLI Terraform.
