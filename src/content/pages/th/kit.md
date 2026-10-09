---
title: "Kit ของ Deep Work Plan"
description: "skill และ sub-skill เก้าตัว คำสั่ง adapter สำหรับเอเจนต์ preset สำหรับการออนบอร์ด ส่วนเสริมแบบเลือกเข้าร่วม และตัวอย่างที่ทำให้ Deep Work Plan รันได้ทุกที่"
lastUpdated: 2026-10-09
---

## Kit ของ Deep Work Plan

kit คือทุกอย่างที่คุณต้องใช้เพื่อรันระเบียบวิธีในทางปฏิบัติ มันถูกติดตั้งจาก
`DailybotHQ/deepworkplan-skill`

```bash
npx skills add DailybotHQ/deepworkplan-skill@v6.0.2 --skill deepworkplan
```

แพ็ก 6.x ปัจจุบันสร้างแผนใหม่ด้วย v6 เป็นค่าเริ่มต้น แผนเดิมคงรุ่นที่บันทึกไว้ การย้ายต้องมีคำขออย่างชัดเจน

### skill และ sub-skill ของมัน

skill ของ Deep Work Plan คือตัวกำหนดเส้นทางพร้อม sub-skill เก้าตัว

- **create** — แยกย่อยเป้าหมายเป็นแผนที่มีโครงสร้าง (`/dwp-create`)
- **execute** — ดำเนินแผนทีละงาน ตรวจสอบแต่ละ gate (`/dwp-execute`)
- **refine** — เพิ่ม ลบ หรือจัดลำดับงานใหม่ขณะรักษางานที่เสร็จแล้ว (`/dwp-refine`)
- **resume** — สร้างสถานะขึ้นใหม่และดำเนินแผนที่ถูกขัดจังหวะต่อ (`/dwp-resume`)
- **status** — รายงานความคืบหน้าโดยไม่ทำการเปลี่ยนแปลง (`/dwp-status`)
- **verify** — ตรวจสอบความสอดคล้องของ repository และแผนอย่างเป็นวัตถุวิสัย (`/dwp-verify`)
- **onboard** — ทำให้ repository เป็น AI-first (`/deepworkplan-onboard`)
- **author** — สร้างหรือพัฒนา skill, agent และคำสั่งของ repo เอง (`/skill-create`, `/agent-create`)
- **upgrade** — พาสกิลที่ติดตั้งไว้ไปสู่รีลีสใหม่อย่างปลอดภัย (`/dwp-upgrade`)

### คำสั่ง

คำสั่ง slash บาง ๆ ส่งต่อไปยัง sub-skill และส่วนเสริม

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — ลูปวางแผน-ดำเนินการ-ตรวจสอบ
- `skill-create`, `agent-create` — ส่งต่อไปยัง sub-skill ชื่อ author
- `lib-upgrade` — ส่งต่อไปยังส่วนเสริม dependency-upgrade (ติดตั้งก็ต่อเมื่อยอมรับส่วนเสริมนั้นเท่านั้น)

### Adapter

การผสานต่อเอเจนต์แบบบาง ๆ สำหรับ Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini, OpenCode, Windsurf, Cline, Antigravity, OpenClaw, Hermes และ cloud/background agent (Claude Code remote tasks, Codex cloud, ประเภท Jules) OpenClaw และ Hermes เป็นแพลตฟอร์มเอเจนต์อัตโนมัติที่รันแผนภายใต้โปรไฟล์การดำเนินงานแบบไม่มีผู้ดูแล ขับเคลื่อนด้วย heartbeat หรือการกำหนดเวลา cron

### Preset สำหรับการออนบอร์ด

คู่มือการให้เหตุผลต่อเทคสแตกที่ flow การออนบอร์ดใช้เพื่อปรับ docs, skill และคำสั่งตรวจสอบ —
ไม่ใช่เทมเพลต มีหก preset ได้แก่ Django, Vue + Vite, Astro/Svelte, บริการ Node/TS, แพ็กเกจ/CLI ของ Python
และตัวสำรองทั่วไป

### ส่วนเสริม (เลือกเข้าร่วม)

ความสามารถที่ flow การออนบอร์ดวางซ้อนลงบน repo สี่อย่างเป็นทางเลือกและไม่เคยเป็นส่วนหนึ่งของค่าพื้นฐาน AI-first ส่วนการตรวจสอบในเครื่องของ AI Diff Reviewer จำเป็นตั้งแต่มาตรฐาน 2.3.0

- **Devcontainer** — dev container ที่ทำซ้ำได้และแยกตัว พร้อม auth ของ AI-CLI ที่คงอยู่
- **Dailybot** — การรายงานตามวงจรชีวิตของแผน (kickoff, งานสำคัญ, ติดขัด, เสร็จสิ้น) สำหรับทีมที่ใช้ Dailybot พร้อมการเข้าถึง Dailybot agent skill เต็มรูปแบบ (3.23.2: แชต check-in ฟอร์ม ถาม AI Plan คีย์ API ต่อ repo และอื่น ๆ)
- **Dependency upgrade** — การอัปเกรดที่เป็นกลางต่อตัวจัดการแพ็กเกจ ทำเป็นชุด ตรวจสอบแล้ว และย้อนกลับได้
- **Design system** — `DESIGN.md` ที่จำกัดขอบเขตเฉพาะอินเทอร์เฟซ (ที่ `docs/DESIGN.md` อ้างอิงจาก `AGENTS.md`) ซึ่งให้เหตุผลจากแหล่งดีไซน์จริงของ repo พร้อมโปรไฟล์สำหรับ UI เชิงภาพ เอาต์พุต CLI ที่จัดสไตล์ และการส่งข้อความเชิงสนทนา เพื่อให้เอเจนต์สร้างเอาต์พุตอินเทอร์เฟซที่ตรงแบรนด์ เมื่อตรวจพบระบบดีไซน์ การเสนอเป็นข้อบังคับแต่การติดตั้งควบคุมด้วยการยอมรับ — โปรไฟล์เชิงภาพแนะนำอย่างหนักแน่นเมื่อตรวจพบ ส่วนโปรไฟล์ CLI และเชิงสนทนาถูกแนะนำเมื่อตรวจพบและถูกถามเสมอ
- **AI Diff Reviewer** — การตรวจสอบในเครื่องที่จำเป็น: การออนบอร์ดติดตั้ง [AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) v3 + `.review/extension.md` และการตรวจความปลอดภัยของทุก Final Review รันมัน; Flow B แบบเลือกได้เพิ่ม CI PR merge gate ที่ใช้ extension เดียวกัน โดยถูกเสนออย่างชัดเจนและไม่เคยถูกติดตั้งโดยไม่ได้ร้องขอ

### ระบบนิเวศ

**ระเบียบวิธีทำงานได้ด้วยตัวเอง ส่วนเสริมช่วยขยายพลังของมัน** ส่วนเสริมแต่ละตัวเป็นตัวเชื่อมต่อแบบบางภายในสกิล Deep Work Plan ซึ่งปักหมุดด้วย tag ไปยังผลิตภัณฑ์ที่มี repository, release และเวอร์ชันอินเทอร์เฟซเป็นของตัวเอง ทุกผลิตภัณฑ์ทำงานได้โดยไม่ต้องใช้ Deep Work Plan และไม่มีส่วนเสริมใดที่จำเป็น

- **สกิล Deep Work Plan** — สร้าง ดำเนินการ ตรวจสอบ ทำต่อ และปรับปรุงแผน ไม่ต้องใช้ส่วนเสริมใด
- **[herdr](/th/kit/herdr)** — peer ใน pane ของ Herdr บนเครื่องใดก็ได้: การมอบหมายงานแบบโต้ตอบที่มีการตอบกลับที่ได้รับอนุญาตเพียงครั้งเดียว ปักหมุดที่ `herdr-peers@v0.1.0`
- **[agentkit](/th/kit/agentkit)** — คำสั่ง ak เดียวสำหรับเอเจนต์เขียนโค้ดบนเทอร์มินัลทุกตัว: การมอบหมายงานแบบ headless ใน worktree ปักหมุดที่ `coding-agents-kit@v0.1.1`
- **[devcontainer](/th/kit/devcontainer)** — เทมเพลต Dev Containers และอิมเมจพื้นฐานที่จัดส่งโดยไม่มีเอเจนต์เขียนโค้ด ปักหมุดที่ `devcontainer-kit@v0.1.2`
- **[vim](/th/kit/vim)** — ตัวแก้ไขบนเทอร์มินัล พร้อมตัวเรียกดูแผนแบบอ่านอย่างเดียวและตัวแสดงผล Markdown ปักหมุดที่ `deepworkplan-vim@v0.4.1`

รีจิสทรีของส่วนเสริมและตัวอธิบายถูกจัดส่งมาในเบต้าของ v7 ซึ่งเป็น pre-release: `v7.0.0-beta.1`

### ตัวอย่าง

การเดินผ่านแบบก่อนและหลังที่ทำไว้แล้ว

- [เรียกดู kit](/kit)
- [Quickstart](/quickstart)
- [ดูตัวอย่าง](/examples)
