---
title: Go
description: "Preset di onboarding per progetti Go, con spunti di ragionamento per moduli, il layout cmd/internal, test table-driven e il gate go test/vet/build."
kind: preset
lang: it
order: 20
stack: Go (modules)
---

# Preset Go

Una guida di ragionamento che il flusso di onboard usa per i progetti Go. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `go.mod` e `go.sum`; un entrypoint `package main`, comunemente sotto `cmd/`, con codice condiviso sotto `internal/` e `pkg/`.
- I repo multi-modulo contengono più di un `go.mod`; il module path si trova in cima a `go.mod`.

## Su cosa ragionare

- Il gate reale: `go test ./...`, `go vet ./...`, `golangci-lint run`, `gofmt -l` (o `go fmt`) e `go build ./...` — catturati alla lettera.
- Il layout dei package (`cmd/`, `internal/`, `pkg/`) e quali binari si trovano sotto `cmd/`.
- Test `*_test.go` table-driven che risiedono accanto al codice che testano; skill adatte allo stack per package, handler e test.

## Note

Catturare il module path, gli entrypoint dei binari e se `golangci-lint` o il semplice `go vet` è il gate di lint.
