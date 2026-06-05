---
title: NestJS
description: "พรีเซ็ต onboarding สำหรับแอปพลิเคชัน NestJS พร้อมแนวคิดสำหรับ module, controller, provider, DTO, decorator model และ test runner"
kind: preset
lang: th
order: 8
stack: NestJS
---

# พรีเซ็ต NestJS

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับแอปพลิเคชัน NestJS นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- `nest-cli.json`, แพ็กเกจ `@nestjs/*` ใน `package.json` และ `main.ts` ที่เรียก `NestFactory.create`
- Decorator model: `@Module`, `@Controller`, `@Injectable` และโฟลเดอร์ feature ที่มี module, controller, service และ DTO
- อนุมาน package manager จาก lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`)

## สิ่งที่ต้องให้เหตุผล

- คำสั่ง test จริง (Jest unit `*.spec.ts` และ e2e `*.e2e-spec.ts`), gate ของ lint (`eslint`) และ build script โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- ขอบเขต module, dependency injection, provider, guard/pipe/interceptor และตำแหน่งที่เก็บ configuration (`@nestjs/config`)
- skill ที่เหมาะกับสแตกสำหรับ module, controller, provider และ DTO

## หมายเหตุ

บันทึกวิธีที่ feature module ถูกเชื่อมเข้า root module และว่า app ใช้ TypeORM/Prisma, microservice หรือ GraphQL
