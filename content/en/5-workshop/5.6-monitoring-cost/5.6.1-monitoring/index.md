---
title: "CloudWatch alarms and logs"
pre: "5.6.1."
weight: 1
status: "ready"
---

Monitor application failures and audit administrative activity.

1. **Review the source configuration**

CloudWatch Logs retain application logs for 14 days. Seven alarms cover ALB 5xx, healthy targets, ECS CPU/memory, RDS CPU/storage, and ERROR logs. SNS recipients must confirm their subscription. ALB/ECS alarms depend on app_running and RDS alarms handle missing data for stopped operation. AWS-managed keys protect RDS/secrets; the brief records a USD 100 budget whose confirmation remains pending in prerequisites.

[`infra/modules/alarms/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/alarms/main.tf)

```hcl
  alarm_name          = "${var.name_prefix}-api-5xx"
  alarm_description   = "API returned 5 or more 5xx responses in 5 minutes."
  namespace           = "AWS/ApplicationELB"
  metric_name         = "HTTPCode_Target_5XX_Count"
  dimensions          = { LoadBalancer = var.alb_arn_suffix }
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 5
```

:::figure{src="/images/workshop/5.6.1-monitoring-step1.png" alt="5.6.1-monitoring-step1" caption="CloudWatch: all seven alarms are OK"}

2. **Verify the result**

Compare alarm state with app_running and verify SNS confirmation, CloudTrail logging, and S3 log objects. WAF may be absent while disabled to reduce costs.

:::figure{src="/images/workshop/step12-result.png" alt="Monitoring and security" caption="Log bucket: alb/ (ALB access logs) and cloudtrail/ folders"}

#### Recorded troubleshooting

No specific failure for this step was found in the reviewed sources. Record the date, redacted error, and verified resolution if an issue occurs.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/alarms/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/alarms/main.tf).
