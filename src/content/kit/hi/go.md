---
title: Go
description: "Go प्रोजेक्ट के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें modules, cmd/internal layout, table-driven tests और go test/vet/build गेट के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 20
stack: Go (modules)
---

# Go preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह Go प्रोजेक्ट के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `go.mod` और `go.sum`; एक `package main` entry point, आमतौर पर `cmd/` के अंतर्गत, साझा कोड के साथ `internal/` और `pkg/` में।
- Multi-module repos में एक से अधिक `go.mod` होते हैं; module path `go.mod` के शीर्ष पर रहता है।

## किस बारे में तर्क करें

- वास्तविक गेट: `go test ./...`, `go vet ./...`, `golangci-lint run`, `gofmt -l` (या `go fmt`), और `go build ./...` — हूबहू दर्ज किए गए।
- Package layout (`cmd/`, `internal/`, `pkg/`) और `cmd/` के अंतर्गत कौन-से binaries हैं।
- Code के साथ-साथ रहने वाले table-driven `*_test.go` tests; packages, handlers और tests के लिए stack-उपयुक्त skills।

## टिप्पणियाँ

Module path, binary entry points, और क्या `golangci-lint` या plain `go vet` lint गेट है — यह दर्ज करें।
