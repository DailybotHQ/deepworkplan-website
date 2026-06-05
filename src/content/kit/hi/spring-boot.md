---
title: Spring Boot
description: "Spring Boot एप्लिकेशन के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें Maven बनाम Gradle, controllers, services, repositories और test runner के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 9
stack: Spring Boot
---

# Spring Boot preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह Spring Boot एप्लिकेशन के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `spring-boot-starter-*` dependencies के साथ `pom.xml` (Maven) या `build.gradle`/`build.gradle.kts` (Gradle)।
- `src/main/java` layout, एक `@SpringBootApplication` entrypoint, और `@RestController`/`@Service`/`@Repository` स्तरीकरण।
- Build tool को मौजूद manifest से अनुमानित किया जाता है, साथ में `./mvnw` या `./gradlew` wrapper।

## किस बारे में तर्क करें

- वास्तविक test कमांड (`./mvnw test` या `./gradlew test`, JUnit with Spring Boot Test) और lint/format गेट (Checkstyle, Spotless) — हूबहू दर्ज किए गए।
- Controller → service → repository प्रवाह, `application.yml`/`application.properties` में configuration, और profile/secret प्रबंधन।
- Controllers, services, repositories और entities के लिए stack-उपयुक्त skills।

## टिप्पणियाँ

Global Maven/Gradle के बजाय wrapper (`./mvnw`/`./gradlew`) उपयोग करें, और सक्रिय Spring profiles तथा persistence layer (JPA/JDBC) दर्ज करें।
