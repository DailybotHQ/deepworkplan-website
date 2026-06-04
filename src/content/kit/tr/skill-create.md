---
title: skill-create
description: "Mevcut depoda yeni, yeniden kullanılabilir bir skill — parametreli, oturum içi bir prosedür — oluşturur; bunu author alt skill’i aracılığıyla yapar ve kataloğu eşitler."
kind: command
lang: tr
order: 7
usage: /skill-create
---

# skill-create

Mevcut depoda yeni bir skill oluşturun. Deep Work Plan **author** alt skill’ine ince bir yönlendirici.

## Ne yapar

`skill-create`, author alt skill’inin skill oluşturma akışına yönlendirir. Bir skill, oturum içinde çalıştırılan (örneğin `/fix-lint`), yeniden kullanılabilir ve parametreli bir prosedürdür. "X nasıl yapılır" bilgisini kodlar ve `.agents/skills/<name>/SKILL.md` altında bulunur.

## Kullanım

```
/skill-create
```

## Davranış

1. Deponun `.agents/` düzenini ve yerel kurallarını saptayın.
2. Gerçek, yinelenebilir bir iş akışının var olduğunu doğrulayın; ona kebab-case bir ad verin.
3. `SKILL.md` dosyasını iskeletleyip doldurun (Amaç, Ne zaman kullanılır, Adımlar, Doğrulama).
4. Gerekirse ince bir komut yönlendiricisi ekleyin.
5. Eşleştirmek için `.agents/docs/` kataloğunu güncelleyin.

## Notlar

Ajanlar için `/agent-create` kullanın. Mantık skill’in içinde yaşar; komut ince kalır.
