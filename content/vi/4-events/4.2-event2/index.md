---
title: "Sự kiện 2"
pre: "4.2."
weight: 2
status: "ready"
---

# Báo cáo tổng kết: First Cloud AI Journey Meetup – AWS Cloud, Cloud Security và AI Agents

### Thông tin sự kiện

- **Tên sự kiện:** First Cloud AI Journey Meetup – AWS Cloud, Cloud Security và AI Agents
- **Thời gian:** 08:00 – 12:00, 24/10/2026
- **Địa điểm:** Tầng 26, Bitexco Financial Tower, TP. Hồ Chí Minh
- **Vai trò:** Người tham dự
- **Diễn giả:** Kiệt Trần (Revve AI), Long Huỳnh và Thịnh Nguyễn (Styl Solution), Xuân An (AWS Student Builder Group HCMUTE), Khoa Kiều (ACB), Nghi Danh (AWS Community Builder)

### Mục tiêu sự kiện

- Xem các ứng dụng thực tế của Voice AI và AI Agent trên AWS.
- Hiểu cách chia sẻ tài nguyên và quản trị nhiều tài khoản AWS.
- Tiếp cận bảo mật "dịch chuyển trái" và kiểm thử xâm nhập có AI hỗ trợ.
- Kết nối với cộng đồng kỹ sư AWS tại TP.HCM.

### Nội dung nổi bật

#### Voice AI tiếng Việt: Hear – Think – Speak

Chuỗi nhận dạng giọng nói → LLM → tổng hợp giọng nói cho tổng đài tự động. Demo phỏng vấn sơ tuyển ứng viên bằng tiếng Việt, mục tiêu độ trễ toàn trình khoảng 1,8 giây để hội thoại tự nhiên.

#### AWS Resource Access Manager

Chia sẻ subnet, Transit Gateway, Route 53 Resolver rule giữa các tài khoản trong cùng AWS Organizations, kết hợp IAM policy và Service Control Policy để đặt giới hạn quyền cho cả tổ chức.

#### Kiểm thử bảo mật dịch chuyển trái

Rà soát Terraform ngay trong pull request, phát hiện cấu hình sai trước khi triển khai, và dùng AI security agent để kiểm thử xâm nhập trong môi trường được cấp phép.

#### Amazon Bedrock AgentCore và Kiro

AgentCore Runtime cô lập phiên chạy của agent và tự co giãn; AgentCore Memory giữ ngữ cảnh ngắn hạn và dài hạn. Phiên Kiro nhấn mạnh quản lý cửa sổ ngữ cảnh và đặt guardrail để agent không xóa tài nguyên, lộ khóa hay đổi cấu hình khi chưa được phép.

### Bài học rút ra

- Ứng dụng AI thực tế cần hạ tầng ổn định, quản lý ngữ cảnh và giới hạn an toàn, không chỉ một mô hình tốt.
- Bảo mật nên nằm trong quy trình phát triển (pull request, CI), không đợi đến lúc triển khai.
- Quản trị nhiều tài khoản cần ranh giới quyền ở cấp tổ chức.

### Áp dụng vào dự án của em

- Trợ lý AI của dự án đặt guardrail ở cả hai tầng: Bedrock Guardrails chặn lời khuyên y tế và prompt attack, còn backend chỉ cho model dùng một công cụ tìm kiếm chỉ đọc.
- Hạ tầng dự án dùng permissions boundary và tách hai permission set (chỉ đọc / triển khai), cùng tinh thần với Service Control Policy.
- Mọi thay đổi Terraform đều chạy `fmt`, `validate`, `plan` và được xem lại trước khi `apply`.

### Ảnh check-in

:::figure{src="/images/events/event2-checkin.png" alt="event2-checkin" caption="First Cloud AI Journey Meetup – AWS Cloud, Cloud Security và AI Agents – 24/10/2026"}

