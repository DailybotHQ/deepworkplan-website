---
title: Antigravity
description: "อะแดปเตอร์ DWP สำหรับ Antigravity รองรับบางส่วนผ่านขั้นตอนคำสั่งแบบ markdown และคำนำหน้า hash ที่ขับเคลื่อนเวิร์กโฟลว์แบบลำดับ"
kind: adapter
lang: th
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# อะแดปเตอร์ Antigravity

Antigravity รองรับ DWP ผ่านขั้นตอนคำสั่งแบบ markdown

## ระดับการรองรับ

**บางส่วน** คำสั่งหลักทำงานได้ผ่านไฟล์ขั้นตอน

## การติดตั้ง

คำสั่ง DWP อยู่ในรูปขั้นตอนแบบ markdown ที่ agent อ่านเมื่อมีการเรียกใช้

## การเรียกใช้

ใช้คำนำหน้า `#`

```
#dwp-create <goal>
#dwp-execute
```

## หมายเหตุ

Antigravity อ่านไฟล์ขั้นตอนและดำเนินเวิร์กโฟลว์ DWP แบบลำดับ
