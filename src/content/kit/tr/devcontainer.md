---
title: Devcontainer
description: "Her depo için tek şablondan tekrarlanabilir geliştirme konteyneri: ak ile ana makine hesaplarınızda ajanlar, iki yönlü Herdr, SSH anahtarları isteğe bağlı."
kind: addon
lang: tr
order: 1
---

# Devcontainer eklentisi

Depoya yeniden üretilebilir, yalıtılmış bir geliştirme konteyneri verin — insanların, editörlerin ve kodlama agent'larının hep birlikte kullanabileceği bir konteyner. **DWP v7**'de (paket `v7.8.0`) bu eklenti, Deep Work Plan olmadan da çalışan bir MIT ürünü olan **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**'i entegre eder. İsteğe bağlıdır: bir depo onsuz da tümüyle uyumludur.

## devcontainer-kit'in sağladıkları

- [Dev Containers](https://containers.dev) spesifikasyonu üzerine kurulu, `dck init` komutunun depoya tek bir sabit düzende oluşturduğu **bir şablon**: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` ve `dev.sh`. Daha sonra yeniden çalıştırıldığında uzlaştırır ve düzenlemelerinizin üzerine asla yazmaz; var olan bir dosyadaki her değişiklik önce gösterilir ve onay gerektirir.
- **Deponun kendi konteyneri.** Dockerfile, çalışma ortamının özetle (digest) sabitlenmiş resmî imajından başlar — `node-24`, `python-3.13` ya da `debian` — ve kitin derleme adımlarını `docker/local/<service>/dck/` dizinine kopyalar. Ortak bir temel imaj kullanılmaz.
- **`dev.sh` ve `dck`.** `bash dev.sh up`, konteyneri düz bir terminalden derler, başlatır ve ona bağlanır; `shell`, `rebuild`, `doctor` ve diğerleri VS Code veya Cursor ile ya da onlar olmadan çalışır.
- **İki yönlü Herdr.** Ana makinedeki [Herdr](https://herdr.dev), her konteyneri yalnızca loopback üzerinde dinleyen bir SSH sunucusu aracılığıyla bir makine olarak bağlar; konteyner de standart kenar çubuğuyla açılır: App, Editor, Development ve Agents. Sonradan açılanlar dahil her çalışma alanı ve her panel, uygulama yolunda başlar (varsayılan olarak `/app`). İçeride [herdr-peers](/kit/herdr), agent'ların ana makinedeki ve diğer konteynerlerdeki agent'lara soru sormasını sağlar.
- **`dck-dockerfile` becerisi.** Bir agent, istek üzerine bir deponun konteynerini oluşturur ya da yeniden üretir ve bunu gerçek bir derlemeyle kanıtlar.

## Kurulum

```bash
git clone --branch v1.0.0 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Gereksinimler: Linux veya macOS ana makinesinde `bash` 3.2 veya daha yenisi ve `python3` 3.11 veya daha yenisi; konteyner komutları için de Compose v2 ile Docker. Bir sürümü `SHA256SUMS` varlığıyla doğrulayın. `v1.0.0` sürümüne sabitleyin: `v0.2.0` desteklenmez.

| Öğe | Değer |
|---|---|
| Ürün | `DailybotHQ/devcontainer-kit`, `v1.0.0` etiketi, arayüz 2 |
| Kayıt defteri anahtarı | `.dwp/config.json` içinde `devcontainer` |
| Depo başına yapılandırma | `.devcontainer/dck.toml` |
| Algılama | `dck doctor --json` |

**`v1.0.0` sürümünden beri kararlı.** Genel arayüz anlamsal sürümlemeyi izler ve yalnızca yeni bir ana sürümde (dosyalar için ayrıca yeni bir arayüz numarasıyla) uyumsuz biçimde değişir: belgelenmiş bayrakları ve çıkış kodlarıyla (`0` başarılı, `1` başarısız, `2` kullanım, `3` yapılandırma, `4` ortam, `5` reddedildi) `dck` fiilleri; `dck.toml`, ana makine profili ve `dck doctor --json` şemaları (arayüz 2); ve oluşturma sözleşmesi — `dck init` komutunun yazdığı ve sahiplendiği dosyalar, koruduğu `dck:managed` işaretçileri ve kullanıcı blokları ile entrypoint'in okuduğu ortam. `v0.3.7` sürümünden geçişte hiçbir şey bozulmaz: imajın yeni sabitlenmiş sürümleri (herdr-peers, coding-agents-kit ve DeepWorkPlan Vim; her biri `v1.0.0` sürümünde) içermesi için `dck init` ve `dck rebuild` komutlarını çalıştırın.

## Katmanlar

Her konteyner geliştirme araçlarını taşır — git, gh, ripgrep, bir SSH sunucusu, Herdr ve herdr-peers — ve siz [ana makine hesaplarını](#konteynerin-içinde-ana-makine-hesapları) etkinleştirmedikçe hiçbir gizli bilgi içermez. Geri kalanı, `dck.toml` içinde seçtiğiniz bir katmandır:

| Katman | Varsayılan | Ne ekler |
|---|---|---|
| `agents` | kapalı | Doğrulanmış sürümünden [coding-agents-kit](/kit/agentkit) ve listelediğiniz CLI'lar, her biri kendi kalıcı birimiyle; ayrıca `classic` (`claudex`, `codexx`, …) ve `providers` (`claude-glm`, `codex-azure`, …) ön ayarları. Agent'lar varsayılan olarak özerk çalışır — korumalı alan (sandbox) konteynerin kendisidir. Devre dışı bırakma: servis `.env` dosyasında `AGENTKIT_PERMISSIONS=ask`. |
| `editor` | açık | Etikete sabitlenmiş [DeepWorkPlan Vim](/kit/vim) ile Neovim; kapalıyken düz bir editör sunar. |
| `dailybot` | kapalı | dailybot eklentisi için Dailybot CLI. |

Oturum açma bilgileri, `gh`, Herdr yapılandırması ve git kimliği `bash dev.sh rebuild` sonrasında korunur. `agents` katmanıyla imaj, coding-agents-kit'in üç becerisini de (`agentkit`, `agentkit-setup`, `agentkit-orchestrate`) taşır; bunlar her başlatmada her agent'ın beceri dizinine bağlanır, böylece yeniden oluşturulan bir konteyner onları korur.

Durum birimi (SSH ana makine anahtarı, `~/.ssh`, `gh` oturumu, Herdr istemci durumu, geçmiş) `state` olarak adlandırılır. Birkaç servis tek bir compose projesini paylaştığında, `dck.toml` içinde `[compose] state_volume` ile (veya `dck init --state-volume NAME` ile) her birine kendi adını verin; aksi hâlde hepsi aynı birimi bağlar ve `dck doctor` bunu belirtir.

## Makineler arasında agent'lar

`v0.2.3` sürümünden itibaren `dck up`, Docker Desktop üzerinde elle hiçbir adım gerektirmeden iki yönlü bir ağ kurar:

- **Konteynerler ve ana makine.** İçerideki agent'lar ana makinedeki, diğer her dck konteynerindeki ve ana makinenizin Herdr'ının zaten yönettiği diğer loopback konteynerlerindeki Herdr agent'larına ulaşır; onlar da geri ulaşır. Her eş sabitlenmiş bir ana makine anahtarı taşır; hiçbir şeye ilk kullanımda güvenilmez.
- **İsteğe bağlı bir ana makine dinleyicisi.** `dck setup`, `127.0.0.1` üzerinde yalnızca dck anahtarını kabul eden ve launchd (macOS) tarafından çalışır durumda tutulan kullanıcı düzeyinde bir SSH sunucusunu bir kez önerir. Zaten bir loopback dinleyicisi çalıştırıyorsanız, ana makine profilini bunun yerine ona yönlendirin. `dck host listener disable` onu kaldırır.
- **Yeniden derlemelerden sonra korunur.** Konteynerin Herdr makine kataloğu bir birimde tutulur; bu nedenle `bash dev.sh rebuild`, içeride kayıtlı her makineyi korur. `v0.3.2` sürümünden itibaren `rebuild`, `start` ve `restart`, `up` ile aynı adımları çalıştırır: konteyner ana makinenin Herdr'ına yeniden kaydedilir, ana makine anahtarı yeniden sabitlenir ve ağ gönderilir; böylece sıfırdan derlenen bir konteyner ana makineye ve eşlerine hemen ulaşır.
- **Konteynerin içinde Codex bölmeleri.** Bir Codex agent'ının başka makinelerdeki eşlere soru sorabilmesi için `HERDR_PEERS_SELF` değişkenine, yani konteynerin ana makinede kayıtlı makine kimliğine ihtiyacı vardır. `v0.3.3` sürümünden itibaren kit bu kimliği her kayıtta saklar ve konteynerin oturum açma kabukları onu dışa aktarır; böylece hiçbir agent bunu elle ayarlamaz. `dck doctor` bir uyuşmazlığı bildirir. `v0.3.4` sürümünden itibaren konteynerin kendi Codex yapılandırmaları, Codex'in başlangıçtaki güncelleme denetimini ve arka plan daemon'unu atlar (kit her CLI sürümünü sabitler); ana makinenizdeki Codex home dizinine veya paylaşılan bir profile asla dokunmaz.
- **Ana makineden de yanıt.** `dck setup`, ana makineye doğrulanmış bir [herdr-peers](/kit/herdr) kurar; böylece `dck agents` ve `dck ask` orada da çalışır ve ana makinedeki agent'lar `herdr-peers reply` ile yanıt verir.
- **Kitin oluşturmadığı konteynerler.** Oturum açarken kullandıkları açık anahtarları ana makine profilinizde `[ssh] authorized_extra` altında listeleyin; onlar da dck konteynerlerine ulaşabilir.

Ana makinede ve konteynerde [coding-agents-kit](/kit/agentkit) ile birlikte kullanın; aynı `ak` her iki tarafta da agent başlatır.

## Konteynerin içinde ana makine hesapları

Bir konteyner, ana makinede zaten sahip olduğunuz hesapları kullanabilir — git'in ana makinenin SSH agent'ı aracılığıyla zaten çalıştığı gibi — içeride oturum açmadan. Bu isteğe bağlıdır ve bir deponun `dck.toml` dosyasında değil, her zaman **ana makine profilinizde** bulunur:

```toml
[agents]
host_profiles = true          # default false
host_env_keys = ["ZAI_CODING_API_KEY"]   # allow-list of env names to share
```

`host_profiles` açıkken `dck up`, yalnızca deponun kurduğu CLI'ların profillerini paylaşır:

- **Claude Code**, profil başına uzun ömürlü bir token aracılığıyla: `@default` için `CLAUDE_CODE_OAUTH_TOKEN` ve `@name` için `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>` (sonek büyük harfe çevrilir, `A-Z`, `0-9` ve `_` dışındaki her karakter `_` olur).
- **Codex**, kimlik doğrulama dosyası aracılığıyla; `@default` ve her profil için.
- **Kitin env dosyası**, salt okunur ve `host_env_keys` içindeki adlara indirgenmiş olarak.

agentkit home dizininin tamamı asla bağlanmaz ve mutlak ana makine yolları içeren profiller atlanır. Okuma-yazma olarak paylaşılan bir Codex oturumu aynı anda iki yazar tarafından yenilenebilir: Codex hesabı başına tek bir etkin agent tutun. Ana makine profilindeki `[agents] default_profile` (örneğin `{ claude = "@work3" }`), içerideki yalın bir `ak claude` komutunun bu paylaşılan hesabı kullanmasını sağlar (coding-agents-kit ≥ `v0.5.2`); macOS'taki bir `@default` Claude oturumu Keychain'de bulunur ve paylaşılamaz. `v0.3.4` sürümünden itibaren konteynerin kabukları yalın bir `claude` veya `codex` komutunu da bu hesaba yönlendirir; böylece Herdr'ın geri yüklediği bölmeler bir oturum açma ekranı yerine bu hesapta açılır. Konteynerin içinde aynı `ak <kind> @<profile>`, ana makinedekiyle aynı hesapta çalışır; bu da bir liderin konteyner şeritlerine `ak pick`'in seçtiği hesapları vermesini sağlar — bkz. [Birçok ajanı çalıştırmak](/methodology/06-orchestration).

## Birkaç depo, tek bir compose yığını

`v0.3.3` sürümünden itibaren, servisi daha büyük bir compose projesinin parçalarından biri olan bir depo (tek bir projeyi paylaşan bir API, bir web uygulaması, worker'lar ve bir veritabanı), dck'nin oluşturduğu dosyaları elle düzenlemeden bu projeye katılabilir. Tüm değişiklikler yalnızca ekleme niteliğindedir: bu anahtarların hiçbirini ayarlamayan bir depo tam olarak eskisi gibi oluşturulur.

- **Tek proje, servis başına bir durum birimi.** `[compose] project` her depoda paylaşılan projeyi adlandırır; `state_volume`, `[compose] networks` ve `[compose] volumes` her servisin durumunu ve yığının veri birimlerini ve ağlarını birbirinden ayrı tutar.
- **Bir kullanıcı bloğu.** dck servisinin içinde `# >>> user:<service> >>>` ile `# <<< user:<service> <<<` arasındaki satırlar olduğu gibi korunur: dck'nin oluşturmadığı şeyler için düz anahtarlar (`depends_on`, `healthcheck`), oluşturduğu anahtarlar için ise `x-dck-merge:`. dck'nin işaretçilerinden yalnızca bazılarını içeren bir dosya, yeniden yazılmak yerine düzeltme yolu gösterilerek reddedilir.
- **Port dizeleri.** `ssh_port` ve `ports`, `"${API_PORT:-8000}:8000"` gibi compose ifadelerini kabul eder; dize bir ana makine IP'si belirtmedikçe `127.0.0.1` üzerinde kalırlar.
- **Paylaşılan derlemeler ve kendi başlatıcınız.** `[build] context` ve `[build] dockerfile`, birkaç servisin paylaştığı bir Dockerfile'ı kapsar; `dev_sh = false` bir deponun kendi `dev.sh` dosyasını korur.
- **Çalışma alanı uyduları.** `v0.3.5` sürümünden itibaren, servisin kendi compose projesindeki ikinci bir örneği dck üzerinden başlatılıp durdurulur (`dck --project P --compose-file F --service S up` veya `down`); böylece ana örnekle aynı ana makine anahtarını, hesapları, git kimliğini ve Herdr makinesini alır. `up --seed-state-from VOLUME` yalnızca oturumları onun boş durum birimine kopyalar. Bir overlay dosyasında `extends`, genişlettiği dosyayı belirtmelidir.
- **Agent'lar için Node.** Agent'ların kendi Node'u `/opt/dck/node` altında bulunur ve imajınkinin yerini asla almaz; deponun araçları bunu gerektirdiğinde `[agents] node_first = true` onu PATH'te ilk sıraya koyar.

## Ana makinenin SSH anahtarları konteynerin içinde

Bazı araçlar yalnızca anahtar dosyalarını okur ve yönlendirilen SSH agent'ını yok sayar: örneğin `gh auth login` yeni bir anahtar üretmeyi önerir. `v0.3.2` sürümünden itibaren bunu yalnızca **ana makine profilinizde** etkinleştirebilirsiniz (bir deponun `dck.toml` dosyası bunu ayarlayamaz; `dck setup` bir kez sorar, varsayılan hayır):

```toml
[ssh]
copy_keys = true              # default false
```

Açıkken `dck up`, ana makinenin `~/.ssh` dizinini `~/.ssh_host` konumuna salt okunur olarak bağlar ve her başlatma, onun `id_*` anahtarlarını konteynerin `~/.ssh` dizinine kopyalar (özel anahtarlar `0600`) ve onları ana makineyle eşit tutar. Agent yönlendirmesi değişmez; seçenek kapatıldığında kopyalar bir sonraki başlatmada kaldırılır. Bedeli: ana makinenin tüm `~/.ssh` dizini konteynerin içinden okunabilir ve özel anahtarlar durum biriminde durur.

## Güvenlik varsayılanları

- `dck.toml` içinde `bind` ayarlanmadıkça her yayımlanan port `127.0.0.1` adresine bağlanır.
- SSH üzerinden git, ana makinenin SSH agent'ı aracılığıyla çalışır — onun soketi; asla bir anahtar dosyası, asla bağlanmış bir `~/.ssh` ya da `~/.gitconfig` değil (ana makine profilinizde [`copy_keys`](#ana-makinenin-ssh-anahtarları-konteynerin-içinde) seçeneğini açmadıysanız). Git kimliği, `dck setup` komutunun doldurduğu `DCK_GIT_*` değerlerinden gelir.
- SSH ana makine anahtarları çalışma zamanında proje başına bir birime üretilir, asla bir imajın içine gömülmez; sunucu yalnızca açık anahtarları kabul eder, root girişi ve parola yoktur.
- Şablon hiçbir `cap_add`, hiçbir `privileged` modu ve hiçbir Docker soketi eklemez.
- Her indirme sürüme sabitlenir ve sağlama toplamıyla doğrulanır; temel imaj özetle (digest) sabitlenir.
- Bir konteynerdeki agent'ların diğerlerine ulaşmasını sağlayan Herdr ağı varsayılan olarak açıktır ve kapatma anahtarlarıyla birlikte kitin tehdit modelinde belgelenmiştir. Ana makine dinleyicisi, çalışan bir konteynerdeki kodun ana makinede sizin adınıza bir kabuk açmasına izin verir: isteğe bağlıdır, yalnızca loopback üzerinde çalışır, yalnızca dck anahtarını kabul eder ve `dck host listener disable` ile kaldırılır.

## Notlar

İsteğe bağlıdır ve hiçbir zaman zorunlu değildir. Bir depo, sıfır isteğe bağlı eklentiyle tümüyle uyumludur. Linux ve macOS ana makineleri desteklenir; konteynerler arasındaki ağ Docker Desktop gerektirir.
