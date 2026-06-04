---
title: Node / TS service
description: "Node と TypeScript のサービスおよびサーバーレス API 向けのオンボーディングプリセット。リクエストのライフサイクル、連携、テストについての推論の手がかりを備える。"
kind: preset
lang: ja
order: 4
stack: Node / TS service
---

# Node / TS service プリセット

onboard フローが Node／TypeScript のサービスおよびサーバーレス API に用いる推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## 手がかり

- `tsconfig.json` に加え、サーバーフレームワーク（`express`、`fastify`、`@nestjs/*`）、またはサーバーレスのハンドラー（`serverless.yml`、`template.yaml`、`functions/` ディレクトリ）。
- パッケージマネージャーは、存在するロックファイルから推測する。

## 推論すべきこと

- 実際のリント、型チェック（`tsc --noEmit`）、テスト（Jest／Vitest）、ビルドのスクリプト。原文どおりに捕捉する。
- 常駐型のサービスか、サーバーレスか。これがアーキテクチャと性能のドキュメントを形づくる。
- スタックに合ったスキル。`endpoint`/`handler`、`service`、`middleware`、`integration`、または `lambda-fn`。

## 補足

リクエストまたはイベントのライフサイクル、連携ポイント、そしてシークレットと設定がどこに存在するかを捕捉します。
