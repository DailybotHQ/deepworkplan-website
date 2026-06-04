---
title: Vue + Vite
description: "พรีเซ็ต onboarding สำหรับโครงการ Vue + Vite พร้อมแนวคิดเรื่อง single-file component, Composition API, store แบบ Pinia และการทดสอบด้วย Vitest"
kind: preset
lang: th
order: 2
stack: Vue + Vite
---

# พรีเซ็ต Vue + Vite

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้กับโครงการ Vue + Vite นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณ

- `vite.config.*` และ `vue` อยู่ใน dependency (Vue 3, `<script setup>`)
- `@vitejs/plugin-vue`, `vue-tsc`, `vue-router`, `pinia`
- ตัวจัดการแพ็กเกจที่อนุมานจาก lockfile ที่มีอยู่

## สิ่งที่ต้องพิจารณา

- สคริปต์ lint, type-check (`vue-tsc --noEmit`), test (Vitest/Jest) และ build จริง บันทึกไว้ตามต้นฉบับทุกตัวอักษร
- ข้อตกลงเรื่องการทดสอบ (`*.spec.ts` / `*.test.ts`) และรูปแบบของ `@vue/test-utils`
- skill ที่เหมาะกับสแตก เช่น `component`, `store-module`, `composable`, `view`/`route`

## หมายเหตุ

หากใน dependency มี `react` แทน `vue` ให้นำแนวคิดเดียวกันมาใช้กับ skill ที่ขึ้นรูปตาม React
