---
title: Devcontainer
description: "감지된 스택으로부터 compose 기반 devcontainer를 추가하거나 조정하는 선택형 애드온으로, 재빌드를 견디는 영속적 AI-CLI 인증을 제공합니다."
kind: addon
lang: ko
order: 1
---

# Devcontainer 애드온

재현 가능하고 격리된 개발 컨테이너를 리포지토리에 추가합니다. 첫 번째 선택형 Deep Work Plan 애드온입니다.

## 무엇을 더하는가

- 감지된 스택으로부터 추론된 베이스 이미지와 보조 서비스를 갖춘 compose 기반 devcontainer.
- 재빌드를 견디는 영속적 AI-CLI 인증 볼륨(Claude, Codex, Cursor, gh, Dailybot).
- `dailybot-project-network`, `DOCKER_DEV_ENV=vscode` 관례, 그리고 검증 별칭(`codecheck`, `check`, `fix`, `test`).
- 공개 리포지토리의 경우, 비밀 값을 제외하는 `.dockerignore`와 비밀 값이 없는 `.env.example`.

## 동작

devcontainer의 약 85%는 안정적인 공통 골격이고, 나머지 15% — 베이스 이미지, 사용자, 워크스페이스 폴더, 서비스, 포트, 비밀 값 — 는 리포지토리의 실제 스택으로부터 추론됩니다. 기존 devcontainer는 조정되며, 결코 덮어써지지 않습니다.

## 참고

선택형이며 결코 필수가 아닙니다. 리포지토리는 애드온이 하나도 없어도 완전히 적합합니다.
