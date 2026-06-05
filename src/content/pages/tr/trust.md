---
title: "Güven ve güvenlik"
description: "Deep Work Plan'in neden güvenle benimsenebileceği: açık kaynak ve MIT lisanslı, ağ çağrısı veya telemetri içermeyen Markdown-first yapı, tasarım gereği yıkıcı olmayan, doğrulanabilir kurulumlar ve açık bir güvenlik açığı bildirme politikası."
lastUpdated: 2026-06-05
---

## Neden güvenebilirsiniz

Kimse güvenemediği bir skill'i kurmamalıdır. Deep Work Plan, kör bir inanca değil doğrulamaya dayalı olarak tasarlanmıştır: açık kaynak, Markdown-first, yıkıcı olmayan ve çalıştırmadan önce kontrol edilebilir.

- **Açık kaynak ve MIT lisanslı** — web sitesi ve skill herkese açık ve karşılaştırılabilirdir; çalıştırmadan önce her satırı okuyun.
- **Markdown-first — ağ yok, telemetri yok** — CLI yok, HTTP API yok, kimlik doğrulama akışı yok; ağ çağrısı yapmaz ve telemetri göndermez. Deponuzla ilgili hiçbir şey makinenizden çıkmaz.
- **Tasarım gereği yıkıcı olmayan** — güvenlikle ilgili tek eylem deponuzu değiştirmektir ve bunu üzerine yazmak yerine uzlaştırarak yapar: mevcut olanı tespit eder, bir plan önerir ve herhangi bir şeyin yerini almadan önce sorar. Plan çıktıları, gitignore'lanmış bir `.dwp/` dizininde tutulur.
- **Sırları dokunmaz** — hiçbir zaman sır kaydetmez, `.gitignore`'u yeniden yazmak yerine ona ekler ve değişiklikleri küçük, okunabilir farklar halinde tutar.
- **Doğrulanabilir kaynak** — her sürüm, gönderilen skill üzerinde sağlama toplamları yayımlar.

---

## Çalıştırmadan önce doğrulayın

Skill'i kontrol edene kadar güvenilmez olarak değerlendirin. Her sürüm, gönderilen skill'i kapsayan bir `SHA256SUMS` dosyası ekler. Kurmayı planladığınız sürüm için indirin, ardından kopyanızın eşleştiğini doğrulayın — sıfırdan farklı bir çıkış, bir dosyanın eşleşmediği anlamına gelir ve durmanız gerekir.

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git
cd deepworkplan-skill
# Kurmayı planladığınız sürümün sağlama toplamlarını indirin (vX.Y.Z ile değiştirin):
curl -fsSL -o SHA256SUMS \
  https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
./setup.sh --verify        # sıfırdan farklı çıkış, bir dosyanın eşleşmediği anlamına gelir — durun
```

Sürümler **sağlama toplamlarına sahiptir, imzalı değildir** — imzalama (cosign veya yetkili kişi GPG'si) belgelenmiş bir sonraki adımdır, mevcut bir iddia değildir. Her şey açık olduğundan, herhangi bir dosyayı etiketindeki depoya göre de karşılaştırabilirsiniz.

---

## Güvenlik açığı bildirin

Bir güvenlik sorunu mu buldunuz? Kamuya açık bir issue açmak yerine özel olarak **security@dailybot.com** adresine bildirin. Raporları 3 iş günü içinde onaylıyor ve ciddiyete bağlı olarak geçerli bulgular için 30 gün içinde bir düzeltme veya hafifletme göndermeyi hedefliyoruz. Web sitesi ve skill aynı politikayı paylaşır.

---

## Dürüst sınırlamalar

- Sürümler sağlama toplamlarına sahiptir, henüz kriptografik olarak imzalanmamıştır — imzalama planlandı, tamamlanmadı.
- Deep Work Plan, deponuza karşı otonom bir kodlama ajanı çalıştırır. Önerilen planı ve farklarını gözden geçirin; metodoloji bu inceleme için tasarlanmıştır, onun yerini almak için değil.
- Buradaki güven iddiaları yalnızca resmi kaynakları tanımlar. Depolardan sapan değiştirilmiş veya üçüncü taraf bir kopya, bu garantilerin hiçbirini taşımaz — önce doğrulayın.

---

## Güven kaynakları

- [Makine tarafından okunabilir güven manifestosu](https://deepworkplan.com/.well-known/dwp-trust.json)
- [security.txt (RFC 9116)](https://deepworkplan.com/.well-known/security.txt)
- [Web sitesi güvenlik politikası](https://github.com/DailybotHQ/deepworkplan-website/blob/main/SECURITY.md)
- [Skill güvenlik politikası ve tehdit modeli](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
- [Metodolojiyi okuyun](/methodology)
- [Benimseme (init)](/init)
