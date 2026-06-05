---
title: Swift / iOS
description: "พรีเซ็ต onboarding สำหรับโครงการ Swift และ iOS พร้อมแนวคิดสำหรับ SwiftUI หรือ UIKit, dependency manager, XCTest, linting และ xcodebuild"
kind: preset
lang: th
order: 18
stack: Swift / iOS
---

# พรีเซ็ต Swift / iOS

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับโครงการ Swift และ iOS นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- `*.xcodeproj`/`*.xcworkspace` พร้อม `Sources/` หรือ app target ที่มีไฟล์ Swift
- Dependency manager: `Package.swift` (SwiftPM), `Podfile`/`Podfile.lock` (CocoaPods) หรือ `Cartfile` (Carthage)
- UI layer: SwiftUI (`View`, `@State`, `body`) หรือ UIKit (`UIViewController`, storyboard/XIB)

## สิ่งที่ต้องให้เหตุผล

- คำสั่ง test จริง (`xcodebuild test` หรือ `swift test`), lint (`swiftlint` / `swift-format`) และ build (`xcodebuild` / `swift build`) โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- ว่า UI เป็น SwiftUI หรือ UIKit และ project/workspace กับ scheme ที่ต้องใช้
- dependency manager ที่ใช้งานอยู่ เพราะมีผลต่อการตั้งค่าและการเรียก build

## หมายเหตุ

ตรวจสอบ SwiftUI กับ UIKit และ SwiftPM กับ CocoaPods แต่เนิ่น ๆ เพราะทั้งสองกำหนดการเรียก build และ test
