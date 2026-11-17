---
title: วิศวกรรมลูป (loop engineering)
description: "ความหมายลูป v8: อำนาจที่บันทึกไว้ การทำงานต่อที่มนุษย์เริ่ม การสืบทอด การบล็อก คิว การแจ้งเตือน และการมองเห็น fleet พร้อมค่าเริ่มต้นของแต่ละฟิลด์"
order: 12
lang: th
section: วิศวกรรมลูป
---

# วิศวกรรมลูป (loop engineering)

หน้านี้กำหนดสัญญาแผนสำหรับ loop engineering โดย **แผน** เป็นแหล่งอำนาจ วงจรให้ความต่อเนื่องแต่ไม่ขยายอำนาจที่บันทึกไว้

## 1. กฎ v8
แผนที่อนุมัติทำงานจนจบโดยไม่รอมนุษย์ อิสระได้ **ภายในอำนาจที่บันทึกในแผน** มนุษย์ได้รับแจ้ง; การเข้าสู่ระบบ ข้อมูลรับรอง และ gate C1–C7 หยุดงานหากไม่มีการอนุญาตล่วงหน้า กฎ v7 ยังคงเดิม: วิธีหลักทำงานได้ลำพัง

### 1.1. ความหมายของวงจร
#### ลงทะเบียนและสังเกตการณ์
เมื่อเปิด Herdr ขั้นตอน `execute` ของ pack v8 จะบันทึก lead และผู้สืบทอด เฝ้าดูเฉพาะแผนที่มี lead และ state ที่อ่านได้ มนุษย์เริ่ม `herdr-peers autopilot --loop`; เป็น daemon ไม่ใช่รายการเริ่มระบบหรือบริการระบบ

#### ทำต่อและส่งต่อ
Daemon เตือนเฉพาะ lead เมื่อแผนเปิด, lead ว่าง/เสร็จห้านาที, ไม่มี lane ทำงานหรือรอคำตอบ, pane อยู่ในขอบเขตและไม่ถูกยกเว้น และไม่มีหน้าต่างโต้ตอบ/ล็อกอิน/จำกัดการใช้/ร่างข้อความ ข้อความคงที่ขอให้ทำจนจบตาม gate และอำนาจที่บันทึก ไม่เพิ่มอำนาจ สามครั้งโดย state ไม่คืบหน้าจะบันทึก `plan_stalled`; แผนถูกบล็อกเพียงรายงาน หาก lead หาย daemon ขอผู้สืบทอดคนแรกใช้ `herdr-peers lead takeover --plan <id>`; daemon ไม่เขียนบันทึกหรือเลือก pane นอกบัญชี ขีดจำกัดการใช้ไม่พิสูจน์การหายไป Protocol 2 อนุญาตแต่งตั้งเมื่อมนุษย์บันทึก `lead claim --allow-appointment` และเริ่ม daemon ด้วย `--appoint` เท่านั้น ก่อน merge/tag/release ให้ lead รัน `herdr-peers lead verify --plan <id>`

#### Brain เหตุการณ์และ fleet
`--brain` เลือกได้เฉพาะรายการการกระทำแบบปิด daemon เป็นผู้กระทำเพียงรายเดียวและไม่ใช้ข้อความอิสระ ต้องเปิดใน `autonomy` วงจรบันทึกเหตุการณ์; `--notify` ส่ง `plan-event-v1` ไป notifier และ Dailybot ส่งเหตุการณ์ที่รองรับให้ทีม การแจ้งไม่ใช่การอนุมัติ แผนที่ fleet และ `herdr-peers fleet ui` อ่านอย่างเดียว ดู [autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.2.0/skills/herdr-peers/autopilot.md) และ [protocol](https://github.com/DailybotHQ/herdr-peers/blob/v2.2.0/skills/herdr-peers/protocol.md)

## 2. บล็อก `autonomy`
วัตถุปิด; ชื่อ/ชนิดมาตรฐานอยู่ใน [schema plan-contract/v8](https://deepworkplan.com/schema/plan-contract/v8.json) หากไม่มีบล็อกใช้ค่าเริ่มต้น

| ฟิลด์ | ชนิด/ค่า | ค่าเริ่มต้น |
|---|---|---|
| `stall_budget` | จำนวนเต็ม 1–10 | `3` |
| `promptable` | รายการที่อยู่ pane Herdr | lead เท่านั้น |
| `notify` | รายการเป้าหมายที่ไม่ว่าง | ไม่มีเป้าหมาย แต่บันทึกเหตุการณ์ |
| `brain` | boolean | `false` |
| `queue` | `prompt-lead`, `launch`, `none` | `none` |

รูปแบบ pane: `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`; machine ID ห้ามขึ้นต้น `-`. ฟิลด์จำกัดผู้รับและการทำงาน ไม่เปลี่ยนเกณฑ์หรือ gate

## 3. ตัวบล็อกแบบมีโครงสร้าง

แผน v8 บันทึกเหตุผลที่ทำต่อไม่ได้เป็นข้อมูล เพื่อให้ลูป ฟลีต และเอเจนต์ที่กลับมาทำงานอ่านฟิลด์เดียวกัน

### 3.1. ระเบียนตัวบล็อก

ledger ใช้ `ledger.py block` เพื่อเปิดและ `ledger.py unblock` เพื่อแก้ไข โดยบันทึกเหตุการณ์ `blocker` ใน `journal-event/v8`; ปฏิเสธการเพิ่มโดยตรงและบันทึกทุกการปฏิเสธ

| ฟิลด์ | กฎ |
|---|---|
| `task` | งานที่ถูกบล็อกใน contract; ห้ามบล็อกงานที่หลักฐานปิดแล้ว |
| `reason` | จำเป็น ไม่ว่าง ไม่เกิน 1000 ตัวอักษร: เหตุผล |
| `needs` | จำเป็น หนึ่งบรรทัดไม่ว่างเท่านั้น ไม่เกิน 500 ตัวอักษร: สิ่งที่ต้องมีเพื่อทำต่อ |
| `class` | จำเป็น เป็น `C1`–`C7` จาก [`AGENT_PROTOCOL.md`](AGENT_PROTOCOL.md) §7.5 |
| `resolver` | ไม่บังคับ `lead` หรือ `human`; หากไม่มีคือ `human` |

`lead` แก้ได้ในอำนาจที่บันทึกโดยไม่ใช้ข้อมูลรับรอง ล็อกอิน ความยินยอม ชำระเงิน push ไป main เผยแพร่ หรือลบ ต้องปฏิเสธ `resolver: "lead"` สำหรับ `C1`, `C2`, `C5`, `C6` มีตัวบล็อกทำงานอยู่ได้หนึ่งรายการต่อแผน รายการใหม่ถูกปฏิเสธจนกว่ารายการเดิมแก้แล้ว เปิดซ้ำงานเดิมอัปเดตฟิลด์ได้แต่คง `since` แรก การแก้มีเพียงงานและหมายเหตุที่ไม่บังคับ งานที่ยังถูกบล็อกทำให้เสร็จไม่ได้ หลักฐานใหม่ก็ไม่ปิดงาน

### 3.2. ตำแหน่งที่อ่านข้อมูล

`state.json` ใช้ `plan-snapshot/v8`: รูปแบบ `plan-snapshot/v6`, `blocker` เป็น `{task, reason, since, needs, class, resolver?}` หรือ `null` และ `blocked` เป็นสถานะงานที่ได้มาและมีลำดับก่อนขณะยังไม่แก้ Ledger ฉายข้อมูล ห้ามเขียนเอง

`PROGRESS.md` ควรเริ่มด้วยสี่บรรทัดคงที่ใต้ชื่อเรื่อง create เขียนและปรับทุกครั้งที่เปลี่ยนสถานะ (`shared/progress_header.py`):

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

`Current task` และ `Needs` มาจาก snapshot (งานที่ถูกบล็อกก่อน มิฉะนั้นงานแรกที่ยังไม่เสร็จ) เอเจนต์เขียน `Goal` และ `Next action`

### 3.3. สิ่งที่วงจรทำได้

วงจร รวม brain ขอ lead แก้ได้เฉพาะตัวบล็อกที่ระบุ `resolver: "lead"` อื่นต้องรอมนุษย์ แผน v6/v7 ไม่บันทึก `blocker` คง `plan-snapshot/v6` (`blocker` เป็น `null` เสมอ); ตัวบล็อกเป็นเรื่องของมนุษย์
## 4. คิวแผน
`.dwp/queue.json` ใช้ `dwp-queue-v1`; มีเพียง pack เขียน `create` เพิ่มเมื่ออนุมัติ มนุษย์/lead จัดลำดับ `execute` ใส่ `started` เมื่อรับ lead พร้อมที่อยู่ จบแล้ว `done`; `create`/`refine` ทำ `skipped` พร้อมบันทึกสั้นได้ มี `after` เป็น dependency ทางเลือก หากไม่มี `parallel: true` จะทำทีละแผน daemon อ่านอย่างจำกัด; คิวผิดถือว่าว่าง `prompt-lead` ส่งข้อความคงที่ “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” daemon ไม่เขียนคิวหรือทำ `launch` หากสัญญาที่เผยแพร่ไม่อนุญาต

## 5. สิ่งที่ v8 คงไว้

v8 คงเนื้อหาทั้งหมดของ v7 รวม `tasks[].parallel_safe` การมอบหมาย และชุดเหตุการณ์ครบถ้วน ฟีเจอร์ v7 ยังใช้ได้ต่อไป v8 บันทึกชุดเหตุการณ์ v7 บวก `blocker` ใน `journal-event/v8` และฉายเป็น `plan-snapshot/v8`; ปฏิเสธ journal ที่ปะปนรุ่น `plan-manifest/v7` คงรูปแบบและ pointer; ตัวตรวจสอบจับคู่ manifest v7 กับ contract v8 บันทึก v6/v7 คงเดิมทุกไบต์
