---
title: Rust
description: "พรีเซ็ต onboarding สำหรับโครงการ Rust พร้อมแนวคิดสำหรับ crate, module, Cargo workspace, feature และ gate ของ cargo test/clippy/build"
kind: preset
lang: th
order: 19
stack: Rust (Cargo)
---

# พรีเซ็ต Rust

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับโครงการ Rust นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- `Cargo.toml` และ `Cargo.lock`; `src/main.rs` (binary) หรือ `src/lib.rs` (library) พร้อม module ภายใต้ `src/`
- `[workspace]` ที่มี `members` สำหรับ monorepo หลาย crate; `[features]` สำหรับความสามารถที่เลือกได้

## สิ่งที่ต้องให้เหตุผล

- gate จริง: `cargo test`, `cargo clippy` (มักมี `-- -D warnings`), `cargo fmt --check` และ `cargo build --release` โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- ประเภท crate (binary กับ library), module tree และ feature ใดที่เป็น default กับ optional
- skill ที่เหมาะกับสแตกสำหรับ module, error type และ integration กับ unit test (inline `#[cfg(test)]` กับ `tests/`)

## หมายเหตุ

สำหรับ workspace ให้บันทึกขอบเขตของแต่ละ crate และ crate ใดที่เป็นเจ้าของ binary รวมถึง `build.rs`, MSRV หรือขอบเขต `unsafe` ใด ๆ
