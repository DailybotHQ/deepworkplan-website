---
title: Flutter
description: "Flutter および Dart プロジェクト向けのオンボーディングプリセット。ウィジェット、アナライザー、状態管理、コード生成、flutter test に関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 17
stack: Flutter (Dart)
---

# Flutter プリセット

onboard フローが Flutter および Dart プロジェクトに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- `flutter` 依存関係を含む `pubspec.yaml` と、`runApp`／`MaterialApp` エントリーを持つ `lib/main.dart`。
- ウィジェット（`StatelessWidget`／`StatefulWidget`）、`analysis_options.yaml`、`flutter test` を含む `test/`。
- 状態管理（Provider、Riverpod、または Bloc）と、コード生成（`build_runner`、`json_serializable`）が存在する場合はそれも含む。

## 推論すべきこと

- 実際のテスト（`flutter test`）、解析（`flutter analyze`）、フォーマット（`dart format`）、ビルド（`flutter build <target>`）コマンドを原文どおりに捕捉する。
- 使用されている状態管理アプローチと、`lib/` 配下のウィジェット／機能フォルダの規約。
- コード生成が使用されているか（`dart run build_runner build`）、および存在するビルドターゲット。

## 補足

`pubspec.yaml` から状態管理ライブラリと `build_runner` のステップを確認する。両者が生成されるスキルの内容を左右するため。
