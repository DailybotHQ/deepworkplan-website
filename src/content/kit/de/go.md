---
title: Go
description: "Ein Onboarding-Preset für Go-Projekte mit Reasoning-Hinweisen zu Modulen, dem cmd/internal-Layout, tabellengesteuerten Tests und dem go-test/vet/build-Gate."
kind: preset
lang: de
order: 20
stack: Go (modules)
---

# Go-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Go-Projekte nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `go.mod` und `go.sum`; ein `package main`-Einstiegspunkt, üblicherweise unter `cmd/`, mit gemeinsamem Code unter `internal/` und `pkg/`.
- Multi-Modul-Repos enthalten mehr als eine `go.mod`; der Modulpfad steht oben in `go.mod`.

## Worüber nachzudenken ist

- Das echte Gate: `go test ./...`, `go vet ./...`, `golangci-lint run`, `gofmt -l` (oder `go fmt`) und `go build ./...` — wortwörtlich erfasst.
- Das Paket-Layout (`cmd/`, `internal/`, `pkg/`) und welche Binaries unter `cmd/` liegen.
- Tabellengesteuerte `*_test.go`-Tests, die neben dem getesteten Code liegen; stack-passende Skills für Pakete, Handler und Tests.

## Hinweise

Den Modulpfad, die Binary-Einstiegspunkte und ob `golangci-lint` oder einfaches `go vet` das Lint-Gate ist, festhalten.
