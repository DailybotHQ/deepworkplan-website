---
title: Django
description: "Django 프로젝트를 위한 온보딩 프리셋으로, 앱, 마이그레이션, 설정, 관리 명령, 테스트 러너에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 1
stack: Django
---

# Django 프리셋

onboard 흐름이 Django 프로젝트에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `manage.py`와 `settings.py`. `models.py`, `views.py`, `migrations/`를 갖춘 앱.
- 존재하는 매니페스트와 lockfile에서 추론된 패키지 관리자와 테스트 러너.

## 무엇을 추론할 것인가

- 실제 테스트 명령(흔히 `python manage.py test` 또는 `pytest`)과 lint/타입 검사 게이트 — 그대로 포착합니다.
- 앱과 마이그레이션 관례, 설정과 환경 구성, 그리고 관리 명령 패턴.
- 앱, 모델, 뷰, 마이그레이션을 위한 스택에 맞는 스킬.

## 참고

표준 프로젝트 구성을 따르는 Django 앱에 유용합니다.
