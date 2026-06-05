---
title: Swift / iOS
description: "Preset onboardingowy dla projektów Swift i iOS, ze wskazówkami do rozumowania o SwiftUI lub UIKit, menedżerze zależności, XCTest, lintowaniu i xcodebuild."
kind: preset
lang: pl
order: 18
stack: Swift / iOS
---

# Preset Swift / iOS

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla projektów Swift i iOS. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- Plik `*.xcodeproj`/`*.xcworkspace` oraz `Sources/` lub cel aplikacji z plikami Swift.
- Menedżer zależności: `Package.swift` (SwiftPM), `Podfile`/`Podfile.lock` (CocoaPods) lub `Cartfile` (Carthage).
- Warstwa UI: SwiftUI (`View`, `@State`, `body`) lub UIKit (`UIViewController`, storyboardy/XIB).

## O czym należy rozumować

- Rzeczywiste polecenia testowe (`xcodebuild test` lub `swift test`), lint (`swiftlint` / `swift-format`) i build (`xcodebuild` / `swift build`) — zapisane dosłownie.
- Czy interfejs użytkownika to SwiftUI czy UIKit oraz projekt/workspace i schemat, na który należy celować.
- Używany menedżer zależności; zmienia konfigurację i wywołanie budowania.

## Uwagi

Wykryj SwiftUI vs UIKit i SwiftPM vs CocoaPods wcześnie; oba determinują wywołania build i test.
