---
title: "Triển khai ứng dụng"
pre: "5.4."
weight: 4
status: "ready"
---

Triển khai backend ARM64, web React và thanh toán thử. Pipeline dùng token OIDC của GitHub, được AWS STS đổi lấy phiên AWS tạm thời của role deploy.

:::figure{src="/images/architecture/5.4-deploy-app.png" alt="5.4-deploy-app" caption="Sơ đồ thành phần: CloudFront → S3 / ALB → 2 task ECS, ECR, GitHub Actions OIDC qua AWS STS, VNPAY"}

File draw.io để chỉnh sửa: [5.4-deploy-app.drawio](/files/5.4-deploy-app.drawio).

#### Content

- [ECS Fargate và ALB](/5-workshop/5.4-deploy-app/5.4.1-ecs-alb)
- [Frontend trên S3 và CloudFront](/5-workshop/5.4-deploy-app/5.4.2-cloudfront-frontend)
- [CI/CD với GitHub Actions OIDC](/5-workshop/5.4-deploy-app/5.4.3-cicd)
- [Thanh toán VNPAY sandbox](/5-workshop/5.4-deploy-app/5.4.4-payments)
