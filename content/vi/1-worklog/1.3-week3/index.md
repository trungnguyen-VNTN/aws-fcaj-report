---
title: "Nhật ký tuần 3"
pre: "1.3."
weight: 3
status: "ready"
---

**Chủ đề:** Amazon VPC và mạng

**Thời gian:** 28/09/2026 – 02/10/2026

### Mục tiêu tuần 3:

- Thiết kế VPC với subnet public/private ở nhiều AZ.
- Hiểu đường đi của một request và các điểm chặn.

### Công việc thực hiện trong tuần:

| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Thứ Hai | Vẽ VPC và chọn dải CIDR | 28/09/2026 | 28/09/2026 | [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) |
| Thứ Ba | Chia subnet public và private theo Availability Zone | 29/09/2026 | 29/09/2026 | [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) |
| Thứ Tư | Đọc route table và luồng qua Internet Gateway | 30/09/2026 | 30/09/2026 | [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) |
| Thứ Năm | So sánh Security Group với Network ACL | 01/10/2026 | 01/10/2026 | [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) |
| Thứ Sáu | Lần theo đường đi của một yêu cầu và xác định điểm chặn | 02/10/2026 | 02/10/2026 | [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) |

### Kết quả tuần 3:

- Thiết kế VPC 10.20.0.0/16 với 4 subnet (2 public, 2 private) ở 2 AZ; đây là bố cục dùng lại cho dự án.
- Phân biệt subnet public (có route 0.0.0.0/0 tới Internet Gateway) và private (không có route ra Internet).
- So sánh Security Group (stateful, gắn vào tài nguyên) với Network ACL (stateless, gắn vào subnet); chọn chuỗi SG ALB → ECS → RDS cho dự án.
- Tìm hiểu chi phí NAT Gateway và phương án S3 Gateway Endpoint để giảm chi phí.
