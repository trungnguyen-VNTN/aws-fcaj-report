---
title: "Week 1 Worklog"
pre: "1.1."
weight: 1
status: "ready"
---

**Topic:** AWS foundations and the AWS CLI

**Dates:** 14/09/2026 – 18/09/2026

### Week 1 Objectives:

- Understand the AWS global infrastructure and the shared responsibility model.
- Set up the AWS CLI with temporary credentials.

### Tasks carried out this week:

| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Monday | Distinguish Regions, Availability Zones, and edge locations | 14/09/2026 | 14/09/2026 | [AWS global infrastructure](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html) |
| Tuesday | Map AWS and customer responsibilities | 15/09/2026 | 15/09/2026 | [AWS global infrastructure](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html) |
| Wednesday | Locate services and the active Region in the Console | 16/09/2026 | 16/09/2026 | [AWS global infrastructure](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html) |
| Thursday | Set up the AWS CLI with temporary SSO credentials | 17/09/2026 | 17/09/2026 | [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) |
| Friday | Verify the active identity with STS and record the configuration | 18/09/2026 | 18/09/2026 | [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) |

### Week 1 Achievements:

- Understood the difference between Regions, AZs, and edge locations; chose ap-southeast-1 (Singapore) as the main Region for proximity to Vietnamese users and service coverage.
- Separated what AWS manages (physical infrastructure, managed services) from what the customer manages (IAM, data, network configuration).
- Installed AWS CLI v2 and configured an IAM Identity Center profile instead of long-lived access keys.
- `aws sts get-caller-identity` returned the expected SSO role; noted how to recover from an expired token (`aws sso login`).
