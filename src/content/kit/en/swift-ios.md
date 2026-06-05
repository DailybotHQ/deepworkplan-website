---
title: Swift / iOS
description: "An onboarding preset for Swift and iOS projects, with reasoning cues for SwiftUI or UIKit, the dependency manager, XCTest, linting, and xcodebuild."
kind: preset
lang: en
order: 18
stack: Swift / iOS
---

# Swift / iOS preset

A reasoning guide the onboard flow uses for Swift and iOS projects. It is a checklist, not a template — detected reality wins.

## Signals

- An `*.xcodeproj`/`*.xcworkspace`, plus `Sources/` or an app target with Swift files.
- Dependency manager: `Package.swift` (SwiftPM), `Podfile`/`Podfile.lock` (CocoaPods), or `Cartfile` (Carthage).
- UI layer: SwiftUI (`View`, `@State`, `body`) or UIKit (`UIViewController`, storyboards/XIBs).

## What to reason about

- The real test (`xcodebuild test` or `swift test`), lint (`swiftlint` / `swift-format`), and build (`xcodebuild` / `swift build`) commands — captured verbatim.
- Whether the UI is SwiftUI or UIKit, and the project/workspace and scheme to target.
- The dependency manager in use; it changes setup and the build invocation.

## Notes

Detect SwiftUI vs UIKit and SwiftPM vs CocoaPods early; both decide the build and test invocation.
