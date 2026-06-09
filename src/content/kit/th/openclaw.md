---
title: OpenClaw
description: "adapter DWP สำหรับ OpenClaw: การสแกน .agents/skills แบบ native การจับคู่การดำเนินงานแบบไม่มีผู้ดูแล และการดำเนินแผนต่อด้วย cron สำหรับ agent workspace แบบอัตโนมัติ"
kind: adapter
lang: th
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# adapter OpenClaw

OpenClaw คือแพลตฟอร์มเอเจนต์อัตโนมัติที่รัน workspace ที่มีอายุยาวนานพร้อมรอบตามกำหนดเวลา มันสแกน `<workspace>/.agents/skills/` เพื่อหา skill pack ที่ติดตั้งไว้โดยตรง ซึ่งหมายความว่า DWP skill โหลดโดยไม่ต้องมี adapter shim — ติดตั้งไว้ที่นั่นและ OpenClaw จะหยิบมันขึ้นมาโดยอัตโนมัติ

## ระดับการสนับสนุน

**Full** — OpenClaw อ่าน `AGENTS.md` และโหลด skill ผ่านมาตรฐาน AgentSkills sub-skill DWP ทั้งหมด (`onboard`, `create`, `execute`, `refine`, `resume`, `status`, `verify`) พร้อมใช้งาน

## การติดตั้ง

```bash
openclaw skills install deepworkplan
```

หรือด้วยตนเอง: clone `DailybotHQ/deepworkplan-skill` ไปยัง `<workspace>/.agents/skills/deepworkplan/`

## การเรียกใช้

ข้อความธรรมดา — OpenClaw ไม่ใช้ prefix slash command:

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## การจับคู่การดำเนินงานแบบไม่มีผู้ดูแล

primitives การกำหนดเวลาของ OpenClaw จับคู่โดยตรงกับโมเดลการดำเนินต่อของ DWP:

| primitive OpenClaw | บทบาท DWP |
|--------------------|----------|
| Workspace root | archetype [Agent workspace](/spec/archetypes): `AGENTS.md`, `.agents/`, `.dwp/` ที่รากของ workspace |
| `<workspace>/.agents/skills/` (การสแกน tier-2 แบบ native) | ที่อยู่ของ pack นี้ — ไม่ต้องมี adapter shim |
| รอบ Heartbeat หรือ cron | รอบ [scheduled continuation](/spec/agent-protocol#scheduled-continuation) หนึ่งรอบ: ตื่น → DWP Resume Protocol → งาน atomic ถัดไป → อัปเดตสถานะ → yield |
| การตรวจสอบ `HEARTBEAT.md` | เพิ่มหนึ่งบรรทัด: "If `.dwp/plans/` has an open plan, resume it for one task." |
| Standing orders | ขอบเขตการอนุมัติแผนและอำนาจจำกัดของโปรไฟล์ไม่มีผู้ดูแล |

ในทางปฏิบัติ:

1. มนุษย์สร้างและอนุมัติแผนแบบโต้ตอบ การอนุมัติคือจุดควบคุม — รอบไม่มีผู้ดูแลไม่เคยสร้างและดำเนินการในรอบเดียว
2. แผนต้องพกชั้นสถานะที่เครื่องอ่านได้ (`manifest.json` + `state.json`) ใน workspace ที่ไม่มี git `state.json` คือสิ่งที่ทำให้ resume แบบปลอดภัยจากการขัดจังหวะเป็นไปได้ ดู [สถานะแผน](/spec/plan-state)
3. แต่ละรอบ heartbeat หรือ cron ดำเนินงานอย่างมากหนึ่งงาน ผ่าน validation gate อัปเดต `state.json` แบบ atomic และ yield
4. เมื่อเจอเงื่อนไขหยุด เอเจนต์เขียนฟิลด์ `blocked` ของ `state.json` และรายงานผ่านช่องทางปกติของ workspace การมองแวบถัดไปของมนุษย์ — หรือรายงาน heartbeat — เห็นสิ่งที่จำเป็นพอดี

ผลลัพธ์: แผนหลายวันที่รอดจากการรีสตาร์ต การเปลี่ยนโมเดล และขอบเขตของ session ดำเนินงานข้ามคืนโดย daemon — ด้วย gate เดียวกับที่การรันภายใต้การกำกับดูแลของมนุษย์จะมี

## หมายเหตุ

workspace ของ OpenClaw คือตัวอย่างเชิงทฤษฎีของ archetype [agent workspace](/spec/archetypes) การผสานรวม `HEARTBEAT.md` และข้อกำหนด `state.json` ของ skill pack DWP ได้รับการออกแบบโดยคำนึงถึงแพลตฟอร์มนี้
