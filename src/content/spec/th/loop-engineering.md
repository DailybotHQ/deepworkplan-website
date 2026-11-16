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
### ลงทะเบียนและสังเกตการณ์
เมื่อเปิด Herdr ขั้นตอน `execute` ของ pack v8 จะบันทึก lead และผู้สืบทอด เฝ้าดูเฉพาะแผนที่มี lead และ state ที่อ่านได้ มนุษย์เริ่ม `herdr-peers autopilot --loop`; เป็น daemon ไม่ใช่รายการเริ่มระบบหรือบริการระบบ

### ทำต่อและส่งต่อ
Daemon เตือนเฉพาะ lead เมื่อแผนเปิด, lead ว่าง/เสร็จห้านาที, ไม่มี lane ทำงานหรือรอคำตอบ, pane อยู่ในขอบเขตและไม่ถูกยกเว้น และไม่มีหน้าต่างโต้ตอบ/ล็อกอิน/จำกัดการใช้/ร่างข้อความ ข้อความคงที่ขอให้ทำจนจบตาม gate และอำนาจที่บันทึก ไม่เพิ่มอำนาจ สามครั้งโดย state ไม่คืบหน้าจะบันทึก `plan_stalled`; แผนถูกบล็อกเพียงรายงาน หาก lead หาย daemon ขอผู้สืบทอดคนแรกใช้ `herdr-peers lead takeover --plan <id>`; daemon ไม่เขียนบันทึกหรือเลือก pane นอกบัญชี ขีดจำกัดการใช้ไม่พิสูจน์การหายไป Protocol 2 อนุญาตแต่งตั้งเมื่อมนุษย์บันทึก `lead claim --allow-appointment` และเริ่ม daemon ด้วย `--appoint` เท่านั้น ก่อน merge/tag/release ให้ lead รัน `herdr-peers lead verify --plan <id>`

### Brain เหตุการณ์และ fleet
`--brain` เลือกได้เฉพาะรายการการกระทำแบบปิด daemon เป็นผู้กระทำเพียงรายเดียวและไม่ใช้ข้อความอิสระ ต้องเปิดใน `autonomy` วงจรบันทึกเหตุการณ์; `--notify` ส่ง `plan-event-v1` ไป notifier และ Dailybot ส่งเหตุการณ์ที่รองรับให้ทีม การแจ้งไม่ใช่การอนุมัติ แผนที่ fleet และ `herdr-peers fleet ui` อ่านอย่างเดียว ดู [autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/autopilot.md) และ [protocol](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/protocol.md)

## 2. บล็อก `autonomy`
วัตถุปิด; ชื่อ/ชนิดมาตรฐานอยู่ใน [schema plan-contract/v8](https://deepworkplan.com/schema/plan-contract/v8.json) หากไม่มีบล็อกใช้ค่าเริ่มต้น

| ฟิลด์ | ชนิด/ค่า | ค่าเริ่มต้น |
|---|---|---|
| `stall_budget` | จำนวนเต็ม 1–10 | `3` |
| `promptable` | รายการที่อยู่ pane Herdr | lead เท่านั้น |
| `notify` | รายการ; `dailybot` | ไม่มีเป้าหมาย แต่บันทึกเหตุการณ์ |
| `brain` | boolean | `false` |
| `queue` | `prompt-lead`, `launch`, `none` | `none` |

รูปแบบ pane: `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`; machine ID ห้ามขึ้นต้น `-`. ฟิลด์จำกัดผู้รับและการทำงาน ไม่เปลี่ยนเกณฑ์หรือ gate

## 3. ตัวบล็อกแบบมีโครงสร้าง
### 3.1. ระเบียนตัวบล็อก
`blocked`/`blocker` ใน `state.json` มีคลาส C และ `resolver` (`lead`/`human`, ค่าเริ่มต้น `human`). `lead` หมายถึงแก้ได้ภายในอำนาจที่บันทึก โดยไม่ใช้ข้อมูลรับรอง ล็อกอิน ความยินยอม จ่ายเงิน push ไป main, release หรือลบ วงจรขอให้ lead จัดการเฉพาะตัวบล็อก `lead`; อื่นแจ้งมนุษย์ แผนที่ Herdr อาจแสดง `PROGRESS.md` ที่ทำความสะอาดแล้วสูงสุด 14 บรรทัด เป็นสรุป ไม่ใช่ schema header เครื่อง รูปแบบที่วางแผนต้องตรวจที่ tag 8.0.0
### 3.2. ตำแหน่งที่อ่านข้อมูล

### 3.3. สิ่งที่วงจรทำได้
## 4. คิวแผน
`.dwp/queue.json` ใช้ `dwp-queue-v1`; มีเพียง pack เขียน `create` เพิ่มเมื่ออนุมัติ มนุษย์/lead จัดลำดับ `execute` ใส่ `started` เมื่อรับ lead พร้อมที่อยู่ จบแล้ว `done`; `create`/`refine` ทำ `skipped` พร้อมบันทึกสั้นได้ มี `after` เป็น dependency ทางเลือก หากไม่มี `parallel: true` จะทำทีละแผน daemon อ่านอย่างจำกัด; คิวผิดถือว่าว่าง `prompt-lead` ส่งข้อความคงที่ “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” daemon ไม่เขียนคิวหรือทำ `launch` หากสัญญาที่เผยแพร่ไม่อนุญาต

## 5. สิ่งที่ v8 คงไว้
v8 คง `tasks[].parallel_safe`, delegation, journal และชุดเหตุการณ์ journal v7 ชั้น record คง URL manifest/journal-event v7 และเพิ่มเพียง `plan-contract/v8` แผนรุ่นเก่าไม่ย้ายเงียบ Herdr เป็นทางเลือก
