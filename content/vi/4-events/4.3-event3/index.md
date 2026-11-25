---
title: "Sự kiện 3"
pre: "4.3."
weight: 3
status: "ready"
---

# Báo cáo tổng kết: Enterprise AI on AWS Cloud – Từ prototype đến production

### Thông tin sự kiện

- **Tên sự kiện:** Enterprise AI on AWS Cloud – Từ prototype đến production
- **Thời gian:** 09:00 – 12:00, 14/11/2026
- **Địa điểm:** Tầng 26, Bitexco Financial Tower, TP. Hồ Chí Minh
- **Vai trò:** Người tham dự
- **Diễn giả:** Khang Duong, Phuong Huyen, Bao Nguyen, Khuong Huynh

### Mục tiêu sự kiện

- Phân biệt AI thử nghiệm với AI vận hành trong doanh nghiệp.
- Hiểu khác biệt giữa training và inference, và tác động của token tới chi phí.
- Nắm 4 trụ cột vận hành: bảo mật, tin cậy, mở rộng, chi phí.
- Làm quen 4 mô hình multi-agent phổ biến.

### Nội dung nổi bật

#### Từ "bếp nhà" đến "chuỗi nhà hàng"

Diễn giả so sánh AI thử nghiệm với bếp ăn gia đình (chỉ cần món ngon) và AI doanh nghiệp với chuỗi nhà hàng (cần quy trình, an toàn, ổn định, chi phí kiểm soát được).

#### Training, inference và token

Training chạy theo đợt, tốn tài nguyên lớn; inference chạy liên tục và cần độ trễ thấp. Với LLM, số token vào/ra quyết định trực tiếp độ trễ và hóa đơn, nên cần tối ưu prompt và ngữ cảnh.

#### Bốn trụ cột vận hành

Bảo mật (IAM, KMS, Guardrails), tin cậy (Multi-AZ, thử lại có backoff), mở rộng (Auto Scaling, Lambda, ALB) và tối ưu chi phí (chọn đúng cỡ tài nguyên, dùng mô hình nhỏ cho câu hỏi dễ).

#### Bốn mô hình multi-agent

Supervisor/Routing chuyển câu hỏi tới agent phù hợp; Sequential nối các bước như dây chuyền; Parallel chạy nhiều agent cùng lúc rồi tổng hợp; Evaluator–Optimizer để một agent chấm và yêu cầu agent kia sửa đến khi đạt.

### Bài học rút ra

- Độ chính xác của mô hình chưa đủ; hệ thống AI cần đo lường, giám sát và giới hạn chi phí.
- Token là đơn vị chi phí, cần thiết kế để model nhận ít ngữ cảnh nhất có thể.
- Chịu lỗi nhiều AZ là yêu cầu cơ bản khi đưa AI vào vận hành.

### Áp dụng vào dự án của em

- Dự án dùng Amazon Nova 2 Lite (mô hình nhỏ, rẻ) và chỉ gửi câu hỏi tìm món, không gửi dữ liệu cá nhân, giúp ít token và an toàn hơn; mỗi tài khoản giới hạn 30 câu/ngày.
- Sau sự kiện, dự án bật RDS Multi-AZ và chạy 2 task ECS ở 2 AZ (D33), đã diễn tập failover thành công ngày 22/11.
- Bộ đánh giá 45 câu với model thật đóng vai trò "evaluator" để kiểm tra chất lượng trước mỗi thay đổi prompt.

### Ảnh check-in

:::figure{src="/images/events/event3-checkin.png" alt="event3-checkin" caption="Enterprise AI on AWS Cloud – Từ prototype đến production – 14/11/2026"}

