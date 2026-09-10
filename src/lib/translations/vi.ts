/**
 * vi translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const vi: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull:
    'Deep Work Plan — thực thi có cấu trúc cho các agent lập trình AI',
  siteDescription:
    'Deep Work Plan: một phương pháp luận mở và bộ kit tham chiếu để các agent AI thực thi nhiều giờ một cách có cấu trúc, được kiểm chứng và có thể tiếp tục.',

  // Navigation
  nav: {
    home: 'Trang chủ',
    about: 'Giới thiệu',
    contact: 'Liên hệ',
    // Deep Work Plan IA
    methodology: 'Phương pháp luận',
    spec: 'Đặc tả',
    kit: 'Kit',
    examples: 'Ví dụ',
    init: 'Init',
    quickstart: 'Khởi động nhanh',
    trust: 'Tin tưởng',
    developers: 'Nhà phát triển',
    privacy: 'Quyền riêng tư',
    github: 'GitHub',
    faq: 'FAQ',
    compare: 'Compare',
    resources: 'Resources',
    resourcesDesc: 'Examples, comparison, FAQ and trust',
    repo: {
      label: 'Mã nguồn',
      website: 'Kho lưu trữ trang web',
      websiteDesc: 'Trang web này',
      skill: 'Kho lưu trữ skill',
      skillDesc: 'Skill có thể cài đặt',
    },
    menu: 'Mở menu',
    closeMenu: 'Đóng menu',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'Mọi quyền được bảo lưu.',
    poweredBy: 'Vận hành bởi',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'Mới · Tiết kiệm token',
    text: 'Deep Work Plan có mặt trên Product Hunt hôm nay',
    tagline: 'trao cho agent một kế hoạch',
    linkText: 'Ủng hộ ngay',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Điều hướng trang',
    sections: {
      methodology: 'Phương pháp luận',
      getStarted: 'Bắt đầu',
      project: 'Dự án',
      connect: 'Kết nối',
      learn: 'Learn',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title: 'Deep Work Plan — thực thi có cấu trúc cho các agent lập trình AI',
      description:
        'Ngữ cảnh quan trọng hơn mô hình. Deep Work Plan biến mọi repository thành một môi trường có cấu trúc nơi bất kỳ agent lập trình nào cũng hoàn thành công việc dài hơi.',
    },
    hero: {
      badge: 'Phương pháp luận mở · MIT · Độc lập với agent',
      title: 'Mô hình quan trọng.',
      titleEmphasis: 'Ngữ cảnh quan trọng hơn.',
      subtitle:
        'Deep Work Plan biến mọi repository thành một môi trường có cấu trúc — ngữ cảnh, rào chắn và một kế hoạch bền vững — nơi bất kỳ agent lập trình nào cũng thực thi chính xác và hiệu quả, và hoàn thành công việc dài hơi.',
      instructionLabel: 'Sao chép vào agent của bạn',
      instruction:
        'Sao chép prompt init.md và dán vào agent lập trình của bạn — Claude Code, Cursor, Codex, hoặc bất kỳ agent nào khác — để biến mọi repository thành AI-first.',
      copyLabel: 'Sao chép init.md',
      copiedLabel: 'Đã sao chép',
      viewInitCta: 'Xem toàn bộ lời nhắc /init',
      pullQuote:
        'Deep Work Plan là phát triển dựa trên đặc tả, nơi bản thân repository trở thành harness.',
      primaryCta: 'Đọc phương pháp luận',
      secondaryCta: 'Đọc đặc tả',
      illustrationAlt:
        'Một ngọn hải đăng trên bờ đá phát ra một luồng sáng duy nhất dẫn đường cho con tàu nhỏ — bản khắc gợi hình ảnh repository như một harness vững vàng dẫn lối cho mọi agent.',
      scrollCta: 'Xem cách hoạt động',
    },
    pitch: {
      kicker: 'Vấn đề và lời giải',
      problem:
        'Trong những đợt ngắn, agent lập trình rất ấn tượng. Giao cho nó một nhiệm vụ dài hơi — một bản di chuyển, một phân hệ mới, một bản refactor hàng chục tệp — nó sẽ trôi dạt: ngữ cảnh đầy lên, các quyết định trước đó phai nhạt và hàng giờ công việc dở dang giữa chừng.',
      answer:
        'Deep Work Plan trả lời bằng phát triển theo đặc tả: một kế hoạch bền vững, các tác vụ nguyên tử và cổng kiểm chứng agent buộc phải qua. “Xong” không còn là cảm giác — trở thành bằng chứng kiểm chứng được và review được.',
      efficiency:
        'Và vì ngữ cảnh là tài nguyên khan hiếm nhất của agent, harness được thiết kế cho hiệu suất token: hướng dẫn tải tiến tiến, kiểm chứng chỉ chạm vào phần thay đổi và mỗi tác vụ học tại chỗ — công việc dài hơi vẫn khả thi.',
      illustrationAlt:
        'Một bản khắc hai tầng: một bên là con tàu trôi dạt trong sương mù cạnh đá ngầm, bên kia là chính con tàu vững vàng theo lộ trình đã vẽ về ngọn hải đăng cảng.',
    },
    story: {
      act1: {
        kicker: 'Phương pháp · Hồi I',
        lead: 'Bạn quyết định “xong” nghĩa là gì và ranh giới ở đâu. Kế hoạch mang theo ý định của bạn; các agent làm phần giờ giấc — không cần trông chừng, không cần sửa mỗi hai mươi phút.',
        deepLinkLabel: 'Đọc phương pháp luận',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: 'Phương pháp · Hồi II',
        lead: 'Tác vụ dài làm đầy ngữ cảnh của bất kỳ mô hình nào. Chi tiết rơi rụng và agent trôi dạt. Một kế hoạch viết ra — tác vụ nguyên tử, cổng kiểm chứng, trạng thái có thể tiếp tục — chính là nơi nó quay về, vòng này qua vòng khác.',
        deepLinkLabel: 'Xem vòng lặp lõi',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: 'Phương pháp · Hồi III',
        lead: 'Mỗi tác vụ nêu rõ tiêu chí chấp nhận và các bước kiểm tra bắt buộc phải qua. Agent không được “cảm thấy đã xong” — phải qua kiểm tra, nếu không task vẫn mở.',
        deepLinkLabel: 'Đọc đặc tả',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: 'Phương pháp · Hồi IV',
        lead: 'Ngữ cảnh, công cụ, rào chắn và trạng thái nằm trong repository của bạn dưới dạng tệp thuần mà bất kỳ agent nào cũng đọc được. Không khóa chặt, không bộ não bên ngoài — sống sót qua mọi lần đặt lại ngữ cảnh.',
        deepLinkLabel: 'Xem onboarding tạo ra gì',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: 'Phương pháp · Hồi V',
        lead: 'Ngữ cảnh là tài nguyên khan hiếm nhất của agent. Harness tải tiến tiến, chỉ kiểm chứng phần thay đổi và học theo từng tác vụ — kế hoạch tự trả phí cho chính nó.',
        deepLinkLabel: 'Đọc phương pháp luận',
        deepLinkHref: '/methodology',
      },
    },
    onboarding: {
      badge: 'Khởi tạo dựa trên suy luận',
      title:
        'Trỏ nó vào bất kỳ repository nào. Nó suy luận — nó không sao chép-dán.',
      subtitle:
        'Luồng khởi tạo kiểm tra các ngôn ngữ, framework, trình quản lý gói và lệnh kiểm chứng thực tế của repository, rồi sinh ra các thành phần thích ứng với repository đó. Một bản mẫu chung chung bị coi là thất bại.',
      steps: [
        {
          title: 'Suy luận về stack và kiểu hình của bạn',
          description:
            'Đọc các manifest, bố cục thư mục và CI để suy ra các lệnh test, lint và build thực tế, rồi phân loại repository là một repo độc lập hay một trung tâm điều phối.',
        },
        {
          title: 'Sinh ra AGENTS.md, docs/ và tài liệu cho từng mô-đun',
          description:
            'Một AGENTS.md được suy luận, một hệ thống docs/ phân loại, cùng một README và docs/ bên trong mỗi mô-đun chính — được điền bằng các lệnh thực tế của repository, không phải chỗ trống.',
        },
        {
          title: 'Dựng .agents/ cùng symlink .claude và .cursor tới .agents',
          description:
            'Một thư mục .agents/ dùng chung giữa các agent (skill, agent, command) và các symlink .claude và .cursor tới .agents, phản chiếu CLAUDE.md tới AGENTS.md, để mọi công cụ đều đọc một nguồn chân lý duy nhất.',
        },
        {
          title: 'Cài skill DWP và dựng .dwp/',
          description:
            'Kết nối skill Deep Work Plan và tạo thư mục .dwp/ được gitignore cho các kế hoạch và bản nháp, rồi tùy chọn bổ sung các addon tự nguyện như hỗ trợ devcontainer.',
        },
      ],
    },
    quickstart: {
      badge: 'Điều gì xảy ra khi bạn chạy nó',
      title: 'Một chỉ dẫn. Repository lo phần còn lại.',
      subtitle:
        'Bạn không chọn phương thức cài đặt hay sao chép một mẫu. Bạn trao cho agent một dòng; nó cài skill — bộ máy có thể tái sử dụng — và thích ứng repository của bạn với nó.',
      steps: [
        {
          title: 'Agent của bạn mở /init.md',
          description:
            'Nó đọc lời nhắc khởi tạo tại deepworkplan.com/init.md cùng phương pháp luận, đặc tả và kit mà nó liên kết tới — tiêu chuẩn nó sắp áp dụng.',
        },
        {
          title: 'Nó cài skill Deep Work Plan',
          description:
            'Skill là bộ máy — giống hệt nhau trong mọi repository. Một lệnh kéo về bộ định tuyến cùng các sub-skill (create, execute, refine, resume, status, verify, onboard, author) cho Claude Code, Cursor, Codex, Gemini và Copilot.',
        },
        {
          title: 'Nó thích ứng repository của bạn',
          description:
            'Suy luận về stack thực tế của bạn — không bao giờ sao chép-dán — nó viết AGENTS.md, một cây docs/ phân loại, các README cho từng mô-đun, một bộ kit .agents/ được suy luận và một .dwp/ được gitignore. Repository của bạn trở thành harness.',
        },
        {
          title: 'Bạn lập kế hoạch và thực thi',
          description:
            'Sinh ra các Deep Work Plan dài hơi cho mọi tác vụ và chạy chúng từng bước, với tiêu chí chấp nhận rõ ràng, các cổng kiểm chứng và trạng thái có thể tiếp tục — tự chủ, trong nhiều giờ.',
        },
      ],
      note: 'Skill được cài giống hệt nhau ở mọi nơi; thứ được thích ứng là repository của bạn — AGENTS.md, tài liệu và bộ kit .agents/ được suy luận cho stack của bạn. Chính sự phân tách đó biến phương pháp luận thành một tiêu chuẩn tái sử dụng được thay vì một bộ khung dùng một lần.',
    },
    outcomes: {
      badge: 'Bạn nhận được gì',
      title: 'Mọi thứ agent của bạn cần để làm việc tự chủ.',
      subtitle:
        'Một lần chạy, được commit theo từng đơn vị nguyên tử. Mọi đầu ra đều là Markdown và mọi thay đổi đều kiểm toán được.',
      items: [
        {
          label: 'AGENTS.md tại gốc repository',
          detail:
            'Được suy luận từ stack, lệnh và cấu trúc thực tế của repository — không phải một mẫu với chỗ trống. CLAUDE.md được symlink tới AGENTS.md.',
        },
        {
          label: 'docs/ phân loại và tài liệu từng mô-đun',
          detail:
            'Kiến trúc, cài đặt, chuẩn mực và xử lý sự cố — cùng một README và docs/ bên trong mỗi mô-đun chính, được sinh ra từ codebase của bạn.',
        },
        {
          label: '.agents/ cùng symlink .claude và .cursor tới .agents',
          detail:
            'Một thư mục .agents/ dùng chung giữa các agent (skill, agent, command) với các symlink .claude và .cursor tới .agents để mọi công cụ đọc một nguồn chân lý duy nhất.',
        },
        {
          label: 'Skill Deep Work Plan, đã cài',
          detail:
            'create, execute, refine, resume, status, verify, onboard và author — sẵn có cho agent của bạn dưới dạng một gói skill duy nhất, không cần bản sao cho từng repository.',
        },
        {
          label: 'Mức tuân thủ bạn có thể kiểm tra',
          detail:
            '/dwp-verify tạo một báo cáo đạt/không đạt khách quan so với đặc tả, để "AI-first" được kiểm chứng chứ không phải chỉ tuyên bố — và có thể kiểm chứng lại sau mỗi kế hoạch.',
        },
        {
          label: 'Hai kiểu hình, đều được xử lý',
          detail:
            'Khởi tạo phân loại repository của bạn là một repo độc lập (trường hợp phổ biến) hay một trung tâm điều phối các kế hoạch con xuyên nhiều repository.',
        },
        {
          label: 'Một bộ kit sống mà repository của bạn nuôi lớn',
          detail:
            'Sub-skill author (skill-create, agent-create) cho phép repository tự phát triển skill, agent và command riêng; các addon bảo trì tự nguyện như dependency-upgrade giúp nó tự cập nhật.',
        },
        {
          label: 'Thuần git, có thể tiếp tục, .dwp/',
          detail:
            'Không daemon, không trạng thái ngoài. Kế hoạch và bản nháp nằm trong thư mục .dwp/ được gitignore, và mọi tác vụ tiếp tục chỉ từ git — kể cả sau khi ngữ cảnh tràn.',
        },
      ],
    },
    agents: {
      badge: 'Agent',
      title: 'Hoạt động với agent bạn đã dùng.',
      subtitle:
        'Một phương pháp luận, nhiều bộ chuyển đổi. Markdown không ràng buộc framework vào bất cứ thứ gì — mọi agent đọc được Markdown đều chạy được một Deep Work Plan.',
      fullLabel: 'Đầy đủ',
      partialLabel: 'Một phần',
      viewAllCta: 'Xem tất cả agent',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'Triển khai tham chiếu, với WebFetch và slash command bản địa.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'Bộ chuyển đổi đầy đủ. Dùng gói ngoại tuyến nếu WebFetch bị chặn.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'Khuyến nghị gói ngoại tuyến; quy tắc cài dưới .codex/.',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: 'Bộ chuyển đổi đầy đủ — các lệnh dwp-* chạy qua AGENTS.md và quy trình #.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Yêu cầu Gemini 2.5 Pro trở lên, với WebFetch bản địa.',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: 'Mã nguồn mở. Đọc AGENTS.md bản địa và chạy dwp-* qua lệnh #.',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: 'Quy tắc cùng quy trình lệnh # điều khiển toàn bộ vòng lặp Deep Work Plan.',
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'Mã nguồn mở. Quy tắc Markdown và lệnh # thực thi mọi bước dwp-*.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'Bộ chuyển đổi đầy đủ với bề mặt lệnh bản địa.',
        },
      ],
    },
    stacks: {
      badge: 'Stack',
      title: 'Các preset suy luận cho những stack quan trọng.',
      viewAllCta: 'Xem tất cả preset',
      subtitle:
        'Đây là các trợ giúp suy luận, không phải mẫu. Khởi tạo đọc các manifest thực tế của repository và thích ứng theo từng stack — nó không bao giờ sao chép mù một preset. Monorepo nhận tài liệu cho từng mô-đun.',
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
        { name: 'Generic', sub: 'Mọi stack' },
      ],
    },
    archetypes: {
      badge: 'Hai kiểu hình',
      title: 'Repository độc lập, hoặc trung tâm điều phối.',
      subtitle:
        'Khởi tạo rẽ nhánh theo kiểu hình. Hầu hết repository là repo độc lập. Một trung tâm điều phối các Deep Work Plan con xuyên nhiều repository. Phương pháp luận xử lý cả hai như công dân hạng nhất.',
      individual: {
        tag: 'Trường hợp phổ biến',
        title: 'Repository độc lập',
        description:
          'Một codebase duy nhất với một stack chính, các lệnh kiểm chứng riêng và tài liệu cho từng mô-đun. Mặc định — khởi tạo giả định trường hợp này trừ khi repository rõ ràng là một trung tâm.',
        example:
          'Ví dụ, một API Django, một ứng dụng Vue, hay một dịch vụ TypeScript Lambda.',
      },
      orchestrator: {
        tag: 'Điều phối',
        title: 'Trung tâm điều phối',
        description:
          'Một repository điều phối làm việc xuyên các sub-repository qua một manifest điều phối, sinh ra các kế hoạch con mà mỗi cái commit trong repository riêng của nó, cùng các quy tắc ranh giới và một chỉ mục điều hướng.',
        example: 'Ví dụ, một trung tâm điều phối năm repository sản phẩm.',
      },
    },
    comparison: {
      badge: 'Phương pháp luận so với công cụ',
      title: 'Một lớp khác. Bổ sung, không cạnh tranh.',
      subtitle:
        'Deep Work Plan không phải một bộ dựng khung nữa. Nó là lớp phương pháp luận nằm dưới mọi công cụ dựa trên đặc tả hay dựng khung, tập trung vào các lần chạy tự chủ nhiều giờ.',
      colDwp: 'Deep Work Plan',
      colOthers: 'Công cụ dựng khung / đặc tả',
      rows: [
        {
          label: 'Trọng tâm chính',
          dwp: 'Thực thi tự chủ nhiều giờ',
          others: 'Sinh đặc tả hoặc khung',
        },
        {
          label: 'Đơn vị công việc',
          dwp: 'Một Deep Work Plan (phiên có thể tiếp tục)',
          others: 'Một tài liệu đặc tả hoặc một bộ khung',
        },
        {
          label: 'Mô hình trạng thái',
          dwp: 'Thư mục .dwp/ thuần git, có thể tiếp tục',
          others: 'Thường ở ngoài hoặc trong IDE',
        },
        {
          label: 'Sự ràng buộc với agent',
          dwp: 'Độc lập với agent (Markdown và Bash)',
          others: 'Thường gắn với công cụ hoặc IDE',
        },
        {
          label: 'Khôi phục ngữ cảnh',
          dwp: 'Tiếp tục sau khi ngữ cảnh tràn',
          others: 'Thường khởi động lại tác vụ',
        },
        {
          label: 'Giấy phép',
          dwp: 'MIT, phương pháp luận và kit mở',
          others: 'Tùy trường hợp',
        },
      ],
    },
    origin: {
      badge: 'Nguồn gốc',
      quote:
        'Được xây dựng bởi Dailybot — công ty đứng sau các buổi standup bất đồng bộ cho đội nhóm phân tán. Trong nội bộ, chúng tôi dùng Deep Work Plan để biến các repository sản xuất trải dài Django, Vue, TypeScript Lambda và Astro thành có thể điều khiển bằng agent. Sau nhiều tháng dùng trong sản xuất, chúng tôi mã nguồn mở phương pháp luận dưới giấy phép MIT.',
      attribution: 'Đội kỹ thuật Dailybot',
      dailybotCta: 'Tìm hiểu về Dailybot',
    },
    finalCta: {
      badge: 'Biến repository của bạn thành AI-first',
      title: 'Trao cho agent của bạn deep work.',
      subtitle:
        'Trao cho agent của bạn một dòng — trỏ nó vào /init.md — và nó biến repository của bạn thành AI-first: nó cài skill, suy luận về stack của bạn và commit một hệ thống AGENTS.md hoàn chỉnh. Từ đó bạn tạo và thực thi các Deep Work Plan chạy tự chủ trong nhiều giờ.',
      primaryCta: 'Mở lời nhắc /init',
      secondaryCta: 'Đọc phương pháp luận',
      tertiaryCta: 'Dành cho agent và nhà phát triển',
      meta: 'Cấp phép MIT · không telemetry · xuất ra thư mục .dwp/ được gitignore.',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'Liên hệ',
    nameLabel: 'Tên',
    namePlaceholder: 'Tên của bạn',
    emailLabel: 'Email',
    emailPlaceholder: 'ban@email.com',
    messageLabel: 'Lời nhắn',
    messagePlaceholder: 'Viết lời nhắn của bạn...',
    sendButton: 'Gửi lời nhắn',
  },

  // About page
  aboutPage: {
    title: 'Về phương pháp luận',
    subtitle: 'Phương pháp luận mở · Cấp phép MIT',
    description:
      'Deep Work Plan là một phương pháp luận mở, độc lập với framework cho công việc kỹ thuật nghiêm túc với các agent lập trình AI. Nguồn gốc và những người duy trì nó.',
    heroDescription:
      'Một cấu trúc lặp lại được để lập kế hoạch, thực thi và kiểm chứng deep work với các agent lập trình AI — được xây dựng công khai và miễn phí sử dụng.',
    bioTitle: 'Nó là gì',
    bioText:
      'Deep Work Plan (DWP) là một phương pháp luận, không phải một sản phẩm. Nó định nghĩa cách biến một mục tiêu thành một kế hoạch được thống nhất, chia kế hoạch đó thành các tác vụ nguyên tử và kiểm chứng độc lập được, và chạy mỗi tác vụ trong một vòng lặp tập trung kết thúc bằng một bước kiểm tra.<br /><br />Nó cố ý độc lập với agent AI hay stack bạn dùng — các bộ chuyển đổi diễn dịch cùng một vòng lặp lõi sang Claude, Cursor, Copilot, Codex, Gemini và nhiều hơn nữa. Kế hoạch, các tác vụ và nhật ký chạy đều là Markdown thuần, nên công việc luôn dễ đọc, dễ rà soát và được kiểm soát phiên bản.',
    passionsTitle: 'Nguyên tắc cốt lõi',
    passions: [
      {
        title: 'Lập kế hoạch trước khi thực thi',
        description:
          'Không một dòng mã nào được viết cho tới khi kế hoạch được thống nhất. Kế hoạch là một hợp đồng giữa bạn và agent.',
        icon: '\u{1F5FA}️',
        link: '/methodology',
      },
      {
        title: 'Các tác vụ là nguyên tử',
        description:
          'Mỗi tác vụ được giới hạn phạm vi để có thể tự thực thi và kiểm chứng riêng, rồi được commit theo từng đơn vị nguyên tử.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'Kiểm chứng mọi thứ',
        description:
          'Mỗi tác vụ kết thúc bằng một bước kiểm tra rõ ràng trước khi tác vụ kế tiếp bắt đầu, với tiến độ được ghi lại trong git.',
        icon: '✅',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'Nhìn tổng quan',
    quickFacts: [
      'Phương pháp luận mở, cấp phép MIT',
      'Độc lập với framework và agent',
      'Được duy trì bởi Dailybot và cộng đồng',
      'Bao gồm một đặc tả, các command, bộ chuyển đổi, preset và ví dụ',
      'Chỉ Markdown — không runtime, không khóa chặt',
      'Biến mọi repository thành một codebase AI-first, điều khiển được bằng agent',
    ],
    ctaTitle: 'Ai duy trì nó',
    ctaDescription:
      'Deep Work Plan lớn lên từ công việc kỹ thuật thực tế tại Dailybot và nay được duy trì bởi Dailybot cùng cộng đồng mã nguồn mở. Phương pháp luận, đặc tả và kit được phát hành dưới giấy phép MIT — tự do sử dụng, thích ứng và xây dựng tiếp.',
    ctaCv: 'Đọc phương pháp luận',
    ctaContact: 'Khởi động nhanh',
  },

  // Contact page
  contactPage: {
    title: 'Cộng đồng & liên hệ',
    subtitle: 'Mã nguồn mở · Do cộng đồng dẫn dắt',
    description:
      'Deep Work Plan được xây dựng công khai. Tìm mã nguồn, mở một issue, hoặc tham gia trao đổi qua các kênh dưới đây — luôn hoan nghênh đóng góp.',
    heroDescription:
      'Có câu hỏi, ý tưởng hay cải tiến? Deep Work Plan được phát triển công khai — đây là nơi để liên hệ dự án và những người duy trì nó.',
    formTitle: 'Gửi một lời nhắn',
    nameLabel: 'Tên',
    namePlaceholder: 'Tên của bạn',
    emailLabel: 'Email',
    emailPlaceholder: 'ban@email.com',
    reasonLabel: 'Tôi muốn liên hệ về',
    reasonOptions: [
      { value: '', label: '— Chọn một chủ đề —' },
      { value: 'general', label: 'Chung / Chỉ chào hỏi' },
      { value: 'tech-talk', label: 'Tech talk / Lời mời diễn thuyết' },
      { value: 'collaboration', label: 'Hợp tác / Đối tác' },
      { value: 'project', label: 'Dự án / Hỏi về công việc' },
      { value: 'dailybot', label: 'Câu hỏi về Dailybot' },
      { value: 'trading', label: 'Câu hỏi về giao dịch của tôi' },
      {
        value: 'the-library-of-tomorrow',
        label: 'Tham gia The Library of Tomorrow',
      },
      { value: 'other', label: 'Khác' },
    ],
    subjectLabel: 'Tiêu đề',
    subjectPlaceholder: 'Đây là về việc gì?',
    messageLabel: 'Lời nhắn',
    messagePlaceholder: 'Viết lời nhắn của bạn...',
    sendButton: 'Gửi lời nhắn',
    sendingButton: 'Đang gửi...',
    successTitle: 'Đã gửi lời nhắn',
    successMessage: 'Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.',
    sendAnotherButton: 'Gửi một lời nhắn khác',
    requiredField: 'Trường này là bắt buộc',
    invalidEmail: 'Vui lòng nhập một địa chỉ email hợp lệ',
    fallbackMessage:
      'Biểu mẫu liên hệ hiện không khả dụng. Bạn có thể liên hệ trực tiếp với tôi qua email.',
    fallbackEmailText: 'Gửi email cho tôi tại',
    formNote: 'Tôi sẽ phản hồi sớm nhất có thể.',
    socialTitle: 'Kết nối với tôi',
    locationTitle: 'Vị trí',
    locationText: 'Đặt tại Colombia. Sẵn sàng hợp tác từ xa trên toàn cầu.',
    prefillSubjects: {
      generalInquiry: 'Hỏi chung',
      collaboration: 'Cơ hội hợp tác',
      projectInquiry: 'Hỏi về dự án hoặc công việc',
      projectCollaboration: 'Hỏi về hợp tác dự án',
      startupCollaboration: 'Cơ hội hợp tác khởi nghiệp',
      techTalkInvitation: 'Lời mời diễn thuyết tech talk',
      tradingQuestion: 'Câu hỏi về giao dịch',
      dailybotQuestion: 'Câu hỏi về Dailybot',
    },
  },

  contactSection: {
    title: 'Hãy kết nối',
    description:
      'Tôi luôn cởi mở với những cuộc trò chuyện thú vị, cơ hội hợp tác và ý tưởng mới. Dù bạn muốn bàn về công nghệ, khởi nghiệp, hay chỉ để chào hỏi.',
    ctaText: 'Liên hệ',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'vi-VN',

  // 404 page
  notFoundPage: {
    title: 'Không tìm thấy trang',
    description:
      'Trang bạn đang tìm không tồn tại hoặc đã được di chuyển. Khám phá phương pháp luận hoặc quay về trang chủ để tiếp tục duyệt.',
    heading: 'Không tìm thấy trang',
    message:
      'Xin lỗi, trang bạn đang tìm không tồn tại hoặc có thể đã được di chuyển. Hãy thử quay về trang chủ hoặc khám phá phương pháp luận.',
    backHome: 'Quay về trang chủ',
    exploreMethodology: 'Đọc phương pháp luận',
    agentTitle: 'Dành cho AI agent',
    agentIntro:
      'Đường dẫn này không tồn tại. Các liên kết khôi phục bên dưới (và các bản tương đương máy có thể đọc được của chúng) liệt kê mọi trang trên trang web này.',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'Phương pháp luận Deep Work Plan',
      description:
        'Năm chương từ tuyên ngôn tới các kiểu hình: nguyên tắc, vòng lặp lõi, mẫu, skill và agent, cùng những thích ứng đằng sau Deep Work Plan.',
    },
    eyebrow: 'Phương pháp luận',
    title: 'Phương pháp luận Deep Work Plan',
    intro:
      'Năm chương đưa bạn từ triết lý đằng sau Deep Work Plan tới vòng lặp thực hành, các mẫu và những thích ứng bạn dùng hằng ngày.',
    chapterLabel: 'Chương',
    readChapter: 'Đọc chương',
    prev: 'Trước',
    next: 'Tiếp',
    backToIndex: 'Tất cả các chương',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Đặc tả Deep Work Plan',
      description:
        'Đặc tả dễ đọc của phương pháp luận Deep Work Plan: định dạng DWP, giao thức agent, các kiểu hình, chuẩn tài liệu và các addon.',
    },
    eyebrow: 'Đặc tả',
    title: 'Đặc tả',
    intro:
      'Đặc tả chính xác, dễ đọc của phương pháp luận — các cấu trúc và giao thức mà con người và agent cùng chia sẻ.',
    tocTitle: 'Trong trang này',
    prev: 'Trước',
    next: 'Tiếp',
    backToIndex: 'Tất cả tài liệu đặc tả',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'Bộ kit Deep Work Plan',
      description:
        'Skill cùng tám sub-skill, các command, bộ chuyển đổi, preset, addon tự nguyện và ví dụ giúp Deep Work Plan chạy được xuyên các agent và stack.',
    },
    eyebrow: 'Kit',
    title: 'Bộ kit',
    intro:
      'Mọi thứ bạn cần để chạy phương pháp luận: skill cùng các sub-skill, slash command, bộ chuyển đổi agent, preset khởi tạo, addon tự nguyện và các ví dụ đã giải.',
    groups: {
      command: {
        title: 'Sub-skill & command',
        description:
          'Bộ định tuyến skill cùng các sub-skill (create, execute, refine, resume, status, verify, onboard, author), cộng với các slash command mỏng ủy thác cho chúng.',
      },
      adapter: {
        title: 'Bộ chuyển đổi',
        description:
          'Các tích hợp mỏng theo từng agent cho Claude, Cursor, Codex và nhiều hơn nữa.',
      },
      preset: {
        title: 'Preset khởi tạo',
        description:
          'Các hướng dẫn suy luận theo từng stack mà luồng onboard dùng để thích ứng tài liệu, skill và lệnh kiểm chứng với repository của bạn.',
      },
      example: {
        title: 'Ví dụ',
        description: 'Các hướng dẫn từng bước đã giải, trước-và-sau.',
      },
      addon: {
        title: 'Addon (tự nguyện)',
        description:
          'Các năng lực tùy chọn mà luồng onboard có thể bổ sung lên một repo — không bao giờ là một phần của nền tảng AI-first cơ bản.',
      },
    },
    viewDetail: 'Xem chi tiết',
    prev: 'Trước',
    next: 'Tiếp',
    backToIndex: 'Trở lại bộ kit',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Ví dụ Deep Work Plan',
      description:
        'Các hướng dẫn trước-và-sau cho thấy cùng một tác vụ kỹ thuật có và không có Deep Work Plan — cùng khác biệt về độ tin cậy và rà soát.',
    },
    eyebrow: 'Ví dụ',
    title: 'Ví dụ',
    intro:
      'Xem phương pháp luận trong thực tế — các hướng dẫn cụ thể, trước-và-sau cho những tác vụ kỹ thuật thật.',
    viewExample: 'Đọc hướng dẫn từng bước',
    prev: 'Trước',
    next: 'Tiếp',
    backToGallery: 'Tất cả ví dụ',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'Khởi động nhanh — Deep Work Plan',
      description:
        'Cài skill, khởi tạo repository, rồi lập kế hoạch và thực thi với mọi agent — các bước biến repository của bạn thành dựa trên đặc tả và điều khiển được bằng agent.',
    },
    eyebrow: 'Khởi động nhanh',
    title: 'Bắt đầu trong vài phút',
    intro:
      'Cài skill, khởi tạo repository, rồi lập kế hoạch và thực thi với mọi agent — các bước biến repository của bạn thành dựa trên đặc tả và điều khiển được bằng agent.',
    sequenceTitle: 'Lộ trình áp dụng',
    codeLabel: 'Terminal',
    orLabel: 'hoặc',
    steps: [
      {
        title: 'Cài skill Deep Work Plan',
        description:
          'Thêm skill vào repository của bạn — một bộ định tuyến cùng tám sub-skill (create, execute, refine, resume, status, verify, onboard, author). Dùng Skills CLI cho con đường nhanh nhất, hoặc clone repo và chạy setup nơi có git và một shell.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Khởi tạo repository',
        description:
          'Chạy sub-skill onboard và để agent suy luận về repo thực tế của bạn. Nó sinh ra AGENTS.md, một cơ sở tri thức docs/, tài liệu cho từng mô-đun và một thư mục .agents/ dùng chung giữa các agent (với các symlink .claude → .agents và .cursor → .agents), kết nối các command dwp-* mỏng và dựng một .dwp/ được gitignore.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Phát triển bộ kit và chấp nhận các addon',
        description:
          'Dùng /skill-create và /agent-create (sub-skill author) để phát triển các skill, agent và command phù hợp với stack. Khởi tạo cũng đề xuất năm addon tự nguyện — devcontainer, Dailybot, dependency-upgrade, design-system và AI Diff Reviewer — mà bạn chỉ chấp nhận khi chúng phù hợp.',
      },
      {
        title: 'Lập kế hoạch và thực thi',
        description:
          'Sinh ra một Deep Work Plan và chạy nó từng tác vụ, kiểm chứng từng cổng và tiếp tục qua nhiều phiên — điều khiển repository dựa trên chính đặc tả của nó.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'Kết quả',
    outcome:
      'Repository của bạn trở thành dựa trên đặc tả và điều khiển được bằng agent: kế hoạch là nguồn chân lý bền vững, và bản thân repository trở thành harness mà mọi agent chạy dựa vào.',
    nextStepsTitle: 'Bước tiếp theo',
    nextSteps: [
      { label: 'Đọc phương pháp luận', href: '/methodology' },
      { label: 'Duyệt bộ kit', href: '/kit' },
      { label: 'Xem ví dụ', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — Biến repository của bạn thành AI-first',
      description:
        'Áp dụng phương pháp luận Deep Work Plan trong mọi repository. Cài skill, chạy khởi tạo agent, rồi lập kế hoạch và thực thi với mọi agent lập trình AI.',
    },
    eyebrow: 'Áp dụng',
    title: 'Biến repository này thành AI-first',
    intro:
      'Một endpoint để biến mọi repository thành một codebase dựa trên đặc tả, sẵn sàng cho agent. Cài skill, để một agent khởi tạo repo, rồi lập kế hoạch và thực thi công việc có cấu trúc với mọi agent lập trình.',
    handoffTitle: 'Sao chép vào agent của bạn',
    handoffBody:
      'Sao chép toàn bộ prompt init.md và dán vào agent lập trình AI của bạn — Claude Code, Cursor, Codex, hoặc bất kỳ agent nào khác. Nó đọc phương pháp luận và đặc tả, cài skill, và khởi tạo repository này cho các Deep Work Plan.',
    handoffInstruction:
      'Đọc và làm theo hướng dẫn tại https://deepworkplan.com/init.md để biến kho lưu trữ này thành AI-first.',
    handoffMdLabel: 'Lời nhắc agent độc lập',
    codeLabel: 'agent',
    whatTitle: 'Điều này làm gì',
    whatBody: [
      'Việc áp dụng thay đổi repository theo hai cách bền vững — hai trụ cột của phương pháp luận.',
      'Thứ nhất, repository trở thành dựa trên đặc tả: công việc bắt đầu từ một kế hoạch và đặc tả được viết ra, không phải từ những lời nhắc tùy hứng. Thứ hai, bản thân repository trở thành harness của agent — một AGENTS.md, một cơ sở tri thức docs/, tài liệu cho từng mô-đun và một thư mục skill .agents/ (với các symlink .claude → .agents và .cursor → .agents) trao cho mọi agent ngữ cảnh và các command nó cần.',
    ],
    sequenceTitle: 'Trình tự áp dụng',
    orLabel: 'hoặc',
    steps: [
      {
        title: 'Xác minh trước khi cài đặt',
        description:
          'Hãy coi lời nhắc và skill là không đáng tin cho đến khi bạn đã kiểm tra chúng. Cả hai đều là mã nguồn mở và cấp phép MIT; skill là Markdown-first không có lời gọi mạng và không có telemetry. Mỗi bản phát hành công bố một SHA256SUMS cho skill được giao, vì vậy bạn có thể xác nhận bản sao của mình khớp trước khi chạy nó. Các bản phát hành có checksum, không có chữ ký (ký là bước tiếp theo đã được ghi lại).',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'Cài skill',
        description:
          'Thêm skill Deep Work Plan để mọi agent đều có thể lập kế hoạch và thực thi công việc có cấu trúc. Skill đi kèm một bộ định tuyến cùng tám sub-skill — create, execute, refine, resume, status, verify, onboard và author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Chạy khởi tạo repository',
        description:
          'Gọi sub-skill onboard và để agent suy luận về repo thực tế — stack, trình quản lý gói và các lệnh kiểm chứng thực sự của nó. Sau đó nó sinh ra AGENTS.md, một cơ sở tri thức docs/, tài liệu cho từng mô-đun và một thư mục .agents/ dùng chung giữa các agent (với các symlink .claude → .agents và .cursor → .agents), kết nối các command dwp-* mỏng và dựng một .dwp/ được gitignore cho kế hoạch và bản nháp. Với các repo lớn, sub-skill onboard sử dụng đường dẫn dựa trên kế hoạch: hoàn thành khảo sát, sau đó phát hành một Deep Work Plan khởi tạo. Không gì là rập khuôn; mọi thứ đều được thích ứng với repository của bạn.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Chấp nhận các addon tự nguyện',
        description:
          'Khởi tạo đề xuất năm addon tự nguyện — devcontainer, Dailybot, dependency-upgrade, design-system và AI Diff Reviewer — mà bạn chỉ chấp nhận khi chúng phù hợp. Một repo hoàn toàn tuân thủ với không cần addon nào. Dùng /skill-create và /agent-create (sub-skill author) để phát triển các skill, agent và command phù hợp với stack vượt ra ngoài cơ sở.',
      },
      {
        title: 'Lập kế hoạch và thực thi',
        description:
          'Sinh ra các Deep Work Plan với /dwp-create và chạy chúng với /dwp-execute, rồi /dwp-status, /dwp-refine, /dwp-resume và /dwp-verify khi công việc tiến triển. Mỗi kế hoạch mang các tác vụ được đánh số, các cổng kiểm chứng và một giao thức hoàn tất — kết thúc với ba tác vụ cuối bắt buộc: Đánh giá Bảo mật, Khám phá Skill và Agent, và Báo cáo Tổng hợp.',
      },
      {
        title: 'Xác minh sự tuân thủ',
        description:
          'Chạy /dwp-verify để có báo cáo đạt/không đạt khách quan so với đặc tả. Xác nhận rằng AGENTS.md, docs/ (với nội dung thực, không phải stub), .agents/ (với các delegator dwp-* mỏng và một catalog khớp với đĩa), .dwp/ và tmp/ đều đã sẵn sàng — không gì là rập khuôn, mọi thứ đều được suy luận cho repo này.',
        commands: ['/dwp-verify'],
      },
    ],
    outcomeTitle: 'Kết quả',
    outcome:
      'Repository trở thành dựa trên đặc tả và bản thân repository trở thành harness của agent — ngữ cảnh và các command đi theo mã nguồn.',
    nextStepsTitle: 'Đọc tiếp',
    nextSteps: [
      { label: 'Khởi động nhanh', href: '/quickstart' },
      { label: 'Phương pháp luận', href: '/methodology' },
      { label: 'Đặc tả', href: '/spec' },
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
          'Solo developers and small teams who want context engineering and verification without heavy ceremony.',
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
      title: 'Tin tưởng và bảo mật',
      description:
        'Tại sao Deep Work Plan an toàn để áp dụng: mã nguồn mở và MIT, Markdown-first không có lời gọi mạng hay telemetry, không phá hủy theo thiết kế, với các lần cài đặt có thể xác minh và chính sách công bố lỗ hổng rõ ràng.',
    },
    eyebrow: 'Tin tưởng & bảo mật',
    title: 'Tin tưởng và bảo mật',
    intro:
      'Không ai nên cài một skill mà họ không thể tin tưởng. Deep Work Plan được xây dựng để xác minh, không phải để tin một cách mù quáng: mã nguồn mở, Markdown-first, không phá hủy và có thể kiểm tra trước khi chạy. Trang này nêu rõ những gì nó làm, những gì nó không làm, và cách xác nhận cả hai.',
    pillarsTitle: 'Bạn đang tin tưởng điều gì',
    pillars: [
      {
        title: 'Mã nguồn mở và cấp phép MIT',
        body: 'Trang web và skill đều công khai và có thể so sánh được. Bạn có thể đọc từng dòng trước khi chạy, và so sánh bất kỳ bản sao nào với mã nguồn tại một phiên bản được gắn thẻ.',
      },
      {
        title: 'Markdown-first — không mạng, không telemetry',
        body: 'Skill không có CLI, không có HTTP API và không có luồng xác thực. Nó không thực hiện lời gọi mạng và không gửi telemetry; trợ lý cục bộ duy nhất của nó đọc metadata git và môi trường. Không có gì liên quan đến repository của bạn rời khỏi máy của bạn.',
      },
      {
        title: 'Không phá hủy theo thiết kế',
        body: 'Hành động duy nhất liên quan đến bảo mật mà skill thực hiện là thay đổi repository của bạn — và nó hòa giải thay vì ghi đè. Nó phát hiện những gì tồn tại, đề xuất một kế hoạch và hỏi trước khi thay thế bất cứ thứ gì. Đầu ra của kế hoạch nằm trong thư mục .dwp/ được gitignore.',
      },
      {
        title: 'Không chạm vào bí mật',
        body: 'Phương pháp luận không bao giờ commit bí mật và giữ trạng thái làm việc ngoài kiểm soát phiên bản. Khởi tạo thêm vào .gitignore thay vì viết lại nó, và mọi thay đổi đều được thiết kế để xem xét trong các diff nhỏ, dễ đọc.',
      },
      {
        title: 'Nguồn gốc có thể xác minh',
        body: 'Mỗi bản phát hành công bố checksum cho skill được giao, để bạn có thể xác nhận một bản sao đã tải xuống khớp với những gì đã công bố trước khi tin tưởng nó.',
      },
    ],
    verifyTitle: 'Xác minh trước khi chạy',
    verifyIntro:
      'Hãy coi skill là không đáng tin cho đến khi bạn đã kiểm tra nó. Mỗi bản phát hành đính kèm một file SHA256SUMS bao gồm skill được giao. Tải xuống cho phiên bản bạn định cài đặt, rồi xác minh bản sao của bạn khớp — lối thoát khác không có nghĩa là một file không khớp và bạn nên dừng lại.',
    codeLabel: 'shell',
    verifyNote:
      'Các bản phát hành có checksum, không có chữ ký — ký (cosign hoặc GPG của người duy trì) là bước tiếp theo được ghi lại, không phải tuyên bố hiện tại. Vì mọi thứ đều mở, bạn cũng có thể so sánh bất kỳ file nào với repository tại tag của nó.',
    disclosureTitle: 'Báo cáo lỗ hổng',
    disclosureBody:
      'Tìm thấy vấn đề bảo mật? Báo cáo riêng tư qua tính năng báo cáo lỗ hổng bảo mật riêng tư của GitHub trên repository liên quan — skill hoặc trang web (xem các liên kết chính sách bảo mật bên dưới) — thay vì mở một issue công khai, vì điều đó sẽ phơi bày vấn đề trước khi có bản vá.',
    resourcesTitle: 'Tài nguyên tin tưởng',
    linkManifest: 'Manifest tin tưởng có thể đọc bằng máy',
    linkSecurityTxt: 'security.txt (RFC 9116)',
    linkPolicy: 'Chính sách bảo mật trang web',
    linkSkillPolicy: 'Chính sách bảo mật skill & mô hình mối đe dọa',
    limitationsTitle: 'Những hạn chế thành thật',
    limitations: [
      'Các bản phát hành có checksum, nhưng chưa được ký mật mã — ký được lên kế hoạch, chưa thực hiện.',
      'Deep Work Plan chạy một coding agent tự chủ đối với repository của bạn. Xem xét kế hoạch được đề xuất và các diff của nó; phương pháp luận được thiết kế cho việc xem xét đó, không phải để thay thế nó.',
      'Các tuyên bố tin tưởng ở đây chỉ mô tả các nguồn chính thức. Một bản sao đã bị sửa đổi hoặc của bên thứ ba đã trôi dạt khỏi các repository không mang theo bất kỳ đảm bảo nào trong số này — hãy xác minh trước.',
    ],
    ctaTitle: 'Áp dụng với sự tự tin',
    ctaBody:
      'Đọc phương pháp luận và đặc tả, trỏ một agent vào endpoint init và xác minh quá trình cài đặt trước khi bạn chạy nó.',
    ctaPrimary: 'Đọc phương pháp luận',
    ctaSecondary: 'Áp dụng (init)',
  },

  developersPage: {
    meta: {
      title:
        'Nhà phát triển — API agent, máy chủ MCP và tài liệu của Deep Work Plan',
      description:
        'Bề mặt agent của Deep Work Plan: API chỉ đọc, không cần xác thực kèm đặc tả OpenAPI, máy chủ MCP, Markdown theo từng trang bằng 17 ngôn ngữ, và CLI npx skills.',
    },
    eyebrow: 'Bề mặt agent và nhà phát triển',
    title: 'Deep Work Plan dành cho nhà phát triển và AI agent',
    intro:
      'deepworkplan.com cung cấp một bề mặt máy có thể đọc được song song với các trang của mình: API agent được mô tả bằng OpenAPI, máy chủ MCP không trạng thái, bản mirror Markdown gốc cho mọi trang bằng 17 ngôn ngữ, và skill DWP có thể cài đặt. Mọi thứ trên trang này đều trực tiếp công khai và miễn phí — không có gì phải đăng ký.',
    accessTitle: 'Không cần xác thực theo thiết kế',
    accessIntro:
      'Không có API key để tạo, không quy trình OAuth, và không có sandbox tách biệt khỏi sản xuất — chính bề mặt sản xuất là sandbox. Đây là một thuộc tính có chủ đích của phương pháp luận: agent không thể điền vào biểu mẫu "liên hệ bộ phận bán hàng", nên trang web không bao giờ yêu cầu điều đó.',
    accessPoints: [
      {
        title: 'Chỉ đọc',
        body: 'Mọi thao tác đều là GET an toàn, có thể lưu đệm — ngoại lệ duy nhất là endpoint MCP, dùng POST. Không có thao tác ghi, tải lên hay thay đổi trạng thái ở bất kỳ đâu.',
      },
      {
        title: 'Không cần API key',
        body: 'Không đăng ký, không token, không phân tầng giới hạn tốc độ. Truy cập ẩn danh là hợp đồng được tài liệu hóa, được khai báo trong /auth.md và các stub khám phá OAuth.',
      },
      {
        title: 'Miễn phí và mã nguồn mở',
        body: 'Nội dung trang web và skill DWP đều theo giấy phép MIT. Hãy dùng chúng trong công việc thương mại và phi thương mại mà không cần xin phép.',
      },
      {
        title: 'Máy trước',
        body: 'Lỗi JSON có cấu trúc trên các đường dẫn /api, phần thân khôi phục 404 bằng Markdown, danh mục API RFC 9727, và manifest năng lực ARD — được xây dựng cho agent tiêu thụ.',
      },
    ],
    endpointsTitle: 'Các endpoint',
    endpointsIntro:
      'Các endpoint cốt lõi của API agent. Đặc tả hoàn chỉnh, có kiểu — mọi thao tác, tham số và schema phản hồi — nằm trong tài liệu OpenAPI.',
    endpointsNote:
      'Các đường dẫn /api/* không xác định trả về lỗi JSON có cấu trúc kèm gợi ý giải quyết, không bao giờ trả về trang lỗi HTML.',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: 'Đặc tả OpenAPI 3.1 của toàn bộ API agent.',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          'Chỉ mục hướng dẫn LLM được tuyển chọn — điểm vào được khuyến nghị cho agent.',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          'Lời nhắc áp dụng DWP chính tắc (biến mọi repository thành AI-first).',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          'Bất kỳ trang nào dưới dạng Markdown nguồn gốc — bằng cả 17 ngôn ngữ (ví dụ /es/developers.md).',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description:
          'Dấu hiệu trạng thái tĩnh kèm liên kết đến đặc tả và cổng thông tin này.',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'Máy chủ MCP (Streamable HTTP, không trạng thái): initialize, ping, tools/list, tools/call.',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description:
          'Manifest năng lực ARD — agentmap được khai báo trong robots.txt.',
      },
    ],
    mcpTitle: 'Máy chủ MCP',
    mcpIntro:
      'Máy chủ Model Context Protocol không trạng thái qua Streamable HTTP. Ba công cụ chỉ đọc: get_init_prompt, list_site_sections, và read_page. Hỗ trợ phiên bản giao thức 2025-03-26 và 2025-06-18; không cần phiên làm việc.',
    mcpCodeLabel: 'Terminal — JSON-RPC qua HTTP',
    mcpNote:
      'Manifest MCP nằm tại /.well-known/mcp.json và thẻ máy chủ tại /.well-known/mcp/server-card.json. Claude, ChatGPT và bất kỳ client MCP nào cũng có thể gọi các công cụ này một cách tự nhiên.',
    markdownTitle: 'Markdown dành cho agent',
    markdownIntro:
      'Mỗi trang được kết xuất đều được xuất bản dưới dạng Markdown nguồn gốc — không phải chuyển đổi từ HTML. Hãy yêu cầu Markdown một cách tường minh bằng hậu tố URL hoặc qua đàm phán nội dung HTTP trên bất kỳ trang nào.',
    markdownCodeLabel: 'Terminal — đàm phán nội dung',
    markdownNote:
      'Đàm phán nội dung trả về đúng phần Markdown nguồn mà trang web dùng để kết xuất, bằng ngôn ngữ của URL bạn yêu cầu.',
    cliTitle: 'Cài đặt bộ kit',
    cliIntro:
      'Đường dẫn cài đặt chính thức cho skill Deep Work Plan — cùng một lệnh mà endpoint /init đưa cho agent. Nó hoạt động với bất kỳ coding agent tương thích skills nào (Claude Code, Cursor, Codex, Gemini và các agent khác).',
    cliCodeLabel: 'Terminal — skills CLI',
    cliNote:
      'Skill được vendor vào .agents/skills/deepworkplan/ bên trong repository của bạn, nên mọi agent chạm đến repo đều dùng chung một phương pháp luận.',
    resourcesTitle: 'Tài nguyên máy có thể đọc được',
    resources: [
      { label: 'Đặc tả OpenAPI (/openapi.json)', href: '/openapi.json' },
      {
        label: 'Tuyên bố truy cập và xác thực agent (/auth.md)',
        href: '/auth.md',
      },
      {
        label: 'Danh mục API, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'Manifest MCP (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'Liên hệ bảo mật (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'Bộ mô tả repo trang web (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'Trỏ một agent vào nó',
    ctaBody:
      'Con đường nhanh nhất vẫn là một dòng: đưa lời nhắc /init cho bất kỳ coding agent nào và nó sẽ cài skill, onboard repository của bạn, và bắt đầu hoàn thành deep work.',
    ctaPrimary: 'Mở lời nhắc /init',
    ctaSecondary: 'Đọc phương pháp luận',
  },

  privacyPage: {
    meta: {
      title: 'Quyền riêng tư — Deep Work Plan',
      description:
        'Chính sách quyền riêng tư của deepworkplan.com: trang tĩnh không tài khoản, không quảng cáo, phân tích không cookie, và biểu mẫu liên hệ thu thập đúng những gì.',
    },
    eyebrow: 'Chính sách quyền riêng tư',
    title: 'Quyền riêng tư trên deepworkplan.com',
    intro:
      'Deep Work Plan là một trang web tài liệu và phương pháp luận tĩnh. Trang này giải thích, một cách thẳng thắn và đầy đủ, dữ liệu nào trang web chạm đến khi bạn ghé thăm: không có hệ thống tài khoản, không quảng cáo, và không có theo dõi xuyên trang nào trong toàn bộ trang web.',
    lastUpdated: 'Ngày 8 tháng 9 năm 2026',
    sections: [
      {
        heading: 'Trang web này là gì',
        body: 'deepworkplan.com là một tập hợp các trang tĩnh được phục vụ qua CDN. Không có đăng nhập, không có cơ sở dữ liệu người dùng, và không có cách nào để trang web lưu hồ sơ cá nhân. Nội dung được phát triển trong các repository GitHub công khai dưới tổ chức DailybotHQ, và mọi thứ bạn đọc ở đây đều được phục vụ đúng như đã xây dựng.',
      },
      {
        heading: 'Phân tích',
        body: 'Trang web dùng Umami, một dịch vụ phân tích không cookie, đặt quyền riêng tư lên trước, để đếm lượt xem trang một cách tổng hợp. Umami không đặt cookie theo dõi và không xây hồ sơ xuyên trang. Vì các trình thu thập AI không chạy JavaScript, một hàm edge phía máy chủ còn ghi lại user agent và đường dẫn của các lượt ghé thăm bot tự động dưới dạng sự kiện phân tích ẩn danh — điều này nhận diện phần mềm thu thập (ví dụ "GPTBot đã ghé /init"), không bao giờ nhận diện khách truy cập là người.',
      },
      {
        heading: 'Cookie và bộ nhớ cục bộ',
        body: 'Trang web không đặt cookie theo dõi. Điều duy nhất được lưu trong trình duyệt của bạn là tùy chọn giao diện (chế độ sáng hoặc tối) giữ trong localStorage, vốn không bao giờ rời khỏi thiết bị của bạn và không được truyền đi đâu. Nếu bạn xóa bộ nhớ trình duyệt, trang web đơn giản quay về giao diện mặc định của hệ thống.',
      },
      {
        heading: 'Dịch vụ bên thứ ba',
        body: 'Việc lưu trữ và phân phối chạy trên Cloudflare Pages, vốn xử lý nhật ký yêu cầu và địa chỉ IP tại edge như một phần vận hành CDN và chặn lạm dụng, theo chính sách quyền riêng tư của chính Cloudflare. Phân tích tổng hợp chạy trên Umami (cloud.umami.is). Nếu bạn tự nguyện gửi biểu mẫu liên hệ, câu trả lời của bạn được gửi qua Google Forms đến đội ngũ của chúng tôi — đó là nơi duy nhất thông tin bạn gõ được thu thập, và nó chỉ được dùng để trả lời bạn.',
      },
      {
        heading: 'Những gì chúng tôi không làm',
        body: 'Chúng tôi không bán hay chia sẻ dữ liệu cá nhân, không chạy quảng cáo hay pixel tiếp thị lại, không lấy dấu vân tay trình duyệt, và không gửi email tiếp thị. Trang web không có đăng ký bản tin và không có telemetry nào vượt quá các phép đếm tổng hợp, không cookie đã mô tả ở trên.',
      },
      {
        heading: 'Lựa chọn của bạn',
        body: 'Vì phân tích ở đây mang tính tổng hợp và không dùng cookie, không có hồ sơ cá nhân nào để xuất hay xóa. Bạn có thể chặn tập lệnh phân tích bằng bất kỳ trình chặn nội dung nào mà không ảnh hưởng đến cách trang web hoạt động. Nếu bạn đã gửi biểu mẫu liên hệ và muốn xóa tin nhắn của mình, hãy viết đến địa chỉ liên hệ bên dưới và chúng tôi sẽ xóa nó.',
      },
      {
        heading: 'Thay đổi chính sách',
        body: 'Nếu chính sách này thay đổi đáng kể, ngày cập nhật ở đầu trang này thay đổi theo, và các chỉnh sửa thực chất được commit vào repository trang web công khai, nơi bất kỳ ai cũng có thể xem lại lịch sử.',
      },
    ],
    contactTitle: 'Liên hệ và bảo mật',
    contactBody:
      'Về câu hỏi quyền riêng tư, hãy viết đến security@dailybot.com. Để báo cáo lỗ hổng bảo mật, hãy ưu tiên tính năng báo cáo lỗ hổng riêng tư của GitHub cho các repository trang web và skill — xem /.well-known/security.txt để biết địa chỉ chính xác.',
  },
};
