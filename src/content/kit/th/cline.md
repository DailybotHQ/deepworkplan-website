---
title: Cline
description: "อะแดปเตอร์ DWP สำหรับ Cline ซึ่งเป็น agent โอเพนซอร์ส รองรับเต็มรูปแบบผ่านกฎ markdown และขั้นตอนคำสั่งที่เรียกใช้ด้วยคำนำหน้า hash"
kind: adapter
lang: th
order: 9
agent: Cline
support: full
prefix: '#'
---

# อะแดปเตอร์ Cline

Cline ซึ่งเป็น coding agent โอเพนซอร์ส รองรับ DWP ผ่านกฎ markdown และขั้นตอนคำสั่ง

## ระดับการรองรับ

**เต็มรูปแบบ** — Cline อ่านกฎ markdown และรันทุกคำสั่ง dwp-* จากไฟล์ขั้นตอน

## การติดตั้ง

คำสั่ง DWP อยู่ในรูปขั้นตอนแบบ markdown ที่ agent อ่านผ่านกฎของ Cline

ไม่บังคับ: [coding-agents-kit](/kit/agentkit) สามารถติดตั้ง CLI นี้และเรียกใช้ด้วย `ak cline` ได้ ตัวติดตั้งทางการของผู้พัฒนาก็ใช้ได้เช่นกัน

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cline
```

## การเรียกใช้

ใช้คำนำหน้า `#`

```
#dwp-create <goal>
#dwp-execute
```

## หมายเหตุ

Cline อ่านไฟล์ขั้นตอนและดำเนินลูป Deep Work Plan แบบลำดับเต็มรูปแบบ
