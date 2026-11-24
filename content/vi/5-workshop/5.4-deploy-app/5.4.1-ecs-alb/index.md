---
title: "ECS Fargate và ALB"
pre: "5.4.1."
weight: 1
status: "ready"
---

Triển khai backend ARM64 với origin được giới hạn.

1. **Đối chiếu cấu hình nguồn**

ECR giữ image backend. Workflow build linux/arm64 để khớp runtime_platform. Task chạy 0,5 vCPU / 1 GB, desired count 1 trong public subnet có IP công khai. ALB listener chỉ forward khi header bí mật khớp, SG giới hạn CloudFront. Header sinh trong Terraform state, không chép vào báo cáo. Health check dùng /actuator/health.

[`infra/modules/service/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/service/main.tf)

```hcl
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "ARM64"
  }
```

:::figure{src="/images/workshop/5.4.1-ecs-alb-step1.png" alt="5.4.1-ecs-alb-step1" caption="ECS service nutrition-dev-backend: 2 task đang chạy, deployment Success"}

2. **Kiểm tra kết quả**

Kiểm tra task RUNNING, target healthy và tag image. CloudFront → ALB dùng HTTP do chưa có domain; đây là hạn chế được chấp nhận, chưa có HTTPS origin.

:::figure{src="/images/workshop/step7-result.png" alt="ECS Fargate và ALB" caption="Target group nutrition-dev-api: 2 target khỏe mạnh ở cổng 8080"}

#### Lỗi đã ghi nhận

Chưa có lỗi cụ thể được ghi nhận cho bước này trong các nguồn đã đối chiếu. Khi phát sinh, ghi thời điểm, thông báo đã che định danh và cách xử lý được xác nhận.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/service/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/service/main.tf).
