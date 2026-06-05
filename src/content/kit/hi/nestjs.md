---
title: NestJS
description: "NestJS एप्लिकेशन के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें modules, controllers, providers, DTOs, decorator model और test runner के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 8
stack: NestJS
---

# NestJS preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह NestJS एप्लिकेशन के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `nest-cli.json`, `package.json` में `@nestjs/*` packages, और `NestFactory.create` को आमंत्रित करता `main.ts`।
- Decorator model: `@Module`, `@Controller`, `@Injectable`, और modules, controllers, services तथा DTOs वाले feature फ़ोल्डर।
- Package manager को lockfile से अनुमानित किया जाता है (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`)।

## किस बारे में तर्क करें

- वास्तविक test कमांड (Jest unit `*.spec.ts` और e2e `*.e2e-spec.ts`), lint गेट (`eslint`), और build script — हूबहू दर्ज किए गए।
- Module सीमाएँ, dependency injection, providers, guards/pipes/interceptors, और configuration कहाँ रहती है (`@nestjs/config`)।
- Modules, controllers, providers और DTOs के लिए stack-उपयुक्त skills।

## टिप्पणियाँ

यह दर्ज करें कि feature modules को root module से कैसे जोड़ा जाता है और क्या app TypeORM/Prisma, microservices या GraphQL उपयोग करता है।
