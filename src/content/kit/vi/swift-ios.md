---
title: Swift / iOS
description: "Preset onboarding cho dự án Swift và iOS, với gợi ý suy luận về SwiftUI hoặc UIKit, dependency manager, XCTest, linting và xcodebuild."
kind: preset
lang: vi
order: 18
stack: Swift / iOS
---

# Swift / iOS preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho dự án Swift và iOS. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- Một `*.xcodeproj`/`*.xcworkspace`, cùng `Sources/` hoặc một app target chứa file Swift.
- Dependency manager: `Package.swift` (SwiftPM), `Podfile`/`Podfile.lock` (CocoaPods), hoặc `Cartfile` (Carthage).
- Lớp UI: SwiftUI (`View`, `@State`, `body`) hoặc UIKit (`UIViewController`, storyboard/XIB).

## Cần suy luận về điều gì

- Các lệnh test (`xcodebuild test` hoặc `swift test`), lint (`swiftlint` / `swift-format`) và build (`xcodebuild` / `swift build`) thực tế — ghi lại nguyên văn.
- Liệu UI là SwiftUI hay UIKit, và project/workspace cùng scheme cần nhắm tới.
- Dependency manager đang dùng; nó thay đổi cấu hình và lệnh build.

## Ghi chú

Phát hiện SwiftUI vs UIKit và SwiftPM vs CocoaPods sớm; cả hai quyết định lệnh build và test.
