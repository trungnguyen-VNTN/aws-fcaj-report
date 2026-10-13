# Hướng dẫn Thêm Nội dung Báo cáo FCAJ (HOW TO ADD CONTENT)

> **Dành cho Sinh viên thực tập First Cloud AI Journey (AWS FCAJ)**  
> Website này được thiết kế theo cơ chế **Content-Driven Architecture**: Bạn **chỉ cần thả file Markdown vào thư mục `content/`**, hệ thống sẽ tự động cập nhật Menu, Thanh điều hướng Prev/Next, Mục lục (TOC), Tìm kiếm toàn văn và Tiến độ hoàn thành mà **KHÔNG CẦN SỬA MỘT DÒNG CODE NÀO**.

---

## 1. Cấu hình Thông tin Sinh viên (Làm đầu tiên)

Mở file [`src/config/site.config.ts`](../src/config/site.config.ts) và điền thông tin thực tế của bạn thay thế cho các trường placeholder:

```ts
student: {
  fullName: "Nguyễn Văn A",
  phone: "0901234567",
  email: "anv@fpt.edu.vn",
  university: "Đại học FPT Cần Thơ",
  major: "Kỹ thuật Phần mềm (Software Engineering)",
  className: "SE1701",
  company: "Amazon Web Services (AWS) - First Cloud AI Journey",
  position: "Cloud & AI Solutions Architect Intern",
  internshipPeriod: "08/2025 - 11/2025 (12 Tuần)",
  avatar: "/images/student/avatar.png",
  mentor: "Anh/Chị Mentor FCAJ",
}
```

---

## 2. Cách Thêm Trang Báo cáo Mới

### 2.1 Cấu trúc thư mục song ngữ bắt buộc
Mỗi trang cần có cả 2 phiên bản `vi` (Tiếng Việt) và `en` (Tiếng Anh) tại cây thư mục tương ứng:

```text
content/
├── vi/
│   └── 5-workshop/
│       └── 5.3-network-security/
│           └── index.md
└── en/
    └── 5-workshop/
        └── 5.3-network-security/
            └── index.md
```

### 2.2 Tạo nhanh bằng lệnh tự động
Dùng lệnh scaffold được tích hợp sẵn:
```bash
# Tạo trang Worklog tuần 1
npm run new:page worklog-week 1-worklog/1.1-week1

# Tạo trang Proposal
npm run new:page proposal 2-proposal

# Tạo bài viết Blog
npm run new:page blog 3-blogs/3.1-blog1

# Tạo sự kiện tham gia
npm run new:page event 4-events/4.1-event1

# Tạo bước thực hành Workshop
npm run new:page workshop-step 5-workshop/5.3-network-security
```

---

## 3. Cấu trúc Front Matter trong file Markdown

Mỗi file Markdown bắt đầu bằng khối YAML Front Matter ở đầu file:

```markdown
---
title: "5.3 Hạ tầng Mạng VPC & Bảo mật"
weight: 3
pre: "5.3."
description: "Thiết kế và cấu hình VPC, Private Subnets, NAT Gateways và mã hóa KMS."
status: "ready"
---
```

- `title`: Tiêu đề hiển thị trên thanh tiêu đề và menu.
- `pre`: Tiền tố số mục (ví dụ: `"1.1."`, `"5.3."`).
- `description`: Đoạn mô tả ngắn tóm tắt nội dung trang.
- `status`: 
  - `"draft"`: Trang đang viết nháp (hiển thị badge cảnh báo).
  - `"ready"`: Đã hoàn thiện nội dung (tính vào thanh tiến độ báo cáo).

---

## 4. Sử dụng Shortcodes & Directives

Website hỗ trợ các khối shortcode chuyên nghiệp để bài báo cáo chuẩn đẹp:

### 4.1 Khối Chú ý (Notice)
```markdown
:::notice{type="note"}
Ghi chú thông tin phụ.
:::

:::notice{type="info"}
Thông tin quan trọng cần lưu ý.
:::

:::notice{type="tip"}
Mẹo hay tối ưu hóa hoặc mẹo thao tác nhanh trên AWS Console.
:::

:::notice{type="warning"}
Cảnh báo bảo mật hoặc lưu ý tránh phát sinh chi phí.
:::
```

### 4.2 Khối Cần điền (TODO Block)
Dùng để đánh dấu các mục bạn cần viết tiếp:
```markdown
:::todo[Nội dung cần viết]
Cần thêm ảnh chụp màn hình VPC sau khi tạo trên AWS Console.
:::
```
> ⚠️ **Lưu ý:** Lệnh `npm run build:release` sẽ tự động chặn không cho nộp bài nếu còn khối `:::todo`.

### 4.3 Khung hiển thị Hình ảnh & Sơ đồ kiến trúc (Figure & Lightbox)
Đặt ảnh vào thư mục `public/images/...` và gọi:
```markdown
:::figure{src="/images/workshop/vpc-architecture.png" alt="Sơ đồ phân bổ Subnets trong VPC" caption="Hình 1: Cấu trúc 2 Public Subnets và 2 Private Subnets"}
```
*(Người đọc có thể nhấp vào ảnh để mở popup phóng to/thu nhỏ pan & zoom)*.

### 4.4 Khối Code có nút Sao chép & Số dòng
````markdown
```bash
# Cấu hình AWS CLI với credentials
aws configure --profile fcaj-intern
```
````

---

## 5. Quy định Bắt buộc để Tránh bị Trừ điểm FCAJ

| Quy định | Cách thực hiện đúng |
|---|---|
| **Sơ đồ Kiến trúc** | **Bắt buộc tự vẽ trên Draw.io** bằng bộ icon chính thức của AWS. Không được dùng AI tạo 100%. Đặt ảnh vào `public/images/architecture/` |
| **Bảng Chi phí (COST)** | Bắt buộc có mục *Cost / Chi phí* trong Proposal và Workshop (5.11-cost) kèm bảng số liệu rõ ràng cho Demo và Production |
| **Sự kiện (Events)** | Bắt buộc có **ảnh check-in rõ mặt** của bạn tại sự kiện (tối thiểu 3 sự kiện) |
| **Worklog** | Đủ 12 tuần với bảng công việc hàng ngày (*Day, Task, Start, End, Reference*) |
| **Bảo mật** | Tuyệt đối **không đưa Access Key (AKIA...), Private Key hoặc Mật khẩu** vào file Markdown |

---

## 6. Kiểm tra & Triển khai (Deploy)

### 6.1 Kiểm tra trước khi nộp bài
```bash
# Kiểm tra danh sách các mục TODO còn sót lại
npm run todo:list

# Chạy script kiểm tra chuẩn FCAJ (cảnh báo ở chế độ dev)
npm run check

# Chạy kiểm tra nghiêm ngặt (Release Gate)
npm run build:release
```

### 6.2 Triển khai lên GitHub Pages
1. Tạo kho lưu trữ (repository) trên GitHub.
2. Đẩy toàn bộ mã nguồn lên nhánh `main`.
3. Vào **Settings** > **Pages** trên GitHub:
   - Mục **Source**: Chọn **GitHub Actions**.
4. GitHub Actions sẽ tự động chạy workflow `.github/workflows/deploy.yml` để kiểm tra và phát hành website của bạn!
