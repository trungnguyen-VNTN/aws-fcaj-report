---
title: "Prerequisite"
pre: "5.2."
weight: 2
status: "ready"
---

#### IAM permissions

Prepare tools and permissions before provisioning.

Install Terraform ≥1.10, AWS CLI, Java 21, Node, and Docker. Create nutrition-boundary with administrative permissions. Assign nutrition-plan and nutrition-apply through IAM Identity Center following docs/aws-setup/README.md. Plan uses ReadOnlyAccess plus necessary state access. Apply has regional service permissions and nutrition-* role restrictions. Include the later Tokyo Bedrock and us-east-1 WAF exceptions.

[`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md)

```powershell
aws sso login --sso-session nutrition
$env:TF_VAR_owner = "<tên bạn>"
```

:::figure{src="/images/workshop/step2-result.png" alt="Prerequisites" caption="IAM Identity Center: two permission sets, nutrition-plan (read-only) and nutrition-apply (deploy)"}

Verify profile access and boundary setup before bootstrap. Exclude session data, tokens, and credentials from the report.

InvalidGrantException indicates expired SSO. Run aws sso login --sso-session nutrition before continuing.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md).

#### Provision resources using Terraform

Bootstrap S3 state and the plan review workflow.

Follow infra/README.md from the repository root. The state bucket has prevent_destroy. Populate backend.hcl from its example using the real bucket name in a separate terminal. CI runs fmt and validate with backend=false. Dev operation initializes S3 state, creates a saved plan, and requires review before the owner applies it. The brief records a USD 100 budget. The current bootstrap code manages the state bucket and does not declare a Budgets resource.

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

:::figure{src="/images/workshop/step3-result.png" alt="Terraform bootstrap" caption="AWS Budgets: USD 100 budget, USD 15.06 used, USD 26.95 forecast"}

Check the envs/dev/terraform.tfstate key, encryption, and use_lockfile=true. Review replacements, deletions, and IAM permissions before applying.

A state lock remained after an interrupted apply. Only after confirming that no process still uses the state should the owner run terraform force-unlock <id>.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/envs/dev/versions.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/envs/dev/versions.tf).

The USD 100 budget was created manually in the Console (it is not managed by Terraform). On 25 November 2026: USD 15.06 used, USD 26.95 forecast for the month, status Healthy.
