---
title: Terraform
description: "An onboarding preset for Terraform and IaC projects, with reasoning cues for modules, providers, backend state, environments, and the fmt/validate/plan gate."
kind: preset
lang: en
order: 21
stack: Terraform / IaC
---

# Terraform preset

A reasoning guide the onboard flow uses for Terraform (and OpenTofu) projects. It is a checklist, not a template — detected reality wins.

## Signals

- `*.tf` files — commonly `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` — plus a `.terraform.lock.hcl` and reusable code under `modules/`.
- A `backend` block (remote state: S3, GCS, Terraform/Tofu Cloud) and one or more `provider` blocks.

## What to reason about

- The real gate: `terraform fmt -check`, `terraform validate`, `tflint`, and `terraform plan` — captured verbatim (`tofu` if OpenTofu is in use).
- How environments are separated — workspaces vs per-environment directories (`envs/dev`, `envs/prod`) vs `*.tfvars` files.
- Module boundaries, provider/version pinning, and where backend state and secrets live.

## Notes

Plan is read-only; `apply` mutates infrastructure — never run it as a validation gate. Note OpenTofu as a drop-in variant of the Terraform CLI.
