---
title: "Configure Cognito"
pre: "5.3.3."
weight: 3
status: "draft"
---

Use JWT identity with USER / ADMIN authorization.

1. **Review the source configuration**

Create the user pool and a public SPA client with no client secret using the cognito module. The client uses SRP without a hosted UI. Terraform defines USER and ADMIN groups. The backend validates issuer, token_use, client_id, and token expiry and reads sub and cognito:groups from the JWT.

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

:::figure{src="/images/workshop/5.3.3-cognito-step1.png" alt="5.3.3-cognito-step1" caption="Cognito user pool nutrition-dev-users in Singapore"}

2. **Verify the result**

Follow docs/demo.md: missing tokens produce 401, and ordinary users receive 403 on admin APIs. Exclude tokens and user information from screenshots.

:::figure{src="/images/workshop/step6-result.png" alt="Cognito authentication" caption="Cognito user pool: ADMIN and USER groups"}

#### Recorded troubleshooting

No specific failure for this step was found in the reviewed sources. Record the date, redacted error, and verified resolution if an issue occurs.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/cognito/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/cognito/main.tf).
