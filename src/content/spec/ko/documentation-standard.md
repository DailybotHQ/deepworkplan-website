---
title: 문서화 표준
description: "Deep Work Plan이 구조, 작업, 진행 상황을 문서화하는 방식에 대한 규범적 표준: README 규칙, 상태 표시, 그리고 두 개의 필수 최종 작업."
order: 1
lang: ko
section: Standard
---

# 문서화 표준

**버전 1.0.** 이 표준은 Deep Work Plan이 구조, 작업, 진행 상황을 문서화하는 방식을 정의합니다. DWP 방법론 아래에서 생성된 모든 계획에 적용됩니다. 키워드 MUST, SHOULD, MAY는 RFC 2119에 정의된 대로 사용됩니다.

## 계획 README

모든 계획은 다음을 담은 `README.md`를 가져야(MUST) 합니다.

- **제목(Title)** — `# Deep Work Plan: <name>`.
- **목표(Goal)** — 계획의 목적에 대한 산문 진술.
- **원천 자료(Source material)** — 정규 입력에 대한 링크나 경로(선택).
- **작업(Tasks)** — 작업 번호, 이름, 상태 체크박스를 담은 Markdown 표.
- **상태(Status)** — `<n>/<total> tasks complete` 형식의 줄.

## 작업 파일

각 작업 파일은 `<n>.task_<slug>.md`라는 이름이어야(MUST) 하며 아홉 절 구조를 담아야 합니다.

## PROGRESS.md

`PROGRESS.md`는 추가 전용 실행 로그입니다. 각 항목은 다음을 기록해야(MUST) 합니다.

- ISO 8601 타임스탬프.
- 작업 번호와 이름.
- 수행한 일.
- 모든 이탈이나 건너뜀 이유.

## 상태 표시

- `[ ]` — 시작 안 함.
- `[~]` — 진행 중.
- `[x]` — 완료.
- `[!]` — 차단됨.

## 제목

모든 제목은 문장형 대소문자(sentence case)를 사용해야(MUST) 합니다. 문서는 마케팅 표현과 느낌표를 피해야(SHOULD) 합니다.

## 두 개의 필수 최종 작업

모든 계획은 두 개의 표준 작업으로 끝나야(MUST) 합니다.

1. **스킬 & 에이전트 발견(Skills & Agents Discovery)** — 만들어진 재사용 가능한 스킬과 에이전트를 식별합니다.
2. **임원 보고서(Executive Report)** — 이해관계자를 위한 결과 요약.
