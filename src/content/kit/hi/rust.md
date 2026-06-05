---
title: Rust
description: "Rust प्रोजेक्ट के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें crates, modules, Cargo workspaces, features और cargo test/clippy/build गेट के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 19
stack: Rust (Cargo)
---

# Rust preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह Rust प्रोजेक्ट के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `Cargo.toml` और `Cargo.lock`; एक `src/main.rs` (binary) या `src/lib.rs` (library), `src/` के अंतर्गत modules के साथ।
- Multi-crate monorepos के लिए `members` के साथ एक `[workspace]`; वैकल्पिक क्षमताओं के लिए `[features]`।

## किस बारे में तर्क करें

- वास्तविक गेट: `cargo test`, `cargo clippy` (अक्सर `-- -D warnings`), `cargo fmt --check`, और `cargo build --release` — हूबहू दर्ज किए गए।
- Crate type (binary बनाम library), module वृक्ष, और कौन-से features default बनाम optional हैं।
- Modules, error types, और integration बनाम unit tests (inline `#[cfg(test)]` बनाम `tests/`) के लिए stack-उपयुक्त skills।

## टिप्पणियाँ

Workspaces के लिए, per-crate सीमाएँ और कौन-सा crate binary का मालिक है यह दर्ज करें। कोई भी `build.rs`, MSRV, या `unsafe` सीमाएँ नोट करें।
