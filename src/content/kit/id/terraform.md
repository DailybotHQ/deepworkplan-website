---
title: Terraform
description: "Preset onboarding untuk proyek Terraform dan IaC, dengan petunjuk penalaran untuk modul, provider, backend state, environment, dan gate fmt/validate/plan."
kind: preset
lang: id
order: 21
stack: Terraform / IaC
---

# Preset Terraform

Panduan penalaran yang dipakai alur onboard untuk proyek Terraform (dan OpenTofu). Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- File `*.tf` — umumnya `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` — ditambah `.terraform.lock.hcl` dan kode yang dapat digunakan ulang di bawah `modules/`.
- Blok `backend` (remote state: S3, GCS, Terraform/Tofu Cloud) dan satu atau lebih blok `provider`.

## Yang perlu dipertimbangkan

- Gate yang sebenarnya: `terraform fmt -check`, `terraform validate`, `tflint`, dan `terraform plan` — dicatat apa adanya (`tofu` jika OpenTofu yang digunakan).
- Cara environment dipisahkan — workspace vs direktori per-environment (`envs/dev`, `envs/prod`) vs file `*.tfvars`.
- Batas modul, pinning provider/versi, serta tempat penyimpanan backend state dan rahasia.

## Catatan

Plan bersifat read-only; `apply` memutasi infrastruktur — jangan pernah menjalankannya sebagai gate validasi. Catat OpenTofu sebagai varian drop-in dari Terraform CLI.
