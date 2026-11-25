---
title: "Nhật ký tuần 5"
pre: "1.5."
weight: 5
status: "ready"
---

**Chủ đề:** Amazon S3

**Thời gian:** 12/10/2026 – 16/10/2026

### Mục tiêu tuần 5:

- Tạo bucket an toàn và kiểm tra quyền truy cập.
- Thực hành versioning và lifecycle.

### Công việc thực hiện trong tuần:

| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Thứ Hai | Tạo bucket lab và kiểm tra Block Public Access | 12/10/2026 | 12/10/2026 | [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) |
| Thứ Ba | Tải tệp mẫu lên và thử tải xuống với quyền phù hợp | 13/10/2026 | 13/10/2026 | [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) |
| Thứ Tư | Ghi đè một đối tượng để quan sát versioning | 14/10/2026 | 14/10/2026 | [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) |
| Thứ Năm | Lập quy tắc lifecycle cho phiên bản cũ | 15/10/2026 | 15/10/2026 | [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) |
| Thứ Sáu | Kiểm tra quyền truy cập và dọn đối tượng thử | 16/10/2026 | 16/10/2026 | [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) |

### Kết quả tuần 5:

- Tạo bucket với Block Public Access bật mặc định; truy cập URL công khai của đối tượng bị từ chối đúng như mong đợi.
- Dùng presigned URL để chia sẻ tạm thời một tệp mà không mở public bucket.
- Bật versioning, ghi đè tệp và khôi phục được phiên bản cũ.
- Lập lifecycle xóa phiên bản cũ sau 30 ngày; cách này sau đó dùng cho bucket log của dự án. Đã xóa toàn bộ đối tượng và bucket lab.
