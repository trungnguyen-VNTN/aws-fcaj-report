# Triển khai website báo cáo

Production hiện tại là [aws-fcaj-report.vercel.app](https://aws-fcaj-report.vercel.app).

[Mở báo cáo tiếng Việt](https://aws-fcaj-report.vercel.app/vi) ·
[Open the English report](https://aws-fcaj-report.vercel.app/en)

Repository liên kết với project Vercel `aws-fcaj-report`.

## GitHub và Vercel

Workflow [Verify report](../.github/workflows/ci.yml) chạy content check, test và
build trên nhánh `main` hoặc pull request. Vercel Git integration được liên kết với
repository và dùng `main` làm production branch. Kiểm tra GitHub Actions và Vercel
Deployments để xem kết quả từng lần phát hành; đây là hai tiến trình riêng.

Cấu hình [vercel.json](../vercel.json) chỉ định:

- Framework Vite, output `dist/`.
- Build command `VITE_BASE_PATH=/ npm run build` trên môi trường build Vercel.
- Rewrite các route tài liệu về `index.html` để hỗ trợ truy cập trực tiếp.

## Phát hành bằng CLI

Từ gốc repo, kiểm tra trước khi phát hành:

```bash
npm run check
npm test
npm run build
```

Đăng nhập một lần vào tài khoản có quyền quản lý project rồi deploy:

```bash
npx vercel login
npx vercel deploy --prod
```

Nếu thư mục đã được liên kết với project và không cần bước hỏi tương tác:

```bash
npx vercel deploy --prod --yes
```

CLI lưu liên kết tại `.vercel/`, được loại khỏi Git. `.vercelignore` loại cache,
dependency local và tài liệu biên tập khỏi nội dung tải lên. Vercel cài dependency
và build lại từ mã nguồn đã gửi.

## Xác minh sau deploy

1. Chờ deployment chuyển sang `Ready` và production alias được cập nhật.
2. Mở trang chủ bằng truy cập công khai.
3. Mở trực tiếp một route sâu như `/vi/5-workshop/5.3-core-infra/5.3.1-network`.
4. Kiểm tra CSS, JavaScript, ảnh và chuyển ngôn ngữ.
5. Nếu sửa giao diện, thử cả light/dark mode và màn hình nhỏ.

## Xử lý lỗi thường gặp

| Hiện tượng | Kiểm tra |
| --- | --- |
| Trang con bị trắng khi tải lại | Build dùng `VITE_BASE_PATH=/`; asset phải có đường dẫn `/assets/...` |
| Route sâu trả 404 | Rewrite trong `vercel.json` và deployment đang phục vụ đúng cấu hình |
| Nội dung vẫn là bản cũ | Deployment/commit hiện tại trên Vercel; tải lại trang bằng Ctrl + F5 |
| GitHub Actions đỏ | Bước lỗi trong workflow; chạy lại cùng lệnh tại local |
| Ảnh minh chứng chưa hiện | File trong `public/images/` và đường dẫn figure; placeholder TODO có thể đang chờ ảnh |

## Nội dung đang hoàn thiện

Deployment thông thường cho phép các trang draft/TODO hiển thị công khai để tiếp
tục bổ sung. `build:release` dành cho bản báo cáo đã hoàn thiện. Xem
`npm run todo:list` trước khi chuẩn bị bản nộp.
