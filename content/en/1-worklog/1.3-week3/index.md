---
title: "Week 3 Worklog"
pre: "1.3."
weight: 3
status: "ready"
---

**Topic:** Amazon VPC and networking

**Dates:** 28/09/2026 – 02/10/2026

### Week 3 Objectives:

- Design a VPC with public and private subnets across AZs.
- Trace a request and its control points.

### Tasks carried out this week:

| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Monday | Draw a VPC and choose CIDR ranges | 28/09/2026 | 28/09/2026 | [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) |
| Tuesday | Split public and private subnets by Availability Zone | 29/09/2026 | 29/09/2026 | [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) |
| Wednesday | Read route tables and the Internet Gateway path | 30/09/2026 | 30/09/2026 | [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) |
| Thursday | Compare security groups with network ACLs | 01/10/2026 | 01/10/2026 | [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) |
| Friday | Trace a request and identify where it can be blocked | 02/10/2026 | 02/10/2026 | [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) |

### Week 3 Achievements:

- Designed a 10.20.0.0/16 VPC with four subnets (two public, two private) across two AZs, later reused by the project.
- Separated public subnets (0.0.0.0/0 route to the Internet Gateway) from private subnets (no Internet route).
- Compared stateful security groups with stateless network ACLs; chose the ALB → ECS → RDS security group chain for the project.
- Reviewed NAT Gateway cost and the S3 gateway endpoint alternative.
