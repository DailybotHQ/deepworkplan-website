---
title: Rust
description: "面向 Rust 项目的接入预设，包含 crate、模块、Cargo workspace、feature 标志以及 cargo test/clippy/build 关卡的推理提示。"
kind: preset
lang: zh
order: 19
stack: Rust (Cargo)
---

# Rust 预设

onboard 流程用于 Rust 项目的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- `Cargo.toml` 与 `Cargo.lock`；一个 `src/main.rs`（可执行文件）或 `src/lib.rs`（库），以及 `src/` 下的各模块。
- 多 crate monorepo 中带有 `members` 的 `[workspace]`；用于可选能力的 `[features]`。

## 需要推理的内容

- 真实的关卡：`cargo test`、`cargo clippy`（通常带 `-- -D warnings`）、`cargo fmt --check` 与 `cargo build --release`——原样捕获。
- crate 类型（可执行文件还是库）、模块树，以及哪些 feature 是默认启用的、哪些是可选的。
- 适合该技术栈的模块、错误类型，以及集成测试与单元测试（内联 `#[cfg(test)]` 还是 `tests/`）相关技能。

## 备注

对于 workspace，捕获各 crate 的边界，以及哪个 crate 拥有可执行入口。记录任何 `build.rs`、MSRV 或 `unsafe` 边界。
