---
title: "DWP v1: 계획 루프에서 이식 가능한 하니스로"
description: "Deep Work Plan은 단일 계획 작성 루프에서, 신뢰와 출처, 더 폭넓은 에이전트 호스트 지원, 어떤 저장소에서든 실행할 수 있는 적합성 검사기를 갖춘 이식 가능한 도입 키트로 성장합니다."
date: 2026-06-12
version: "v1 · 기반"
kind: foundation
lang: ko
order: 4
featured: false
sourceLabel: "Skill changelog 2.3.0–2.16.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md"
---

지금까지 Deep Work Plan은 하나의 세션 안에서 하나의 에이전트가 따르는 계획 작성 루프였습니다. 이번 릴리스 시리즈는 이를 저장소가 자신의 조건에 맞게 도입할 수 있는 것으로 바꿉니다——단일 에이전트와 단일 세션을 넘어서기 위한 첫 번째 버전입니다.

이 스킬은 체크섬 기반 출처를 갖춘 신뢰 선언문을 얻어, 개발자가 설치하기 전에 무엇을 읽고 쓰는지 정확히 확인할 수 있습니다. 온보딩 프리셋과 지원되는 에이전트 호스트가 크게 확장되고, 테스트 규율은 나중에 덧붙이는 것이 아니라 모든 작업의 핵심 요소가 됩니다. 적합성 검사기는 저장소가 표준을 충족하는지—추측이 아니라 객관적으로—검증할 수 있게 해줍니다. 상태 및 재개 프로토콜 덕분에 중단된 계획은 처음부터 다시 시작하는 대신 멈춘 지점에서 이어갈 수 있습니다. 내부적으로는 `.claude`와 `.cursor` 호환성이 하나의 표준 디렉터리인 `.agents`로 통합되어, 지원되는 모든 에이전트가 동일한 키트를 읽습니다.

이러한 릴리스들은 다음 단계를 위한 기반을 마련합니다. 저장소는 더 이상 단순히 계획이 저장되는 곳에 머무르지 않고, 에이전트의 작업 하니스가 되기 시작합니다.

전체 흐름은 [스킬의 릴리스 이력](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md)에서 확인하세요.
