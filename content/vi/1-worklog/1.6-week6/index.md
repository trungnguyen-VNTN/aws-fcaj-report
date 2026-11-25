---
title: "Nhật ký tuần 6"
pre: "1.6."
weight: 6
status: "ready"
---

**Chủ đề:** Amazon DynamoDB

**Thời gian:** 19/10/2026 – 23/10/2026

### Mục tiêu tuần 6:

- Thiết kế khóa cho bảng DynamoDB.
- So sánh cách đọc dữ liệu và chế độ tính phí.

### Công việc thực hiện trong tuần:

| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Thứ Hai | Chọn partition key và sort key cho dữ liệu lab | 19/10/2026 | 19/10/2026 | [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) |
| Thứ Ba | Tạo bảng và nạp bản ghi mẫu | 20/10/2026 | 20/10/2026 | [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) |
| Thứ Tư | So sánh GetItem, Query và Scan bằng cùng bộ dữ liệu | 21/10/2026 | 21/10/2026 | [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) |
| Thứ Năm | Thử cập nhật có điều kiện và ghi lại trường hợp bị từ chối | 22/10/2026 | 22/10/2026 | [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) |
| Thứ Sáu | So sánh chế độ on-demand với provisioned | 23/10/2026 | 23/10/2026 | [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) |

### Kết quả tuần 6:

- Thiết kế bảng đơn hàng với partition key là mã khách và sort key là thời điểm đặt hàng.
- Thấy Query theo khóa đọc ít dữ liệu hơn hẳn Scan trên cùng bộ dữ liệu, nên tránh Scan cho truy vấn thường xuyên.
- Cập nhật có điều kiện (`ConditionExpression`) bị từ chối khi tồn kho không đủ; ý tưởng này áp dụng lại cho dự án bằng `UPDATE ... WHERE stock >= :q` trên PostgreSQL.
- Kết luận dự án dùng PostgreSQL (RDS) vì cần truy vấn lọc nhiều điều kiện và transaction cho đơn hàng; DynamoDB phù hợp hơn cho truy cập theo khóa.
