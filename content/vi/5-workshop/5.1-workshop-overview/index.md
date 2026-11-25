---
title: "Giới thiệu"
pre: "5.1."
weight: 1
status: "ready"
---

#### CloudFront → ALB → ECS

Theo dõi luồng từ trình duyệt tới DB và AI, xác định môi trường dev duy nhất.

#### Bedrock và Guardrails

Nova 2 Lite diễn giải yêu cầu thành tool chỉ đọc. Code ghép số liệu từ PostgreSQL và kiểm tra đầu ra trước khi trả lời.

#### Workshop overview

:::figure{src="/images/architecture/system-overview.png" alt="AWS architecture reference" caption="Sơ đồ kiến trúc AWS vẽ trên draw.io bằng bộ AWS Architecture Icons, cập nhật Multi-AZ và AWS STS ngày 25/11/2026"}

Tải file draw.io gốc để xem và chỉnh sửa: [aws-architecture.drawio](/files/aws-architecture.drawio).

Từ 22/11/2026 (D33), môi trường dev chạy 2 task ECS, mỗi Availability Zone một task, và RDS ở chế độ Multi-AZ với bản dự phòng (Standby) ở AZ thứ hai. Diễn tập *Reboot with failover* ngày 22/11 chuyển AZ chính từ ap-southeast-1a sang ap-southeast-1b trong khoảng 20–45 giây; API gián đoạn khoảng nửa phút rồi tự phục hồi, không mất dữ liệu.

| Dịch vụ | Vai trò |
| --- | --- |
| CloudFront + S3 | React SPA và ảnh qua OAC; Function viết lại đường dẫn; hai bucket riêng tư |
| ALB + ECS Fargate + ECR | ALB nhận CloudFront + header bí mật; Spring Boot 4 / Java 21, ARM64, 0,5 vCPU / 1 GB, 2 task ở 2 AZ |
| RDS PostgreSQL + Secrets Manager | db.t4g.micro, 20 GB gp3, Multi-AZ (standby ở AZ thứ hai), private subnet, mã hóa; Flyway V1–V11 |
| Cognito | JWT sub và cognito:groups; USER / ADMIN |
| Bedrock + Guardrails | Nova 2 Lite ở Tokyo; tool chỉ đọc, số liệu do code lấy từ DB |
| CloudWatch + SNS + Budgets | Log 14 ngày, 7 alarm, cảnh báo thư điện tử; ngân sách 100 USD |
| CloudTrail + S3 audit + WAF | Audit và ALB logs lưu 30 ngày; WAF chỉ bật khi demo; KMS do AWS quản lý |
| Terraform + IAM + STS + GitHub Actions | State S3 use_lockfile; SSO, boundary; CI/CD qua OIDC, AWS STS cấp quyền tạm thời |

Đọc sơ đồ và quyết định D15/D17/D18. React và API đi qua CloudFront. Cognito cấp JWT; ALB chuyển yêu cầu tới Spring Boot trên ECS. Catalog, giỏ và đơn dùng RDS. Bộ gợi ý D32 tính bằng code, model chỉ chọn intent.

[`docs/diagrams/architecture-star.txt`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/diagrams/architecture-star.txt)

```text
1. Amazon CloudFront phân phối React SPA và ảnh sản phẩm từ hai bucket Amazon S3 riêng tư, qua Origin Access Control.
2. Các yêu cầu /api/* đi qua Internet Gateway tới Application Load Balancer. ALB chỉ nhận lưu lượng từ dải IP của CloudFront và kèm header bí mật.
3. Backend Spring Boot (Java 21) chạy trên Amazon ECS Fargate (ARM64), đặt ở public subnet và không dùng NAT để tiết kiệm chi phí. ECS service chạy 2 task trên 2 Availability Zone: một AZ gặp sự cố thì task ở AZ còn lại vẫn phục vụ. Mỗi lớp có security group riêng: ALB chỉ nhận từ CloudFront, ECS chỉ nhận từ ALB, RDS chỉ nhận từ ECS qua cổng 5432.
4. Dữ liệu nằm trên Amazon RDS for PostgreSQL Multi-AZ ở private subnet: có bản dự phòng ở AZ thứ hai, tự chuyển sang khi AZ chính lỗi. Dữ liệu được mã hoá bằng khoá AWS KMS. Mật khẩu do AWS Secrets Manager quản lý. Truy vấn dùng SQL tham số hoá; trừ kho bằng UPDATE có điều kiện trong transaction.
```

#### Sản phẩm chạy thực tế (Demo)

| Minh chứng | Liên kết |
| --- | --- |
| Ứng dụng (production trên môi trường dev) | [https://ddn09pubqlwme.cloudfront.net](https://ddn09pubqlwme.cloudfront.net) |
| Mã nguồn | [github.com/trungnguyen-VNTN/nutrition-ecommerce](https://github.com/trungnguyen-VNTN/nutrition-ecommerce) |
| Video demo đầy đủ (4:57) | [https://youtu.be/_yt_s3DTMr0](https://youtu.be/_yt_s3DTMr0) |

Để tiết kiệm chi phí, ứng dụng chỉ bật trong buổi demo và chấm bài (`demo-infra.ps1 up`), thời gian còn lại tắt (`down`). Khi app đang tắt, trang web vẫn mở nhưng API báo tạm ngưng; video demo ghi lại toàn bộ luồng: đăng nhập, lọc sản phẩm, hồ sơ dinh dưỡng, AI tra cứu, giỏ hàng, đặt hàng và trang quản trị.

#### Kiểm chứng và nguồn

:::figure{src="/images/workshop/step1-result.png" alt="Tổng quan" caption="CloudFront distribution: tên miền *.cloudfront.net, hỗ trợ HTTP/3, root object index.html"}

Đối chiếu /api/products, đăng nhập và kịch bản demo trong docs/demo.md. Snapshot test ngày 21/11/2026: backend 86, frontend 145, E2E + axe 57. Đây là kết quả được ghi lại, không phải lượt chạy trong báo cáo.

Các bước kiểm thử bằng lệnh và những sự cố thực tế đã gặp được ghi ở [5.8 Kiểm thử và xử lý sự cố](/5-workshop/5.8-testing-troubleshooting).

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`docs/diagrams/architecture-star.txt`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/diagrams/architecture-star.txt).
