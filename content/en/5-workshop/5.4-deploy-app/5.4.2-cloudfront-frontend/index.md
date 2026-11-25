---
title: "Frontend on S3 and CloudFront"
pre: "5.4.2."
weight: 2
status: "ready"
---

Serve the SPA and images from private buckets.

1. **Review the source configuration**

Build React through the deploy workflow. The frontend module uses SigV4 OAC for CloudFront access to S3. A Function rewrites SPA paths to index.html without replacing API errors with HTML. The /api/* behavior disables caching and forwards Authorization to the ALB. A separate image bucket protects product images from frontend s3 sync --delete operations.

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

:::figure{src="/images/workshop/5.4.2-cloudfront-frontend-step1.png" alt="5.4.2-cloudfront-frontend-step1" caption="CloudFront behaviors: /images/* → image bucket, /api/* → ALB (HTTPS only), default → frontend bucket"}

2. **Verify the result**

Reload a deep SPA route, check that the API returns JSON, verify /images/* delivery, and confirm public access blocks on buckets.

:::figure{src="/images/workshop/step8-result.png" alt="S3 frontend and CloudFront" caption="Frontend bucket: Block all public access = On; only CloudFront reads it through OAC"}

#### Recorded troubleshooting

The favicon was missing on the live site because CloudFront returned 403: the build disabled the `public` folder, so the icon never reached S3. The Vite config was fixed and the production build now checks for the icons. Other incidents are listed in [5.8 Testing and troubleshooting](/5-workshop/5.8-testing-troubleshooting).

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/frontend/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/frontend/main.tf).
