---
title: "Kit ของ Deep Work Plan"
description: "skill และ sub-skill แปดตัว คำสั่ง adapter สำหรับเอเจนต์ preset สำหรับการออนบอร์ด ส่วนเสริมแบบเลือกเข้าร่วม และตัวอย่างที่ทำให้ Deep Work Plan รันได้ทุกที่"
lastUpdated: 2026-05-31
---

## Kit ของ Deep Work Plan

kit คือทุกอย่างที่คุณต้องใช้เพื่อรันระเบียบวิธีในทางปฏิบัติ มันถูกติดตั้งจาก
`DailybotHQ/deepworkplan-skill`

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### skill และ sub-skill ของมัน

skill ของ Deep Work Plan คือตัวกำหนดเส้นทางพร้อม sub-skill แปดตัว

- **create** — แยกย่อยเป้าหมายเป็นแผนที่มีโครงสร้าง (`/dwp-create`)
- **execute** — ดำเนินแผนทีละงาน ตรวจสอบแต่ละ gate (`/dwp-execute`)
- **refine** — เพิ่ม ลบ หรือจัดลำดับงานใหม่ขณะรักษางานที่เสร็จแล้ว (`/dwp-refine`)
- **resume** — สร้างสถานะขึ้นใหม่และดำเนินแผนที่ถูกขัดจังหวะต่อ (`/dwp-resume`)
- **status** — รายงานความคืบหน้าโดยไม่ทำการเปลี่ยนแปลง (`/dwp-status`)
- **verify** — ตรวจสอบความสอดคล้องของ repository และแผนอย่างเป็นวัตถุวิสัย (`/dwp-verify`)
- **onboard** — ทำให้ repository เป็น AI-first (`/deepworkplan-onboard`)
- **author** — สร้างหรือพัฒนา skill, agent และคำสั่งของ repo เอง (`/skill-create`, `/agent-create`)

### คำสั่ง

คำสั่ง slash บาง ๆ ส่งต่อไปยัง sub-skill และส่วนเสริม

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — ลูปวางแผน-ดำเนินการ-ตรวจสอบ
- `skill-create`, `agent-create` — ส่งต่อไปยัง sub-skill ชื่อ author
- `lib-upgrade` — ส่งต่อไปยังส่วนเสริม dependency-upgrade (ติดตั้งก็ต่อเมื่อยอมรับส่วนเสริมนั้นเท่านั้น)

### Adapter

การผสานต่อเอเจนต์แบบบาง ๆ สำหรับ Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini,
OpenCode, Windsurf, Cline และ Antigravity

### Preset สำหรับการออนบอร์ด

คู่มือการให้เหตุผลต่อเทคสแตกที่ flow การออนบอร์ดใช้เพื่อปรับ docs, skill และคำสั่งตรวจสอบ —
ไม่ใช่เทมเพลต มีหก preset ได้แก่ Django, Vue + Vite, Astro/Svelte, บริการ Node/TS, แพ็กเกจ/CLI ของ Python
และตัวสำรองทั่วไป

### ส่วนเสริม (เลือกเข้าร่วม)

ความสามารถที่เป็นทางเลือกซึ่ง flow การออนบอร์ดสามารถวางซ้อนลงบน repo — ไม่เคยเป็นส่วนหนึ่งของค่าพื้นฐาน AI-first

- **Devcontainer** — dev container ที่ทำซ้ำได้และแยกตัว พร้อม auth ของ AI-CLI ที่คงอยู่
- **Dailybot** — การรายงานความคืบหน้าและหมุดหมายแบบเต็มความสามารถสำหรับทีมที่ใช้ Dailybot
- **Dependency upgrade** — การอัปเกรดที่เป็นกลางต่อตัวจัดการแพ็กเกจ ทำเป็นชุด ตรวจสอบแล้ว และย้อนกลับได้
- **Design system** — `DESIGN.md` ที่จำกัดขอบเขตเฉพาะ frontend (ที่ `docs/DESIGN.md` อ้างอิงจาก `AGENTS.md`) ซึ่งให้เหตุผลจาก token ดีไซน์จริงของ repo เพื่อให้เอเจนต์สร้าง UI ที่ตรงแบรนด์ เปิดใช้งานเป็นค่าเริ่มต้นเมื่อตรวจพบระบบดีไซน์

### ตัวอย่าง

การเดินผ่านแบบก่อนและหลังที่ทำไว้แล้ว

- [เรียกดู kit](/kit)
- [Quickstart](/quickstart)
- [ดูตัวอย่าง](/examples)
