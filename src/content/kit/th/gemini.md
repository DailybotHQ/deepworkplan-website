---
title: Google Gemini
description: "อะแดปเตอร์ DWP สำหรับ Google Gemini รองรับบางส่วนผ่านขั้นตอนคำสั่งแบบ markdown และคำนำหน้า hash ที่ขับเคลื่อนเวิร์กโฟลว์แบบลำดับ"
kind: adapter
lang: th
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# อะแดปเตอร์ Google Gemini

Google Gemini รองรับ DWP ผ่านขั้นตอนคำสั่งแบบ markdown

## ระดับการรองรับ

**บางส่วน** คำสั่งหลักทำงานได้ผ่านไฟล์ขั้นตอน

## การติดตั้ง

คำสั่ง DWP อยู่ในรูปขั้นตอนแบบ markdown ที่ agent อ่าน

## การเรียกใช้

ใช้คำนำหน้า `#`

```
#dwp-create <goal>
#dwp-execute
```

## หมายเหตุ

Gemini อ่านไฟล์ขั้นตอนและดำเนินเวิร์กโฟลว์ DWP แบบลำดับ
