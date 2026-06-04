---
title: Dependency upgrade
description: "리포지토리의 의존성을 검증되고 되돌릴 수 있는 배치 단위로 업그레이드하는 선택형, 패키지 관리자 비종속 애드온으로, npm을 가정하지 않고 실제 관리자를 감지합니다."
kind: addon
lang: ko
order: 3
---

# Dependency-upgrade 애드온

배치 단위의, 검증되고 되돌릴 수 있는 워크플로로 리포지토리의 의존성을 최신 상태로 만듭니다. 세 번째 선택형 Deep Work Plan 애드온입니다.

## 무엇을 더하는가

- 존재하는 매니페스트와 lockfile에서 리포지토리의 **실제** 패키지 관리자(npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer 등) 감지.
- **채택될 때만** `.agents/commands/`에 설치되는 `/lib-upgrade` 명령.

## 동작

1. 깨끗한(또는 백업된) 작업 트리를 요구합니다.
2. 업그레이드를 semver로 분류합니다 — patch, minor, major. major는 명시적 승인을 요구합니다.
3. 작고 일관된 배치 단위로 업그레이드합니다. 한꺼번에 하지 않습니다.
4. 각 배치 후 리포지토리의 실제 검증 게이트를 실행하고, 실패한 배치는 되돌립니다.
5. 업그레이드, 건너뜀, 되돌림 내역을 요약하고, 커밋은 개발자에게 맡깁니다.

## 참고

패키지 관리자 비종속 — JS가 아닌 리포지토리에서 npm/ncu를 결코 실행하지 않습니다. 선택형이며, 결코 필수가 아니고, 자동 커밋을 하지 않습니다.
