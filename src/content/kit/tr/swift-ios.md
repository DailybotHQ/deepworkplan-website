---
title: Swift / iOS
description: "Swift ve iOS projeleri için SwiftUI ya da UIKit, bağımlılık yöneticisi, XCTest, linting ve xcodebuild komutuna yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 18
stack: Swift / iOS
---

# Swift / iOS ön ayarı

Onboarding akışının Swift ve iOS projeleri için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- Bir `*.xcodeproj`/`*.xcworkspace`, artı `Sources/` veya Swift dosyaları içeren bir uygulama hedefi.
- Bağımlılık yöneticisi: `Package.swift` (SwiftPM), `Podfile`/`Podfile.lock` (CocoaPods) veya `Cartfile` (Carthage).
- Kullanıcı arayüzü katmanı: SwiftUI (`View`, `@State`, `body`) veya UIKit (`UIViewController`, storyboard/XIB'ler).

## Neyin üzerine akıl yürütülmeli

- Gerçek test (`xcodebuild test` veya `swift test`), lint (`swiftlint` / `swift-format`) ve derleme (`xcodebuild` / `swift build`) komutları — birebir kaydedilir.
- Kullanıcı arayüzünün SwiftUI mı yoksa UIKit mi olduğu ve hedeflenecek proje/çalışma alanı ile şema.
- Kullanılan bağımlılık yöneticisi; kurulumu ve derleme çağrısını değiştirir.

## Notlar

SwiftUI ile UIKit ve SwiftPM ile CocoaPods arasındaki farkı erken saptayın; ikisi de derleme ve test çağrısını belirler.
