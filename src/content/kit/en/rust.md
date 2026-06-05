---
title: Rust
description: "An onboarding preset for Rust projects, with reasoning cues for crates, modules, Cargo workspaces, features, and the cargo test/clippy/build gate."
kind: preset
lang: en
order: 19
stack: Rust (Cargo)
---

# Rust preset

A reasoning guide the onboard flow uses for Rust projects. It is a checklist, not a template — detected reality wins.

## Signals

- `Cargo.toml` and `Cargo.lock`; a `src/main.rs` (binary) or `src/lib.rs` (library), with modules under `src/`.
- A `[workspace]` with `members` for multi-crate monorepos; `[features]` for optional capabilities.

## What to reason about

- The real gate: `cargo test`, `cargo clippy` (often `-- -D warnings`), `cargo fmt --check`, and `cargo build --release` — captured verbatim.
- Crate type (binary vs library), the module tree, and which features are default vs optional.
- Stack-appropriate skills for modules, error types, and integration vs unit tests (inline `#[cfg(test)]` vs `tests/`).

## Notes

For workspaces, capture per-crate boundaries and which crate owns the binary. Note any `build.rs`, MSRV, or `unsafe` boundaries.
