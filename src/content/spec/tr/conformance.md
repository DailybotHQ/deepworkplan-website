---
title: Uyumluluk
description: "DWP uyumlu, AI-first bir deponun normatif tanımı: sahip OLMASI GEREKEN ve OLMALI olan yapılar, bir planı iyi biçimlendiren şey ve onun nasıl doğrulanacağı."
order: 6
lang: tr
section: Conformance
---

# Uyumluluk

**Sürüm 1.0. Durum: Kararlı.** Bu belge, bir deponun *Deep Work Plan uyumlu* — yani AI-first ve ajan-pilotlanabilir — olmasının ne anlama geldiğini tanımlar. MUST, MUST NOT, SHOULD, SHOULD NOT ve MAY anahtar kelimeleri, RFC 2119’da açıklandığı şekilde yorumlanacaktır.

Uyumluluk, “AI-first”ün bir izlenim değil, nesnel, denetlenebilir bir özellik olması için vardır. Bir depo, aşağıdaki ölçütleri ya karşılar ya da karşılamaz. [`verify` alt skill’i](/kit) (`/dwp-verify`) bunları mekanik olarak denetler.

## Uyumlu bir depo

DWP uyumlu bir depo, aşağıdakilerin tümünü KARŞILAMALIDIR. Her yapı, **depo için akıl yürütülMÜŞ** olmalıdır — gerçek dillerine, çerçevelerine ve komutlarına uyarlanmış. Genel bir taslak, bir yer tutucu ya da başka bir depodan kopyalanmış içerik bir ölçütü karşılamaz.

1. **Kökte `AGENTS.md`.** Depo, (a) dokümantasyonun bir dizinini, (b) depoya yönelik zorunlu kuralları ve (c) komutları bu depoda **gerçek ve çalıştırılabilir** olan bir Hızlı Komutlar bloğunu içeren bir kök `AGENTS.md` İÇERMELİDİR. Yer tutucu komutlar (örneğin npm kullanmayan bir depoda `npm test`) GÖRÜNMEMELİDİR.
2. **`CLAUDE.md`, `AGENTS.md`’ye çözümlenir.** Bir `CLAUDE.md` VAR OLMALI ve `AGENTS.md`’ye çözümlenMELİDİR (bir sembolik bağ veya tek bir doğruluk kaynağını garanti eden eşdeğeri). İkisi AYRIŞMAMALIDIR.
3. **Bir `docs/` hiyerarşisi.** Depo, standart kategorileri (mimari, standartlar, test etme, geliştirme komutları, güvenlik ve ajan kuruluma alması) gerçek, depoya özgü içerikle kapsayan bir `docs/` dizini İÇERMELİDİR. Karmaşık modüller kendi `README.md` dosyalarını TAŞIMALIDIR. Test etme kılavuzu, gerçek bir test, lint ve tür denetimi araç zinciri tanımlaMALIDIR — ya da hiçbiri olmayan bir depo için, kuruluma alma sırasında yığından **önerilen** somut bir kurulum. Boş bir test etme kılavuzu ya da “test yok” bu ölçütü karşılamaz: davranışı doğrulamak için tanımlı bir yol olmadan, bir planın nesnel bir doğrulama kapısı yoktur.
4. **Bir `.agents/` yuvası.** Depo, `agents/`, `commands/` ve `skills/` ile birlikte **diskte olanla eşleşen** bir `.agents/docs/` kataloğunu içeren bir `.agents/` dizini İÇERMELİDİR. `dwp-*` komutları, kurulu skill’e ince yönlendiriciler OLMALIDIR. Bir `.claude` yolu, `.agents`’a çözümlenMELİDİR.
5. **Gitignore’lanmış bir `.dwp/` çalışma alanı.** Depo, `plans/` ve `drafts/` içeren bir `.dwp/` dizini İÇERMELİ ve `.dwp/` gitignore’lanMALIDIR. Bir `tmp/` çalışma alanı VAR OLMALI ve gitignore’lanMALIDIR.
6. **Metodoloji skill’i çözümlenebilir.** Deep Work Plan skill’i, depodaki bir ajanın alt skill’lerini çağırabileceği şekilde kurulMUŞ veya başvurulMUŞ OLMALIDIR.

Bir depo, **sıfır eklentiyle tamamen uyumludur**. Eklentiler (devcontainer, Dailybot, dependency-upgrade, design-system) tercihe dayalıdır ve uyumluluk için GEREKLİ OLMAMALIDIR.

## İyi biçimlendirilmiş bir plan

`.dwp/plans/` içindeki bir Deep Work Plan şu durumlarda iyi biçimlendirilmiştir:

1. Her görev, açık bir **kapsam**, **kabul kriterleri** ve en az bir **doğrulama kapısı** (nesnel olarak geçen veya kalan bir komut ya da denetim) bildirMELİDİR.
2. Yeni çekirdek işlevsellik ekleyen veya ürün davranışını değiştiren her görev, kabul kriterlerinde o davranış için otomatik test kapsamını İÇERMELİ ve doğrulama kapısında deponun testlerini lint ve tür denetimi denetimleriyle birlikte çalıştırMALIDIR — yalnızca derlemeyi değil. Mevcut testler yeşil kalMALIDIR; bir davranış değişikliği, bozduğu bir testi silmek veya atlamak yerine güncelleMELİDİR. Yalnızca-dokümantasyon, yapılandırma veya araştırma görevleri test oluşturmaktan muaftır ancak yine de deponun kapısını çalıştırır.
3. Plan, işin kesintiyi atlatması ve farklı bir ajan tarafından kaldığı yerden sürdürülebilmesi için ilerlemeyi kalıcı kılMALIDIR.
4. Plan, iki zorunlu son görevi — Skills & Agents Discovery ve Executive Report — İÇERMELİDİR.
5. Görevler, uzun bir ufukta sapmayı önlemek için yürütmeden önce planın hedefine yeniden bağlanMALIDIR.

## Uyumluluğu doğrulama

Uyumluluk, inceleme yoluyla değil, mekanik olarak doğrulanMALIDIR. `/dwp-verify` çalıştırmak, yukarıdaki ölçütlere karşı bir geçti/kaldı raporu üretir: `AGENTS.md`’nin varlığı ve gerçek içeriği, `CLAUDE.md` çözümlemesi, `docs/` kategorileri, `.agents/` katalog-ile-disk eşleşmesi, `.dwp/` ve `tmp/` gitignore durumu ve — bir plan için — her görevin kabul kriterleri ile bir doğrulama kapısı taşıdığı, davranış değiştiren görevler için test kapsamıyla birlikte.

Bir depo, uyumluluğun bir kez iddia edilmek yerine sürdürülmesi için kuruluma almadan sonra ve tamamlanan her plandan sonra yeniden doğrulanMALIDIR.
