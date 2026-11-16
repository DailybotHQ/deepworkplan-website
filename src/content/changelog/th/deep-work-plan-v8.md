---
title: "DWP v8: spec-first และวงจรปิดครบ"
description: "Deep Work Plan v8 รวมแผน spec-first คลังโค้ดเป็น harness, Loop engineering และประสิทธิภาพที่วัดได้ เพื่อให้แผนที่อนุมัติดำเนินจนเสร็จสมบูรณ์"
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: th
order: 0
featured: true
sourceLabel: "รุ่นที่ติดแท็กและร่างสัญญา v8"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
sourceLinks:
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
---

Deep Work Plan v8 รวมการพัฒนา spec-first คลังโค้ดในฐานะ harness ของเอเจนต์ Loop engineering และประสิทธิภาพที่วัดได้ ประโยคทำงาน: “Spec-first ปิดวงจร: คลังโค้ดคือ harness และแผนดำเนินต่อเองจนเสร็จ”

## เสาหลักทั้งสี่

1. **Spec-first:** แผนและข้อกำหนดเป็นแหล่งความจริงถาวร พร้อมเกณฑ์ยอมรับและด่านตรวจสอบ 2. **คลังโค้ดคือ harness:** บริบท เครื่องมือ กฎควบคุม และสถานะที่ทำต่อได้อยู่คู่กับโค้ด 3. **Loop engineering:** แผนอนุมัติดำเนินตามวงจรที่บันทึกจนเสร็จ 4. **ประสิทธิภาพที่วัดได้:** ไบต์คำสั่งต่อโฟลว์พร้อมเส้นทางวัดที่เผยแพร่ ไม่คาดเดาเปอร์เซ็นต์โทเคน

## ความหมายของ Loop engineering

แผนลงทะเบียนผู้นำและลำดับผู้สืบทอด มนุษย์เริ่ม daemon Herdr ที่เป็นตัวเลือกด้วย herdr-peers autopilot --loop; การเตือนขอให้ทำต่อโดยไม่เพิ่มอำนาจใหม่ หากผู้นำไม่อยู่ ผู้สืบทอดที่ระบุไว้รับช่วงได้ เหตุการณ์ส่งไปยังตัวแจ้งเตือน Dailybot และ fleet แสดงเอเจนต์กับแผนบนเครื่องที่เปิดใช้งาน มนุษย์เริ่ม daemon; Herdr addon เป็นตัวเลือก

## รุ่นที่มีเครื่องมือเหล่านี้

การเสริมความแข็งแกร่งของแพ็ก v7.11.0 และรุ่น v7.12.x สำหรับลงทะเบียนแผนและแจ้งเตือนให้กลไกฝั่งแผน herdr-peers v1.3.x เพิ่มวงจร รายงาน และ fleet; v2.0.0 เพิ่ม brain ของ protocol 2 และตัวอ่านคิว coding-agents-kit v1.3.0 ให้สัญญา pick-v2 ส่วน v1.4.0 เพิ่มตัวอัปเดตที่ตรวจสอบแล้ว ลิงก์รุ่นติดแท็กอยู่ด้านบน addon เป็นตัวเลือก

## สัญญา v8 — RE-VERIFY AT 8.0.0

ร่าง origin/feat/v8-line เพิ่ม autonomy ใน plan-contract/v8: งบเวลาหยุดชะงัก pane ที่ส่งคำเตือนได้ เป้าหมายแจ้งเตือน สิทธิ์ของ brain และพฤติกรรมคิว ยังนิยาม dwp-queue-v1 สำหรับ .dwp/queue.json โดยแพ็กเขียนและ Herdr อ่าน ต้องตรวจสอบข้อกล่าวชั่วคราวนี้กับอาร์ติแฟกต์ติดแท็ก 8.0.0 ก่อนเผยแพร่
