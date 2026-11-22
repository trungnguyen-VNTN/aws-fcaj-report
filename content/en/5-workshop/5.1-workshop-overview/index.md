---
title: "Introduction"
pre: "5.1."
weight: 1
status: "draft"
---

#### CloudFront → ALB → ECS

Trace browser, database, and AI requests in the single dev environment.

#### Bedrock Guardrails

Nova 2 Lite translates requests into a read-only tool. Code assembles numbers from PostgreSQL and validates outputs before responding.

#### Workshop overview

:::figure{src="/images/architecture/system-overview.png" alt="AWS architecture reference" caption="Source repository reference, reviewed 22 November 2026"}

The dev environment runs one task. The faded task in the other AZ depicts possible replacement placement rather than a second running task.

:::todo[Draw.io diagram]
Redraw the architecture in Draw.io using official AWS icons, export it, and replace the reference image above.
:::

| Service | Role |
| --- | --- |
| CloudFront + S3 | React SPA and images through OAC; path rewriting Function; separate private buckets |
| ALB + ECS Fargate + ECR | ALB accepts CloudFront plus a secret header; Spring Boot 4 / Java 21, ARM64, 0.5 vCPU / 1 GB, one task |
| RDS PostgreSQL + Secrets Manager | db.t4g.micro, 20 GB gp3, Single-AZ, private subnets, encryption; Flyway V1–V11 |
| Cognito | JWT sub and cognito:groups; USER / ADMIN |
| Bedrock + Guardrails | Nova 2 Lite in Tokyo; read-only tool, numerical answers assembled from DB data |
| CloudWatch + SNS + Budgets | 14-day logs, seven alarms, email alerts; USD 100 budget |
| CloudTrail + S3 audit + WAF | Audit and ALB logs retained for 30 days; optional demo WAF; AWS-managed KMS encryption |
| Terraform + IAM + GitHub Actions | S3 state with use_lockfile; SSO, boundary; CI/CD through OIDC |

Read the diagram and decisions D15/D17/D18. CloudFront serves React and forwards API calls. Cognito issues JWTs and the ALB routes requests to Spring Boot on ECS. Catalog, carts, and orders use RDS. D32 suggestions are computed by code while the model selects an intent.

[`docs/diagrams/architecture-star.txt`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/diagrams/architecture-star.txt)

```text
1. Amazon CloudFront phân phối React SPA và ảnh sản phẩm từ hai bucket Amazon S3 riêng tư, qua Origin Access Control.
2. Các yêu cầu /api/* đi qua Internet Gateway tới Application Load Balancer. ALB chỉ nhận lưu lượng từ dải IP của CloudFront và kèm header bí mật.
3. Backend Spring Boot (Java 21) chạy trên Amazon ECS Fargate (ARM64), đặt ở public subnet và không dùng NAT để tiết kiệm chi phí. ECS service trải trên 2 Availability Zone: môi trường dev chạy 1 task, nếu task lỗi thì task thay thế có thể khởi động ở AZ còn lại. Mỗi lớp có security group riêng: ALB chỉ nhận từ CloudFront, ECS chỉ nhận từ ALB, RDS chỉ nhận từ ECS qua cổng 5432.
4. Dữ liệu nằm trên Amazon RDS for PostgreSQL ở private subnet, được mã hoá bằng khoá AWS KMS. Mật khẩu do AWS Secrets Manager quản lý. Truy vấn dùng SQL tham số hoá; trừ kho bằng UPDATE có điều kiện trong transaction.
```

#### Verification and sources

:::figure{src="/images/workshop/step1-result.png" alt="Overview" caption="Evidence screenshot pending owner upload"}

:::todo[Screenshot required]
CloudFront → Distributions → application distribution, showing status and behaviors with identifiers redacted.
:::

Cross-check /api/products, login, and docs/demo.md scenarios. Recorded tests on 21 November 2026: backend 86, frontend 145, E2E plus axe 57. These are historical results rather than tests executed for this report.

No specific failure for this step was found in the reviewed sources. Record the date, redacted error, and verified resolution if an issue occurs.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`docs/diagrams/architecture-star.txt`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/diagrams/architecture-star.txt).
