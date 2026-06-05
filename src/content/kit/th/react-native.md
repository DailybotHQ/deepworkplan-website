---
title: React Native
description: "พรีเซ็ต onboarding สำหรับโครงการ React Native และ Expo พร้อมแนวคิดสำหรับ navigation, native config, test runner และ bare กับ managed workflow"
kind: preset
lang: th
order: 16
stack: React Native (Expo)
---

# พรีเซ็ต React Native

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับโครงการ React Native และ Expo นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- `react-native` ใน dependency; `app.json`/`app.config.ts` และ `expo` สำหรับ managed project หรือโฟลเดอร์ `ios/`+`android/` สำหรับ bare RN
- `metro.config.*`, React Navigation หรือ `expo-router` (ไดเรกทอรี `app/`) และการตั้งค่า Jest
- อนุมาน package manager จาก lockfile ที่มีอยู่

## สิ่งที่ต้องให้เหตุผล

- ว่าเป็น Expo managed หรือ bare React Native เพราะมีผลต่อคำสั่ง build และ run
- คำสั่ง test จริง (`jest` + `@testing-library/react-native`), lint (`eslint`) และ run/build (`expo start`, `eas build` หรือ `npx react-native run-*`) โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- รูปแบบ navigation (React Navigation กับ `expo-router`) และ convention ของ screen/component

## หมายเหตุ

ตรวจสอบ bare RN กับ Expo managed แต่เนิ่น ๆ เพราะการแบ่ง native กับ managed เปลี่ยนคำสั่งแทบทุกคำสั่ง
