# Đóng góp cho báo cáo

Các thay đổi có thể là sửa nội dung, bổ sung minh chứng hoặc khắc phục lỗi website.
Mở issue nếu cần thảo luận phạm vi trước khi bắt đầu.

## Chuẩn bị

```bash
npm ci
npm run dev
```

Đọc [hướng dẫn nội dung](docs/HOW_TO_ADD_CONTENT.md) trước khi thêm trang. Chỉnh cả
`content/vi/` và `content/en/` cho cùng đường dẫn, giữ cấu trúc heading tương ứng.

## Nội dung và minh chứng

- Giữ cách diễn đạt kỹ thuật rõ ràng và ghi nguồn cho các số liệu.
- Dùng TODO cho thông tin chưa được xác nhận. Chỉ đặt trang ở trạng thái `ready`
  khi nội dung đã hoàn thiện và không còn TODO.
- Đặt ảnh công khai trong `public/images/`. Che định danh, thông tin đăng nhập và
  dữ liệu cá nhân trong ảnh minh chứng.
- Cập nhật `reportManifest` khi thêm hoặc đổi đường dẫn trong menu.

## Kiểm tra thay đổi

```bash
npm run check
npm test
npm run build
```

Mở trang đã sửa bằng cả hai ngôn ngữ. Nếu sửa giao diện, kiểm tra trên màn hình nhỏ
và lớn, cùng chế độ sáng/tối. Trong pull request, ghi các bước đã kiểm tra và phần
còn cần xác minh.

## Gửi pull request

Tạo nhánh mô tả ngắn nội dung thay đổi, commit với thông điệp rõ ràng và mở PR vào
`main`. CI sẽ kiểm tra nội dung, test và production build. Chủ repo quản lý việc
merge và triển khai Vercel.
