---
title: Rust
description: "Rust 프로젝트를 위한 온보딩 프리셋으로, 크레이트, 모듈, Cargo 워크스페이스, 피처, cargo test/clippy/build 게이트에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 19
stack: Rust (Cargo)
---

# Rust 프리셋

onboard 흐름이 Rust 프로젝트에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `Cargo.toml`과 `Cargo.lock`; `src/main.rs`(바이너리) 또는 `src/lib.rs`(라이브러리), `src/` 아래의 모듈.
- 멀티 크레이트 모노레포를 위한 `members`가 있는 `[workspace]`; 선택적 기능을 위한 `[features]`.

## 추론할 사항

- 실제 게이트: `cargo test`, `cargo clippy`(종종 `-- -D warnings`), `cargo fmt --check`, `cargo build --release` — 그대로 포착합니다.
- 크레이트 타입(바이너리 대 라이브러리), 모듈 트리, 기본 대 선택적 피처.
- 모듈, 오류 타입, 통합 대 단위 테스트(인라인 `#[cfg(test)]` 대 `tests/`)에 적합한 스킬.

## 참고

워크스페이스의 경우 크레이트별 경계와 바이너리를 소유하는 크레이트를 포착합니다. `build.rs`, MSRV, `unsafe` 경계를 기록합니다.
