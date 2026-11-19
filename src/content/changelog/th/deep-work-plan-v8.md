---
title: "DWP v8: spec-first และวงจรปิดครบ"
description: "Deep Work Plan v8 รวมแผน spec-first คลังโค้ดเป็น harness, Loop engineering และประสิทธิภาพที่วัดได้ เพื่อให้แผนที่อนุมัติดำเนินจนเสร็จสมบูรณ์"
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: th
order: 0
featured: true
sourceLabel: "รุ่น skill v8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "รุ่น skill v8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "รุ่น skill v8.0.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "รุ่น skill v8.0.5"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.5"
  - label: "LOOP_ENGINEERING.md (เอกสารมาตรฐาน v8)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "Loop engineering ในตัวอ่านข้อกำหนด"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "สคีมา plan-contract/v8"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "สคีมา journal-event/v8"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "สคีมา plan-snapshot/v8"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "ตัวเขียนคิวแผน (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "รุ่น skill v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "รุ่น skill v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "รุ่น skill v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.1"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.1"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 รวมแนวคิดสี่ประการ ได้แก่ การพัฒนาแบบ spec-first คลังโค้ดในฐานะ harness ของเอเจนต์ Loop engineering และประสิทธิภาพที่วัดได้ ประโยคหลักคือ “Spec-first, loop-closed: คลังโค้ดคือ harness และแผนดำเนินต่อเองจนเสร็จ”

## เสาหลักทั้งสี่

1. **Spec-first.** แผนและข้อกำหนดเป็นแหล่งความจริงที่คงทน พร้อมเกณฑ์ยอมรับและด่านตรวจสอบที่ชัดเจน
2. **คลังโค้ดคือ harness.** บริบท เครื่องมือ กฎควบคุม และสถานะที่ทำต่อได้อยู่คู่กับโค้ด เพื่อให้เอเจนต์ต่างกันทำงานจากคลังเดียวกัน
3. **Loop engineering.** แผนที่อนุมัติแล้วสามารถดำเนินตามวงจรชีวิตที่บันทึกไว้จนเสร็จ
4. **ประสิทธิภาพที่วัดได้.** รายงานประสิทธิภาพเป็นไบต์คำสั่งต่อโฟลว์ พร้อมเส้นทางวัดที่เผยแพร่ โดยไม่อนุมานเปอร์เซ็นต์โทเคน

## ความหมายของ Loop engineering

แผนลงทะเบียนผู้นำและลำดับผู้สืบทอด มนุษย์เริ่ม daemon Herdr ซึ่งเป็นตัวเลือกด้วย `herdr-peers autopilot --loop`; การเตือนขอให้ผู้นำทำต่อโดยไม่เพิ่มอำนาจ หากผู้นำไม่อยู่ วงจรสามารถขอให้ผู้สืบทอดที่ระบุไว้รับช่วงได้ เหตุการณ์แผนส่งไปยังตัวแจ้งเตือน Dailybot ของแพ็กได้ และมุมมอง fleet แสดงเอเจนต์กับแผนบนเครื่องที่เปิดใช้งาน มนุษย์ยังเป็นผู้เริ่ม daemon และ Herdr addon เป็นตัวเลือก

## รุ่นที่มีเครื่องมือเหล่านี้

การเสริมความแข็งแกร่งของแพ็ก v7.11.0 และรุ่น v7.12.x ที่ลงทะเบียนแผนและแจ้งเตือนเป็นกลไกฝั่งแผน herdr-peers v1.3.x เพิ่มวงจร รายงาน และมุมมอง fleet; v2.0.0 เพิ่ม brain ของ protocol 2 และตัวอ่านคิว coding-agents-kit v1.3.0 ให้สัญญาเปิดใช้ pick-v2 และ v1.4.0 เพิ่มตัวอัปเดตที่ตรวจสอบแล้ว herdr-peers v2.1.0 อ่าน blocker แบบมีโครงสร้างของ v8 และ coding-agents-kit v1.5.0 เพิ่มการวัดโทเคนที่มีการรายงานเท่านั้น ตัวอธิบาย addon ของแพ็ก 8.0.0 กำหนด herdr-peers v2.1.0, coding-agents-kit v1.5.0 และ devcontainer-kit v1.3.0 ลิงก์รุ่นที่ติดแท็กอยู่ด้านบน แพ็กทำงานได้โดยไม่ต้องมี addon เสริมเหล่านี้

## สัญญา v8

รุ่น 8.0.0 ใช้มาตรฐาน DWP 8.0.0 แผนใหม่สร้างด้วย `plan-contract/v8`; แผน v7, v6 และ v5 คงรุ่นที่บันทึกไว้และย้ายได้ด้วย `refine migrate` ที่ระบุชัดเจนเท่านั้น แผน v8 ยังคงสาย `plan-manifest/v7` และยังรองรับ `journal-event/v7` สำหรับแผนเดิม แหล่งมาตรฐานคือ `LOOP_ENGINEERING.md` พร้อมสคีมาที่เผยแพร่สามรายการ

- **บล็อก `autonomy`.** บล็อกปิดที่เป็นตัวเลือกใน `plan-contract/v8` สำหรับบันทึกอำนาจของวงจรแผน: `stall_budget` (1–10 ค่าเริ่มต้น 3), pane `promptable` (ค่าเริ่มต้น: เฉพาะผู้นำ), เป้าหมาย `notify` (ค่าเริ่มต้น: ไม่มี), `brain` (ค่าเริ่มต้น `false`) และ `queue` (`prompt-lead`, `launch` หรือ `none` ค่าเริ่มต้น `none`) หากไม่มีบล็อก จะใช้ค่าเริ่มต้นทั้งหมดและมนุษย์ยังเป็นผู้แก้ปัญหา
- **Blocker แบบมีโครงสร้าง.** Blocker คือเหตุการณ์ `blocker` ของ `journal-event/v8` ซึ่งสร้างและแก้ไขได้ผ่าน ledger helper เท่านั้น โดยมีงาน เหตุผล บรรทัด `needs` คลาสที่จำเป็น C1–C7 และ resolver ที่เลือกได้ ปฏิเสธ `resolver: lead` สำหรับ C1, C2, C5 และ C6; วงจรจะขอให้ผู้นำแก้เฉพาะ blocker ที่แผนระบุ `resolver: lead` เอง `state.json` เปลี่ยนเป็น `plan-snapshot/v8` พร้อม blocker ที่ทำงานอยู่และสถานะ `blocked` ที่ได้จากข้อมูล; `PROGRESS.md` เริ่มด้วยหัวข้อสี่บรรทัด ได้แก่ เป้าหมาย งานปัจจุบัน การกระทำถัดไป และสิ่งที่ต้องการ
- **คิวแผน.** มีเพียง `shared/queue.py` ของแพ็กหรือมนุษย์ที่เขียน `.dwp/queue.json` (`dwp-queue-v1`) ได้ เมื่ออนุมัติ `create` จะเพิ่มแผน และ daemon Herdr อ่านคิวเท่านั้น คิวมีได้สูงสุด 64 แผน และทำงานทีละแผนต่อคลัง เว้นแต่แผนตั้ง `parallel: true` คิวที่เสียหายจะไม่ขัดจังหวะวงจรชีวิต

รุ่นสุดท้ายของ v7 คือ **7.12.2**.

รุ่น skill ที่ติดตั้ง: **8.0.5**.
