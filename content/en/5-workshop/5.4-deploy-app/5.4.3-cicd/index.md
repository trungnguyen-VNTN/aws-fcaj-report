---
title: "CI/CD with GitHub Actions OIDC"
pre: "5.4.3."
weight: 3
status: "draft"
---

Verify and deploy using short-lived OIDC credentials.

1. **Review the source configuration**

ci.yml runs Terraform fmt/validate, backend verify, and frontend checks. deploy.yml runs on master or workflow_dispatch, assumes an OIDC role, builds ARM64 images, and pushes SHA and latest tags to ECR. If ECS is off, it only publishes the image and the next up uses latest. Frontend deployment builds, syncs S3, and invalidates index.html. Set repository variables according to infra/README.md.

[`infra/modules/github-oidc/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/github-oidc/main.tf)

```hcl
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["${var.github_subject_prefix}:ref:refs/heads/${var.deploy_branch}"]
    }
```

:::figure{src="/images/workshop/5.4.3-cicd-step1.png" alt="5.4.3-cicd-step1" caption="Screenshot pending"}

:::todo[Screenshot required]
IAM → Roles → nutrition-dev-github-deploy → Trust relationships and a successful GitHub Actions Deploy to AWS dev run; redact ARNs.
:::

2. **Verify the result**

Compare the workflow with an actual owner-provided run. Verify aud, the immutable subject prefix, and the master branch restriction in its trust policy.

:::figure{src="/images/workshop/step9-result.png" alt="CI/CD through OIDC" caption="Evidence screenshot pending owner upload"}

:::todo[Screenshot required]
IAM → Roles → nutrition-dev-github-deploy → Trust relationships and a successful GitHub Actions Deploy to AWS dev run; redact ARNs.
:::

#### Recorded troubleshooting

PR #36 corrected the OIDC trust policy to use the immutable subject. Compare github_subject_prefix with the current GitHub configuration.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/github-oidc/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/github-oidc/main.tf).
