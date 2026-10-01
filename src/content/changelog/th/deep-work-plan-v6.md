---
title: "DWP v6: วิธีการเดิม สัญญาเข้มงวดยิ่งขึ้น"
description: "Deep Work Plan v6 คงวิธีการ v5 และเพิ่มโครงสร้างการทำงานที่เข้มงวดขึ้น ยังไม่ได้วัด non-inferiority ของผลลัพธ์ agent อย่างเป็นระบบในงานจริง"
date: 2026-09-28
version: "v6 · โครงสร้างเข้มงวดยิ่งขึ้น"
kind: release
lang: th
order: 0
featured: true
sourceLabel: "ชุดสคีมา v6 ที่เผยแพร่"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6 คงวิธีการ v5 พื้นผิวคำสั่ง และตำแหน่ง `.dwp/plans/` เพิ่มโครงสร้างที่เข้มงวดขึ้นเพื่อแสดงอำนาจของแผน หลักฐานการทำงาน บริบทงาน การจัดตาราง และสถานะสด

ชุดสคีมา v6 กำหนด identity manifest สัญญาผลลัพธ์และอำนาจ เหตุการณ์ journal แบบเพิ่มอย่างเดียว context manifest รายงาน และ live snapshot live projection ของ v6 เป็น snapshot ดังนั้น `plan-state/v5.json` ยังคงเป็นสคีมาสถานะสำหรับแผน v5 และไม่มี `plan-state/v6.json` แผนเดิมคงรุ่นที่บันทึกไว้และจะไม่ถูกเขียนทับโดยไม่มีการแจ้ง

การตัดสินใจทางสถาปัตยกรรมคือ GO: v6 คงวิธีการเดิมพร้อมโครงสร้างวิศวกรรมที่เข้มงวดขึ้น นี่ไม่ใช่คำกล่าวอ้างความเหนือกว่าเชิงประจักษ์ ยังไม่ได้วัด non-inferiority ของผลลัพธ์ agent

แผนใหม่จะได้รับ ID ตัวเลขที่เพิ่มขึ้นตามลำดับและมีอย่างน้อยสามหลัก (เช่น `PLAN_001_add_payment_webhooks/`) สคีมา v5 ที่ตรึงไว้จะนับ ID ตัวเลขเป็นหนึ่งคำ ดังนั้น slug ของ v5 จึงมี 2–4 คำ ส่วน slug ของ v6 มี 2–5 คำ โฟลเดอร์เดิมที่ไม่มีหมายเลข `PLAN_<slug>/` ยังคงอ่านได้และจะไม่มีการเปลี่ยนชื่อ หากมีแผนที่มีหมายเลข `latest` จะหมายถึงแผนที่มี ID ตัวเลขสูงสุด.

รุ่น skill ที่ติดตั้งคือ **6.0.2** แพ็ก 6.x สร้างแผนใหม่ด้วย v6 เป็นค่าเริ่มต้น แผนเดิมคงรุ่นที่บันทึกไว้ การย้ายต้องมีคำขออย่างชัดเจนและดูตัวอย่างก่อน
