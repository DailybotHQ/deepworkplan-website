/**
 * id translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const id: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull: 'Deep Work Plan — eksekusi terstruktur untuk AI coding agent',
  siteDescription:
    'Deep Work Plan: metodologi terbuka dan kit referensi untuk eksekusi AI agent multijam yang terstruktur, tervalidasi, dan dapat dilanjutkan.',

  // Navigation
  nav: {
    home: 'Beranda',
    about: 'Tentang',
    contact: 'Kontak',
    // Deep Work Plan IA
    methodology: 'Metodologi',
    spec: 'Spesifikasi',
    kit: 'Kit',
    examples: 'Contoh',
    init: 'Init',
    quickstart: 'Mulai Cepat',
    trust: 'Kepercayaan',
    developers: 'Pengembang',
    privacy: 'Privasi',
    github: 'GitHub',
    faq: 'FAQ',
    compare: 'Compare',
    resources: 'Resources',
    resourcesDesc: 'Examples, comparison, FAQ and trust',
    repo: {
      label: 'Kode sumber',
      website: 'Repositori situs web',
      websiteDesc: 'Situs ini',
      skill: 'Repositori skill',
      skillDesc: 'Skill yang dapat dipasang',
    },
    menu: 'Buka menu',
    closeMenu: 'Tutup menu',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'Hak cipta dilindungi.',
    poweredBy: 'Didukung oleh',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'Baru · Efisien token',
    text: 'Deep Work Plan hadir di Product Hunt hari ini',
    tagline: 'beri agenmu sebuah rencana',
    linkText: 'Dukung kami',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Navigasi Situs',
    sections: {
      methodology: 'Metodologi',
      getStarted: 'Mulai',
      project: 'Proyek',
      connect: 'Terhubung',
      learn: 'Learn',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title: 'Deep Work Plan — eksekusi terstruktur untuk AI coding agent',
      description:
        'Konteks lebih penting daripada model. Deep Work Plan mengubah repositori apa pun menjadi lingkungan terstruktur tempat coding agent menyelesaikan pekerjaan jangka panjang.',
    },
    hero: {
      badge: 'Metodologi terbuka · MIT · Agnostik terhadap agent',
      title: 'Model itu penting.',
      titleEmphasis: 'Konteks lebih penting.',
      subtitle:
        'Deep Work Plan mengubah repositori apa pun menjadi lingkungan terstruktur — konteks, pagar pengaman, dan rencana yang tahan lama — tempat agen coding mana pun mengeksekusi dengan presisi dan efisien serta menyelesaikan kerja jangka panjang.',
      instructionLabel: 'Salin ke agent Anda',
      instruction:
        'Salin prompt init.md dan tempelkan ke agent coding Anda — Claude Code, Cursor, Codex, atau lainnya — untuk menjadikan repositori apa pun AI-first.',
      copyLabel: 'Salin init.md',
      copiedLabel: 'Tersalin',
      viewInitCta: 'Lihat prompt /init lengkap',
      pullQuote:
        'Deep Work Plan adalah spec-driven development tempat repositori itu sendiri menjadi harness.',
      primaryCta: 'Baca metodologinya',
      secondaryCta: 'Baca spesifikasinya',
      illustrationAlt:
        'Sebuah mercusuar di pesisir berbatu memancarkan satu berkas cahaya yang memandu kapal kecil — ukiran yang menggambarkan repositori sebagai harness mantap yang memandu agent mana pun.',
      scrollCta: 'Lihat cara kerjanya',
    },
    pitch: {
      kicker: 'Masalah dan jawabannya',
      problem:
        'Dalam ledakan singkat, agen coding mengesankan. Serahkan misi jangka panjang — sebuah migrasi, subsistem baru, refaktor puluhan file — dan mereka menyimpang: konteks penuh, keputusan sebelumnya memudar, dan kerja berjam-jam mandek di tengah jalan.',
      answer:
        'Deep Work Plan menjawabnya dengan pengembangan berbasis spesifikasi: rencana yang tahan lama, tugas atomik, dan gerbang verifikasi yang harus dilalui agen. "Selesai" berhenti menjadi perasaan — menjadi bukti yang dapat diverifikasi dan ditinjau.',
      efficiency:
        'Dan karena konteks adalah sumber daya paling langka bagi agen Anda, harness dirancang untuk efisiensi token: instruksi dimuat progresif, verifikasi hanya menyentuh yang berubah, dan setiap tugas belajar secara lokal — kerja panjang tetap terjangkau.',
      illustrationAlt:
        'Diptych ukiran: satu sisi kapal yang hanyut di kabut dekat karang, sisi lain kapal yang sama menuju mercusuar pelabuhan di jalur yang tergambar.',
    },
    story: {
      act1: {
        kicker: 'Metode · Babak I',
        lead: 'Anda yang memutuskan arti selesai dan di mana batasnya. Rencana membawa niat Anda; agen yang menghabiskan waktu — tanpa pengawasan terus-menerus, tanpa koreksi setiap dua puluh menit.',
        deepLinkLabel: 'Baca metodologi',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: 'Metode · Babak II',
        lead: 'Tugas panjang mengisi konteks model mana pun. Detail hilang dan agen menyimpang. Rencana tertulis — tugas atomik, gerbang verifikasi, status yang dapat dilanjutkan — adalah tempat kembali setiap putaran.',
        deepLinkLabel: 'Lihat loop inti',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: 'Metode · Babak III',
        lead: 'Setiap tugas menyebutkan kriteria penerimaan dan pemeriksaan yang harus lulus. Agen tidak bisa merasa selesai — harus lulus, atau tugas tetap terbuka.',
        deepLinkLabel: 'Baca spesifikasi',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: 'Metode · Babak IV',
        lead: 'Konteks, alat, pagar pengaman, dan status tinggal di repositori Anda sebagai berkas sederhana yang dapat dibaca agen mana pun. Tanpa lock-in, tanpa otak eksternal — bertahan melewati reset konteks.',
        deepLinkLabel: 'Lihat hasil onboarding',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: 'Metode · Babak V',
        lead: 'Konteks adalah sumber daya paling langka bagi agen Anda. Harness memuat progresif, memvalidasi yang berubah, dan belajar per tugas — rencana membayar dirinya sendiri.',
        deepLinkLabel: 'Baca metodologi',
        deepLinkHref: '/methodology',
      },
    },
    onboarding: {
      badge: 'Onboarding berbasis penalaran',
      title:
        'Arahkan ke repositori mana pun. Ia bernalar — bukan menyalin-tempel.',
      subtitle:
        'Alur onboarding memeriksa bahasa, framework, package manager, dan perintah validasi yang sebenarnya ada di repositori Anda, lalu menghasilkan artefak yang disesuaikan dengan repositori tersebut. Hasil generik dianggap sebagai kegagalan.',
      steps: [
        {
          title: 'Bernalar tentang stack dan arketipe Anda',
          description:
            'Membaca manifes, tata letak folder, dan CI untuk menyimpulkan perintah test, lint, dan build yang sebenarnya, lalu mengklasifikasikan repositori sebagai repo individual atau orchestrator hub.',
        },
        {
          title: 'Menghasilkan AGENTS.md, docs/, dan dokumentasi per modul',
          description:
            'AGENTS.md yang dipikirkan matang, hierarki docs/ yang terkategori, serta README dan docs/ di dalam setiap modul utama — diisi dengan perintah nyata repositori Anda, bukan placeholder.',
        },
        {
          title:
            'Menyiapkan .agents/ dengan symlink .claude dan .cursor ke .agents',
          description:
            'Direktori .agents/ lintas agent (skills, agents, commands) dan symlink .claude dan .cursor ke .agents, sehingga setiap alat membaca satu sumber kebenaran.',
        },
        {
          title: 'Memasang skill DWP dan menyiapkan .dwp/',
          description:
            'Menyambungkan skill Deep Work Plan dan membuat folder .dwp/ yang di-gitignore untuk rencana dan draf, memasang review lokal AI Diff Reviewer yang wajib, lalu secara opsional menambahkan addon opt-in seperti dukungan devcontainer.',
        },
      ],
    },
    quickstart: {
      badge: 'Apa yang terjadi saat Anda menjalankannya',
      title: 'Satu instruksi. Repositori melakukan sisanya.',
      subtitle:
        'Anda tidak memilih metode pemasangan atau menyalin template. Anda menyerahkan satu baris kepada agent; ia memasang skill — mesin yang dapat dipakai ulang — dan menyesuaikan repositori Anda dengannya.',
      steps: [
        {
          title: 'Agent Anda membuka /init.md',
          description:
            'Ia membaca prompt onboarding di deepworkplan.com/init.md beserta metodologi, spesifikasi, dan kit yang ditautkannya — standar yang akan diadopsinya.',
        },
        {
          title: 'Ia memasang skill Deep Work Plan',
          description:
            'Skill adalah mesinnya — sama di setiap repositori. Satu perintah menarik router dan sub-skill-nya (create, execute, refine, resume, status, verify, onboard, author) untuk Claude Code, Cursor, Codex, Gemini, dan Copilot.',
        },
        {
          title: 'Ia menyesuaikan repositori Anda',
          description:
            'Dengan bernalar tentang stack nyata Anda — tidak pernah menyalin-tempel — ia menulis AGENTS.md, pohon docs/ yang terkategori, README per modul, kit .agents/ yang dipikirkan matang, dan .dwp/ yang di-gitignore. Repositori Anda menjadi harness.',
        },
        {
          title: 'Anda merencanakan dan mengeksekusi',
          description:
            'Hasilkan Deep Work Plan jangka panjang untuk tugas apa pun dan jalankan langkah demi langkah, dengan acceptance criteria yang eksplisit, validation gate, dan status yang dapat dilanjutkan — secara otonom, selama berjam-jam.',
        },
      ],
      note: 'Skill dipasang secara identik di mana saja; yang disesuaikan adalah repositori Anda — AGENTS.md, docs, dan kit .agents/ yang dipikirkan matang dan dihasilkan untuk stack Anda. Pemisahan itulah yang menjadikan metodologi sebagai standar yang dapat dipakai ulang, bukan perancah sekali pakai.',
    },
    outcomes: {
      badge: 'Apa yang Anda dapatkan',
      title: 'Semua yang dibutuhkan agent Anda untuk bekerja secara otonom.',
      subtitle:
        'Satu eksekusi, di-commit secara atomik. Setiap keluaran berupa Markdown dan setiap perubahan dapat diaudit.',
      items: [
        {
          label: 'AGENTS.md di akar repositori',
          detail:
            'Dipikirkan matang dari stack, perintah, dan struktur nyata repositori Anda — bukan template dengan placeholder. CLAUDE.md di-symlink ke AGENTS.md.',
        },
        {
          label: 'docs/ terkategori dan dokumentasi per modul',
          detail:
            'Arsitektur, penyiapan, standar, dan pemecahan masalah — ditambah README dan docs/ di dalam setiap modul utama, dihasilkan dari basis kode Anda.',
        },
        {
          label: '.agents/ dengan symlink .claude dan .cursor ke .agents',
          detail:
            'Direktori .agents/ lintas agent (skills, agents, commands) dengan symlink .claude dan .cursor ke .agents sehingga setiap alat membaca satu sumber kebenaran.',
        },
        {
          label: 'Skill Deep Work Plan, terpasang',
          detail:
            'create, execute, refine, resume, status, verify, onboard, dan author — tersedia untuk agent Anda sebagai satu paket skill, tanpa salinan per repositori.',
        },
        {
          label: 'Konformansi yang dapat Anda periksa',
          detail:
            '/dwp-verify menghasilkan laporan lulus/gagal yang objektif terhadap spesifikasi, sehingga "AI-first" diverifikasi, bukan sekadar diklaim — dan dapat diverifikasi ulang setelah setiap rencana.',
        },
        {
          label: 'Dua arketipe, tertangani',
          detail:
            'Onboarding mengklasifikasikan repositori Anda sebagai repo individual (kasus umum) atau orchestrator hub yang mengoordinasikan rencana turunan lintas repositori.',
        },
        {
          label: 'Kit hidup yang ditumbuhkan repositori Anda',
          detail:
            'Sub-skill author (skill-create, agent-create) memungkinkan repositori mengembangkan skill, agent, dan command-nya sendiri; addon perawatan opt-in seperti dependency-upgrade membantunya tetap mutakhir.',
        },
        {
          label: 'Git-native, dapat dilanjutkan, .dwp/',
          detail:
            'Tanpa daemon dan tanpa status eksternal. Rencana dan draf tersimpan di folder .dwp/ yang di-gitignore, dan tugas apa pun dapat dilanjutkan hanya dari git — bahkan setelah konteks meluap.',
        },
      ],
    },
    agents: {
      badge: 'Agent',
      title: 'Bekerja dengan agent yang sudah Anda pakai.',
      subtitle:
        'Satu metodologi, banyak adapter. Markdown tidak mengikat framework ke apa pun — setiap agent yang membaca Markdown dapat menjalankan Deep Work Plan.',
      fullLabel: 'Penuh',
      partialLabel: 'Sebagian',
      viewAllCta: 'Lihat semua agen',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'Implementasi referensi, dengan WebFetch native dan slash command.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'Adapter penuh. Gunakan bundel offline jika WebFetch dibatasi.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'Bundel offline disarankan; aturan dipasang di bawah .codex/.',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: 'Adapter penuh — command dwp-* berjalan melalui AGENTS.md dan prosedur #.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Membutuhkan Gemini 2.5 Pro atau lebih baru, dengan WebFetch native.',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: 'Sumber terbuka. Membaca AGENTS.md secara native dan menjalankan dwp-* melalui command #.',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: 'Aturan ditambah prosedur command # menjalankan loop Deep Work Plan secara penuh.',
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'Sumber terbuka. Aturan Markdown dan command # menjalankan setiap langkah dwp-*.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'Adapter penuh dengan permukaan command native.',
        },
      ],
    },
    stacks: {
      badge: 'Stack',
      title: 'Preset penalaran untuk stack yang penting.',
      viewAllCta: 'Lihat semua preset',
      subtitle:
        'Ini adalah alat bantu penalaran, bukan template. Onboarding membaca manifes nyata repositori Anda dan menyesuaikan per stack — tidak pernah menyalin preset secara buta. Monorepo memperoleh dokumentasi per modul.',
      items: [
        { name: 'Django', sub: 'DRF · Poetry' },
        { name: 'FastAPI', sub: 'Pydantic · Poetry' },
        { name: 'Vue', sub: 'Vite · TypeScript' },
        { name: 'React', sub: 'Next · Vite · TS' },
        { name: 'Astro', sub: 'Svelte/React · MDX' },
        { name: 'TypeScript · Node', sub: 'Express · Fastify' },
        { name: 'TypeScript · Lambda', sub: 'Serverless · SAM' },
        { name: 'Go', sub: 'Modules · stdlib' },
        { name: 'Rust', sub: 'Cargo · 2021+' },
        { name: 'Generik', sub: 'Stack apa pun' },
      ],
    },
    archetypes: {
      badge: 'Dua arketipe',
      title: 'Repositori individual, atau orchestrator hub.',
      subtitle:
        'Onboarding bercabang berdasarkan arketipe. Sebagian besar repositori adalah repo individual. Sebuah hub mengoordinasikan Deep Work Plan turunan lintas banyak repositori. Metodologi menangani keduanya sebagai warga kelas satu.',
      individual: {
        tag: 'Kasus umum',
        title: 'Repositori individual',
        description:
          'Satu basis kode dengan satu stack utama, perintah validasinya sendiri, dan dokumentasi per modul. Bawaan — onboarding mengasumsikannya kecuali repositori jelas merupakan sebuah hub.',
        example:
          'Misalnya, sebuah Django API, aplikasi Vue, atau layanan TypeScript Lambda.',
      },
      orchestrator: {
        tag: 'Koordinasi',
        title: 'Orchestrator hub',
        description:
          'Sebuah repositori koordinasi yang mengatur pekerjaan lintas sub-repositori melalui manifes orchestrator, memunculkan rencana turunan yang masing-masing di-commit di repositorinya sendiri, ditambah aturan batas dan indeks navigasi.',
        example:
          'Misalnya, sebuah hub yang mengoordinasikan lima repositori produk.',
      },
    },
    comparison: {
      badge: 'Metodologi versus alat',
      title: 'Lapisan yang berbeda. Saling melengkapi, bukan bersaing.',
      subtitle:
        'Deep Work Plan bukan scaffolder lain. Ia adalah lapisan metodologi di bawah alat spec-driven atau scaffolding mana pun, yang berfokus pada eksekusi otonom multijam.',
      colDwp: 'Deep Work Plan',
      colOthers: 'Alat scaffolding / spec',
      rows: [
        {
          label: 'Fokus utama',
          dwp: 'Eksekusi otonom multijam',
          others: 'Pembuatan spec atau scaffold',
        },
        {
          label: 'Unit pekerjaan',
          dwp: 'Sebuah Deep Work Plan (sesi yang dapat dilanjutkan)',
          others: 'Sebuah dokumen spec atau scaffold',
        },
        {
          label: 'Model status',
          dwp: 'Folder .dwp/ git-native, dapat dilanjutkan',
          others: 'Sering eksternal atau di dalam IDE',
        },
        {
          label: 'Keterikatan agent',
          dwp: 'Agnostik terhadap agent (Markdown dan Bash)',
          others: 'Sering spesifik alat atau IDE',
        },
        {
          label: 'Pemulihan konteks',
          dwp: 'Melanjutkan setelah konteks meluap',
          others: 'Biasanya mengulang tugas dari awal',
        },
        {
          label: 'Lisensi',
          dwp: 'MIT, metodologi dan kit terbuka',
          others: 'Bervariasi',
        },
      ],
    },
    origin: {
      badge: 'Asal mula',
      quote:
        'Dibangun oleh Dailybot — perusahaan di balik standup asinkron untuk tim terdistribusi. Secara internal kami memakai Deep Work Plan untuk membuat repositori produksi yang mencakup Django, Vue, TypeScript Lambda, dan Astro dapat dikemudikan agent. Setelah berbulan-bulan penggunaan produksi, kami merilis metodologinya sebagai sumber terbuka di bawah lisensi MIT.',
      attribution: 'Tim teknik Dailybot',
      dailybotCta: 'Pelajari tentang Dailybot',
    },
    finalCta: {
      badge: 'Jadikan repositori Anda AI-first',
      title: 'Berikan deep work kepada agent Anda.',
      subtitle:
        'Serahkan satu baris kepada agent Anda — arahkan ke /init.md — dan ia menjadikan repositori Anda AI-first: memasang skill, bernalar tentang stack Anda, dan meng-commit hierarki AGENTS.md yang lengkap. Dari sana Anda membuat dan mengeksekusi Deep Work Plan yang berjalan otonom selama berjam-jam.',
      primaryCta: 'Buka prompt /init',
      secondaryCta: 'Baca metodologinya',
      tertiaryCta: 'Untuk agent & pengembang',
      meta: 'Berlisensi MIT · tanpa telemetri · keluaran ke folder .dwp/ yang di-gitignore.',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'Kontak',
    nameLabel: 'Nama',
    namePlaceholder: 'Nama Anda',
    emailLabel: 'Email',
    emailPlaceholder: 'anda@email.com',
    messageLabel: 'Pesan',
    messagePlaceholder: 'Tulis pesan Anda...',
    sendButton: 'Kirim pesan',
  },

  // About page
  aboutPage: {
    title: 'Tentang metodologi',
    subtitle: 'Metodologi terbuka · Berlisensi MIT',
    description:
      'Deep Work Plan adalah metodologi terbuka dan agnostik terhadap framework untuk pekerjaan teknik yang serius dengan AI coding agent. Dari mana asalnya dan siapa yang merawatnya.',
    heroDescription:
      'Struktur yang dapat diulang untuk merencanakan, mengeksekusi, dan memverifikasi deep work dengan AI coding agent — dibangun secara terbuka dan bebas dipakai.',
    bioTitle: 'Apa itu',
    bioText:
      'Deep Work Plan (DWP) adalah metodologi, bukan produk. Ia mendefinisikan cara mengubah sebuah tujuan menjadi rencana yang disepakati, memecah rencana itu menjadi tugas-tugas atomik yang dapat diverifikasi secara independen, dan menjalankan setiap tugas dalam loop yang fokus dan diakhiri dengan pemeriksaan.<br /><br />Ia sengaja dibuat agnostik terhadap AI agent atau stack yang Anda pakai — adapter menerjemahkan core loop yang sama ke Claude, Cursor, Copilot, Codex, Gemini, dan lainnya. Rencana, tugas, dan log eksekusi semuanya berupa Markdown polos, sehingga pekerjaan tetap dapat dibaca, ditinjau, dan dikendalikan versi.',
    passionsTitle: 'Prinsip inti',
    passions: [
      {
        title: 'Rencanakan sebelum eksekusi',
        description:
          'Tidak ada kode yang ditulis sebelum rencana disepakati. Rencana adalah kontrak antara Anda dan agent.',
        icon: '\u{1F5FA}️',
        link: '/methodology',
      },
      {
        title: 'Tugas bersifat atomik',
        description:
          'Setiap tugas dibatasi agar dapat dieksekusi dan diverifikasi secara mandiri, lalu di-commit secara atomik.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'Verifikasi semuanya',
        description:
          'Setiap tugas diakhiri dengan pemeriksaan eksplisit sebelum tugas berikutnya dimulai, dengan kemajuan tercatat di git.',
        icon: '✅',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'Sekilas',
    quickFacts: [
      'Metodologi terbuka, berlisensi MIT',
      'Agnostik terhadap framework dan agent',
      'Dirawat oleh Dailybot dan komunitas',
      'Mencakup spesifikasi, command, adapter, preset, dan contoh',
      'Hanya Markdown — tanpa runtime, tanpa lock-in',
      'Mengubah repositori apa pun menjadi basis kode AI-first yang dapat dikemudikan agent',
    ],
    ctaTitle: 'Siapa yang merawatnya',
    ctaDescription:
      'Deep Work Plan tumbuh dari pekerjaan teknik nyata di Dailybot dan kini dirawat oleh Dailybot bersama komunitas sumber terbuka. Metodologi, spesifikasi, dan kit dirilis di bawah lisensi MIT — bebas dipakai, diadaptasi, dan dikembangkan.',
    ctaCv: 'Baca metodologinya',
    ctaContact: 'Mulai Cepat',
  },

  // Contact page
  contactPage: {
    title: 'Komunitas & kontak',
    subtitle: 'Sumber terbuka · Digerakkan komunitas',
    description:
      'Deep Work Plan dibangun secara terbuka. Temukan sumbernya, ajukan issue, atau ikut percakapan melalui kanal di bawah — kontribusi sangat dihargai.',
    heroDescription:
      'Pertanyaan, ide, atau perbaikan? Deep Work Plan dikembangkan secara publik — di sinilah Anda dapat menghubungi proyek dan para perawatnya.',
    formTitle: 'Kirim Pesan',
    nameLabel: 'Nama',
    namePlaceholder: 'Nama Anda',
    emailLabel: 'Email',
    emailPlaceholder: 'anda@email.com',
    reasonLabel: 'Saya ingin menghubungi Anda tentang',
    reasonOptions: [
      { value: '', label: '— Pilih topik —' },
      { value: 'general', label: 'Umum / Sekadar menyapa' },
      { value: 'tech-talk', label: 'Tech talk / Undangan berbicara' },
      { value: 'collaboration', label: 'Kolaborasi / Kemitraan' },
      { value: 'project', label: 'Proyek / Tawaran kerja' },
      { value: 'dailybot', label: 'Pertanyaan tentang Dailybot' },
      { value: 'trading', label: 'Pertanyaan tentang trading saya' },
      {
        value: 'the-library-of-tomorrow',
        label: 'Bergabung dengan The Library of Tomorrow',
      },
      { value: 'other', label: 'Lainnya' },
    ],
    subjectLabel: 'Subjek',
    subjectPlaceholder: 'Tentang apa ini?',
    messageLabel: 'Pesan',
    messagePlaceholder: 'Tulis pesan Anda...',
    sendButton: 'Kirim Pesan',
    sendingButton: 'Mengirim...',
    successTitle: 'Pesan terkirim',
    successMessage:
      'Terima kasih telah menghubungi. Saya akan membalas secepat mungkin.',
    sendAnotherButton: 'Kirim pesan lain',
    requiredField: 'Bidang ini wajib diisi',
    invalidEmail: 'Masukkan alamat email yang valid',
    fallbackMessage:
      'Formulir kontak saat ini tidak tersedia. Anda dapat menghubungi saya langsung melalui email.',
    fallbackEmailText: 'Kirimkan saya email ke',
    formNote: 'Saya akan membalas secepat mungkin.',
    socialTitle: 'Terhubung Dengan Saya',
    locationTitle: 'Lokasi',
    locationText:
      'Berbasis di Kolombia. Terbuka untuk kolaborasi jarak jauh di seluruh dunia.',
    prefillSubjects: {
      generalInquiry: 'Pertanyaan Umum',
      collaboration: 'Peluang Kolaborasi',
      projectInquiry: 'Pertanyaan Proyek atau Kerja',
      projectCollaboration: 'Pertanyaan Kolaborasi Proyek',
      startupCollaboration: 'Peluang Kolaborasi Startup',
      techTalkInvitation: 'Undangan Berbicara Tech Talk',
      tradingQuestion: 'Pertanyaan Trading',
      dailybotQuestion: 'Pertanyaan Tentang Dailybot',
    },
  },

  contactSection: {
    title: 'Mari Terhubung',
    description:
      'Saya selalu terbuka untuk percakapan menarik, peluang kolaborasi, dan ide baru. Entah Anda ingin membahas teknologi, kewirausahaan, atau sekadar menyapa.',
    ctaText: 'Hubungi saya',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'id-ID',

  // 404 page
  notFoundPage: {
    title: 'Halaman Tidak Ditemukan',
    description:
      'Halaman yang Anda cari tidak ada atau telah dipindahkan. Jelajahi metodologinya atau kembali ke beranda untuk terus menelusuri.',
    heading: 'Halaman Tidak Ditemukan',
    message:
      'Maaf, halaman yang Anda cari tidak ada atau mungkin telah dipindahkan. Coba kembali ke beranda atau jelajahi metodologinya.',
    backHome: 'Kembali ke beranda',
    exploreMethodology: 'Baca metodologinya',
    agentTitle: 'Untuk agent AI',
    agentIntro:
      'Path ini tidak ada. Link pemulihan di bawah (beserta padanan yang dapat dibaca mesin) mencantumkan setiap halaman di situs ini.',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'Metodologi Deep Work Plan',
      description:
        'Lima bab dari manifesto hingga arketipe: prinsip, core loop, template, skill dan agent, serta adaptasi di balik Deep Work Plan.',
    },
    eyebrow: 'Metodologi',
    title: 'Metodologi Deep Work Plan',
    intro:
      'Lima bab yang membawa Anda dari filosofi di balik Deep Work Plan ke loop praktis, template, dan adaptasi yang Anda pakai setiap hari.',
    chapterLabel: 'Bab',
    readChapter: 'Baca bab',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    backToIndex: 'Semua bab',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Spesifikasi Deep Work Plan',
      description:
        'Spesifikasi Deep Work Plan yang dapat dibaca: format DWP, protokol agent, arketipe, standar dokumentasi, dan addon. Acuan bersama manusia dan agent.',
    },
    eyebrow: 'Spesifikasi',
    title: 'Spesifikasi',
    intro:
      'Spesifikasi metodologi yang presisi dan mudah dibaca — struktur dan protokol yang dibagikan antara manusia dan agent.',
    tocTitle: 'Di halaman ini',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    backToIndex: 'Semua dokumen spesifikasi',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'Kit Deep Work Plan',
      description:
        'Skill dan delapan sub-skill-nya, command, adapter, preset, addon opt-in, dan contoh yang membuat Deep Work Plan dapat dijalankan lintas agent dan stack.',
    },
    eyebrow: 'Kit',
    title: 'Kit',
    intro:
      'Semua yang Anda perlukan untuk menjalankan metodologi: skill dan sub-skill-nya, slash command, adapter agent, preset onboarding, review lokal yang wajib dan addon opt-in, serta contoh terkerjakan.',
    groups: {
      command: {
        title: 'Sub-skill & command',
        description:
          'Router skill dan sub-skill-nya (create, execute, refine, resume, status, verify, onboard, author), ditambah slash command tipis yang mendelegasikannya.',
      },
      adapter: {
        title: 'Adapter',
        description:
          'Integrasi per-agent yang tipis untuk Claude, Cursor, Codex, dan lainnya.',
      },
      preset: {
        title: 'Preset onboarding',
        description:
          'Panduan penalaran per-stack yang dipakai alur onboard untuk menyesuaikan docs, skill, dan perintah validasi dengan repositori Anda.',
      },
      example: {
        title: 'Contoh',
        description: 'Panduan langkah demi langkah, sebelum-dan-sesudah.',
      },
      addon: {
        title: 'Addon (opt-in)',
        description:
          'Kemampuan yang ditambahkan alur onboard ke sebuah repo: review lokal AI Diff Reviewer yang wajib ditambah empat addon opsional yang tidak pernah menjadi bagian dari baseline AI-first.',
      },
    },
    viewDetail: 'Lihat detail',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    backToIndex: 'Kembali ke kit',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Contoh Deep Work Plan',
      description:
        'Panduan sebelum-dan-sesudah yang menampilkan tugas teknik yang sama dengan dan tanpa Deep Work Plan — serta perbedaan keandalan dan peninjauannya.',
    },
    eyebrow: 'Contoh',
    title: 'Contoh',
    intro:
      'Lihat metodologinya bekerja — panduan konkret, sebelum-dan-sesudah, dari tugas teknik nyata.',
    viewExample: 'Baca panduannya',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    backToGallery: 'Semua contoh',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'Mulai Cepat — Deep Work Plan',
      description:
        'Pasang skill, onboard repositori Anda, lalu rencanakan dan eksekusi dengan agent mana pun — langkah yang membuat repositori spec-driven dan dapat dikemudikan agent.',
    },
    eyebrow: 'Mulai Cepat',
    title: 'Mulai dalam hitungan menit',
    intro:
      'Pasang skill, onboard repositori Anda, lalu rencanakan dan eksekusi dengan agent mana pun — langkah yang membuat repositori spec-driven dan dapat dikemudikan agent.',
    sequenceTitle: 'Jalur adopsi',
    codeLabel: 'Terminal',
    orLabel: 'atau',
    steps: [
      {
        title: 'Pasang skill Deep Work Plan',
        description:
          'Tambahkan skill ke repositori Anda — sebuah router ditambah delapan sub-skill (create, execute, refine, resume, status, verify, onboard, author). Gunakan Skills CLI untuk jalur tercepat, atau klona repo dan jalankan setup di tempat git dan shell tersedia.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Onboard repositori',
        description:
          'Jalankan sub-skill onboard dan biarkan agent bernalar tentang repo Anda yang sebenarnya. Ia menghasilkan AGENTS.md, basis pengetahuan docs/, dokumentasi per modul, dan rumah .agents/ lintas agent (dengan symlink .claude → .agents dan .cursor → .agents), menyambungkan command dwp-* yang tipis, dan menyiapkan .dwp/ yang di-gitignore.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Kembangkan kit dan terima addon',
        description:
          'Gunakan /skill-create dan /agent-create (sub-skill author) untuk menumbuhkan skill, agent, dan command yang sesuai stack. Onboarding memasang review lokal AI Diff Reviewer yang wajib (gerbang CI-nya tetap opsional) dan menawarkan empat addon opt-in — devcontainer, Dailybot, dependency-upgrade, dan design-system — yang Anda terima hanya ketika cocok.',
      },
      {
        title: 'Rencanakan dan eksekusi',
        description:
          'Hasilkan Deep Work Plan dan jalankan tugas demi tugas, validasi setiap gate dan lanjutkan lintas sesi — mengemudikan repositori terhadap spec-nya sendiri.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'Hasilnya',
    outcome:
      'Repositori Anda menjadi spec-driven dan dapat dikemudikan agent: rencana adalah sumber kebenaran yang tahan lama, dan repositori itu sendiri menjadi harness tempat agent mana pun bekerja.',
    nextStepsTitle: 'Langkah berikutnya',
    nextSteps: [
      { label: 'Baca metodologinya', href: '/methodology' },
      { label: 'Telusuri kit', href: '/kit' },
      { label: 'Lihat contoh', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — Jadikan repositori Anda AI-first',
      description:
        'Adopsi metodologi Deep Work Plan di repositori mana pun. Pasang skill, jalankan onboarding agent, lalu rencanakan dan eksekusi dengan AI coding agent mana pun.',
    },
    eyebrow: 'Adopsi',
    title: 'Jadikan repositori ini AI-first',
    intro:
      'Satu endpoint untuk mengubah repositori apa pun menjadi basis kode spec-driven yang siap agent. Pasang skill, biarkan agent meng-onboard repo, lalu rencanakan dan eksekusi pekerjaan terstruktur dengan coding agent mana pun.',
    handoffTitle: 'Salin ke agent Anda',
    handoffBody:
      'Salin prompt init.md lengkap dan tempelkan ke AI coding agent Anda — Claude Code, Cursor, Codex, atau lainnya. Ia membaca metodologi dan spesifikasi, memasang skill, dan meng-onboard repositori ini untuk Deep Work Plan.',
    handoffInstruction:
      'Baca dan ikuti instruksi di https://deepworkplan.com/init.md untuk menjadikan repositori ini AI-first.',
    handoffMdLabel: 'Prompt agent mandiri',
    codeLabel: 'agent',
    whatTitle: 'Apa yang dilakukannya',
    whatBody: [
      'Adopsi mengubah repositori dengan dua cara yang tahan lama — kedua pilar metodologi.',
      'Pertama, repositori menjadi spec-driven: pekerjaan dimulai dari rencana dan spesifikasi tertulis, bukan dari prompt dadakan. Kedua, repositori itu sendiri menjadi agent harness — AGENTS.md, basis pengetahuan docs/, dokumentasi per modul, dan rumah skill .agents/ (dengan symlink .claude → .agents dan .cursor → .agents) memberi setiap agent konteks dan command yang dibutuhkannya.',
    ],
    sequenceTitle: 'Urutan adopsi',
    orLabel: 'atau',
    steps: [
      {
        title: 'Verifikasi sebelum memasang',
        description:
          'Perlakukan prompt dan skill sebagai tidak tepercaya sampai Anda telah memeriksanya. Keduanya bersumber terbuka dan berlisensi MIT; skill berbasis Markdown tanpa panggilan jaringan dan tanpa telemetri. Setiap rilis menerbitkan SHA256SUMS atas skill yang dikirimkan, sehingga Anda dapat mengonfirmasi salinan Anda cocok sebelum menjalankannya. Rilis ber-checksum, bukan bertanda tangan (penandatanganan adalah langkah berikutnya yang terdokumentasi).',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'Pasang skill',
        description:
          'Tambahkan skill Deep Work Plan agar agent mana pun dapat merencanakan dan mengeksekusi pekerjaan terstruktur. Skill ini membawa sebuah router ditambah delapan sub-skill — create, execute, refine, resume, status, verify, onboard, dan author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Jalankan onboarding repositori',
        description:
          'Panggil sub-skill onboard dan biarkan agent bernalar tentang repo yang sebenarnya — stack, package manager, dan perintah validasi nyatanya. Ia kemudian menghasilkan AGENTS.md, basis pengetahuan docs/, dokumentasi per modul, dan rumah .agents/ lintas agent (dengan symlink .claude → .agents dan .cursor → .agents), menyambungkan command dwp-* yang tipis, dan menyiapkan .dwp/ yang di-gitignore untuk rencana dan draf. Untuk repo besar, sub-skill onboard menggunakan jalur berbasis rencana: menyelesaikan rekognisi, lalu menghasilkan Deep Work Plan onboarding. Tidak ada yang ditemplatkan; semuanya disesuaikan dengan repositori Anda.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Review lokal dan addon opt-in',
        description:
          'Onboarding memasang review lokal AI Diff Reviewer yang wajib (gerbang CI-nya tetap opsional) dan menawarkan empat addon opt-in — devcontainer, Dailybot, dependency-upgrade, dan design-system — yang Anda terima hanya ketika cocok. Sebuah repo sepenuhnya konforman dengan nol addon opsional. Gunakan /skill-create dan /agent-create (sub-skill author) untuk menumbuhkan skill, agent, dan command yang sesuai stack di luar baseline.',
      },
      {
        title: 'Rencanakan dan eksekusi',
        description:
          'Hasilkan Deep Work Plan dengan /dwp-create dan jalankan dengan /dwp-execute, lalu /dwp-status, /dwp-refine, /dwp-resume, dan /dwp-verify seiring pekerjaan berjalan. Setiap rencana membawa tugas bernomor, validation gate, dan completion protocol — diakhiri dengan tiga tugas akhir wajib: Security Review, Skills & Agents Discovery, dan Executive Report.',
      },
      {
        title: 'Verifikasi kepatuhan',
        description:
          'Jalankan /dwp-verify untuk laporan lulus/gagal yang objektif terhadap spesifikasi. Konfirmasi bahwa AGENTS.md, docs/ (dengan konten nyata, bukan stub), .agents/ (dengan delegator dwp-* yang tipis dan katalog yang sesuai dengan disk), .dwp/, dan tmp/ sudah pada tempatnya — tidak ada yang ditemplatkan, semuanya dinalar untuk repo ini.',
        commands: ['/dwp-verify'],
      },
    ],
    outcomeTitle: 'Hasilnya',
    outcome:
      'Repositori menjadi spec-driven dan repositori itu sendiri menjadi agent harness — konteks dan command ikut bersama kode.',
    nextStepsTitle: 'Baca selanjutnya',
    nextSteps: [
      { label: 'Mulai Cepat', href: '/quickstart' },
      { label: 'Metodologi', href: '/methodology' },
      { label: 'Spesifikasi', href: '/spec' },
      { label: 'Kit', href: '/kit' },
    ],
  },

  faqPage: {
    meta: {
      title: 'Frequently asked questions — Deep Work Plan',
      description:
        'Answers to the questions people ask about Deep Work Plan: what it does, how gates and resumption work, how it compares with other tools, and how to adopt it.',
    },
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    intro:
      'Short answers to what people ask most about Deep Work Plan, each with a link to the page that goes deeper.',
    groups: [
      {
        id: 'what',
        title: 'What Deep Work Plan is',
        items: [
          {
            id: 'what-is-it',
            question: 'What does Deep Work Plan actually do?',
            answer:
              'Deep Work Plan turns a repository into a structured environment where a coding agent can execute long work reliably. It installs as an agent skill, onboards the repository once (an `AGENTS.md` index, a `docs/` tree, a `.agents/` kit of skills and commands, a gitignored `.dwp/` output area), and from then on any goal becomes a plan: atomic tasks, each with acceptance criteria and a validation gate, executed one at a time, committed as they pass, and resumable from disk by any agent. The plan closes with a Final Review that audits security and validates the final state. The methodology is MIT-licensed and works with any coding agent that reads a repository.',
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: 'Who is it for?',
            answer:
              'Developers and teams who hand real, multi-step work to coding agents and want it to finish. It fits when a task spans more than one session, more than one file family, or more than one agent; when a teammate must be able to pick up where an agent stopped; or when "done" must mean "validated", not "the agent said so". A one-line fix does not need a plan, and the methodology says so: its proportional-rigor rule recommends an inline goal, criteria and gate instead.',
            linkLabel: 'Quickstart',
            linkPath: '/quickstart',
          },
          {
            id: 'is-it-a-tool',
            question: 'Is it a tool, a framework or a methodology?',
            answer:
              'A methodology packaged as an installable skill. There is no server, no account, no proprietary format and no runtime beyond the coding agent you already use. What gets installed is instructions the agent reads, a small set of shell scripts for context detection and conformance checking, and the conventions your repository adopts. Everything the plan produces is Markdown and JSON in your repository, readable without any tool.',
            linkLabel: 'Read the specification',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: 'Which coding agents does it work with?',
            answer:
              "Any agent that reads repository files. The skill follows the open Agent Skills standard and the `AGENTS.md` convention, so Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot and others pick it up through their normal skill and instruction loading. The methodology's own evaluation shows a plan started by one vendor's agent and resumed by another's in both directions. Installation coverage and behavioral evidence are listed per agent in the compatibility matrix, and the two are never conflated.",
            linkLabel: 'Browse the kit',
            linkPath: '/kit',
          },
        ],
      },
      {
        id: 'how',
        title: 'How a plan runs',
        items: [
          {
            id: 'gates',
            question:
              'How are the validation gates implemented? Do they need human sign-off?',
            answer:
              "They are executable assertions the agent runs itself. Human sign-off bookends the run: a person approves the plan before execution and reviews the final diff at pull-request time; execution in between is autonomous. Every task names concrete commands, typically the repository's own quality gate, selected from the task's touched surface: the tests of the changed behavior and its consumers, widening to the full suite when the change is shared or cannot be bounded. A task is marked done only when those commands exit successfully, and tasks that change behavior must extend the tests. On failure the task is marked blocked and the agent stops.",
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              'How does the plan avoid going stale when people change the code between runs?',
            answer:
              'On three fronts. Tasks are written as behavior, not edits: an acceptance criterion says what the system must do, so a renamed file or a swapped implementation does not invalidate it. Every gate re-runs against the repository as it is now, so a broken assumption fails loudly at the next run instead of drifting silently, and that failure is the cue to refine. And keeping documentation in sync is part of the work: a task that changes behavior also updates the docs and the agent-facing kit that describe it, inside its own gate. Every run should leave the repository more agent-ready than it found it.',
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              'Can I change the plan mid-run without losing completed work?',
            answer:
              'Yes; refining a partially executed plan is a first-class move. Task definitions and execution state are kept separate: the plan is a checklist on disk plus a small state file, so what is done stays recorded independently of the task text. When a task turns out to be wrong, the agent marks it blocked and stops rather than pushing through. You then edit, reorder, split or drop the tasks that have not run, while completed tasks stay completed. Resuming rebuilds state from disk and the actual repository and re-runs the gates that matter, so nothing that shifted underneath slips by.',
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              'Does it keep checking the work against the plan, or is the plan an upfront thing?',
            answer:
              'The plan is a continuous check. The agent works one small task at a time and must validate before moving on, so it can wander one step, not three. Every task carries acceptance criteria plus the exact commands that prove them, and progress is written into the repository as it goes, with a status per task, so drift becomes visible to you, to the next session and to the next agent. A plan is not finished until everything validates, including the Final Review. The honest caveat: the methodology cannot stop an agent from writing a weak acceptance criterion in the first place; it makes drift loud instead of silent.',
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              'Is the plan generated once and maintained by hand, or does it evolve with the code?',
            answer:
              "Neither. It is generated once from a goal and then maintained as part of the work. The plan is deliberately not rewritten from code diffs, because a spec that chases the code becomes a lagging mirror, which is the drift the methodology exists to kill. It evolves on purpose: gates re-run against the current repository, a failing gate triggers a refinement, and the agent performs that refinement during the run while you approve up front and review at the end. Documentation and tests evolve alongside the code by construction, because updating them is inside each task's gate.",
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: 'What happens if the session dies halfway?',
            answer:
              "Progress lives on disk, not in the chat. The README checkboxes, each task's log, a bounded working index and a machine-readable state file are updated at every task boundary, and the state file records a checkpoint before any planned pause. A fresh session, or a different agent, reads that compact index, reconciles it with the repository and git history, and continues at the first incomplete task without redoing finished work. Even an interrupted plan creation is recoverable: the plan's identity and intended task list are written before any task file, so a half-created plan can be completed or discarded rather than guessed at.",
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'What is the Final Review?',
            answer:
              "The single mandatory closing task of every plan. In order: a security pass over the plan's full accumulated change set, including a required local review of the diff by the AI Diff Reviewer skill, with critical findings blocking completion until fixed or explicitly accepted; final-state validation, meaning the repository's complete applicable test, lint, type-check and format suites on the final code; and a reconciliation of the skills decisions each task recorded. The agent then reports deliverables, evidence and limitations, and offers an Executive Report once, generating it only if you ask.",
            linkLabel: 'The specification',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'compare',
        title: 'How it compares',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              'How is it different from spec-driven tools such as Spec Kit, OpenSpec or Kiro?',
            answer:
              "They solve adjacent problems. Spec-driven tools are excellent at capturing what should change: specifications, requirements and change proposals in a repeatable shape. Deep Work Plan is about how an agent executes for hours without drifting: the onboarded harness, per-task validation gates selected from the touched surface, on-disk resumable state, a mandatory Final Review with a security pass, and a conformance checker for the repository itself. The two can be combined, with a spec or change proposal feeding a plan. The comparison page lays the capabilities side by side, on each tool's own terms.",
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'How is it different from agent workflow frameworks such as BMAD, Superpowers or Get Shit Done?',
            answer:
              'Those frameworks bring strong working styles: roles, principles, test-first steps, verification habits. Deep Work Plan focuses on what stays in the repository and what can be checked: a harness any agent reads cold, task files with acceptance criteria and gates, state that survives a session, a conformance checker with a CI-friendly exit code, and a published measurement of how many instruction bytes each flow loads. It is tool-agnostic by construction and adds no service, provider or secret to the core loop. The comparison page shows where each approach is built in, optional or out of scope.',
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question: "Why not just use my agent's built-in plan mode?",
            answer:
              "Built-in plan modes are useful and Deep Work Plan builds on the same substrate, the `AGENTS.md` convention and the open Agent Skills standard. The difference is where the plan lives and what enforces it. Native plans usually live outside the repository and expire with the session; Deep Work Plan writes the plan, its state and its evidence into the repository, so another agent or a teammate can continue it, and every task carries an executable gate and a recorded log. You keep using your agent's plan mode for thinking; the methodology adds the durable, verifiable execution loop.",
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'Adopting it',
        items: [
          {
            id: 'install',
            question:
              'What does onboarding write into my repository, and does it touch existing files?',
            answer:
              'Onboarding is non-destructive: it detects an existing `AGENTS.md`, `docs/`, `.agents/` or `CLAUDE.md`, reconciles rather than overwrites, and asks before replacing anything. It writes the `AGENTS.md` index with real commands, a reasoned `docs/` tree, per-module docs, the `.agents/` kit with thin `dwp-*` commands, a gitignored `.dwp/` output area, a verified testing map, and the required local code review (the AI Diff Reviewer skill plus a repo-tailored review extension). It then runs a self-check and the conformance checker so you can see what was produced. A repository onboarded under an earlier version gets a targeted upgrade that changes only what is missing.',
            linkLabel: 'The adoption endpoint',
            linkPath: '/init',
          },
          {
            id: 'cost',
            question: 'What does it cost, and how is efficiency measured?',
            answer:
              'The methodology and the skill are MIT-licensed and free; there is no service, no API key and no telemetry in the core flows. Efficiency is reported as the number of instruction bytes each flow loads, measured by a script committed with the skill and published in an evaluation ledger, with increases reported as plainly as decreases. It is not reported as token percentages or cost savings, because a byte inventory does not establish those; a pre-registered public evaluation is planned to measure outcomes properly.',
            linkLabel: 'Trust and disclosure',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: 'Still have a question?',
      body: 'Open a discussion or an issue on GitHub. Questions that come up repeatedly are added to this page.',
      ctaLabel: 'Ask on GitHub',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan compared with the alternatives — Deep Work Plan',
      description:
        'How Deep Work Plan relates to spec-driven tools, agent workflow frameworks and vendor plan modes: each on its own terms, with sources and a review date.',
    },
    eyebrow: 'Compare',
    title: 'Deep Work Plan and the alternatives',
    intro:
      'Pick the right layer for your situation. Each alternative is described on its own terms, every fact traces to its official documentation, and the page says when it was last reviewed. This is a map, not a ranking.',
    howToRead: {
      title: 'How to read this page',
      body: 'Three values describe each capability. They say where a capability lives in a tool, not how good the tool is.',
      values: {
        builtIn: 'Built in',
        optional: 'Optional or via extension',
        notInScope: 'Not in scope',
      },
    },
    reviewedOnLabel: 'Last reviewed',
    alternativesTitle: 'The alternatives, on their own terms',
    officialSiteLabel: 'Official site',
    categories: {
      methodology: 'Methodology',
      sdd: 'Spec-driven development tools',
      agentFramework: 'Agent workflow frameworks',
      vendorNative: 'Vendor-native plan modes',
    },
    matrix: {
      title: 'Capability matrix',
      caption:
        'Where each capability lives, per tool. Built in, optional or via extension, or not in scope. Reviewed against official documentation.',
      capabilityColumn: 'Capability',
    },
    capabilities: {
      toolAgnostic: {
        label: 'Works with any coding agent',
        help: 'The same repository files drive Claude Code, Codex, Cursor, Gemini CLI and others.',
      },
      repoNativeHarness: {
        label: 'Writes the agent harness into the repository',
        help: "Instructions, docs, skills and commands live in the repository, not in one tool's settings.",
      },
      taskAcceptanceCriteria: {
        label: 'Acceptance criteria per task',
        help: 'Each task states observable conditions for being done.',
      },
      perTaskGates: {
        label: 'Validation gate per task',
        help: 'Each task names the commands that must pass, selected from what it touched.',
      },
      resumableState: {
        label: 'Resumable state on disk',
        help: 'Progress survives a session reset and can be picked up by another agent or a teammate.',
      },
      finalReview: {
        label: 'Mandatory closing review with a security pass',
        help: 'The plan cannot complete without a security review of the full change set and validation of the final state.',
      },
      conformanceChecker: {
        label: 'Executable conformance checker',
        help: 'A script verifies the repository and its plans against the standard, with a CI-friendly exit code.',
      },
      instructionBudgetLedger: {
        label: 'Published instruction-load measurement',
        help: 'The bytes each flow loads are measured by a committed script and published with their limits.',
      },
      onboardingScaffold: {
        label: 'Onboarding that scaffolds documentation',
        help: "A first run writes the repository's agent-facing documentation and kit.",
      },
      brownfieldSpecs: {
        label: 'Living specs for existing systems',
        help: 'Changes are specified as deltas that merge into a growing specification of the system.',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'Installs as a skill, onboards the repository into an agent harness and runs long-horizon plans with per-task validation gates, on-disk state and a mandatory Final Review.',
        audience:
          'Developers and teams who hand multi-session work to any coding agent and need it to finish verified.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'Turns a feature into an executable specification through a constitution, a spec, a plan and a task list, driven by slash commands that integrate with more than fifty coding agents.',
        audience:
          'Teams that want a repeatable specify, plan, tasks and implement workflow inside the agent they already use.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Captures each change as a proposal with delta specs (added, modified, removed) and RFC 2119 requirements with scenarios, then archives them into living specifications.',
        audience:
          'Teams working on existing systems who want specifications to grow one change at a time.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'An agentic IDE and CLI whose specs move from EARS-style requirements to design to tasks, with steering files and hooks that run on editor events.',
        audience:
          'Developers who want spec-driven development built into their editor with AWS-backed tooling.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'An agile framework of specialized agent roles (analysis, product, architecture, development, quality) that produces briefs, requirements, architecture documents and story files.',
        audience:
          'Teams that like role-based ceremonies and want a full agile lifecycle for agent work.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'A skills library and workflow for brainstorming, planning in small test-first steps, executing with subagents and reviewing before completion.',
        audience:
          'Developers who want disciplined test-driven execution inside their coding agent.',
      },
      'get-shit-done': {
        name: 'Get Shit Done',
        whatItDoesWell:
          'A planning system with a .planning directory, requirement ids, phase plans, fresh-context execution and a verification pass against stated must-haves.',
        audience:
          'Solo developers and small teams who want context engineering and verification with little ceremony.',
      },
      'vendor-native': {
        name: 'Vendor-native plan modes',
        whatItDoesWell:
          'Claude Code, Codex, Cursor and Gemini CLI ship plan modes, instruction files and skills that follow the AGENTS.md and Agent Skills standards.',
        audience:
          'Anyone who wants planning inside a single agent without adopting a methodology.',
      },
    },
    dwpStrengths: {
      title: 'What Deep Work Plan brings',
      items: [
        {
          title: 'Tool-agnostic and repository-native',
          body: 'The harness and the plan are files in your repository, read by any agent that follows the AGENTS.md and Agent Skills standards. Switching agents does not lose the plan.',
        },
        {
          title: 'Validation selected from what each task touched',
          body: 'Every task declares its touched surface and runs the tests of the changed behavior and its consumers, widening to the full suite when the impact cannot be bounded. Zero selected tests is never a pass.',
        },
        {
          title: 'One Final Review with a security pass',
          body: 'A plan closes with a security review of the accumulated change set, including a required local review of the diff, and a validation of the final state. Critical findings block completion.',
        },
        {
          title: 'State that survives sessions and agents',
          body: 'README checkboxes, task logs, a bounded working index and a machine-readable state file are written at every boundary, so another session or another agent continues from disk. Even an interrupted plan creation is recoverable.',
        },
        {
          title: 'A conformance checker for the repository itself',
          body: 'A read-only script verifies the harness and every plan against the specification, understands both plan lifecycles and exits with a CI-friendly code.',
        },
        {
          title: 'Instruction load measured and published',
          body: 'A committed script measures how many bytes each flow loads; the results, including the increases, are published as bytes, never as token or cost percentages.',
        },
      ],
    },
    honestLimits: {
      title: 'Honest limits',
      body: 'Deep Work Plan has no living or delta specification mechanism; OpenSpec and similar tools are stronger there. No independent benchmark of the methodology exists yet; a pre-registered public evaluation is planned. The instruction-load ledger measures bytes loaded, not tokens, cost or outcomes.',
    },
    correction: {
      title: 'Help us keep this accurate',
      body: 'This page is reviewed on the date shown and corrected on request. If a description of your tool is out of date or incomplete, open an issue and we will fix it.',
      ctaLabel: 'Open an issue',
    },
    sourcesTitle: 'Sources',
  },

  trustPage: {
    meta: {
      title: 'Kepercayaan dan keamanan',
      description:
        'Mengapa Deep Work Plan aman untuk diadopsi: sumber terbuka dan berlisensi MIT, Markdown-first tanpa panggilan jaringan atau telemetri, non-destruktif berdasarkan desain, dengan instalasi yang dapat diverifikasi dan kebijakan pengungkapan kerentanan yang jelas.',
    },
    eyebrow: 'Kepercayaan & keamanan',
    title: 'Kepercayaan dan keamanan',
    intro:
      'Tidak ada yang harus memasang skill yang tidak bisa dipercaya. Deep Work Plan dibangun untuk diverifikasi, bukan diterima begitu saja: sumber terbuka, Markdown-first, non-destruktif, dan dapat diperiksa sebelum Anda menjalankannya. Halaman ini menyatakan dengan jelas apa yang dilakukannya, apa yang tidak dilakukannya, dan cara mengonfirmasi keduanya.',
    pillarsTitle: 'Apa yang Anda percayai',
    pillars: [
      {
        title: 'Sumber terbuka dan berlisensi MIT',
        body: 'Situs web dan skill keduanya publik dan dapat dibandingkan. Anda dapat membaca setiap baris sebelum menjalankannya, dan membandingkan salinan mana pun terhadap sumber pada rilis bertag.',
      },
      {
        title: 'Markdown-first — tanpa jaringan, tanpa telemetri',
        body: 'Skill tidak memiliki CLI, tidak ada HTTP API, dan tidak ada alur autentikasi. Ia tidak melakukan panggilan jaringan dan tidak mengirim telemetri; satu-satunya helper lokalnya membaca metadata git dan lingkungan. Tidak ada yang berkaitan dengan repositori Anda yang meninggalkan mesin Anda.',
      },
      {
        title: 'Non-destruktif berdasarkan desain',
        body: 'Satu-satunya tindakan yang relevan dari segi keamanan yang dilakukan skill adalah mengubah repositori Anda — dan ia merekonsiliasi alih-alih menimpa. Ia mendeteksi apa yang ada, mengusulkan rencana, dan bertanya sebelum mengganti apa pun. Keluaran rencana berada di direktori .dwp/ yang di-gitignore.',
      },
      {
        title: 'Tidak menyentuh rahasia',
        body: 'Metodologi tidak pernah melakukan commit rahasia dan menjaga status pekerjaan di luar kontrol versi. Onboarding menambahkan ke .gitignore alih-alih menulisnya ulang, dan setiap perubahan dimaksudkan untuk ditinjau dalam diff kecil yang mudah dibaca.',
      },
      {
        title: 'Asal-usul yang dapat diverifikasi',
        body: 'Setiap rilis menerbitkan checksum atas skill yang dikirimkan, sehingga Anda dapat mengonfirmasi bahwa salinan yang diunduh cocok dengan yang diterbitkan sebelum Anda mempercayainya.',
      },
    ],
    verifyTitle: 'Verifikasi sebelum menjalankan',
    verifyIntro:
      'Perlakukan skill sebagai tidak tepercaya sampai Anda telah memeriksanya. Setiap rilis melampirkan file SHA256SUMS yang mencakup skill yang dikirimkan. Unduh untuk versi yang ingin Anda pasang, lalu verifikasi bahwa salinan Anda cocok — keluaran non-zero berarti sebuah file tidak cocok dan Anda harus berhenti.',
    codeLabel: 'shell',
    verifyNote:
      'Rilis ber-checksum, bukan ditandatangani — penandatanganan (cosign atau GPG pengelola) adalah langkah berikutnya yang terdokumentasi, bukan klaim saat ini. Karena semuanya terbuka, Anda juga dapat membandingkan file mana pun terhadap repositori pada tag-nya.',
    disclosureTitle: 'Laporkan kerentanan',
    disclosureBody:
      'Menemukan masalah keamanan? Laporkan secara pribadi melalui pelaporan kerentanan privat GitHub di repositori yang relevan — skill atau situs web (lihat tautan kebijakan keamanan di bawah) — daripada membuka issue publik yang akan mengekspos masalah sebelum ada perbaikan.',
    resourcesTitle: 'Sumber daya kepercayaan',
    linkManifest: 'Manifes kepercayaan yang dapat dibaca mesin',
    linkSecurityTxt: 'security.txt (RFC 9116)',
    linkPolicy: 'Kebijakan keamanan situs web',
    linkSkillPolicy: 'Kebijakan keamanan skill & model ancaman',
    limitationsTitle: 'Keterbatasan yang jujur',
    limitations: [
      'Rilis ber-checksum, belum ditandatangani secara kriptografis — penandatanganan direncanakan, belum dilakukan.',
      'Deep Work Plan menjalankan coding agent otonom terhadap repositori Anda. Tinjau rencana yang diusulkannya dan diff-nya; metodologi dirancang untuk tinjauan itu, bukan untuk menggantikannya.',
      'Klaim kepercayaan di sini hanya mendeskripsikan sumber resmi. Salinan yang dimodifikasi atau pihak ketiga yang telah menyimpang dari repositori tidak membawa satu pun dari jaminan ini — verifikasi dulu.',
    ],
    ctaTitle: 'Adopsi dengan penuh keyakinan',
    ctaBody:
      'Baca metodologi dan spesifikasinya, arahkan agent ke endpoint init, dan verifikasi instalasi sebelum Anda menjalankannya.',
    ctaPrimary: 'Baca metodologinya',
    ctaSecondary: 'Adopsi (init)',
  },

  // Developers — agent & developer surface
  developersPage: {
    meta: {
      title:
        'Pengembang — API agent, server MCP, dan dokumentasi Deep Work Plan',
      description:
        'Permukaan agent Deep Work Plan: API read-only tanpa autentikasi, spesifikasi OpenAPI, server MCP di /api/mcp, Markdown 17 bahasa, dan CLI npx skills.',
    },
    eyebrow: 'Permukaan agent & pengembang',
    title: 'Deep Work Plan untuk pengembang dan agent AI',
    intro:
      'deepworkplan.com menghadirkan permukaan yang dapat dibaca mesin di samping halamannya: API agent yang dideskripsikan OpenAPI, server MCP stateless, mirror Markdown native untuk setiap halaman dalam 17 bahasa, dan skill DWP yang dapat dipasang. Semua di halaman ini live, publik, dan gratis — tidak ada yang perlu didaftarkan.',
    accessTitle: 'Tanpa autentikasi secara desain',
    accessIntro:
      'Tidak ada kunci API untuk dibuat, tidak ada alur OAuth, dan tidak ada sandbox yang terpisah dari produksi — permukaan produksi itu sendirilah sandbox-nya. Ini adalah properti metodologi yang disengaja: agent tidak bisa mengisi formulir "hubungi sales", jadi situs ini tidak pernah memintanya.',
    accessPoints: [
      {
        title: 'Read-only',
        body: 'Setiap operasi adalah GET yang aman dan dapat di-cache — kecuali endpoint MCP, yang merupakan POST. Tidak ada operasi tulis, unggahan, atau perubahan status di mana pun.',
      },
      {
        title: 'Tanpa kunci API',
        body: 'Tidak ada registrasi, tidak ada token, tidak ada tingkat rate limit. Akses anonim adalah kontrak terdokumentasi, dinyatakan di /auth.md dan stub penemuan OAuth.',
      },
      {
        title: 'Gratis & open source',
        body: 'Konten situs dan skill DWP berlisensi MIT. Gunakan dalam pekerjaan komersial dan non-komersial tanpa perlu meminta izin.',
      },
      {
        title: 'Machine-first',
        body: 'Error JSON terstruktur pada path /api, body pemulihan 404 Markdown, katalog API RFC 9727, dan manifest kapabilitas ARD — dibangun untuk konsumsi agent.',
      },
    ],
    endpointsTitle: 'Endpoint',
    endpointsIntro:
      'Endpoint inti dari API agent. Spesifikasi lengkap dan bertipe — setiap operasi, parameter, dan skema respons — berada di dokumen OpenAPI.',
    endpointsNote:
      'Path /api/* yang tidak dikenal mengembalikan error JSON terstruktur dengan petunjuk resolusi, bukan halaman error HTML.',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: 'Spesifikasi OpenAPI 3.1 dari seluruh API agent.',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          'Indeks panduan LLM terkurasi — titik masuk yang direkomendasikan untuk agent.',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          'Prompt adopsi DWP kanonik (jadikan repositori apa pun AI-first).',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          'Halaman apa pun sebagai Markdown sumber native — dalam semua 17 bahasa (mis. /es/developers.md).',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description:
          'Penanda health statis dengan link ke spesifikasi dan portal ini.',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'Server MCP (Streamable HTTP, stateless): initialize, ping, tools/list, tools/call.',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description:
          'Manifest kapabilitas ARD — agentmap yang dinyatakan di robots.txt.',
      },
    ],
    mcpTitle: 'Server MCP',
    mcpIntro:
      'Server Model Context Protocol stateless melalui Streamable HTTP. Tiga tool read-only: get_init_prompt, list_site_sections, dan read_page. Versi protokol 2025-03-26 dan 2025-06-18 didukung; tidak ada sesi yang diperlukan.',
    mcpCodeLabel: 'Terminal — JSON-RPC over HTTP',
    mcpNote:
      'Manifest MCP berada di /.well-known/mcp.json dan kartu server di /.well-known/mcp/server-card.json. Claude, ChatGPT, dan klien MCP apa pun dapat memanggil tool ini secara native.',
    markdownTitle: 'Markdown untuk agent',
    markdownIntro:
      'Setiap halaman yang dirender diterbitkan sebagai Markdown sumber native — bukan konversi HTML. Minta Markdown secara eksplisit dengan sufiks URL atau melalui negosiasi konten HTTP di halaman mana pun.',
    markdownCodeLabel: 'Terminal — negosiasi konten',
    markdownNote:
      'Negosiasi konten mengembalikan Markdown sumber yang sama dengan yang dirender situs, dalam bahasa URL yang Anda minta.',
    cliTitle: 'Pasang kit',
    cliIntro:
      'Jalur instalasi resmi untuk skill Deep Work Plan — perintah yang sama dengan yang diberikan endpoint /init kepada agent. Bekerja dengan coding agent apa pun yang kompatibel dengan skills (Claude Code, Cursor, Codex, Gemini, dan lainnya).',
    cliCodeLabel: 'Terminal — skills CLI',
    cliNote:
      'Skill di-vendor ke .agents/skills/deepworkplan/ di dalam repositori Anda, sehingga setiap agent yang menyentuh repo berbagi metodologi yang sama.',
    resourcesTitle: 'Sumber daya yang dapat dibaca mesin',
    resources: [
      {
        label: 'Spesifikasi OpenAPI (/openapi.json)',
        href: '/openapi.json',
      },
      {
        label: 'Deklarasi akses & autentikasi agent (/auth.md)',
        href: '/auth.md',
      },
      {
        label: 'Katalog API, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'Manifest MCP (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'Kontak keamanan (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'Deskriptor repo situs (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'Arahkan sebuah agent ke sini',
    ctaBody:
      'Jalur tercepat tetap satu baris: berikan prompt /init kepada coding agent mana pun dan ia memasang skill, onboarding repositori Anda, dan mulai menyelesaikan deep work.',
    ctaPrimary: 'Buka prompt /init',
    ctaSecondary: 'Baca metodologinya',
  },

  // Privacy policy
  privacyPage: {
    meta: {
      title: 'Privasi — Deep Work Plan',
      description:
        'Kebijakan privasi deepworkplan.com: situs statis tanpa akun dan iklan, analitik tanpa cookie, serta penjelasan lugas data apa yang dikumpulkan formulir kontak.',
    },
    eyebrow: 'Kebijakan privasi',
    title: 'Privasi di deepworkplan.com',
    intro:
      'Deep Work Plan adalah situs dokumentasi dan metodologi statis. Halaman ini menjelaskan, secara lugas dan lengkap, data apa yang disentuh situs saat Anda berkunjung: tidak ada sistem akun, tidak ada iklan, dan tidak ada pelacakan lintas situs di dalamnya.',
    lastUpdated: '8 September 2026',
    sections: [
      {
        heading: 'Apa situs ini',
        body: 'deepworkplan.com adalah kumpulan halaman statis yang dilayani melalui CDN. Tidak ada login, tidak ada basis data pengguna, dan tidak ada cara bagi situs untuk menyimpan profil pribadi. Konten dikembangkan di repositori GitHub publik di bawah organisasi DailybotHQ, dan semua yang Anda baca di sini disajikan persis seperti yang dibangun.',
      },
      {
        heading: 'Analitik',
        body: 'Situs menggunakan Umami, layanan analitik tanpa cookie yang mengutamakan privasi, untuk menghitung tampilan halaman secara agregat. Umami tidak menetapkan cookie pelacakan dan tidak membangun profil lintas situs. Karena crawler AI tidak menjalankan JavaScript, sebuah edge function sisi server juga mencatat user agent dan path kunjungan bot otomatis sebagai peristiwa analitik anonim — ini mengidentifikasi perangkat lunak crawler (misalnya "GPTBot mengunjungi /init"), bukan pengunjung manusia.',
      },
      {
        heading: 'Cookie dan penyimpanan lokal',
        body: 'Situs tidak menetapkan cookie pelacakan. Satu-satunya hal yang disimpan di browser Anda adalah preferensi tema (mode terang atau gelap) yang disimpan di localStorage, yang tidak pernah meninggalkan perangkat Anda dan tidak dikirim ke mana pun. Jika Anda menghapus penyimpanan browser, situs cukup kembali ke tema bawaan sistem Anda.',
      },
      {
        heading: 'Layanan pihak ketiga',
        body: 'Hosting dan pengiriman berjalan di Cloudflare Pages, yang memproses log permintaan dan alamat IP di edge sebagai bagian dari mengoperasikan CDN dan memblokir penyalahgunaan, di bawah kebijakan privasi Cloudflare sendiri. Analitik agregat berjalan di Umami (cloud.umami.is). Jika Anda mengirimkan formulir kontak secara sukarela, jawaban Anda dikirim melalui Google Forms ke tim kami — itu satu-satunya tempat informasi yang Anda ketik dikumpulkan, dan hanya digunakan untuk membalas Anda.',
      },
      {
        heading: 'Yang tidak kami lakukan',
        body: 'Kami tidak menjual atau membagikan data pribadi, tidak menjalankan iklan atau piksel remarketing, tidak melakukan fingerprinting browser, dan tidak mengirim email pemasaran. Situs ini tidak memiliki pendaftaran buletin dan tidak ada telemetri di luar hitungan agregat tanpa cookie yang dijelaskan di atas.',
      },
      {
        heading: 'Pilihan Anda',
        body: 'Karena analitik di sini agregat dan tanpa cookie, tidak ada profil pribadi untuk diekspor atau dihapus. Anda dapat memblokir skrip analitik dengan pemblokir konten apa pun tanpa memengaruhi cara kerja situs. Jika Anda telah mengirimkan formulir kontak dan ingin pesan Anda dihapus, tulislah ke alamat kontak di bawah dan kami akan menghapusnya.',
      },
      {
        heading: 'Perubahan kebijakan ini',
        body: 'Jika kebijakan ini berubah secara material, tanggal pembaruan di bagian atas halaman ini ikut berubah, dan penyuntingan substantif di-commit ke repositori situs web publik tempat siapa pun dapat meninjau riwayatnya.',
      },
    ],
    contactTitle: 'Kontak dan keamanan',
    contactBody:
      'Untuk pertanyaan privasi, tulis ke security@dailybot.com. Untuk melaporkan kerentanan keamanan, gunakan pelaporan kerentanan privat GitHub untuk repositori situs web dan skill — lihat /.well-known/security.txt untuk alamat persisnya.',
  },
};
