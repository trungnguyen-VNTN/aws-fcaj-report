---
title: "Các bài blog đã đăng"
pre: "3."
weight: 3
status: "ready"
---

### Blog 1 - SQS + Lambda: Message vào DLQ

Bài viết phân tích tình huống message vào DLQ dù Lambda không ghi nhận exception. Nội dung tập trung vào throttling, visibility timeout, concurrency và maxReceiveCount. Bài đưa ra các metric cần đối chiếu cùng hướng xử lý từng nhóm nguyên nhân.

[Đọc nội dung](/3-blogs/3.1-blog1) · [Bài đăng Facebook](https://www.facebook.com/groups/awsstudygroupfcj/permalink/2338552930242999/)

### Blog 2 - NAT Gateway: Chi phí và đường đi dữ liệu

Bài viết tìm nguyên nhân chi phí NAT Gateway tăng qua usage type và đường đi dữ liệu. Ví dụ lưu lượng S3 cho thấy cần phân biệt phí truyền dữ liệu và phí xử lý của NAT. Nội dung so sánh gateway endpoint, interface endpoint và lựa chọn NAT theo AZ.

[Đọc nội dung](/3-blogs/3.2-blog2) · [Bài đăng Facebook](https://www.facebook.com/groups/awsstudygroupfcj/permalink/2340782970019995/)

### Blog 3 - ALB: Target healthy vẫn trả 502

Bài viết giải thích lỗi HTTP 502 có thể xuất hiện khi target vẫn healthy. Nội dung đối chiếu keep-alive của ứng dụng với idle timeout của ALB, metric và access logs. Các phương án xử lý được phân theo lỗi kết nối, dừng target và response không hợp lệ.

[Đọc nội dung](/3-blogs/3.3-blog3) · [Bài đăng Facebook](https://www.facebook.com/groups/awsstudygroupfcj/permalink/2343670456397913/)
