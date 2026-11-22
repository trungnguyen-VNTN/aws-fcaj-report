---
title: "Cost estimation and optimization"
pre: "5.6.3."
weight: 3
status: "draft"
---

Distinguish demo, continuous operation, and proposed production costs.

1. **Review the source configuration**

Monthly USD estimates use the Singapore assumptions recorded in the brief on 22 November 2026, before tax, with possible ±10% variation. Production is a future proposal that has not been deployed. Bedrock calls actually run in Tokyo.

| Service / configuration | Demo (~4h/day) | 24/7 | Proposed production |
| --- | --- | --- | --- |
| RDS t4g.micro, 20 GB gp3, Single-AZ | ~4 | ~22 | ~70 (Multi-AZ, t4g.small) |
| ALB, 2 AZ | ~3 | ~20 | ~22 |
| ECS ARM64, 0.5 vCPU / 1 GB, 1 task | ~2.5 | ~15 | ~30 (2 tasks) |
| Public IPv4, 3 addresses | ~2 | ~11 | ~11 |
| Secrets Manager, 2 secrets | 0.8 | 0.8 | 0.8 |
| Bedrock Nova 2 Lite | <1 | <1 | Usage dependent |
| CloudFront, Cognito, CloudTrail, S3, ECR, CloudWatch | ~0–1 | ~1–3 | ~5 |
| WAF (optional) | 0 | ~8–10 | ~10 |
| **Estimated total** | **~12–18** | **~65–75** | **~150–200** |

Cost Explorer recorded **USD 6.44** for 1–21 November 2026, fully covered by credits. Major charges were RDS 2.77, ALB 1.29, ECS 1.21, public IPv4 0.74, Bedrock 0.21, and Secrets Manager 0.20 USD. These are selected major charges rather than a complete bill reconciliation. Demo-only uptime means this observation cannot be extrapolated to continuous operation.

:::todo[AWS Pricing Calculator]
Validate each service configuration and Region in AWS Pricing Calculator and attach the dated estimate link. If ECS moves to private subnets, include the brief assumption of approximately USD 45/month for NAT.
:::

The app defaults to off. D20 uses up/down to retain RDS storage, S3, and fixed charges while idle. D15 avoids NAT; Single-AZ RDS and one task suit dev. Fargate Spot is a future option requiring interruption analysis and is not confirmed as deployed in the current module.

[`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1)

```powershell
    .\scripts\demo-infra.ps1 down   # remove ALB + ECS service, stop RDS (~5-10 min)
```

:::figure{src="/images/workshop/5.6.3-cost-step1.png" alt="5.6.3-cost-step1" caption="Screenshot pending"}

:::todo[Screenshot required]
Billing → Cost Explorer → 1–21 November 2026, grouped by Service; capture usage total and credits with account and billing details redacted.
:::

2. **Verify the result**

Use the 1–21 November 2026 Cost Explorer interval and distinguish credits from usage. Monthly estimates are not a guaranteed bill.

:::figure{src="/images/workshop/step11-result.png" alt="Cost estimation and optimization" caption="Evidence screenshot pending owner upload"}

:::todo[Screenshot required]
Billing → Cost Explorer → 1–21 November 2026, grouped by Service; capture usage total and credits with account and billing details redacted.
:::

#### Recorded troubleshooting

No specific failure for this step was found in the reviewed sources. Record the date, redacted error, and verified resolution if an issue occurs.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1).
