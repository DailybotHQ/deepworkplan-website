---
title: Go
description: "Un preset d'onboarding pour les projets Go, avec des indices de raisonnement sur les modules, la structure cmd/internal, les tests pilotés par table et la porte go test/vet/build."
kind: preset
lang: fr
order: 20
stack: Go (modules)
---

# Preset Go

Un guide de raisonnement que le flux d'onboarding utilise pour les projets Go. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- `go.mod` et `go.sum` ; un point d'entrée `package main`, généralement sous `cmd/`, avec le code partagé sous `internal/` et `pkg/`.
- Les dépôts multi-modules contiennent plusieurs `go.mod` ; le chemin du module se trouve en haut de `go.mod`.

## Sur quoi raisonner

- La vraie porte : `go test ./...`, `go vet ./...`, `golangci-lint run`, `gofmt -l` (ou `go fmt`) et `go build ./...` — capturés verbatim.
- La structure des packages (`cmd/`, `internal/`, `pkg/`) et quels binaires se trouvent sous `cmd/`.
- Les tests `*_test.go` pilotés par table résidant aux côtés du code qu'ils testent ; les skills adaptés à la stack pour les packages, handlers et tests.

## Notes

Capturer le chemin du module, les points d'entrée des binaires et si `golangci-lint` ou le simple `go vet` est la porte de lint.
