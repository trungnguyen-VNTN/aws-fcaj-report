---
title: "Ước tính và tối ưu chi phí"
pre: "5.6.3."
weight: 3
status: "ready"
---

Phân biệt chi phí demo, 24/7 và production đề xuất.

1. **Đối chiếu cấu hình nguồn**

Ước tính USD/tháng, đối chiếu AWS Pricing Calculator ngày 25/11/2026 cho cấu hình Multi-AZ và 2 task (D33), chưa thuế, sai lệch có thể ±10%. Production là phương án tương lai chưa triển khai. Bedrock thực tế gọi tại Tokyo.

| Dịch vụ / Cấu hình | Demo (~4h/ngày) | 24/7 (Pricing Calculator) | Production đề xuất |
| --- | --- | --- | --- |
| RDS PostgreSQL db.t4g.micro, Multi-AZ, 20 GB gp3 | ~11,6 | 42,75 | ~70 (Multi-AZ, db.t4g.small) |
| ECS Fargate ARM64, 0,5 vCPU / 1 GB, 2 task | ~5,9 | 35,98 | ~36–72 (2–4 task, auto scaling) |
| Application Load Balancer | ~3,1 | 18,63 | ~22 |
| Public IPv4, 4 địa chỉ | ~2,4 | 14,60 | ~15 |
| Secrets Manager, 2 secret | 0,85 | 0,85 | 0,85 |
| Bedrock (Nova Lite làm giá tham chiếu, Tokyo) | <0,7 | 0,70 | Theo lượng dùng |
| CloudFront 1,02 · CloudWatch 1,70 · ECR 0,10 · S3 0,07 · Cognito 0 · CloudTrail 0 | ~2,9 | 2,89 | ~5 |
| **Tổng (không WAF)** | **~27** | **116,40** | **~150–190** |
| WAF (tùy chọn, nhóm Optional) | 0 | 9,60 | ~10 |
| **Tổng có WAF** | — | **126,00** | **~160–200** |

Cost Explorer ghi nhận **6,44 USD** cho 01–21/11/2026, được credit bù toàn bộ. RDS 2,77; ALB 1,29; ECS 1,21; IPv4 0,74; Bedrock 0,21; Secrets Manager 0,20 USD. Các khoản liệt kê là những khoản lớn, không phải phép cộng chi tiết toàn bộ hóa đơn. App chỉ bật khi demo nên không dùng số thực tế này để suy ra mức chạy 24/7. Số thực tế này ghi nhận trước khi bật Multi-AZ.

**Bảng giá AWS Pricing Calculator:** [estimate ngày 25/11/2026](https://calculator.aws/#/estimate?id=8dfa24875b5ab56798dc086bcac564644ffcfce4). Cột 24/7 lấy đúng số của Calculator (Singapore, riêng Bedrock ở Tokyo). Cột Demo quy đổi từ đó cho khoảng 120 giờ chạy mỗi tháng: các khoản tính theo giờ (RDS instance, Fargate, ALB, IPv4) nhân 120/730, còn ổ đĩa RDS (5,52 USD) và các khoản theo lượng dùng giữ nguyên. Giả định tải: 50 người dùng/tháng, 5 GB CloudFront, khoảng 3.600 câu hỏi AI/tháng (1 câu/phút trong 2 giờ/ngày, 1.500 token vào, 300 token ra). Calculator chưa có Amazon Nova 2 Lite nên dùng Amazon Nova Lite làm giá tham chiếu. Estimate không tính RDS Proxy và Database Insights Advanced vì dự án không dùng.

App mặc định tắt. D20 dùng up/down để chỉ giữ RDS storage, S3 và các khoản cố định khi nghỉ. D15 bỏ NAT. Từ D33, RDS Multi-AZ và 2 task chỉ tốn thêm khoảng 0,05 USD/giờ khi app bật, cộng ổ đĩa bản dự phòng khoảng 2,8 USD/tháng; quay về 1 AZ bằng hai biến `rds_multi_az` và `api_desired_count`. Fargate Spot chỉ là phương án cần đánh giá khả năng bị thu hồi, chưa xác nhận được triển khai trong module hiện tại.

[`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1)

```powershell
    .\scripts\demo-infra.ps1 down   # remove ALB + ECS service, stop RDS (~5-10 min)
```

:::figure{src="/images/workshop/5.6.3-cost-step1.png" alt="5.6.3-cost-step1" caption="Cost Explorer tháng 11/2026, chi phí theo dịch vụ (đã loại credit)"}

2. **Kiểm tra kết quả**

Dùng kỳ Cost Explorer 01–21/11/2026 và kiểm tra credit tách khỏi usage. Ước tính tháng không phải hóa đơn cam kết.

:::figure{src="/images/workshop/step11-result.png" alt="Chi phí và tối ưu" caption="Billing → Credits: tổng credit 199,99 USD, đã dùng ước tính 15,07 USD"}

#### Lỗi đã ghi nhận

Chưa có lỗi cụ thể được ghi nhận cho bước này trong các nguồn đã đối chiếu. Khi phát sinh, ghi thời điểm, thông báo đã che định danh và cách xử lý được xác nhận.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1).
