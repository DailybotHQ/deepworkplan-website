---
title: deepworkplan-onboard
description: "ทำให้ repository เป็น AI-first ด้วยการให้เหตุผลเกี่ยวกับสแตกและ archetype แล้วสร้าง AGENTS.md, docs/, .agents/ และ .dwp/ ที่ถูก gitignore ให้เหมาะกับมัน"
kind: command
lang: th
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

เปลี่ยน repository ให้เป็น codebase แบบ AI-first ที่ขับเคลื่อนด้วย spec นี่คือ onboard sub-skill ของ skill Deep Work Plan

## สิ่งที่มันทำ

`deepworkplan-onboard` ตรวจสอบ repository **จริง** ทั้งภาษา เฟรมเวิร์ก ตัวจัดการแพ็กเกจ คำสั่ง build/test/lint module ข้อตกลงการทดสอบ และรูปแบบการ deploy แล้วสร้าง artifact ที่ปรับให้เหมาะกับมัน มันให้เหตุผล ไม่คัดลอกเทมเพลตและไม่ทิ้ง placeholder ไว้

## วิธีใช้

```
/deepworkplan-onboard
```

## พฤติกรรม

1. สำรวจ ตรวจหาสแตกจริงและคำสั่งตรวจสอบ แล้วจับคู่กับพรีเซ็ต onboarding ที่ใกล้เคียงที่สุด
2. Archetype จัดประเภทว่าเป็น repo เดี่ยวหรือ orchestrator hub
3. สร้าง `AGENTS.md` พร้อม symlink `CLAUDE.md` ที่มีบล็อก Quick Commands จริง
4. สร้าง `docs/` (สถาปัตยกรรม มาตรฐาน การทดสอบ ความปลอดภัย และอื่น ๆ) พร้อมเอกสารราย module
5. สร้าง `.agents/` (agent คำสั่ง `dwp-*` แบบบาง ๆ skill ที่เหมาะกับสแตก และแคตตาล็อก) พร้อม `.claude → .agents`
6. ติดตั้ง skill และสร้างโครง `.dwp/` ที่ถูก gitignore (แผน ฉบับร่าง) และพื้นที่ scratch `tmp/`
7. เสนอแอดออนแบบสมัครใจ แล้วตรวจสอบตัวเอง

## หมายเหตุ

repository หนึ่งสอดคล้องกับมาตรฐานได้อย่างสมบูรณ์แม้ไม่มีแอดออนใดเลย สภาพจริงที่ตรวจพบมีน้ำหนักเหนือสมมติฐานของพรีเซ็ตเสมอ
