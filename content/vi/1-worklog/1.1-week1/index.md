---
title: "Nhật ký tuần 1"
pre: "1.1."
weight: 1
status: "ready"
---

**Chủ đề:** Nền tảng AWS và AWS CLI

**Thời gian:** 14/09/2026 – 18/09/2026

### Mục tiêu tuần 1:

- Hiểu hạ tầng toàn cầu của AWS và mô hình trách nhiệm chung.
- Cài đặt AWS CLI với phiên đăng nhập tạm thời.

### Công việc thực hiện trong tuần:

| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Thứ Hai | Phân biệt Region, Availability Zone và edge location | 14/09/2026 | 14/09/2026 | [AWS global infrastructure](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html) |
| Thứ Ba | Xác định trách nhiệm của AWS và người dùng | 15/09/2026 | 15/09/2026 | [AWS global infrastructure](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html) |
| Thứ Tư | Tìm dịch vụ và vùng đang dùng trên Console | 16/09/2026 | 16/09/2026 | [AWS global infrastructure](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html) |
| Thứ Năm | Thiết lập AWS CLI với phiên đăng nhập tạm thời (SSO) | 17/09/2026 | 17/09/2026 | [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) |
| Thứ Sáu | Kiểm tra danh tính bằng STS và ghi lại cấu hình | 18/09/2026 | 18/09/2026 | [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) |

### Kết quả tuần 1:

- Nắm được khác biệt giữa Region, AZ và edge location; chọn ap-southeast-1 (Singapore) làm vùng chính vì gần người dùng Việt Nam và có đủ dịch vụ cần dùng.
- Phân biệt được phần AWS chịu trách nhiệm (hạ tầng vật lý, dịch vụ được quản lý) và phần người dùng chịu trách nhiệm (IAM, dữ liệu, cấu hình mạng).
- Cài AWS CLI v2, cấu hình profile đăng nhập qua IAM Identity Center thay vì lưu access key lâu dài.
- `aws sts get-caller-identity` trả về đúng role của phiên SSO; ghi chú lại cách xử lý khi token hết hạn (`aws sso login`).
