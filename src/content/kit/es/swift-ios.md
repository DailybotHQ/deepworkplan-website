---
title: Swift / iOS
description: "Preset de incorporación para proyectos Swift e iOS, con pistas de razonamiento para SwiftUI o UIKit, el gestor de dependencias, XCTest, linting y xcodebuild."
kind: preset
lang: es
order: 18
stack: Swift / iOS
---

# Preset Swift / iOS

Guía de razonamiento que el flujo de onboard usa para proyectos Swift e iOS. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- Un `*.xcodeproj`/`*.xcworkspace`, más `Sources/` o un app target con archivos Swift.
- Gestor de dependencias: `Package.swift` (SwiftPM), `Podfile`/`Podfile.lock` (CocoaPods) o `Cartfile` (Carthage).
- Capa de interfaz: SwiftUI (`View`, `@State`, `body`) o UIKit (`UIViewController`, storyboards/XIBs).

## Qué razonar

- Los comandos reales de prueba (`xcodebuild test` o `swift test`), lint (`swiftlint` / `swift-format`) y compilación (`xcodebuild` / `swift build`) — capturados al pie de la letra.
- Si la interfaz es SwiftUI o UIKit, y el proyecto/workspace y el scheme a utilizar.
- El gestor de dependencias en uso; cambia la configuración y la invocación de compilación.

## Notas

Detecta SwiftUI vs UIKit y SwiftPM vs CocoaPods desde el principio; ambos determinan la invocación de compilación y pruebas.
