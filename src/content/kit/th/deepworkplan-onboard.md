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
7. ติดตั้งการตรวจสอบในเครื่องของ AI Diff Reviewer ที่จำเป็น เสนอแอดออนแบบสมัครใจ แล้วตรวจสอบตัวเอง

## หมายเหตุ

repository หนึ่งสอดคล้องกับมาตรฐานได้อย่างสมบูรณ์แม้ไม่มีแอดออนแบบเลือกใช้ใดเลย การตรวจสอบในเครื่องของ AI Diff Reviewer เป็นส่วนหนึ่งของพื้นฐานตั้งแต่มาตรฐาน 2.3.0 สภาพจริงที่ตรวจพบมีน้ำหนักเหนือสมมติฐานของพรีเซ็ตเสมอ

## อ้างอิงสคีมา v6

แค็ตตาล็อกสคีมาที่เครื่องอ่านได้สำหรับแผน v6 เผยแพร่ที่ URL คงที่เหล่านี้ live projection ของ v6 เป็น snapshot; ไม่มี `plan-state/v6.json` แผน v5 ที่มีอยู่ยังคงใช้สคีมาสถานะ v5 และแผนเก่าจะไม่ถูกเขียนทับโดยไม่มีการแจ้ง

- **Plan manifest:** https://deepworkplan.com/schema/plan-manifest/v6.json
- **Plan snapshot (v6 live projection):** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Plan contract:** https://deepworkplan.com/schema/plan-contract/v6.json
- **Journal event:** https://deepworkplan.com/schema/journal-event/v6.json
- **Context manifest:** https://deepworkplan.com/schema/context-manifest/v6.json

แพ็ก 7.x ปัจจุบันสร้างแผนใหม่ด้วย v7 เป็นค่าเริ่มต้น แผนเดิมคงรุ่นที่บันทึกไว้ การย้ายต้องมีคำขออย่างชัดเจน แผนใหม่จะได้รับ ID ตัวเลขที่เพิ่มขึ้นตามลำดับและมีอย่างน้อยสามหลัก (เช่น `PLAN_001_add_payment_webhooks/`) สคีมา v5 ที่ตรึงไว้จะนับ ID ตัวเลขเป็นหนึ่งคำ ดังนั้น slug ของ v5 จึงมี 2–4 คำ ส่วน slug ของ v7 มี 2–5 คำ โฟลเดอร์เดิมที่ไม่มีหมายเลข `PLAN_<slug>/` ยังคงอ่านได้และจะไม่มีการเปลี่ยนชื่อ หากมีแผนที่มีหมายเลข `latest` จะหมายถึงแผนที่มี ID ตัวเลขสูงสุด.
