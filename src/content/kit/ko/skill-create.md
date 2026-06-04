---
title: skill-create
description: "현재 리포지토리에 새 재사용 가능한 스킬 — 매개변수화된 세션 내 절차 — 을 author 하위 스킬을 통해 생성하고 카탈로그를 동기화 상태로 유지합니다."
kind: command
lang: ko
order: 7
usage: /skill-create
---

# skill-create

현재 리포지토리에 새 스킬을 생성합니다. Deep Work Plan **author** 하위 스킬에 대한 얇은 위임자입니다.

## 하는 일

`skill-create`는 author 하위 스킬의 스킬 생성 흐름으로 라우팅합니다. 스킬은 세션 안에서 실행되는 재사용 가능하고 매개변수화된 절차입니다(예: `/fix-lint`). "X를 어떻게 하는가"를 부호화하며 `.agents/skills/<name>/SKILL.md` 아래에 존재합니다.

## 사용법

```
/skill-create
```

## 동작

1. 리포지토리의 `.agents/` 구조와 로컬 관례를 감지합니다.
2. 실제로 반복 가능한 워크플로가 존재하는지 확인하고, kebab-case로 이름을 짓습니다.
3. `SKILL.md`를 구성하고 채웁니다(목표, 사용 시점, 단계, 검증).
4. 필요하면 얇은 명령 위임자를 추가합니다.
5. 그에 맞게 `.agents/docs/` 카탈로그를 갱신합니다.

## 참고

에이전트에는 `/agent-create`를 사용하세요. 로직은 스킬에 두고, 명령은 얇게 유지합니다.
