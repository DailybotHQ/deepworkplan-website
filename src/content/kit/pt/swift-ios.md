---
title: Swift / iOS
description: "Um preset de onboarding para projetos Swift e iOS, com pistas de raciocínio para SwiftUI ou UIKit, o gerenciador de dependências, XCTest, linting e xcodebuild."
kind: preset
lang: pt
order: 18
stack: Swift / iOS
---

# Preset Swift / iOS

Um guia de raciocínio que o fluxo de onboarding usa para projetos Swift e iOS. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- Um `*.xcodeproj`/`*.xcworkspace`, mais `Sources/` ou um app target com arquivos Swift.
- Gerenciador de dependências: `Package.swift` (SwiftPM), `Podfile`/`Podfile.lock` (CocoaPods) ou `Cartfile` (Carthage).
- Camada de UI: SwiftUI (`View`, `@State`, `body`) ou UIKit (`UIViewController`, storyboards/XIBs).

## Sobre o que raciocinar

- Os comandos reais de teste (`xcodebuild test` ou `swift test`), lint (`swiftlint` / `swift-format`) e build (`xcodebuild` / `swift build`) — capturados literalmente.
- Se a UI é SwiftUI ou UIKit, e o project/workspace e o scheme alvo.
- O gerenciador de dependências em uso; ele altera a configuração e a invocação do build.

## Notas

Detectar SwiftUI vs UIKit e SwiftPM vs CocoaPods logo no início; ambos determinam a invocação de build e teste.
