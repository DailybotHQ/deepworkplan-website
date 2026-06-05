---
title: Rust
description: "Preset di onboarding per progetti Rust, con spunti di ragionamento per crate, moduli, workspace Cargo, feature e il gate cargo test/clippy/build."
kind: preset
lang: it
order: 19
stack: Rust (Cargo)
---

# Preset Rust

Una guida di ragionamento che il flusso di onboard usa per i progetti Rust. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `Cargo.toml` e `Cargo.lock`; un `src/main.rs` (binario) o `src/lib.rs` (libreria), con moduli sotto `src/`.
- Un `[workspace]` con `members` per monorepo multi-crate; `[features]` per funzionalità opzionali.

## Su cosa ragionare

- Il gate reale: `cargo test`, `cargo clippy` (spesso `-- -D warnings`), `cargo fmt --check` e `cargo build --release` — catturati alla lettera.
- Tipo di crate (binario vs libreria), l'albero dei moduli e quali feature sono predefinite vs opzionali.
- Skill adatte allo stack per moduli, tipi di errore e test di integrazione vs unit (inline `#[cfg(test)]` vs `tests/`).

## Note

Per i workspace, catturare i confini per crate e quale crate possiede il binario. Annotare eventuali `build.rs`, MSRV o confini `unsafe`.
