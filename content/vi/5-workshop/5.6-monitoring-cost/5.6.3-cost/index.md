---
title: "Ước tính và tối ưu chi phí"
pre: "5.6.3."
weight: 3
status: "draft"
---

Phân biệt chi phí demo, 24/7 và production đề xuất.

1. **Đối chiếu cấu hình nguồn**

Ước tính USD/tháng theo giả định Singapore trong brief ngày 22/11/2026, chưa thuế, sai lệch có thể ±10%. Production là phương án tương lai chưa triển khai. Bedrock thực tế gọi tại Tokyo.

| Dịch vụ / Cấu hình | Demo (~4h/day) | 24/7 | Production đề xuất |
| --- | --- | --- | --- |
| RDS t4g.micro, 20 GB gp3, Single-AZ | ~4 | ~22 | ~70 (Multi-AZ, t4g.small) |
| ALB, 2 AZ | ~3 | ~20 | ~22 |
| ECS ARM64, 0.5 vCPU / 1 GB, 1 task | ~2.5 | ~15 | ~30 (2 tasks) |
| Public IPv4, 3 addresses | ~2 | ~11 | ~11 |
| Secrets Manager, 2 secrets | 0.8 | 0.8 | 0.8 |
| Bedrock Nova 2 Lite | <1 | <1 | Theo lượng dùng |
| CloudFront, Cognito, CloudTrail, S3, ECR, CloudWatch | ~0–1 | ~1–3 | ~5 |
| WAF (tùy chọn) | 0 | ~8–10 | ~10 |
| **Tổng dự kiến** | **~12–18** | **~65–75** | **~150–200** |

Cost Explorer ghi nhận **6,44 USD** cho 01–21/11/2026, được credit bù toàn bộ. RDS 2,77; ALB 1,29; ECS 1,21; IPv4 0,74; Bedrock 0,21; Secrets Manager 0,20 USD. Các khoản liệt kê là những khoản lớn, không phải phép cộng chi tiết toàn bộ hóa đơn. App chỉ bật khi demo nên không dùng số thực tế này để suy ra mức chạy 24/7.

:::todo[AWS Pricing Calculator]
Đối chiếu từng cấu hình và vùng dịch vụ trên AWS Pricing Calculator, thêm liên kết estimate có ngày chốt giá. Nếu chuyển ECS sang private subnet, tính thêm NAT khoảng 45 USD/tháng theo giả định brief.
:::

App mặc định tắt. D20 dùng up/down để chỉ giữ RDS storage, S3 và các khoản cố định khi nghỉ. D15 bỏ NAT; RDS Single-AZ và một task phù hợp dev. Fargate Spot chỉ là phương án cần đánh giá khả năng bị thu hồi, chưa xác nhận được triển khai trong module hiện tại.

[`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1)

```powershell
    .\scripts\demo-infra.ps1 down   # remove ALB + ECS service, stop RDS (~5-10 min)
```

:::figure{src="/images/workshop/5.6.3-cost-step1.png" alt="5.6.3-cost-step1" caption="Ảnh cần bổ sung"}

:::todo[Cần chụp ảnh]
Billing → Cost Explorer → 01–21/11/2026, group by Service; chụp tổng và phần credit, che account và thông tin thanh toán.
:::

2. **Kiểm tra kết quả**

Dùng kỳ Cost Explorer 01–21/11/2026 và kiểm tra credit tách khỏi usage. Ước tính tháng không phải hóa đơn cam kết.

:::figure{src="/images/workshop/step11-result.png" alt="Chi phí và tối ưu" caption="Ảnh minh chứng cần chủ repo bổ sung"}

:::todo[Cần chụp ảnh]
Billing → Cost Explorer → 01–21/11/2026, group by Service; chụp tổng và phần credit, che account và thông tin thanh toán.
:::

#### Lỗi đã ghi nhận

Chưa có lỗi cụ thể được ghi nhận cho bước này trong các nguồn đã đối chiếu. Khi phát sinh, ghi thời điểm, thông báo đã che định danh và cách xử lý được xác nhận.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1).
