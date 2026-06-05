---
title: Angular
description: "พรีเซ็ต onboarding สำหรับโครงการ Angular พร้อมแนวคิดสำหรับ component, module หรือ standalone API, service, RxJS และ test runner"
kind: preset
lang: th
order: 15
stack: Angular
---

# พรีเซ็ต Angular

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับโครงการ Angular นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- `angular.json` และ `@angular/core` ใน dependency; `src/app/` ที่มี `@Component`/`@NgModule` หรือ standalone component
- Service ที่มี `@Injectable`, RxJS observable และ dependency injection
- อนุมาน package manager จาก lockfile ที่มีอยู่

## สิ่งที่ต้องให้เหตุผล

- คำสั่ง test จริง (`ng test` / Karma+Jasmine `*.spec.ts` หรือ Jest), lint (`ng lint` / `@angular-eslint`) และ build (`ng build`) โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- ว่า app ใช้ NgModule หรือ standalone-components API และ convention ของ routing กับ DI
- skill ที่เหมาะกับสแตก: `component`, `service`, `module`/`standalone`, `guard`/`resolver`

## หมายเหตุ

เหมาะสำหรับแอป Angular ที่ใช้โครงสร้างโครงการแบบ CLI ตรวจสอบว่าใช้ Karma/Jasmine หรือ Jest จาก config ที่มีอยู่
