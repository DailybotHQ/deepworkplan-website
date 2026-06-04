---
title: Node / TS service
description: "พรีเซ็ต onboarding สำหรับบริการ Node และ TypeScript และ serverless API พร้อมแนวคิดเรื่องวงจรของ request จุดเชื่อมต่อ และการทดสอบ"
kind: preset
lang: th
order: 4
stack: Node / TS service
---

# พรีเซ็ต Node / TS service

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้กับบริการ Node/TypeScript และ serverless API นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณ

- `tsconfig.json` พร้อมเฟรมเวิร์กฝั่งเซิร์ฟเวอร์ (`express`, `fastify`, `@nestjs/*`) หรือ serverless handler (`serverless.yml`, `template.yaml`, ไดเรกทอรี `functions/`)
- ตัวจัดการแพ็กเกจที่อนุมานจาก lockfile ที่มีอยู่

## สิ่งที่ต้องพิจารณา

- สคริปต์ lint, type-check (`tsc --noEmit`), test (Jest/Vitest) และ build จริง บันทึกไว้ตามต้นฉบับทุกตัวอักษร
- ว่าเป็นบริการที่ทำงานต่อเนื่องระยะยาวหรือ serverless ซึ่งกำหนดรูปทรงของเอกสารด้านสถาปัตยกรรมและประสิทธิภาพ
- skill ที่เหมาะกับสแตก เช่น `endpoint`/`handler`, `service`, `middleware`, `integration` หรือ `lambda-fn`

## หมายเหตุ

บันทึกวงจรของ request หรือ event จุดเชื่อมต่อต่าง ๆ และตำแหน่งที่เก็บความลับและค่าคอนฟิก
