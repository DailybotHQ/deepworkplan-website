---
title: Go
description: "Preset onboardingowy dla projektów Go, ze wskazówkami do rozumowania o modułach, układzie cmd/internal, testach table-driven i bramce go test/vet/build."
kind: preset
lang: pl
order: 20
stack: Go (modules)
---

# Preset Go

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla projektów Go. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `go.mod` i `go.sum`; punkt wejścia `package main`, zazwyczaj pod `cmd/`, ze współdzielonym kodem pod `internal/` i `pkg/`.
- Repozytoria wielu modułów zawierają więcej niż jeden `go.mod`; ścieżka modułu znajduje się na górze pliku `go.mod`.

## O czym należy rozumować

- Rzeczywista bramka: `go test ./...`, `go vet ./...`, `golangci-lint run`, `gofmt -l` (lub `go fmt`) i `go build ./...` — zapisane dosłownie.
- Układ pakietów (`cmd/`, `internal/`, `pkg/`) oraz które binaria znajdują się pod `cmd/`.
- Testy table-driven w plikach `*_test.go` obok testowanego kodu; skille właściwe dla stosu dotyczące pakietów, handlerów i testów.

## Uwagi

Zapisz ścieżkę modułu, punkty wejścia binarnych plików wykonywalnych oraz to, czy `golangci-lint` czy zwykły `go vet` jest bramką lint.
