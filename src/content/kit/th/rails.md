---
title: Ruby on Rails
description: "พรีเซ็ต onboarding สำหรับแอปพลิเคชัน Ruby on Rails พร้อมแนวคิดสำหรับโครงสร้าง MVC, migration, test framework และ asset และ config pipeline"
kind: preset
lang: th
order: 10
stack: Ruby on Rails
---

# พรีเซ็ต Ruby on Rails

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับแอปพลิเคชัน Ruby on Rails นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- `Gemfile` ที่มี `rails`, ไฟล์ปฏิบัติการ `bin/rails` และโครงสร้าง MVC `app/{models,controllers,views}`
- `config/routes.rb`, migration ใน `db/migrate/` และ `db/schema.rb`
- อนุมาน test framework จากสิ่งที่มีอยู่: RSpec (`spec/`, `.rspec`) หรือ Minitest (`test/`)

## สิ่งที่ต้องให้เหตุผล

- คำสั่ง test จริง (`bin/rails test` หรือ `bundle exec rspec`) และ gate ของ lint (`rubocop`) โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- flow ของ request → route → controller → model → view, กระบวนการ migration และตำแหน่งที่เก็บ credential และ config
- skill ที่เหมาะกับสแตกสำหรับ model, controller, migration และ job กับ mailer (หากมี)

## หมายเหตุ

บันทึกว่ามีการใช้ Active Job/Sidekiq และ Hotwire/Turbo หรือไม่ และการจัดการ encrypted credential (`config/credentials`)
