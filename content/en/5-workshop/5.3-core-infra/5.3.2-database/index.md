---
title: "Create the RDS database"
pre: "5.3.2."
weight: 2
status: "draft"
---

Provision private PostgreSQL and versioned schema migrations.

1. **Review the source configuration**

The rds module configures db.t4g.micro, 20 GB gp3, encryption, and Single-AZ operation. RDS manages its password in Secrets Manager with AWS-managed encryption keys. Deletion protection is enabled. Spring Boot runs Flyway V1–V11. V10 adds payment_events and V11 adds nutrition_profiles. Older schema and API documents are baselines; check migrations and D32 for the extensions.

[`infra/modules/rds/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/rds/main.tf)

```hcl
  manage_master_user_password = true

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [var.security_group_id]
  publicly_accessible    = false
  multi_az               = false
```

:::figure{src="/images/workshop/5.3.2-database-step1.png" alt="5.3.2-database-step1" caption="Screenshot pending"}

:::todo[Screenshot required]
RDS → Databases → nutrition-dev-postgres → Connectivity & security / Configuration; capture only Secrets Manager metadata without revealing values.
:::

2. **Verify the result**

Verify that RDS is private and encrypted and that the task role can read the managed secret. Review backend/src/main/resources/db/migration.

:::figure{src="/images/workshop/step5-result.png" alt="RDS and Flyway" caption="Evidence screenshot pending owner upload"}

:::todo[Screenshot required]
RDS → Databases → nutrition-dev-postgres → Connectivity & security / Configuration; capture only Secrets Manager metadata without revealing values.
:::

#### Recorded troubleshooting

Terraform cannot start an already stopped RDS instance. demo-infra.ps1 up starts it and waits for available before applying.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`infra/modules/rds/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/rds/main.tf).
