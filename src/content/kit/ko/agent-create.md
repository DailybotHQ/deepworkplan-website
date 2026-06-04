---
title: agent-create
description: "현재 리포지토리에 새 에이전트 — 자체 모델 등급과 도구를 가진 특화된 작업자 — 를 author 하위 스킬을 통해 생성하고 카탈로그를 동기화 상태로 유지합니다."
kind: command
lang: ko
order: 8
usage: /agent-create
---

# agent-create

현재 리포지토리에 새 에이전트를 생성합니다. Deep Work Plan **author** 하위 스킬에 대한 얇은 위임자입니다.

## 하는 일

`agent-create`는 author 하위 스킬의 에이전트 생성 흐름으로 라우팅합니다. 에이전트는 어떤 부류의 작업을 처리하도록 파견되는 특화된 작업자 정의(역할, 모델 등급, 도구, 시스템 프롬프트)입니다. "누가 X를 하는가"를 부호화하며 `.agents/agents/<name>.md` 아래에 존재합니다.

## 사용법

```
/agent-create
```

## 동작

1. 리포지토리의 `.agents/` 구조와 로컬 관례를 감지합니다.
2. 별도의 모델·도구 요구가 있는 반복되는 역할을 확인하고, kebab-case로 이름을 짓습니다.
3. 에이전트를 구성하고 채웁니다(역할, 입력, 프로세스, 출력, 에스컬레이션).
4. 벤더 모델 ID를 하드코딩하지 않고 — light, standard, heavy 중 — 정당한 모델 등급을 선택합니다.
5. 그에 맞게 `.agents/docs/` 카탈로그를 갱신합니다.

## 참고

절차에는 `/skill-create`를 사용하세요. 모델 등급은 추상적으로 유지하고 리포지토리 설정에서 매핑하세요.
