---
title: Herdr
description: "İşi herhangi bir makinedeki Herdr panelinde çalışan başka bir kodlama ajanına devredin, yetkilendirilmiş tek bir yanıt alın. Devreden planlar, kayıt altında."
kind: addon
lang: tr
order: 7
---

# Herdr eklentisi

[Herdr](https://herdr.dev), kodlama agent'larını hem kendi makinenizde hem de SSH üzerinden eriştiği makinelerde bölmelere yerleştirir. Bu eklenti, bir Deep Work Plan'ın bu agent'ları **eş** (peer) olarak kullanmasını sağlar: bir plan, sınırları belirli bir görevi başka bir bölmedeki bir agent'a devredebilir, tam olarak bir yetkili yanıt alabilir ve bu alışverişin kaydını tutabilir.

Bu, **DWP v7**'nin (`v7.0.0`) isteğe bağlı bir eklentisidir. Metodoloji onsuz da aynı şekilde çalışır: eklenti yoksa ya da devre dışıysa, her görev tıpkı önceden olduğu gibi mevcut oturumda çalışır.

## Neyi entegre eder

Eklenti ince bir entegratördür. İşi, **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)** yapar: **`v0.1.0`** sürümüne sabitlenmiş, Deep Work Plan olmadan da kullanışlı, bağımsız bir MIT skill'i. Herdr'ın kendisinin açık bıraktığı noktaları tanımlar: kimin yanıt verebileceğini, yanıtın makineler arasında geri dönüş yolunu nasıl bulduğunu, iki agent'ın birbirine sonsuza dek yanıt vermekten nasıl kaçındığını ve "sordum, yanıtladı" kaydının nerede tutulduğunu.

| Öğe | Değer |
|---|---|
| Ürün | `DailybotHQ/herdr-peers`, `v0.1.0` etiketi, protokol 1 |
| Kayıt defteri anahtarı | `.dwp/config.json` içinde `herdr` |
| Taşıma | etkileşimli: bir Herdr bölmesindeki eş |
| Sağladıkları | `subagents`, `cancel_children` |
| Gerektirdiği | plan sözleşmesinin `agent_delegation` yetkisi |

## Kurulum

herdr-peers'ı ve onun bağımlı olduğu Herdr'ın resmî skill'ini kurun. Agent'larının yanıt vermesi gereken her makinede de bu skill bulunmalıdır.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v0.1.0 --skill herdr-peers -g -y
npx --yes skills add https://github.com/herdrdev/herdr/tree/v0.9.3 --skill herdr -g -y
```

Gereksinimler: Herdr 0.9.1 veya daha yenisi, `bash` ve `python3` 3.9 veya daha yenisi (yalnızca standart kütüphane). Onboarding eklentiyi önerir ve yanıtınızı eklenti kayıt defterine kaydeder; eklenti onay olmadan asla etkinleştirilmez.

## Plana neler ekler

- **Bir eşe devretme.** Sözleşmesi `agent_delegation` yetkisi veren bir v7 planında `execute`, `parallel_safe` bir görevi ya da salt okunur bir soruyu, bu makinede veya başka bir makinede, başka bir bölmedeki bir agent'a devredebilir.
- **Tek yetkili yanıt.** İstek, tam olarak bir yanıtı yetkilendiren bir damga taşır. Eş, yardımcı araç üzerinden bir kez yanıt verir ve yanıt da kendi damgasını taşır.
- **Güvenmeden önce kayıt.** Her devretme, yanıt kullanılmadan önce planın `analysis_results/delegations.ndjson` dosyasına yazılır ve v7 `delegation` günlük olayına karşılık gelir.
- **Sonuçlar doğrulanana kadar iddia olarak kalır.** Bir eşin yanıtı, planın kendi kapı çalıştırıcısı onu gözlemleyene kadar `asserted` kanıttır. Bir görevi asla kendi başına kapatmaz.

## Güvenlik modeli

| Kural | Anlamı |
|---|---|
| Önce yetki | Devretme yalnızca plan sözleşmesi `agent_delegation` yetkisi verdiğinde çalışır. |
| Derinlik sınırı 1 | `depth=1` veya `reply-to=` damgalı bir mesaja asla yanıt verilmez ve bir delege asla devretmez. |
| Yayılma sınırı | Varsayılan olarak çağıran başına en fazla dört eş. |
| Talimat değil, veri | Bir yanıt, alıcıya zaten sahip olmadığı bir yetkiyi asla vermez. |
| Yol başına tek yazıcı | Yazma yapan bir eş kendi git worktree'sinde çalışır. |

herdr-peers göndereni doğrulamaz: bir damgadaki `from=` alanı bir iddiadır. Önlem, bir eşin kabul ettiği çalışma alanlarını ve makineleri sınırlayan `HERDR_PEERS_SCOPE` izin listesidir.

## Herdr mı agentkit mi

Her iki eklenti de aynı devretme arayüzünü — `launch`, `observe`, `collect`, `cancel` — farklı taşıma yöntemleriyle uygular.

| Durum | Kullanın |
|---|---|
| Bildirilmiş bir çıktısı olan, sınırları belirli `parallel_safe` bir görev | [agentkit](/kit/agentkit) (bir worktree'de başsız `ak run`) |
| Görev etkileşim gerektiriyor, uzun sürüyor ya da başka bir makinede bulunuyor | Herdr (bir bölmedeki eş) |

## Notlar

İsteğe bağlıdır ve hiçbir zaman zorunlu değildir. Bir depo, sıfır isteğe bağlı eklentiyle tümüyle uyumludur ve hiçbir akış bu eklentiye bağlı değildir. İki bölmeli, makineler arası gidiş-dönüş, simüle edilmiş bir Herdr'a karşı testlerle kapsanmaktadır; ilk çalıştırmayı gözetim altında planlayın.
