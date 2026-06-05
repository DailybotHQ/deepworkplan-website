---
title: Ruby on Rails
description: "Ruby on Rails アプリケーション向けのオンボーディングプリセット。MVC レイアウト、マイグレーション、テストフレームワーク、アセットと設定のパイプラインに関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 10
stack: Ruby on Rails
---

# Ruby on Rails プリセット

onboard フローが Ruby on Rails アプリケーションに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- `rails` を含む `Gemfile`、`bin/rails` 実行ファイル、そして `app/{models,controllers,views}` の MVC レイアウト。
- `config/routes.rb`、`db/migrate/` マイグレーション、そして `db/schema.rb`。
- テストフレームワークは存在するものから推論する：RSpec（`spec/`、`.rspec`）または Minitest（`test/`）。

## 推論すべきこと

- 実際のテストコマンド（`bin/rails test` または `bundle exec rspec`）と、リントのゲート（`rubocop`）を原文どおりに捕捉する。
- リクエスト → ルート → コントローラー → モデル → ビューのフロー、マイグレーションのワークフロー、認証情報と設定の置き場所。
- モデル・コントローラー・マイグレーション、および（存在する場合は）ジョブとメーラーに適したスタック別スキル。

## 補足

Active Job／Sidekiq と Hotwire／Turbo が使用されているかどうか、および暗号化された認証情報（`config/credentials`）の管理方法を捕捉する。
