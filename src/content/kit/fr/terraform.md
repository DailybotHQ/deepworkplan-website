---
title: Terraform
description: "Un preset d'onboarding pour les projets Terraform et IaC, avec des indices de raisonnement sur les modules, providers, l'état backend, les environnements et la porte fmt/validate/plan."
kind: preset
lang: fr
order: 21
stack: Terraform / IaC
---

# Preset Terraform

Un guide de raisonnement que le flux d'onboarding utilise pour les projets Terraform (et OpenTofu). C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- Des fichiers `*.tf` — généralement `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` — plus un `.terraform.lock.hcl` et du code réutilisable sous `modules/`.
- Un bloc `backend` (état distant : S3, GCS, Terraform/Tofu Cloud) et un ou plusieurs blocs `provider`.

## Sur quoi raisonner

- La vraie porte : `terraform fmt -check`, `terraform validate`, `tflint` et `terraform plan` — capturés verbatim (`tofu` si OpenTofu est utilisé).
- Comment les environnements sont séparés — workspaces vs répertoires par environnement (`envs/dev`, `envs/prod`) vs fichiers `*.tfvars`.
- Les frontières de modules, le pinning des versions de providers, et l'endroit où vivent l'état backend et les secrets.

## Notes

Plan est en lecture seule ; `apply` modifie l'infrastructure — ne jamais l'exécuter comme porte de validation. Noter OpenTofu comme variante drop-in du CLI Terraform.
