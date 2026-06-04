---
title: Eklentiler
description: "Çekirdek DWP metodolojisine yönelik isteğe bağlı uzantılar: skill’ler, ajanlar, hazır ayarlar, adaptörler ve örnekler ve her birinin iş akışını gerekli olmadan nasıl genişlettiği."
order: 5
lang: tr
section: Addons
---

# Eklentiler

**Sürüm 1.0.** Eklentiler, çekirdek DWP metodolojisine yönelik isteğe bağlı uzantılardır. Uyumluluk için gerekli değildir ancak ek yetenekler sağlar.

## Skill’ler

Skill’ler, adıyla çağrılan yeniden kullanılabilir prosedürlerdir. Bir skill, tekrarlanabilir bir iş akışını (testleri çalıştırma, lint düzeltme, bir bileşen oluşturma) paketler.

Metodoloji, küçük bir çekirdek alt skill kümesiyle gelir. Bunların arasında **author** alt skill’i, bir deponun **kendi kitini büyütmesini** sağlar: `/skill-create` ve `/agent-create` aracılığıyla çağrıldığında, deponun mevcut `.agents/` düzeni ve kuralları hakkında akıl yürütür, ardından bunlara uyan yeni bir skill, ajan veya ince komut yönlendiricisi yazar ve kataloğu eşitler. Aynı alt skill, zorunlu Skills & Agents Discovery görevini yürütür.

## Ajanlar

Ajanlar, tanımlı bir role sahip uzman çalışanlardır (reviewer, executor, architect).

## Bakım eklentileri

Bakım eklentileri, uyumluluk için asla gerekli olmayan, bir deponun kendini sürdürmesine yardım eden tercihe dayalı uzantılardır. **dependency-upgrade** eklentisi, deponun gerçek paket yöneticisi hakkında akıl yürütür (npm varsaymak yerine) ve bağımlılıkları küçük, doğrulanmış, geri alınabilir gruplar halinde yükseltir: yöneticiyi gerçek manifest ve kilit dosyasından tespit eder, yükseltmeleri semver’e göre sınıflandırır, gruplar halinde yükseltir, her gruptan sonra deponun gerçek doğrulama kapısını çalıştırır, başarısız olan herhangi bir grubu geri alır ve otomatik işleme yapmadan özetler. Bir eklenti, yalnızca kuruluma alma sırasında kabul edildiğinde kurulur.

## Hazır ayarlar

Hazır ayarlar, DWP’yi belirli bir teknoloji yığınına (Django, React, Go) uyarlar.

## Adaptörler

Adaptörler, DWP komutlarını belirli bir ajanın komut sistemine (Claude Code, Cursor, Codex) eşler.

## Örnekler

Örnekler, DWP’yi uygulamada gösterir (önce/sonra karşılaştırmaları, örnek planlar, vaka çalışmaları).
