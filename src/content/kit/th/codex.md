---
title: OpenAI Codex
description: "อะแดปเตอร์ DWP สำหรับ OpenAI Codex รองรับเต็มรูปแบบผ่านขั้นตอนคำสั่งแบบ markdown และคำนำหน้า hash ที่ขับเคลื่อนลูป Deep Work Plan ทั้งหมด"
kind: adapter
lang: th
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# อะแดปเตอร์ OpenAI Codex

OpenAI Codex รองรับ DWP ผ่านขั้นตอนคำสั่งแบบ markdown

## ระดับการรองรับ

**เต็มรูปแบบ** — ทุกคำสั่ง dwp-* รันจากไฟล์ขั้นตอน กฎถูกติดตั้งไว้ใต้ `.codex/`

## การติดตั้ง

คำสั่ง DWP อยู่ในรูปขั้นตอนแบบ markdown ที่ agent อ่านเมื่อมีการเรียกใช้ กฎถูกติดตั้งไว้ใต้ `.codex/`

## การเรียกใช้

ใช้คำนำหน้า `#`

```
#dwp-create <goal>
#dwp-execute
```

## หมายเหตุ

Codex อ่านไฟล์ขั้นตอนและดำเนินลูป Deep Work Plan แบบลำดับเต็มรูปแบบ
