---
title: Swift / iOS
description: "Preset onboarding untuk proyek Swift dan iOS, dengan petunjuk penalaran untuk SwiftUI atau UIKit, dependency manager, XCTest, linting, dan xcodebuild."
kind: preset
lang: id
order: 18
stack: Swift / iOS
---

# Preset Swift / iOS

Panduan penalaran yang dipakai alur onboard untuk proyek Swift dan iOS. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- Sebuah `*.xcodeproj`/`*.xcworkspace`, ditambah `Sources/` atau target aplikasi berisi file Swift.
- Dependency manager: `Package.swift` (SwiftPM), `Podfile`/`Podfile.lock` (CocoaPods), atau `Cartfile` (Carthage).
- Lapisan UI: SwiftUI (`View`, `@State`, `body`) atau UIKit (`UIViewController`, storyboard/XIB).

## Yang perlu dipertimbangkan

- Command test (`xcodebuild test` atau `swift test`), lint (`swiftlint` / `swift-format`), dan build (`xcodebuild` / `swift build`) yang sebenarnya — dicatat apa adanya.
- Apakah UI menggunakan SwiftUI atau UIKit, serta proyek/workspace dan skema yang ditarget.
- Dependency manager yang digunakan; ini mengubah pengaturan dan invokasi build.

## Catatan

Deteksi SwiftUI vs UIKit dan SwiftPM vs CocoaPods lebih awal; keduanya menentukan invokasi build dan test.
