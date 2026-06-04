---
title: agent-create
description: "Geçerli depoda yeni bir ajan oluşturur — kendi model katmanı ve araçlarına sahip uzman bir çalışan — author alt skill’i aracılığıyla, kataloğu eşitli tutarak."
kind: command
lang: tr
order: 8
usage: /agent-create
---

# agent-create

Geçerli depoda yeni bir ajan oluşturur. Deep Work Plan **author** alt skill’ine ince bir yönlendirici.

## Ne yapar

`agent-create`, author alt skill’inin ajan oluşturma akışına yönlendirir. Bir ajan, bir görev sınıfını ele almak üzere görevlendirilen uzman bir çalışan tanımıdır (rol, model katmanı, araçlar, sistem istemi). “X’i kim yapar” bilgisini kodlar ve `.agents/agents/<name>.md` altında yaşar.

## Kullanım

```
/agent-create
```

## Davranış

1. Deponun `.agents/` düzenini ve yerel kurallarını tespit eder.
2. Ayrı model/araç ihtiyaçları olan yinelenen bir rolü onaylar; onu kebab-case ile adlandırır.
3. Ajanı (Rol, Girdiler, Süreç, Çıktı, yükseltme) oluşturur ve doldurur.
4. Satıcı model kimliklerini sabit kodlamadan gerekçeli bir model katmanı — light, standard veya heavy — seçer.
5. Eşleşmesi için `.agents/docs/` kataloğunu günceller.

## Notlar

Prosedürler için `/skill-create` kullanın. Model katmanlarını soyut tutun ve bunları depo yapılandırmasında eşleyin.
