---
title: ส่วนเสริม
description: "ส่วนขยาย DWP แบบเลือกได้: สี่ addon ที่จัดส่ง (devcontainer, Dailybot, dependency-upgrade, design-system) สัญญา addon และแนวคิด kit (skills, agents, presets, adapters, examples)"
order: 5
lang: th
section: Addons
---

# ส่วนเสริม

**เวอร์ชัน 2.0** ส่วนเสริมเป็นส่วนขยายเลือกได้ของวิธีการ Deep Work Plan หลัก **ไม่จำเป็นสำหรับการสอดคล้อง** — รีโพที่มี addon ศูนย์ตัวก็ AI-first และสอดคล้อง DWP ครบ แต่ละ addon ถูกเสนอระหว่าง onboarding ยอมรับหรือปฏิเสธอย่างชัดเจน และเมื่อยอมรับจะ **กระทบกัน** กับการตั้งค่าที่มีแทนการทับล้าง

## สัญญา addon

ทุก addon ที่จัดส่งมีสี่ส่วนประกอบบังคับ:

| ส่วนประกอบ | วัตถุประสงค์ |
|-----------|---------|
| **Spec** | คำอธิบาย normative แบบ RFC-2119 ว่า addon ให้อะไรและ "สอดคล้องกับ addon นี้" หมายถึงอะไร |
| **Reasoning templates** | แนวทางที่เอเจนต์เติมโดยให้เหตุผลจาก stack ของรีโพเป้าหมาย — ไม่ใช่ copy-paste |
| **Onboarding hook** | จุดเข้า `SKILL.md` ที่ขั้นตอน `onboard` เรียกเมื่อนักพัฒนายอมรับ |
| **Validation step** | เช็กลิสต์ยืนยันว่า addon ถูกนำไปใช้ถูกต้อง |

การค้นพบ: ขั้นตอน `onboard` นับ `skills/deepworkplan/addons/` และนำเสนอแต่ละ addon เป็นขั้นตอน opt-in ใน **Phase 7b** หลัง scaffolding หลัก

## Addon ที่จัดส่ง (สี่ตัว)

วันนี้มีสี่ addon แต่ละตัวมี **หน้าแคตตาล็อก kit** พร้อมรายละเอียดสำหรับผู้ใช้ และ **spec normative** ภายใน skill Deep Work Plan

### Devcontainer (addon แรก)

การตั้งค่า `.devcontainer/` + `docker/` แบบ compose ที่ให้เหตุผลจาก stack ที่ตรวจพบ

- **หน้า kit:** [Devcontainer](/kit/devcontainer)
- **สิ่งที่เพิ่ม:** volume auth AI-CLI ถาวร (Claude, Codex, Cursor, gh, Dailybot) `dailybot-project-network` `DOCKER_DEV_ENV=vscode` alias การตรวจสอบ (`codecheck`, `check`, `fix`, `test`) สุขอนามัย secret แบบ public-OSS
- **พฤติกรรม:** ~85% โครงคงที่ ~15% ให้เหตุผลต่อ stack devcontainer ที่มีอยู่ถูกกระทบกัน ไม่ทับล้าง
- **เมื่อเสนอ:** รีโポส่วนใหญ่ที่มี Docker หรือบริการที่ได้ประโยชน์จาก dev container แยก

### Dailybot (addon ที่สอง)

การเชื่อม opt-in กับ **ทีม Dailybot** ของนักพัฒนาเพื่อมองเห็นความคืบหน้าของเอเจนต์

- **หน้า kit:** [Dailybot](/kit/dailybot) — อ้างอิงความสามารถครบ
- **สิ่งที่ DWP addon เชื่อม:** รายงาน lifecycle แผนสี่แบบ (kickoff, significant task, blocked, completion) ผ่าน sub-skill dailybot `report`; การบังคับใช้ hook แบบ deterministic แบบเลือกได้ (`dailybot hook`, CLI `>= 3.1.2`)
- **Skill คู่กัน:** ติดตั้ง [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (ปัจจุบัน **3.4.0**) เปิด **13 ความสามารถ** — แชทบน Slack/Teams/Discord/Google Chat check-in การเขียนฟอร์ม ask AI kudos อีเมล และอื่นๆ DWP addon เชื่อมเฉพาะ **report** ความสามารถอื่นเรียกผ่าน skill Dailybot โดยตรง
- **Auth:** มอบหมายทั้งหมดให้ skill Dailybot (`dailybot login` หรือ `DAILYBOT_API_KEY`) addon นี้ไม่เก็บ credentials
- **Guardrail แบบ vendor-neutral:** DWP หลัก **ไม่พึ่งพา** Dailybot เลย อย่าติดตั้งอัตโนมัติให้ทุกคน
- **เมื่อเสนอ:** นักพัฒนาหรือทีมใช้ Dailybot อยู่แล้ว หรือขอการรายงานทีมอย่างชัดเจน

### Dependency upgrade (addon ที่สาม)

การอัปเกรด dependency แบบไม่ผูก package manager แบ่ง batch ตรวจสอบ และย้อนกลับได้

- **หน้า kit:** [Dependency upgrade](/kit/dependency-upgrade)
- **สิ่งที่เพิ่ม:** ตรวจ manager **จริง** ของรีโพ (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …) อัปเกรดเป็น batch ตาม semver รัน validation gate ของรีโพหลังแต่ละ batch ย้อนเมื่อล้มเหลว สรุปโดยไม่ auto-commit
- **คำสั่ง:** ติดตั้ง `/lib-upgrade` ใน `.agents/commands/` เฉพาะเมื่อยอมรับ
- **เมื่อเสนอ:** มี lockfile และ stack หนัก dependency แนะนำเฉพาะเมื่อเกี่ยวข้อง

### Design system (addon ที่สี่)

`DESIGN.md` ขอบเขตพื้นผิวอินเทอร์เฟซที่ coding agent ใดๆ อ่านเพื่อ UI CLI หรือผลลัพธ์แบบสนทนาที่สอดคล้อง

- **หน้า kit:** [Design system](/kit/design-system)
- **สิ่งที่เพิ่ม:** `docs/DESIGN.md` (อ้างอิงจาก `AGENTS.md`) สูงสุดสาม **profile** ในไฟล์เดียว: **visual-ui** (โทเค็นและคอมโพเนนต์ UI ที่เรนเดอร์) **cli-output** (สไตล์เทอร์มินัลเชิงความหมาย การเสื่อม TTY/`NO_COLOR`) **conversational** (น้ำเสียง โครงสร้างข้อความ การเรนเดอร์ต่อแพลตฟอร์มพร้อม fallback ข้อความธรรมดา)
- **ความแรงของ profile:** visual-ui **เปิดโดยค่าเริ่มต้นเมื่อตรวจพบ** cli-output และ conversational **แนะนำเมื่อตรวจพบ ถามเสมอ ไม่ auto-apply**
- **เมื่อเสนอ:** เฉพาะเมื่อตรวจพบพื้นผิวอินเทอร์เฟซสำหรับผู้ใช้ — ไม่ใช่ไลบรารีล้วน บริการ headless หรือรีโพ infra เท่านั้น

## Skills

Skills เป็นขั้นตอนที่ใช้ซ้ำได้ เรียกด้วยชื่อ skill ห่อ workflow ที่ทำซ้ำได้ (รันเทสต์ แก้ lint สร้างคอมโพเนนต์)

วิธีการจัดส่ง sub-skill หลักชุดเล็ก ในบรรดานั้น sub-skill **author** ให้รีโพ **ขยาย kit ของตนเอง**: เรียกผ่าน `/skill-create` และ `/agent-create` ให้เหตุผลจาก layout `.agents/` และแบบแปลงที่มี แล้วเขียน skill เอเจนต์ หรือ command delegator บางๆ ที่ตรงกัน และซิงก์แคตตาล็อก sub-skill เดียวกันทำงาน Skills & Agents Discovery บังคับ

รายการ kit: [Skill create](/kit/skill-create), [Agent create](/kit/agent-create)

## Agents

Agents เป็นผู้ทำงานเฉพาะทางที่มีบทบาทชัด (reviewer, executor, architect) อยู่ภายใต้ `.agents/agents/` และอยู่ในแคตตาล็อกที่ `.agents/docs/`

## Addon บำรุงรักษา

addon **dependency-upgrade** (ด้านบน) เป็น addon บำรุงรักษาหลัก ให้เหตุผลจาก package manager จริงของรีโพแทนการสมมติ npm จัดประเภทอัปเกรดตาม semver อัปเกรดเป็น batch ปลอดภัย รันการตรวจสอบหลังแต่ละ batch และย้อน batch ที่ล้มเหลว

## Addon design-system

ดู [Design system](/kit/design-system) ภายใต้ addon ที่จัดส่ง `DESIGN.md` ระดับรีโพต่างจากเอกสารออกแบบเทคนิคต่อฟีเจอร์: README แผน DWP เกณฑ์การยอมรับงาน และ validation gate ครอบคลุมการออกแบบต่อฟีเจอร์อยู่แล้ว addon design-system เติมบริบทการออกแบบ **อินเทอร์เฟซ** ถาวรแบบ repo-native

## Presets

Presets ปรับ DWP ให้เข้ากับ tech stack เฉพาะ (Django, React, Go, Astro + Svelte และอื่นๆ) เรียกดู [แคตตาล็อก kit](/kit)

## Adapters

Adapters แมปคำสั่ง DWP ไปยังระบบคำสั่งของเอเจนต์เฉพาะ (Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw และอื่นๆ) รายการ adapter อยู่ใน kit ภายใต้ชื่อแต่ละเอเจนต์

## Examples

Examples แสดง DWP ในทางปฏิบัติ: เปรียบเทียบก่อน/หลัง แผนตัวอย่าง กรณีศึกษา ดู [Examples](/examples) และ [Dogfood this site](/kit/dogfood-this-site)

## การเตือนเรื่องการสอดคล้อง

รีโพ **ต้อง** สอดคล้องครบด้วย addon **ศูนย์** ตัว addon เป็นความสามารถ opt-in แบบชั้น — ไม่ใช่เงื่อนไขเบื้องต้น ดู [Conformance](/spec/conformance)
