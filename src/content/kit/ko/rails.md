---
title: Ruby on Rails
description: "Ruby on Rails 애플리케이션을 위한 온보딩 프리셋으로, MVC 레이아웃, 마이그레이션, 테스트 프레임워크, 애셋 및 설정 파이프라인에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 10
stack: Ruby on Rails
---

# Ruby on Rails 프리셋

onboard 흐름이 Ruby on Rails 애플리케이션에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `rails`가 포함된 `Gemfile`, `bin/rails` 실행 파일, 그리고 `app/{models,controllers,views}` MVC 레이아웃.
- `config/routes.rb`, `db/migrate/` 마이그레이션, `db/schema.rb`.
- 존재하는 항목에서 테스트 프레임워크를 추론합니다: RSpec(`spec/`, `.rspec`) 또는 Minitest(`test/`).

## 추론할 사항

- 실제 테스트 명령(`bin/rails test` 또는 `bundle exec rspec`)과 린트 게이트(`rubocop`) — 그대로 포착합니다.
- 요청 → 라우트 → 컨트롤러 → 모델 → 뷰 흐름, 마이그레이션 워크플로, 자격증명과 설정의 위치.
- 모델, 컨트롤러, 마이그레이션, 그리고 존재할 경우 잡과 메일러에 적합한 스킬.

## 참고

Active Job/Sidekiq와 Hotwire/Turbo의 사용 여부, 그리고 암호화된 자격증명(`config/credentials`) 관리 방식을 포착합니다.
