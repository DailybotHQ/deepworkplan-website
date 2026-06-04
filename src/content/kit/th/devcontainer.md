---
title: Devcontainer
description: "แอดออนแบบสมัครใจที่เพิ่มหรือปรับ devcontainer ที่ใช้ compose จากสแตกที่ตรวจพบ พร้อมการยืนยันตัวตนของ AI-CLI ที่คงอยู่แม้สร้างใหม่"
kind: addon
lang: th
order: 1
---

# แอดออน Devcontainer

เพิ่ม dev container ที่ทำซ้ำได้และแยกสภาพแวดล้อมให้กับ repository นี่คือแอดออนแบบสมัครใจตัวแรกของ Deep Work Plan

## สิ่งที่เพิ่มเข้ามา

- devcontainer ที่ใช้ compose พร้อม base image และบริการสนับสนุนที่อนุมานจากสแตกที่ตรวจพบ
- โวลุมเก็บการยืนยันตัวตนของ AI-CLI (Claude, Codex, Cursor, gh, Dailybot) ที่คงอยู่แม้สร้างใหม่
- `dailybot-project-network`, ข้อตกลง `DOCKER_DEV_ENV=vscode` และ alias สำหรับตรวจสอบ (`codecheck`, `check`, `fix`, `test`)
- สำหรับ repo สาธารณะ จะมี `.dockerignore` ที่กันความลับและ `.env.example` ที่ปราศจากความลับ

## พฤติกรรม

ราว 85% ของ devcontainer เป็นโครงร่วมที่เสถียร ส่วนอีก 15% ที่เหลือ ได้แก่ base image, ผู้ใช้, โฟลเดอร์ workspace, บริการ, พอร์ต และความลับ จะอนุมานจากสแตกจริงของ repo หากมี devcontainer อยู่แล้วจะปรับให้สอดคล้องกัน ไม่ใช่เขียนทับทิ้ง

## หมายเหตุ

เป็นแบบสมัครใจและไม่บังคับเสมอ repo หนึ่งสอดคล้องกับมาตรฐานได้อย่างสมบูรณ์แม้ไม่มีแอดออนใดเลย
