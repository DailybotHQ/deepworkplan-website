---
title: Rust
description: "Preset onboarding untuk proyek Rust, dengan petunjuk penalaran untuk crate, modul, Cargo workspace, fitur, dan gate cargo test/clippy/build."
kind: preset
lang: id
order: 19
stack: Rust (Cargo)
---

# Preset Rust

Panduan penalaran yang dipakai alur onboard untuk proyek Rust. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `Cargo.toml` dan `Cargo.lock`; sebuah `src/main.rs` (binary) atau `src/lib.rs` (library), dengan modul di bawah `src/`.
- Sebuah `[workspace]` dengan `members` untuk monorepo multi-crate; `[features]` untuk kemampuan opsional.

## Yang perlu dipertimbangkan

- Gate yang sebenarnya: `cargo test`, `cargo clippy` (sering `-- -D warnings`), `cargo fmt --check`, dan `cargo build --release` — dicatat apa adanya.
- Jenis crate (binary vs library), pohon modul, serta fitur mana yang default vs opsional.
- Skill yang sesuai stack untuk modul, tipe error, serta test integrasi vs unit (inline `#[cfg(test)]` vs `tests/`).

## Catatan

Untuk workspace, catat batas per-crate dan crate mana yang memiliki binary. Catat `build.rs`, MSRV, atau batas `unsafe` apa pun.
