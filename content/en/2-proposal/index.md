---
title: "Proposal"
pre: "2."
weight: 2
status: "draft"
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

:::figure{src="/images/architecture/system-overview.png" alt="AWS architecture reference" caption="Source repository reference, reviewed 22 November 2026"}

The dev environment runs one task. The faded task in the other AZ depicts possible replacement placement rather than a second running task.

:::todo[Draw.io diagram]
Redraw the architecture in Draw.io using official AWS icons, export it, and replace the reference image above.
:::

### AWS Services Used

- **CloudFront + S3** — React SPA and images through OAC; path rewriting Function; separate private buckets.
- **ALB + ECS Fargate + ECR** — ALB accepts CloudFront plus a secret header; Spring Boot 4 / Java 21, ARM64, 0.5 vCPU / 1 GB, one task.
- **RDS PostgreSQL + Secrets Manager** — db.t4g.micro, 20 GB gp3, Single-AZ, private subnets, encryption; Flyway V1–V11.
- **Cognito** — JWT sub and cognito:groups; USER / ADMIN.
- **Bedrock + Guardrails** — Nova 2 Lite in Tokyo; read-only tool, numerical answers assembled from DB data.
- **CloudWatch + SNS + Budgets** — 14-day logs, seven alarms, email alerts; USD 100 budget.
- **CloudTrail + S3 audit + WAF** — Audit and ALB logs retained for 30 days; optional demo WAF; AWS-managed KMS encryption.
- **Terraform + IAM + GitHub Actions** — S3 state with use_lockfile; SSO, boundary; CI/CD through OIDC.

The application runs in ap-southeast-1 with the nutrition-dev prefix and one dev environment. D15 places ECS in public subnets with public IPs to avoid NAT charges while RDS stays private. D17 keeps a single environment for the project. D18 moves Bedrock and Guardrail calls to ap-northeast-1 because this account has zero Singapore quota, using jp.amazon.nova-2-lite-v1:0. D24/D31 restrict the model to searchProducts with search, facts, compare, and plan intents; the backend assembles numbers. CloudFront currently reaches the ALB over HTTP because a custom domain is not configured.

### Component Design

- React + TypeScript frontend presents catalog, carts, profiles, suggestions, and administration.
- Spring Boot 4 / Java 21 backend packages include catalog for lookup, commerce for carts/orders, payments for IPN validation, ai for intent extraction, admin for administration APIs, and profile for targets and suggestions.
- PostgreSQL uses parameterized SQL and Flyway V1–V11.
- AI uses Nova 2 Lite with Guardrails; code validates filters and assembles DB-derived numbers.
- GitHub Actions runs tests, builds ARM64 images, pushes ECR, and deploys through OIDC.

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

### 7. Risk Assessment

#### Risk Matrix

| Risk | Impact | Likelihood | Severity |
| --- | --- | --- | --- |
| Unexpected costs | — | — | — |
| Personal data exposure | — | — | — |
| Incorrect/medical AI output | — | — | — |
| Bedrock quota | — | — | — |
| CloudFront-to-ALB HTTP | — | — | — |

:::todo[Confirm risk matrix]
The owner should confirm impact, likelihood, and severity for each risk. The source repository does not provide these ratings.
:::

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

Sources: [`CLAUDE.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/CLAUDE.md), [`docs/architecture.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/architecture.md), [`docs/decisions.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/decisions.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`docs/api-contract.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/api-contract.md), [`docs/db-schema.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/db-schema.md).

#### Long-term Value

The undeployed production roadmap includes Multi-AZ RDS, two tasks, a custom domain with HTTPS to the ALB, and permanent WAF. Each change requires a plan, failure-tolerance review, and updated cost estimates.
