---
title: Rust
description: "Preset onboardingowy dla projektów Rust, ze wskazówkami do rozumowania o skrzynkach, modułach, workspace Cargo, funkcjach i bramce cargo test/clippy/build."
kind: preset
lang: pl
order: 19
stack: Rust (Cargo)
---

# Preset Rust

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla projektów Rust. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `Cargo.toml` i `Cargo.lock`; `src/main.rs` (binarium) lub `src/lib.rs` (biblioteka) z modułami pod `src/`.
- `[workspace]` z `members` dla monorepo wielu skrzynek; `[features]` dla opcjonalnych możliwości.

## O czym należy rozumować

- Rzeczywista bramka: `cargo test`, `cargo clippy` (często `-- -D warnings`), `cargo fmt --check` i `cargo build --release` — zapisane dosłownie.
- Typ skrzynki (binarium vs biblioteka), drzewo modułów oraz które funkcje są domyślne, a które opcjonalne.
- Skille właściwe dla stosu dotyczące modułów, typów błędów oraz testów integracyjnych vs jednostkowych (inline `#[cfg(test)]` vs `tests/`).

## Uwagi

Dla workspace zapisz granice poszczególnych skrzynek i która skrzynka jest właścicielem binariumów. Zanotuj wszelkie `build.rs`, MSRV lub granice `unsafe`.
