---
title: TypeScript Lambda
description: "サーバーレス TypeScript Lambda プロジェクト向けのオンボーディングプリセット。ハンドラー、Serverless／SAM／CDK ツールチェーン、IAM 最小権限に関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 22
stack: TS Lambda (Serverless)
---

# TypeScript Lambda プリセット

onboard フローがサーバーレス TypeScript Lambda プロジェクトに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- デプロイ記述子：`serverless.yml`（Serverless Framework）、`template.yaml`（AWS SAM）、または `cdk.json`（AWS CDK）と、`tsconfig.json`。
- `handler` をエクスポートするハンドラー関数（多くの場合 `src/functions/` または `src/handlers/` 配下）、関数ごとに一つのエントリーポイント。

## 推論すべきこと

- 実際のゲート：リント（`eslint`）、型チェック（`tsc --noEmit`）、テスト（Jest／Vitest）、バンドル（esbuild／tsc）、シンス／パッケージ（`sls package`、`sam build`、`cdk synth`）を原文どおりに捕捉する。
- 関数ごとの構成、イベントソース（API Gateway、SQS、EventBridge）、コールドスタートとバンドルサイズのバジェット。
- IAM スコープ：関数ごとの最小権限、シークレットと設定の置き場所（SSM、Secrets Manager、env）。

## 補足

SECURITY ドキュメントでは最小権限の IAM を強調する。シンス／パッケージは安全なゲートであり、デプロイはアカウントを変更するため検証ゲートとして実行してはならない。
