---
title: Angular
description: "Angular प्रोजेक्ट के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें components, modules या standalone APIs, services, RxJS और test runner के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 15
stack: Angular
---

# Angular preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह Angular प्रोजेक्ट के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `angular.json` और dependencies में `@angular/core`; `src/app/` में `@Component`/`@NgModule` या standalone components।
- `@Injectable` के साथ services, RxJS observables, और dependency injection।
- Package manager को मौजूद lockfile से अनुमानित किया जाता है।

## किस बारे में तर्क करें

- वास्तविक test (`ng test` / Karma+Jasmine `*.spec.ts` या Jest), lint (`ng lint` / `@angular-eslint`), और build (`ng build`) कमांड — हूबहू दर्ज किए गए।
- क्या app NgModules या standalone-components API उपयोग करता है, और routing तथा DI परिपाटियाँ।
- Stack-उपयुक्त skills: `component`, `service`, `module`/`standalone`, `guard`/`resolver`।

## टिप्पणियाँ

CLI project layout वाले Angular apps के लिए उपयोगी। मौजूद config से Karma/Jasmine बनाम Jest की पुष्टि करें।
