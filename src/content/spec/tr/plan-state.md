---
title: Plan durumu
description: "Makine tarafından okunabilir plan durum katmanı: manifest.json ve state.json, kapı kayıtları, bölümsel bellek olarak sonuç kayıtları, uzlaştırma ve ne zaman gerekli olduğu."
order: 7
lang: tr
section: State
---

# Plan durumu

**Sürüm 1.0. Durum: Kararlı.** Bu belge, Deep Work Plan metodolojisinin makine tarafından okunabilir plan durum katmanını belirtir. MUST, MUST NOT, SHOULD, SHOULD NOT ve MAY anahtar kelimeleri, RFC 2119'da açıklandığı şekilde yorumlanacaktır.

İki JSON yapısı — `manifest.json` (planın statik kimliği) ve `state.json` (doğrulama kapısı sonuçları dahil canlı, görev bazında yürütme durumu) — her planın Markdown dosyalarının yanında TASIYABİLECEĞİ ve gözetimsiz yürütmenin (bkz. [Ajan protokolü](/spec/agent-protocol#execution-profiles)) ile git içermeyen çalışma alanlarının (bkz. [Arketipler](/spec/archetypes) §3) TAŞIMAK ZORUNDA OLDUĞU yapılardır.

Markdown planı, **insan tarafından okunabilir doğruluk kaynağı** olmaya devam eder. JSON katmanı, **türetilmiş bir projeksiyon**dur: ajan tarafından tanımlı protokol noktalarında yeniden oluşturulur, elle düzenlenmez ve Markdown ile sessizce çelişmesine izin verilmez. Amacı birlikte çalışabilirliktir — linting, uyumluluk denetimi, fark alma, gösterge tabloları, kayıt defteri keşfi ve harici oturum altyapısıyla senkronizasyon — bunların hiçbiri düz yazı üzerine güvenilir biçimde inşa edilemez.

## Neden var

v1.1'e kadar planlar yalnızca düz Markdown'dı. Bu onları denetlenebilir ve ajandan bağımsız tuttu; ancak bir aracın doğrulayabileceği, fark alabileceği veya tüketebileceği hiçbir şey bırakmadı: uyumluluk kapısı yok, `README.md` ile `PROGRESS.md` arasındaki desenkronizasyon tespiti yok, bir daemon ya da bulut oturumunun düz yazıyı ayrıştırmadan planın durumunu bilmesinin yolu yok. v1.2, Markdown'ı ikincil konuma düşürmeden JSON projeksiyonunu ekler — projeksiyon, bir kilit dosyasının bir manifestodan türetildiği gibi Markdown'dan türetilir.

## Yerleşim

Durum katmanını kullanan bir planın bu düzeni vardır:

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← insan tarafından doğruluk kaynağı (değişmedi)
├── PROGRESS.md          ← anlatı günlüğü (değişmedi)
├── PROMPTS.md           ← değişmedi
├── manifest.json        ← statik kimlik (somutlaştırma sırasında yazılır)
├── state.json           ← canlı durum (protokol noktalarında yeniden yazılır)
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json`, `create` akışı planı somutlaştırdığında tam olarak bir kez YAZILMALIDIR ve `PROGRESS.md`'de kayıt altına alınan bir spec sürümü geçişi dışında sonrasında DEĞİŞTİRİLMEMELİDİR.

`state.json`, ajan tarafından şu protokol noktalarının her birinde YENİDEN YAZILMALIDIR: plan somutlaştırma (tüm görevler `pending`), görev başlangıcı (`in_progress`), her doğrulama kapısı çalıştırması (kapı kaydı eklendi veya güncellendi) ve görev tamamlama ([DWP spesifikasyonu](/spec/dwp-specification#task-completion-protocol)'ndaki görev tamamlama protokolünün parçası olarak `completed`).

Her iki dosya da atomik olarak YAZILMALIDIR: aynı dizinde geçici bir dosyaya yazın, ardından hedefin üzerine yeniden adlandırın. Çökmüş bir yazma işlemi yerinde kesik bir JSON dosyası BIRAKMAMALDIR.

## Katman ne zaman gereklidir

- Git deposunda **etkileşimli** yürütme için, durum katmanı yeni planlar için ÖNERİLİR ve v1.2 öncesi planlar için İSTEĞE BAĞLIDIR. Onsuz bir plan uyumlu olmaya devam eder.
- **Gözetimsiz** yürütme için durum katmanı ZORUNLUDUR.
- Git içermeyen bir **ajan çalışma alanında** durum katmanı ZORUNLUDUR: `state.json`, bir depoda git günlüğünün taşıdığı kurtarma bilgisini taşır.

## `manifest.json` — plan kimliği

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v1.json",
  "spec_version": "2.2.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at` ve `task_count` ZORUNLUDUR.

`archetype`, `individual`, `orchestrator-hub` veya `agent-workspace` değerlerinden biri OLMALIDIR.

`rigor`, `micro`, `standard` veya `deep` değerlerinden biri OLMALIDIR (bkz. [Orantılı titizlik](/spec/dwp-specification#proportional-rigor)).

`parent_plan`, bir alt planı orkestratör planıyla ilişkilendirir (`{repo}:{plan_name}` veya `null`).

`created_by`, oluşturan ajanı ve modeli belirleMELİDİR. Görünen ad ötesinde sır, token veya kullanıcı tanımlayıcısı İÇERMEMELİDİR.

## `state.json` — canlı yürütme durumu

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v1.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "tasks": [
    {
      "id": 1,
      "file": "1.task_webhook_endpoint.md",
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "file": "3.task_retry_queue.md",
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

### Görev girdileri

Plandaki her görev dosyasının `tasks` içinde numarasıyla (`id`) ve dosya adıyla (`file`) anahtarlanmış tam olarak bir girdisi OLMALIDIR.

`status`, `pending`, `in_progress`, `completed`, `blocked` veya `skipped` değerlerinden biri OLMALIDIR. `skipped` yalnızca kullanıcı `refine` aracılığıyla görevi açıkça kapsam dışına bıraktığında geçerlidir; `state.json`, işi sessizce atlamak için KULLANILMAMALDIR.

`completed` bir girdi, `completed_at` ve planın commit attığı durumlarda kısa `commit` karmasını TAŞIMALIDIR — bu, plan-kod izlenebilirlik bağlantısıdır.

### Kapı kayıtları

Bir doğrulama komutunun her çalıştırması bir kapı kaydı olarak kaydedilMELİDİR: `command`, `passes` (boolean), `exit_code`, `last_run` ve kısa, insan tarafından okunabilir bir `evidence` dizesi (`analysis_results/` altında bir özet satırı veya yol; hiçbir zaman tam komut çıktısı değil).

Bir görev, `state.json`'daki kapı kayıtlarından herhangi birinin `passes: false` değeri varken ve sonraki geçen bir çalıştırma yokken `completed` olarak işaretlenMEMELİDİR. Kapı kayıtları, "kanıtsız tamamlandı işaretleme" kalıbının makine eşdeğeridir — erken tamamlamayı engelleyen görev başına `passes` bayrağı kalıbı.

### Bölümsel bellek olarak sonuç kayıtları

`completed` bir görev bir `outcome` kaydı TAŞIMALIDIR: nelerin `tried` (denendiği), nelerin `failed` (başarısız olduğu), nelerin `worked` (işe yaradığı) ve serbest biçimli `notes` (notlar). Her girdiyi tek satırda tutun.

Sonuç kayıtları, tamamlanmış bir planı erişilebilir **bölümsel bellek** hâline getirir: bir ajan (veya bellek-dizinleme platformu) daha sonra bir sorunun yalnızca çözüldüğünü değil, nasıl çözüldüğünü hatırlayabilir. Kalıpları aramada bu kayıtları OKUMALIları gereken zorunlu Skills & Agents Discovery görevini beslerler. Hermes gibi ajan belleğini dizinleyen platformlarda, `state.json`'daki sonuç kayıtları tamamlanmış planların ilerideki oturumlar genelinde doğrudan erişilebilir hâle gelmesini sağlar.

### Kontrol noktası ve engellenmiş durum

`checkpoint`, mevcut görevin içindeki en ayrıntılı devam noktasını kaydeder: görev `id`'si, serbest biçimli bir `step` konum belirleyici, zaman damgası ve tek satırlık not. Bir ajan, bir görevin içinde durakladığında onu güncelleMELİDİR; gözetimsiz modda planlı herhangi bir kesintiden önce güncelleMEK ZORUNDADIR.

`blocked`, `null` veya `{ "task": N, "reason": "...", "since": "...", "needs": "..." }` değerindedir. Durma koşuluyla karşılaşan gözetimsiz bir ajan, durmadan önce `blocked` alanını doldurmak ZORUNDADIR — bir daemon'ın sonraki kalp atışının veya bir insanın planın neden durduğunu öğrenmesinin yolu budur.

## Projeksiyon ve uzlaştırma

Markdown her anlaşmazlıkta KAZANMALIDIR. `state.json` görev 4'ün `completed` olduğunu söylüyorsa ancak plan README'si işaretsiz bir kutuyu gösteriyorsa, durum dosyası eskidir.

Devam eden bir ajan, devam etmeden önce README onay kutusu listesini `state.json` ile KARŞILAŞTIRMALIDIR. Desenkronizasyonda, `state.json`'u Markdown'dan (ve mevcut olduğunda git günlüğünden) yeniden oluşturMALI, uzlaştırmayı `PROGRESS.md`'ye kaydetMELI ve ancak o zaman devam etMELİDİR.

`verify` alt skill'i, desenkronizasyonu bir uyumluluk bulgusu olarak ele ALMALIDIR: hangi görevlerin hangi yönde ayrıştığını raporlayın.

Yürüten ajan dışındaki araçlar her iki JSON dosyasını da salt okunur olarak ele ALMALIDIR.

## Şema sürümleme

Her iki şema da URL ile sürümlüdür (`/v1.json`). Bir sürüm içinde ekleyici alanlar izinlidir; bir alanı yeniden adlandırmak veya yeniden yazmak, spec değişiklik günlüğünde bir geçiş notu ile birlikte `/v2.json` gerektirir. Manifest'teki `spec_version` alanı, planın altında oluşturulduğu DWP spec sürümünü sabitler; kurulu spec'inden daha yeni bir planla karşılaşan bir ajan, tahmin yapmak yerine bunu BELİRTMELİDİR.
