---
title: Spring Boot
description: "Spring Boot アプリケーション向けのオンボーディングプリセット。Maven と Gradle の違い、コントローラー、サービス、リポジトリ、テストランナーに関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 9
stack: Spring Boot
---

# Spring Boot プリセット

onboard フローが Spring Boot アプリケーションに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- `spring-boot-starter-*` 依存関係を含む `pom.xml`（Maven）または `build.gradle`／`build.gradle.kts`（Gradle）。
- `src/main/java` レイアウト、`@SpringBootApplication` エントリーポイント、そして `@RestController`／`@Service`／`@Repository` の階層構造。
- ビルドツールは存在するマニフェストから推論し、`./mvnw` または `./gradlew` ラッパーを使用する。

## 推論すべきこと

- 実際のテストコマンド（`./mvnw test` または `./gradlew test`、Spring Boot Test を用いた JUnit）と、リント／フォーマットのゲート（Checkstyle、Spotless）を原文どおりに捕捉する。
- コントローラー → サービス → リポジトリのフロー、`application.yml`／`application.properties` での設定、プロファイルとシークレットの扱い。
- コントローラー・サービス・リポジトリ・エンティティに適したスタック別スキル。

## 補足

グローバルな Maven／Gradle ではなくラッパー（`./mvnw`／`./gradlew`）を使用し、有効な Spring プロファイルと永続化レイヤー（JPA／JDBC）を捕捉する。
