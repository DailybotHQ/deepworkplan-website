---
title: Laravel
description: "Laravel projeleri için Eloquent modelleri, kontrolörler, rotalar, taşımalar, Artisan komutları ve test koşucusuna yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 11
stack: Laravel (PHP)
---

# Laravel ön ayarı

Onboarding akışının Laravel projeleri için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `laravel/framework` içeren `composer.json`, bir `artisan` konsol betiği ve `app/` ağacı (`Models`, `Http/Controllers`, `Providers`).
- `routes/web.php` ve `routes/api.php`, `database/migrations/` ve Eloquent modelleri.
- Test koşucusu ile lint/biçimleme araçları, `composer.json` ve var olan yapılandırma dosyalarından çıkarılır.

## Neyin üzerine akıl yürütülmeli

- Gerçek test komutu (`php artisan test`, `vendor/bin/phpunit` veya `vendor/bin/pest`) ve lint/biçimleme kapısı (Pint, PHP-CS-Fixer, PHPStan/Larastan) — birebir kaydedilir.
- Yönlendirme, kontrolör ve Eloquent kuralları; taşıma iş akışı; ortam ve yapılandırma düzeni (`.env`, `config/`).
- Modeller, kontrolörler, taşımalar ve Artisan komutları için yığına uygun skill'ler.

## Notlar

Standart proje düzenini izleyen Laravel uygulamaları için kullanışlıdır. Depo Sail/Docker kullanıyorsa test ve lint kapılarının konteyner içinde çalışıp çalışmadığını kaydedin.
