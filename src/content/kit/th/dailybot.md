---
title: Dailybot
description: "DWP addon แบบ opt-in: เชื่อม lifecycle ของแผนกับทีม Dailybot การบังคับใช้ hook แบบเลือกได้ และ Dailybot agent skill 3.10.3 ครบชุด (แชท check-in ฟอร์ม Ask AI และอื่นๆ)"
kind: addon
lang: th
order: 2
---

# Dailybot addon

เชื่อมการดำเนินการ Deep Work Plan กับ **ทีม Dailybot** เพื่อให้มนุษย์เห็นว่าเอเจนต์กำลังสร้างอะไร — kickoff ความคืบหน้าระหว่างแผน ตัวบล็อก และการเสร็จสิ้น — โดยไม่ต้องเพิ่มการประชุมหรือ toolchain ที่สอง **Opt-in** addon สำหรับทีมที่ใช้ [Dailybot](https://www.dailybot.com) อยู่แล้ว

วิธีการหลักของ Deep Work Plan **ไม่พึ่งพา** Dailybot เลย รีโพที่มี addon ศูนย์ตัวก็สอดคล้องมาตรฐานครบ ให้ addon นี้เฉพาะเมื่อนักพัฒนาหรือทีมใช้ Dailybot อยู่แล้ว อย่าติดตั้งอัตโนมัติให้ทุกคน

## เมื่อไหร่ควรใช้

| สัญญาณ | การดำเนินการ |
|--------|--------|
| ทีมใช้ Dailybot อยู่แล้ว (Slack, Teams, Discord, Google Chat หรือแดชบอร์ด) | **แนะนำ** ระหว่าง onboarding |
| นักพัฒนาขอการมองเห็นความคืบหน้าของเอเจนต์หรืออัปเดตแบบ standup | **เสนอ** addon |
| รีโพ greenfield ไม่มีบัญชี Dailybot | **ข้าม** — baseline ที่เป็นกลางเพียงพอ |
| งานลูกค้าภายใต้ NDA ที่ความคืบหน้าต้องไม่ออกจากรีโพ | **ข้าม** หรือ commit `.dailybot/disabled` เป็น kill-switch ในเครื่อง |

## สิ่งที่ addon นี้เชื่อม (ออกแบบให้แคบโดยเจตนา)

DWP Dailybot addon **ไม่สร้าง** Dailybot ใหม่ มันเชื่อมการดำเนินแผนกับ sub-skill dailybot **`report`** และอาจ commit hook ของ harness ส่วนอื่น — การติดตั้ง ความยินยอม authentication สไตล์การเขียน — **มอบหมาย** ให้ [Dailybot agent skill](https://github.com/DailybotHQ/agent-skill) อย่างเป็นทางการ (ปัจจุบัน **3.10.3**)

### สี่เหตุการณ์ lifecycle

ระหว่าง DWP `create` / `execute` addon เชื่อม **สี่อัปเดตเอเจนต์แบบ best-effort** ทุกเหตุการณ์มีเงื่อนไข (Dailybot พร้อมและ authenticated) ไม่บล็อกงาน และเคารพ `.dailybot/disabled`

| เหตุการณ์ | ทริกเกอร์ | ระดับ | ข้อกำหนด |
|-------|---------|-------|-------------|
| **Kickoff** | แผน materialized และอนุมัติ หรือเทิร์น `execute` แรก | regular | SHOULD |
| **Significant task** | ฟีเจอร์ แก้บั๊ก หรือ refactor ใหญ่เสร็จ — ไม่ใช่งาน setup | regular | MAY |
| **Blocked** | แผนหยุด; `state.json.blocked` ถูกเติม (`reason`, `needs`) | regular + blockers | SHOULD |
| **Completion** | งานทั้งหมดเสร็จ แผนจบ | **milestone** | SHOULD |

Payload มาจากชั้น state ของแผน (`state.json`) เมื่อมี: `completed` เป็นผลลัพธ์ (ไม่ใช่หมายเลขงาน) `in_progress` จากงานปัจจุบัน `blockers` จาก `state.json.blocked` ข้อความอธิบาย **สิ่งที่สร้างและทำไม** — ไม่มี path ไฟล์ git stats ชื่อ branch หรือ ID แผน

### การบังคับใช้ hook แบบเลือกได้

ด้วย `dailybot-cli >= 3.7.0` addon **อาจ** commit hook ของ harness ระดับรีโพ (`dailybot hook session-start | activity | post-commit | stop | dismiss`) สนับสนุนโดย ledger ต่อรีโพในเครื่อง Harness เตือนเอเจนต์ปลายเทิร์นเมื่อพลาดเหตุการณ์ lifecycle — สำคัญสำหรับเซสชันยาวที่ไม่มีคนดูแล ซึ่งคำสั่งใน prompt จางลง

รายงาน lifecycle สำเร็จ **รีเซ็ต** ledger ของ hook ดังนั้นสองชั้นไม่รายงานซ้ำ คำสั่ง hook อ่านเฉพาะ state ในเครื่องและจบด้วย `0` เสมอ

### ตัวตนรีโพและนโยบายรายงาน

อาจ commit `.dailybot/profile.json` (หรือ `.dailybot_example/profile.json` เป็นเทมเพลต) เพื่อให้ผู้มีส่วนร่วมและเอเจนต์ลงชื่อรายงานแบบเดียวกัน **อย่า** ใส่ credentials ในไฟล์นั้น — ฟิลด์ `key` เป็นข้อผิดพลาดรุนแรง

ไฟล์เดียวกันอาจมีนโยบายรายงานที่ hook เคารพ:

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` มีประโยชน์เป็นพิเศษสำหรับรีโพที่เน้น research หรือ docs: งานที่ไม่ commit (การวิเคราะห์ เอกสารออกแบบ แผน) จะถูก nudge เร็วขึ้น

## การติดตั้ง (ทั้งหมด opt-in)

Addon **เสนอ** เส้นทางติดตั้ง skill Dailybot เป็นเจ้าของความยินยอมและการตรวจสอบ

| ส่วนประกอบ | คำสั่ง / path |
|-----------|----------------|
| **Dailybot agent skill** (แนะนำ) | `npx skills add DailybotHQ/agent-skill` |
| **อัปเดต skill ที่มี** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git clone** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI** (ขั้นต่ำ `>= 3.7.0`) | ติดตั้งโดย skill ครั้งแรกผ่าน `shared/auth.md`; หรือ `pip install 'dailybot-cli>=3.7.0'` Homebrew หรือ installer ที่ตรวจ checksum ที่ [cli.dailybot.com](https://cli.dailybot.com) |

ตรวจเวอร์ชัน: `dailybot --version` และ `dailybot version --check` อัปเกรด: `dailybot upgrade`

## Authentication — มอบหมาย

Addon นี้ **ไม่** ถาม email OTP หรือ API keys และ **ไม่** เก็บ credentials Authentication เป็นของ skill Dailybot [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md):

- `dailybot login` (email OTP) หรือ
- `DAILYBOT_API_KEY` / `dailybot config key=...` หรือ
- ไฟล์คีย์ต่อรีโพ `.dailybot/env.json` แบบ opt-in ที่ถูก gitignore (`dailybot env add/use`, CLI `>= 3.7.0`) เพื่อให้นักพัฒนาลงชื่อเข้าใช้ org ต่างกันในรีโพต่างกันได้

การแก้ปัญหา auth เป็นแบบ **Bearer-first**: session token มีความสำคัญก่อน พร้อม retry แบบโปร่งใสจาก Bearer→API-key เมื่อเจอ `401`/`403` เพื่อไม่ให้ token ที่หมดอายุบล็อกคีย์ที่ใช้ได้ หาก auth ถูกปฏิเสธหรือไม่พร้อม การรายงานจะข้ามเงียบๆ — งานดำเนินต่อ

## Dailybot skill คู่กัน — 14 ความสามารถ (3.10.3)

การติดตั้ง Dailybot agent skill ได้มากกว่าที่ DWP addon เชื่อม ชุด skill อย่างเป็นทางการ (skill **3.10.3** CLI baseline **>= 3.7.0** publish ปัจจุบัน **3.7.3**) เปิด **14 sub-skill ที่ประสานกัน**:

| Sub-skill | ทำอะไร |
|-----------|--------------|
| **Progress reports** | อัปเดตเอเจนต์แบบ standup บนแดชบอร์ด Dailybot |
| **Ask the AI** | คิวรี one-shot แบบ headless ไปยังผู้ช่วย AI ของ Dailybot |
| **Message polling** | ตรวจคำสั่งจากทีมตอนเริ่มเซสชันหรือเมื่อ idle |
| **Email** | ส่งอีเมลพร้อมการตรวจความปลอดภัยก่อนส่งบังคับ |
| **Chat** | ส่งหรือแก้ไขบน Slack Microsoft Teams Discord หรือ Google Chat — ช่อง DM ทีม thread แบบรายงาน send-as-user (Slack, admin) |
| **Conversations** | เปิดหรือใช้ Slack group DM กับบอทและเพื่อนร่วมทีมที่ระบุ โพสต์รายงานในคำสั่งเดียวกัน |
| **Health and status** | ประกาศเอเจนต์ online/offline สำหรับเซสชันยาว |
| **Check-ins** | ทำ standup เสร็จ; **เขียน** check-in (ตาราง ผู้เข้าร่วม คำถาม การเตือน การตั้งค่า AI) |
| **Kudos** | ยกย่องเพื่อนร่วมทีมหรือทั้งทีม; เรียกดู recognition feed org feed wall of fame |
| **Teams** | แสดงรายการทีม ตรวจสมาชิก แปลงชื่อเป็น UUID; `me`, `org`, โปรไฟล์ผู้ใช้ |
| **Forms** | แสดงรายการ (ตอนนี้ **org-scoped** โดยค่าเริ่มต้น พร้อม `--mine` และ `--owner` เพื่อจำกัด) submit อัปเดต transition ฟอร์ม; **เขียน** ฟอร์ม (สถานะ workflow สิทธิ์ ChatOps); pagination การค้นหา และตัวกรองวันที่ |
| **Workflows** | อ่าน org workflows (`workflow list` / `workflow get`; read-only) |
| **Report channels** | ค้นหา UUID ช่องสำหรับฟอร์มหรือ check-in |
| **Per-repo API keys** | จัดการ `.dailybot/env.json` — ไฟล์ opt-in ที่ถูก gitignore ของ API key + URL ต่อ environment (`dailybot env add / use / show / list / remove / off / on`, CLI `>= 3.7.0`) |

**DWP addon เชื่อมเฉพาะ `report` เข้ากับการดำเนินแผน** เรียก skill Dailybot โดยตรงสำหรับอย่างอื่น — เช่น โพสต์สรุป deploy ไป `#releases` ทำ standup หรือขอให้ AI Dailybot สรุปแนวโน้ม check-in

อ้างอิงสาธารณะ: [dailybot.com/skill.md](https://www.dailybot.com/skill.md) ซอร์ส: [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) โมเดลความไว้วางใจ: [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md) ในชุด skill

## พฤติกรรม — มอบหมาย อย่าบล็อก

| กฎ | รายละเอียด |
|------|--------|
| **มอบหมาย** | Skill Dailybot เป็นเจ้าของการติดตั้ง ความยินยอม auth เทมเพลต hook สไตล์การเขียน |
| **อย่าบล็อก** | ไม่มี CLI auth ล้มเหลว ข้อผิดพลาดเครือข่าย → เตือนครั้งเดียว ทำงานหลักต่อ |
| **ไม่ retry** | อย่าเข้าลูปวินิจฉัย การรายงานเป็น best-effort |
| **กระทบกัน** | skill CLI profile hook หรือ wiring รายงานที่มีอยู่ถูกเก็บ — เติมเฉพาะช่องว่าง |
| **Vendor-neutral** | DWP ไม่ต้องการ Dailybot addon นี้เป็นการมองเห็นทีมแบบเสริม |

## ขั้นตอน onboarding

ระหว่าง DWP `onboard` ใน **Phase 7b** หลัง scaffolding AI-first หลัก ขั้นตอนเสนอห้า addon แบบ opt-in หากนักพัฒนายอมรับ Dailybot:

1. ตรวจการตั้งค่าที่มี (skill, CLI, `.dailybot/profile.json`, hook, ขั้นตอนรายงาน)
2. เสนอติดตั้ง skill/CLI ผ่านขั้นตอนความยินยอมของ Dailybot
3. มอบหมาย authentication ให้ `shared/auth.md`
4. เชื่อมสี่เหตุการณ์ lifecycle เข้า `AGENTS.md` / `docs/AI_AGENT_COLLAB.md`
5. อาจเสนอการบังคับใช้ hook และ `.dailybot/profile.json`
6. รันการตรวจสอบ (SPEC §8 ใน `addons/dailybot/SPEC.md` ของ skill)

สัญญา normative ใน skill Deep Work Plan: `addons/dailybot/SPEC.md` (เวอร์ชัน **2.3.0**)

## รายการ kit ที่เกี่ยวข้อง

- [Devcontainer](/kit/devcontainer) — สภาพแวดล้อม dev ที่ทำซ้ำได้พร้อม persistence ของ Dailybot CLI (addon แรก)
- [Dependency upgrade](/kit/dependency-upgrade) — อัปเกรด dependency แบบ batch และตรวจสอบ (addon ที่สาม)
- [Design system](/kit/design-system) — `DESIGN.md` สำหรับเอเจนต์บนพื้นผิวอินเทอร์เฟซ (addon ที่สี่)
- [Deep Work Plan onboard](/kit/deepworkplan-onboard) — sub-skill onboarding ที่เสนอ addon
