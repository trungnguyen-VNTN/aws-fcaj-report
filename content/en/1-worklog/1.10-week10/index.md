---
title: "Week 10 Worklog"
pre: "1.10."
weight: 10
status: "ready"
---

**Topic:** Feature completion and verification

**Dates:** 16/11/2026 – 20/11/2026

### Week 10 Objectives:

- Extend the catalog and add sandbox payments and nutrition profiles.
- Move AI to Tokyo and complete testing and monitoring.

### Tasks carried out this week:

| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Monday | 152-product catalog, diet labels, meal analyzer; VNPAY sandbox payments | 16/11/2026 | 16/11/2026 | [USDA FoodData Central](https://fdc.nal.usda.gov/api-guide) |
| Tuesday | UI refresh (UI Lab): colour tokens, product cards, home banner | 17/11/2026 | 17/11/2026 | [React](https://react.dev/learn) |
| Wednesday | Move Bedrock and Guardrail calls to Tokyo (D18); write the project run guide | 18/11/2026 | 18/11/2026 | [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html) |
| Thursday | Admin VNPAY payment log (D30); update Playwright E2E tests | 19/11/2026 | 19/11/2026 | [VNPAY Sandbox](https://sandbox.vnpayment.vn/apis/docs/gioi-thieu/) |
| Friday | Choose Nova 2 Lite; CloudTrail, ALB access logs, S3 endpoint, optional WAF (D29); weekend: profiles and meal suggestions (D32) | 20/11/2026 | 20/11/2026 | [AWS CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html) |

### Week 10 Achievements:

- A 152-product catalog in 11 categories, filtered by 9 allergen groups and 6 diet labels.
- VNPAY sandbox payments with HMAC-SHA512 IPN verification; admins can view the payment log.
- AI runs Nova 2 Lite in Tokyo with Guardrails; the 45-prompt evaluation scored safety 17/17 and retrieval 27/28.
- Tests on 21 November: backend 86, frontend 145, E2E plus axe 57 all passed; CloudTrail and ALB logs are available for audit.
