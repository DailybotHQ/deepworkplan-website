---
title: Laravel
description: "Laravel 프로젝트를 위한 온보딩 프리셋으로, Eloquent 모델, 컨트롤러, 라우트, 마이그레이션, Artisan 명령, 테스트 러너에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 11
stack: Laravel (PHP)
---

# Laravel 프리셋

onboard 흐름이 Laravel 프로젝트에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `laravel/framework`가 포함된 `composer.json`, `artisan` 콘솔 스크립트, 그리고 `app/` 트리(`Models`, `Http/Controllers`, `Providers`).
- `routes/web.php`와 `routes/api.php`, `database/migrations/`, Eloquent 모델.
- 존재하는 `composer.json`과 설정 파일에서 테스트 러너와 린트/포맷 도구를 추론합니다.

## 추론할 사항

- 실제 테스트 명령(`php artisan test`, `vendor/bin/phpunit`, 또는 `vendor/bin/pest`)과 린트/포맷 게이트(Pint, PHP-CS-Fixer, PHPStan/Larastan) — 그대로 포착합니다.
- 라우팅, 컨트롤러, Eloquent 관례; 마이그레이션 워크플로; 환경 및 설정 레이아웃(`.env`, `config/`).
- 모델, 컨트롤러, 마이그레이션, Artisan 명령에 적합한 스킬.

## 참고

표준 프로젝트 레이아웃을 따르는 Laravel 앱에 유용합니다. 리포지토리가 Sail/Docker를 사용한다면, 테스트와 린트 게이트가 컨테이너 안에서 실행되는지 여부를 포착합니다.
