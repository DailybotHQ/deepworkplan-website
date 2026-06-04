---
title: Init — Deponuzu AI-first yapın
description: "Yapay zeka ajanları için çalıştırılabilir onboarding istemi: herhangi bir depoda Deep Work Plan’i benimseyin — analiz edin, belgeleyin, skill’i kurun ve depoyu ajan-pilotlanabilir bırakın."
---

# Init — Yapay zeka ajanları için onboarding istemi

Siz bir yapay zeka kodlama ajanısınız. Önce bu istemin tamamını okuyun, ardından Deep Work Plan (DWP)
metodolojisini benimseyerek mevcut depoyu **AI-first**, **spec odaklı** ve **ajan-pilotlanabilir** hâle
getirin. Bunu hızlı bir düzenleme değil, yapılandırılmış bir mühendislik görevi — bir Deep Work Plan —
olarak ele alın.

## İşleyiş ilkeleri (herhangi bir şeyi değiştirmeden önce okuyun)

1. ***Bu* depo hakkında akıl yürütün.** Asla bir şablon kopyalamayın veya bir yer tutucu bırakmayın.
   Yazdığınız her dosya, deponun gerçek dillerini, çerçevelerini, komutlarını ve yapısını yansıtmalıdır.
   Genel bir taslak bir teslimat değil, bir başarısızlıktır.
2. **Tahrip edici olmayın — değiştirmeden önce sorun.** Depoda zaten bir `AGENTS.md`, bir `docs/` ağacı,
   bir `.agents/` ya da skills kurulumu, bir `CLAUDE.md` veya kendi kuralları bulunabilir. Var olan işi
   sessizce **üzerine yazmayın**, taşımayın veya silmeyin. Neyin var olduğunu tespit edin, okuyun ve
   **uzlaştırın**: mümkün olan her yerde yerinde birleştirip iyileştirin. Kullanıcının zaten sahip
   olduğu herhangi bir şeyi değiştirmeden ya da kaldırmadan önce, neyi neden yapacağınızı açıklayın ve
   açık onayını alın.
3. **Planı önerin, ardından yürütün.** Keşiften sonra kısa bir plan sunun — neyi oluşturacağınızı, neyi
   değiştireceğinizi ve uzlaştırmayı ya da değiştirmeyi önerdiğiniz var olan her şeyi — ve büyük veya
   tahrip edici değişiklikler yapmadan önce kullanıcının onaylamasını bekleyin.
4. **Güvenli, gözden geçirilebilir artımlarla çalışın.** Mantıklı biçimde commit edin, diff’leri
   okunabilir tutun, hiçbir gizli bilgiye dokunmayın ve ilgisiz kodu olduğu gibi bırakın.
5. **Durup raporlayın** bir adım başarısız olursa veya depo durumu belirsizse.

## 0. Metodolojiyi ve spesifikasyonu okuyun

Herhangi bir şeyi değiştirmeden önce, benimsediğiniz standardı anlamanız için kanonik kaynakları okuyun:

- Metodoloji: https://deepworkplan.com/methodology.md
- Spesifikasyon: https://deepworkplan.com/spec.md
- Kit kataloğu: https://deepworkplan.com/kit.md

## 1. Keşif ve onaylanacak bir plan

Önce depoyu anlayın, ardından ne yapacağınızı önerin.

- **Yığını tespit edin.** Diller, çerçeveler, paket yöneticisi (gerçekten var olan lockfile’dan),
  gerçek build/test/lint/tür denetimi komutları, kaynak modüller, test kuralı ve dağıtım biçimi.
- **Arketipi sınıflandırın.** Bir bireysel depo (yaygın durum) ya da bir orkestratör merkezi,
  kanıtlarıyla birlikte.
- **Zaten var olanların envanterini çıkarın.** `AGENTS.md`, `CLAUDE.md`, `docs/`, herhangi bir `.agents/`
  ya da skills/agents kurulumu, `.dwp/` ve `.gitignore`. Bu işin bir kısmını zaten yapan her şeyi not edin.
- **Onboarding planını önerin.** Özlü bir liste sunun: oluşturacağınız dosyalar, değiştireceğiniz
  dosyalar ve uzlaştırmayı ya da değiştirmeyi önerdiğiniz var olan her şey — ardından devam etmeden önce
  **kullanıcıdan onaylamasını isteyin**. Büyük bir depo için bu planı `/dwp-create` ile yakalayın ve onu
  bir Deep Work Plan olarak yürütün.

## 2. Deep Work Plan skill’ini kurun

Bu deponun ajanlarının yapılandırılmış işi planlayıp yürütebilmesi için skill’i kurun. Bir yönlendirici
ile sekiz alt skill içerir — `create`, `execute`, `refine`, `resume`, `status`, `verify`, `onboard` ve `author`.

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Ya da klonlayıp kurulum betiğini çalıştırın:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 3. Depoyu onboarding edin (akıl yürütmeye dayalı ve tahrip edici olmayan)

onboard alt skill’ini (`/deepworkplan-onboard`) çağırın. Gerçek depo hakkında akıl yürütün ve her şeyi
ona uyarlayın. Aşağıdaki her artefakt için, **zaten varsa onu uzlaştırın** (birleştirin, iyileştirin,
metodolojiyle hizalayın) — üzerine yazmak yerine — ve herhangi bir şeyi değiştirmeden önce kullanıcıyla
teyit edin.

1. **`AGENTS.md` + `CLAUDE.md`.** Kökte bir `AGENTS.md` üretin — bir dizin, zorunlu kurallar
   (yalnızca İngilizce, conventional commits, deponun gerçek test deseni ve inceleme kapıları) ve
   deponun **gerçek, çalıştırılabilir** komutlarını içeren bir Hızlı Komutlar bloğu. Zaten bir
   `AGENTS.md` varsa, onu değiştirmek yerine içine birleştirin. `CLAUDE.md → AGENTS.md` sembolik bağını
   oluşturun (var olan bir `CLAUDE.md`’yi sormadan ezmeyin).
2. **`docs/`.** Standart kategorileri gerçek, depoya özgü içerikle doldurun: `ARCHITECTURE.md`,
   `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md`,
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, ayrıca `PERFORMANCE.md` ve bir `docs/README.md` dizini.
   Dokümanlar zaten varsa, onları bütünleştirip genişletin — çoğaltmayın.
3. **Modül başına dokümanlar.** Keşifte bulunan her büyük kaynak modülün içine bir `README.md` (ve
   karmaşık modüller için bir `docs/` alt klasörü) ekleyin.
4. **`.agents/` + `.claude → .agents`.** Kanonik, ajanlar arası yuvayı oluşturun: kurulu skill’e yetki
   devreden `agents/`, yığına uygun `skills/` ve ince `dwp-*` `commands/`’tan oluşan **akıl yürütülmüş**
   bir katalog — her girdi başkasından kopyalanmış değil, *bu* depo için gerekçelendirilmiş. Diskte olanla
   eşleşen bir `docs/` kataloğu (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`), ayrıca
   `settings.json` ve `.claude → .agents` sembolik bağını ekleyin. Var olan skill’leri/ajanları kataloğa
   dahil edin.
5. **Uyarlanmış DWP skill’i.** Kurulu skill motordur; deponun kendi kiti
   (skill’ler, ajanlar, komutlar) **bu depo için akıl yürütülmüş** olmalıdır — asla başka bir deponun
   kitinin kopyala-yapıştırı değil.
6. **`.dwp/` + `tmp/`.** `plans/` ve `drafts/` içeren gitignore’lanmış bir `.dwp/` ve bir `tmp/` karalama
   alanı iskeletleyin — ikisi de `.gitignore`’a tahrip edici olmadan eklenir (ekleyin, asla yeniden
   yazmayın).

## 4. Kiti geliştirin (author alt skill’i)

Deponun kendi kitini büyütmek için `author` alt skill’ini kullanın. İnce yetki devredicileri
`/skill-create` ve `/agent-create` ona yönlendirir. Tekrarlanabilir, oturum içi bir prosedür için bir
**skill**, kendi model katmanı ve araçları olan yinelenen bir rol için bir **ajan** ve yalnızca ince bir
yetki devredici olarak bir **komut** oluşturun. `.agents/docs/` kataloğunu diskte olanla eşitli tutun.

## 5. Tercihe dayalı eklentileri sunun

Temel hattan sonra, üç eklentiyi sıralayın ve her birini açık bir tercih olarak sunun. Bir depo, **sıfır**
eklentiyle tümüyle uyumludur — onları asla otomatik kurmayın.

- **Devcontainer desteği** — kalıcı AI-CLI kimlik doğrulaması içeren, yeniden üretilebilir, yalıtılmış
  bir geliştirme konteyneri.
- **Dailybot entegrasyonu** — zaten Dailybot kullanan ekipler için en iyi çabayla ilerleme/dönüm noktası
  raporlaması. Çekirdek metodolojinin Dailybot’a hiçbir bağımlılığı yoktur.
- **Dependency upgrade** — paket yöneticisinden bağımsız, gruplanmış, doğrulanmış, geri alınabilir
  yükseltmeler. Kabul edildiğinde, `/lib-upgrade` komutunu kurar.

## 6. Planlayın ve yürütün

Herhangi bir görev için Deep Work Plan’ler üretin ve onları görev görev çalıştırın:

- `/dwp-create <goal>` — bir hedefi doğrulama kapıları içeren numaralandırılmış, ardışık görevlere ayrıştırır.
- `/dwp-execute` — planı görev görev yürütür, ilerlemeyi günceller ve her kapıyı doğrular.
- `/dwp-status` — değişiklik yapmadan ilerlemeyi raporlar.
- `/dwp-refine` — tamamlanmış işi korurken görev ekler, çıkarır veya yeniden sıralar.
- `/dwp-resume` — durumu yeniden oluşturur ve kesintiye uğramış bir planı sürdürür.

## 7. Doğrulayın

Nesnel bir geçti/kaldı uyumluluk raporu için `/dwp-verify` çalıştırın (bu,
[spesifikasyonun Uyumluluk belgesindeki](https://deepworkplan.com/spec) ölçütleri denetler),
ardından şunları teyit edin:

- [ ] Skill kuruludur ve çözümlenebilir, sekiz alt skill’in tümü kullanılabilir.
- [ ] Kökte gerçek bir Hızlı Komutlar bloğuyla bir `AGENTS.md` vardır; `CLAUDE.md` ona çözümlenir.
- [ ] `docs/`, standart kategorileri gerçek, depoya özgü içerikle barındırır; büyük modüllerin bir
      `README.md` dosyası vardır.
- [ ] `.agents/`, `agents/`, `commands/` (ince `dwp-*` yetki devredicileri), `skills/` ve gerçeklikle
      eşleşen bir katalog ile vardır; `.claude → .agents` çözümlenir.
- [ ] `.dwp/` vardır, gitignore’lanmıştır ve `plans/` ile `drafts/` içerir; `tmp/` vardır ve gitignore’lanmıştır.
- [ ] Var olan kullanıcı içeriği korundu ya da onayla uzlaştırıldı — hiçbir şey sessizce yok edilmedi.
- [ ] Bir Deep Work Plan üretip onu görev görev yürütebilir, her kapıyı doğrulayabilirsiniz.

## Sonuç

Onboarding tamamlandığında depo, metodolojinin temel direkleri olan iki kalıcı yönden değişir:

1. **Depo spec odaklıdır.** İş, gelişigüzel istemlerden değil, yazılı bir plandan ve spesifikasyondan
   başlar.
2. **Depo, ajan harness’ının kendisidir.** `AGENTS.md`, `docs/`, modül başına dokümanlar ve
   `.agents/` skill yuvası, her ajana yapılandırılmış, doğrulanabilir iş yapması için ihtiyaç duyduğu
   bağlamı ve komutları verir.

Herhangi biri bu istemi herhangi bir depoda çalıştırabilir — ve herhangi bir yapay zeka ajanının
pilotlayabileceği bir kod tabanıyla bitirebilir.
