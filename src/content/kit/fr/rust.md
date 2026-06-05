---
title: Rust
description: "Un preset d'onboarding pour les projets Rust, avec des indices de raisonnement sur les crates, modules, workspaces Cargo, les features et la porte cargo test/clippy/build."
kind: preset
lang: fr
order: 19
stack: Rust (Cargo)
---

# Preset Rust

Un guide de raisonnement que le flux d'onboarding utilise pour les projets Rust. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- `Cargo.toml` et `Cargo.lock` ; un `src/main.rs` (binaire) ou `src/lib.rs` (bibliothèque), avec des modules sous `src/`.
- Un `[workspace]` avec `members` pour les monorepos multi-crates ; `[features]` pour les capacités optionnelles.

## Sur quoi raisonner

- La vraie porte : `cargo test`, `cargo clippy` (souvent `-- -D warnings`), `cargo fmt --check` et `cargo build --release` — capturés verbatim.
- Le type de crate (binaire vs bibliothèque), l'arbre de modules et quelles features sont par défaut vs optionnelles.
- Les skills adaptés à la stack pour les modules, les types d'erreurs et les tests d'intégration vs unitaires (inline `#[cfg(test)]` vs `tests/`).

## Notes

Pour les workspaces, capturer les frontières par crate et quelle crate possède le binaire. Noter tout `build.rs`, MSRV ou frontière `unsafe`.
