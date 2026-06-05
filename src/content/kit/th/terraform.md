---
title: Terraform
description: "พรีเซ็ต onboarding สำหรับโครงการ Terraform และ IaC พร้อมแนวคิดสำหรับ module, provider, backend state, environment และ gate ของ fmt/validate/plan"
kind: preset
lang: th
order: 21
stack: Terraform / IaC
---

# พรีเซ็ต Terraform

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับโครงการ Terraform (และ OpenTofu) นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- ไฟล์ `*.tf` ที่พบบ่อย ได้แก่ `main.tf`, `variables.tf`, `outputs.tf`, `providers.tf` พร้อม `.terraform.lock.hcl` และโค้ดที่ใช้ซ้ำได้ใน `modules/`
- บล็อก `backend` (remote state: S3, GCS, Terraform/Tofu Cloud) และบล็อก `provider` อย่างน้อยหนึ่งบล็อก

## สิ่งที่ต้องให้เหตุผล

- gate จริง: `terraform fmt -check`, `terraform validate`, `tflint` และ `terraform plan` โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร (ใช้ `tofu` หาก OpenTofu อยู่ในการใช้งาน)
- วิธีแยก environment: workspace กับไดเรกทอรีแยกตาม environment (`envs/dev`, `envs/prod`) กับไฟล์ `*.tfvars`
- ขอบเขต module, การ pin version ของ provider และตำแหน่งที่เก็บ backend state และ secret

## หมายเหตุ

Plan เป็นแบบ read-only; `apply` จะเปลี่ยนแปลง infrastructure จริง ห้ามรันเป็น validation gate OpenTofu เป็น variant แบบ drop-in ของ Terraform CLI
