---
title: Python package / CLI
description: "พรีเซ็ต onboarding สำหรับแพ็กเกจ Python และเครื่องมือ CLI พร้อมแนวคิดเรื่องการจัดวางแพ็กเกจ console entry point และ gate ตรวจสอบด้วย pytest"
kind: preset
lang: th
order: 5
stack: Python package / CLI
---

# พรีเซ็ต Python package / CLI

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้กับแพ็กเกจ Python และเครื่องมือ CLI นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณ

- `pyproject.toml` ที่มี entry point `[project.scripts]` (CLI ที่ติดตั้งได้)
- เฟรมเวิร์ก CLI ใน dependency เช่น `click`, `typer` หรือ `argparse` ของไลบรารีมาตรฐาน
- โครงแบบ src (`src/<pkg>/`) หรือแพ็กเกจที่ราก พร้อม `__init__.py`, `cli.py`/`__main__.py` และ `commands/`

## สิ่งที่ต้องพิจารณา

- gate ตรวจสอบจริง (`ruff check`, `mypy`, `pytest`) บันทึกไว้ตามต้นฉบับทุกตัวอักษร รวมถึง wrapper ใด ๆ ของ Makefile/tox/hatch
- ชื่อ entry ของ console script และโครงสร้างคำสั่ง/คำสั่งย่อย
- skill ที่เหมาะกับสแตก เช่น `command-add`, `subcommand`, `option`/`flag` และ `release` หากเผยแพร่ขึ้น PyPI

## หมายเหตุ

เสถียรภาพของ public API ข้อความช่วยเหลือ และ exit code ล้วนเป็นส่วนที่ผู้ใช้สัมผัส จึงควรปฏิบัติต่อสิ่งเหล่านี้เสมือนมาตรฐาน
