---
title: Swift / iOS
description: "Ein Onboarding-Preset für Swift- und iOS-Projekte mit Reasoning-Hinweisen zu SwiftUI oder UIKit, dem Dependency-Manager, XCTest, Linting und xcodebuild."
kind: preset
lang: de
order: 18
stack: Swift / iOS
---

# Swift/iOS-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Swift- und iOS-Projekte nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- Ein `*.xcodeproj`/`*.xcworkspace` sowie `Sources/` oder ein App-Target mit Swift-Dateien.
- Dependency-Manager: `Package.swift` (SwiftPM), `Podfile`/`Podfile.lock` (CocoaPods) oder `Cartfile` (Carthage).
- UI-Schicht: SwiftUI (`View`, `@State`, `body`) oder UIKit (`UIViewController`, Storyboards/XIBs).

## Worüber nachzudenken ist

- Die echten Test- (`xcodebuild test` oder `swift test`), Lint- (`swiftlint` / `swift-format`) und Build-Befehle (`xcodebuild` / `swift build`) — wortwörtlich erfasst.
- Ob die UI SwiftUI oder UIKit verwendet, sowie Projekt/Workspace und das zu verwendende Scheme.
- Der eingesetzte Dependency-Manager; er verändert Setup und Build-Aufruf.

## Hinweise

SwiftUI vs. UIKit und SwiftPM vs. CocoaPods frühzeitig erkennen; beides bestimmt den Build- und Test-Aufruf.
