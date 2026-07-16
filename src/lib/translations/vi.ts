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
    github: 'GitHub',
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
    badge: 'Mới',
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
        'Deep Work Plan biến mọi repository thành một môi trường có cấu trúc — ngữ cảnh, hàng rào bảo vệ và một kế hoạch bền vững — nơi bất kỳ agent lập trình nào cũng thực thi chính xác và hoàn thành công việc dài hơi.',
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
    },
    pitch: {
      kicker: 'Vấn đề và lời giải',
      problem:
        'Các agent lập trình AI hiệu quả đáng kinh ngạc trong những đợt ngắn. Với công việc dài hơi — một đợt di trú, một hệ thống con mới, một lần tái cấu trúc trải khắp hàng chục tệp — chúng trôi dạt: ngữ cảnh đầy lên, các quyết định bị quên đi và những tác vụ nhiều giờ bị bỏ dở giữa chừng.',
      answer:
        'Deep Work Plan trả lời bằng phát triển dựa trên đặc tả: kế hoạch là nguồn chân lý bền vững, và các agent thực thi dựa trên tiêu chí chấp nhận rõ ràng cùng các cổng kiểm chứng. Hiện tượng trôi dạt giảm xuống, công việc luôn kiểm chứng được, và bất kỳ agent nào cũng có thể tiếp tục nó qua nhiều phiên.',
      origin:
        'Đó cũng là kỹ thuật harness được làm cho dễ mang theo. Một harness agent là khung giàn quanh một mô hình — ngữ cảnh, công cụ, vòng điều khiển, hàng rào bảo vệ, trạng thái có thể tiếp tục — giúp nó đáng tin cậy. Deep Work Plan cài chính harness đó vào bản thân repository (AGENTS.md, tài liệu, thư mục skill .agents/, skill DWP), để mọi agent đều có thể điều khiển mọi repo. Ra đời tại Dailybot, được tôi luyện qua nhiều tháng, và phát hành dưới dạng DailybotHQ/deepworkplan-skill.',
      illustrationAlt:
        'Một hải đồ với một lộ trình duy nhất được vạch luồn lách an toàn qua các hiểm họa — bản khắc gợi hình ảnh kế hoạch như hướng đi giữ cho công việc đúng lộ trình.',
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
};
