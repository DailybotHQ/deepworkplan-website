---
title: สถานะแผน
description: "ชั้นสถานะแผนที่เครื่องอ่านได้: manifest.json และ state.json บันทึก gate บันทึกผลลัพธ์ในฐานะหน่วยความจำเชิงลำดับเหตุการณ์ การปรับประสานงาน และเมื่อใดที่จำเป็น"
order: 7
lang: th
section: State
---

# สถานะแผน

**เวอร์ชัน 1.0. สถานะ: เสถียร** เอกสารนี้ระบุชั้นสถานะแผนที่เครื่องอ่านได้ของระเบียบวิธี Deep Work Plan คำสำคัญ MUST, MUST NOT, SHOULD, SHOULD NOT และ MAY ให้ตีความตามที่อธิบายไว้ใน RFC 2119

สิ่งประดิษฐ์ JSON สองชิ้น — `manifest.json` (เอกลักษณ์คงที่ของแผน) และ `state.json` (สถานะการดำเนินงานต่อหนึ่งงานแบบสด รวมถึงผลลัพธ์ validation gate) — ที่ทุกแผน MAY พกไว้ร่วมกับไฟล์ markdown และที่การดำเนินงานแบบไม่มีผู้ดูแล (ดู [โปรโตคอลของเอเจนต์](/spec/agent-protocol#execution-profiles)) และ workspace ที่ไม่มี git (ดู [Archetype](/spec/archetypes) §3) MUST พก

แผน markdown ยังคงเป็น **แหล่งความจริงที่มนุษย์อ่านได้** ชั้น JSON เป็น **การฉายภาพที่ได้รับมา**: มันถูกสร้างใหม่โดยเอเจนต์ที่จุดโปรโตคอลที่กำหนด ไม่เคยถูกแก้ไขด้วยมือ และไม่เคยถูกปล่อยให้ขัดแย้งกับ markdown อย่างเงียบ ๆ จุดประสงค์ของมันคือความสามารถในการทำงานร่วมกัน — การ lint การตรวจสอบความสอดคล้อง การ diff การแสดงผล การค้นพบ registry และการซิงโครไนซ์กับโครงสร้างพื้นฐาน session ภายนอก — ไม่มีสิ่งใดที่สามารถสร้างได้อย่างน่าเชื่อถือบนข้อความธรรมดา

## เหตุผลที่มีอยู่

จนถึง v1.1 แผนเป็นเพียง markdown ธรรมดา นั่นทำให้มันตรวจสอบได้และไม่ขึ้นกับเอเจนต์ แต่ไม่มีสิ่งใดที่เครื่องมือจะตรวจสอบ diff หรือใช้งานได้: ไม่มี gate ความสอดคล้อง ไม่มีการตรวจจับการเบี่ยงเบนระหว่าง `README.md` และ `PROGRESS.md` ไม่มีทางที่ daemon หรือ cloud session จะรู้สถานะของแผนโดยไม่ต้องแยกวิเคราะห์ข้อความธรรมดา v1.2 เพิ่มการฉายภาพ JSON โดยไม่ลดความสำคัญของ markdown — การฉายภาพได้รับมาจาก markdown ในลักษณะเดียวกับที่ lockfile ได้รับมาจาก manifest

## การจัดวาง

แผนที่ใช้ชั้นสถานะมีโครงร่างนี้

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← แหล่งความจริงของมนุษย์ (ไม่เปลี่ยนแปลง)
├── PROGRESS.md          ← log เชิงบรรยาย (ไม่เปลี่ยนแปลง)
├── PROMPTS.md           ← ไม่เปลี่ยนแปลง
├── manifest.json        ← เอกลักษณ์คงที่ (เขียนตอน materialization)
├── state.json           ← สถานะสด (เขียนใหม่ที่จุดโปรโตคอล)
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json` MUST ถูกเขียนหนึ่งครั้งเท่านั้น เมื่อ flow `create` ทำให้แผนเป็นรูปธรรม และ MUST NOT เปลี่ยนแปลงหลังจากนั้น ยกเว้นการย้ายเวอร์ชัน spec ที่บันทึกไว้ใน `PROGRESS.md`

`state.json` MUST ถูกเขียนใหม่โดยเอเจนต์ที่แต่ละจุดโปรโตคอลเหล่านี้: plan materialization (งานทั้งหมดเป็น `pending`), การเริ่มงาน (`in_progress`), แต่ละการรัน validation gate (บันทึก gate ถูกเพิ่มหรืออัปเดต) และการเสร็จสิ้นงาน (`completed` ซึ่งเป็นส่วนหนึ่งของโปรโตคอลการเสร็จสิ้นงานใน [ข้อกำหนด DWP](/spec/dwp-specification#task-completion-protocol))

ไฟล์ทั้งสองชิ้น MUST ถูกเขียนแบบ atomic: เขียนไปยังไฟล์ชั่วคราวในไดเรกทอรีเดียวกัน แล้วเปลี่ยนชื่อทับไฟล์เป้าหมาย การเขียนที่ขัดจังหวะ MUST NOT ทิ้งไฟล์ JSON ที่ตัดทอนไว้

## เมื่อใดที่ชั้นนี้จำเป็น

- สำหรับการดำเนินงาน**แบบโต้ตอบ**ใน git repository ชั้นสถานะ RECOMMENDED สำหรับแผนใหม่และ OPTIONAL สำหรับแผนก่อน v1.2 แผนที่ไม่มีมันยังคงสอดคล้อง
- สำหรับการดำเนินงาน**แบบไม่มีผู้ดูแล** ชั้นสถานะ REQUIRED
- ใน**agent workspace**ที่ไม่มี git ชั้นสถานะ REQUIRED: `state.json` พกข้อมูลการกู้คืนที่ git log พกใน repository

## `manifest.json` — เอกลักษณ์แผน

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v1.json",
  "spec_version": "2.2.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at` และ `task_count` REQUIRED

`archetype` MUST เป็นหนึ่งใน `individual`, `orchestrator-hub`, `agent-workspace`

`rigor` MUST เป็นหนึ่งใน `micro`, `standard`, `deep` (ดู [ความเข้มงวดตามสัดส่วน](/spec/dwp-specification#proportional-rigor))

`parent_plan` เชื่อมแผนลูกกับแผน orchestrator ของมัน (`{repo}:{plan_name}` หรือ `null`)

`created_by` SHOULD ระบุเอเจนต์และโมเดลที่สร้าง มัน MUST NOT ประกอบด้วยความลับ token หรือตัวระบุผู้ใช้นอกเหนือจากชื่อที่แสดง

## `state.json` — สถานะการดำเนินงานสด

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v1.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "tasks": [
    {
      "id": 1,
      "file": "1.task_webhook_endpoint.md",
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "file": "3.task_retry_queue.md",
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

### รายการงาน

ไฟล์งานทุกไฟล์ในแผน MUST มีรายการหนึ่งรายการใน `tasks` โดยระบุด้วยหมายเลข (`id`) และชื่อไฟล์ (`file`)

`status` MUST เป็นหนึ่งใน `pending`, `in_progress`, `completed`, `blocked`, `skipped` `skipped` ใช้ได้เฉพาะเมื่อผู้ใช้ลบงานออกจากขอบเขตอย่างชัดเจนผ่าน `refine` เท่านั้น `state.json` MUST NOT ถูกใช้เพื่อข้ามงานอย่างเงียบ ๆ

รายการ `completed` MUST พก `completed_at` และในที่ที่แผน commit hash สั้น `commit` — นี่คือลิงก์การติดตามจากแผนไปยังโค้ด

### บันทึก gate

การรันแต่ละครั้งของคำสั่งตรวจสอบ SHOULD ถูกบันทึกเป็นบันทึก gate: `command`, `passes` (boolean), `exit_code`, `last_run` และสตริง `evidence` สั้นที่มนุษย์อ่านได้ (บรรทัดสรุปหรือพาธใต้ `analysis_results/` ไม่ใช่ output คำสั่งเต็ม)

งาน MUST NOT ถูกทำเครื่องหมายว่า `completed` ใน `state.json` ขณะที่บันทึก gate ใดของมันมี `passes: false` และไม่มีการรันที่ผ่านในภายหลัง บันทึก gate คือสิ่งเทียบเท่าเครื่องจักรของ "อย่าทำเครื่องหมายว่าเสร็จโดยไม่มีหลักฐาน" — รูปแบบของ flag `passes` ต่อหนึ่งรายการที่ป้องกันการสำเร็จก่อนเวลา

### บันทึกผลลัพธ์ในฐานะหน่วยความจำเชิงลำดับเหตุการณ์

งานที่ `completed` SHOULD พกบันทึก `outcome`: สิ่งที่ `tried` สิ่งที่ `failed` สิ่งที่ `worked` และ `notes` รูปแบบอิสระ รักษาแต่ละรายการไว้หนึ่งบรรทัด

บันทึกผลลัพธ์ทำให้แผนที่เสร็จแล้วเป็น**หน่วยความจำเชิงลำดับเหตุการณ์**ที่ค้นคืนได้: เอเจนต์ (หรือแพลตฟอร์มจัดทำดัชนีหน่วยความจำ) สามารถค้นคืนได้ในภายหลังว่าปัญหาถูกแก้ไขอย่างไร ไม่ใช่แค่ว่ามันถูกแก้ไขแล้ว มันป้อนข้อมูลให้กับงาน Skills & Agents Discovery ที่บังคับ ซึ่ง SHOULD อ่านมันเมื่อขุดค้นรูปแบบ บนแพลตฟอร์มอย่าง Hermes ที่จัดทำดัชนีหน่วยความจำของเอเจนต์ บันทึกผลลัพธ์ใน `state.json` ทำให้แผนที่เสร็จแล้วค้นคืนได้โดยตรงข้ามเซสชันในอนาคต

### สถานะ checkpoint และ blocked

`checkpoint` บันทึกจุด resume ที่ละเอียดที่สุดภายในงานปัจจุบัน: `id` ของงาน ตัวระบุ `step` แบบอิสระ timestamp และหมายเหตุหนึ่งบรรทัด เอเจนต์ SHOULD อัปเดตมันทุกครั้งที่หยุดชั่วคราวภายในงาน มัน MUST อัปเดตก่อนการหยุดพักที่วางแผนไว้ในโหมดไม่มีผู้ดูแล

`blocked` เป็น `null` หรือ `{ "task": N, "reason": "...", "since": "...", "needs": "..." }` เอเจนต์ไม่มีผู้ดูแลที่ถึงเงื่อนไขหยุด MUST เติม `blocked` ก่อนหยุด — นี่คือวิธีที่ heartbeat ครั้งถัดไปของ daemon หรือมนุษย์ รู้ว่าทำไมแผนถึงหยุด

## การฉายภาพและการปรับประสานงาน

markdown MUST ชนะทุกข้อขัดแย้ง ถ้า `state.json` บอกว่างาน 4 เป็น `completed` แต่ README ของแผนแสดง checkbox ที่ยังไม่ได้ทำเครื่องหมาย ไฟล์สถานะนั้นล้าสมัย

เอเจนต์ที่กำลัง resume MUST เปรียบเทียบรายการ checkbox ของ README กับ `state.json` ก่อนดำเนินการต่อ เมื่อเบี่ยงเบน มัน MUST สร้าง `state.json` ใหม่จาก markdown (และ git log ในกรณีที่มี) บันทึกการปรับประสานงานใน `PROGRESS.md` แล้วจึงดำเนินการต่อ

sub-skill `verify` MUST ถือว่าการเบี่ยงเบนเป็นผลการตรวจสอบความสอดคล้อง: รายงานว่างานใดไม่ตรงกันและในทิศทางใด

เครื่องมืออื่นที่ไม่ใช่เอเจนต์ที่กำลังดำเนินงาน MUST ถือว่าไฟล์ JSON ทั้งสองชิ้นเป็นแบบอ่านอย่างเดียว

## การกำหนดเวอร์ชัน schema

ทั้งสอง schema มีเวอร์ชันตาม URL (`/v1.json`) ฟิลด์เพิ่มเติมได้รับอนุญาตภายในเวอร์ชัน การเปลี่ยนชื่อหรือเปลี่ยนประเภทฟิลด์ต้องใช้ `/v2.json` และหมายเหตุการย้ายใน changelog ของ spec ฟิลด์ `spec_version` ใน manifest ปักหมุดเวอร์ชัน DWP spec ที่แผนถูกสร้างขึ้น เอเจนต์ที่พบแผนที่ใหม่กว่า spec ที่ติดตั้งอยู่ SHOULD บอกเช่นนั้นแทนที่จะเดา
