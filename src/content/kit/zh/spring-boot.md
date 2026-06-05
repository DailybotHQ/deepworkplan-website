---
title: Spring Boot
description: "面向 Spring Boot 应用的接入预设，包含 Maven 与 Gradle 的区分、控制器、服务、Repository 与测试运行器的推理提示。"
kind: preset
lang: zh
order: 9
stack: Spring Boot
---

# Spring Boot 预设

onboard 流程用于 Spring Boot 应用的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- 带有 `spring-boot-starter-*` 依赖的 `pom.xml`（Maven）或 `build.gradle`/`build.gradle.kts`（Gradle）。
- `src/main/java` 目录结构、一个 `@SpringBootApplication` 入口点，以及 `@RestController`/`@Service`/`@Repository` 的分层架构。
- 构建工具从已存在的清单文件中推断，并附带 `./mvnw` 或 `./gradlew` 包装脚本。

## 需要推理的内容

- 真实的测试命令（`./mvnw test` 或 `./gradlew test`，配合 Spring Boot Test 使用 JUnit）以及代码检查与格式化关卡（Checkstyle、Spotless）——原样捕获。
- 控制器 → 服务 → Repository 的流转、`application.yml`/`application.properties` 中的配置，以及 Profile 与密钥的处理方式。
- 适合该技术栈的控制器、服务、Repository 与实体相关技能。

## 备注

使用包装脚本（`./mvnw`/`./gradlew`）而非全局安装的 Maven/Gradle，并捕获已激活的 Spring Profile 与持久化层（JPA/JDBC）。
