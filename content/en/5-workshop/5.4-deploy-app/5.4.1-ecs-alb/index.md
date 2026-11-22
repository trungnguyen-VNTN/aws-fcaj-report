---
title: "ECS Fargate and ALB"
pre: "5.4.1."
weight: 1
status: "draft"
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

:::figure{src="/images/workshop/5.4.1-ecs-alb-step1.png" alt="5.4.1-ecs-alb-step1" caption="Screenshot pending"}

:::todo[Screenshot required]
ECS → Clusters → service → Tasks and EC2 → Target Groups → Targets; redact task and account identifiers.
:::

2. **Verify the result**

Check for a RUNNING task, healthy target, and the deployed image tag. CloudFront → ALB uses HTTP without a custom domain, an accepted limitation with no HTTPS origin yet.

:::figure{src="/images/workshop/step7-result.png" alt="ECS Fargate and ALB" caption="Evidence screenshot pending owner upload"}

:::todo[Screenshot required]
ECS → Clusters → service → Tasks and EC2 → Target Groups → Targets; redact task and account identifiers.
:::

#### Recorded troubleshooting

No specific failure for this step was found in the reviewed sources. Record the date, redacted error, and verified resolution if an issue occurs.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/service/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/service/main.tf).
