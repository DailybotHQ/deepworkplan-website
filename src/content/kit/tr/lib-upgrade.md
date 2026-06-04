---
title: lib-upgrade
description: "Bir deponun bağımlılıklarını dependency-upgrade eklentisi aracılığıyla doğrulanmış, geri alınabilir gruplar hâlinde güvenle yükseltir. Yalnızca o eklenti kabul edildiğinde kurulur."
kind: command
lang: tr
order: 9
usage: /lib-upgrade
---

# lib-upgrade

Deponun bağımlılıklarını güvenle yükseltin. **dependency-upgrade** eklentisine ince bir yönlendirici.

## Ne yapar

`lib-upgrade`, dependency-upgrade eklentisine yönlendirir. Eklenti deponun gerçek paket yöneticisi üzerine akıl yürütür — asla npm varsaymaz — yükseltmeleri semver’e göre sınıflandırır, güvenli gruplar hâlinde yükseltir, her gruptan sonra deponun gerçek doğrulama geçidini çalıştırır, başarısız bir grubu geri alır ve özetler.

## Kullanım

```
/lib-upgrade
```

## Davranış

1. Temiz (ya da yedeklenmiş) bir çalışma ağacı gerektirin.
2. Gerçek paket yöneticisini var olan manifest ve lockfile’dan saptayın.
3. Yükseltmeleri sınıflandırın (patch / minor / major); major’lar onay gerektirir.
4. Küçük gruplar hâlinde yükseltin; her gruptan sonra deponun gerçek geçidini doğrulayın.
5. Geçidi geçemeyen herhangi bir grubu geri alın; özetleyin ve commit etmeyi geliştiriciye bırakın.

## Notlar

Bu komut yalnızca dependency-upgrade eklentisi kabul edildiğinde kurulur. Paket yöneticisinden bağımsızdır; asla otomatik commit yapmaz.
