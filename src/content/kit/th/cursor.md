---
title: Cursor
description: "อะแดปเตอร์ DWP สำหรับ Cursor AI รองรับเต็มรูปแบบผ่านระบบ project rules และคำนำหน้าคำสั่ง hash เนื่องจาก Cursor สงวน slash ไว้ใช้เอง"
kind: adapter
lang: th
order: 2
agent: Cursor
support: full
prefix: '#'
---

# อะแดปเตอร์ Cursor

Cursor รองรับ DWP ผ่าน project rules และไฟล์คำสั่ง

## ระดับการรองรับ

**สมบูรณ์** (ผ่านการทดสอบการติดตั้ง) — คำสั่ง DWP ทำงานผ่านระบบกฎของ Cursor เส้นทางไดเรกทอรีได้รับการตรวจสอบโดยชุดการทดสอบอัตโนมัติ เวิร์กโฟลว์พฤติกรรมดำเนินการตามลำดับ

## การติดตั้ง

คำสั่ง DWP อยู่ในรูป markdown ภายในโครงการ และ Cursor อ่านผ่านระบบ rules ของมัน

ไม่บังคับ: [coding-agents-kit](/kit/agentkit) สามารถติดตั้ง CLI นี้และเรียกใช้ด้วย `ak cursor` ได้ ตัวติดตั้งทางการของผู้พัฒนาก็ใช้ได้เช่นกัน

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cursor
```

## การเรียกใช้

ใช้คำนำหน้า `#` (Cursor ดักจับ `/`)

```
#dwp-create <goal>
#dwp-execute
```

## หมายเหตุ

ใช้ `#` เพราะ Cursor สงวน `/` ไว้สำหรับคำสั่งของตนเอง
