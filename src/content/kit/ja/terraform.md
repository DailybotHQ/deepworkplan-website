---
title: Terraform
description: "Terraform および IaC プロジェクト向けのオンボーディングプリセット。モジュール、プロバイダー、バックエンド状態、環境、fmt／validate／plan ゲートに関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 21
stack: Terraform / IaC
---

# Terraform プリセット

onboard フローが Terraform（および OpenTofu）プロジェクトに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- `*.tf` ファイル（一般に `main.tf`、`variables.tf`、`outputs.tf`、`providers.tf`）、`.terraform.lock.hcl`、および `modules/` 配下の再利用可能なコード。
- リモート状態を管理する `backend` ブロック（S3、GCS、Terraform／Tofu Cloud）と、一つ以上の `provider` ブロック。

## 推論すべきこと

- 実際のゲート：`terraform fmt -check`、`terraform validate`、`tflint`、`terraform plan` を原文どおりに捕捉する（OpenTofu を使用する場合は `tofu`）。
- 環境の分離方法：ワークスペース、環境ごとのディレクトリ（`envs/dev`、`envs/prod`）、または `*.tfvars` ファイル。
- モジュールの境界、プロバイダー／バージョンのピン留め、バックエンド状態とシークレットの置き場所。

## 補足

plan は読み取り専用であり、`apply` はインフラを変更する。検証ゲートとして実行してはならない。OpenTofu は Terraform CLI のドロップイン代替として記録する。
