---
title: Swift / iOS
description: "Пресет онбордингу для Swift та iOS-проєктів із підказками для SwiftUI або UIKit, менеджера залежностей, XCTest, лінтингу та xcodebuild."
kind: preset
lang: uk
order: 18
stack: Swift / iOS
---

# Пресет Swift / iOS

Орієнтир для міркувань, який процес онбордингу використовує для Swift та iOS-проєктів. Це чек-лист, а не шаблон — виявлена реальність важливіша.

## Сигнали

- `*.xcodeproj`/`*.xcworkspace`, плюс `Sources/` або ціль застосунку зі Swift-файлами.
- Менеджер залежностей: `Package.swift` (SwiftPM), `Podfile`/`Podfile.lock` (CocoaPods) або `Cartfile` (Carthage).
- UI-шар: SwiftUI (`View`, `@State`, `body`) або UIKit (`UIViewController`, storyboards/XIBs).

## Про що міркувати

- Справжні команди тестування (`xcodebuild test` або `swift test`), лінтингу (`swiftlint` / `swift-format`) і збірки (`xcodebuild` / `swift build`) — зафіксувати дослівно.
- Чи використовується SwiftUI або UIKit, а також проєкт/workspace і схема для цілі.
- Менеджер залежностей, що використовується; він змінює налаштування та виклик збірки.

## Примітки

Визначити SwiftUI vs UIKit і SwiftPM vs CocoaPods якомога раніше — обидва визначають виклики збірки та тестування.
