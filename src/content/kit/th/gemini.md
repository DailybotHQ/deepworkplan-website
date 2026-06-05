---
title: Google Gemini
description: "อะแดปเตอร์ DWP สำหรับ Google Gemini รองรับเต็มรูปแบบผ่านขั้นตอนคำสั่งแบบ markdown และคำนำหน้า hash ที่ขับเคลื่อนลูป Deep Work Plan ทั้งหมด"
kind: adapter
lang: th
order: 5
agent: Google Gemini
support: full
prefix: '#'
---

# อะแดปเตอร์ Google Gemini

Google Gemini รองรับ DWP ผ่านขั้นตอนคำสั่งแบบ markdown

## ระดับการรองรับ

**เต็มรูปแบบ** — ทุกคำสั่ง dwp-* รันจากไฟล์ขั้นตอน ต้องใช้ Gemini 2.5 Pro ขึ้นไปสำหรับ WebFetch ในตัว

## การติดตั้ง

คำสั่ง DWP อยู่ในรูปขั้นตอนแบบ markdown ที่ agent อ่านเมื่อมีการเรียกใช้

## การเรียกใช้

ใช้คำนำหน้า `#`

```
#dwp-create <goal>
#dwp-execute
```

## หมายเหตุ

Gemini อ่านไฟล์ขั้นตอนและดำเนินลูป Deep Work Plan แบบลำดับเต็มรูปแบบ
