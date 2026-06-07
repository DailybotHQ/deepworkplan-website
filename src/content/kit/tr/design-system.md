---
title: Tasarım sistemi
description: "Bir depoya DESIGN.md (docs/ altında, AGENTS.md’den dizinlenen) kazandıran, frontend kapsamlı, tercihe dayalı bir eklenti; böylece herhangi bir kodlama ajanı, deponun kendi tasarım sistemiyle tutarlı UI üretir."
kind: addon
lang: tr
order: 4
---

# Design-system eklentisi

Bir frontend/UI deposuna bir `DESIGN.md` kazandırın — herhangi bir kodlama ajanının, deponun **kendi** tasarım sistemiyle tutarlı UI üretmek için okuduğu bir Markdown tasarım sistemi dosyası; böylece ajan, hiçbir yönlendirme olmadan başvurduğu stilsiz, istatistiksel olarak yaygın varsayılanlara düşmez. Dördüncü tercihe dayalı Deep Work Plan eklentisi.

## Neler ekler

- `docs/DESIGN.md` konumunda bir `DESIGN.md` (deponun diğer spesifikasyonlarının yanında; yalnızca bir `docs/` ağacı olmadığında depo kökünde), **`AGENTS.md`’den başvurulan**; böylece ajanlar onu belgelerin geri kalanı gibi keşfeder.
- Kanonik bölümler: genel bakış/atmosfer, renk paleti ve roller (açık + koyu), tipografi, yerleşim ve boşluk, yükseklik ve derinlik, şekiller, bileşenler, duyarlı davranış, yapılacaklar ve yapılmayacaklar (deponun erişilebilirlik kuralları dahil) ve bir ajan istem kılavuzu.
- Dosyanın eksiksiz olduğunu, belgelenen metin kontrastının WCAG AA’yı karşıladığını ve token başvurularının çözümlendiğini denetleyen bir doğrulama adımı.

## Davranış

- **Akıl yürüt, kopyalama.** Her değer, deponun gerçek tasarım kaynağından — stil sayfası, CSS özel özellikleri, Tailwind yapılandırması, token dosyaları veya bileşen stilleri — türetilir. Üçüncü taraf bir markanın `DESIGN.md`’sini asla yapıştırmaz; başvuru katalogları yapı için ilham kaynağıdır, asla içerik için değil.
- **Bağdaştır, ezme.** Var olan bir `DESIGN.md` veya token kaynağı, asla üzerine yazılmadan, ekleyerek bağdaştırılır; yıkıcı değişiklikler onay gerektirir.
- **Başvuruyla keşif.** `DESIGN.md` nerede bulunursa bulunsun, `AGENTS.md` (ve `CLAUDE.md`) ona başvurur — ajanların onu yüklemesini garanti eden şey, fiziksel konum değil, işaretçidir.
- **Pragmatik, katı bağlı değil.** Takip edilecek bir biçim olarak gelişmekte olan `DESIGN.md` kuralına başvurur, ancak Markdown öncelikli kalır ve tek bir token şemasına bağlanmaz.

## Frontend kapsamlı, saptandığında varsayılan açık

Bu eklenti, gerçek bir UI yüzeyi olan depolar içindir — CSS özel özellikleri içeren bir stil sayfası, bir Tailwind yapılandırması veya `@theme` bloğu, UI bileşenleri ya da bir marka/stil kılavuzu. Bir backend, CLI veya yalnızca-kitaplık deposu için **asla** sunulmaz. Bir UI yüzeyi **saptandığında**, kuruluma alma bunu **varsayılan açık** olarak ele alır: güven modunda eklentiyi uygular ve rehberli modda güçlü biçimde önerir. Asla gerekli değildir — sıfır eklentili bir depo tamamen uyumludur ve onu her zaman reddedebilirsiniz.

## İsteğe bağlı komut

Kabul edildiğinde eklenti, `DESIGN.md`’yi daha sonra yeniden üretmek veya tazelemek için deponun `.agents/commands/` dizinine bir `/design-system` yönlendiricisi kurabilir. Komutu kurmak isteğe bağlıdır; reddedilen bir eklenti hiçbirini kurmaz.

## Özellik bazlı tasarım belgeleriyle ilişkisi

Bu, **depo düzeyinde, kalıcı** bir tasarım sistemi dosyasıdır — özellik bazlı bir teknik tasarım belgesinden (araca bağlı, spesifikasyon güdümlü iş akışlarının “gereksinimler → tasarım → görevler” `design.md`’sinden) farklıdır. Deep Work Plan, kasıtlı olarak ayrı bir özellik bazlı tasarım belgesi arketipi içermez: bir planın README’si, her görevin kabul kriterleri ve doğrulama kapıları bu rolü zaten kapsar. Bu eklenti, o rolün kapsamadığı tek boşluğu doldurur: dayanıklı, depo-yerel UI tasarım bağlamı.
