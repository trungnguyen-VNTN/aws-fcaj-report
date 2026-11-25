---
title: "Week 7 Worklog"
pre: "1.7."
weight: 7
status: "ready"
---

**Topic:** Project setup and application skeleton

**Dates:** 26/10/2026 – 30/10/2026

### Week 7 Objectives:

- Fix the MVP scope and initial architecture.
- Build the backend, frontend, and sign-in skeleton.

### Tasks carried out this week:

| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Monday | Analyse requirements and fix the MVP scope (catalog, accounts, cart, orders, read-only AI) | 26/10/2026 | 26/10/2026 | [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) |
| Tuesday | Draft the database (products, nutrition, allergens, orders) and the API contract | 27/10/2026 | 27/10/2026 | [Flyway](https://documentation.red-gate.com/flyway) |
| Wednesday | Draft the AWS architecture: CloudFront, ALB, ECS Fargate, RDS, Cognito | 28/10/2026 | 28/10/2026 | [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) |
| Thursday | Initialise the repository; catalog API with PostgreSQL and Flyway; Cognito user pool and groups; frontend scaffold | 29/10/2026 | 29/10/2026 | [Spring Boot](https://docs.spring.io/spring-boot/index.html) |
| Friday | Connect filters and product detail to the API; cart and checkout; START/STOP scripts for local runs | 30/10/2026 | 30/10/2026 | [React](https://react.dev/learn) |

### Week 7 Achievements:

- Fixed the MVP scope and invariants: identity only from the JWT, read-only AI, incomplete products excluded when filtering (fail-closed).
- The repository has a Spring Boot (Java 21) backend with Flyway, a React + TypeScript frontend, and Cognito with USER/ADMIN groups.
- The basic shopping flow works locally: browse, filter, add to cart, place an order.
- The whole application starts locally with one `START.bat` command.
