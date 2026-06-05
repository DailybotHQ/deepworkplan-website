---
title: Go
description: "面向 Go 项目的接入预设，包含模块、cmd/internal 目录结构、表驱动测试以及 go test/vet/build 关卡的推理提示。"
kind: preset
lang: zh
order: 20
stack: Go (modules)
---

# Go 预设

onboard 流程用于 Go 项目的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- `go.mod` 与 `go.sum`；一个 `package main` 入口点（通常位于 `cmd/` 下），共享代码位于 `internal/` 与 `pkg/` 下。
- 多模块仓库包含多个 `go.mod`；模块路径位于 `go.mod` 的顶部。

## 需要推理的内容

- 真实的关卡：`go test ./...`、`go vet ./...`、`golangci-lint run`、`gofmt -l`（或 `go fmt`）与 `go build ./...`——原样捕获。
- 包结构（`cmd/`、`internal/`、`pkg/`），以及哪些可执行文件位于 `cmd/` 下。
- 与被测代码并列存放的表驱动 `*_test.go` 测试；适合该技术栈的包、处理器与测试相关技能。

## 备注

捕获模块路径、可执行文件入口点，以及使用的是 `golangci-lint` 还是普通的 `go vet` 作为代码检查关卡。
