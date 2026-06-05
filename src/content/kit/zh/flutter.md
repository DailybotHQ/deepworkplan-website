---
title: Flutter
description: "面向 Flutter 与 Dart 项目的接入预设，包含 Widget、分析器、状态管理、代码生成与 flutter test 的推理提示。"
kind: preset
lang: zh
order: 17
stack: Flutter (Dart)
---

# Flutter 预设

onboard 流程用于 Flutter 与 Dart 项目的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- 带有 `flutter` 依赖项的 `pubspec.yaml`，以及包含 `runApp`/`MaterialApp` 入口的 `lib/main.dart`。
- Widget（`StatelessWidget`/`StatefulWidget`）、`analysis_options.yaml`，以及带有 `flutter test` 的 `test/` 目录。
- 状态管理方案（Provider、Riverpod 或 Bloc），以及代码生成工具（`build_runner`、`json_serializable`，如有）。

## 需要推理的内容

- 真实的测试（`flutter test`）、分析（`flutter analyze`）、格式化（`dart format`）与构建（`flutter build <target>`）命令——原样捕获。
- 使用中的状态管理方案，以及 `lib/` 下的 Widget 与功能目录结构。
- 是否使用了代码生成（`dart run build_runner build`），以及存在哪些构建目标。

## 备注

从 `pubspec.yaml` 中确认状态管理库及任何 `build_runner` 步骤——两者都会影响生成的技能。
