---
title: Go
description: "Preset de incorporación para proyectos Go, con pistas de razonamiento para módulos, la estructura cmd/internal, pruebas dirigidas por tabla y la compuerta go test/vet/build."
kind: preset
lang: es
order: 20
stack: Go (modules)
---

# Preset Go

Guía de razonamiento que el flujo de onboard usa para proyectos Go. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `go.mod` y `go.sum`; un punto de entrada `package main`, habitualmente bajo `cmd/`, con código compartido bajo `internal/` y `pkg/`.
- Los repos multi-módulo llevan más de un `go.mod`; la ruta del módulo vive al principio de `go.mod`.

## Qué razonar

- La compuerta real: `go test ./...`, `go vet ./...`, `golangci-lint run`, `gofmt -l` (o `go fmt`) y `go build ./...` — capturados al pie de la letra.
- La estructura de paquetes (`cmd/`, `internal/`, `pkg/`) y qué binarios viven bajo `cmd/`.
- Pruebas `*_test.go` dirigidas por tabla que residen junto al código que prueban; skills adecuadas al stack para paquetes, manejadores y pruebas.

## Notas

Captura la ruta del módulo, los puntos de entrada de los binarios y si `golangci-lint` o el simple `go vet` es la compuerta de lint.
