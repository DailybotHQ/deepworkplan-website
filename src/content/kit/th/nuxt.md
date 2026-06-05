---
title: Nuxt
description: "พรีเซ็ต onboarding สำหรับโครงการ Nuxt พร้อมแนวคิดสำหรับ page, server API route, composable, Nitro server engine และการทดสอบ"
kind: preset
lang: th
order: 14
stack: Nuxt (Vue)
---

# พรีเซ็ต Nuxt

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับโครงการ Nuxt นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- `nuxt.config.ts` และ `nuxt` ใน dependency พร้อม entrypoint `app.vue`
- `pages/` (file-based routing), `server/api/` (Nitro endpoint), `composables/` และ `components/` ที่ auto-import
- อนุมาน package manager จาก lockfile ที่มีอยู่ (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`)

## สิ่งที่ต้องให้เหตุผล

- script ของ lint (`eslint`), type-check (`nuxi typecheck`), test (Vitest กับ `@nuxt/test-utils`) และ build (`nuxt build`) จริง โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- routing และ data fetching (`useFetch`/`useAsyncData`), route `server/api/` ของ Nitro, composable และ convention ของ auto-import; rendering mode (SSR/SSG/SPA)
- skill ที่เหมาะกับสแตก: `page`/`route`, `server-route` (`server/api`), `composable`, `component`

## หมายเหตุ

Auto-import (component, composable, utils) เป็น convention ของ Nuxt โดยเฉพาะ ให้คำนึงถึงสิ่งนี้แทนที่จะเพิ่ม import ที่ชัดเจนทุกที่
