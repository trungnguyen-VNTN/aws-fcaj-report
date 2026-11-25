---
title: "Nhật ký tuần 8"
pre: "1.8."
weight: 8
status: "ready"
---

**Chủ đề:** Thiết kế lại giao diện

**Thời gian:** 02/11/2026 – 06/11/2026

### Mục tiêu tuần 8:

- Chuẩn hóa quy trình CI và tài liệu repo.
- Thiết kế lại toàn bộ giao diện theo phong cách nhãn dinh dưỡng.

### Công việc thực hiện trong tuần:

| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Thứ Hai | Tách bước CI, thêm template PR/issue, README, giấy phép; chốt ALB công khai sau CloudFront | 02/11/2026 | 02/11/2026 | [GitHub Actions](https://docs.github.com/actions) |
| Thứ Ba | Chọn hướng thiết kế "Nutrition Label" (D11); nền tảng giao diện mới và app shell, icon Phosphor | 03/11/2026 | 03/11/2026 | [React](https://react.dev/learn) |
| Thứ Tư | Rà soát trợ năng (D13): tương phản, focus, bàn phím; thanh tab cho mobile | 04/11/2026 | 04/11/2026 | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) |
| Thứ Năm | Component dùng chung hiển thị dinh dưỡng fail-closed; tách trang admin thành các phần nhỏ | 05/11/2026 | 05/11/2026 | [React](https://react.dev/learn) |
| Thứ Sáu | Dựng lại trang chủ, sản phẩm, chi tiết, đăng nhập, giỏ, thanh toán, đơn, chat và admin | 06/11/2026 | 06/11/2026 | [React](https://react.dev/learn) |

### Kết quả tuần 8:

- CI chạy kiểm tra riêng cho backend và frontend ở mỗi pull request.
- Toàn bộ trang được dựng lại theo phong cách nhãn dinh dưỡng, thống nhất màu, chữ và icon.
- Giao diện đạt các yêu cầu trợ năng cơ bản (tương phản, focus, thao tác bằng bàn phím) và dùng tốt trên điện thoại.
- Sản phẩm thiếu số liệu hiển thị rõ "chưa có dữ liệu" thay vì số 0.
