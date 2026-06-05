---
title: Angular
description: "Angular プロジェクト向けのオンボーディングプリセット。コンポーネント、モジュールまたはスタンドアロン API、サービス、RxJS、テストランナーに関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 15
stack: Angular
---

# Angular プリセット

onboard フローが Angular プロジェクトに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- `angular.json` と依存関係の `@angular/core`、`@Component`／`@NgModule` またはスタンドアロンコンポーネントを含む `src/app/`。
- `@Injectable` を持つサービス、RxJS オブザーバブル、依存性注入。
- パッケージマネージャーは、存在するロックファイルから推論する。

## 推論すべきこと

- 実際のテスト（`ng test` ／ Karma+Jasmine `*.spec.ts` または Jest）、リント（`ng lint` ／ `@angular-eslint`）、ビルド（`ng build`）コマンドを原文どおりに捕捉する。
- アプリが NgModules とスタンドアロンコンポーネント API のどちらを使用しているか、およびルーティングと DI の規約。
- スタック別スキル：`component`、`service`、`module`／`standalone`、`guard`／`resolver`。

## 補足

CLI プロジェクトレイアウトに従う Angular アプリに有効です。存在する設定から Karma／Jasmine か Jest かを確認する。
