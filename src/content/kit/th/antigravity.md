---
title: Antigravity
description: "อะแดปเตอร์ DWP สำหรับ Antigravity รองรับเต็มรูปแบบผ่านขั้นตอนคำสั่งแบบ markdown และคำนำหน้า hash ที่ขับเคลื่อนลูป Deep Work Plan ทั้งหมด"
kind: adapter
lang: th
order: 6
agent: Antigravity
support: full
prefix: '#'
---

# อะแดปเตอร์ Antigravity

Antigravity รองรับ DWP ผ่านขั้นตอนคำสั่งแบบ markdown

## ระดับการรองรับ

**สมบูรณ์** (ผ่านการทดสอบการติดตั้ง) — ทุกคำสั่ง dwp-* รันจากไฟล์ขั้นตอนการทำงาน เส้นทางได้รับการยืนยันโดยชุดการทดสอบอัตโนมัติ เวิร์กโฟลว์พฤติกรรมทำงานบนเส้นฐานตามลำดับ

## การติดตั้ง

คำสั่ง DWP อยู่ในรูปขั้นตอนแบบ markdown ที่ agent อ่านเมื่อมีการเรียกใช้

## การเรียกใช้

ใช้คำนำหน้า `#`

```
#dwp-create <goal>
#dwp-execute
```

## หมายเหตุ

Antigravity อ่านไฟล์ขั้นตอนและดำเนินลูป Deep Work Plan แบบลำดับเต็มรูปแบบ
