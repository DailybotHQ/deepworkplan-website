---
title: Laravel
description: "Laravel प्रोजेक्ट के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें Eloquent models, controllers, routes, migrations, Artisan commands और test runner के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 11
stack: Laravel (PHP)
---

# Laravel preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह Laravel प्रोजेक्ट के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `laravel/framework` के साथ `composer.json`, एक `artisan` console script, और एक `app/` वृक्ष (`Models`, `Http/Controllers`, `Providers`)।
- `routes/web.php` और `routes/api.php`, `database/migrations/`, और Eloquent models।
- Test runner और lint/format tooling को `composer.json` और मौजूद config files से अनुमानित किया जाता है।

## किस बारे में तर्क करें

- वास्तविक test कमांड (`php artisan test`, `vendor/bin/phpunit`, या `vendor/bin/pest`) और कोई भी lint/format गेट (Pint, PHP-CS-Fixer, PHPStan/Larastan) — हूबहू दर्ज किए गए।
- Routing, controller और Eloquent परिपाटियाँ; migration workflow; environment और config layout (`.env`, `config/`)।
- Models, controllers, migrations और Artisan commands के लिए stack-उपयुक्त skills।

## टिप्पणियाँ

Standard project layout वाले Laravel apps के लिए उपयोगी। यदि repo Sail/Docker उपयोग करता है, तो यह दर्ज करें कि test और lint गेट container के अंदर चलते हैं या नहीं।
