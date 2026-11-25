---
title: "Week 11 Worklog"
pre: "1.11."
weight: 11
status: "ready"
---

**Topic:** Multi-AZ resilience, cost, and Budgets

**Dates:** 23/11/2026 – 27/11/2026

### Week 11 Objectives:

- Complete two-AZ resilience and verify cost.
- Build an AWS Pricing Calculator estimate and review Budgets.

### Tasks carried out this week:

| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Monday | Record RDS Multi-AZ and two ECS tasks (D33) after the failover drill; fix sign-out on page reload | 23/11/2026 | 23/11/2026 | [Amazon RDS Multi-AZ](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html) |
| Tuesday | Build an AWS Pricing Calculator estimate from the real configuration; compare with Cost Explorer and credits | 24/11/2026 | 24/11/2026 | [AWS Pricing Calculator](https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html) |
| Wednesday | Review AWS Budgets; test the full VNPAY sandbox flow with IPN; rerun the real-model AI evaluation | 25/11/2026 | 25/11/2026 | [AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html) |
| Thursday | Set budget alert thresholds by spending level (planned) | 26/11/2026 | 26/11/2026 | [AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html) |
| Friday | Review resources that may still be billed after shutdown (planned) | 27/11/2026 | 27/11/2026 | [AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html) |

### Week 11 Achievements:

- Failover drill: the primary moved from ap-southeast-1a to 1b and the API recovered after about half a minute with no data loss.
- AWS Pricing Calculator estimate: USD 116.40/month running 24/7 (USD 126.00 with WAF); about USD 27/month in demo mode.
- USD 100 budget: USD 15.06 used, USD 26.95 forecast; all charges covered by credits.
- The full VNPAY sandbox flow works after registering the IPN URL: order #10 became paid. The real-model AI evaluation passed (BUILD SUCCESS) on 25 November. Thursday and Friday will be updated later.
