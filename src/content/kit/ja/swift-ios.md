---
title: Swift / iOS
description: "Swift および iOS プロジェクト向けのオンボーディングプリセット。SwiftUI または UIKit、依存関係マネージャー、XCTest、リント、xcodebuild に関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 18
stack: Swift / iOS
---

# Swift / iOS プリセット

onboard フローが Swift および iOS プロジェクトに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- `*.xcodeproj`／`*.xcworkspace`、および `Sources/` または Swift ファイルを含むアプリターゲット。
- 依存関係マネージャー：`Package.swift`（SwiftPM）、`Podfile`／`Podfile.lock`（CocoaPods）、または `Cartfile`（Carthage）。
- UI レイヤー：SwiftUI（`View`、`@State`、`body`）または UIKit（`UIViewController`、ストーリーボード／XIB）。

## 推論すべきこと

- 実際のテスト（`xcodebuild test` または `swift test`）、リント（`swiftlint` ／ `swift-format`）、ビルド（`xcodebuild` ／ `swift build`）コマンドを原文どおりに捕捉する。
- UI が SwiftUI か UIKit か、および対象とするプロジェクト／ワークスペースとスキーム。
- 使用されている依存関係マネージャー。セットアップとビルドの呼び出しが変わるため重要。

## 補足

SwiftUI か UIKit か、SwiftPM か CocoaPods かを早期に検出する。両者がビルドとテストの呼び出しを決定するため。
