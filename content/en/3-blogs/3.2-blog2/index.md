---
title: "Blog 2"
pre: "3.2."
weight: 2
status: "ready"
---

# Blog 2

# AWS NAT Gateway: Where does an unexpected bill increase come from?

[Published post in AWS Study Group Vietnam](https://www.facebook.com/groups/awsstudygroupfcj/permalink/2340782970019995/)

:::figure{src="/images/blogs/02-nat-gateway-cost.png" alt="blog-2-diagram" caption="Diagram supplied with the original Vietnamese article"}

An application can keep the same instance count and user traffic while EC2-Other charges rise sharply. A private-subnet workload reading and writing S3 through its default route is one example worth investigating.

### 1. Follow the data path behind the charge

Consider a batch or ETL workload in a private subnet that exchanges approximately 20 TB per month with S3. A NAT gateway and internet gateway sit in a public subnet, and the private route table contains 0.0.0.0/0 → nat-gateway.

Without a more specific S3 route, requests follow the default route through the NAT gateway to the public S3 endpoint. The jobs continue to work, while NAT incurs hourly charges and data-processing charges for bytes passing through it.

The article uses a us-east-1 example rate of USD 0.045/GB. With its conversion assumption, 20 TB is approximately 20,480 GB, yielding roughly USD 920 per month in data-processing charges alone. Same-Region EC2-to-S3 data-transfer pricing and NAT data-processing charges are separate parts of the bill.

### 2. Break the total down by usage type and destination

In Cost Explorer, distinguish:

- NatGateway-Hours for the running gateway.
- NatGateway-Bytes for processed data.

If bytes dominate the increase, inspect CloudWatch BytesOutToDestination and BytesInFromDestination over the same period. Use VPC Flow Logs for the NAT gateway ENI to identify high-volume destination IPs. Compare destinations with AWS ip-ranges.json or the Region’s service prefix lists.

A Flow Logs query in Athena or CloudWatch Logs Insights might show that major destinations belong to same-Region S3. Other workloads may be sending substantial traffic to ECR or CloudWatch Logs during image pulls and log delivery. Identify the destination before choosing a cost optimization.

### 3. Match the optimization to the traffic

**Case 1 — S3 or DynamoDB traffic passes through NAT**

A gateway VPC endpoint, associated with the workload’s route tables, can route eligible service traffic through its service prefix list. Gateway endpoints have no hourly or per-GB endpoint charge.

**Case 2 — Traffic targets other AWS services**

For ECR, CloudWatch Logs, STS, Secrets Manager, and similar services, evaluate interface VPC endpoints. These have hourly and data-processing charges, so compare the actual traffic and endpoint count with NAT costs.

**Case 3 — The workload uses a NAT gateway in another AZ**

Examine cross-AZ transfer charges and the cost of placing NAT gateways in each required AZ. Route each subnet to the intended same-AZ gateway where that design is justified.

Also separate genuine internet traffic, such as external APIs and package downloads, from AWS-service traffic. Routing between VPCs may need a different connectivity design.

Endpoint selection has constraints. Gateway endpoints serve supported same-Region S3/DynamoDB access and are not directly usable through on-premises connectivity or VPC peering. Endpoint policies must allow the buckets the application needs, including relevant ECR image-layer storage where applicable.

### 4. System design lessons

During VPC design, document the path to each service as well as internet reachability. A convenient default NAT route can process substantial service traffic that could have followed a more specific route.

For data pipelines, backup, ML workloads, and frequent image pulls, review S3 routing early. When a bill increases, identify its usage type and traffic destination before reducing compute capacity.

### AWS References

- [Gateway endpoints for Amazon S3](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html)
- [NAT gateway pricing](https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-pricing.html)
- [Amazon VPC pricing](https://aws.amazon.com/vpc/pricing/)
- [Monitor NAT gateways with Amazon CloudWatch](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway-cloudwatch.html)
