---
title: Laravel
description: "Laravel プロジェクト向けのオンボーディングプリセット。Eloquent モデル、コントローラー、ルート、マイグレーション、Artisan コマンド、テストランナーに関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 11
stack: Laravel (PHP)
---

# Laravel プリセット

onboard フローが Laravel プロジェクトに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- `laravel/framework` を含む `composer.json`、`artisan` コンソールスクリプト、そして `app/` ツリー（`Models`、`Http/Controllers`、`Providers`）。
- `routes/web.php` と `routes/api.php`、`database/migrations/`、そして Eloquent モデル。
- テストランナーとリント／フォーマットツールは、存在する `composer.json` と設定ファイルから推論する。

## 推論すべきこと

- 実際のテストコマンド（`php artisan test`、`vendor/bin/phpunit`、または `vendor/bin/pest`）と、リント／フォーマットのゲート（Pint、PHP-CS-Fixer、PHPStan／Larastan）を原文どおりに捕捉する。
- ルーティング・コントローラー・Eloquent の規約、マイグレーションのワークフロー、環境と設定のレイアウト（`.env`、`config/`）。
- モデル・コントローラー・マイグレーション・Artisan コマンドに適したスタック別スキル。

## 補足

標準的なプロジェクトレイアウトに従う Laravel アプリに有効です。リポジトリが Sail／Docker を使用している場合、テストとリントのゲートがコンテナ内で実行されるかどうかを捕捉する。
