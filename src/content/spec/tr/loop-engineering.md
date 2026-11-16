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
`--brain` yalnız kapalı eylem listesinden seçer; daemon tek aktördür, serbest metin çalıştırmaz ve `autonomy` izni gerekir. Döngü plan olaylarını kaydeder; `--notify` `plan-event-v1` gönderir, Dailybot bildiricisi desteklenen olayları takıma iletir. Filo haritası ve `herdr-peers fleet ui` salt okunur görünüm sağlar. Kaynak: [autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.0.0/skills/herdr-peers/autopilot.md), [protocol](https://github.com/DailybotHQ/herdr-peers/blob/v2.0.0/skills/herdr-peers/protocol.md).

## 2. `autonomy` bloğu
Nesne kapalıdır; kanonik alanlar [plan-contract/v8 şemasındadır](https://deepworkplan.com/schema/plan-contract/v8.json). Blok yoksa varsayılanlar geçerlidir.

| Alan | Değer | Varsayılan |
|---|---|---|
| `stall_budget` | 1–10 tamsayı | `3` |
| `promptable` | boş olmayan Herdr pane adresleri | yalnız lead |
| `notify` | boş olmayan liste; `dailybot` | hedef yok; olaylar kaydedilir |
| `brain` | boolean | `false` |
| `queue` | `prompt-lead`, `launch`, `none` | `none` |

Pane biçimi `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`; makine kimliği `-` ile başlayamaz. Alanlar alıcıları ve davranışı sınırlar, kabul ölçütlerini değiştirmez.

## 3. Yapılandırılmış engeller ve ilerleme
`state.json` içindeki `blocked`/`blocker` C sınıfı ve isteğe bağlı `resolver` (`lead`/`human`, varsayılan `human`) içerir. `lead`, kimlik bilgisi, giriş, onay, ödeme, main’e push, release veya silme olmadan çözülebilir demektir. Döngü yalnız `lead` engellerini ister. Filo haritası `PROGRESS.md`’den temizlenmiş en çok 14 satır gösterebilir; bu makine başlığı şeması değildir ve planlanan başlık 8.0.0’da doğrulanmalıdır.

## 4. Plan kuyruğu
`.dwp/queue.json`, `dwp-queue-v1` biçimindedir; yalnız pack yazar. `create` onayda ekler; insan/lead sıralar; `execute` lead’i alınca `started`, bitişte `done` yazar; `create`/`refine` kısa notla `skipped` yapabilir. `after` bağımlılığı olabilir. `parallel: true` yoksa tek plan çalışır. Daemon sınırlı ve salt okunurdur; bozuk kuyruğu boş sayar. `prompt-lead` sabit istemi yollar: “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” Daemon yazmaz ve yayımlanmış sözleşme eklemedikçe `launch` yapmaz.

## 5. v8’in korudukları
v8, v7 `tasks[].parallel_safe`, delegation, journal ve olay kümesini korur; manifest ve journal-event URL’lerini koruyup yalnız `plan-contract/v8` ekler. Eski planlar sessizce taşınmaz. Herdr isteğe bağlıdır.
