---
title: Dokümantasyon standardı
description: "Deep Work Plan’lerin yapılarını, görevlerini ve ilerlemelerini nasıl belgelediğine ilişkin normatif standart: README kuralları, durum işaretleri, on bölümlü görev anatomisi ve Final Review."
order: 1
lang: tr
section: Standard
---

# Dokümantasyon standardı

**Sürüm 5.0.0.** Bu standart, Deep Work Plan’lerin yapılarını, görevlerini ve ilerlemelerini nasıl belgelediğini ve bir deponun bir ajanın güvenle hareket edebilmesi için kendi kendini nasıl belgelediğini tanımlar. DWP metodolojisi altında oluşturulan her plan için geçerlidir. Bu sürüm, belgenin kendi sürüm numarasını eşlik ettiği DWP standardıyla hizalar — mevcut hiçbir gereksinim değişmez — ve aşağıda açıklanan sade-dizin bütçesi zorlamasını ve özellik katmanını ekler. MUST, SHOULD ve MAY anahtar kelimeleri, RFC 2119’da tanımlandığı şekilde kullanılır.

## Kompakt bir giriş noktası olarak AGENTS.md

Kök `AGENTS.md` dosyası 150–500 satırlık bir bütçe içinde KALMALIDIR. Oluşturulan veya harness tarafından bakımı yapılan içerik bunu aşacaksa, ajan ayrıntıyı sahip olduğu `docs/` kılavuzuna (veya modül/özellik belgesine) TAŞIMAK ve dizinden ona bağlantı vermek ZORUNDADIR — hiçbir şey atılmaz, yalnızca yeniden konumlandırılır ve dizin, yerinden taşınan içeriği alan her belgeye bağlantı VERMEK ZORUNDADIR. Bütçeyi aşan, elle yazılmış mevcut bir `AGENTS.md` asla sessizce yeniden yazılmaz: ajan somut bir geçiş önerisi sunar (neyin nereye taşınacağı, hangi bağlantıların ekleneceği) ve bunu yalnızca geliştiricinin onayıyla uygular. Bir uyumluluk denetleyicisi bütçeyi tavsiye niteliğinde ele alır, çünkü satır sayısı nesneldir ama yazarlık nesnel değildir — MUST, dosyayı kim yazdığına dair bir denetleyicinin tahminini değil, dosyayı oluşturan veya güncelleyen harness'i bağlar. `AGENTS.md`, var olmayan bir `docs/` dosyasına bağlantı VERMEMELİDİR.

Aşağıdaki modül başına dokümantasyon katmanının üzerinde bir **özellik katmanı** yer alır: tek bir modülden daha büyük, önemli bir yetenek alanı, kendi kodunun yanında kendi `README.md`'si aracılığıyla erişilen kendi `docs/` klasörünü alır. Bir alan, iki veya daha fazla ana modülü kapsadığında, kendi kendine yeten bir alt-uygulama veya alt sistem dizinine sahip olduğunda ya da birden çok tüketicinin bağımlı olduğu kendi sözleşmelerini (bir API yüzeyi, olay veya şema sözleşmeleri) taşıdığında hak kazanır. Bir alan önemli olarak kaydedildiğinde, özellik `docs/`'u var OLMALIDIR ve en önemli girdileri, alanın kapsadığı modüllerden ve kök `AGENTS.md` dizininden, tıpkı modül başına belgeler gibi bağlanMALIDIR. Kasıtlı olarak belgelenmemiş bırakılan bir alan, kaydedilmiş bir gerekçe taşır — bir gözden kaçırma değil, bir karardır.

## Plan README

Her plan, şunları içeren bir `README.md` dosyasına SAHİP OLMALIDIR:

- **Başlık** — `# Deep Work Plan: <name>`.
- **Hedef** — planın amacına ilişkin düzyazı bir bildirim.
- **Kaynak materyal** — kanonik girdilere bağlantılar veya yollar (isteğe bağlı).
- **Görevler** — görev numarası, adı ve bir durum onay kutusu içeren bir Markdown tablosu.
- **Durum** — `<n>/<total> tasks complete` biçiminde bir satır.

## Görev dosyaları

Her görev dosyası `<n>.task_<slug>.md` olarak adlandırılMALI ve on bölümlü anatomiyi İÇERMELİDİR — dokuz klasik bölüm artı **Dokunulan Yüzey**: görevin neyi değiştirdiği ile neyin doğrulanması gerektiği arasındaki sözleşme (planlanan ve gerçekleşen yüzey, etkilenen tüketiciler, *izole*, *seam*, *paylaşılan/çekirdek* veya *bilinmeyen* risk sınıflarından biri, kullanılan test eşlemesi ve seçilmiş kapı ile gerekçesi).

## PROGRESS.md

`PROGRESS.md`, yalnızca ekleme yapılan bir yürütme günlüğüdür. Her giriş şunları KAYDETMELİDİR:

- Bir ISO 8601 zaman damgası.
- Görev numarası ve adı.
- Ne yapıldığı.
- Varsa sapmalar veya atlama nedenleri.

## Durum işaretleri

- `[ ]` — başlanmadı.
- `[~]` — devam ediyor.
- `[x]` — bitti.
- `[!]` — engellendi.

## Başlıklar

Tüm başlıklar cümle düzenini KULLANMALIDIR. Belgeler, pazarlama dilinden ve ünlem işaretlerinden KAÇINMALIDIR.

## Final Review, görev-yerel skill kararları ve isteğe bağlı rapor

Bu sürüm altında yazılmış her plan, tam olarak tek bir zorunlu görevle bitMELİDİR: **Final Review** — planın tüm değişiklik kümesi üzerindeki güvenlik incelemesi, son ilgili durum üzerindeki son-durum doğrulaması ve skill kararlarının uzlaştırılması. Kritik bir güvenlik bulgusu tamamlanmayı engeller.

- **Görev-yerel skill kararları.** Her görevin Tamamlama ve Günlük bölümü bir **skill kararı** taşır — `none`, mevcut bir skill veya ajana güncelleme, adlandırılmış bir oluşturma ya da gerekçesi ve sahibiyle birlikte bir erteleme. Gerekçeli yazma, sahipli görevin içinde, onun doğrulama kapısından önce, `.agents/` kataloğuna karşı bir yinelenen denetiminden sonra gerçekleşir; gerekçeli girişler, planın skill-adayları defterinde kararlı adaylar (`T{task}-{seq}`) olarak kaydedilir.
- **Executive Report isteğe bağlıdır, talep üzerine.** Tamamlanmada bir kez sunulur; yalnızca açık bir istek üzerine, kalıcı kanıtlardan üretilir. Yanıt gelmemesi veya gözetimsiz bir çalışma, planı onsuz tamamlanmış bırakır.
- **Eski planlar.** Önceki sürümler altında yazılmış planlar üç zorunlu son görevle biter ve uyumlu kalır — bir uyumluluk denetleyicisi bu şekli KABUL ETMELİDİR.
