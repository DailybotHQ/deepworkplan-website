---
title: Go
description: "Go 프로젝트를 위한 온보딩 프리셋으로, 모듈, cmd/internal 레이아웃, 테이블 주도 테스트, go test/vet/build 게이트에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 20
stack: Go (modules)
---

# Go 프리셋

onboard 흐름이 Go 프로젝트에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `go.mod`와 `go.sum`; 주로 `cmd/` 아래의 `package main` 진입점, `internal/`과 `pkg/` 아래의 공유 코드.
- 멀티 모듈 리포지토리는 `go.mod`를 두 개 이상 가집니다; 모듈 경로는 `go.mod` 상단에 있습니다.

## 추론할 사항

- 실제 게이트: `go test ./...`, `go vet ./...`, `golangci-lint run`, `gofmt -l`(또는 `go fmt`), `go build ./...` — 그대로 포착합니다.
- 패키지 레이아웃(`cmd/`, `internal/`, `pkg/`)과 `cmd/` 아래의 바이너리.
- 코드 옆에 위치하는 테이블 주도 `*_test.go` 테스트; 패키지, 핸들러, 테스트에 적합한 스킬.

## 참고

모듈 경로, 바이너리 진입점, `golangci-lint` 또는 단순 `go vet`이 린트 게이트인지 여부를 포착합니다.
