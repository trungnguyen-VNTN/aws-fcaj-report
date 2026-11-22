---
title: "Triển khai ứng dụng"
pre: "5.4."
weight: 4
status: "draft"
---

Triển khai backend ARM64, web React và thanh toán thử. Pipeline dùng role OIDC để lấy phiên AWS tạm thời.

:::figure{src="/images/architecture/5.4-deploy-app.png" alt="5.4-deploy-app" caption="Sơ đồ thành phần cần vẽ"}

:::todo[Sơ đồ Draw.io]
Vẽ sơ đồ con bằng Draw.io và AWS icons cho các thành phần của mục này, theo sơ đồ tham khảo tổng thể.
:::

#### Content

- [ECS Fargate và ALB](/5-workshop/5.4-deploy-app/5.4.1-ecs-alb)
- [Frontend trên S3 và CloudFront](/5-workshop/5.4-deploy-app/5.4.2-cloudfront-frontend)
- [CI/CD với GitHub Actions OIDC](/5-workshop/5.4-deploy-app/5.4.3-cicd)
- [Thanh toán VNPAY sandbox](/5-workshop/5.4-deploy-app/5.4.4-payments)
