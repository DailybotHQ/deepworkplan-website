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

**สมบูรณ์** (ผ่านการทดสอบพฤติกรรม) — ชุดสกิลย่อยและคำสั่งวงจรชีวิตของ DWP ทั้งหมดแมปไปยังคำสั่งสแลชของ Claude Code ดั้งเดิม ซึ่งได้รับการพิสูจน์ในการทดสอบประสิทธิภาพการส่งมอบงานแบบสองทิศทาง

## การติดตั้ง

DWP มาในรูป skill ภายใต้ `.agents/skills/` (เข้าถึงผ่าน symlink `.claude/`) Claude Code ค้นพบ skill เหล่านี้โดยอัตโนมัติ

ไม่บังคับ: [coding-agents-kit](/kit/agentkit) สามารถติดตั้ง CLI นี้และเรียกใช้ด้วย `ak claude` ได้ ตัวติดตั้งทางการของผู้พัฒนาก็ใช้ได้เช่นกัน

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install claude
```

## การเรียกใช้

ใช้คำนำหน้า `/`

```
/dwp-create <goal>
/dwp-execute
```

## หมายเหตุ

Claude Code รองรับทั้ง skill, subagent และ team agent ครบทุกความสามารถของ DWP
