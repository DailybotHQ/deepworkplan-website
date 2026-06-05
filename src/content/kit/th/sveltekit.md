---
title: SvelteKit
description: "พรีเซ็ต onboarding สำหรับโครงการ SvelteKit พร้อมแนวคิดสำหรับ route, load function, server endpoint, adapter ที่เลือกใช้ และการทดสอบ"
kind: preset
lang: th
order: 13
stack: SvelteKit
---

# พรีเซ็ต SvelteKit

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับโครงการ SvelteKit นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- `svelte.config.js` และ `vite.config.*` ที่มี `@sveltejs/kit` ใน dependency
- `src/routes/` ที่มี `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte` และ endpoint `+server.ts`
- อนุมาน package manager จาก lockfile ที่มีอยู่ (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`)

## สิ่งที่ต้องให้เหตุผล

- script ของ lint (`eslint`), type-check (`svelte-check`), test (Vitest, และ Playwright สำหรับ e2e) และ build (`vite build`) จริง โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- routing และ model ของ `load` (server กับ universal load), form action และ API endpoint `+server.ts`; adapter ที่ configure ไว้
- skill ที่เหมาะกับสแตก: `route` (`+page` + `load`), `endpoint` (`+server.ts`), `component`

## หมายเหตุ

บันทึก adapter ที่ configure ไว้ (`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel) เพราะมันกำหนดเรื่อง build และ deploy
