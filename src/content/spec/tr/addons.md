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

## Design-system eklentisi

**design-system** eklentisi, bir depoya bir `DESIGN.md` kazandıran, arayüz yüzeyi kapsamlı, tercihe dayalı bir uzantıdır — herhangi bir kodlama ajanının, deponun kendi kurallarıyla tutarlı arayüz çıktısı üretmek için okuduğu bir Markdown tasarım sistemi dosyası. Gerçek dosyalardan bağımsız olarak saptanan ve aynı tek dosyada üst üste eklenen üç **profili** kapsar: **visual-ui** (işlenen web/mobil/masaüstü UI), **cli-output** (stilize terminal çıktısı: semantik renkler, paneller ve spinner’lar gibi çıktı bileşenleri, yerleşim kuralları, TTY/`NO_COLOR` bozulması) ve **conversational** (ürünün sohbet veya e-posta üzerinden konuşması: ses ve üslup, mesaj anatomisi, düz metin yedekleriyle platform başına işleme). Bir marka dosyasını kopyalamak yerine deponun gerçek tasarım kaynağı (CSS özel özellikleri, bir Tailwind yapılandırması, token dosyaları, bileşen stilleri — veya bir CLI görüntüleme modülü ya da mesaj oluşturma yardımcıları) hakkında akıl yürütür ve her profilin bütünlüğünü doğrular: görsel metin eşleşmeleri için WCAG AA kontrastı, terminal çıktısında rengin asla anlamın tek taşıyıcısı olmaması, zengin mesajlar için düz metin yedekleri ve çözümlenen token başvuruları. Var olan bir `DESIGN.md`’yi ezmek yerine bağdaştırır.

Dosya, deponun diğer spesifikasyonlarının yanında, `docs/DESIGN.md` konumunda bulunur ve `AGENTS.md`’den başvurulur; böylece ajanlar onu, belgelerin geri kalanını keşfettikleri yolla keşfeder (depo kökü yalnızca bir `docs/` ağacı olmadığında kullanılır). Keşif, fiziksel konumla değil, başvuruyladır. Profil gücü farklılık gösterir: **visual-ui saptandığında varsayılan açıktır** — bir görsel UI yüzeyi mevcut olduğunda, kuruluma alma onu güven modunda uygular ve rehberli modda güçlü biçimde önerir — **cli-output ve conversational ise saptandığında önerilir, her zaman sorulur ve asla otomatik uygulanmaz**. Eklenti, hiçbir türde arayüz yüzeyi olmayan bir depo (saf bir kitaplık, headless bir servis, yalnızca-altyapı bir depo) için asla sunulmaz ve sıfır eklentili bir depo tamamen uyumlu kalır. Profiller var olmadan önce oluşturulmuş bir `DESIGN.md`, geçerli tek profilli bir görsel dosyadır — geçiş gerekmez.

Bu depo düzeyindeki tasarım sistemi dosyası, özellik bazlı bir teknik tasarım belgesinden (araca bağlı, spesifikasyon güdümlü iş akışlarının “gereksinimler → tasarım → görevler” `design.md`’sinden) farklıdır. DWP, ayrı bir özellik bazlı tasarım belgesi arketipi içermez: bir planın README’si, her görevin kabul kriterleri ve doğrulama kapıları bu rolü zaten kapsar. Eklenti, o rolün kapsamadığı tek boşluğu doldurur: dayanıklı, depo-yerel arayüz tasarımı bağlamı.

## Hazır ayarlar

Hazır ayarlar, DWP’yi belirli bir teknoloji yığınına (Django, React, Go) uyarlar.

## Adaptörler

Adaptörler, DWP komutlarını belirli bir ajanın komut sistemine (Claude Code, Cursor, Codex) eşler.

## Örnekler

Örnekler, DWP’yi uygulamada gösterir (önce/sonra karşılaştırmaları, örnek planlar, vaka çalışmaları).
