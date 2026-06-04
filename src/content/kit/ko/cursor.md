---
title: Cursor
description: "Cursor AI를 위한 DWP 어댑터로, 프로젝트 규칙 시스템과 해시 명령 접두어를 통해 완전히 지원합니다. Cursor가 슬래시를 자체적으로 예약하기 때문입니다."
kind: adapter
lang: ko
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Cursor 어댑터

Cursor는 프로젝트 규칙과 명령 파일을 통해 DWP를 지원합니다.

## 지원 수준

**완전** — DWP 명령이 Cursor의 규칙 시스템을 통해 작동합니다.

## 설치

DWP 명령은 프로젝트 아래에 Markdown으로 존재합니다. Cursor가 규칙 시스템을 통해 그것들을 읽습니다.

## 호출

`#` 접두어를 사용하세요(Cursor가 `/`를 가로챕니다).

```
#dwp-create <goal>
#dwp-execute
```

## 참고

Cursor가 `/`를 자체 명령용으로 예약하므로 `#`를 사용하세요.
