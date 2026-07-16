---
title: AI Diff Reviewer
description: "İsteğe bağlı DWP eklentisi: Security Review için yerel AI Diff Reviewer geçişi, isteğe bağlı Flow B CI kapısı (v2), ortak extension ve apply-review."
kind: addon
lang: tr
order: 5
---

# AI Diff Reviewer Eklentisi

Deep Work Plan yürütmesini **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**'a (market listesi **"AI Diff Reviewer"**, mevcut sürüm **v2.0.0**) bağlayarak zorunlu son görev olan **Güvenlik İncelemesinin** yapılandırılmış bir yerel inceleme — karar, bulgu tablosu ve önem derecesi — kazanmasını sağlar ve Flow B seçildiğinde her çekme isteği CI\'da aynı incelemeyle kapı altına alınabilir. **İsteğe bağlı** bir eklenti; AI-first uygunluğu için hiçbir zaman gerekli değildir.

Deep Work Plan\'ın temel metodolojisinin AI Diff Reviewer\'a **sıfır** bağımlılığı vardır. Sıfır eklentili bir depo tam uyumludur. Bu eklentiyi yalnızca geliştirici veya ekip yapılandırılmış inceleme kalitesi istediğinde önerin; hiçbir zaman herkes için otomatik yüklemeyin. Her zaman Flow A mı yoksa Flow B mi olduğunu sorun — hiçbir zaman varsayılan seçmeyin.

## Ne zaman kullanılır

| Sinyal | Eylem |
|--------|--------|
| Ekip yapılandırılmış bulgularla CI PR birleştirme kapısı istiyor | Katılım sırasında **Flow B\'yi önerin** |
| Kişisel veya deneysel depo; yerel itme öncesi inceleme yeterli | **Flow A\'yı önerin** |
| Ek bir inceleme yüzeyi için iştah yok | **Atlayın** — temel Güvenlik İncelemesi hâlâ geçerli |

## İki Benimseme Akışı

| Akış | Elde ettikleriniz |
|------|----------------|
| **A — yalnızca yerel** | Satıcılı skill + gerekli `.review/extension.md` (`generate-extension` aracılığıyla). Güvenlik İncelemesini yerel geçişle güçlendirir. GitHub Actions iş akışı yok. |
| **B — çift yüzey** | Flow A artı `setup`, `.github/workflows/pr-review.yml` (Action `@v2`) yazar; yerel ve CI için aynı uzantı dosyası. CI bulgularını yayınladıktan sonra isteğe bağlı `apply-review` yardımcısı. |

Güvenlik İncelemesi güçlendirmesinin algılanması için şu konumlardan birinde **skill + uzantı dosyası** gerekir: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` veya `.github/ai-pr-reviewer/extension.md`. Skill tek başına yeterli değildir.

## Bu eklentinin bağladıkları (tasarım gereği dar kapsamlı)

DWP eklentisi inceleyiciyi **yeniden icat etmez**. Kurulum, metodoloji, CI sihirbazı, uzantı yazarlığı, PR taslak oluşturma ve CI sonrası incelemeyi yukarı akış skill\'in beş alt becerisine (üst varsayılan akış, `generate-extension`, `setup`, `open-pr`, `apply-review`) devreder.

### Güvenlik İncelemesi Güçlendirmesi

Algılandığında `create` / `execute`, zorunlu Güvenlik İncelemesi görevine yerel bir inceleme adımı ekler. Çıktı, `analysis_results/SECURITY_REVIEW.md` içindeki `## AI Diff Reviewer local review` altına eklenir.

- **Yumuşak başarısızlık (yalnızca çağrı):** eksik skill, eksik uzantı veya çağrı hatası → bir kez uyar ve devam et; bu hata nedeniyle görevi hiçbir zaman başarısız sayma.
- **Tamamlanmış geçişten sonra kapı:** `critical` bulgular düzeltilinceye veya açıkça kabul edilinceye kadar Güvenlik İncelemesinin tamamlanmasını engellemeye devam eder (mevcut SR sözleşmesi). `warning` / `info` belgelenir ancak engellemez.
- **Flow A\'nın CI sırrına ihtiyacı yoktur.** Ayarlanmamış bir `CURSOR_API_KEY` yerel geçişi bastırmamalıdır.

### Flow B CI Kapısı (isteğe bağlı)

Sabitlenmiş Action `DailybotHQ/ai-diff-reviewer@v2`, genellikle etiket kapılı (`ready`), dal koruması için kararlı adlandırılmış **AI review gate** işi ve isteğe bağlı atlama etiketi `skip-review-label: skip-ai-review`. Paylaşılan `prompt.md` + uzantı metodoloji ve önem derecesini hizalar; Yineleme Farkındalıklı İnceleme altında CI 2.+ turlar daha kısa olabilirken yerel geçiş tam kalır.

### İsteğe Bağlı `apply-review` Yardımcısı

CI bir inceleme yayınladıktan sonra geliştirici, `execute` sırasında `apply-review`\'ı çağırarak bulguları tek tek (uygula / ertele / atla) onaylı biçimde inceleyebilir. Varsayılan olarak salt okunur; hiçbir zaman plan görev dosyası olmaz (zorunlu son görev sırasını bozar).

## Davranış

- **Akışı sorun; hiçbir zaman tahmin etmeyin.** İstenmeyen bir iş akışı yüklemek, Flow A\'da kalmaktan daha büyük bir ayak izine sahiptir.
- **Uzlaştırın, üzerine yazmayın.** Mevcut skill, uzantı veya `pr-review.yml` korunur; yalnızca boşlukları doldurun.
- **Kimlik doğrulama ertelendi.** CI için sağlayıcı sırlarını bakıcı yapılandırır; bu eklenti hiçbir zaman kimlik bilgisi saklamaz.
- **Sağlayıcıdan bağımsız.** Reddetmek tam AI-first bir depo bırakır.

## Notlar

İsteğe bağlı ve hiçbir zaman zorunlu değildir. Yukarı akış skill: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Spec sayfası: [Add-ons](/spec/addons).
