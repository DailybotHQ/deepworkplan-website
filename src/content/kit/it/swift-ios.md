---
title: Swift / iOS
description: "Preset di onboarding per progetti Swift e iOS, con spunti di ragionamento per SwiftUI o UIKit, il dependency manager, XCTest, il linting e xcodebuild."
kind: preset
lang: it
order: 18
stack: Swift / iOS
---

# Preset Swift / iOS

Una guida di ragionamento che il flusso di onboard usa per i progetti Swift e iOS. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- Un `*.xcodeproj`/`*.xcworkspace`, più `Sources/` o un app target con file Swift.
- Dependency manager: `Package.swift` (SwiftPM), `Podfile`/`Podfile.lock` (CocoaPods) o `Cartfile` (Carthage).
- Livello UI: SwiftUI (`View`, `@State`, `body`) o UIKit (`UIViewController`, storyboard/XIB).

## Su cosa ragionare

- I comandi reali di test (`xcodebuild test` o `swift test`), lint (`swiftlint` / `swift-format`) e build (`xcodebuild` / `swift build`) — catturati alla lettera.
- Se l'interfaccia è SwiftUI o UIKit, e il progetto/workspace e lo scheme da usare come target.
- Il dependency manager in uso; cambia il setup e l'invocazione del build.

## Note

Rilevare SwiftUI vs UIKit e SwiftPM vs CocoaPods tempestivamente; entrambi determinano l'invocazione di build e test.
