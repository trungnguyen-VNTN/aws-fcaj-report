---
title: "Proposal"
pre: "2."
weight: 2
status: "ready"
---

# AWS Personalized Nutrition E-Commerce Platform

## Sourced Nutrition Lookup and Shopping on AWS

### 1. Executive Summary

The AWS Personalized Nutrition E-Commerce Platform combines food discovery, shopping, and meal suggestions using sourced data. React calls Spring Boot through CloudFront and an ALB, PostgreSQL stores the data, and Bedrock interprets requests. Nutrition and allergen filters exclude incomplete records. Code assembles numerical answers from the database, while demo-session operation controls costs.

### 2. Problem Statement

### What's the Problem?

Buyers cannot reliably compare foods when nutrition and allergen records are inconsistent. AI answers can contain unsupported numbers when a model generates the response itself.

### The Solution

Buyers lack consistent nutrition and allergen information across products. Generative chat can introduce unsupported numbers. The MVP includes 152 USDA products, accounts, nutrition filters, nine allergens and six dietary labels, meal analysis, read-only AI lookup, carts, orders, and administration for products, images, orders, statistics, and payment events. COD and VNPAY sandbox are included.

D32 adds profiles and single-meal suggestions with protein, vegetables/fruit, and starch. Targets use Mifflin-St Jeor multiplied by activity level. Eligibility is limited to ages 18–65 and BMI 17–35, excluding pregnancy, breastfeeding, and medically supervised conditions. Real payments, automated refunds, and medical advice are outside scope. Identity comes from JWTs and stock is decremented conditionally inside a transaction.

### Benefits and Return on Investment

Buyers query DB-sourced facts, filter products, and see data limitations. Store administrators manage catalog, images, orders, and payment events in one application. Cost Explorer recorded USD 6.44 for 1–21 November 2026, fully offset by credits. Revenue and labor-saving measurements are unavailable for calculating financial ROI.

### 3. Solution Architecture

:::figure{src="/images/architecture/system-overview.png" alt="AWS architecture reference" caption="AWS architecture drawn in draw.io with the AWS Architecture Icons, updated for Multi-AZ and AWS STS on 25 November 2026"}

Since 22 November 2026 (D33) the dev environment runs two ECS tasks, one per Availability Zone, and RDS runs Multi-AZ with a standby in the second AZ. A *Reboot with failover* drill on 22 November moved the primary from ap-southeast-1a to ap-southeast-1b in about 20–45 seconds; the API was interrupted for about half a minute and recovered on its own, with no data loss.

### AWS Services Used

- **CloudFront + S3** — React SPA and images through OAC; path rewriting Function; separate private buckets.
- **ALB + ECS Fargate + ECR** — ALB accepts CloudFront plus a secret header; Spring Boot 4 / Java 21, ARM64, 0.5 vCPU / 1 GB, two tasks across two AZs.
- **RDS PostgreSQL + Secrets Manager** — db.t4g.micro, 20 GB gp3, Multi-AZ (standby in the second AZ), private subnets, encryption; Flyway V1–V11.
- **Cognito** — JWT sub and cognito:groups; USER / ADMIN.
- **Bedrock + Guardrails** — Nova 2 Lite in Tokyo; read-only tool, numerical answers assembled from DB data.
- **CloudWatch + SNS + Budgets** — 14-day logs, seven alarms, email alerts; USD 100 budget.
- **CloudTrail + S3 audit + WAF** — Audit and ALB logs retained for 30 days; optional demo WAF; AWS-managed KMS encryption.
- **Terraform + IAM + STS + GitHub Actions** — S3 state with use_lockfile; SSO, boundary; CI/CD through OIDC, with AWS STS issuing temporary credentials (AssumeRoleWithWebIdentity) instead of stored access keys.

The application runs in ap-southeast-1 with the nutrition-dev prefix and one dev environment. D15 places ECS in public subnets with public IPs to avoid NAT charges while RDS stays private. D17 keeps a single environment for the project. D18 moves Bedrock and Guardrail calls to ap-northeast-1 because this account has zero Singapore quota, using jp.amazon.nova-2-lite-v1:0. D24/D31 restrict the model to searchProducts with search, facts, compare, and plan intents; the backend assembles numbers. CloudFront currently reaches the ALB over HTTP because a custom domain is not configured.

### Component Design

- React + TypeScript frontend presents catalog, carts, profiles, suggestions, and administration.
- Spring Boot 4 / Java 21 backend packages include catalog for lookup, commerce for carts/orders, payments for IPN validation, ai for intent extraction, admin for administration APIs, and profile for targets and suggestions.
- PostgreSQL uses parameterized SQL and Flyway V1–V11.
- AI uses Nova 2 Lite with Guardrails; code validates filters and assembles DB-derived numbers.
- GitHub Actions runs tests, builds ARM64 images, obtains temporary credentials from AWS STS through OIDC, pushes to ECR, and deploys.

### 4. Technical Implementation

Terraform provisions infrastructure; the Maven wrapper and Flyway manage the backend/schema; React + TypeScript implements the frontend. OIDC workflows build, test, and deploy from master. The phases below group recorded repository milestones.

| Phase | Dates in 2026 | Recorded work |
| --- | --- | --- |
| 1 | 29 Oct–1 Nov | Repository, frontend scaffold, catalog backend, Cognito |
| 2 | 3–10 Nov | UI redesign and USDA data |
| 3 | 11–12 Nov | Terraform network/RDS/ECR/Cognito/ALB/ECS/CloudFront, OIDC, first AWS deployment |
| 4 | 13–18 Nov | AI, Guardrails, alarms, search, rate limiting, meal analysis, sandbox payments, UI |
| 5 | 20–22 Nov | Tokyo, E2E, audit and optional WAF, complete AI intents, D32, audit apply and cost measurement |

### 5. Timeline & Milestones

| Date | Recorded milestone |
| --- | --- |
| 29/10/2026 | Repository initialized |
| 01/11/2026 | Frontend scaffold, catalog backend, Cognito |
| 03–06/11/2026 | UI redesign |
| 10/11/2026 | USDA data |
| 11/11/2026 | Terraform networking, RDS, ECR, Cognito, ALB, ECS, and CloudFront |
| 12/11/2026 | OIDC, product images, and first AWS deployment |
| 13/11/2026 | AI, Guardrails, evaluation, and alarms |
| 14–15/11/2026 | Search, password reset, statistics, rate limiting, Spring Boot 4 |
| 16/11/2026 | Expanded catalog, dietary labels, meal analysis, VNPAY sandbox |
| 17–18/11/2026 | UI refinement |
| 20/11/2026 | Tokyo, E2E, audit, optional WAF, payment events |
| 21/11/2026 | Complete AI intents, D32 profiles and meal suggestions |
| 22/11/2026 | Audit infrastructure applied and costs measured |

### 6. Budget Estimation

### Infrastructure Costs

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

### 7. Risk Assessment

#### Risk Matrix

| Risk | Impact | Likelihood | Severity |
| --- | --- | --- | --- |
| Unexpected costs | Medium | Medium | Medium |
| Personal data exposure | High | Low | Medium |
| Incorrect/medical AI output | High | Medium | High |
| Bedrock quota | Medium | High (occurred in Singapore) | Medium |
| CloudFront-to-ALB HTTP | Medium | Low | Low |
| Single Availability Zone failure | High | Low | Medium (reduced by Multi-AZ) |

Scoring: impact and likelihood use three levels (Low / Medium / High); severity combines both after the mitigations below. AI risk is rated High because wrong nutrition numbers or medical advice could affect user health, so it has several layers of control.

#### Mitigation Strategies

- Costs: USD 100 budget, alarms, and up/down operation. RDS can restart after seven stopped days.
- Personal data: JWT identity and authorization, no PII logging, body measurements excluded from model calls, and profile deletion by users.
- AI: Guardrails, a read-only tool, and DB-derived numbers. The 45-prompt evaluation on 21 November 2026 achieved safety 17/17 and retrieval 27/28 against an 85% threshold. L01 remains variable.
- Quotas: Tokyo replaces Singapore under D18; verify ApplyGuardrail permissions.
- Origin access: CloudFront prefix lists and a secret header limit direct access. HTTP to the ALB remains a limitation. Future HTTPS origin access requires a domain and certificate.

#### Contingency Plans

When Bedrock is unavailable, retain catalog/shopping flows and return a controlled AI failure. Use down according to the runbook when costs need containment. Database recovery follows the snapshot procedure in docs/runbook.md; a completed drill record remains pending.

### 8. Expected Outcomes

#### Technical Improvements:

- React and API reachable through CloudFront.
- Source code, tests, and OIDC workflows on GitHub.
- Terraform and demo-session operations instructions.
- A grouped workshop and bilingual report.

Sources: [`README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/README.md), [`docs/architecture.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/architecture.md), [`docs/decisions.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/decisions.md), [`docs/api-contract.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/api-contract.md), [`docs/db-schema.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/db-schema.md).

#### Long-term Value

The undeployed production roadmap includes Multi-AZ RDS, two tasks, a custom domain with HTTPS to the ALB, and permanent WAF. Each change requires a plan, failure-tolerance review, and updated cost estimates.
