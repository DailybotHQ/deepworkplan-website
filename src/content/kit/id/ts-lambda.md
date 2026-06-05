---
title: TypeScript Lambda
description: "Preset onboarding untuk proyek serverless TypeScript Lambda, dengan petunjuk penalaran untuk handler, toolchain Serverless/SAM/CDK, dan IAM least privilege."
kind: preset
lang: id
order: 22
stack: TS Lambda (Serverless)
---

# Preset TypeScript Lambda

Panduan penalaran yang dipakai alur onboard untuk proyek serverless TypeScript Lambda. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- Deskriptor deploy: `serverless.yml` (Serverless Framework), `template.yaml` (AWS SAM), atau `cdk.json` (AWS CDK), bersama `tsconfig.json`.
- Fungsi handler yang mengekspor `handler`, sering di bawah `src/functions/` atau `src/handlers/`, dengan satu titik masuk per fungsi.

## Yang perlu dipertimbangkan

- Gate yang sebenarnya: lint (`eslint`), type-check (`tsc --noEmit`), test (Jest/Vitest), bundle (esbuild/tsc), dan synth/package (`sls package`, `sam build`, `cdk synth`) — dicatat apa adanya.
- Struktur per-fungsi, sumber event (API Gateway, SQS, EventBridge), serta anggaran cold-start/ukuran bundle.
- Cakupan IAM — least privilege per fungsi — serta tempat penyimpanan rahasia dan konfigurasi (SSM, Secrets Manager, env).

## Catatan

Tekankan IAM least-privilege di dokumen SECURITY. Synth/package adalah gate yang aman; deploy memutasi akun dan tidak boleh dijalankan sebagai validasi.
