---
title: AI Diff Reviewer
description: "2.3.0 standardından itibaren her DWP Final Review'inde gerekli, kurulumda yüklenen yerel inceleme; Flow B CI kapısı ve apply-review isteğe bağlı kalır."
kind: addon
lang: tr
order: 5
---

# AI Diff Reviewer Eklentisi

Her Deep Work Plan aynı şekilde kapanır: işin tamamlandı sayılabilmesinden önce planın biriktirdiği değişiklik kümesinin tamamını okuyan, zorunlu bir **Final Review** ile. İçindeki güvenlik incelemesi, bir şeyin hâlâ yakalanabileceği son noktadır. Yardım olmadan o noktadaki tek okuyucu, kodu yazan agent'ın ta kendisidir.

Bu eklenti o diff'in başına ikinci bir okuyucu oturtur. **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**'ı — markette "AI Diff Reviewer" adıyla yer alır, şu anda **v2.3.1** — güvenlik incelemesine bağlar; orada düzyazı yerine yapılandırılmış bir çıktı döndürür: bir karar, bir bulgu tablosu ve her bulgu için bir önem derecesi. `critical` bir bulgu, düzeltilene ya da açıkça kabul edilene kadar tamamlanmayı engeller. Bu inceleme bir kapıdır, bir yorum değil.

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
| **B — çift yüzey** | Flow A artı `setup`, `.github/workflows/pr-review.yml` (Action `@v2`) yazar; yerel ve CI için aynı uzantı dosyası. CI bulgularını yayınladıktan sonra isteğe bağlı `apply-review` yardımcısı. |

Yerel incelemenin algılanması için şu konumlardan birinde **skill + uzantı dosyası** gerekir: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` veya `.github/ai-pr-reviewer/extension.md`. Skill tek başına yeterli değildir.

## Bu eklentinin bağladıkları (tasarım gereği dar kapsamlı)

DWP eklentisi inceleyiciyi **yeniden icat etmez**. Kurulum, metodoloji, CI sihirbazı, uzantı yazarlığı, PR taslak oluşturma ve CI sonrası incelemeyi yukarı akış skill'in beş alt becerisine (üst varsayılan akış, `generate-extension`, `setup`, `open-pr`, `apply-review`) devreder.

### Gerekli yerel inceleme

`create`, yerel inceleme adımını her Final Review'in güvenlik incelemesine ekler ve `execute` onu çalıştırır. Çıktı, plana yerel `analysis_results/SECURITY_REVIEW.md` (planın kendi klasörü içinde, asla depo kökünde değil) içindeki `## AI Diff Reviewer local review` altına eklenir.

- **Eksik inceleyici — kaydedilir, asla sessizce atlanmaz:** eksik bir skill veya uzantı, `local reviewer not installed` bulgusuna dönüşür; Final Review, skill mevcutken yerel geçişi çalıştırır, değilse bulgu tamamlanma raporuna taşınır — kurulum, onboarding onayına veya açık bir addon çağrısına aittir, asla sürpriz bir önyükleme değildir.
- **Yumuşak başarısızlık (yalnızca çağrı):** başlayabilen ama hata veren bir inceleme → bir kez uyar, kaydet, devam et; bu hata nedeniyle görevi hiçbir zaman başarısız sayma.
- **Tamamlanmış geçişten sonra kapı:** `critical` bulgular düzeltilinceye veya açıkça kabul edilinceye kadar Final Review'in tamamlanmasını engellemeye devam eder. `warning` / `info` belgelenir ancak engellemez.
- **Flow A'nın CI sırrına ihtiyacı yoktur.** Ayarlanmamış bir `CURSOR_API_KEY` yerel geçişi bastırmamalıdır.

### Flow B CI Kapısı (isteğe bağlı)

Action `DailybotHQ/ai-diff-reviewer@v2`, genellikle etiket kapılı (`ready`), dal koruması için kararlı adlandırılmış **AI review gate** işi ve isteğe bağlı atlama etiketi `skip-review-label: skip-ai-review`. Paylaşılan `prompt.md` + uzantı metodoloji ve önem derecesini hizalar; Yineleme Farkındalıklı İnceleme altında CI 2.+ turlar daha kısa olabilirken yerel geçiş tam kalır.

### İsteğe Bağlı `apply-review` Yardımcısı

CI bir inceleme yayınladıktan sonra geliştirici, `execute` sırasında `apply-review`'ı çağırarak bulguları tek tek (uygula / ertele / atla) onaylı biçimde inceleyebilir. Varsayılan olarak salt okunur; hiçbir zaman plan görev dosyası olmaz (zorunlu son-görev sırasını bozar). v2.3.1'den itibaren `Recommendation: approve` diyen bir inceleme gövdesi, kontrolün geçtiğine kanıt değildir — önce izleme işaretinin Highest severity / Strictness gate / Check status bloğunu okuyun.

## v2.0.1'den bu yana neler değişti

v2.0.1 ile v2.3.1 arasında dört upstream sürümü yayımlandı. Hiçbiri bu eklentinin inceleyiciyi nasıl bağladığını değiştirmiyor — Flow A, üç algılama yolu ve engelleme sözleşmesi aynı kaldı — ancak benimseyenin eline geçeni değiştiriyorlar.

| Değişiklik | Bir DWP deposu için anlamı |
|------------|-----------------------------|
| **Runner ve backend ayrı girdiler** (v2.1.0) | `provider`, *runner*'ı adlandırır: inceleme döngüsünü kimin çalıştırdığını. Yeni `api-base` ise *backend*'i adlandırır: modelin nerede olduğunu. Boş bir `api-base`, v2.0.x ile bayt bayt aynıdır; dolayısıyla mevcut bir kurulum tam olarak eskisi gibi davranır. |
| **İki runner daha** (v2.1.0) | `openai` (süreç içi, kurulum gerektirmez) ve `grok` (CLI) mevcut kümeye katıldı. |
| **Maliyet tek kelimelik bir kademedir ve varsayılanlar ölçülmüştür** (v2.1.0, v2.3.0) | Maliyet, bir kademe anahtar kelimesi ve daraltılmış diff'lerle denetlenir ve her inceleme için raporlanır. xAI'da `balanced` ve `economy` ikisi de `grok-4.5`'e, `deep` ise `grok-4.6`'ya çözümlenir. |
| **Takip turları gerçekten yeni olan diff'i inceler** (v2.1.0, v2.2.0, v2.3.1) | Açık bulgular sonraki tura taşınır. `prior-findings-resolution` varsayılan olarak `advisory`'dir: bir modelin «çözüldü» kararı raporlanır, ancak bir bakımcı konuyu kapatana kadar bulgu engellemeye devam eder. v2.3.1'den itibaren, `collapse-previous` o konuyu zaten küçülttüğünde, doğrulanmış bir düzeltme (bulgu yeniden üretilmemiş **ve** dosya ortaya atıldığından beri değişmiş ya da silinmiş) onu kapatır, böylece takılı kalmış bir PR yeşile dönebilir. |
| **Tamamlanmamış bir inceleme asla yeşil sayılmaz** (v2.2.0) | Bulgu yazmadan sonlanan bir çalışma, açıkça tamamlanmamış inceleme olarak yayımlanır. Engelleyici her katılık düzeyinde başarısız olur, incelendi etiketi basılmaz ve boş bir tur açık bir bulguyu geri çekmez. |
| **Sağlama toplamıyla doğrulanan kurulumcular** (v2.2.0) | `cursor-installer-sha256` ve `grok-installer-sha256`, sağlayıcı yapıtının özeti yapılandırılan sabitten farklıysa onu çalıştırmayı reddeder. |
| **Kontrol, inceleme gövdesi ve izleme yorumu uyuşur** (v2.3.1) | Geçti/kaldı kararı, inceleme yayımlanmadan önce bir kez hesaplanır. Her inceleme, çalışma anında yazılmış bir Check status bloğuyla biter. Kapı başarısızken modelin `Recommendation: approve` çıktısı `request-changes` olarak yeniden yazılır; bu yüzden `apply-review` modelin son satırını değil, izleme işaretini okumalıdır. |
| **Tek kötü bir inline anchor artık tüm yorumlara mal olmaz** (v2.3.1) | GitHub 422'de Action, yalnızca çapası bir diff hunk'ı içinde olan yorumlarla yeniden dener; son çare olarak yalnızca özet yayımlar. |

Bunlardan ikisi metodoloji açısından diğerlerinden daha önemli.

**Tamamlanmamış inceleme kapısı, güvenlik geçişindeki gerçek bir boşluğu kapatıyor.** Bir Final Review, hiç gerçekleşmemiş bir incelemeye dayanarak kapanabilmemeli. v2.2.0'dan önce, bulgu üretmeden sonlanan bir runner ile temiz bir geçiş birbirinden ayırt edilemiyordu. Artık adı konmuş ve yeşil olmayan bir durum; yani «bulgu yok», inceleyicinin baktığı ve bir şey bulamadığı anlamına geliyor, hiç bakmadığı anlamına değil.

**`economy` bilinçli olarak daha ucuz değil.** Upstream'in 16.09.2026 tarihli karşılaştırması `grok-4.3`'ü bilinen 5 kusurdan 0'ında ölçtü — incelemeden onaylıyor — buna karşılık `grok-4.5`, yanlış pozitif vermeden 5'te 3 ile `grok-4.6` ile başa baş geldi; üstelik aynı maliyetle ve dörtte bir sürede. İnceleme yapmayı sürdüren daha ucuz bir xAI modeli bulunmadığından, `economy` hiçbir şey bulamayan bir kademe olmak yerine `balanced` ile aynı modele çözümlenir. Bu nedenle xAI yolu CLI üzerinden inceleme başına yaklaşık \$0,07'den yaklaşık \$0,40–0,75'e çıkar; önceki davranışı korumak için `model: grok-4.3` hâlâ açıkça sabitlenebilir. Bu rakamlar upstream'in yayımladığı ölçümlerdir, Deep Work Plan'ın kendi ölçümleri değildir.

**Approve diyen bir inceleme, kontrolün geçtiğine kanıt değildir.** v2.3.1'den itibaren çalışma anı, kapıyı hesapladıktan sonra Check status bloğunu yazar ve kapı başarısızken modelin `Recommendation: approve` çıktısını yeniden yazar. `apply-review`'ın — ve bir CI incelemesini okuyan Final Review'in — uyması gereken sözleşme budur.

## Davranış

- **Flow A temeldir; Flow B sorulur, asla tahmin edilmez.** İstenmeyen bir iş akışı yüklemek, Flow A'da kalmaktan daha büyük bir ayak izine sahiptir.
- **Uzlaştırın, üzerine yazmayın.** Mevcut skill, uzantı veya `pr-review.yml` korunur; yalnızca boşlukları doldurun.
- **Kimlik doğrulama ertelendi.** CI için sağlayıcı sırlarını bakıcı yapılandırır; bu eklenti hiçbir zaman kimlik bilgisi saklamaz.
- **Sağlayıcıdan bağımsız.** Hiçbir zaman ticari servis, CI sağlayıcısı veya sır gerekmez; CI yüzeyi, bir sağlayıcıya dokunan tek parçadır.

## Notlar

Yerel inceleme 2.3.0 standardından itibaren gereklidir; CI yüzeyi isteğe bağlıdır. Yukarı akış skill: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Spec sayfası: [Add-ons](/spec/addons).
