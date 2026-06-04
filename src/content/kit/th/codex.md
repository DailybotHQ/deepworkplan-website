---
title: OpenAI Codex
description: "อะแดปเตอร์ DWP สำหรับ OpenAI Codex รองรับบางส่วนผ่านขั้นตอนคำสั่งแบบ markdown และคำนำหน้า hash ความสามารถด้าน team agent ใช้ไม่ได้"
kind: adapter
lang: th
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# อะแดปเตอร์ OpenAI Codex

OpenAI Codex รองรับ DWP ผ่านขั้นตอนคำสั่งแบบ markdown

## ระดับการรองรับ

**บางส่วน** คำสั่งหลักทำงานได้ ส่วนความสามารถขั้นสูง (team agent) ใช้ไม่ได้

## การติดตั้ง

คำสั่ง DWP อยู่ในรูปขั้นตอนแบบ markdown ที่ agent อ่านเมื่อมีการเรียกใช้

## การเรียกใช้

ใช้คำนำหน้า `#`

```
#dwp-create <goal>
#dwp-execute
```

## หมายเหตุ

ความสามารถด้าน team agent มีเฉพาะใน Claude เท่านั้น ส่วน Codex รองรับเวิร์กโฟลว์แบบลำดับ
