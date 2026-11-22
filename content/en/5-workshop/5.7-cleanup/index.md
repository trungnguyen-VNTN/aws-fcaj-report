---
title: "Clean up"
pre: "5.7."
weight: 7
status: "draft"
---

1. **Stop the demo session**

Use down with -Vnpay to retain the sandbox secret. Omitting -Vnpay removes that secret according to the script. Down removes the ALB and ECS service, removes the CloudFront API origin, and stops RDS while retaining data and storage charges. AWS restarts RDS after seven days. infra/README.md mentions dev teardown, while docs/runbook.md section 4 provides the detailed procedure.

[`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1)

```powershell
    .\scripts\demo-infra.ps1 down   # remove ALB + ECS service, stop RDS (~5-10 min)
```

:::figure{src="/images/workshop/5.7-cleanup-step1.png" alt="5.7-cleanup-step1" caption="Screenshot pending"}

:::todo[Screenshot required]
ECS → project cluster → Services after down, showing no API service; redact identifiers.
:::

2. **Check the stopped state and seven-day restart**

Stop the demo while retaining data and understand full teardown.

:::figure{src="/images/workshop/step14-result.png" alt="Cleanup and lessons learned" caption="Evidence screenshot pending owner upload"}

:::todo[Screenshot required]
RDS → Databases → stopped, ECS → cluster → Services after down, and remaining billable resources; attach a restore drill record if performed.
:::

:::figure{src="/images/workshop/5.7-cleanup-step2.png" alt="5.7-cleanup-step2" caption="Screenshot pending"}

:::todo[Screenshot required]
RDS → Databases → nutrition-dev-postgres → Status stopped.
:::

3. **Full teardown and restore drill**

For full teardown, the runbook requires an Available snapshot, deliberate owner changes to RDS/Cognito deletion protection, teardown review, dev destroy, and restoring protection on rebuild. The bootstrap bucket has prevent_destroy and stays outside the drill. No completed restore drill record is available.

:::todo[Restore drill record]
Provide the date, snapshot, restore duration, and verification results using the docs/runbook.md record.
:::

:::figure{src="/images/workshop/5.7-cleanup-step3.png" alt="5.7-cleanup-step3" caption="Screenshot pending"}

:::todo[Screenshot required]
RDS → Snapshots → Available snapshot and cleaned-up drill resources; supply only if performed.
:::

#### Recorded troubleshooting

No specific failure for this step was found in the reviewed sources. Record the date, redacted error, and verified resolution if an issue occurs.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1).
