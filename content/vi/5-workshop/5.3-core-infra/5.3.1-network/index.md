---
title: "Tạo mạng VPC"
pre: "5.3.1."
weight: 1
status: "ready"
---

Tách luồng truy cập ALB, ECS và RDS.

1. **Đối chiếu cấu hình nguồn**

Module network tạo VPC, hai public subnet và hai private-db subnet, Internet Gateway và các SG. Public subnet có tuyến ra Internet. ALB nhận prefix list origin-facing CloudFront; ECS chỉ nhận SG ALB, RDS chỉ nhận cổng 5432 từ SG ECS. S3 gateway endpoint gắn route table public và db. D15 giữ task ở public subnet có IP công khai để tiết kiệm NAT.

[`infra/modules/network/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/network/main.tf)

```hcl
data "aws_ec2_managed_prefix_list" "cloudfront" {
  name = "com.amazonaws.global.cloudfront.origin-facing"
}
```

:::figure{src="/images/workshop/5.3.1-network-step1.png" alt="5.3.1-network-step1" caption="VPC resource map: 4 subnet ở 2 AZ (public và db), route table, Internet Gateway và S3 endpoint"}

2. **Kiểm tra kết quả**

Đối chiếu VPC resource map, route table và chuỗi SG với Terraform. Không diễn giải hai subnet DB thành RDS Multi-AZ.

:::figure{src="/images/workshop/step4-result.png" alt="Mạng VPC" caption="Security group nutrition-dev-rds: chỉ nhận PostgreSQL 5432 từ security group của ECS"}

#### Lỗi đã ghi nhận

Không ghi nhận sự cố riêng cho bước này. Các sự cố thực tế của toàn dự án (khóa state Terraform, SSO hết hạn, favicon 403, mất phiên khi tải lại, RDS đang dừng, quota Bedrock) và cách xử lý được tổng hợp ở [5.8 Kiểm thử và xử lý sự cố](/5-workshop/5.8-testing-troubleshooting).

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/network/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/network/main.tf).
