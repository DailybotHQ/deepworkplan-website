---
title: Swift / iOS
description: "Пресет онбординга для проектов Swift и iOS с подсказками для рассуждений о SwiftUI и UIKit, менеджере зависимостей, XCTest, линтинге и xcodebuild."
kind: preset
lang: ru
order: 18
stack: Swift / iOS
---

# Пресет Swift / iOS

Руководство-рассуждение, которое процесс onboard использует для проектов Swift и iOS. Это чек-лист, а не шаблон — обнаруженная реальность побеждает.

## Сигналы

- `*.xcodeproj`/`*.xcworkspace` и папка `Sources/` или app target со Swift-файлами.
- Менеджер зависимостей: `Package.swift` (SwiftPM), `Podfile`/`Podfile.lock` (CocoaPods) или `Cartfile` (Carthage).
- UI-слой: SwiftUI (`View`, `@State`, `body`) или UIKit (`UIViewController`, storyboards/XIBs).

## О чём рассуждать

- Реальные команды тестирования (`xcodebuild test` или `swift test`), линтинга (`swiftlint` / `swift-format`) и сборки (`xcodebuild` / `swift build`) — захваченные дословно.
- SwiftUI или UIKit и проект/рабочее пространство и схема для таргетинга.
- Используемый менеджер зависимостей: он изменяет настройку и вызов сборки.

## Примечания

Определить SwiftUI или UIKit и SwiftPM или CocoaPods как можно раньше — оба решают вызов сборки и тестирования.
