---
title: Swift / iOS
description: "Swift और iOS प्रोजेक्ट के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें SwiftUI या UIKit, dependency manager, XCTest, linting और xcodebuild के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 18
stack: Swift / iOS
---

# Swift / iOS preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह Swift और iOS प्रोजेक्ट के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- एक `*.xcodeproj`/`*.xcworkspace`, साथ में `Sources/` या Swift files के साथ एक app target।
- Dependency manager: `Package.swift` (SwiftPM), `Podfile`/`Podfile.lock` (CocoaPods), या `Cartfile` (Carthage)।
- UI layer: SwiftUI (`View`, `@State`, `body`) या UIKit (`UIViewController`, storyboards/XIBs)।

## किस बारे में तर्क करें

- वास्तविक test (`xcodebuild test` या `swift test`), lint (`swiftlint` / `swift-format`), और build (`xcodebuild` / `swift build`) कमांड — हूबहू दर्ज किए गए।
- क्या UI SwiftUI है या UIKit, और target करने के लिए project/workspace तथा scheme।
- उपयोग में आने वाला dependency manager; यह setup और build invocation बदल देता है।

## टिप्पणियाँ

SwiftUI बनाम UIKit और SwiftPM बनाम CocoaPods जल्दी पता लगाएं; दोनों build और test invocation तय करते हैं।
