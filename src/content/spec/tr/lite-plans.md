---
title: Lite planlar
description: "Lite planlar: README.md içinde satır içi, kompakt ve tam olarak yürütülebilir görev kayıtları, bunların oluşturulması ve biçim seçimi, Full plana yükseltme."
order: 3
lang: tr
section: Workflow
---

# Lite planlar

**Sürüm 4.0.0. Durum: Kararlı.** Bu belge, [DWP spesifikasyonu](/spec/dwp-specification) ile birlikte tanıtılan Lite plan temsilini belirtir: yürütülemeyen bir taslak aşaması olmadan doğrudan somutlaştırılan, küçük ila orta ölçekli, sınırlı işler için bir plan biçimi. MUST, MUST NOT, SHOULD, SHOULD NOT ve MAY anahtar kelimeleri, RFC 2119'da açıklandığı şekilde yorumlanacaktır.

## Temsil ve yaşam döngüsü

Bir plan, `manifest.json`'da `plan_format` olarak bir kez kaydedilen iki temsilden biri OLMALIDIR: **Full**, her görev için `<n>.task_<slug>.md` altında bir dosya saklar; **Lite**, kompakt, yürütülebilir görev kayıtlarını, her biri kararlı bir `{#task-N}` çapasının arkasında, `README.md` içinde satır içi saklar. Bir Lite plan, kısmi veya gayriresmi bir Full plan değildir: her görev kaydı, [Görev anatomisi](/spec/dwp-specification#task-anatomy)'nin Full için tanımladığıyla aynı normatif biçimde bir hedef, bir Dokunulan Yüzey, kabul kriterleri, bir doğrulama kapısı ve bir tamamlanma günlüğü TAŞIMAK ZORUNDADIR.

Dört eksen bir planın durumunu tanımlar ve karıştırılmak yerine bağımsız olarak İZLENMEK ZORUNDADIR:

| Eksen | Değerler | Anlam |
|------|--------|---------|
| Biçim | `lite`, `full` | Görev kayıtlarının nerede yaşadığı |
| Somutlaştırma | `materializing`, `ready`, `promoting` | Plan klasörünün yazılıyor, tamamlanmış veya yükseltme sürecinde olup olmadığı |
| Onay | `pending`, `approved`, `pre_approved` | Bir insanın planı gözden geçirip geçirmediği, ya da trust modunun onu önceden onaylayıp onaylamadığı |
| Yürütme | `pending`, `in_progress`, `blocked`, `completed` | Görev başına ve genel ilerleme |

Yönlendirilmiş create, **gözden geçirilebilir, bekleyen bir öneri** yazar — Lite veya Full, zaten gerçek plan, asla bir kullan-at taslak değil. Trust, **hazır, önceden onaylanmış** bir planı somutlaştırır ve kontrolü hemen geri verir. `create` ve bir yükseltme asla ürün işi yürütmez; açık bir `execute` veya `resume` isteği planın hazır güncel kapsamını onaylar ve çalışmaya başlamadan önce bu onayı kaydetmek ZORUNDADIR; bu istek olmadan `pending` bir öneri yürütülebilir değildir; süren çözülmemiş bir yükseltme ürün işinden önce kurtarılmak ZORUNDADIR.

## Oluşturma ve biçim seçimi

`/dwp-create`, yalnızca büyük işlerde değil, her ölçekte planlama niyetine hizmet eder. Küçük, sınırlı iş — tek bir endişe, kabaca bir oturum, koordinasyon yok — Lite planın hedef kitlesidir; gerçek kapsamlı çok adımlı iş, [Orantılı titizlik](/spec/dwp-specification#proportional-rigor) uyarınca varsayılan olarak Full'a gider. Doğrudan bir düzenleme, bir açıklama, bir durum kontrolü, bir devam veya açık bir plansız istek kendi rotasını korur ve asla bir plana dönüşmez.

`lite` ve `full` **biçim tercihleridir**; `trust` ve `auto` ayrı **etkileşim seçenekleridir** ve her iki tür seçenek de isteğin herhangi bir ucunda, herhangi bir sırada GÖRÜNEBİLİR:

```text
/dwp-create trust fix the label
/dwp-create lite trust fix the label
/dwp-create fix the label trust lite
/dwp-create fix the migration full trust
```

Aynı seçeneği tekrarlamak idempotenttir; `lite` ve `full`'u birlikte istemek bir hatadır. `--`, seçenek ayrıştırmayı sonlandırır.

Hiçbir biçim tercihi verilmediğinde, `create` birini önerir ve nedenini açıklar. Açık bir **Full** isteği her zaman kazanır. Açık bir **Lite** isteği, işin gereksinimleri veya doğrulama kapıları kompakt satır içi kayıtlara sığmayacaksa, saygı görmez — bu durumda `create`, bunun yerine neden Full gerektiğini kaydeder. Seçim, gözlemlenen kapsamı, bağımlılıkları, gereken talimat ayrıntı düzeyini ve seçimin ardındaki bilinmeyenleri KAYDETMEK ZORUNDADIR — denetlenebilir bir yargı çağrısıdır, her model veya ajan genelinde geçerli olan bir garanti değildir.

## Yükseltme ve uyumluluk

Bir Lite plan, `/dwp-refine promote {plan_name}` aracılığıyla herhangi bir anda Full'a YÜKSELTİLEBİLİR (bkz. [dwp-refine](/kit/dwp-refine)). Yükseltme yalnızca temsille ilgilidir: niyeti kaydeder, hedef görev dosyalarını yazar, Lite kaydının taşıdığı her gereksinimin ve kapının hâlâ kapsandığını doğrular, yetkili kopyayı satır içi README kayıtlarından görev dosyalarına geçirir, ardından devam eden işaretleyiciyi temizler. `execute` ve `resume`, bir yükseltme işaretleyicisi ayarlı kaldığı sürece devam etmeyi REDDETMEK ZORUNDADIR. Zaten kaydedilmiş görev kimlikleri ve tamamlanma kanıtları bir yükseltme tarafından YENİDEN YAZILMAMALIDIR; yükseltme sırasında keşfedilen yeni kapsam bunun yerine `refine`'dan geçer ve yalnızca etkilediği kanıtı geçersiz kılar.

Yükseltme hiçbir zaman otomatik olarak ters yönde çalışmaz: bir Full plan sessizce Lite'a geri katlanmaz. Daha önceki bir spec sürümü altında yazılmış bir plan — `plan_format` alanı hiç olmayan bir v1 Full planı dahil — kaydedilmiş biçimini korur ve uyumlu kalır; bir `refine` oturumu onu kasıtlı olarak göç ETTİREBİLİR, ama hiçbir şey bunu örtük biçimde yapmaz.

`manifest.json`'ın `plan_format`'ı bir kez yazıldıktan sonra değiştirilemezdir; bir yükseltme `state.json`'ın `format`'ını değiştirir ve `promotion` işaretleyicisini temizler, manifestoyu asla yeniden yazmaz. Tam `plan_format`, `format`, `materialization`, `approval`, `promotion` ve `locator` alanları ile bunların v2 şema URL'leri için bkz. [Plan durumu](/spec/plan-state).
