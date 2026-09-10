---
title: "Deep Work Plan alternatiflerle karşılaştırıldığında — Deep Work Plan"
description: "Deep Work Plan'in spec odaklı araçlar, ajan iş akışı çerçeveleri ve satıcı plan modlarıyla ilişkisi: her biri kendi terimleriyle, kaynaklar ve inceleme tarihiyle."
lastUpdated: 2026-09-10
---

## Deep Work Plan ve alternatifler

Durumunuz için doğru katmanı seçin. Her alternatif kendi terimleriyle tanımlanır, her gerçek resmi belgelere izlenebilir ve sayfa en son ne zaman incelendiğini belirtir. Bu bir harita, sıralama değil.

## Bu sayfa nasıl okunur

Her yetenek üç değerle tanımlanır. Bir yeteneğin bir araçta nerede olduğunu söylerler; aracın ne kadar iyi olduğunu değil.

- **Yerleşik**
- **İsteğe bağlı veya eklentiyle**
- **Kapsam dışı**

Son incelenme: 2026-09-10

## Alternatifler, kendi terimleriyle

### Spec odaklı geliştirme araçları

**GitHub Spec Kit** — Bir özelliği bir anayasa, bir spec, bir plan ve bir görev listesiyle yürütülebilir bir spesifikasyona dönüştürür; elliden fazla kodlama ajanıyla entegre slash komutlarıyla yönlendirilir. Zaten kullandıkları ajanın içinde tekrarlanabilir specify, plan, tasks ve implement iş akışı isteyen ekipler. [Resmi site](https://github.com/github/spec-kit)

**OpenSpec** — Her değişikliği delta spec'lerle (eklenen, değiştirilen, kaldırılan) ve senaryolarla RFC 2119 gereksinimleri içeren bir öneri olarak yakalar, ardından bunları yaşayan spesifikasyonlara arşivler. Mevcut sistemlerde çalışan ve spesifikasyonların değişiklik değişiklik büyümesini isteyen ekipler. [Resmi site](https://openspec.dev)

**Amazon Kiro** — Spec'leri EARS tarzı gereksinimlerden tasarıma ve görevlere taşıyan, düzenleyici olaylarında çalışan steering dosyaları ve hook'larla bir agentic IDE ve CLI. Düzenleyicisine AWS destekli araçlarla spec odaklı geliştirme yerleşik isteyen geliştiriciler. [Resmi site](https://kiro.dev)

### Ajan iş akışı çerçeveleri

**BMAD Method** — Brief, gereksinim, mimari belgeler ve story dosyaları üreten uzmanlaşmış ajan rollerinden (analiz, ürün, mimari, geliştirme, kalite) oluşan bir agile çerçeve. Rol tabanlı törenleri seven ve ajan işi için tam bir agile yaşam döngüsü isteyen ekipler. [Resmi site](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Beyin fırtınası, küçük test-first adımlarla planlama, alt ajanlarla yürütme ve tamamlamadan önce inceleme için bir skill kütüphanesi ve iş akışı. Kodlama ajanlarında disiplinli test odaklı yürütme isteyen geliştiriciler. [Resmi site](https://github.com/obra/superpowers)

**Get Shit Done** — Bir .planning dizini, gereksinim kimlikleri, faz planları, taze bağlam yürütmesi ve belirtilen must-have'lere karşı bir doğrulama geçişiyle bir planlama sistemi. Az törenle bağlam mühendisliği ve doğrulama isteyen solo geliştiriciler ve küçük ekipler. [Resmi site](https://github.com/open-gsd/gsd-core)

### Satıcı yerel plan modları

**Satıcı yerel plan modları** — Claude Code, Codex, Cursor ve Gemini CLI, AGENTS.md ve Agent Skills standartlarını izleyen plan modları, talimat dosyaları ve skill'ler sunar. Metodoloji benimsemek istemeyen, tek bir ajanın içinde planlama isteyen herkes. [Resmi site](https://agents.md)

## Yetenek matrisi

Her yetenek araç başına nerede. Yerleşik, isteğe bağlı veya eklentiyle, veya kapsam dışı. Resmi belgelere karşı incelenmiştir.

| Yetenek | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | Get Shit Done | Satıcı yerel plan modları |
|---|---|---|---|---|---|---|---|---|
| Herhangi bir kodlama ajanıyla çalışır | Yerleşik | Yerleşik | Yerleşik | Kapsam dışı | Yerleşik | Yerleşik | Yerleşik | Kapsam dışı |
| Ajan harness'ını repoya yazır | Yerleşik | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | Kapsam dışı | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle |
| Görev başına kabul kriterleri | Yerleşik | İsteğe bağlı veya eklentiyle | Yerleşik | Yerleşik | Yerleşik | Yerleşik | Yerleşik | İsteğe bağlı veya eklentiyle |
| Görev başına doğrulama kapısı | Yerleşik | İsteğe bağlı veya eklentiyle | Kapsam dışı | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | Yerleşik | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle |
| Diskte sürdürülebilir durum | Yerleşik | Yerleşik | Yerleşik | Yerleşik | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | Yerleşik | İsteğe bağlı veya eklentiyle |
| Güvenlik geçişiyle zorunlu kapanış incelemesi | Yerleşik | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle |
| Yürütülebilir uyumluluk denetleyicisi | Yerleşik | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | Kapsam dışı | Kapsam dışı | Kapsam dışı | İsteğe bağlı veya eklentiyle |
| Yayımlanmış talimat yükü ölçümü | Yerleşik | Kapsam dışı | Kapsam dışı | Kapsam dışı | Kapsam dışı | Kapsam dışı | Kapsam dışı | Kapsam dışı |
| Dokümantasyon iskelesi kuran kuruluma alma | Yerleşik | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | Kapsam dışı | Yerleşik | İsteğe bağlı veya eklentiyle |
| Mevcut sistemler için yaşayan spec'ler | Kapsam dışı | İsteğe bağlı veya eklentiyle | Yerleşik | İsteğe bağlı veya eklentiyle | İsteğe bağlı veya eklentiyle | Kapsam dışı | İsteğe bağlı veya eklentiyle | Kapsam dışı |

## Deep Work Plan'in getirdikleri

- **Araçtan bağımsız ve repo-yerel.** Harness ve plan repodaki dosyalardır; AGENTS.md ve Agent Skills standartlarını izleyen herhangi bir ajan okur. Ajan değiştirmek planı kaybettirmez.
- **Her görevin dokunduğu yüzeyden seçilen doğrulama.** Her görev dokunduğu yüzeyi bildirir ve değişen davranışın testlerini ve tüketicilerini çalıştırır; etki sınırlandırılamadığında tam suite'e genişler. Sıfır seçili test asla geçiş değildir.
- **Güvenlik geçişiyle tek Final Review.** Bir plan, birikmiş değişiklik kümesinin güvenlik incelemesiyle — zorunlu yerel diff incelemesi dahil — ve son durum doğrulamasıyla kapanır. Kritik bulgular tamamlamayı engeller.
- **Oturumları ve ajanları atlatan durum.** README onay kutuları, görev günlükleri, sınırlı çalışma indeksi ve makine tarafından okunabilir durum dosyası her sınırda yazılır; böylece başka bir oturum veya ajan diskten devam eder. Yarıda kesilen plan oluşturma bile kurtarılabilir.
- **Reponun kendisi için uyumluluk denetleyicisi.** Salt okunur bir betik harness'ı ve her planı spesifikasyona karşı doğrular, her iki plan yaşam döngüsünü anlar ve CI-dostu kodla çıkar.
- **Ölçülen ve yayımlanan talimat yükü.** Commit edilmiş bir betik her akışın kaç byte yüklediğini ölçer; sonuçlar, artışlar dahil, byte olarak yayımlanır — asla token veya maliyet yüzdesi olarak değil.

## Dürüst sınırlar

Deep Work Plan'in yaşayan veya delta spec mekanizması yoktur; OpenSpec ve benzeri araçlar orada daha güçlüdür. Metodolojinin bağımsız bir kıyaslaması henüz yoktur; önceden kayıtlı bir kamu değerlendirmesi planlanmaktadır. Talimat yükü defteri yüklenen byte'ları ölçer; token, maliyet veya sonuçları değil.

## Bu sayfanın doğruluğunu korumamıza yardım edin

Bu sayfa gösterilen tarihte incelenir ve talep üzerine düzeltilir. Aracınızın tanımı güncel değilse veya eksikse bir issue açın, düzeltiriz.

[Issue açın](https://github.com/DailybotHQ/deepworkplan-website/issues)

## Kaynaklar

- Deep Work Plan — https://deepworkplan.com/spec
- GitHub Spec Kit — https://github.github.io/spec-kit/
- OpenSpec — https://openspec.dev/docs
- Amazon Kiro — https://kiro.dev/docs/
- BMAD Method — https://github.com/bmad-code-org/BMAD-METHOD#readme
- Superpowers — https://github.com/obra/superpowers#readme
- Get Shit Done — https://github.com/open-gsd/gsd-core#readme
- Vendor-native plan modes — https://agentskills.io
