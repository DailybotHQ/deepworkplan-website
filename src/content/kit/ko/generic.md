---
title: Generic
description: "어떤 프로젝트에든 적용되는 폴백 온보딩 프리셋으로, 리포지토리에서 build와 test 명령을 감지하는 스택 비종속 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 6
stack: Generic
---

# Generic 프리셋

스택별 프리셋이 적용되지 않을 때 onboard 흐름이 사용하는 폴백 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 무엇을 추론할 것인가

- 매니페스트, Makefile, 또는 CI에서 실제 build와 test 명령을 감지합니다 — 그대로 포착합니다.
- 일반적인 관례를 적용하고, 스택별 가정을 하지 않습니다.
- 리포지토리의 실제 워크플로에 맞는 스킬, 에이전트, 문서만 생성합니다.

## 참고

Django, Vue + Vite, Astro/Svelte, Node/TS 서비스, Python 패키지/CLI 중 무엇도 맞지 않을 때의 폴백입니다.
