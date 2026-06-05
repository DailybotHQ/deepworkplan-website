---
title: Go
description: "Preset onboarding untuk proyek Go, dengan petunjuk penalaran untuk modul, tata letak cmd/internal, test berbasis tabel, dan gate go test/vet/build."
kind: preset
lang: id
order: 20
stack: Go (modules)
---

# Preset Go

Panduan penalaran yang dipakai alur onboard untuk proyek Go. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `go.mod` dan `go.sum`; sebuah titik masuk `package main`, umumnya di bawah `cmd/`, dengan kode bersama di bawah `internal/` dan `pkg/`.
- Repositori multi-modul memiliki lebih dari satu `go.mod`; path modul berada di bagian atas `go.mod`.

## Yang perlu dipertimbangkan

- Gate yang sebenarnya: `go test ./...`, `go vet ./...`, `golangci-lint run`, `gofmt -l` (atau `go fmt`), dan `go build ./...` — dicatat apa adanya.
- Tata letak paket (`cmd/`, `internal/`, `pkg/`) dan binary mana yang berada di bawah `cmd/`.
- Test `*_test.go` berbasis tabel yang berada berdampingan dengan kode yang diuji; skill yang sesuai stack untuk paket, handler, dan test.

## Catatan

Catat path modul, titik masuk binary, dan apakah `golangci-lint` atau `go vet` biasa yang menjadi gate lint.
