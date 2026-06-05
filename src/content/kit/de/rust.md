---
title: Rust
description: "Ein Onboarding-Preset für Rust-Projekte mit Reasoning-Hinweisen zu Crates, Modulen, Cargo-Workspaces, Features und dem cargo-test/clippy/build-Gate."
kind: preset
lang: de
order: 19
stack: Rust (Cargo)
---

# Rust-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Rust-Projekte nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `Cargo.toml` und `Cargo.lock`; eine `src/main.rs` (Binary) oder `src/lib.rs` (Library) mit Modulen unter `src/`.
- Ein `[workspace]` mit `members` für Multi-Crate-Monorepos; `[features]` für optionale Fähigkeiten.

## Worüber nachzudenken ist

- Das echte Gate: `cargo test`, `cargo clippy` (oft `-- -D warnings`), `cargo fmt --check` und `cargo build --release` — wortwörtlich erfasst.
- Crate-Typ (Binary vs. Library), der Modulbaum und welche Features Standard vs. optional sind.
- Stack-passende Skills für Module, Fehlertypen und Integrations- vs. Unit-Tests (inline `#[cfg(test)]` vs. `tests/`).

## Hinweise

Bei Workspaces die Grenzen der einzelnen Crates festhalten und ermitteln, welches Crate das Binary besitzt. Etwaige `build.rs`-, MSRV- oder `unsafe`-Grenzen notieren.
