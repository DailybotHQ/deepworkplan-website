---
title: Windsurf
description: "อะแดปเตอร์ DWP สำหรับ Windsurf รองรับเต็มรูปแบบผ่านระบบกฎและขั้นตอนคำสั่งแบบ markdown ที่เรียกใช้ด้วยคำนำหน้า hash"
kind: adapter
lang: th
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# อะแดปเตอร์ Windsurf

Windsurf รองรับ DWP ผ่านระบบกฎและขั้นตอนคำสั่งแบบ markdown

## ระดับการรองรับ

**เต็มรูปแบบ** — Windsurf อ่านกฎของโครงการและรันทุกคำสั่ง dwp-* จากไฟล์ขั้นตอน

## การติดตั้ง

คำสั่ง DWP อยู่ในรูปขั้นตอนแบบ markdown ที่ agent อ่านผ่านระบบกฎของ Windsurf

## การเรียกใช้

ใช้คำนำหน้า `#`

```
#dwp-create <goal>
#dwp-execute
```

## หมายเหตุ

Windsurf อ่านไฟล์ขั้นตอนและดำเนินลูป Deep Work Plan แบบลำดับเต็มรูปแบบ
