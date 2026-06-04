---
title: GitHub Copilot
description: "อะแดปเตอร์ DWP สำหรับ GitHub Copilot รองรับบางส่วนผ่านขั้นตอนคำสั่งแบบ markdown และคำนำหน้า hash ระบบอัตโนมัติบางส่วนต้องทำด้วยมือ"
kind: adapter
lang: th
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# อะแดปเตอร์ GitHub Copilot

GitHub Copilot รองรับ DWP ผ่านขั้นตอนคำสั่งแบบ markdown

## ระดับการรองรับ

**บางส่วน** คำสั่งหลักทำงานได้ผ่านไฟล์ขั้นตอน ระบบอัตโนมัติบางส่วนต้องทำด้วยมือ

## การติดตั้ง

คำสั่ง DWP อยู่ในรูปขั้นตอนแบบ markdown ภายใน repository

## การเรียกใช้

ใช้คำนำหน้า `#`

```
#dwp-create <goal>
#dwp-execute
```

## หมายเหตุ

Copilot อ่านไฟล์ขั้นตอนได้ แต่ดำเนินการอัตโนมัติได้น้อยกว่า Claude Code
