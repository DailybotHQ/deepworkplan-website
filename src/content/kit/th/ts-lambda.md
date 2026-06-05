---
title: TypeScript Lambda
description: "พรีเซ็ต onboarding สำหรับโครงการ serverless TypeScript Lambda พร้อมแนวคิดสำหรับ handler, toolchain ของ Serverless/SAM/CDK และ IAM least privilege"
kind: preset
lang: th
order: 22
stack: TS Lambda (Serverless)
---

# พรีเซ็ต TypeScript Lambda

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับโครงการ serverless TypeScript Lambda นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- deploy descriptor: `serverless.yml` (Serverless Framework), `template.yaml` (AWS SAM) หรือ `cdk.json` (AWS CDK) ควบคู่กับ `tsconfig.json`
- ฟังก์ชัน handler ที่ export `handler` มักอยู่ใน `src/functions/` หรือ `src/handlers/` โดยมี entry point หนึ่งอันต่อหนึ่งฟังก์ชัน

## สิ่งที่ต้องให้เหตุผล

- gate จริง: lint (`eslint`), type-check (`tsc --noEmit`), test (Jest/Vitest), bundle (esbuild/tsc) และ synth/package (`sls package`, `sam build`, `cdk synth`) โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- โครงสร้างของแต่ละฟังก์ชัน, event source (API Gateway, SQS, EventBridge) และงบประมาณ cold-start/bundle-size
- ขอบเขต IAM โดยยึดหลัก least privilege ต่อฟังก์ชัน และตำแหน่งที่เก็บ secret และ config (SSM, Secrets Manager, env)

## หมายเหตุ

เน้น IAM แบบ least privilege ในเอกสาร SECURITY Synth/package เป็น gate ที่ปลอดภัย; deploy จะเปลี่ยนแปลง account จริงและห้ามรันเป็น validation
