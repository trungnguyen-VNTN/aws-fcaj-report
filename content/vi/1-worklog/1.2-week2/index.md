---
title: "Nhật ký tuần 2"
pre: "1.2."
weight: 2
status: "ready"
---

**Chủ đề:** IAM và kiểm soát truy cập

**Thời gian:** 21/09/2026 – 25/09/2026

### Mục tiêu tuần 2:

- Phân biệt user, role và policy.
- Áp dụng nguyên tắc quyền tối thiểu.

### Công việc thực hiện trong tuần:

| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Thứ Hai | Phân biệt user, role và policy | 21/09/2026 | 21/09/2026 | [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) |
| Thứ Ba | Đọc cấu trúc policy JSON và xác định phạm vi tài nguyên | 22/09/2026 | 22/09/2026 | [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) |
| Thứ Tư | Soạn policy chỉ cho phép một thao tác đọc | 23/09/2026 | 23/09/2026 | [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) |
| Thứ Năm | Kiểm tra thao tác được phép và bị từ chối trong môi trường lab | 24/09/2026 | 24/09/2026 | [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) |
| Thứ Sáu | Tổng hợp quyền tối thiểu, MFA và phiên tạm thời | 25/09/2026 | 25/09/2026 | [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) |

### Kết quả tuần 2:

- Hiểu role dùng cho dịch vụ và phiên tạm thời, user chỉ dùng khi thật cần; ưu tiên role thay cho access key.
- Đọc được các thành phần Effect, Action, Resource, Condition và cách Deny luôn thắng Allow.
- Viết policy chỉ cho phép `s3:GetObject` trên một bucket; thử ghi file thì bị AccessDenied đúng như mong đợi.
- Rút ra cách chia quyền thành hai mức đọc/triển khai, sau này áp dụng cho permission set `nutrition-plan` và `nutrition-apply` của dự án.
