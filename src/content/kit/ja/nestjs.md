---
title: NestJS
description: "NestJS アプリケーション向けのオンボーディングプリセット。モジュール、コントローラー、プロバイダー、DTO、デコレーターモデル、テストランナーに関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 8
stack: NestJS
---

# NestJS プリセット

onboard フローが NestJS アプリケーションに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- `nest-cli.json`、`package.json` 内の `@nestjs/*` パッケージ、そして `NestFactory.create` を呼び出す `main.ts`。
- デコレーターモデル：`@Module`、`@Controller`、`@Injectable`、およびモジュール・コントローラー・サービス・DTO を含む機能フォルダ。
- パッケージマネージャーは、存在するロックファイル（`pnpm-lock.yaml`、`yarn.lock`、`package-lock.json`）から推論する。

## 推論すべきこと

- 実際のテストコマンド（Jest ユニット `*.spec.ts` および e2e `*.e2e-spec.ts`）、リントのゲート（`eslint`）、ビルドスクリプトを原文どおりに捕捉する。
- モジュールの境界、依存性注入、プロバイダー、ガード／パイプ／インターセプター、そして設定の置き場所（`@nestjs/config`）。
- モジュール・コントローラー・プロバイダー・DTO に適したスタック別スキル。

## 補足

フィーチャーモジュールがルートモジュールにどう結合されているか、また TypeORM／Prisma、マイクロサービス、GraphQL を使用しているかどうかを捕捉する。
