---
title: "ECS Fargate and ALB"
pre: "5.4.1."
weight: 1
status: "ready"
---

Deploy the ARM64 backend behind restricted origin access.

1. **Review the source configuration**

ECR stores backend images. The workflow builds linux/arm64 to match runtime_platform. The task uses 0.5 vCPU / 1 GB and a desired count of one in public subnets with a public IP. The ALB listener forwards only when the secret header matches, while its SG restricts ingress to CloudFront. The header is generated in Terraform state and must be omitted from the report. Health checks use /actuator/health.

[`infra/modules/service/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/service/main.tf)

```hcl
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "ARM64"
  }
```

:::figure{src="/images/workshop/5.4.1-ecs-alb-step1.png" alt="5.4.1-ecs-alb-step1" caption="ECS service nutrition-dev-backend: two running tasks, deployment Success"}

2. **Verify the result**

Check for a RUNNING task, healthy target, and the deployed image tag. CloudFront → ALB uses HTTP without a custom domain, an accepted limitation with no HTTPS origin yet.

:::figure{src="/images/workshop/step7-result.png" alt="ECS Fargate and ALB" caption="Target group nutrition-dev-api: two healthy targets on port 8080"}

#### Recorded troubleshooting

No issue specific to this step was recorded. Real incidents across the project (Terraform state lock, expired SSO, favicon 403, sign-out on reload, stopped RDS, Bedrock quota) and their fixes are collected in [5.8 Testing and troubleshooting](/5-workshop/5.8-testing-troubleshooting).

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/service/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/service/main.tf).
