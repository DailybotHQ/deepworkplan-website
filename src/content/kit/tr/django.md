---
title: Django
description: "Django projeleri için bir onboarding ön ayarı; uygulamalar, migration’lar, ayarlar, yönetim komutları ve test koşucusu için akıl yürütme ipuçları sunar."
kind: preset
lang: tr
order: 1
stack: Django
---

# Django ön ayarı

Onboarding akışının Django projeleri için kullandığı akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `manage.py` ve `settings.py`; `models.py`, `views.py`, `migrations/` içeren uygulamalar.
- Var olan manifest ve lockfile’dan çıkarsanan paket yöneticisi ve test koşucusu.

## Neyin üzerine akıl yürütülmeli

- Gerçek test komutu (çoğunlukla `python manage.py test` veya `pytest`) ve varsa lint/tür denetimi geçidi — birebir kaydedilir.
- Uygulama ve migration kuralları, ayarlar ve ortam düzeni ile yönetim komutu desenleri.
- Uygulamalar, modeller, view’ler ve migration’lar için yığına uygun skill’ler.

## Notlar

Standart proje düzenini izleyen Django uygulamaları için yararlıdır.
