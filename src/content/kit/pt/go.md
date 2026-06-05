---
title: Go
description: "Um preset de onboarding para projetos Go, com pistas de raciocínio para módulos, o layout cmd/internal, testes orientados a tabela e o gate go test/vet/build."
kind: preset
lang: pt
order: 20
stack: Go (modules)
---

# Preset Go

Um guia de raciocínio que o fluxo de onboarding usa para projetos Go. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `go.mod` e `go.sum`; um entry point `package main`, comumente em `cmd/`, com código compartilhado em `internal/` e `pkg/`.
- Repositórios com múltiplos módulos possuem mais de um `go.mod`; o caminho do módulo fica no topo de `go.mod`.

## Sobre o que raciocinar

- O gate real: `go test ./...`, `go vet ./...`, `golangci-lint run`, `gofmt -l` (ou `go fmt`) e `go build ./...` — capturados literalmente.
- O layout de pacotes (`cmd/`, `internal/`, `pkg/`) e quais binários ficam em `cmd/`.
- Testes `*_test.go` orientados a tabela ao lado do código que testam; skills adequadas à stack para pacotes, handlers e testes.

## Notas

Capturar o caminho do módulo, os entry points dos binários e se `golangci-lint` ou o simples `go vet` é o gate de lint.
