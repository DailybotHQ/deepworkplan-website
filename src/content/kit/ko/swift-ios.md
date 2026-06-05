---
title: Swift / iOS
description: "Swift 및 iOS 프로젝트를 위한 온보딩 프리셋으로, SwiftUI 또는 UIKit, 의존성 관리자, XCTest, 린팅, xcodebuild에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 18
stack: Swift / iOS
---

# Swift / iOS 프리셋

onboard 흐름이 Swift 및 iOS 프로젝트에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `*.xcodeproj`/`*.xcworkspace`, 그리고 `Sources/` 또는 Swift 파일이 있는 앱 타겟.
- 의존성 관리자: `Package.swift`(SwiftPM), `Podfile`/`Podfile.lock`(CocoaPods), 또는 `Cartfile`(Carthage).
- UI 레이어: SwiftUI(`View`, `@State`, `body`) 또는 UIKit(`UIViewController`, 스토리보드/XIB).

## 추론할 사항

- 실제 테스트(`xcodebuild test` 또는 `swift test`), 린트(`swiftlint` / `swift-format`), 빌드(`xcodebuild` / `swift build`) 명령 — 그대로 포착합니다.
- UI가 SwiftUI인지 UIKit인지, 그리고 타겟할 프로젝트/워크스페이스와 스킴.
- 사용 중인 의존성 관리자 — 설정과 빌드 호출 방식을 바꿉니다.

## 참고

SwiftUI 대 UIKit, SwiftPM 대 CocoaPods를 일찍 감지하세요 — 둘 다 빌드와 테스트 호출을 결정합니다.
