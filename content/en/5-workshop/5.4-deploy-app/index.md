---
title: "Deploy the application"
pre: "5.4."
weight: 4
status: "ready"
---

Deploy the ARM64 backend, React frontend, and sandbox payments. The pipeline obtains temporary AWS sessions through OIDC.

:::figure{src="/images/architecture/5.4-deploy-app.png" alt="5.4-deploy-app" caption="Component diagram: CloudFront → S3 / ALB → two ECS tasks, ECR, GitHub Actions OIDC, VNPAY"}

Editable draw.io source: [5.4-deploy-app.drawio](/files/5.4-deploy-app.drawio).

#### Content

- [ECS Fargate and ALB](/5-workshop/5.4-deploy-app/5.4.1-ecs-alb)
- [Frontend on S3 and CloudFront](/5-workshop/5.4-deploy-app/5.4.2-cloudfront-frontend)
- [CI/CD with GitHub Actions OIDC](/5-workshop/5.4-deploy-app/5.4.3-cicd)
- [VNPAY sandbox payments](/5-workshop/5.4-deploy-app/5.4.4-payments)
