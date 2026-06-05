---
title: Go
description: "An onboarding preset for Go projects, with reasoning cues for modules, the cmd/internal layout, table-driven tests, and the go test/vet/build gate."
kind: preset
lang: en
order: 20
stack: Go (modules)
---

# Go preset

A reasoning guide the onboard flow uses for Go projects. It is a checklist, not a template — detected reality wins.

## Signals

- `go.mod` and `go.sum`; a `package main` entry point, commonly under `cmd/`, with shared code under `internal/` and `pkg/`.
- Multi-module repos carry more than one `go.mod`; the module path lives at the top of `go.mod`.

## What to reason about

- The real gate: `go test ./...`, `go vet ./...`, `golangci-lint run`, `gofmt -l` (or `go fmt`), and `go build ./...` — captured verbatim.
- The package layout (`cmd/`, `internal/`, `pkg/`) and which binaries live under `cmd/`.
- Table-driven `*_test.go` tests living beside the code they test; stack-appropriate skills for packages, handlers, and tests.

## Notes

Capture the module path, the binary entry points, and whether `golangci-lint` or plain `go vet` is the lint gate.
