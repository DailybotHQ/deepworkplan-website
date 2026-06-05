---
title: Go
description: "Go projeleri için modüller, cmd/internal düzeni, tablo güdümlü testler ve go test/vet/build kapısına yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 20
stack: Go (modules)
---

# Go ön ayarı

Onboarding akışının Go projeleri için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `go.mod` ve `go.sum`; yaygın olarak `cmd/` altında bir `package main` giriş noktası, `internal/` ve `pkg/` altında paylaşılan kod.
- Çok modüllü depolar birden fazla `go.mod` içerir; modül yolu `go.mod`'un en üstünde yer alır.

## Neyin üzerine akıl yürütülmeli

- Gerçek kapı: `go test ./...`, `go vet ./...`, `golangci-lint run`, `gofmt -l` (veya `go fmt`) ve `go build ./...` — birebir kaydedilir.
- Paket düzeni (`cmd/`, `internal/`, `pkg/`) ve `cmd/` altındaki ikili dosyalar.
- Test ettikleri kodun yanında yer alan tablo güdümlü `*_test.go` testleri; paketler, işleyiciler ve testler için yığına uygun skill'ler.

## Notlar

Modül yolunu, ikili giriş noktalarını ve lint kapısının `golangci-lint` mi yoksa sade `go vet` mi olduğunu kaydedin.
