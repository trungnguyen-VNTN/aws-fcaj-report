---
title: "Alarm và log CloudWatch"
pre: "5.6.1."
weight: 1
status: "ready"
---

Theo dõi lỗi ứng dụng và ghi lại hoạt động quản trị.

1. **Đối chiếu cấu hình nguồn**

CloudWatch Logs giữ log ứng dụng 14 ngày. Bảy alarm theo dõi ALB 5xx, target healthy, CPU/RAM ECS, CPU và dung lượng RDS, cùng log ERROR. Alarm gửi SNS; người nhận phải xác nhận subscription. Các alarm ALB/ECS phụ thuộc app_running; alarm RDS dùng cách xử lý missing data phù hợp trạng thái dừng. Khóa AWS quản lý bảo vệ RDS/secret; ngân sách 100 USD theo brief vẫn cần ảnh xác nhận tại phần điều kiện chuẩn bị.

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

:::figure{src="/images/workshop/5.6.1-monitoring-step1.png" alt="5.6.1-monitoring-step1" caption="CloudWatch: 7 alarm đều ở trạng thái OK"}

2. **Kiểm tra kết quả**

Đối chiếu trạng thái alarm với app_running; xác nhận SNS subscription, CloudTrail logging và object log S3. WAF có thể vắng mặt khi tắt để giảm phí.

:::figure{src="/images/workshop/step12-result.png" alt="Giám sát và bảo mật" caption="Bucket log: thư mục alb/ (access log ALB) và cloudtrail/"}

#### Lỗi đã ghi nhận

Chưa có lỗi cụ thể được ghi nhận cho bước này trong các nguồn đã đối chiếu. Khi phát sinh, ghi thời điểm, thông báo đã che định danh và cách xử lý được xác nhận.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/alarms/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/alarms/main.tf).
