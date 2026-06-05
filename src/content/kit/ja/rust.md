---
title: Rust
description: "Rust プロジェクト向けのオンボーディングプリセット。クレート、モジュール、Cargo ワークスペース、フィーチャー、cargo test／clippy／build ゲートに関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 19
stack: Rust (Cargo)
---

# Rust プリセット

onboard フローが Rust プロジェクトに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- `Cargo.toml` と `Cargo.lock`。バイナリなら `src/main.rs`、ライブラリなら `src/lib.rs`、および `src/` 配下のモジュール。
- マルチクレートのモノレポには `members` を持つ `[workspace]`、オプション機能には `[features]`。

## 推論すべきこと

- 実際のゲート：`cargo test`、`cargo clippy`（多くの場合 `-- -D warnings`）、`cargo fmt --check`、`cargo build --release` を原文どおりに捕捉する。
- クレートの種別（バイナリかライブラリか）、モジュールツリー、デフォルトとオプションの機能フラグ。
- モジュール・エラー型・インテグレーションテストとユニットテスト（インライン `#[cfg(test)]` と `tests/` の違い）に適したスタック別スキル。

## 補足

ワークスペースの場合、クレートごとの境界とバイナリを所有するクレートを捕捉する。`build.rs`、MSRV、または `unsafe` の境界があれば記録する。
