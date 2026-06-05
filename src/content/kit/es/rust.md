---
title: Rust
description: "Preset de incorporación para proyectos Rust, con pistas de razonamiento para crates, módulos, workspaces de Cargo, features y la compuerta cargo test/clippy/build."
kind: preset
lang: es
order: 19
stack: Rust (Cargo)
---

# Preset Rust

Guía de razonamiento que el flujo de onboard usa para proyectos Rust. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `Cargo.toml` y `Cargo.lock`; un `src/main.rs` (binario) o `src/lib.rs` (biblioteca), con módulos bajo `src/`.
- Un `[workspace]` con `members` para monorrepos multi-crate; `[features]` para capacidades opcionales.

## Qué razonar

- La compuerta real: `cargo test`, `cargo clippy` (a menudo `-- -D warnings`), `cargo fmt --check` y `cargo build --release` — capturados al pie de la letra.
- Tipo de crate (binario vs biblioteca), el árbol de módulos y qué features son por defecto vs opcionales.
- Skills adecuadas al stack para módulos, tipos de error y pruebas de integración vs unitarias (inline `#[cfg(test)]` vs `tests/`).

## Notas

Para workspaces, captura los límites por crate y qué crate es dueño del binario. Anota cualquier `build.rs`, MSRV o límites de `unsafe`.
