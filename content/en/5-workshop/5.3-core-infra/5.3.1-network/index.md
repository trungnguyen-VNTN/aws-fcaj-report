---
title: "Create the VPC network"
pre: "5.3.1."
weight: 1
status: "draft"
---

Separate ALB, ECS, and RDS access paths.

1. **Review the source configuration**

The network module creates a VPC, two public and two private-db subnets, an internet gateway, and security groups. Public subnets route to the internet. ALB ingress uses the CloudFront origin-facing prefix list, ECS accepts the ALB SG, and RDS accepts port 5432 from the ECS SG. An S3 gateway endpoint serves public and DB route tables. D15 keeps tasks in public subnets with public IPs to avoid NAT costs.

[`infra/modules/network/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/network/main.tf)

```hcl
data "aws_ec2_managed_prefix_list" "cloudfront" {
  name = "com.amazonaws.global.cloudfront.origin-facing"
}
```

:::figure{src="/images/workshop/5.3.1-network-step1.png" alt="5.3.1-network-step1" caption="VPC resource map: four subnets across two AZs (public and db), route tables, Internet Gateway and S3 endpoint"}

2. **Verify the result**

Compare the VPC resource map, routes, and SG chain with Terraform. The two DB subnets do not imply a Multi-AZ RDS deployment.

:::figure{src="/images/workshop/step4-result.png" alt="VPC networking" caption="Security group nutrition-dev-rds: PostgreSQL 5432 only from the ECS security group"}

#### Recorded troubleshooting

No specific failure for this step was found in the reviewed sources. Record the date, redacted error, and verified resolution if an issue occurs.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/network/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/network/main.tf).
