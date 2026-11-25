---
title: "Frontend trên S3 và CloudFront"
pre: "5.4.2."
weight: 2
status: "ready"
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

Favicon không hiện trên trang thật vì CloudFront trả 403: bước build tắt thư mục `public` nên file icon không được tải lên S3. Đã sửa cấu hình Vite và thêm bước kiểm tra icon trong bản build production. Các sự cố khác xem [5.8 Kiểm thử và xử lý sự cố](/5-workshop/5.8-testing-troubleshooting).

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/frontend/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/frontend/main.tf).
