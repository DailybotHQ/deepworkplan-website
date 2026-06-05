---
title: Swift / iOS
description: "面向 Swift 与 iOS 项目的接入预设，包含 SwiftUI 或 UIKit、依赖管理器、XCTest、代码检查与 xcodebuild 的推理提示。"
kind: preset
lang: zh
order: 18
stack: Swift / iOS
---

# Swift / iOS 预设

onboard 流程用于 Swift 与 iOS 项目的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- 一个 `*.xcodeproj`/`*.xcworkspace`，以及 `Sources/` 目录或包含 Swift 文件的应用 target。
- 依赖管理器：`Package.swift`（SwiftPM）、`Podfile`/`Podfile.lock`（CocoaPods）或 `Cartfile`（Carthage）。
- UI 层：SwiftUI（`View`、`@State`、`body`）或 UIKit（`UIViewController`、storyboard/XIB）。

## 需要推理的内容

- 真实的测试（`xcodebuild test` 或 `swift test`）、代码检查（`swiftlint` / `swift-format`）与构建（`xcodebuild` / `swift build`）命令——原样捕获。
- UI 层使用的是 SwiftUI 还是 UIKit，以及要针对的项目/工作区与 scheme。
- 所使用的依赖管理器——它会改变配置方式与构建调用。

## 备注

尽早检测 SwiftUI 与 UIKit 的区别，以及 SwiftPM 与 CocoaPods 的区别——两者都决定了构建与测试的调用方式。
