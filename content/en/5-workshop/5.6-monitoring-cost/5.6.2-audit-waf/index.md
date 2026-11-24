---
title: "CloudTrail, ALB logs and WAF"
pre: "5.6.2."
weight: 2
status: "ready"
---

Monitor application failures and audit administrative activity.

1. **Review the source configuration**

Multi-Region CloudTrail and ALB access logs write to `nutrition-dev-logs-<account-id>`. The bucket blocks public access, uses SSE-S3, and expires logs after 30 days. The S3 gateway endpoint was recorded as available on 22 November 2026. CLOUDFRONT-scope WAF lives in us-east-1 and is created only with -Waf. It uses Common, Known Bad Inputs, IP Reputation, and a 1,000-request/5-minute/IP rate limit. SizeRestrictions_BODY only counts so admin image uploads up to 2 MB are not blocked.

[`infra/modules/audit/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/audit/main.tf)

```hcl
resource "aws_cloudtrail" "main" {
  name                          = local.trail_name
  s3_bucket_name                = aws_s3_bucket.logs.id
  s3_key_prefix                 = "cloudtrail"
  is_multi_region_trail         = true
  include_global_service_events = true
  enable_log_file_validation    = true

  depends_on = [aws_s3_bucket_policy.logs]
}
```

:::figure{src="/images/workshop/5.6.2-audit-waf-step1.png" alt="5.6.2-audit-waf-step1" caption="CloudTrail nutrition-dev-trail: multi-region, logging to S3"}

2. **Verify the result**

Compare alarm state with app_running and verify SNS confirmation, CloudTrail logging, and S3 log objects. WAF may be absent while disabled to reduce costs.

:::figure{src="/images/workshop/step12-result.png" alt="Monitoring and security" caption="Log bucket: alb/ (ALB access logs) and cloudtrail/ folders"}

#### Recorded troubleshooting

No specific failure for this step was found in the reviewed sources. Record the date, redacted error, and verified resolution if an issue occurs.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/alarms/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/alarms/main.tf).
