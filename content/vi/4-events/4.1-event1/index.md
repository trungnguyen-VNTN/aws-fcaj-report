---
title: "Sự kiện 1"
pre: "4.1."
weight: 1
status: "ready"
---

# Báo cáo tổng kết: First Cloud AI Journey – Hiện đại hóa ứng dụng và cơ sở dữ liệu với GenAI

### Thông tin sự kiện

- **Tên sự kiện:** First Cloud AI Journey – Hiện đại hóa ứng dụng và cơ sở dữ liệu với GenAI
- **Thời gian:** 08:00 – 17:00, 29/09/2026
- **Địa điểm:** Tầng 26, Bitexco Financial Tower, TP. Hồ Chí Minh
- **Vai trò:** Người tham dự
- **Diễn giả:** Jignesh Shah (Director, Open Source Databases), Erica Liu (Sr. Application Modernization Specialist), Fabrianne Effendi (Serverless Solutions Architect)

### Mục tiêu sự kiện

- Nhận diện giới hạn của kiến trúc nguyên khối khi hệ thống lớn dần.
- Hiểu cách tách hệ thống thành microservices bằng Domain-Driven Design.
- Làm quen các mẫu giao tiếp bất đồng bộ: hàng đợi, pub/sub, streaming.
- Xem cách Amazon Q Developer hỗ trợ nâng cấp mã nguồn và chuyển đổi cơ sở dữ liệu.

### Nội dung nổi bật

#### Vì sao kiến trúc nguyên khối chậm lại

Mọi module nằm chung một khối nên chỉ sửa nhỏ cũng phải kiểm thử và phát hành lại toàn bộ; muốn mở rộng một phần thì phải nhân bản cả ứng dụng; một lỗi cục bộ có thể làm sập cả hệ thống.

#### Ba trụ cột khi chuyển sang microservices

Hàng đợi (Amazon SQS) để tách tiến trình và hấp thụ tải tăng đột biến; bộ nhớ đệm (Amazon ElastiCache) để giảm tải cho cơ sở dữ liệu; nhắn tin linh hoạt (Amazon SNS, Amazon EventBridge) để các dịch vụ trao đổi sự kiện mà không phụ thuộc trực tiếp vào nhau.

#### Domain-Driven Design theo 4 bước

Liệt kê sự kiện nghiệp vụ, sắp xếp theo dòng thời gian, xác định tác nhân, rồi gom nhóm thành các bounded context. Mỗi bounded context là ứng viên cho một service riêng, tránh tạo ra "distributed monolith".

#### Hiện đại hóa với GenAI

Amazon Q Developer quét mã Java cũ, đề xuất nâng cấp lên Java 17/21, hỗ trợ chuyển schema từ cơ sở dữ liệu thương mại sang Aurora PostgreSQL và cảnh báo lỗ hổng ngay trong IDE. Phần demo có minh họa SQS kèm Dead-Letter Queue giữ lại giao dịch khi một service bị lỗi.

### Bài học rút ra

- Hiện đại hóa là tái cấu trúc có phương pháp, không chỉ "nhấc nguyên khối" lên cloud.
- Tách bất đồng bộ giúp lỗi không lan ra toàn hệ thống và mỗi phần co giãn độc lập.
- Ranh giới nghiệp vụ rõ ràng quan trọng hơn số lượng service.

### Áp dụng vào dự án của em

- Dự án Nutrition E-Commerce chọn một backend Spring Boot nhưng chia package theo miền nghiệp vụ (catalog, commerce, payments, ai, admin, profile), áp dụng tư duy bounded context ngay từ đầu để sau này có thể tách service.
- Đơn VNPAY chưa thanh toán được tự hủy và trả kho sau 15 phút; đây là chỗ có thể dùng SQS/EventBridge nếu hệ thống lớn hơn.
- Backend dùng Java 21 và Spring Boot 4, đúng hướng nâng cấp runtime được giới thiệu tại sự kiện.

### Ảnh check-in

:::figure{src="/images/events/event1-checkin.jpg" alt="event1-checkin" caption="First Cloud AI Journey – Hiện đại hóa ứng dụng và cơ sở dữ liệu với GenAI – 29/09/2026"}

:::todo[Cần chụp ảnh — check-in]
Bổ sung ảnh check-in rõ mặt tại sự kiện, lưu tên public/images/events/event1-checkin.jpg.
:::
