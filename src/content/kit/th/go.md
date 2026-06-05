---
title: Go
description: "พรีเซ็ต onboarding สำหรับโครงการ Go พร้อมแนวคิดสำหรับ module, โครงสร้าง cmd/internal, table-driven test และ gate ของ go test/vet/build"
kind: preset
lang: th
order: 20
stack: Go (modules)
---

# พรีเซ็ต Go

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับโครงการ Go นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- `go.mod` และ `go.sum`; entry point `package main` ที่มักอยู่ใน `cmd/` พร้อม shared code ใน `internal/` และ `pkg/`
- Multi-module repo มี `go.mod` มากกว่าหนึ่งไฟล์ โดย module path อยู่ด้านบนของ `go.mod`

## สิ่งที่ต้องให้เหตุผล

- gate จริง: `go test ./...`, `go vet ./...`, `golangci-lint run`, `gofmt -l` (หรือ `go fmt`) และ `go build ./...` โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- โครงสร้างของ package (`cmd/`, `internal/`, `pkg/`) และ binary ใดที่อยู่ใน `cmd/`
- test แบบ table-driven `*_test.go` ที่อยู่ข้างโค้ดที่ทดสอบ; skill ที่เหมาะกับสแตกสำหรับ package, handler และ test

## หมายเหตุ

บันทึก module path, entry point ของ binary และว่าใช้ `golangci-lint` หรือ `go vet` แบบธรรมดาเป็น lint gate
