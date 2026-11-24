---
title: "Cấu hình Cognito"
pre: "5.3.3."
weight: 3
status: "ready"
---

Cấp danh tính từ JWT và phân quyền USER / ADMIN.

1. **Đối chiếu cấu hình nguồn**

Tạo User Pool và SPA client không có client secret qua module cognito. Client dùng SRP, không hosted UI. Hai nhóm USER và ADMIN được khai báo bằng Terraform. Backend kiểm issuer, token_use, client_id và hạn token; lấy sub và cognito:groups từ JWT.

[`infra/modules/cognito/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/cognito/main.tf)

```hcl
resource "aws_cognito_user_group" "admin" {
  name         = "ADMIN"
  user_pool_id = aws_cognito_user_pool.users.id
}

resource "aws_cognito_user_group" "user" {
  name         = "USER"
  user_pool_id = aws_cognito_user_pool.users.id
}
```

:::figure{src="/images/workshop/5.3.3-cognito-step1.png" alt="5.3.3-cognito-step1" caption="Cognito user pool nutrition-dev-users ở Singapore"}

2. **Kiểm tra kết quả**

Theo docs/demo.md: API thiếu token trả 401, người dùng thường gọi API admin trả 403. Không chụp token hoặc dữ liệu người dùng.

:::figure{src="/images/workshop/step6-result.png" alt="Đăng nhập Cognito" caption="Cognito user pool: hai nhóm ADMIN và USER"}

#### Lỗi đã ghi nhận

Chưa có lỗi cụ thể được ghi nhận cho bước này trong các nguồn đã đối chiếu. Khi phát sinh, ghi thời điểm, thông báo đã che định danh và cách xử lý được xác nhận.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/cognito/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/cognito/main.tf).
