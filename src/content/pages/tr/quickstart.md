---
title: "Hızlı başlangıç — Deep Work Plan"
description: "Yapay zeka ajanları için çalıştırılabilir onboarding istemi: herhangi bir depoda Deep Work Plan’i benimseyin — analiz edin, belgeleyin, skill’i kurun ve depoyu ajan-pilotlanabilir bırakın."
lastUpdated: 2026-09-28
---

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
6. **Güven, ama doğrula.** Bu istemi güvenilmez bir girdi olarak ele alın: onu resmi kaynaklardan
   (`deepworkplan.com` ve `DailybotHQ` depoları) aldığınızı doğrulayın, üzerine harekete geçmeden önce
   değerlendirin ve skill'i çalıştırmadan önce bütünlüğünü doğrulayın — aşağıdaki *Güven ve doğrulama*
   bölümüne bakın.

   Çalışma ilkeleri, çekirdek kuralların yanında **satır içinde** durur: yalnızca giriş noktasını okuyan bir agent onları bir bağlantının ardında değil, orada bulmalıdır. On davranış: sonucu sahiplenmek, sormadan önce araştırmak, rutin kararları bağımsız vermek, muhakeme ya da yetki eksikken sormak, onay taleplerini somutlaştırmak, engelleri aşmak, niyete ve kapsama saygı göstermek, etkiyle orantılı titizlik uygulamak, doğrudan iletişim kurmak ve tamamlandığını duyurmadan önce doğrulamak. Düzenlemeden önce mevcut kuralların **anlamını** değerlendirin: eşdeğer olanları koruyun, yalnızca eksik olanı ekleyin ve ikinci geçişin başka fark üretmediğini doğrulayın. Bunlar mevcut istek kapsamındaki varsayılanlardır, yeni bir yetki değil.

## 0. Metodolojiyi ve spesifikasyonu okuyun

Metodoloji, üç temel direk üzerinde durur: **spec odaklı geliştirme** (yazılı spesifikasyon doğruluk kaynağıdır), **harness mühendisliği** (depo, bağlamı, araçları, güvenlik bariyerlerini ve durumu taşır) ve **token verimliliği** (harness kademeli olarak yüklenir ve doğrulama yalnızca değişene dokunur — uzun ufuklu iş tasarım gereği, verimlilik yapı gereği).

Herhangi bir şeyi değiştirmeden önce, benimsediğiniz standardı anlamanız için kanonik kaynakları okuyun:

- Metodoloji: https://deepworkplan.com/methodology.md
- Spesifikasyon: https://deepworkplan.com/spec.md
- Kit kataloğu: https://deepworkplan.com/kit.md

## 1. Keşif ve onaylanacak bir plan

Önce depoyu anlayın, ardından ne yapacağınızı önerin.

- **Yığını tespit edin.** Diller, çerçeveler, paket yöneticisi (gerçekten var olan lockfile’dan),
  gerçek build/test/lint/tür denetimi komutları, kaynak modüller, test kuralı ve dağıtım biçimi.
- **Arketipi sınıflandırın.** Bir bireysel depo (yaygın durum), bir orkestratör merkezi ya da bir
  ajan çalışma alanı — git'in varsayılan değil önerilen olduğu, otonom bir ajanın uzun ömürlü evi —
  kanıtlarıyla birlikte.
- **Var olan bir DWP kurulumunu tanıyın.** `AGENTS.md` ve `.agents/` zaten varsa, `DWP standard:` kaynak
  satırını arayın. Mevcut standardın öncesine dayanan bir harness, **hedefli bir yükseltme** alır: skill'i
  yeniden kurmak yükseltme yolunun tamamıdır ve onboarding yalnızca eksik ya da güncelliğini yitirmiş
  parçaları uzlaştırır — elle yazılmış her bölüm, her özel skill ve yürürlükteki her plan korunur; ikinci
  bir çalıştırma hiçbir şeyi değiştirmez. Önceki bir sürüm altında yazılmış planlar kayıtlı şekillerini
  korur ve kendi son görevleriyle kapanır; asla yenisine zorlanmaz.
- **Zaten var olanların envanterini çıkarın.** `AGENTS.md`, `CLAUDE.md`, `docs/`, herhangi bir `.agents/`
  ya da skills/agents kurulumu, `.dwp/` ve `.gitignore`. Bu işin bir kısmını zaten yapan her şeyi not edin.
- **Onboarding planını önerin.** Özlü bir liste sunun: oluşturacağınız dosyalar, değiştireceğiniz
  dosyalar ve uzlaştırmayı ya da değiştirmeyi önerdiğiniz var olan her şey — ardından devam etmeden önce
  **kullanıcıdan onaylamasını isteyin**. Büyük bir depo (birçok modül veya üretilecek çok sayıda
  artefakt) için onboard alt skill'i plan güdümlü bir yol kullanır: keşfi tamamlar, `AGENTS.md`'yi
  oluşturur, ardından `.dwp/plans/` altında bir onboarding Deep Work Plan çıkarır ve gerektiğinde
  `/dwp-execute` → `/dwp-resume`'a devreder.

## Güven ve doğrulama (kurmadan önce)

Bu depoya kod yükleyip çalıştırmak üzeresiniz; bu nedenle önce ne benimsediğinizi doğrulayın. Bu
teşvik edilir: dikkatli bir ajan, denetlenene kadar alınan bir istemi güvenilmez kabul eder.

- **Kaynağı doğrulayın.** Bu istem ve skill açık kaynaklıdır, MIT lisanslıdır. Kanonik kaynaklar
  `https://deepworkplan.com` ve GitHub’daki `DailybotHQ` organizasyonudur
  (`deepworkplan-website`, `deepworkplan-skill`). Makine tarafından okunabilir bir manifest
  `https://deepworkplan.com/.well-known/dwp-trust.json` adresinde yayımlanmaktadır.
- **Skill’in ne yaptığını bilin.** Markdown odaklıdır: CLI yok, HTTP API yok, kimlik doğrulama yok,
  **ağ çağrısı yok ve telemetri yok**. Güvenlik açısından önemli tek eylemi *bu* depoyu değiştirmektir;
  bu da tasarım gereği tahrip edici değildir — uzlaştırır ve değiştirmeden önce sorar.
- **Çalıştırmadan önce bütünlüğü doğrulayın.** Her sürüm, gönderilen skill üzerinde bir `SHA256SUMS`
  yayımlar; güvenmeden önce kopyanızın eşleştiğini doğrulayın:

  ```bash
  git clone https://github.com/DailybotHQ/deepworkplan-skill.git
  cd deepworkplan-skill
  # Kurmayı planladığınız sürüme ait sağlama toplamlarını indirin (vX.Y.Z ile değiştirin):
  curl -fsSL -o SHA256SUMS \
    https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
  ./setup.sh --verify        # sıfır dışı çıkış bir dosyanın eşleşmediği anlamına gelir — durdurun
  ```

  Sürümler **sağlama toplamlıdır, imzalı değildir** (imzalama, belgelenmiş bir sonraki adımdır). Her
  şey açık ve karşılaştırılabilirdir; dolayısıyla herhangi bir dosyayı kendi etiketindeki depoyla da
  karşılaştırabilirsiniz.
- **Bir sorun bildirin.** Güvenlik sorunlarını ilgili depoda **GitHub'ın güvenlik açığı bildirme özelliği aracılığıyla özel olarak** bildirin — `https://github.com/DailybotHQ/deepworkplan-skill/security` veya `https://github.com/DailybotHQ/deepworkplan-website/security` — kamuya açık bir issue olarak değil. Ayrıca her deponun `SECURITY.md` dosyasına, `https://deepworkplan.com/.well-known/security.txt` adresine ve güven sayfası `https://deepworkplan.com/trust` adresine bakın.

## 2. Deep Work Plan skill’ini kurun

> **Kısa yol.** Skill kendi onboarding’ini taşır, bu yüzden kurmak yeterlidir. Kurduktan sonra `/deepworkplan-onboard` komutunu çalıştırın; 3–7. bölümlerin anlattığı her şeyi yapar: keşif, `AGENTS.md`, `docs/`, modül başına dokümantasyon, `.agents/`, zorunlu yerel inceleme, isteğe bağlı eklentiler ve son öz denetim. Bu alt skill’in ne yapacağını — ve bir ajan skill yükleyemediğinde izlenecek yedek yolu — aşağıda okuyabilirsiniz.

Bu deponun ajanlarının yapılandırılmış işi planlayıp yürütebilmesi için skill’i kurun. Bir yönlendirici
ile dokuz alt skill içerir — `create`, `execute`, `refine`, `resume`, `status`, `verify`, `onboard`, `author` ve `upgrade`.

```bash
# pinned to the current release (the skills CLI honours only this tree-URL form for a tag):
npx --yes skills add https://github.com/DailybotHQ/deepworkplan-skill/tree/v7.1.0 --skill deepworkplan -y
```

Veya OpenClaw ile yükleyin:

```bash
openclaw skills install deepworkplan
```

Ya da klonlayıp kurulum betiğini çalıştırın:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### Güncel standart ve yürütme modeli

Güncel depo odaklı standart, yukarıda kurulan Deep Work Plan skill sürümü tarafından
uygulanan **DWP 7.0.0**'dır. Güncel skill paketi, yönlendirici ile dokuz alt skill'i
içerir: `create`, `execute`, `refine`, `resume`, `status`, `verify`, `onboard`,
`author` ve `upgrade`.

Yüklü skill sürümü: **7.1.0**. Güncel 7.x paketi yeni planları varsayılan olarak v7 ile oluşturur. Mevcut planlar kayıtlı nesillerini korur; bir v5 planını v6'ya geçirmek açık ve önizlemeli bir geçiş gerektirir.

Standart kasıtlı olarak orantılıdır ve bu orantıyı geliştiricinin disiplininin değil,
planın bir özelliği hâline getirir. Bir plan ya küçük, sınırlı iş için planın
README'sinde satır içi görev kayıtları tutan **Lite**'tır ya da uzun soluklu iş için
görev başına bir dosya tutan **Full**'dur. Seçim, katılıkla değil temsil maliyetiyle
ilgilidir: her iki biçim de kararlı görev kimlikleri, bir Dokunulan Yüzey, kabul
kriterleri, doğrulama kapıları ve tamamlanma kanıtları taşır; bu yüzden bir Lite plan
bir taslak değil, gerçek bir plandır. Biçim, somutlaştırma, onay ve yürütme bağımsız
eksenlerdir; kompakt kayıtlar bir gereksinimi veya kapıyı artık taşıyamadığında bir
Lite plan `/dwp-refine promote` ile Full'a yükseltilir.

Full bir plan için depo, kalıcı yürütme yüzeyidir. Plan; nelerin değiştiğini ve hangi
tüketicilerin etkilendiğini açıklayan atomik görevler, bir **Dokunulan Yüzey**, kabul
kriterleri ve deponun belgelenmiş test haritasından seçilen bir doğrulama kapısı
içerir. Yeni bir plan önce kimlik manifestosunu, ardından sürümlü sözleşmesini, sonra da onay olayını yazar. Yalnızca eklemeli günlük yürütmeyi kaydeder; `state.json` bu günlükten türetilen bir anlık görüntüdür. Her adım kesintiden sonra kurtarılabilir.

Şema nesli her plana bağlı kalır. Güncel 7.x paketi varsayılan olarak **v7**
planları oluşturur: `manifest.json`,
https://deepworkplan.com/schema/plan-manifest/v7.json şemasını izler;
[sözleşme](https://deepworkplan.com/schema/plan-contract/v7.json), v6 sözleşmesine
isteğe bağlı bir `parallel_safe` görev işaretçisi ekler; her
[günlük olayı](https://deepworkplan.com/schema/journal-event/v7.json) ayrıca bir
`delegation` da kaydedebilir. Canlı görünüm, değişmeden kalan
https://deepworkplan.com/schema/plan-snapshot/v6.json anlık görüntüsünü korur ve
[görev bağlam manifestosu](https://deepworkplan.com/schema/context-manifest/v6.json)
v6 ile ortaktır. Açık bir `v6` isteği yine bir v6 planı oluşturur.
Bir plan neslini asla değiştirmez: v6 planları kendi v6 şemalarını
([manifesto](https://deepworkplan.com/schema/plan-manifest/v6.json),
[sözleşme](https://deepworkplan.com/schema/plan-contract/v6.json),
[günlük olayı](https://deepworkplan.com/schema/journal-event/v6.json)) korur ve
değişmeden çalışır; v5 planları `state.json` için
https://deepworkplan.com/schema/plan-state/v5.json şemasını kullanmaya devam eder;
mevcut v1, v2 ve v5 planları asla yeniden yazılmaz ya da örtük olarak taşınmaz ve
bir v5 planını v6'ya geçirmek açık, önizlemeli bir geçiş gerektirir.

İsteğe bağlı eklentiler, depo başına izlenen eklenti kaydı `.dwp/config.json`
(https://deepworkplan.com/schema/dwp-config/v1.json) içinde kaydedilir: kaydın
olmaması etkin olmadığı anlamına gelir ve metodoloji tüm eklentiler devre dışıyken de
çalışır. Bir v7 planı, `parallel_safe` bir görevi başka bir kodlama ajanına yalnızca
sözleşmesi `agent_delegation` yetkisi veriyorsa ve bir devretme eklentisi (agentkit
veya Herdr) etkin ve algılanmışsa devredebilir; devredilen ajanın sonucu, planın
kendi kapı çalıştırıcısı onu gözlemleyene kadar bir iddia olarak kalır.

Her planın zorunlu bir kapanış görevi vardır: **Final Review**. Bu görev, gerekli
yerel AI Diff Reviewer incelemesi dâhil olmak üzere birikmiş değişiklik kümesi
üzerinde güvenlik taramasını çalıştırır, nihai depo durumunu doğrular, görevler
tarafından kullanılan skill'leri uzlaştırır ve kanıtları ile sınırlamaları kaydeder.
Yerel inceleme skill'i sabitlenmiş bir sürümde kurulur; şu anda belgelenen komut
`https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.0` sürümünü kurar. GitHub Action, ayrı ve isteğe bağlı
bir CI yüzeyidir ve temel metodoloji için asla zorunlu değildir.

Çalışıp hiçbir şey bildirmeyen bir inceleme ile hiç bulgu üretemeyen bir inceleme aynı şey değildir. İkincisi **tamamlanmamış bir incelemedir**: öyle kaydedilir, değişiklik kümesinin temiz olduğunun kanıtı olarak asla sayılmaz ve Final Review'i kapatmak için asla gerekçe olmaz — engelleyici katılık altında bir `timeout` incelemesinin aldığı ile aynı kırmızı muamele (BC-04). Eksik bir inceleyici ve hata veren bir çağrıyla birlikte bunlar üç ayrı durumdur — ve hiçbiri diff'in incelenip temiz bulunduğu anlamına gelmez. `Recommendation: approve` diyen bir gövde de check’in geçtiğinin kanıtı değildir. Önce izleme işaretinin Highest severity / Strictness gate / Check status bloğunu okuyun — kapı başarısızken çalışma zamanı modelin `approve` satırını yeniden yazar.

Gözetimsiz yürütme yalnızca önceden onaylanmış bir plan için desteklenir. Makine
tarafından okunabilir durum katmanını, beyan edilmiş bir DWP standardını, sınırlı
yetkiyi ve açık durdurma koşullarını gerektirir. Bir kapı, planlanan onarım kapsamı
dışında başarısız olursa, depo ayrışırsa veya yeni bir onay ya da kimlik bilgisi
gerekirse, ajan engeli kaydeder ve durur. Hiçbir akış, tamamlanmayı iddia etmek için
bir doğrulama kapısını zayıflatmaz.

## 3. Depoyu onboarding edin (akıl yürütmeye dayalı ve tahrip edici olmayan)

onboard alt skill’ini (`/deepworkplan-onboard`) çağırın. Gerçek depo hakkında akıl yürütün ve her şeyi
ona uyarlayın. Aşağıdaki her artefakt için, **zaten varsa onu uzlaştırın** (birleştirin, iyileştirin,
metodolojiyle hizalayın) — üzerine yazmak yerine — ve herhangi bir şeyi değiştirmeden önce kullanıcıyla
teyit edin.

1. **`AGENTS.md` + `CLAUDE.md`.** Kökte bir `AGENTS.md` üretin — bir dizin, zorunlu kurallar
   (yalnızca İngilizce, conventional commits, deponun gerçek test deseni ve inceleme kapıları) ve
   deponun **gerçek, çalıştırılabilir** komutlarını içeren bir Hızlı Komutlar bloğu. Zaten bir
   `AGENTS.md` varsa, onu değiştirmek yerine içine birleştirin. `CLAUDE.md → AGENTS.md` sembolik bağını
   oluşturun (var olan bir `CLAUDE.md`’yi sormadan ezmeyin). Benzer şekilde, yoksa `.cursor → .agents` sembolik bağını oluşturun.
2. **`docs/`.** Standart kategorileri gerçek, depoya özgü içerikle doldurun: `PRODUCT_SPEC.md` (teknik olmayan ürün/neden belgesi — kütüphaneler dahil her depo için zorunlu), `ARCHITECTURE.md`,
   `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md` (asla atlanmaz —
   hiç sırrı olmasa bile her deponun bir güvenlik duruşu vardır),
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, ayrıca `PERFORMANCE.md` ve bir `docs/README.md` dizini.
   Dokümanlar zaten varsa, onları bütünleştirip genişletin — çoğaltmayın.
3. **Modül başına dokümanlar.** Keşifte bulunan her büyük kaynak modülün içine bir `README.md` (ve
   karmaşık modüller için bir `docs/` alt klasörü) ekleyin.
4. **`.agents/` + `.claude → .agents` + `.cursor → .agents`.** Kanonik, ajanlar arası yuvayı oluşturun: kurulu skill’e yetki
   devreden `agents/`, yığına uygun `skills/` ve ince `dwp-*` `commands/`’tan oluşan **akıl yürütülmüş**
   bir katalog — her girdi başkasından kopyalanmış değil, *bu* depo için gerekçelendirilmiş. Diskte olanla
   eşleşen bir `docs/` kataloğu (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`), ayrıca
   `settings.json` ve `.claude → .agents` ile `.cursor → .agents` sembolik bağlarını ekleyin. Var olan skill’leri/ajanları kataloğa
   dahil edin.
5. **Uyarlanmış DWP skill’i.** Kurulu skill motordur; deponun kendi kiti
   (skill’ler, ajanlar, komutlar) **bu depo için akıl yürütülmüş** olmalıdır — asla başka bir deponun
   kitinin kopyala-yapıştırı değil.
6. **`.dwp/` + `tmp/`.** `plans/` içeren gitignore’lanmış bir `.dwp/` ve bir `tmp/` karalama
   alanı iskeletleyin — ikisi de `.gitignore`’a tahrip edici olmadan eklenir (ekleyin, asla yeniden
   yazmayın). İkisi birbirinin yerine geçmez: bir akışın **bir plan hakkında** ürettiği her şey — analiz, skills defteri, güvenlik incelemesi, kapı kayıtları, denetim raporları — o planın kendi `.dwp/plans/PLAN_001_<slug>/analysis_results/` dizininde durmalıdır; deponun kökünde de `tmp/` içinde de değil. `tmp/`, hiçbir planın bir daha okumayacağı işler içindir.

Yeni planlara en az üç basamaklı, monoton artan sayısal kimlikler verilir (örneğin `PLAN_001_add_payment_webhooks/`). Dondurulmuş v5 şemaları sayısal kimliği bir sözcük saydığı için v5 slug’ları 2–4, v6 ve v7 slug’ları 2–5 sözcük içerir. Mevcut numarasız `PLAN_<slug>/` klasörleri okunabilir kalır ve hiçbir zaman yeniden adlandırılmaz. Numaralı planlar varsa `latest`, sayısal kimliği en yüksek olan planı gösterir.

## 4. Gerekli yerel incelemeyi kurun, ardından tercihe dayalı eklentileri sunun

Temel onboarding sonrasında, **AI Diff Reviewer yerel incelemesini** kurun (Faz 7a — 2.3.0
standardından itibaren gereklidir): etikete sabitlenmiş vendored skill
(`npx --yes skills add https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.0 --skill ai-diff-reviewer -y`) artı
`generate-extension` aracılığıyla depoya uyarlanmış bir `.review/extension.md`, onboarding onayı
altında. Ardından yedi isteğe bağlı eklentiyi (devcontainer, Dailybot, dependency upgrade,
design system, agentkit, Herdr, DeepWorkPlan Vim) sıralayın, her birini açık bir tercih olarak
sunun ve her kabulü `.dwp/config.json` içine kaydedin. Bir depo, **sıfır** isteğe bağlı
eklentiyle tümüyle uyumludur — onları asla otomatik kurmayın.

- **Devcontainer desteği** — [devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) için ince bir entegrasyon katmanı (`dck`, `v0.2.2` sürümüne sabitlenmiş, `dck-dockerfile` becerisiyle birlikte): `dck init` deponun kendi konteynerini oluşturur — özetle (digest) sabitlenmiş resmî imaj, ortak temel imaj yok, `bash dev.sh up` — ve mevcut bir devcontainer’ı yalnızca farkı (diff) kabul edildikten sonra uzlaştırır; kodlama agent’ları isteğe bağlı bir katmandır.
- **Dailybot entegrasyonu** — dört yaşam döngüsü olayı (kickoff, önemli görev, engellendi, tamamlandı) olarak zaten Dailybot kullanan ekipler için en iyi çabayla ilerleme raporlaması; isteğe bağlı otonom kanca zorlama (`dailybot-cli >= 3.9.0`). Eşleştirilmiş Dailybot ajan skill’inin (3.23.3) kurulması ayrıca sohbet, check-in’ler, form yazarlığı, AI’ye sorma, Plan panoları ve görevleri, depo başına API anahtarları ve daha fazlasını açar — eklenti yalnızca raporlamayı DWP yürütmesine bağlar. Çekirdek metodolojinin Dailybot’a hiçbir bağımlılığı yoktur.
- **Dependency upgrade** — paket yöneticisinden bağımsız, gruplanmış, doğrulanmış, geri alınabilir
  yükseltmeler. Kabul edildiğinde, `/lib-upgrade` komutunu kurar.
- **Design system** — yalnızca saptanan arayüz yüzeyi olan depolar için isteğe bağlı `docs/DESIGN.md`
  (saf kütüphanelere, headless servislere veya yalnızca altyapı depolarına sunulmaz). Üç profil tek bir
  dosyada katmanlanır: visual-ui (saptandığında güçlü biçimde önerilir; kurulum kabul ile sınırlı), cli-output ve conversational —
  son ikisi her zaman sorulur, asla otomatik uygulanmaz.
- **agentkit** — sınırlı `parallel_safe` görevleri başka kodlama agent’larına devreden planlar için [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit) (`ak`, `v0.3.0` sürümüne sabitlenmiş) aracının makine düzeyinde kurulumu (başsız; her delege için kendi worktree’sinde bir `ak run`); kit, agent’ları varsayılan olarak özerk başlatır ve devre dışı bırakma seçeneği (`--ask` ya da `AGENTKIT_PERMISSIONS=ask`) her zaman üstün gelir.
- **Herdr** — herhangi bir makinedeki Herdr bölmesinde bulunan eş bir agent’tan tek bir yetkili yanıt isteyen planlar için [herdr-peers](https://github.com/DailybotHQ/herdr-peers) (`v0.1.0` sürümüne sabitlenmiş, artı Herdr’ın resmî skill’i) aracının makine düzeyinde kurulumu.
- **DeepWorkPlan Vim** — terminal düzenleyicisi ([deepworkplan-vim](https://github.com/DailybotHQ/deepworkplan-vim), `v0.5.1` sürümüne sabitlenmiş); mevcut bir Neovim yapılandırmasının üzerine açık onay olmadan asla yazmayan, makine düzeyinde bir kurulum.
- **AI Diff Reviewer** — gerekli yerel inceleme (bir opt-in değil): her Final Review’in güvenlik
  incelemesi, planın birikmiş değişiklik kümesi üzerinde [AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) **v3**’yi (skill + gerekli
  `.review/extension.md`) çalıştırır. Eksik bir skill veya uzantı, kaydedilmiş bir `local reviewer not installed` bulgusudur — asla sessiz bir atlama değildir ve asla sürpriz bir önyükleme değil: kurulum, onboarding onayına veya açık bir addon çağrısına aittir; çağrı hataları yumuşak başarısızlıkla geçer; tamamlanmış bir geçişten gelen **doğrulanmış kritik bulgular** hâlâ tamamlanmayı bloke eder (v3, BC-07 — doğrulanmamış kritik iddialar ek açıklamalı uyarı olarak gelir ve bir `incomplete`/`timeout` incelemesi temiz bir geçiş değildir, BC-04). **Flow B** (`pr-review.yml` ile CI kapısı) açık bir tercih olarak sunulur ve
  istenmeden asla kurulmaz. Hiçbir Deep Work Plan akışı ticari bir servis, CI sağlayıcısı veya sır gerektirmez.

## 5. Kiti geliştirin (author alt skill’i)

Onboarding sonrasında deponun kendi kitini büyütmek için `author` alt skill’ini kullanın. İnce yetki
devredicileri `/skill-create` ve `/agent-create` ona yönlendirir. Tekrarlanabilir, oturum içi bir
prosedür için bir **skill**, kendi model katmanı ve araçları olan yinelenen bir rol için bir **ajan** ve
yalnızca ince bir yetki devredici olarak bir **komut** oluşturun. `.agents/docs/` kataloğunu diskte
olanla eşitli tutun.

## 6. Planlayın ve yürütün

Herhangi bir görev için Deep Work Plan’ler üretin ve onları görev görev çalıştırın:

- `/dwp-create <hedef>` — bir hedefi çalıştırılabilir bir plana dönüştürür. 2.4.0 standardından beri bir planın iki biçimi vardır: görev kayıtları planın README’si içinde satır içi duran ve küçük, sınırlı işler için uygun **Lite**; ve görev başına bir dosya tutan, uzun soluklu işler için uygun **Full**. İkisi de aynı sözleşmeyi taşır — kararlı görev id’leri, dokunulan yüzey, kabul ölçütleri, doğrulama kapıları, tamamlanma kanıtı ve tek bir Final Review — yani Lite yalnızca temsil maliyeti düşüktür, daha zayıf değildir. Biçimi zorlamak için `lite` ya da `full`, inceleme turu olmadan somutlaştırmak için `trust` ekleyin; tercih belirtilmezse DWP birini önerir ve nedenini açıklar. Bir Lite plan `/dwp-refine promote` ile yükseltilir.
- `/dwp-execute` — planı görev görev yürütür, ilerlemeyi günceller ve her kapıyı doğrular.
- `/dwp-status` — değişiklik yapmadan ilerlemeyi raporlar.
- `/dwp-refine` — tamamlanmış işi korurken görev ekler, çıkarır veya yeniden sıralar.
- `/dwp-resume` — durumu yeniden oluşturur ve kesintiye uğramış bir planı sürdürür.
- `/dwp-verify` — depo (veya belirli bir plan) için nesnel bir geçti/kaldı uyumluluk raporu.

Her plan, Final Review ile kapanır — planın kendi değişiklikleri üzerinde bir güvenlik incelemesi
(`docs/SECURITY.md` güncel tutulur; kritik bir bulgu tamamlanmayı engeller), nihai durum doğrulaması ve skills kararlarının uzlaştırılması. Executive Report istek üzerine sunulmaya devam eder.

## 7. Doğrulayın

Nesnel bir geçti/kaldı uyumluluk raporu için `/dwp-verify` çalıştırın (veya `0`/`1`
ile çıkan CI uyumlu mekanik katman olan `bash {skill_dir}/verify/conformance.sh`; kontrollerini çalıştıramadığında açık bir `UNVERIFIED` bildirimiyle `2` ile çıkar — doğrulamadığı bir geçişi asla raporlamaz).
[Spesifikasyonun Uyumluluk belgesindeki](https://deepworkplan.com/spec) ölçütleri denetler,
ardından şunları teyit edin:

- [ ] Skill kuruludur ve çözümlenebilir, dokuz alt skill’in tümü kullanılabilir.
- [ ] Kökte gerçek bir Quick Commands bloğu ve on davranışı kapsayan satır içi çalışma ilkeleriyle `AGENTS.md` bulunur; `CLAUDE.md` ona çözümlenir.
- [ ] `docs/`, standart kategorileri gerçek, depoya özgü içerikle barındırır;
      `docs/TESTING_GUIDE.md` gerçek bir test/lint kurulumunu tanımlar (boş ya da taslak değil);
      büyük modüllerin bir `README.md` dosyası vardır.
- [ ] `.agents/`, `agents/`, `commands/` (kopyalanmış akışlar değil, skill’e referans veren ince
      `dwp-*` yetki devredicileri), `skills/` ve diskte olanla eşleşen bir katalog ile vardır;
      `.claude → .agents` ve `.cursor → .agents` çözümlenir.
- [ ] `.dwp/` vardır, gitignore’lanmıştır ve `plans/` içerir; `tmp/` vardır ve gitignore’lanmıştır.
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

## Sonraki adımlar

- [Metodolojiyi okuyun](/methodology)
- [Spesifikasyon](/spec)
- [Kite göz atın](/kit)
- [Örnekleri görün](/examples)
- [İsteğe bağlı: DeepWorkPlan Vim terminal düzenleyicisi](/kit/vim)
