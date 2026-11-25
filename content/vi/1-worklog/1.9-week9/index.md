---
title: "Nhật ký tuần 9"
pre: "1.9."
weight: 9
status: "ready"
---

**Chủ đề:** Dữ liệu và triển khai AWS

**Thời gian:** 09/11/2026 – 13/11/2026

### Mục tiêu tuần 9:

- Nạp dữ liệu dinh dưỡng thật và dựng hạ tầng bằng Terraform.
- Đưa ứng dụng lên AWS và thêm AI có kiểm soát.

### Công việc thực hiện trong tuần:

| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Thứ Hai | Nạp dữ liệu USDA FoodData Central cho catalog chạy local | 09/11/2026 | 09/11/2026 | [USDA FoodData Central](https://fdc.nal.usda.gov/api-guide) |
| Thứ Ba | Soạn IAM policy cho permission set triển khai và permissions boundary (D16); chốt bố cục Terraform | 10/11/2026 | 10/11/2026 | [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) |
| Thứ Tư | Terraform: mạng, RDS, ECR, Cognito, ALB, ECS, CloudFront, OIDC; bật/tắt theo buổi demo (D20) | 11/11/2026 | 11/11/2026 | [Terraform AWS provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) |
| Thứ Năm | Deploy qua GitHub Actions OIDC; bucket ảnh qua CloudFront /images/*; seed catalog; app chạy trên AWS lần đầu | 12/11/2026 | 12/11/2026 | [GitHub OIDC with AWS](https://docs.github.com/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) |
| Thứ Sáu | Guardrail cho chat, alarm CloudWatch gửi qua SNS, giới hạn tốc độ, quên mật khẩu, bộ đánh giá AI 30 câu | 13/11/2026 | 13/11/2026 | [Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html) |

### Kết quả tuần 9:

- Ứng dụng chạy thật trên AWS qua tên miền CloudFront, hạ tầng hoàn toàn bằng Terraform.
- GitHub Actions triển khai bằng OIDC, không lưu access key dài hạn.
- Catalog có dữ liệu dinh dưỡng USDA kèm ảnh sản phẩm; 7 alarm CloudWatch gửi thư cảnh báo.
- Phát hiện quota Bedrock ở Singapore bằng 0, ghi lại để xử lý ở tuần sau.
