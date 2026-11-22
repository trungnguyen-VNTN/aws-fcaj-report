---
title: "Tạo mạng VPC"
pre: "5.3.1."
weight: 1
status: "draft"
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

:::figure{src="/images/workshop/5.3.1-network-step1.png" alt="5.3.1-network-step1" caption="Ảnh cần bổ sung"}

:::todo[Cần chụp ảnh]
VPC → Your VPCs → Resource map, Security Groups → inbound rules và Endpoints → S3 gateway endpoint available.
:::

2. **Kiểm tra kết quả**

Đối chiếu VPC resource map, route table và chuỗi SG với Terraform. Không diễn giải hai subnet DB thành RDS Multi-AZ.

:::figure{src="/images/workshop/step4-result.png" alt="Mạng VPC" caption="Ảnh minh chứng cần chủ repo bổ sung"}

:::todo[Cần chụp ảnh]
VPC → Your VPCs → Resource map, Security Groups → inbound rules và Endpoints → S3 gateway endpoint available.
:::

#### Lỗi đã ghi nhận

Chưa có lỗi cụ thể được ghi nhận cho bước này trong các nguồn đã đối chiếu. Khi phát sinh, ghi thời điểm, thông báo đã che định danh và cách xử lý được xác nhận.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/network/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/network/main.tf).
