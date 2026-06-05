---
title: Go
description: "Go プロジェクト向けのオンボーディングプリセット。モジュール、cmd／internal レイアウト、テーブル駆動テスト、go test／vet／build ゲートに関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 20
stack: Go (modules)
---

# Go プリセット

onboard フローが Go プロジェクトに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- `go.mod` と `go.sum`。`package main` エントリーポイントは通常 `cmd/` 配下にあり、共有コードは `internal/` と `pkg/` 配下。
- マルチモジュールのリポジトリは複数の `go.mod` を持ち、モジュールパスは `go.mod` の先頭に記載される。

## 推論すべきこと

- 実際のゲート：`go test ./...`、`go vet ./...`、`golangci-lint run`、`gofmt -l`（または `go fmt`）、`go build ./...` を原文どおりに捕捉する。
- パッケージレイアウト（`cmd/`、`internal/`、`pkg/`）と、`cmd/` 配下のバイナリ。
- テスト対象コードの隣に置かれるテーブル駆動の `*_test.go` テスト、パッケージ・ハンドラー・テストに適したスタック別スキル。

## 補足

モジュールパス、バイナリのエントリーポイント、リントゲートが `golangci-lint` か `go vet` かを捕捉する。
