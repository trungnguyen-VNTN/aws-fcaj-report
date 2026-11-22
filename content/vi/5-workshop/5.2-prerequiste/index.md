---
title: "Điều kiện chuẩn bị"
pre: "5.2."
weight: 2
status: "draft"
---

#### Quyền IAM

Chuẩn bị công cụ và quyền trước khi dựng hạ tầng.

Cài Terraform ≥1.10, AWS CLI, Java 21, Node và Docker. Tạo nutrition-boundary bằng quyền quản trị. Gán nutrition-plan và nutrition-apply qua IAM Identity Center theo docs/aws-setup/README.md. Plan dùng ReadOnlyAccess và quyền state cần thiết; apply có quyền dịch vụ theo vùng và ràng buộc role nutrition-*. Cập nhật ngoại lệ Bedrock Tokyo và WAF us-east-1 theo phần cuối tài liệu.

[`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md)

```powershell
aws sso login --sso-session nutrition
$env:TF_VAR_owner = "<tên bạn>"
```

:::figure{src="/images/workshop/step2-result.png" alt="Điều kiện chuẩn bị" caption="Ảnh minh chứng cần chủ repo bổ sung"}

:::todo[Cần chụp ảnh]
IAM Identity Center → Permission sets → nutrition-plan / nutrition-apply và IAM → Policies → nutrition-boundary.
:::

Kiểm tra profile đăng nhập và boundary trước bước bootstrap. Không ghi thông tin phiên, token hay dữ liệu đăng nhập vào báo cáo.

InvalidGrantException: phiên SSO hết hạn. Đăng nhập lại bằng aws sso login --sso-session nutrition trước khi tiếp tục.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md).

#### Dựng tài nguyên bằng Terraform

Khởi tạo state S3 và quy trình kiểm tra plan.

Từ gốc repo, thực hiện bootstrap theo infra/README.md. Bucket state có prevent_destroy. Điền backend.hcl từ bản example với tên bucket thực tế ở terminal riêng. CI chạy fmt và validate với backend=false; khi vận hành dev dùng init backend S3, plan -out=tfplan, đọc thay đổi rồi người dùng mới apply. Brief ghi ngân sách 100 USD. Mã bootstrap hiện chỉ quản lý bucket state, chưa có tài nguyên Budgets.

[`infra/envs/dev/versions.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/envs/dev/versions.tf)

```hcl
  backend "s3" {
    key          = "envs/dev/terraform.tfstate"
    region       = "ap-southeast-1"
    encrypt      = true
    use_lockfile = true
  }
}
```

[`.github/workflows/ci.yml`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/.github/workflows/ci.yml)

```yaml
      - name: Format check
        run: terraform fmt -check -recursive infra
      - name: Validate bootstrap
        run: |
          terraform -chdir=infra/bootstrap init -backend=false -input=false
          terraform -chdir=infra/bootstrap validate
      - name: Validate envs/dev
        run: |
          terraform -chdir=infra/envs/dev init -backend=false -input=false
          terraform -chdir=infra/envs/dev validate
```

[`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md)

```powershell
terraform -chdir=infra/bootstrap init
terraform -chdir=infra/bootstrap plan -out=tfplan

# Đọc plan xong, bạn tự apply:
$env:AWS_PROFILE = "nutrition-apply"
terraform -chdir=infra/bootstrap apply tfplan
terraform -chdir=infra/bootstrap output state_bucket
```

:::figure{src="/images/workshop/step3-result.png" alt="Bootstrap Terraform" caption="Ảnh minh chứng cần chủ repo bổ sung"}

:::todo[Cần chụp ảnh]
S3 → bucket state → Properties và AWS Budgets → ngân sách 100 USD; che tên bucket có account ID.
:::

Kiểm tra key envs/dev/terraform.tfstate, mã hóa và use_lockfile=true. Đọc plan để phát hiện thay thế, xóa và quyền IAM trước apply.

Khóa state từng bị kẹt sau apply dở. Chỉ khi xác nhận không còn tiến trình đang dùng state, chủ repo mới dùng terraform force-unlock <id>; không xóa khóa đang hoạt động.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/envs/dev/versions.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/envs/dev/versions.tf).

:::todo[Xác minh AWS Budgets]
Xác nhận ngân sách được tạo thủ công hay bằng quy trình khác. Bổ sung ảnh Budget 100 USD và ngày thiết lập, che thông tin thanh toán.
:::
