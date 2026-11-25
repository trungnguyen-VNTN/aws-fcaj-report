---
title: "Nhật ký tuần 10"
pre: "1.10."
weight: 10
status: "ready"
---

**Chủ đề:** Hoàn thiện tính năng và xác minh

**Thời gian:** 16/11/2026 – 20/11/2026

### Mục tiêu tuần 10:

- Mở rộng catalog, thêm thanh toán sandbox và hồ sơ dinh dưỡng.
- Đưa AI sang Tokyo và hoàn thiện kiểm thử, giám sát.

### Công việc thực hiện trong tuần:

| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Thứ Hai | Catalog 152 sản phẩm, nhãn chế độ ăn, công cụ phân tích bữa ăn; thanh toán VNPAY sandbox | 16/11/2026 | 16/11/2026 | [USDA FoodData Central](https://fdc.nal.usda.gov/api-guide) |
| Thứ Ba | Làm mới giao diện (UI Lab): token màu, thẻ sản phẩm, banner trang chủ | 17/11/2026 | 17/11/2026 | [React](https://react.dev/learn) |
| Thứ Tư | Chuyển lời gọi Bedrock và Guardrail sang Tokyo (D18); viết hướng dẫn chạy dự án | 18/11/2026 | 18/11/2026 | [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html) |
| Thứ Năm | Nhật ký thanh toán VNPAY cho admin (D30); cập nhật kiểm thử E2E với Playwright | 19/11/2026 | 19/11/2026 | [VNPAY Sandbox](https://sandbox.vnpayment.vn/apis/docs/gioi-thieu/) |
| Thứ Sáu | Chọn Nova 2 Lite; CloudTrail, ALB access log, S3 endpoint, WAF tùy chọn (D29); cuối tuần: hồ sơ và gợi ý bữa ăn (D32) | 20/11/2026 | 20/11/2026 | [AWS CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html) |

### Kết quả tuần 10:

- Catalog 152 sản phẩm trong 11 danh mục; lọc theo 9 nhóm chất gây dị ứng và 6 nhãn chế độ ăn.
- Thanh toán VNPAY sandbox với IPN kiểm chữ ký HMAC-SHA512; admin xem được nhật ký thanh toán.
- AI chạy Nova 2 Lite ở Tokyo với Guardrails; bộ đánh giá 45 câu đạt an toàn 17/17, tra cứu 27/28.
- Kiểm thử ngày 21/11: backend 86, frontend 145, E2E + axe 57 đều đạt; có CloudTrail và log ALB để kiểm toán.
