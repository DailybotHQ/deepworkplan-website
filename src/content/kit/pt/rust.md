---
title: Rust
description: "Um preset de onboarding para projetos Rust, com pistas de raciocínio para crates, módulos, workspaces Cargo, features e o gate cargo test/clippy/build."
kind: preset
lang: pt
order: 19
stack: Rust (Cargo)
---

# Preset Rust

Um guia de raciocínio que o fluxo de onboarding usa para projetos Rust. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `Cargo.toml` e `Cargo.lock`; um `src/main.rs` (binário) ou `src/lib.rs` (biblioteca), com módulos em `src/`.
- Um `[workspace]` com `members` para monorepos com múltiplos crates; `[features]` para capacidades opcionais.

## Sobre o que raciocinar

- O gate real: `cargo test`, `cargo clippy` (geralmente `-- -D warnings`), `cargo fmt --check` e `cargo build --release` — capturados literalmente.
- Tipo do crate (binário vs biblioteca), a árvore de módulos e quais features são default vs opcionais.
- Skills adequadas à stack para módulos, tipos de erro e testes de integração vs unitários (inline `#[cfg(test)]` vs `tests/`).

## Notas

Para workspaces, capturar as fronteiras por crate e qual crate detém o binário. Observar qualquer `build.rs`, MSRV ou fronteiras `unsafe`.
