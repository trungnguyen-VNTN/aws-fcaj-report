---
title: "Frontend trên S3 và CloudFront"
pre: "5.4.2."
weight: 2
status: "draft"
---

Phân phối SPA và ảnh từ bucket riêng tư.

1. **Đối chiếu cấu hình nguồn**

Build React theo workflow deploy. Module frontend dùng OAC SigV4 để CloudFront đọc S3. Function viết lại đường dẫn SPA sang index.html, không thay lỗi API bằng HTML. Behavior /api/* tắt cache, chuyển Authorization tới ALB. Bucket ảnh tách riêng để s3 sync --delete frontend không xóa ảnh.

[`infra/modules/frontend/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/frontend/main.tf)

```hcl
resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "${var.name_prefix}-frontend"
  description                       = "CloudFront access to the frontend bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}
```

:::figure{src="/images/workshop/5.4.2-cloudfront-frontend-step1.png" alt="5.4.2-cloudfront-frontend-step1" caption="CloudFront behaviors: /images/* → S3 ảnh, /api/* → ALB (HTTPS only), mặc định → S3 frontend"}

2. **Kiểm tra kết quả**

Mở route sâu của SPA và tải lại; kiểm tra API trả JSON và ảnh tải qua /images/*. Đối chiếu bucket chặn public.

:::figure{src="/images/workshop/step8-result.png" alt="Frontend S3 và CloudFront" caption="Bucket frontend: Block all public access = On, chỉ CloudFront đọc qua OAC"}

#### Lỗi đã ghi nhận

Chưa có lỗi cụ thể được ghi nhận cho bước này trong các nguồn đã đối chiếu. Khi phát sinh, ghi thời điểm, thông báo đã che định danh và cách xử lý được xác nhận.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/frontend/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/frontend/main.tf).
