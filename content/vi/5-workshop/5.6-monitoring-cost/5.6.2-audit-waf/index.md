---
title: "CloudTrail, ALB logs và WAF"
pre: "5.6.2."
weight: 2
status: "draft"
---

Theo dõi lỗi ứng dụng và ghi lại hoạt động quản trị.

1. **Đối chiếu cấu hình nguồn**

CloudTrail đa vùng và ALB access logs ghi vào bucket `nutrition-dev-logs-<account-id>`. Bucket chặn public, mã hóa SSE-S3, lifecycle xóa log sau 30 ngày. S3 gateway endpoint đã được ghi nhận available ngày 22/11/2026. WAF scope CLOUDFRONT đặt tại us-east-1 và chỉ tạo khi script có -Waf. Module WAF dùng Common, Known Bad Inputs, IP Reputation và rate limit 1.000 request/5 phút/IP. SizeRestrictions_BODY chỉ đếm để không chặn upload ảnh admin tới 2 MB.

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

:::figure{src="/images/workshop/5.6.2-audit-waf-step1.png" alt="5.6.2-audit-waf-step1" caption="Ảnh cần bổ sung"}

:::todo[Cần chụp ảnh]
CloudWatch → All alarms / Log groups, SNS → Subscriptions, CloudTrail → Trails → Logging, S3 → log bucket → objects/lifecycle; nếu bật WAF thì chụp Web ACL.
:::

2. **Kiểm tra kết quả**

Đối chiếu trạng thái alarm với app_running; xác nhận SNS subscription, CloudTrail logging và object log S3. WAF có thể vắng mặt khi tắt để giảm phí.

:::figure{src="/images/workshop/step12-result.png" alt="Giám sát và bảo mật" caption="Ảnh minh chứng cần chủ repo bổ sung"}

:::todo[Cần chụp ảnh]
CloudWatch → All alarms / Log groups, SNS → Subscriptions, CloudTrail → Trails → Logging, S3 → log bucket → objects/lifecycle; nếu bật WAF thì chụp Web ACL.
:::

#### Lỗi đã ghi nhận

Chưa có lỗi cụ thể được ghi nhận cho bước này trong các nguồn đã đối chiếu. Khi phát sinh, ghi thời điểm, thông báo đã che định danh và cách xử lý được xác nhận.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/alarms/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/alarms/main.tf).
