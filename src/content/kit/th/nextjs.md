---
title: Next.js
description: "พรีเซ็ต onboarding สำหรับโครงการ Next.js พร้อมแนวคิดสำหรับ App Router กับ Pages Router, Server และ Client Component, route handler และการทดสอบ"
kind: preset
lang: th
order: 12
stack: Next.js (React)
---

# พรีเซ็ต Next.js

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับโครงการ Next.js นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- `package.json` ที่มี `next` และ `react` พร้อม `next.config.js`/`next.config.mjs`/`next.config.ts`
- `app/` (App Router, Server/Client Component, route handler) หรือ `pages/` (Pages Router, API route) โดยตรวจสอบว่าใช้แบบใด
- อนุมาน package manager จาก lockfile ที่มีอยู่ (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`)

## สิ่งที่ต้องให้เหตุผล

- script ของ lint จริง (`eslint` กับ `next/core-web-vitals`), test (Jest/Vitest, และ Playwright/Cypress สำหรับ e2e) และ build (`next build`) โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- router model (App กับ Pages), การแบ่ง Server กับ Client Component และตำแหน่งของ data fetching และ route handler
- skill ที่เหมาะกับสแตก: `page`/`route`, `server-component`, `route-handler`, `component`

## หมายเหตุ

ตรวจสอบ router ก่อนสร้าง skill เพราะ App Router และ Pages Router มี convention ของไฟล์และ data-fetching model ที่แตกต่างกัน
