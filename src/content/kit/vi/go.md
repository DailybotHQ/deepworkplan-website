---
title: Go
description: "Preset onboarding cho dự án Go, với gợi ý suy luận về module, bố cục cmd/internal, table-driven test và cổng go test/vet/build."
kind: preset
lang: vi
order: 20
stack: Go (modules)
---

# Go preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho dự án Go. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- `go.mod` và `go.sum`; một entrypoint `package main`, thường nằm trong `cmd/`, với mã dùng chung trong `internal/` và `pkg/`.
- Repo đa module chứa nhiều hơn một `go.mod`; đường dẫn module nằm ở đầu `go.mod`.

## Cần suy luận về điều gì

- Cổng kiểm chứng thực tế: `go test ./...`, `go vet ./...`, `golangci-lint run`, `gofmt -l` (hoặc `go fmt`), và `go build ./...` — ghi lại nguyên văn.
- Bố cục package (`cmd/`, `internal/`, `pkg/`) và những binary nào nằm trong `cmd/`.
- Các test `*_test.go` dạng table-driven đặt cạnh mã chúng kiểm thử; các skill phù hợp với stack cho package, handler và test.

## Ghi chú

Ghi lại đường dẫn module, các entrypoint binary, và liệu `golangci-lint` hay `go vet` thuần là cổng lint.
