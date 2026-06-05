---
title: Rust
description: "Preset onboarding cho dự án Rust, với gợi ý suy luận về crate, module, Cargo workspace, feature và cổng cargo test/clippy/build."
kind: preset
lang: vi
order: 19
stack: Rust (Cargo)
---

# Rust preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho dự án Rust. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- `Cargo.toml` và `Cargo.lock`; một `src/main.rs` (binary) hoặc `src/lib.rs` (library), với các module trong `src/`.
- Một `[workspace]` có `members` cho monorepo nhiều crate; `[features]` cho các tính năng tùy chọn.

## Cần suy luận về điều gì

- Cổng kiểm chứng thực tế: `cargo test`, `cargo clippy` (thường `-- -D warnings`), `cargo fmt --check`, và `cargo build --release` — ghi lại nguyên văn.
- Loại crate (binary vs library), cây module, và các feature nào là mặc định vs tùy chọn.
- Các skill phù hợp với stack cho module, kiểu lỗi, và integration vs unit test (inline `#[cfg(test)]` vs `tests/`).

## Ghi chú

Với workspace, ghi lại ranh giới từng crate và crate nào sở hữu binary. Ghi chú bất kỳ `build.rs`, MSRV hoặc ranh giới `unsafe` nào.
