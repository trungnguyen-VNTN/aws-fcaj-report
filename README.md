# AWS First Cloud AI Journey (FCAJ) — Report Website Framework

> 🇻🇳 **Website Báo Cáo Thực Tập & Workshop FCAJ bằng React**  
> 🇬🇧 **AWS FCAJ Internship & Technical Workshop Documentation Platform**

---

## 🇻🇳 Tiếng Việt

Website khung hoàn chỉnh dành cho sinh viên thực tập **First Cloud AI Journey (FCAJ)** của Amazon Web Services (AWS), xây dựng bằng **React 18, TypeScript, Tailwind CSS và Vite**. 

### 🌟 Đặc điểm nổi bật
1. **Content-Driven:** Thêm nội dung bằng cách thả file Markdown vào `content/vi/...` và `content/en/...`. Menu, thanh điều hướng, tìm kiếm toàn văn, TOC scroll-spy và tiến độ tự động cập nhật mà **không cần sửa bất kỳ dòng code nào**.
2. **Giao diện hiện đại & Bản sắc Cloud/AWS:** Bảng màu xanh navy sâu (`#0F1B2D`), cam AWS (`#FF9900`) và xanh ngọc (`#00A4BD`), tương phản đạt chuẩn WCAG AA, dark/light theme mượt mà không nháy, font tiếng Việt *Be Vietnam Pro* và font code *JetBrains Mono* tự host.
3. **Bảo vệ điểm chấm FCAJ:** 
   - Đủ 7 phần bắt buộc: Worklog 12 tuần, Proposal, 3 Blogs, 3 Events (ô ảnh check-in rõ mặt), Workshop 5.1–5.14, Self-evaluation (8 tiêu chí), Sharing & Feedback.
   - Sẵn sàng ô hiển thị sơ đồ kiến trúc tự vẽ (Draw.io), bảng chi phí AWS Pricing Calculator (Cost Table).
   - Script tự động `npm run check` kiểm tra tính đồng bộ song ngữ, cảnh báo thiếu ảnh/link và quét bí mật (secret scan).
4. **Command Palette Tìm kiếm (`Ctrl/Cmd + K`):** Tìm kiếm tức thì theo từng ngôn ngữ.
5. **Triển khai tự động:** GitHub Actions tích hợp sẵn lên GitHub Pages, hỗ trợ deep-linking và reload không bị lỗi 404.

### 🚀 Bắt đầu nhanh
```bash
# 1. Cài đặt thư viện
npm install

# 2. Khởi chạy môi trường phát triển local
npm run dev

# 3. Chạy kiểm thử tự động
npm test

# 4. Kiểm tra tiêu chuẩn báo cáo
npm run check

# 5. Xem danh sách các mục TODO còn cần điền
npm run todo:list

# 6. Tạo trang mới từ template
npm run new:page workshop-step 5-workshop/5.3-network-security

# 7. Kiểm tra nghiêm ngặt trước khi nộp bài & đóng gói
npm run build:release
```

Xem hướng dẫn chi tiết tại [`docs/HOW_TO_ADD_CONTENT.md`](docs/HOW_TO_ADD_CONTENT.md).

---

## 🇬🇧 English

Comprehensive documentation framework designed for **AWS First Cloud AI Journey (FCAJ)** interns, powered by **React 18, TypeScript, Tailwind CSS, and Vite**.

### 🌟 Key Highlights
- **Content-Driven:** Simply drop Markdown files into `content/en/...` and `content/vi/...`. Navbars, tree menus, search index, table of contents, and completion meters update automatically without code edits.
- **AWS Design System:** Tailored deep navy palette (`#0F1B2D`), AWS Smile accent (`#FF9900`), and teal highlights (`#00A4BD`), with instant light/dark mode toggling and self-hosted Vietnamese typography.
- **Rubric Guardrails:** Pre-configured with all 7 mandated FCAJ sections (12-Week Worklog, Proposal, 3 Blogs, 3 Events with face check-ins, 14 Workshop modules, Self-Evaluation matrix, Feedback).
- **Fast Full-Text Search:** In-memory MiniSearch command palette invoked via `Ctrl/Cmd + K`.
- **Zero-Config Deployment:** Ready-to-go GitHub Actions workflow for GitHub Pages with SPA deep-linking and reload support.

### 🛠️ Scripts Reference
| Command | Description |
|---|---|
| `npm run dev` | Starts Vite local development server on `http://localhost:3000` |
| `npm run build` | Compiles TypeScript and bundles production assets into `dist/` |
| `npm run build:release` | Runs strict FCAJ rubric checks before generating production build |
| `npm test` | Executes Vitest unit tests |
| `npm run check` | Validates bilingual parity, cost headings, and security scans |
| `npm run todo:list` | Prints active `:::todo` markdown blocks |
| `npm run new:page` | Scaffolds new bilingual pages from heading templates |

---

## 👤 Cấu hình Thông tin Sinh viên (Student Profile)
Tất cả thông tin cá nhân và đường dẫn mạng xã hội được quản lý tập trung tại:  
👉 [`src/config/site.config.ts`](src/config/site.config.ts)
