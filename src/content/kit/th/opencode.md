---
title: OpenCode
description: "อะแดปเตอร์ DWP สำหรับ OpenCode ซึ่งเป็น agent โอเพนซอร์ส รองรับเต็มรูปแบบผ่าน AGENTS.md ในตัวและขั้นตอนคำสั่งแบบ markdown ที่เรียกใช้ด้วยคำนำหน้า hash"
kind: adapter
lang: th
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# อะแดปเตอร์ OpenCode

OpenCode ซึ่งเป็น coding agent โอเพนซอร์ส รองรับ DWP ผ่าน AGENTS.md ในตัวและขั้นตอนคำสั่งแบบ markdown

## ระดับการรองรับ

**เต็มรูปแบบ** — OpenCode อ่าน AGENTS.md โดยตรงและรันทุกคำสั่ง dwp-* จากไฟล์ขั้นตอน

## การติดตั้ง

DWP ส่ง AGENTS.md และขั้นตอนคำสั่งมาใน repository OpenCode ค้นพบพวกมันเป็นบริบทของโครงการ

## การเรียกใช้

ใช้คำนำหน้า `#`

```
#dwp-create <goal>
#dwp-execute
```

## หมายเหตุ

OpenCode อ่านไฟล์ขั้นตอนและดำเนินลูป Deep Work Plan แบบลำดับเต็มรูปแบบ
