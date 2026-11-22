# Biên tập nội dung báo cáo

Website đọc Markdown trong `content/vi/` và `content/en/`. Menu khai báo tại
[`src/config/structure.ts`](../src/config/structure.ts); thêm tệp Markdown sẽ nạp nội
dung, còn thêm mục vào menu cần cập nhật `reportManifest`.

## Chỉnh một trang hiện có

1. Tìm cặp `index.md` ở cùng đường dẫn trong hai thư mục ngôn ngữ.
2. Sửa nội dung, giữ cấp heading tương ứng giữa tiếng Việt và tiếng Anh.
3. Đặt `status: "draft"` khi còn TODO hoặc nội dung đang xác minh.
4. Chỉ đặt `status: "ready"` sau khi nội dung hoàn thiện và không còn TODO.
5. Mở trang ở cả hai ngôn ngữ rồi chạy các bước kiểm tra bên dưới.

Ví dụ một trang đang có:

```text
content/vi/5-workshop/5.3-core-infra/5.3.1-network/index.md
content/en/5-workshop/5.3-core-infra/5.3.1-network/index.md
```

## Tạo một trang mới

```bash
npm run new:page -- workshop-step 5-workshop/5.3-core-infra/5.3.4-example
```

Lệnh tạo hai tệp từ template và giữ nguyên tệp đã tồn tại. Đọc lại mẫu trước khi dùng
vì ví dụ trong template cần được thay bằng nội dung đã xác minh. Thêm trang vào đúng
`children` trong `reportManifest`, gồm `id`, `path`, `pre` và `title.vi`/`title.en`.
Sidebar hiển thị cây này, còn breadcrumb và prev/next dùng cùng manifest.

## Front matter và heading

```markdown
---
title: "Tạo mạng VPC"
weight: 1
pre: "5.3.1."
status: "draft"
---

#### Nội dung

Viết hướng dẫn từ cấu hình hoặc mã nguồn có thể đối chiếu.
```

Thông tin website và hồ sơ nằm tại
[`src/config/site.config.ts`](../src/config/site.config.ts).

## Notice, TODO và figure

```markdown
:::notice{type="info"}
Ghi chú cho bước thực hành.
:::

:::todo[Cần chụp ảnh]
VPC → Your VPCs → Resource map: chụp sơ đồ mạng và che định danh tài khoản.
:::

:::figure{src="/images/workshop/network.png" alt="Sơ đồ mạng" caption="Sơ đồ từ môi trường thực hành"}
```

Lưu ảnh tại `public/images/`. Đường dẫn trong `src` bắt đầu bằng `/images/`.
Figure hỗ trợ mở ảnh lớn. Với đoạn mã, dùng fenced code block và tên ngôn ngữ như
`hcl`, `powershell`, `java` hoặc `typescript`.

## Nguồn và minh chứng

Nội dung kỹ thuật của ứng dụng được đối chiếu với
[`nutrition-ecommerce`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce).
Ghi đường dẫn file nguồn khi trích cấu hình. Số liệu kiểm thử, chi phí và thời gian
vận hành cần có ngày đo. Thông tin cá nhân, sự kiện và minh chứng chưa có dữ liệu
được giữ dưới dạng TODO.

Ảnh kiến trúc tổng thể hiện là bản tham khảo; TODO Draw.io ghi yêu cầu vẽ lại bằng
bộ icon AWS chính thức. Các ảnh Console chưa được cung cấp có placeholder riêng.
Che account ID, ARN, access key, token, mật khẩu và dữ liệu cá nhân khi thêm ảnh.

## Kiểm tra

```bash
npm run todo:list
npm run check
npm test
npm run build
```

`check` kiểm tra cặp trang, mục chi phí và một số mẫu bí mật. Khi còn draft/TODO,
chế độ phát triển phát cảnh báo. Mục chi phí được kiểm tra tại `2-proposal` và
`5-workshop/5.6-monitoring-cost/5.6.3-cost`.

`npm run build:release` dành cho bản hoàn chỉnh và sẽ thất bại nếu còn draft/TODO.
Trạng thái kiểm tra tự động cần được xem cùng việc đọc lại nội dung và kiểm tra ảnh.

Xem [hướng dẫn triển khai](DEPLOYMENT.md) để đưa thay đổi lên Vercel.
