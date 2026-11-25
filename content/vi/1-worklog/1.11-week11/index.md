---
title: "Nhật ký tuần 11"
pre: "1.11."
weight: 11
status: "ready"
---

**Chủ đề:** Chịu lỗi Multi-AZ, chi phí và Budgets

**Thời gian:** 23/11/2026 – 27/11/2026

### Mục tiêu tuần 11:

- Hoàn thiện chịu lỗi 2 AZ và kiểm chứng chi phí.
- Lập dự toán bằng AWS Pricing Calculator và rà soát Budgets.

### Công việc thực hiện trong tuần:

| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Thứ Hai | Ghi nhận RDS Multi-AZ và 2 task ECS (D33) sau diễn tập failover; sửa lỗi mất phiên khi tải lại trang | 23/11/2026 | 23/11/2026 | [Amazon RDS Multi-AZ](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html) |
| Thứ Ba | Lập estimate trên AWS Pricing Calculator theo cấu hình thật, đối chiếu Cost Explorer và credit | 24/11/2026 | 24/11/2026 | [AWS Pricing Calculator](https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html) |
| Thứ Tư | Rà soát AWS Budgets; kiểm thử VNPAY sandbox trọn luồng với IPN; chạy lại bộ đánh giá AI với model thật | 25/11/2026 | 25/11/2026 | [AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html) |
| Thứ Năm | Lập ngưỡng cảnh báo ngân sách theo từng mức chi (dự kiến) | 26/11/2026 | 26/11/2026 | [AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html) |
| Thứ Sáu | Rà soát các tài nguyên có thể còn tính phí sau khi tắt demo (dự kiến) | 27/11/2026 | 27/11/2026 | [AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html) |

### Kết quả tuần 11:

- Diễn tập failover: AZ chính chuyển ap-southeast-1a → 1b, API tự phục hồi sau khoảng nửa phút, không mất dữ liệu.
- Estimate AWS Pricing Calculator: 116,40 USD/tháng khi chạy 24/7 (126,00 USD nếu bật WAF); chạy theo buổi demo khoảng 27 USD/tháng.
- Budgets 100 USD: đã dùng 15,06 USD, dự báo 26,95 USD; toàn bộ chi phí được credit bù.
- VNPAY sandbox chạy trọn luồng sau khi khai báo IPN URL: đơn #10 chuyển sang "Đã thanh toán". Bộ đánh giá AI với model thật BUILD SUCCESS ngày 25/11. Việc thứ Năm và thứ Sáu sẽ cập nhật sau.
