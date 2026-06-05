---
title: Laravel
description: "พรีเซ็ต onboarding สำหรับโครงการ Laravel พร้อมแนวคิดสำหรับ Eloquent model, controller, route, migration, คำสั่ง Artisan และ test runner"
kind: preset
lang: th
order: 11
stack: Laravel (PHP)
---

# พรีเซ็ต Laravel

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับโครงการ Laravel นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- `composer.json` ที่มี `laravel/framework`, script console `artisan` และโครงสร้าง `app/` (`Models`, `Http/Controllers`, `Providers`)
- `routes/web.php` และ `routes/api.php`, `database/migrations/` และ Eloquent model
- อนุมาน test runner และ lint/format tooling จาก `composer.json` และไฟล์ config ที่มีอยู่

## สิ่งที่ต้องให้เหตุผล

- คำสั่ง test จริง (`php artisan test`, `vendor/bin/phpunit` หรือ `vendor/bin/pest`) และ gate ของ lint/format ใดก็ตาม (Pint, PHP-CS-Fixer, PHPStan/Larastan) โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- convention ของ routing, controller และ Eloquent, กระบวนการ migration และโครงสร้าง environment กับ config (`.env`, `config/`)
- skill ที่เหมาะกับสแตกสำหรับ model, controller, migration และคำสั่ง Artisan

## หมายเหตุ

เหมาะสำหรับแอป Laravel ที่ใช้โครงสร้างโครงการมาตรฐาน หาก repo ใช้ Sail/Docker ให้บันทึกว่า gate ของ test และ lint รันในคอนเทนเนอร์หรือไม่
