---
title: Claude Code
description: "อะแดปเตอร์ DWP สำหรับ Claude Code รองรับเต็มรูปแบบผ่าน slash command และ skill ในตัว รวมถึง subagent และ team agent ครบทุกความสามารถ"
kind: adapter
lang: th
order: 1
agent: Claude Code
support: full
prefix: /
---

# อะแดปเตอร์ Claude Code

Claude Code รองรับ DWP **เต็มรูปแบบ** ผ่าน slash command และ skill ในตัว

## ระดับการรองรับ

**เต็มรูปแบบ** คำสั่ง DWP ทั้งห้าตัว map ไปยัง slash command ในตัวของ Claude Code

## การติดตั้ง

DWP มาในรูป skill ภายใต้ `.agents/skills/` (เข้าถึงผ่าน symlink `.claude/`) Claude Code ค้นพบ skill เหล่านี้โดยอัตโนมัติ

## การเรียกใช้

ใช้คำนำหน้า `/`

```
/dwp-create <goal>
/dwp-execute
```

## หมายเหตุ

Claude Code รองรับทั้ง skill, subagent และ team agent ครบทุกความสามารถของ DWP
