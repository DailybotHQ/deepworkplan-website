---
title: Dependency upgrade
description: "Bir deponun bağımlılıklarını doğrulanmış, geri alınabilir gruplar hâlinde yükselten, npm varsaymak yerine gerçek yöneticiyi saptayan, paket yöneticisinden bağımsız isteğe bağlı bir eklenti."
kind: addon
lang: tr
order: 3
---

# Dependency-upgrade eklentisi

Bir deponun bağımlılıklarını gruplanmış, doğrulanmış, geri alınabilir bir iş akışıyla güncel hâle getirin. Üçüncü isteğe bağlı Deep Work Plan eklentisi.

## Neler ekler

- Deponun **gerçek** paket yöneticisinin (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer ve daha fazlası) var olan manifest ve lockfile üzerinden saptanması.
- **Yalnızca kabul edildiğinde** `.agents/commands/` içine kurulan bir `/lib-upgrade` komutu.

## Davranış

1. Temiz (ya da yedeklenmiş) bir çalışma ağacı gerektirin.
2. Yükseltmeleri semver’e göre sınıflandırın — patch, minor, major; major’lar açık onay gerektirir.
3. Küçük, tutarlı gruplar hâlinde yükseltin; asla hepsini birden değil.
4. Her gruptan sonra deponun gerçek doğrulama geçidini çalıştırın; başarısız olan herhangi bir grubu geri alın.
5. Neyin yükseltildiğini, atlandığını ve geri alındığını özetleyin; commit etmeyi geliştiriciye bırakın.

## Notlar

Paket yöneticisinden bağımsızdır — JS dışı bir depoda asla npm/ncu çalıştırmaz. İsteğe bağlıdır, hiçbir zaman zorunlu değildir ve asla otomatik commit yapmaz.
