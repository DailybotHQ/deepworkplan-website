---
title: Swift / iOS
description: "Un preset d'onboarding pour les projets Swift et iOS, avec des indices de raisonnement sur SwiftUI ou UIKit, le gestionnaire de dépendances, XCTest, le lint et xcodebuild."
kind: preset
lang: fr
order: 18
stack: Swift / iOS
---

# Preset Swift / iOS

Un guide de raisonnement que le flux d'onboarding utilise pour les projets Swift et iOS. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- Un `*.xcodeproj`/`*.xcworkspace`, plus `Sources/` ou une cible d'application avec des fichiers Swift.
- Gestionnaire de dépendances : `Package.swift` (SwiftPM), `Podfile`/`Podfile.lock` (CocoaPods) ou `Cartfile` (Carthage).
- Couche UI : SwiftUI (`View`, `@State`, `body`) ou UIKit (`UIViewController`, storyboards/XIBs).

## Sur quoi raisonner

- Les commandes réelles de test (`xcodebuild test` ou `swift test`), de lint (`swiftlint` / `swift-format`) et de build (`xcodebuild` / `swift build`) — capturées verbatim.
- Si l'UI est en SwiftUI ou UIKit, et le projet/workspace et le scheme à cibler.
- Le gestionnaire de dépendances utilisé ; il modifie la configuration et l'invocation du build.

## Notes

Détecter SwiftUI vs UIKit et SwiftPM vs CocoaPods tôt ; les deux déterminent l'invocation du build et des tests.
