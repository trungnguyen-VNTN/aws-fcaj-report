---
title: "Giới thiệu"
pre: "5.1."
weight: 1
status: "draft"
---

#### CloudFront → ALB → ECS

Theo dõi luồng từ trình duyệt tới DB và AI, xác định môi trường dev duy nhất.

#### Bedrock và Guardrails

Nova 2 Lite diễn giải yêu cầu thành tool chỉ đọc. Code ghép số liệu từ PostgreSQL và kiểm tra đầu ra trước khi trả lời.

#### Workshop overview

:::figure{src="/images/architecture/system-overview.png" alt="AWS architecture reference" caption="Bản tham khảo từ mã nguồn, cập nhật 22/11/2026"}

Môi trường dev chạy một task. Task mờ ở AZ còn lại trong ảnh biểu diễn khả năng khởi động thay thế, không phải task thứ hai đang chạy.

:::todo[Sơ đồ Draw.io]
Vẽ lại kiến trúc trên Draw.io bằng bộ icon AWS chính thức, xuất ảnh và thay bản tham khảo tại đường dẫn trên.
:::

| Dịch vụ | Vai trò |
| --- | --- |
| CloudFront + S3 | React SPA và ảnh qua OAC; Function viết lại đường dẫn; hai bucket riêng tư |
| ALB + ECS Fargate + ECR | ALB nhận CloudFront + header bí mật; Spring Boot 4 / Java 21, ARM64, 0,5 vCPU / 1 GB, 1 task |
| RDS PostgreSQL + Secrets Manager | db.t4g.micro, 20 GB gp3, Single-AZ, private subnet, mã hóa; Flyway V1–V11 |
| Cognito | JWT sub và cognito:groups; USER / ADMIN |
| Bedrock + Guardrails | Nova 2 Lite ở Tokyo; tool chỉ đọc, số liệu do code lấy từ DB |
| CloudWatch + SNS + Budgets | Log 14 ngày, 7 alarm, cảnh báo thư điện tử; ngân sách 100 USD |
| CloudTrail + S3 audit + WAF | Audit và ALB logs lưu 30 ngày; WAF chỉ bật khi demo; KMS do AWS quản lý |
| Terraform + IAM + GitHub Actions | State S3 use_lockfile; SSO, boundary; CI/CD qua OIDC |

Đọc sơ đồ và quyết định D15/D17/D18. React và API đi qua CloudFront. Cognito cấp JWT; ALB chuyển yêu cầu tới Spring Boot trên ECS. Catalog, giỏ và đơn dùng RDS. Bộ gợi ý D32 tính bằng code, model chỉ chọn intent.

[`docs/diagrams/architecture-star.txt`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/diagrams/architecture-star.txt)

```text
1. Amazon CloudFront phân phối React SPA và ảnh sản phẩm từ hai bucket Amazon S3 riêng tư, qua Origin Access Control.
2. Các yêu cầu /api/* đi qua Internet Gateway tới Application Load Balancer. ALB chỉ nhận lưu lượng từ dải IP của CloudFront và kèm header bí mật.
3. Backend Spring Boot (Java 21) chạy trên Amazon ECS Fargate (ARM64), đặt ở public subnet và không dùng NAT để tiết kiệm chi phí. ECS service trải trên 2 Availability Zone: môi trường dev chạy 1 task, nếu task lỗi thì task thay thế có thể khởi động ở AZ còn lại. Mỗi lớp có security group riêng: ALB chỉ nhận từ CloudFront, ECS chỉ nhận từ ALB, RDS chỉ nhận từ ECS qua cổng 5432.
4. Dữ liệu nằm trên Amazon RDS for PostgreSQL ở private subnet, được mã hoá bằng khoá AWS KMS. Mật khẩu do AWS Secrets Manager quản lý. Truy vấn dùng SQL tham số hoá; trừ kho bằng UPDATE có điều kiện trong transaction.
```

#### Kiểm chứng và nguồn

:::figure{src="/images/workshop/step1-result.png" alt="Tổng quan" caption="Ảnh minh chứng cần chủ repo bổ sung"}

:::todo[Cần chụp ảnh]
CloudFront → Distributions → distribution của ứng dụng, hiển thị trạng thái và các behavior, che định danh.
:::

Đối chiếu /api/products, đăng nhập và kịch bản demo trong docs/demo.md. Snapshot test ngày 21/11/2026: backend 86, frontend 145, E2E + axe 57. Đây là kết quả được ghi lại, không phải lượt chạy trong báo cáo.

Chưa có lỗi cụ thể được ghi nhận cho bước này trong các nguồn đã đối chiếu. Khi phát sinh, ghi thời điểm, thông báo đã che định danh và cách xử lý được xác nhận.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`docs/diagrams/architecture-star.txt`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/diagrams/architecture-star.txt).
