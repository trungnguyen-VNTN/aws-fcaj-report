---
title: "Tạo cơ sở dữ liệu RDS"
pre: "5.3.2."
weight: 2
status: "draft"
---

Dựng PostgreSQL private và quản lý schema có phiên bản.

1. **Đối chiếu cấu hình nguồn**

Module rds cấu hình db.t4g.micro, 20 GB gp3, mã hóa và Multi-AZ (bản dự phòng ở AZ thứ hai, tự chuyển khi AZ chính lỗi; D33). Biến `rds_multi_az` trong `infra/envs/dev` mặc định `true`. Mật khẩu do RDS quản lý trong Secrets Manager, khóa mã hóa do AWS quản lý. Bật deletion protection. Spring Boot chạy migration Flyway V1–V11. V10 lưu payment_events; V11 lưu nutrition_profiles. Schema và API cũ chỉ là bản nền, đối chiếu migration và D32 khi mô tả phần mở rộng.

[`infra/modules/rds/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/rds/main.tf)

```hcl
  manage_master_user_password = true

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [var.security_group_id]
  publicly_accessible    = false
  # Standby copy in the second AZ with automatic failover (prod-like HA; adds instance hours
  # while the app is on and doubles storage).
  multi_az = var.multi_az
```

:::figure{src="/images/workshop/5.3.2-database-step1.png" alt="5.3.2-database-step1" caption="RDS: db.t4g.micro, PostgreSQL 17.9, mã hóa KMS, Multi-AZ = Yes, secondary zone ap-southeast-1b"}

2. **Kiểm tra kết quả**

Kiểm tra RDS không public, mã hóa bật và task đọc được secret theo role. Đối chiếu migration trong backend/src/main/resources/db/migration.

:::figure{src="/images/workshop/step5-result.png" alt="RDS và Flyway" caption="RDS Connectivity & security: Publicly accessible = No, subnet group nutrition-dev-db gồm 2 subnet riêng"}

#### Lỗi đã ghi nhận

Terraform không tự bật RDS đang stopped. demo-infra.ps1 up gọi start-db-instance và chờ available trước apply.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/rds/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/rds/main.tf).
