---
title: AI Diff Reviewer
description: "2.3.0 standardından itibaren her DWP Final Review'inde gerekli, kurulumda yüklenen yerel inceleme; Flow B CI kapısı ve apply-review isteğe bağlı kalır."
kind: addon
lang: tr
order: 5
---

# AI Diff Reviewer Eklentisi

Deep Work Plan yürütmesini **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**'a (market listesi **"AI Diff Reviewer"**, mevcut sürüm **v2.3.0**) bağlayarak zorunlu **Final Review**'in güvenlik incelemesi yapılandırılmış bir yerel inceleme — karar, bulgu tablosu ve önem derecesi — çalıştırsın ve Flow B'yi seçtiğinizde her çekme isteği CI'da aynı incelemeyle kapı altına alınsın. 2.3.0 standardından itibaren **yerel inceleme temelin bir parçasıdır**: kuruluma alma onu kurar ve her Final Review onu çalıştırır. Yalnızca CI yüzeyi isteğe bağlıdır.

Sağlayıcıdan bağımsız kalan, önemli olan sınırdır: inceleyici, sizin **kendi** kodlama ajanınız tarafından çalıştırılan MIT lisanslı, etikete sabitlenmiş bir skill'dir — hiçbir Deep Work Plan akışı ticari bir servis, CI sağlayıcısı veya sır gerektirmez. Flow A (yalnızca yerel), kuruluma alınan her deponun aldığı temeldir; Flow B (CI Action) açıkça sunulur ve istenmeden asla kurulmaz. Bir geliştirici yerel inceleyiciyi reddedebilir; reddediş beyan edilmiş bir istisna olarak kaydedilir ve `verify`, kurulana kadar depoyu bu noktada uyumsuz olarak raporlar.

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

CI bir inceleme yayınladıktan sonra geliştirici, `execute` sırasında `apply-review`'ı çağırarak bulguları tek tek (uygula / ertele / atla) onaylı biçimde inceleyebilir. Varsayılan olarak salt okunur; hiçbir zaman plan görev dosyası olmaz (zorunlu son-görev sırasını bozar).

## v2.0.1'den bu yana neler değişti

v2.0.1 ile v2.3.0 arasında üç upstream sürümü yayımlandı. Hiçbiri bu eklentinin inceleyiciyi nasıl bağladığını değiştirmiyor — Flow A, üç algılama yolu ve engelleme sözleşmesi aynı kaldı — ancak benimseyenin eline geçeni değiştiriyorlar.

| Değişiklik | Bir DWP deposu için anlamı |
|------------|-----------------------------|
| **Runner ve backend ayrı girdiler** (v2.1.0) | `provider`, *runner*'ı adlandırır: inceleme döngüsünü kimin çalıştırdığını. Yeni `api-base` ise *backend*'i adlandırır: modelin nerede olduğunu. Boş bir `api-base`, v2.0.x ile bayt bayt aynıdır; dolayısıyla mevcut bir kurulum tam olarak eskisi gibi davranır. |
| **İki runner daha** (v2.1.0) | `openai` (süreç içi, kurulum gerektirmez) ve `grok` (CLI) mevcut kümeye katıldı. |
| **Maliyet tek kelimelik bir kademedir ve varsayılanlar ölçülmüştür** (v2.1.0, v2.3.0) | Maliyet, bir kademe anahtar kelimesi ve daraltılmış diff'lerle denetlenir ve her inceleme için raporlanır. xAI'da `balanced` ve `economy` ikisi de `grok-4.5`'e, `deep` ise `grok-4.6`'ya çözümlenir. |
| **Takip turları gerçekten yeni olan diff'i inceler** (v2.1.0, v2.2.0) | Açık bulgular sonraki tura taşınır. `prior-findings-resolution` varsayılan olarak `advisory`'dir: bir modelin «çözüldü» kararı raporlanır, ancak bir bakımcı konuyu kapatana kadar bulgu engellemeye devam eder. |
| **Tamamlanmamış bir inceleme asla yeşil sayılmaz** (v2.2.0) | Bulgu yazmadan sonlanan bir çalışma, açıkça tamamlanmamış inceleme olarak yayımlanır. Engelleyici her katılık düzeyinde başarısız olur, incelendi etiketi basılmaz ve boş bir tur açık bir bulguyu geri çekmez. |
| **Sağlama toplamıyla doğrulanan kurulumcular** (v2.2.0) | `cursor-installer-sha256` ve `grok-installer-sha256`, sağlayıcı yapıtının özeti yapılandırılan sabitten farklıysa onu çalıştırmayı reddeder. |

Bunlardan ikisi metodoloji açısından diğerlerinden daha önemli.

**Tamamlanmamış inceleme kapısı, güvenlik geçişindeki gerçek bir boşluğu kapatıyor.** Bir Final Review, hiç gerçekleşmemiş bir incelemeye dayanarak kapanabilmemeli. v2.2.0'dan önce, bulgu üretmeden sonlanan bir runner ile temiz bir geçiş birbirinden ayırt edilemiyordu. Artık adı konmuş ve yeşil olmayan bir durum; yani «bulgu yok», inceleyicinin baktığı ve bir şey bulamadığı anlamına geliyor, hiç bakmadığı anlamına değil.

**`economy` bilinçli olarak daha ucuz değil.** Upstream'in 16.09.2026 tarihli karşılaştırması `grok-4.3`'ü bilinen 5 kusurdan 0'ında ölçtü — incelemeden onaylıyor — buna karşılık `grok-4.5`, yanlış pozitif vermeden 5'te 3 ile `grok-4.6` ile başa baş geldi; üstelik aynı maliyetle ve dörtte bir sürede. İnceleme yapmayı sürdüren daha ucuz bir xAI modeli bulunmadığından, `economy` hiçbir şey bulamayan bir kademe olmak yerine `balanced` ile aynı modele çözümlenir. Bu nedenle xAI yolu CLI üzerinden inceleme başına yaklaşık \$0,07'den yaklaşık \$0,40–0,75'e çıkar; önceki davranışı korumak için `model: grok-4.3` hâlâ açıkça sabitlenebilir. Bu rakamlar upstream'in yayımladığı ölçümlerdir, Deep Work Plan'ın kendi ölçümleri değildir.

## Davranış

- **Flow A temeldir; Flow B sorulur, asla tahmin edilmez.** İstenmeyen bir iş akışı yüklemek, Flow A'da kalmaktan daha büyük bir ayak izine sahiptir.
- **Uzlaştırın, üzerine yazmayın.** Mevcut skill, uzantı veya `pr-review.yml` korunur; yalnızca boşlukları doldurun.
- **Kimlik doğrulama ertelendi.** CI için sağlayıcı sırlarını bakıcı yapılandırır; bu eklenti hiçbir zaman kimlik bilgisi saklamaz.
- **Sağlayıcıdan bağımsız.** Hiçbir zaman ticari servis, CI sağlayıcısı veya sır gerekmez; CI yüzeyi, bir sağlayıcıya dokunan tek parçadır.

## Notlar

Yerel inceleme 2.3.0 standardından itibaren gereklidir; CI yüzeyi isteğe bağlıdır. Yukarı akış skill: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Spec sayfası: [Add-ons](/spec/addons).
