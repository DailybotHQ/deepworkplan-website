---
title: deepworkplan-onboard
description: "리포지토리의 스택과 아키타입을 추론해 AI-first로 만든 뒤, 적응된 AGENTS.md, docs/, .agents/, gitignore된 .dwp/를 생성합니다."
kind: command
lang: ko
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

리포지토리를 AI-first이며 스펙 주도인 코드베이스로 바꿉니다. 이것은 Deep Work Plan 스킬의 onboard 하위 스킬입니다.

## 하는 일

`deepworkplan-onboard`는 **실제** 리포지토리 — 언어, 프레임워크, 패키지 관리자, build/test/lint 명령, 모듈, 테스트 관례, 배포 형태 — 를 살펴보고 그에 적응된 산출물을 생성합니다. 추론하며, 결코 템플릿을 복사하거나 플레이스홀더를 남기지 않습니다.

## 사용법

```
/deepworkplan-onboard
```

## 동작

1. 정찰 — 실제 스택과 검증 명령을 감지하고, 가장 가까운 온보딩 프리셋을 매칭합니다.
2. 아키타입 — 개별 리포지토리 또는 오케스트레이터 허브로 분류합니다.
3. 실제 Quick Commands 블록을 갖춘 `AGENTS.md`와 `CLAUDE.md` 심링크를 생성합니다.
4. `docs/`(아키텍처, 표준, 테스트, 보안 등)와 모듈별 문서를 생성합니다.
5. `.agents/`(에이전트, 얇은 `dwp-*` 명령, 스택에 맞는 스킬, 카탈로그)와 `.claude → .agents`를 생성합니다.
6. 스킬을 설치하고 gitignore된 `.dwp/`(계획, 초안)와 `tmp/` 스크래치 공간을 구성합니다.
7. 선택형 애드온을 제안한 뒤 자체 점검합니다.

## 참고

리포지토리는 애드온이 하나도 없어도 완전히 적합합니다. 감지된 현실이 언제나 프리셋 가정보다 우선합니다.
