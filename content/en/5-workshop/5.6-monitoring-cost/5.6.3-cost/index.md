---
title: "Cost estimation and optimization"
pre: "5.6.3."
weight: 3
status: "ready"
---

Distinguish demo, continuous operation, and proposed production costs.

1. **Review the source configuration**

Monthly USD estimates, checked against AWS Pricing Calculator on 25 November 2026 for the Multi-AZ, two-task setup (D33), before tax, with possible ±10% variation. Production is a future proposal that has not been deployed. Bedrock calls actually run in Tokyo.

| Service / configuration | Demo (~4 h/day) | 24/7 (Pricing Calculator) | Proposed production |
| --- | --- | --- | --- |
| RDS PostgreSQL db.t4g.micro, Multi-AZ, 20 GB gp3 | ~11.6 | 42.75 | ~70 (Multi-AZ, db.t4g.small) |
| ECS Fargate ARM64, 0.5 vCPU / 1 GB, 2 tasks | ~5.9 | 35.98 | ~36–72 (2–4 tasks, auto scaling) |
| Application Load Balancer | ~3.1 | 18.63 | ~22 |
| Public IPv4, 4 addresses | ~2.4 | 14.60 | ~15 |
| Secrets Manager, 2 secrets | 0.85 | 0.85 | 0.85 |
| Bedrock (Nova Lite as price reference, Tokyo) | <0.7 | 0.70 | Usage dependent |
| CloudFront 1.02 · CloudWatch 1.70 · ECR 0.10 · S3 0.07 · Cognito 0 · CloudTrail 0 | ~2.9 | 2.89 | ~5 |
| **Total (without WAF)** | **~27** | **116.40** | **~150–190** |
| WAF (optional group) | 0 | 9.60 | ~10 |
| **Total with WAF** | — | **126.00** | **~160–200** |

Cost Explorer recorded **USD 6.44** for 1–21 November 2026, fully covered by credits. Major charges were RDS 2.77, ALB 1.29, ECS 1.21, public IPv4 0.74, Bedrock 0.21, and Secrets Manager 0.20 USD. These are selected major charges rather than a complete bill reconciliation. Demo-only uptime means this observation cannot be extrapolated to continuous operation. It was recorded before the Multi-AZ switch.

**AWS Pricing Calculator:** [estimate dated 25 November 2026](https://calculator.aws/#/estimate?id=8dfa24875b5ab56798dc086bcac564644ffcfce4). The 24/7 column is taken directly from the Calculator (Singapore; Bedrock in Tokyo). The Demo column is derived from it for about 120 running hours a month: hourly items (RDS instance, Fargate, ALB, IPv4) are multiplied by 120/730, while RDS storage (USD 5.52) and usage-based items stay the same. Load assumptions: 50 monthly users, 5 GB of CloudFront transfer, about 3,600 AI questions a month (1 per minute for 2 hours a day, 1,500 input and 300 output tokens). The Calculator does not list Amazon Nova 2 Lite yet, so Amazon Nova Lite is used as the price reference. RDS Proxy and Database Insights Advanced are excluded because the project does not use them.

The app defaults to off. D20 uses up/down to retain RDS storage, S3, and fixed charges while idle. D15 avoids NAT. Since D33, Multi-AZ RDS and two tasks add only about USD 0.05 per hour while the app is on, plus about USD 2.8/month for the standby storage; two variables (`rds_multi_az`, `api_desired_count`) switch back to one AZ. Fargate Spot is a future option requiring interruption analysis and is not confirmed as deployed in the current module.

[`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1)

```powershell
    .\scripts\demo-infra.ps1 down   # remove ALB + ECS service, stop RDS (~5-10 min)
```

:::figure{src="/images/workshop/5.6.3-cost-step1.png" alt="5.6.3-cost-step1" caption="Cost Explorer, November 2026 cost by service (credits excluded)"}

2. **Verify the result**

Use the 1–21 November 2026 Cost Explorer interval and distinguish credits from usage. Monthly estimates are not a guaranteed bill.

:::figure{src="/images/workshop/step11-result.png" alt="Cost estimation and optimization" caption="Billing → Credits: USD 199.99 total credit, about USD 15.07 used"}

#### Recorded troubleshooting

No issue specific to this step was recorded. Real incidents across the project (Terraform state lock, expired SSO, favicon 403, sign-out on reload, stopped RDS, Bedrock quota) and their fixes are collected in [5.8 Testing and troubleshooting](/5-workshop/5.8-testing-troubleshooting).

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1).
