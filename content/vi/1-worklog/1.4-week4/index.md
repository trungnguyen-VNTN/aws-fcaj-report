---
title: "Nhật ký tuần 4"
pre: "1.4."
weight: 4
status: "ready"
---

**Chủ đề:** Amazon EC2 và Amazon EBS

**Thời gian:** 05/10/2026 – 09/10/2026

### Mục tiêu tuần 4:

- Hiểu AMI, instance type và vòng đời EC2.
- Thực hành EBS và dọn tài nguyên sau lab.

### Công việc thực hiện trong tuần:

| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Thứ Hai | So sánh AMI, instance type và các trạng thái EC2 | 05/10/2026 | 05/10/2026 | [Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) |
| Thứ Ba | Lập cấu hình EC2 lab và giới hạn truy cập quản trị | 06/10/2026 | 06/10/2026 | [Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) |
| Thứ Tư | Khởi động instance và kiểm tra trạng thái | 07/10/2026 | 07/10/2026 | [Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) |
| Thứ Năm | Gắn ổ EBS, phân biệt volume với snapshot | 08/10/2026 | 08/10/2026 | [Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) |
| Thứ Sáu | Kết thúc lab và kiểm tra tài nguyên còn phát sinh phí | 09/10/2026 | 09/10/2026 | [Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) |

### Kết quả tuần 4:

- Phân biệt các họ instance (t, m, c) và kiến trúc ARM Graviton; ghi nhận Graviton rẻ hơn nên sau này chọn ARM64 cho ECS và RDS.
- Chạy một instance t4g.micro, chỉ mở cổng quản trị cho IP của mình, truy cập bằng Session Manager thay vì mở SSH ra Internet.
- Gắn và mount một ổ EBS, tạo snapshot rồi khôi phục thành volume mới.
- Terminate instance, xóa volume và snapshot thừa; kiểm tra lại không còn Elastic IP hay volume tính phí.
