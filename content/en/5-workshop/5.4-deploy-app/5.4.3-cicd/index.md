---
title: "CI/CD with GitHub Actions OIDC"
pre: "5.4.3."
weight: 3
status: "ready"
---

Verify and deploy using short-lived OIDC credentials.

1. **Review the source configuration**

ci.yml runs Terraform fmt/validate, backend verify, and frontend checks. deploy.yml runs on master or workflow_dispatch. The workflow requests an OIDC token from GitHub and calls AWS STS (`sts:AssumeRoleWithWebIdentity`) to exchange it for temporary credentials of the `nutrition-dev-github-deploy` role; the trust policy accepts only tokens from the master branch of the project repository, and the credentials expire after about one hour, so GitHub stores no access keys. The workflow then builds ARM64 images, and pushes SHA and latest tags to ECR. If ECS is off, it only publishes the image and the next up uses latest. Frontend deployment builds, syncs S3, and invalidates index.html. Set repository variables according to infra/README.md.

[`infra/modules/github-oidc/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/github-oidc/main.tf)

```hcl
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["${var.github_subject_prefix}:ref:refs/heads/${var.deploy_branch}"]
    }
```

:::figure{src="/images/workshop/5.4.3-cicd-step1.png" alt="5.4.3-cicd-step1" caption="IAM role nutrition-dev-github-deploy: trusts GitHub OIDC only for the project repository master branch"}

2. **Verify the result**

Compare the workflow with an actual owner-provided run. Verify aud, the immutable subject prefix, and the master branch restriction in its trust policy.

:::figure{src="/images/workshop/step9-result.png" alt="CI/CD through OIDC" caption="GitHub Actions: the Deploy to AWS dev workflow succeeded (backend image, frontend, publish)"}

#### Recorded troubleshooting

PR #36 corrected the OIDC trust policy to use the immutable subject. Compare github_subject_prefix with the current GitHub configuration.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`infra/modules/github-oidc/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/github-oidc/main.tf).
