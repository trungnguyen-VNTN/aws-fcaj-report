---
title: "Deploy the application"
pre: "5.4."
weight: 4
status: "draft"
---

Deploy the ARM64 backend, React frontend, and sandbox payments. The pipeline obtains temporary AWS sessions through OIDC.

:::figure{src="/images/architecture/5.4-deploy-app.png" alt="5.4-deploy-app" caption="Component diagram pending"}

:::todo[Draw.io diagram]
Draw this section’s component diagram with Draw.io and AWS icons, using the overall reference diagram.
:::

#### Content

- [ECS Fargate and ALB](/5-workshop/5.4-deploy-app/5.4.1-ecs-alb)
- [Frontend on S3 and CloudFront](/5-workshop/5.4-deploy-app/5.4.2-cloudfront-frontend)
- [CI/CD with GitHub Actions OIDC](/5-workshop/5.4-deploy-app/5.4.3-cicd)
- [VNPAY sandbox payments](/5-workshop/5.4-deploy-app/5.4.4-payments)
