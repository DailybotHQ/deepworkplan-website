---
title: GitHub Copilot
description: "อะแดปเตอร์ DWP สำหรับ GitHub Copilot รองรับเต็มรูปแบบผ่าน AGENTS.md และขั้นตอนคำสั่งแบบ markdown ที่เรียกใช้ด้วยคำนำหน้า hash พร้อมการตรวจสอบเต็มรูปแบบ"
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

**สมบูรณ์** (ผ่านการทดสอบการติดตั้ง) — Copilot อ่าน AGENTS.md และไฟล์ขั้นตอนการทำงาน dwp-* พร้อมทั้งรันทุกคำสั่งจากไฟล์เหล่านั้น เส้นทางได้รับการยืนยันโดยชุดการทดสอบอัตโนมัติ

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
