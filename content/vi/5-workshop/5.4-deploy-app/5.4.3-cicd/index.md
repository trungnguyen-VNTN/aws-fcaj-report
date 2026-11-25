---
title: "CI/CD với GitHub Actions OIDC"
pre: "5.4.3."
weight: 3
status: "ready"
---

Kiểm tra và deploy mà không lưu access key dài hạn.

1. **Đối chiếu cấu hình nguồn**

ci.yml chạy Terraform fmt/validate, backend verify và frontend checks. deploy.yml chạy trên master hoặc workflow_dispatch. Workflow xin GitHub một token OIDC rồi gọi AWS STS (`sts:AssumeRoleWithWebIdentity`) để đổi lấy quyền tạm thời của role `nutrition-dev-github-deploy`; trust policy chỉ chấp nhận token của nhánh master trong repo dự án, và quyền hết hạn sau khoảng 1 giờ nên GitHub không phải lưu access key. Sau đó workflow build image ARM64, đẩy tag SHA và latest vào ECR. Nếu ECS đang tắt thì chỉ đẩy image; up dùng latest. Frontend build, sync S3 và invalidate index.html. Điền repository variables theo infra/README.md.

[`infra/modules/github-oidc/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/github-oidc/main.tf)

```hcl
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["${var.github_subject_prefix}:ref:refs/heads/${var.deploy_branch}"]
    }
```

:::figure{src="/images/workshop/5.4.3-cicd-step1.png" alt="5.4.3-cicd-step1" caption="IAM role nutrition-dev-github-deploy: chỉ tin GitHub OIDC cho nhánh master của repo dự án"}

2. **Kiểm tra kết quả**

Đối chiếu workflow với một run thực tế của chủ repo; kiểm tra trust policy aud và immutable subject prefix cùng nhánh master.

:::figure{src="/images/workshop/step9-result.png" alt="CI/CD qua OIDC" caption="GitHub Actions: workflow Deploy to AWS dev chạy thành công (backend image, frontend, publish)"}

#### Lỗi đã ghi nhận

PR #36 sửa OIDC trust policy theo immutable subject. Đối chiếu github_subject_prefix trong module và cấu hình hiện tại của GitHub.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/github-oidc/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/github-oidc/main.tf).
