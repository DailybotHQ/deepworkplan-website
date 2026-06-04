---
title: Astro / Svelte
description: "พรีเซ็ต onboarding สำหรับเว็บไซต์ Astro ที่อาจใช้ Svelte islands ด้วย พร้อมแนวคิดเรื่อง content collection การตรวจสอบ schema และ island hydration"
kind: preset
lang: th
order: 3
stack: Astro / Svelte
---

# พรีเซ็ต Astro / Svelte

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้กับเว็บไซต์ Astro ซึ่งอาจใช้ Svelte islands ด้วย นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณ

- `astro.config.*` และอาจมี `@astrojs/svelte` กับคอมโพเนนต์ `.svelte`
- Content Collections ภายใต้ `src/content/` ที่มี Zod schema

## สิ่งที่ต้องพิจารณา

- สคริปต์ lint, type-check (`astro check`), test และ build จริง บันทึกไว้ตามต้นฉบับทุกตัวอักษร
- schema ของ content collection และข้อตกลงเรื่อง island hydration (เลือก `client:visible` แทน `client:load`)
- skill ที่เหมาะกับสแตกสำหรับคอมโพเนนต์ หน้าเพจ และรายการเนื้อหา

## หมายเหตุ

มีประโยชน์กับเว็บไซต์ที่ขับเคลื่อนด้วยเนื้อหา ซึ่งใช้สถาปัตยกรรม island ของ Astro พร้อมความโต้ตอบแบบเลือกจุด
