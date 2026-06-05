---
title: GitHub Copilot
description: "อะแดปเตอร์ DWP สำหรับ GitHub Copilot รองรับเต็มรูปแบบผ่าน AGENTS.md และขั้นตอนคำสั่งแบบ markdown ที่เรียกใช้ด้วยคำนำหน้า hash"
kind: adapter
lang: th
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# อะแดปเตอร์ GitHub Copilot

GitHub Copilot รองรับ DWP ผ่าน AGENTS.md และขั้นตอนคำสั่งแบบ markdown

## ระดับการรองรับ

**เต็มรูปแบบ** — Copilot อ่าน AGENTS.md และไฟล์ขั้นตอน dwp-* แล้วรันทุกคำสั่งจากพวกมัน

## การติดตั้ง

DWP ส่ง AGENTS.md และขั้นตอนคำสั่งมาใน repository Copilot อ่านพวกมันเป็นบริบทของ repository

## การเรียกใช้

ใช้คำนำหน้า `#`

```
#dwp-create <goal>
#dwp-execute
```

## หมายเหตุ

Copilot อ่านไฟล์ขั้นตอนและดำเนินลูป Deep Work Plan แบบลำดับเต็มรูปแบบ
