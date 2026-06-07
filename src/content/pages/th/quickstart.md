---
title: "Quickstart — Deep Work Plan"
description: "ติดตั้ง skill ออนบอร์ด repository ของคุณ จากนั้นวางแผนและดำเนินการด้วยเอเจนต์ใดก็ได้ — ขั้นตอนที่ทำให้ repository ขับเคลื่อนด้วยข้อกำหนดและเอเจนต์ขับเคลื่อนได้"
lastUpdated: 2026-05-31
---

## Quickstart

ติดตั้ง skill ออนบอร์ด repository ของคุณ จากนั้นวางแผนและดำเนินการด้วยเอเจนต์ใดก็ได้ — ขั้นตอนที่ทำให้
repository ของคุณขับเคลื่อนด้วยข้อกำหนดและเอเจนต์ขับเคลื่อนได้

## เส้นทางการนำมาใช้

### 1. ติดตั้ง skill ของ Deep Work Plan

เพิ่ม skill ลงใน repository ของคุณ มันจัดส่งตัวกำหนดเส้นทางพร้อม sub-skill แปดตัว — create, execute, refine,
resume, status, verify, onboard และ author ใช้ Skills CLI เพื่อเส้นทางที่เร็วที่สุด

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

หรือ clone repo และรันการตั้งค่าที่ใดก็ตามที่มี git และ shell

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### 2. ออนบอร์ด repository

รัน sub-skill ชื่อ onboard และให้เอเจนต์ให้เหตุผลเกี่ยวกับ repo จริงของคุณ — เทคสแตก ตัวจัดการ
แพ็กเกจ และคำสั่งตรวจสอบจริง

```bash
/deepworkplan-onboard
```

มันสร้าง `AGENTS.md` ฐานความรู้ `docs/` เอกสารต่อโมดูล และบ้านข้ามเอเจนต์ `.agents/`
(พร้อม symlink `.claude → .agents`) เชื่อมคำสั่ง `dwp-*` บาง ๆ และสร้างโครง `.dwp/` ที่ถูก gitignore
สำหรับแผนและดราฟต์ ไม่มีสิ่งใดที่ทำจากเทมเพลต ทุกอย่างปรับให้เข้ากับ repository ของคุณ

### 3. พัฒนา kit และยอมรับส่วนเสริม

ใช้ `/skill-create` และ `/agent-create` (sub-skill ชื่อ author) เพื่อปลูก skill, agent และคำสั่ง
ที่เหมาะกับเทคสแตก การออนบอร์ดยังเสนอส่วนเสริมแบบเลือกเข้าร่วมสี่อย่าง — devcontainer, Dailybot,
dependency-upgrade และ design-system — ที่คุณยอมรับเมื่อมันเหมาะสมเท่านั้น repo สอดคล้องอย่างสมบูรณ์โดยมีส่วนเสริมศูนย์อย่าง

### 4. วางแผนและดำเนินการ

สร้าง Deep Work Plan และรันมันทีละงาน

```bash
/dwp-create <goal>
/dwp-execute
```

ใช้ `/dwp-status`, `/dwp-refine` และ `/dwp-resume` ขณะที่งานดำเนินไป แต่ละแผนมีงานที่มีหมายเลข
validation gate และ completion protocol เพื่อให้งานยังคงมีโครงสร้างและดำเนินต่อได้ข้ามเซสชัน

## ผลลัพธ์

repository ของคุณกลายเป็นแบบขับเคลื่อนด้วยข้อกำหนดและเอเจนต์ขับเคลื่อนได้ แผนคือแหล่งความจริงที่ยั่งยืน และ
repository เองกลายเป็น harness ที่เอเจนต์ใดก็รันเทียบกับมัน

- [อ่านระเบียบวิธี](/methodology)
- [เรียกดูข้อกำหนด](/spec)
- [สำรวจ kit](/kit)
