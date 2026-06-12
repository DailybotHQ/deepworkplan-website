---
title: Tasarım sistemi
description: "Kullanıcıya dönük bir arayüz yüzeyi olan herhangi bir depoya DESIGN.md (docs/ altında, AGENTS.md’den dizinlenen) kazandıran, tercihe dayalı bir eklenti — görsel UI, CLI çıktısı ve konuşma profillerini tek dosyada kapsar."
kind: addon
lang: tr
order: 4
---

# Design-system eklentisi

**Kullanıcıya dönük bir arayüz yüzeyi** olan bir depoya bir `DESIGN.md` kazandırın — herhangi bir kodlama ajanının, deponun **kendi** kurallarıyla tutarlı arayüz çıktısı üretmek için okuduğu bir Markdown tasarım sistemi dosyası; böylece ajan, hiçbir yönlendirme olmadan başvurduğu stilsiz, istatistiksel olarak yaygın varsayılanlara düşmez. Dördüncü tercihe dayalı Deep Work Plan eklentisi.

Bir “arayüz yüzeyi” çoğuldur: işlenen bir **görsel UI**, stilize **CLI çıktısı** ve bir **konuşma** yüzeyi (ürünün sohbet veya e-posta üzerinden konuşması) ayrı ayrı sayılır. Eklenti her birini bağımsız olarak bir **profil** olarak saptar ve kabul edilen profiller aynı tek `DESIGN.md` içinde üst üste eklenir.

## Neler ekler

- `docs/DESIGN.md` konumunda bir `DESIGN.md` (deponun diğer spesifikasyonlarının yanında; yalnızca bir `docs/` ağacı olmadığında depo kökünde), **`AGENTS.md`’den başvurulan**; böylece ajanlar onu belgelerin geri kalanı gibi keşfeder. Bir depo, bir dosya — asla yüzey başına kardeş dosyalar değil.
- **`visual-ui` profili** — kanonik görsel bölümler: genel bakış/atmosfer, renk paleti ve roller (açık + koyu), tipografi, yerleşim ve boşluk, yükseklik ve derinlik, şekiller, bileşenler, duyarlı davranış, yapılacaklar ve yapılmayacaklar (deponun erişilebilirlik kuralları dahil).
- **`cli-output` profili** — stilize terminal arayüzleri: çıktı sesi, semantik renkler ve stiller (gerçek temaya eşlenen başarı/hata/uyarı/bilgi/soluk), çıktı bileşenleri (paneller, tablolar, spinner’lar, etkileşimli istemler — deponun gerçek yardımcılarının adlarıyla anılan), yerleşim kuralları ve bozulma kuralları (TTY ile boru ayrımı, `NO_COLOR`, stdout/stderr disiplini, çıkış kodları).
- **`conversational` profili** — ürünün mesajlaşma yüzeyi: ses ve üslup (ton, kısalık, marka adlandırma kuralları), mesaj anatomisi (DM, kanal gönderisi, konu yanıtı, yerinde düzenleme) ve düz metin yedekleriyle platform başına işleme (Slack mrkdwn, Discord markdown, Teams uyarlanabilir kartları, e-posta).
- Paylaşılan bir ajan istem kılavuzu ve her profilin bütünlüğünü denetleyen bir doğrulama adımı: belgelenen metin kontrastı WCAG AA’yı karşılar (görsel), renk asla anlamın tek taşıyıcısı değildir (CLI), zengin işlemeler düz metin yedeklerini belirtir (konuşma) ve token başvuruları çözümlenir.

## Davranış

- **Akıl yürüt, kopyalama.** Her değer, deponun gerçek tasarım kaynağından — stil sayfası, CSS özel özellikleri, Tailwind yapılandırması, token dosyaları, bileşen stilleri, CLI görüntüleme/tema modülü veya mesaj oluşturma yardımcıları — türetilir. Üçüncü taraf bir markanın `DESIGN.md`’sini asla yapıştırmaz ve başka bir ürünün kurallarını toptan içe aktarmaz; başvuru katalogları yapı için ilham kaynağıdır, asla içerik için değil.
- **Bağdaştır, ezme.** Var olan bir `DESIGN.md` veya token kaynağı, asla üzerine yazılmadan, ekleyerek bağdaştırılır; yeni kabul edilen bir profil eklemek, geri kalanı yeniden yazmadan kendi bölümlerini sona ekler; yıkıcı değişiklikler onay gerektirir.
- **Başvuruyla keşif.** `DESIGN.md` nerede bulunursa bulunsun, `AGENTS.md` (ve `CLAUDE.md`) ona başvurur — ajanların onu yüklemesini garanti eden şey, fiziksel konum değil, işaretçidir.
- **Pragmatik, katı bağlı değil.** Takip edilecek bir biçim olarak gelişmekte olan `DESIGN.md` kuralına başvurur, onu görsel olmayan yüzeylere genişletir ve tek bir token şemasına bağlanmadan Markdown öncelikli kalır.

## Arayüz kapsamlı, profil başına öneri gücüyle

Bu eklenti, en az bir gerçek arayüz yüzeyi olan depolar içindir; hiçbir arayüz yüzeyi olmayan bir depo (saf bir kitaplık, headless bir servis, yalnızca-altyapı bir depo) için asla sunulmaz. Her profil kendi öneri gücünü taşır:

- **`visual-ui` saptandığında varsayılan açıktır** — CSS özel özellikleri içeren bir stil sayfası, bir Tailwind yapılandırması veya `@theme` bloğu, UI bileşenleri ya da bir marka/stil kılavuzu. Kuruluma alma onu güven modunda uygular ve rehberli modda güçlü biçimde önerir.
- **`cli-output` ve `conversational`, saptandığında önerilir — ve her zaman sorulur, asla otomatik uygulanmaz**, güven modunda bile. Bir CLI işleme kitaplığı artı bilinçli bir görüntüleme katmanı ilkine işaret eder; bir sohbet platformu SDK’sı veya mesaj oluşturma katmanı ikincisine işaret eder. Ham yazdırmalar yapan yalın bir argüman ayrıştırıcısı bu kapsama girmez.

Asla gerekli değildir — sıfır eklentili bir depo tamamen uyumludur ve herhangi bir profili ya da eklentinin tamamını her zaman reddedebilirsiniz. Profiller var olmadan önce oluşturulmuş bir `DESIGN.md`, geçerli tek profilli bir görsel dosyadır: geçiş gerekmez.

## İsteğe bağlı komut

Kabul edildiğinde eklenti, `DESIGN.md`’yi daha sonra yeniden üretmek veya tazelemek için deponun `.agents/commands/` dizinine bir `/design-system` yönlendiricisi kurabilir. Komutu kurmak isteğe bağlıdır; reddedilen bir eklenti hiçbirini kurmaz.

## Özellik bazlı tasarım belgeleriyle ilişkisi

Bu, **depo düzeyinde, kalıcı** bir tasarım sistemi dosyasıdır — özellik bazlı bir teknik tasarım belgesinden (araca bağlı, spesifikasyon güdümlü iş akışlarının “gereksinimler → tasarım → görevler” `design.md`’sinden) farklıdır. Deep Work Plan, kasıtlı olarak ayrı bir özellik bazlı tasarım belgesi arketipi içermez: bir planın README’si, her görevin kabul kriterleri ve doğrulama kapıları bu rolü zaten kapsar. Bu eklenti, o rolün kapsamadığı tek boşluğu doldurur: dayanıklı, depo-yerel arayüz tasarımı bağlamı.
