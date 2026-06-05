---
title: NestJS
description: "NestJS uygulamaları için modüller, kontrolörler, sağlayıcılar, DTO'lar, dekoratör modeli ve test koşucusuna yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 8
stack: NestJS
---

# NestJS ön ayarı

Onboarding akışının NestJS uygulamaları için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `nest-cli.json`, `package.json` içinde `@nestjs/*` paketleri ve `NestFactory.create` çağıran `main.ts`.
- Dekoratör modeli: `@Module`, `@Controller`, `@Injectable` ve modüller, kontrolörler, servisler ile DTO'ları barındıran özellik klasörleri.
- Paket yöneticisi, kilit dosyasından çıkarılır (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Neyin üzerine akıl yürütülmeli

- Gerçek test komutu (Jest birim testleri `*.spec.ts` ve uçtan uca testler `*.e2e-spec.ts`), lint kapısı (`eslint`) ve derleme betiği — birebir kaydedilir.
- Modül sınırları, bağımlılık enjeksiyonu, sağlayıcılar, muhafızlar/borular/kesiciler ve yapılandırmanın nerede tutulduğu (`@nestjs/config`).
- Modüller, kontrolörler, sağlayıcılar ve DTO'lar için yığına uygun skill'ler.

## Notlar

Özellik modüllerinin kök modüle nasıl bağlandığını ve uygulamanın TypeORM/Prisma, mikro servisler veya GraphQL kullanıp kullanmadığını kaydedin.
