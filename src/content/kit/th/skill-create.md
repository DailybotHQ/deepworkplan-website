---
title: skill-create
description: "สร้าง skill ใหม่ที่นำกลับมาใช้ซ้ำได้ใน repository ปัจจุบัน เป็นขั้นตอนแบบพารามิเตอร์ที่รันในเซสชัน ผ่าน author sub-skill โดยรักษาให้แคตตาล็อกตรงกันเสมอ"
kind: command
lang: th
order: 7
usage: /skill-create
---

# skill-create

สร้าง skill ใหม่ใน repository ปัจจุบัน เป็นตัวส่งต่อแบบบาง ๆ ไปยัง **author** sub-skill ของ Deep Work Plan

## สิ่งที่มันทำ

`skill-create` ส่งต่อไปยังขั้นตอนการสร้าง skill ของ author sub-skill skill คือขั้นตอนแบบพารามิเตอร์ที่นำกลับมาใช้ซ้ำได้และรันในเซสชัน (เช่น `/fix-lint`) มันเข้ารหัสว่า "ทำ X อย่างไร" และอยู่ภายใต้ `.agents/skills/<name>/SKILL.md`

## วิธีใช้

```
/skill-create
```

## พฤติกรรม

1. ตรวจหาการจัดวาง `.agents/` และข้อตกลงเฉพาะของ repo
2. ยืนยันว่ามีเวิร์กโฟลว์จริงที่ทำซ้ำได้ แล้วตั้งชื่อแบบ kebab-case
3. สร้างโครงและกรอกข้อมูล `SKILL.md` (Goal, When-to-use, Steps, Validation)
4. เพิ่มตัวส่งต่อคำสั่งแบบบาง ๆ หากจำเป็น
5. อัปเดตแคตตาล็อก `.agents/docs/` ให้ตรงกัน

## หมายเหตุ

สำหรับ agent ให้ใช้ `/agent-create` ตรรกะอยู่ใน skill ส่วนคำสั่งคงความบางไว้
