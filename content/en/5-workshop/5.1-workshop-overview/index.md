---
title: "Introduction"
pre: "5.1."
weight: 1
status: "ready"
---

#### CloudFront → ALB → ECS

Trace browser, database, and AI requests in the single dev environment.

#### Bedrock Guardrails

Nova 2 Lite translates requests into a read-only tool. Code assembles numbers from PostgreSQL and validates outputs before responding.

#### Workshop overview

:::figure{src="/images/architecture/system-overview.png" alt="AWS architecture reference" caption="AWS architecture drawn in draw.io with the AWS Architecture Icons, updated for Multi-AZ on 23 November 2026"}

Download the editable draw.io source: [aws-architecture.drawio](/files/aws-architecture.drawio).

Since 22 November 2026 (D33) the dev environment runs two ECS tasks, one per Availability Zone, and RDS runs Multi-AZ with a standby in the second AZ. A *Reboot with failover* drill on 22 November moved the primary from ap-southeast-1a to ap-southeast-1b in about 20–45 seconds; the API was interrupted for about half a minute and recovered on its own, with no data loss.

| Service | Role |
| --- | --- |
| CloudFront + S3 | React SPA and images through OAC; path rewriting Function; separate private buckets |
| ALB + ECS Fargate + ECR | ALB accepts CloudFront plus a secret header; Spring Boot 4 / Java 21, ARM64, 0.5 vCPU / 1 GB, two tasks across two AZs |
| RDS PostgreSQL + Secrets Manager | db.t4g.micro, 20 GB gp3, Multi-AZ (standby in the second AZ), private subnets, encryption; Flyway V1–V11 |
| Cognito | JWT sub and cognito:groups; USER / ADMIN |
| Bedrock + Guardrails | Nova 2 Lite in Tokyo; read-only tool, numerical answers assembled from DB data |
| CloudWatch + SNS + Budgets | 14-day logs, seven alarms, email alerts; USD 100 budget |
| CloudTrail + S3 audit + WAF | Audit and ALB logs retained for 30 days; optional demo WAF; AWS-managed KMS encryption |
| Terraform + IAM + GitHub Actions | S3 state with use_lockfile; SSO, boundary; CI/CD through OIDC |

Read the diagram and decisions D15/D17/D18. CloudFront serves React and forwards API calls. Cognito issues JWTs and the ALB routes requests to Spring Boot on ECS. Catalog, carts, and orders use RDS. D32 suggestions are computed by code while the model selects an intent.

[`docs/diagrams/architecture-star.txt`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/diagrams/architecture-star.txt)

```text
1. Amazon CloudFront serves the React SPA and product images from two private Amazon S3 buckets through Origin Access Control.
2. Requests to /api/* pass through the Internet Gateway to the Application Load Balancer. The ALB accepts traffic only from the CloudFront IP ranges and only with a secret header.
3. The Spring Boot (Java 21) backend runs on Amazon ECS Fargate (ARM64) in public subnets without NAT to save cost. The ECS service runs two tasks across two Availability Zones: if one AZ fails, the task in the other AZ keeps serving. Each tier has its own security group: the ALB accepts only CloudFront, ECS accepts only the ALB, and RDS accepts only ECS on port 5432.
4. Data lives in Amazon RDS for PostgreSQL Multi-AZ in private subnets, with a standby in the second AZ that takes over automatically when the primary fails. Data is encrypted with an AWS KMS key and the password is managed by AWS Secrets Manager. Queries are parameterised; stock is decremented with a conditional UPDATE inside a transaction.
```

#### Live product (Demo)

| Evidence | Link |
| --- | --- |
| Application (running on the dev environment) | [https://ddn09pubqlwme.cloudfront.net](https://ddn09pubqlwme.cloudfront.net) |
| Source code | [github.com/trungnguyen-VNTN/nutrition-ecommerce](https://github.com/trungnguyen-VNTN/nutrition-ecommerce) |
| Full demo video (4:57) | [https://youtu.be/_yt_s3DTMr0](https://youtu.be/_yt_s3DTMr0) |

To save cost, the application is switched on only for demos and grading (`demo-infra.ps1 up`) and switched off otherwise (`down`). While it is off the site still loads but the API reports that it is paused; the demo video records the full flow: sign-in, product filters, nutrition profile, AI lookup, cart, checkout and the admin pages.

#### Verification and sources

:::figure{src="/images/workshop/step1-result.png" alt="Overview" caption="CloudFront distribution: *.cloudfront.net domain, HTTP/3 support, index.html as default root object"}

Cross-check /api/products, login, and docs/demo.md scenarios. Recorded tests on 21 November 2026: backend 86, frontend 145, E2E plus axe 57. These are historical results rather than tests executed for this report.

Command-line tests and the real incidents met during the project are recorded in [5.8 Testing and troubleshooting](/5-workshop/5.8-testing-troubleshooting).

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`docs/diagrams/architecture-star.txt`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/diagrams/architecture-star.txt).
