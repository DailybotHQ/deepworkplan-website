---
title: "Nhà phát triển — API agent của Deep Work Plan"
description: "Bề mặt agent của Deep Work Plan: API có phiên bản, chỉ đọc, không cần xác thực, với OpenAPI, máy chủ MCP và Markdown theo từng trang bằng 17 ngôn ngữ."
---

## Không cần xác thực theo thiết kế

Không có API key để tạo, không quy trình OAuth, và không có sandbox tách biệt khỏi sản xuất — chính bề mặt sản xuất là sandbox. Đây là một thuộc tính có chủ đích của phương pháp luận: agent không thể điền vào biểu mẫu "liên hệ bộ phận bán hàng", nên trang web không bao giờ yêu cầu điều đó.

- **Chỉ đọc** — mọi thao tác đều là GET an toàn, có thể lưu đệm, ngoại lệ duy nhất là endpoint MCP (POST). Không có thao tác ghi nào tồn tại ở bất kỳ đâu.
- **Không cần API key** — không đăng ký, token hay phân tầng giới hạn tốc độ. Truy cập ẩn danh là hợp đồng được tài liệu hóa, khai báo trong [/auth.md](https://deepworkplan.com/auth.md).
- **Miễn phí và mã nguồn mở** — nội dung trang web và skill DWP đều theo giấy phép MIT.
- **Máy trước** — lỗi JSON có cấu trúc trên `/api/*`, phần thân khôi phục 404 bằng Markdown, danh mục API RFC 9727, và manifest năng lực ARD.

## Các endpoint

| Phương thức | Đường dẫn | Mục đích |
|--------|------|---------|
| GET | `/openapi.json` | Đặc tả OpenAPI 3.1 của toàn bộ API agent. |
| GET | `/llms.txt` | Chỉ mục hướng dẫn LLM được tuyển chọn — điểm vào được khuyến nghị. |
| GET | `/init.md` | Lời nhắc áp dụng DWP chính tắc. |
| GET | `/{page}.md` | Bất kỳ trang nào dưới dạng Markdown nguồn, bằng cả 17 ngôn ngữ. |
| GET | `/api/health.json` | Dấu hiệu trạng thái tĩnh. |
| GET | `/api/v1/index.json` | Danh mục có phiên bản của họ v1: đường dẫn endpoint, phiên bản trang web và liên kết đến đặc tả. |
| GET | `/api/v1/sections.json` | Sơ đồ trang web ở dạng JSON có kiểu — tên, đường dẫn và mô tả cho từng phần. |
| GET | `/api/v1/pages.json` | Mọi endpoint Markdown bằng mọi ngôn ngữ, được nhóm theo mã ngôn ngữ. |
| GET | `/api/v1/health.json` | Dấu hiệu tình trạng có phiên bản — bản phản chiếu v1 của `/api/health.json`. |
| POST | `/api/mcp` | Máy chủ MCP (Streamable HTTP, không trạng thái). |
| GET | `/.well-known/ai-catalog.json` | Manifest năng lực ARD (agentmap). |

Các đường dẫn `/api/*` không xác định trả về lỗi JSON có cấu trúc kèm gợi ý giải quyết, không bao giờ trả về trang lỗi HTML.

## Quản lý phiên bản và đánh dấu lỗi thời

Họ JSON có phiên bản nằm dưới `/api/v1/` — index, sections, pages và health — và các đường dẫn chính thức không có phiên bản (`/llms.txt`, `/{page}.md`, `/api/mcp`) thuộc cùng hợp đồng v1. Các thay đổi phá vỡ tương thích chỉ xuất hiện trong họ `/api/v{N+1}/` mới, không bao giờ trong v1. Khi một endpoint bị đánh dấu lỗi thời, phản hồi của nó mang `Deprecation: true` và ngày `Sunset` ít nhất 180 ngày trước khi gỡ bỏ, và header `Link` chỉ đến phần thay thế.

## Giới hạn tốc độ

Phản hồi trên `/api/*` mang các header giới hạn tốc độ RFC 9331 — `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` và `RateLimit-Policy` — để agent có thể tự điều chỉnh tốc độ theo thời gian thực; phản hồi `429` bổ sung `Retry-After`. Việc áp dụng là tốt nhất có thể ở biên (120 yêu cầu mỗi 60 giây mỗi khách truy cập) và quyền truy cập vẫn ẩn danh: không khóa, không đăng ký, không phân tầng.

## Máy chủ MCP

Máy chủ Model Context Protocol không trạng thái qua Streamable HTTP tại `https://deepworkplan.com/api/mcp`. Ba công cụ chỉ đọc:

- `get_init_prompt` — lời nhắc áp dụng /init.md chính tắc.
- `list_site_sections` — sơ đồ trang web kèm mô tả một dòng.
- `read_page` — bất kỳ trang nào dưới dạng Markdown nguồn gốc, ví dụ `/init` hoặc `/es/methodology/01-manifesto`.

```bash
curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize",
       "params":{"protocolVersion":"2025-06-18","capabilities":{},
                 "clientInfo":{"name":"curl","version":"1.0"}}}'

curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'

curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call",
       "params":{"name":"read_page","arguments":{"path":"/init"}}}'
```

Hỗ trợ phiên bản giao thức 2025-03-26 và 2025-06-18; không cần phiên làm việc. Manifest: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json). Thẻ máy chủ: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json).

## Markdown dành cho agent

Mỗi trang được kết xuất đều được xuất bản dưới dạng Markdown nguồn gốc — không phải chuyển đổi từ HTML:

```bash
# Đàm phán nội dung trên bất kỳ URL nào
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# Hoặc lấy trực tiếp bản mirror .md — mọi trang, mọi ngôn ngữ
curl -s https://deepworkplan.com/es/developers.md
```

## Cài đặt bộ kit

Đường dẫn cài đặt chính thức cho skill Deep Work Plan — cùng một lệnh mà endpoint /init đưa cho agent. Nó hoạt động với bất kỳ coding agent tương thích skills nào (Claude Code, Cursor, Codex, Gemini và các agent khác):

```bash
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

Skill được vendor vào `.agents/skills/deepworkplan/` bên trong repository của bạn, nên mọi agent chạm đến repo đều dùng chung một phương pháp luận. CLI chính thức `deepworkplan` — một ứng dụng khách không phụ thuộc trên cùng API này (`init`, `sections`, `read`, `open`, `mcp`) — đã sẵn sàng cho npm và nằm trong thư mục [cli/](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) của repository trang web cho đến khi xuất bản.

## Tài nguyên máy có thể đọc được

- [Đặc tả OpenAPI](https://deepworkplan.com/openapi.json)
- [Tuyên bố truy cập và xác thực agent](https://deepworkplan.com/auth.md)
- [Danh mục API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Manifest MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Liên hệ bảo mật](https://deepworkplan.com/.well-known/security.txt)
- [Bộ mô tả repo trang web](https://deepworkplan.com/.well-known/dwp.json)
