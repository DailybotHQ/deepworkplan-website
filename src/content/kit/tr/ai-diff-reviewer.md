---
title: AI Diff Reviewer
description: "2.3.0 standardından itibaren her DWP Final Review'inde doğrulanmış kritik bulgularla yerel inceleme; grok CI kapısı ve address-review isteğe bağlı kalır."
kind: addon
lang: tr
order: 5
---

# AI Diff Reviewer Eklentisi

Her Deep Work Plan aynı şekilde kapanır: işin tamamlandı sayılabilmesinden önce planın biriktirdiği değişiklik kümesinin tamamını okuyan, zorunlu bir **Final Review** ile. İçindeki güvenlik incelemesi, bir şeyin hâlâ yakalanabileceği son noktadır. Yardım olmadan o noktadaki tek okuyucu, kodu yazan agent'ın ta kendisidir.

Bu eklenti o diff'in başına ikinci bir okuyucu oturtur. **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**'ı — markette "AI Diff Reviewer" adıyla yer alır, şu anda **v3.1.1** — güvenlik incelemesine bağlar; orada düzyazı yerine yapılandırılmış bir çıktı döndürür: bir karar, bir bulgu tablosu ve her bulgu için bir önem derecesi. v3'ten itibaren `critical` bir bulgu, eklentinin doğrulayıcısının onu ikinci bir koda dayalı model çağrısıyla doğruladığı anlamına gelir; yalnızca doğrulanmış kritik bulgular, düzeltilene ya da açıkça kabul edilene kadar tamamlanmayı engeller. Bu inceleme bir kapıdır, bir yorum değil.

2.3.0 standardından itibaren bu yerel inceleme **bir ek değil, temelin parçasıdır**. Kuruluma alma onu kurar; her Final Review onu çalıştırır. İsteğe bağlı kalan şey CI yüzeyidir — Flow B, yani aynı incelemenin GitHub Action üzerinden çekme isteklerini kapı altına aldığı yer.

Bunu gönül rahatlığıyla benimsenebilir kılan sınır bilinçli olarak dardır. İnceleyici, MIT lisanslı ve etikete sabitlenmiş bir skill'dir ve hâlihazırda çalıştırdığınız kod agent'ı tarafından yürütülür; dolayısıyla hiçbir Deep Work Plan akışı ticari bir hizmete, bir CI sağlayıcısına ya da bir gizli anahtara bağlı değildir. **Flow A** (yalnızca yerel), kuruluma alınmış her deponun aldığı şeydir; **Flow B** açıkça önerilir ve istenmeden asla kurulmaz. Geliştirici inceleyiciyi büsbütün reddedebilir de — bu reddediş beyan edilmiş bir istisna olarak kaydedilir ve kurulana kadar `verify` depoyu bu noktada uyumsuz olarak raporlar.

## Ne zaman kullanılır

| Sinyal | Eylem |
|--------|--------|
| Kuruluma alınan her depo | **Flow A kurulur** — onboarding'in 7a fazında (vendored skill + `.review/extension.md`); hedeflenmiş bir harness yükseltmesi onu daha önce kuruluma alınmış depolara ekler |
| Ekip yapılandırılmış bulgularla CI PR birleştirme kapısı istiyor | **Flow B'yi önerin** — açık opt-in, asla varsayılan değil |
| Kişisel veya deneysel depo; yerel inceleme yeterli | **Flow A'da kalın** — temel eksiksizdir |

## İki Benimseme Akışı

| Akış | Elde ettikleriniz |
|------|----------------|
| **A — yalnızca yerel (temel)** | Vendored skill + gerekli `.review/extension.md` (`generate-extension` aracılığıyla). Yerel incelemeyi her Final Review'in güvenlik incelemesi içinde çalıştırır. GitHub Actions iş akışı yok. |
| **B — çift yüzey** | Flow A artı `setup`, inceleme iş akışını (Action `@v3`) yazar; yerel ve CI için aynı uzantı dosyası. CI bulguları yayınladıktan sonra isteğe bağlı `apply-review` ve `address-review` yardımcıları. |

Yerel incelemenin algılanması için şu konumlardan birinde **skill + uzantı dosyası** gerekir: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` veya `.github/ai-pr-reviewer/extension.md`. Skill tek başına yeterli değildir.

## Bu eklentinin bağladıkları (tasarım gereği dar kapsamlı)

DWP eklentisi inceleyiciyi **yeniden icat etmez**. Kurulum, metodoloji, CI sihirbazı, uzantı yazarlığı, PR taslak oluşturma ve CI sonrası inceleme döngülerini yukarı akış skill'in altı alt becerisine (üst varsayılan akış, `generate-extension`, `setup`, `open-pr`, `apply-review`, `address-review`) devreder.

### Gerekli yerel inceleme

`create`, yerel inceleme adımını her Final Review'in güvenlik incelemesine ekler ve `execute` onu çalıştırır. Çıktı, plana yerel `analysis_results/SECURITY_REVIEW.md` (planın kendi klasörü içinde, asla depo kökünde değil) içindeki `## AI Diff Reviewer local review` altına eklenir.

- **Eksik inceleyici — kaydedilir, asla sessizce atlanmaz:** eksik bir skill veya uzantı, `local reviewer not installed` bulgusuna dönüşür; Final Review, skill mevcutken yerel geçişi çalıştırır, değilse bulgu tamamlanma raporuna taşınır — kurulum, onboarding onayına veya açık bir addon çağrısına aittir, asla sürpriz bir önyükleme değildir.
- **Yumuşak başarısızlık (yalnızca çağrı):** başlayabilen ama hata veren bir inceleme → bir kez uyar, kaydet, devam et; bu hata nedeniyle görevi hiçbir zaman başarısız sayma.
- **Tamamlanmış geçişten sonra kapı:** **doğrulanmış** `critical` bulgular, düzeltilinceye ya da açıkça kabul edilinceye kadar Final Review'in tamamlanmasını engeller (BC-07). Doğrulanmamış kritik iddialar açıklamalı uyarılar olarak gelir — görünür kalır ve `strict-unverified-criticals: true` iddiaya dayalı engellemeyi geri getirmedikçe engellemez. Tur sınırına (`incomplete`) ya da süre sınırına (`timeout`) takılan bir inceleme, engelleyici katılık altında temiz bir geçiş sayılmaz (BC-04). `warning` / `info` belgelenir ancak engellemez.
- **Flow A'nın CI sırrına ihtiyacı yoktur.** Ayarlanmamış bir sağlayıcı anahtarı yerel geçişi bastırmamalıdır.

### Flow B CI Kapısı (isteğe bağlı)

Action `DailybotHQ/ai-diff-reviewer@v3`, genellikle etiket kapılı (`ready`), dal koruması için kararlı adlandırılmış **AI review gate** işi ve isteğe bağlı atlama etiketi `skip-review-label: skip-ai-review`. v3'ten itibaren inceleme bütçesi, değişikliğin deterministik risk seviyesini izler — `budget-profile: auto` altında `low`'dan `critical`'a 8/20/30/40 tur (`fixed`, geçiş süresince v3 öncesi sabitleri geri getirir) — ve kod değiştirmeyen bir push yalnızca doğrulayıcılı bir tur çalıştırır. Paylaşılan `prompt.md` + uzantı metodoloji ve önem derecesini hizalar; yerel ve CI metodoloji açısından aynı kalır, Yineleme Farkındalıklı İnceleme altında CI 2.+ turlar daha kısa olabilirken yerel geçiş tam kalır.

### İsteğe Bağlı İnceleme Yardımcıları

CI bir inceleme yayınladıktan sonra geliştirici tarafından çağrılan iki alt beceri döngüyü kapatır; hiçbiri hiçbir zaman plan görev dosyası olmaz (bu, zorunlu son-görev sırasını bozar).

- `apply-review`, bulguları onaylı biçimde tek tek (uygula / ertele / atla) inceler. Varsayılan olarak salt okunur; asla commit yapmaz veya push etmez.
- `address-review` (v3.1.1'de yeni), tek çağrılı döngüdür: dalın açık PR'lerini bulur, incelemenin geçerli head için güncel olduğunu denetler, bulguları bir uygula/ertele/atla planıyla sunar, sonra — tek bir evet üzerine — uygular, küçük Conventional Commits grupları halinde commit yapar, push eder ve inceleyiciyi deponun tetiklediği biçimde yeniden kurar (etiket kapılı → etiketi kapatıp açın; push ile tetiklenen → yeni çalışmayı onaylayın). `apply-review`'ın aksine commit yapar ve push eder; döngünün amacı da budur. Toplu ensembl incelemelerinde toplu belgeyi ve `ai-pr-reviewer-aggregate` işaretini okur.
- Makine yolu yapılandırılmış çıktıdır, inceleme gövdesi değil: `review-output/3.0` belgesi (`.aiprr/review-output.json`; `structured-output-path` ve `structured-output-sha256` çıktıları üzerinden bulunur) çalışma kaydını, kanıt ve doğrulamayla bulguları, çürütülen bulguları ve kapıyı taşır. `Recommendation: approve` diyen bir inceleme gövdesi, kontrolün geçtiğine kanıt değildir — önce izleme işaretinin Highest severity / Strictness gate / Check status bloğunu okuyun.

## v3'te neler değişti

2026-09-24'te üç sürüm yayımlandı (v3.0.0, v3.0.1, v3.1.0) ve ardından `address-review` alt becerisiyle v3.1.1 geldi. Hiçbiri bu eklentinin inceleyiciyi nasıl bağladığını değiştirmiyor — Flow A, üç algılama yolu ve asla engellememe merdiveni aynı kaldı — ancak benimseyenin eline geçeni değiştiriyorlar.

| Değişiklik | Bir DWP deposu için anlamı |
|------------|-----------------------------|
| **Bir `critical` yalnızca doğrulandığında yayımlanır** (v3.0.0) | İleri sürülen her kritik — artı uyarılardan bir 30 % örneklem — ayrı bir model çağrısıyla ikinci, kısa, koda dayalı bir kontrolden geçer (doğrulanmış bulgu başına ≈ 3 k token, 10 sn ve $0.009). Doğrulanmış kritik bulgular güvenlik geçişini kapılar; çürütülen iddialar açıklamalı uyarılar olarak görünür kalır ve yapılandırılmış çıktıda listelenir, asla satır içinde yayımlanmaz. |
| **Bütçeler risk seviyesini izler** (v3.0.0) | Değişiklik envanterinden türetilen (`budget-profile: auto`) `low`'dan `critical`'a 8/20/30/40 tur. Kod değiştirmeyen bir push, −93 % maliyetle yalnızca doğrulayıcılı bir tur çalıştırır. `budget-profile: fixed`, v3 öncesi 30 turluk sabitleri geri getirir. |
| **Tamamlanmamış bir inceleme kırmızıdır** (v3.0.0) | `incomplete` (tur sınırı) ve `timeout` (süre sınırı) kısmi bulgular yayımlar ve engelleyici katılıkta başarısız olur — «bulgu yok» artık her zaman inceleyicinin baktığı ve bir şey bulamadığı anlamına gelir. |
| **Yapılandırılmış çıktı makine yoludur** (v3.0.0) | `review-output/3.0` belgesi çalışma kaydını, değişiklik envanterini, kanıtlı ve doğrulanmış bulguları, çürütülen bulguları ve kapıyı taşır. İnceleme gövdelerini kazımak yerine belgeyi okuyun. |
| **Altı alt beceri** (v3.1.1) | `address-review` yönlendiriciye katılır: tek çağrı uygular, commit yapar, push eder ve inceleyiciyi yeniden kurar. |
| **İsteğe bağlı topluluk** (v3.0.0) | Salt okunur `mode: emit` bacakları artı tek bir `aggregate` işi, birleştirilmiş bulguları bir kez doğrular ve tek bir inceleme yayımlar. |
| **`@v2` çalışmaya devam eder** | v2 hattı, altı ay süreyle güvenlik ve katalog bakımıyla birlikte `release/v2` üzerinde donduruldu. v3 öneridir, asla zorunlu bir geçiş değil. |

Bunlardan ikisi metodoloji açısından diğerlerinden daha önemli.

**Doğrulanmış kritik bulgular kapısı güvenlik geçişini sağlamlaştırır.** v3'ten önce bir model `critical`'ı serbestçe ileri sürebiliyordu ve kapı iddiayı izliyordu. Artık bir Final Review'deki kritik bir bulgu, ikinci bir model çağrısının onu koda karşı doğruladığı anlamına gelir; sürüm kampanyası farkı ölçtü: on kampanyada, toplam yaklaşık $83 maliyetle 771 ücretli değerlendirme çalışması; kritik kademe, değerlendirmeye tabi tutulmuş 1.0 hassasiyetle 63/63 hatırlamaya ulaştı ve art arda gelen turlar girdi token'larını 62–76 % azalttı. Bu rakamlar upstream'in yayımladığı ölçümlerdir, Deep Work Plan'ın kendi ölçümleri değildir.

**`economy` bilinçli olarak daha ucuz değil.** Upstream'in 2026-09-16 tarihli karşılaştırması `grok-4.3`'ü bilinen 5 kusurdan 0'ında ölçtü — incelemeden onaylıyor — buna karşılık `grok-4.5`, yanlış pozitif vermeden 5'te 3 ile `grok-4.6` ile başa baş geldi; üstelik aynı maliyetle ve dörtte bir sürede. İnceleme yapmayı sürdüren daha ucuz bir xAI modeli bulunmadığından, `economy` hiçbir şey bulamayan bir kademe olmak yerine `balanced` ile aynı modele çözümlenir; grok çalıştırıcısında maliyeti ölçekleyen şey model seçimi değil, risk seviyesinin tur bütçesidir. Bu nedenle xAI yolu CLI üzerinden inceleme başına yaklaşık $0.07'den yaklaşık $0.40–0.75'e çıkar; v3.0 istemiyle birlikte 63 koşunun yeniden ölçümü `grok-4.3`'ü 5'te 0'dan %83 hatırlamaya, sıfır yanlış pozitife ve ~%31 daha düşük maliyete taşıdı — ancak bulgu dosyasını yazmada hâlâ `grok-4.5`'in yaklaşık üç katı sıklıkta başarısız oluyor; bu yüzden varsayılan `grok-4.5` olarak kalıyor ve `model: grok-4.3` açık, kabul edilmiş bir ödünleşim seçeneği olarak duruyor. Bu rakamlar upstream'in yayımladığı ölçümlerdir, Deep Work Plan'ın kendi ölçümleri değildir.

## Davranış

- **Flow A temeldir; Flow B sorulur, asla tahmin edilmez.** İstenmeyen bir iş akışı yüklemek, Flow A'da kalmaktan daha büyük bir ayak izine sahiptir.
- **Uzlaştırın, üzerine yazmayın.** Mevcut skill, uzantı veya inceleme iş akışı korunur; yalnızca boşlukları doldurun.
- **Kimlik doğrulama ertelendi.** CI için sağlayıcı sırlarını bakıcı yapılandırır; bu eklenti hiçbir zaman kimlik bilgisi saklamaz.
- **Sağlayıcıdan bağımsız.** Hiçbir zaman ticari servis, CI sağlayıcısı veya sır gerekmez; CI yüzeyi, bir sağlayıcıya dokunan tek parçadır.

## Notlar

Yerel inceleme 2.3.0 standardından itibaren gereklidir; CI yüzeyi isteğe bağlıdır. Yukarı akış skill: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Upstream geçiş kılavuzu: [docs/MIGRATION_v3.md](https://github.com/DailybotHQ/ai-diff-reviewer/blob/main/docs/MIGRATION_v3.md). Spec sayfası: [Add-ons](/spec/addons).
