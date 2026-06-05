---
title: Rust
description: "Rust projeleri için crate'ler, modüller, Cargo çalışma alanları, özellikler ve cargo test/clippy/build kapısına yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 19
stack: Rust (Cargo)
---

# Rust ön ayarı

Onboarding akışının Rust projeleri için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `Cargo.toml` ve `Cargo.lock`; bir `src/main.rs` (ikili) veya `src/lib.rs` (kütüphane), `src/` altında modüller.
- Çok crate'li monorepo'lar için `members` içeren bir `[workspace]`; isteğe bağlı yetenekler için `[features]`.

## Neyin üzerine akıl yürütülmeli

- Gerçek kapı: `cargo test`, `cargo clippy` (çoğunlukla `-- -D warnings`), `cargo fmt --check` ve `cargo build --release` — birebir kaydedilir.
- Crate türü (ikili ya da kütüphane), modül ağacı ve hangi özelliklerin varsayılan ile isteğe bağlı olduğu.
- Modüller, hata türleri ve entegrasyon ile birim testleri (satır içi `#[cfg(test)]` ile `tests/` karşılaştırması) için yığına uygun skill'ler.

## Notlar

Çalışma alanları için crate başına sınırları ve ikiliyi hangi crate'in barındırdığını kaydedin. Varsa `build.rs`, MSRV veya `unsafe` sınırlarını not edin.
