---
title: "Nhật ký tuần 7"
pre: "1.7."
weight: 7
status: "ready"
---

**Chủ đề:** Khởi tạo dự án và khung ứng dụng

**Thời gian:** 26/10/2026 – 30/10/2026

### Mục tiêu tuần 7:

- Chốt phạm vi MVP và kiến trúc ban đầu.
- Dựng khung backend, frontend và đăng nhập.

### Công việc thực hiện trong tuần:

| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Thứ Hai | Phân tích yêu cầu, chốt phạm vi MVP (catalog, tài khoản, giỏ, đơn, AI chỉ đọc) | 26/10/2026 | 26/10/2026 | [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) |
| Thứ Ba | Thiết kế CSDL sơ bộ (sản phẩm, dinh dưỡng, dị ứng, đơn hàng) và API contract | 27/10/2026 | 27/10/2026 | [Flyway](https://documentation.red-gate.com/flyway) |
| Thứ Tư | Thiết kế kiến trúc AWS ban đầu: CloudFront, ALB, ECS Fargate, RDS, Cognito | 28/10/2026 | 28/10/2026 | [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) |
| Thứ Năm | Khởi tạo repo; API catalog với PostgreSQL và Flyway; Cognito user pool và nhóm; khung frontend | 29/10/2026 | 29/10/2026 | [Spring Boot](https://docs.spring.io/spring-boot/index.html) |
| Thứ Sáu | Nối bộ lọc và trang chi tiết với API; giỏ hàng, đặt hàng; script START/STOP chạy local | 30/10/2026 | 30/10/2026 | [React](https://react.dev/learn) |

### Kết quả tuần 7:

- Chốt phạm vi MVP và các nguyên tắc bất biến: danh tính chỉ lấy từ JWT, AI chỉ đọc, sản phẩm thiếu dữ liệu bị loại khi lọc (fail-closed).
- Repo có backend Spring Boot (Java 21) với Flyway, frontend React + TypeScript và Cognito với hai nhóm USER/ADMIN.
- Luồng mua hàng cơ bản chạy được trên máy: xem sản phẩm, lọc, thêm giỏ, đặt hàng.
- Chạy toàn bộ ứng dụng local bằng một lệnh `START.bat`.
