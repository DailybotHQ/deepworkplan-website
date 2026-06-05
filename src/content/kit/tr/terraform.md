---
title: Terraform
description: "Terraform ve IaC projeleri için modüller, sağlayıcılar, arka uç durumu, ortamlar ve fmt/validate/plan kapısına yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 21
stack: Terraform / IaC
---

# Terraform ön ayarı

Onboarding akışının Terraform (ve OpenTofu) projeleri için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `*.tf` dosyaları — yaygın olarak `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` — artı `.terraform.lock.hcl` ve `modules/` altında yeniden kullanılabilir kod.
- Bir `backend` bloğu (uzak durum: S3, GCS, Terraform/Tofu Cloud) ve bir veya daha fazla `provider` bloğu.

## Neyin üzerine akıl yürütülmeli

- Gerçek kapı: `terraform fmt -check`, `terraform validate`, `tflint` ve `terraform plan` — birebir kaydedilir (OpenTofu kullanılıyorsa `tofu`).
- Ortamların nasıl ayrıldığı — çalışma alanları, ortam başına dizinler (`envs/dev`, `envs/prod`) veya `*.tfvars` dosyaları.
- Modül sınırları, sağlayıcı/sürüm sabitleme ve arka uç durumu ile sırların nerede tutulduğu.

## Notlar

Plan salt okunurdur; `apply` altyapıyı değiştirir — hiçbir zaman doğrulama kapısı olarak çalıştırmayın. OpenTofu'yu Terraform CLI'nın doğrudan bir değişkeni olarak not edin.
