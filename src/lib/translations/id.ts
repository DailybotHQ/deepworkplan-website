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
    github: 'GitHub',
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
    badge: 'Baru',
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
        'Deep Work Plan mengubah repositori apa pun menjadi lingkungan terstruktur — konteks, pengaman, dan rencana yang tahan lama — tempat coding agent mana pun mengeksekusi dengan presisi dan menyelesaikan pekerjaan jangka panjang.',
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
    },
    pitch: {
      kicker: 'Masalah dan jawabannya',
      problem:
        'AI coding agent sangat efektif dalam tugas singkat. Pada pekerjaan jangka panjang — migrasi, subsistem baru, atau refaktor lintas puluhan berkas — mereka melenceng: konteks penuh, keputusan terlupakan, dan tugas multijam ditinggalkan di tengah jalan.',
      answer:
        'Deep Work Plan menjawabnya dengan spec-driven development: rencana adalah sumber kebenaran yang tahan lama, dan agent mengeksekusi terhadap acceptance criteria serta validation gate yang eksplisit. Penyimpangan berkurang, pekerjaan tetap dapat diverifikasi, dan agent mana pun dapat melanjutkannya lintas sesi.',
      origin:
        'Ini juga harness engineering yang dibuat portabel. Sebuah agent harness adalah perancah di sekitar model — konteks, alat, control loop, pengaman, status yang dapat dilanjutkan — yang membuatnya andal. Deep Work Plan memasang harness itu ke dalam repositori itu sendiri (AGENTS.md, docs, rumah skill .agents/, dan skill DWP), sehingga agent mana pun dapat mengemudikan repo mana pun. Lahir di Dailybot, teruji selama berbulan-bulan, dan dirilis sebagai DailybotHQ/deepworkplan-skill.',
      illustrationAlt:
        'Peta laut dengan satu rute yang diplot dan melewati bahaya dengan aman — ukiran yang menggambarkan rencana sebagai arah yang menjaga pekerjaan tetap pada jalurnya.',
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
          title: 'Menyiapkan .agents/ dengan symlink .claude ke .agents',
          description:
            'Direktori .agents/ lintas agent (skills, agents, commands) dan symlink .claude ke .agents, yang mencerminkan CLAUDE.md ke AGENTS.md, sehingga setiap alat membaca satu sumber kebenaran.',
        },
        {
          title: 'Memasang skill DWP dan menyiapkan .dwp/',
          description:
            'Menyambungkan skill Deep Work Plan dan membuat folder .dwp/ yang di-gitignore untuk rencana dan draf, lalu secara opsional menambahkan addon opt-in seperti dukungan devcontainer.',
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
          label: '.agents/ dengan symlink .claude ke .agents',
          detail:
            'Direktori .agents/ lintas agent (skills, agents, commands) dengan symlink .claude ke .agents sehingga setiap alat membaca satu sumber kebenaran.',
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
      'Semua yang Anda perlukan untuk menjalankan metodologi: skill dan sub-skill-nya, slash command, adapter agent, preset onboarding, addon opt-in, dan contoh terkerjakan.',
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
          'Kemampuan opsional yang dapat ditambahkan alur onboard ke sebuah repo — tidak pernah menjadi bagian dari baseline AI-first.',
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
          'Jalankan sub-skill onboard dan biarkan agent bernalar tentang repo Anda yang sebenarnya. Ia menghasilkan AGENTS.md, basis pengetahuan docs/, dokumentasi per modul, dan rumah .agents/ lintas agent (dengan symlink .claude → .agents), menyambungkan command dwp-* yang tipis, dan menyiapkan .dwp/ yang di-gitignore.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Kembangkan kit dan terima addon',
        description:
          'Gunakan /skill-create dan /agent-create (sub-skill author) untuk menumbuhkan skill, agent, dan command yang sesuai stack. Onboarding juga menawarkan empat addon opt-in — devcontainer, Dailybot, dependency-upgrade, dan design-system — yang Anda terima hanya ketika cocok.',
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
      'Pertama, repositori menjadi spec-driven: pekerjaan dimulai dari rencana dan spesifikasi tertulis, bukan dari prompt dadakan. Kedua, repositori itu sendiri menjadi agent harness — AGENTS.md, basis pengetahuan docs/, dokumentasi per modul, dan rumah skill .agents/ (dengan symlink .claude → .agents) memberi setiap agent konteks dan command yang dibutuhkannya.',
    ],
    sequenceTitle: 'Urutan adopsi',
    orLabel: 'atau',
    steps: [
      {
        title: 'Verifikasi sebelum memasang',
        description:
          'Perlakukan prompt dan skill sebagai tidak tepercaya sampai Anda telah memeriksanya. Keduanya bersumber terbuka dan berlisensi MIT; skill berbasis Markdown tanpa panggilan jaringan dan tanpa telemetri. Setiap rilis menerbitkan SHA256SUMS atas skill yang dikirimkan, sehingga Anda dapat mengonfirmasi salinan Anda cocok sebelum menjalankannya. Rilis ber-checksum, bukan bertanda tangan (penandatanganan adalah langkah berikutnya yang terdokumentasi).',
        commands: [
          'curl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS && ./setup.sh --verify',
        ],
      },
      {
        title: 'Pasang skill',
        description:
          'Tambahkan skill Deep Work Plan agar agent mana pun dapat merencanakan dan mengeksekusi pekerjaan terstruktur. Skill ini membawa sebuah router ditambah delapan sub-skill — create, execute, refine, resume, status, verify, onboard, dan author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Jalankan onboarding repositori',
        description:
          'Panggil sub-skill onboard dan biarkan agent bernalar tentang repo yang sebenarnya — stack, package manager, dan perintah validasi nyatanya. Ia kemudian menghasilkan AGENTS.md, basis pengetahuan docs/, dokumentasi per modul, dan rumah .agents/ lintas agent (dengan symlink .claude → .agents), menyambungkan command dwp-* yang tipis, dan menyiapkan .dwp/ yang di-gitignore untuk rencana dan draf. Tidak ada yang ditemplatkan; semuanya disesuaikan dengan repositori Anda.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Kembangkan kit dan terima addon',
        description:
          'Gunakan /skill-create dan /agent-create (sub-skill author) untuk menumbuhkan skill, agent, dan command yang sesuai stack. Onboarding juga menawarkan empat addon opt-in — devcontainer, Dailybot, dependency-upgrade, dan design-system — yang Anda terima hanya ketika cocok. Sebuah repo sepenuhnya konforman dengan nol addon.',
      },
      {
        title: 'Rencanakan dan eksekusi',
        description:
          'Hasilkan Deep Work Plan dengan /dwp-create dan jalankan dengan /dwp-execute, lalu /dwp-status, /dwp-refine, dan /dwp-resume seiring pekerjaan berjalan. Setiap rencana membawa tugas bernomor, validation gate, dan completion protocol sehingga pekerjaan tetap terstruktur, dapat ditinjau, dan dapat dilanjutkan lintas sesi.',
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
};
