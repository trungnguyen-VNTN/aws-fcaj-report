---
title: "Week 4 Worklog"
pre: "1.4."
weight: 4
status: "ready"
---

**Topic:** Amazon EC2 and Amazon EBS

**Dates:** 05/10/2026 – 09/10/2026

### Week 4 Objectives:

- Understand AMIs, instance types, and the EC2 lifecycle.
- Practise EBS and clean up after the lab.

### Tasks carried out this week:

| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Monday | Compare AMIs, instance types, and EC2 states | 05/10/2026 | 05/10/2026 | [Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) |
| Tuesday | Configure a lab EC2 instance and restrict admin access | 06/10/2026 | 06/10/2026 | [Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) |
| Wednesday | Launch the instance and check its status | 07/10/2026 | 07/10/2026 | [Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) |
| Thursday | Attach an EBS volume; compare volumes with snapshots | 08/10/2026 | 08/10/2026 | [Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) |
| Friday | Terminate the lab and check for remaining charges | 09/10/2026 | 09/10/2026 | [Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) |

### Week 4 Achievements:

- Compared instance families (t, m, c) and Graviton ARM; noted Graviton is cheaper, which later led to ARM64 for ECS and RDS.
- Ran a t4g.micro instance, opened the admin port only to my IP, and used Session Manager instead of exposing SSH.
- Attached and mounted an EBS volume, created a snapshot, and restored it to a new volume.
- Terminated the instance, deleted extra volumes and snapshots, and confirmed no Elastic IP or volume was still billed.
