---
title: Döngü mühendisliği (loop engineering)
description: "v8 döngü semantiği: kayıtlı yetki, insanın başlattığı devam, halefiyet, engeller, kuyruk, bildirimler ve filo görünürlüğü. Kurallar ve alanlar."
order: 12
lang: tr
section: Döngü mühendisliği
---

# Döngü mühendisliği (loop engineering)

Bu sayfa loop engineering plan sözleşmesini açıklar. **Plan** yetki kaynağıdır; döngü süreklilik sağlar, kayıtlı yetkiyi genişletmez.

## 1. v8 kuralı
Onaylı plan, insanı beklemeden tamamlanır. Özerklik **planın kayıtlı yetkisi içinde** işler. İnsan bilgilendirilir; giriş/kimlik bilgileri ve C1–C7 kapıları önceden yetki yoksa işi durdurur. v7’nin temel yöntemin tek başına çalışması kuralı sürer.

## Döngü semantiği
### Kayıt ve gözlem
Herdr etkinse `execute` lead kaydını ve halefleri yazar. Yalnızca lead kaydı ve okunabilir durumu olan plan izlenir. İnsan `herdr-peers autopilot --loop` başlatır; daemon oturum açma öğesi veya sistem hizmeti değildir.

### Devam ve devralma
Daemon yalnız lead’i; beş dakika boşta/tamamlanmış, çalışan lane veya bekleyen yanıt yok, pane kapsamda, dışlanmamış ve engelleyici ekran/taslak yoksa dürter. Sabit istem planı kayıtlı yetki ve kapılarla bitirmeyi ister, yetki vermez. İlerleme olmadan üç istem `plan_stalled` kaydeder; engelli plan yalnız bildirilir. Lead yoksa ilk erişilebilir halefe `herdr-peers lead takeover --plan <id>` istenir. Daemon kaydı yazmaz veya listelenmemiş pane seçmez; kullanım sınırı yokluk kanıtı değildir. Protocol 2 ataması için insan `lead claim --allow-appointment` ile açıkça izin verir ve daemon `--appoint` ile başlar. Merge/tag/release öncesi `herdr-peers lead verify --plan <id>` gerekir.

### Brain, olaylar ve filo
`--brain` yalnız kapalı eylem listesinden seçer; daemon tek aktördür, serbest metin çalıştırmaz ve `autonomy` izni gerekir. Döngü plan olaylarını kaydeder; `--notify` `plan-event-v1` gönderir, Dailybot bildiricisi desteklenen olayları takıma iletir. Filo haritası ve `herdr-peers fleet ui` salt okunur görünüm sağlar. Kaynak: [autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.2.1/skills/herdr-peers/autopilot.md), [protocol](https://github.com/DailybotHQ/herdr-peers/blob/v2.2.1/skills/herdr-peers/protocol.md).

## 2. `autonomy` bloğu
Nesne kapalıdır; kanonik alanlar [plan-contract/v8 şemasındadır](https://deepworkplan.com/schema/plan-contract/v8.json). Blok yoksa varsayılanlar geçerlidir.

| Alan | Değer | Varsayılan |
|---|---|---|
| `stall_budget` | 1–10 tamsayı | `3` |
| `promptable` | boş olmayan Herdr pane adresleri | yalnız lead |
| `notify` | boş olmayan hedef listesi | hedef yok; olaylar kaydedilir |
| `brain` | boolean | `false` |
| `queue` | `prompt-lead`, `launch`, `none` | `none` |

Pane biçimi `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`; makine kimliği `-` ile başlayamaz. Alanlar alıcıları ve davranışı sınırlar, kabul ölçütlerini değiştirmez.

## 3. Yapılandırılmış engeller

v8 planı neden süremediğini veri olarak kaydeder; döngü, filo ve devam eden ajan aynı alanları okur.

### 3.1. Engel kaydı

Ledger, açmak için `ledger.py block` ve çözmek için `ledger.py unblock` kullanır; `journal-event/v8` içine `blocker` olayı yazar. Doğrudan ekleme reddedilir ve tüm retler kaydedilir.

| Alan | Kural |
|---|---|
| `task` | Contract’taki engelli görev; kanıtla kapanmış görev engellenemez. |
| `reason` | Zorunlu, boş olmayan, en çok 1000 karakter: neden. |
| `needs` | Zorunlu, tek boş olmayan satır, en çok 500 karakter: gereken. |
| `class` | Zorunlu: [`AGENT_PROTOCOL.md`](AGENT_PROTOCOL.md) §7.5 içindeki `C1`–`C7`. |
| `resolver` | İsteğe bağlı `lead` veya `human`; yoksa `human`. |

`lead` kayıtlı yetki içinde, kimlik bilgisi, giriş, rıza, ödeme, main’e push, yayımlama veya silme olmadan çözer. `C1`, `C2`, `C5` ve `C6` için `resolver: "lead"` reddedilir. Plan başına tek etkin engel vardır; çözülene kadar yenisi reddedilir. Aynı görev yeniden açıldığında alanlar güncellenebilir, ilk `since` korunur. Çözüm görevi ve isteğe bağlı notu içerir. Açık engelli görev tamamlanamaz; yeni kanıt da kapatmaz.

### 3.2. Nerede bulunur

`state.json`, `plan-snapshot/v8` kullanır: `plan-snapshot/v6` yapısı; `blocker` değeri `{task, reason, since, needs, class, resolver?}` veya `null`, `blocked` ise öncelikli türetilmiş görev durumudur. Ledger yansıtır, elle yazılmaz.

`PROGRESS.md` başlığın altında dört sabit satırla başlamalıdır; create yazar ve her geçişte günceller (`shared/progress_header.py`):

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

`Current task` ve `Needs` snapshot’tan gelir (önce engelli, yoksa ilk tamamlanmamış görev); ajan `Goal` ve `Next action` yazar.

### 3.3. Döngünün yapabilecekleri

Döngü, brain dâhil, yalnız `resolver: "lead"` işaretli engeli lead’e çözdürür. Diğerleri insanı bekler. v6/v7 `blocker` olayı kaydetmez, `plan-snapshot/v6` korur (`blocker` daima `null`); engeller insanın sorumluluğundadır.
## 4. Plan kuyruğu
`.dwp/queue.json`, `dwp-queue-v1` biçimindedir; yalnız pack yazar. `create` onayda ekler; insan/lead sıralar; `execute` lead’i alınca `started`, bitişte `done` yazar; `create`/`refine` kısa notla `skipped` yapabilir. `after` bağımlılığı olabilir. `parallel: true` yoksa tek plan çalışır. Daemon sınırlı ve salt okunurdur; bozuk kuyruğu boş sayar. `prompt-lead` sabit istemi yollar: “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” Daemon yazmaz ve yayımlanmış sözleşme eklemedikçe `launch` yapmaz.

## 5. v8’in korudukları

v8, `tasks[].parallel_safe`, delegation ve tam v7 olay kümesi dâhil v7’yi korur; v7 özellikleri sonraki nesillerde kalır. v8, v7 olay kümesine `blocker` ekleyerek `journal-event/v8` içine kaydeder ve `plan-snapshot/v8` içine yansıtır; karışık journal reddedilir. `plan-manifest/v7` biçimi ve işaretçisiyle korunur; denetleyici v7 manifestini v8 contract ile eşleştirir. v6/v7 kayıtları bayt bayt korunur.
