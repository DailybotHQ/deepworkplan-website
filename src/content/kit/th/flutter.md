---
title: Flutter
description: "พรีเซ็ต onboarding สำหรับโครงการ Flutter และ Dart พร้อมแนวคิดสำหรับ widget, analyzer, state management, code generation และ flutter test"
kind: preset
lang: th
order: 17
stack: Flutter (Dart)
---

# พรีเซ็ต Flutter

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับโครงการ Flutter และ Dart นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- `pubspec.yaml` ที่มี dependency `flutter` และ `lib/main.dart` ที่มี entry point `runApp`/`MaterialApp`
- Widget (`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml` และ `test/` ที่มี `flutter test`
- State management (Provider, Riverpod หรือ Bloc) และ code generation (`build_runner`, `json_serializable`) หากมี

## สิ่งที่ต้องให้เหตุผล

- คำสั่ง test (`flutter test`), analyze (`flutter analyze`), format (`dart format`) และ build (`flutter build <target>`) จริง โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- แนวทาง state management ที่ใช้งานอยู่และ convention ของโฟลเดอร์ widget/feature ภายใต้ `lib/`
- ว่ามีการใช้ code generation หรือไม่ (`dart run build_runner build`) และ target ที่มีอยู่

## หมายเหตุ

ยืนยัน library ของ state management และขั้นตอน `build_runner` จาก `pubspec.yaml` เพราะทั้งสองส่งผลต่อ skill ที่สร้างขึ้น
