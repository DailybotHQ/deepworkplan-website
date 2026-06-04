---
title: Django
description: "พรีเซ็ต onboarding สำหรับโครงการ Django พร้อมแนวคิดเรื่อง apps, migrations, settings, management commands และตัวรันเทสต์"
kind: preset
lang: th
order: 1
stack: Django
---

# พรีเซ็ต Django

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้กับโครงการ Django นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณ

- `manage.py` และ `settings.py` พร้อม app ที่มี `models.py`, `views.py`, `migrations/`
- ตัวจัดการแพ็กเกจและตัวรันเทสต์ที่อนุมานจาก manifest และ lockfile ที่มีอยู่

## สิ่งที่ต้องพิจารณา

- คำสั่งเทสต์จริง (มักเป็น `python manage.py test` หรือ `pytest`) และ gate สำหรับ lint หรือ type-check หากมี บันทึกไว้ตามต้นฉบับทุกตัวอักษร
- ข้อตกลงเรื่อง app และ migration การจัด settings กับสภาพแวดล้อม และรูปแบบของ management command
- skill ที่เหมาะกับสแตกสำหรับ app, model, view และ migration

## หมายเหตุ

มีประโยชน์กับแอป Django ที่ใช้โครงสร้างโครงการตามมาตรฐาน
