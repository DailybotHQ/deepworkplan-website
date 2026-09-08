---
title: "Nhà phát triển — API agent của Deep Work Plan"
description: "Bề mặt agent của deepworkplan.com dành cho nhà phát triển và AI agent: API chỉ đọc, không cần xác thực được mô tả bằng đặc tả OpenAPI, máy chủ MCP không trạng thái tại /api/mcp, Markdown theo từng trang bằng 17 ngôn ngữ, và CLI cài đặt npx skills."
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
| POST | `/api/mcp` | Máy chủ MCP (Streamable HTTP, không trạng thái). |
| GET | `/.well-known/ai-catalog.json` | Manifest năng lực ARD (agentmap). |

Các đường dẫn `/api/*` không xác định trả về lỗi JSON có cấu trúc kèm gợi ý giải quyết, không bao giờ trả về trang lỗi HTML.

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
npx skills add DailybotHQ/deepworkplan-skill@latest
```

Skill được vendor vào `.agents/skills/deepworkplan/` bên trong repository của bạn, nên mọi agent chạm đến repo đều dùng chung một phương pháp luận.

## Tài nguyên máy có thể đọc được

- [Đặc tả OpenAPI](https://deepworkplan.com/openapi.json)
- [Tuyên bố truy cập và xác thực agent](https://deepworkplan.com/auth.md)
- [Danh mục API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Manifest MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Liên hệ bảo mật](https://deepworkplan.com/.well-known/security.txt)
- [Bộ mô tả repo trang web](https://deepworkplan.com/.well-known/dwp.json)
