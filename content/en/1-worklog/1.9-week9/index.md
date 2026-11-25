---
title: "Week 9 Worklog"
pre: "1.9."
weight: 9
status: "ready"
---

**Topic:** Data and AWS deployment

**Dates:** 09/11/2026 – 13/11/2026

### Week 9 Objectives:

- Load real nutrition data and build the infrastructure with Terraform.
- Deploy the application to AWS and add controlled AI.

### Tasks carried out this week:

| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Monday | Load USDA FoodData Central data for the local catalog | 09/11/2026 | 09/11/2026 | [USDA FoodData Central](https://fdc.nal.usda.gov/api-guide) |
| Tuesday | Write IAM policies for the deploy permission set and permissions boundary (D16); fix the Terraform layout | 10/11/2026 | 10/11/2026 | [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) |
| Wednesday | Terraform: network, RDS, ECR, Cognito, ALB, ECS, CloudFront, OIDC; demo-only uptime (D20) | 11/11/2026 | 11/11/2026 | [Terraform AWS provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) |
| Thursday | Deploy through GitHub Actions OIDC; image bucket via CloudFront /images/*; seed the catalog; first run on AWS | 12/11/2026 | 12/11/2026 | [GitHub OIDC with AWS](https://docs.github.com/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) |
| Friday | Chat guardrail, CloudWatch alarms via SNS, rate limiting, password reset, 30-prompt AI evaluation | 13/11/2026 | 13/11/2026 | [Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html) |

### Week 9 Achievements:

- The application runs on AWS through the CloudFront domain, with all infrastructure in Terraform.
- GitHub Actions deploys through OIDC without long-lived access keys.
- The catalog has USDA nutrition data and product photos; seven CloudWatch alarms send e-mail alerts.
- Found that the Bedrock quota in Singapore is zero and recorded it for the following week.
