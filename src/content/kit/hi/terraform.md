---
title: Terraform
description: "Terraform और IaC प्रोजेक्ट के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें modules, providers, backend state, environments और fmt/validate/plan गेट के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 21
stack: Terraform / IaC
---

# Terraform preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह Terraform (और OpenTofu) प्रोजेक्ट के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `*.tf` files — आमतौर पर `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` — साथ में एक `.terraform.lock.hcl` और `modules/` के अंतर्गत पुन:प्रयोज्य कोड।
- एक `backend` block (remote state: S3, GCS, Terraform/Tofu Cloud) और एक या अधिक `provider` blocks।

## किस बारे में तर्क करें

- वास्तविक गेट: `terraform fmt -check`, `terraform validate`, `tflint`, और `terraform plan` — हूबहू दर्ज किए गए (यदि OpenTofu उपयोग में हो तो `tofu`)।
- Environments कैसे अलग किए जाते हैं — workspaces बनाम per-environment directories (`envs/dev`, `envs/prod`) बनाम `*.tfvars` files।
- Module सीमाएँ, provider/version pinning, और backend state तथा secrets कहाँ रहते हैं।

## टिप्पणियाँ

Plan read-only है; `apply` infrastructure को बदलता है — इसे validation गेट के रूप में कभी न चलाएँ। OpenTofu को Terraform CLI के drop-in variant के रूप में नोट करें।
