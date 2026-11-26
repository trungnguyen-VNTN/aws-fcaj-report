---
title: "Clean up"
pre: "5.7."
weight: 7
status: "ready"
---

1. **Stop the demo session**

Use down with -Vnpay to retain the sandbox secret. Omitting -Vnpay removes that secret according to the script. Down removes the ALB and ECS service, removes the CloudFront API origin, and stops RDS while retaining data and storage charges. AWS restarts RDS after seven days. infra/README.md mentions dev teardown, while docs/runbook.md section 4 provides the detailed procedure.

[`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1)

```powershell
    .\scripts\demo-infra.ps1 down   # remove ALB + ECS service, stop RDS (~5-10 min)
```

:::figure{src="/images/workshop/5.7-cleanup-step1.png" alt="5.7-cleanup-step1" caption="ECS cluster after shutdown: zero services, zero tasks"}

2. **Check the stopped state and seven-day restart**

Stop the demo while retaining data and understand full teardown.

:::figure{src="/images/workshop/step14-result.png" alt="Cleanup and lessons learned" caption="EC2 load balancers after shutdown (down): no ALB remains"}

:::figure{src="/images/workshop/5.7-cleanup-step2.png" alt="5.7-cleanup-step2" caption="RDS after shutdown: status Stopped"}

3. **Full teardown and restore drill**

For full teardown, the runbook requires an Available snapshot, deliberate owner changes to RDS/Cognito deletion protection, teardown review, dev destroy, and restoring protection on rebuild. The bootstrap bucket has prevent_destroy and stays outside the drill. No completed restore drill record is available.

**Failover drill record (22 November 2026):** an RDS *Reboot with failover* was run on the Multi-AZ instance. The primary moved from ap-southeast-1a to ap-southeast-1b; the database restarted after about 18 seconds and AWS reported completion after about 43 seconds. The API was interrupted for about 25–35 seconds and recovered on its own, with no data loss and no manual action. A snapshot restore drill has not been performed; RDS keeps automated daily snapshots (below) for recovery.

:::figure{src="/images/workshop/5.7-cleanup-step3.png" alt="5.7-cleanup-step3" caption="RDS system snapshots: nine automated daily backups"}

#### Recorded troubleshooting

Closing the window while `down`/`apply` was running left a state lock (`Error acquiring the state lock`). Fix: confirm no Terraform process is running and the state is unchanged, then run `terraform force-unlock <LOCK_ID>`. Other incidents are listed in [5.8 Testing and troubleshooting](/5-workshop/5.8-testing-troubleshooting).

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1).
