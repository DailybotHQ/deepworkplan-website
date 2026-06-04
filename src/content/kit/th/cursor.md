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

**เต็มรูปแบบ** คำสั่ง DWP ทำงานได้ผ่านระบบ rules ของ Cursor

## การติดตั้ง

คำสั่ง DWP อยู่ในรูป markdown ภายในโครงการ และ Cursor อ่านผ่านระบบ rules ของมัน

## การเรียกใช้

ใช้คำนำหน้า `#` (Cursor ดักจับ `/`)

```
#dwp-create <goal>
#dwp-execute
```

## หมายเหตุ

ใช้ `#` เพราะ Cursor สงวน `/` ไว้สำหรับคำสั่งของตนเอง
