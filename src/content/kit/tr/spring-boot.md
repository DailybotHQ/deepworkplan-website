---
title: Spring Boot
description: "Spring Boot uygulamaları için Maven ile Gradle arasındaki fark, kontrolörler, servisler, depolar ve test koşucusuna yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 9
stack: Spring Boot
---

# Spring Boot ön ayarı

Onboarding akışının Spring Boot uygulamaları için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `spring-boot-starter-*` bağımlılıklarına sahip `pom.xml` (Maven) ya da `build.gradle`/`build.gradle.kts` (Gradle).
- `src/main/java` düzeni, bir `@SpringBootApplication` giriş noktası ve `@RestController`/`@Service`/`@Repository` katmanlaması.
- Derleme aracı, var olan manifestten çıkarılır; `./mvnw` veya `./gradlew` sarmalayıcısı kullanılır.

## Neyin üzerine akıl yürütülmeli

- Gerçek test komutu (`./mvnw test` veya `./gradlew test`, Spring Boot Test ile JUnit) ve lint/biçimleme kapısı (Checkstyle, Spotless) — birebir kaydedilir.
- Kontrolör → servis → depo akışı, `application.yml`/`application.properties` içindeki yapılandırma ve profil/sır yönetimi.
- Kontrolörler, servisler, depolar ve varlıklar için yığına uygun skill'ler.

## Notlar

Global Maven/Gradle yerine sarmalayıcıyı (`./mvnw`/`./gradlew`) kullanın ve etkin Spring profillerini ile kalıcılık katmanını (JPA/JDBC) kaydedin.
