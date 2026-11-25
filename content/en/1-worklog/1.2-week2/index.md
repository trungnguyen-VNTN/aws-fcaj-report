---
title: "Week 2 Worklog"
pre: "1.2."
weight: 2
status: "ready"
---

**Topic:** IAM and access control

**Dates:** 21/09/2026 – 25/09/2026

### Week 2 Objectives:

- Distinguish users, roles, and policies.
- Apply least privilege.

### Tasks carried out this week:

| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Monday | Distinguish users, roles, and policies | 21/09/2026 | 21/09/2026 | [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) |
| Tuesday | Read policy JSON structure and resource scope | 22/09/2026 | 22/09/2026 | [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) |
| Wednesday | Write a policy that allows a single read action | 23/09/2026 | 23/09/2026 | [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) |
| Thursday | Test allowed and denied actions in the lab | 24/09/2026 | 24/09/2026 | [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) |
| Friday | Summarise least privilege, MFA, and temporary sessions | 25/09/2026 | 25/09/2026 | [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) |

### Week 2 Achievements:

- Learned that roles serve services and temporary sessions while users are used only when needed; preferred roles over access keys.
- Read Effect, Action, Resource, and Condition, and confirmed that an explicit Deny overrides Allow.
- Wrote a policy allowing only `s3:GetObject` on one bucket; a write attempt returned AccessDenied as expected.
- Derived the read/deploy split later used for the `nutrition-plan` and `nutrition-apply` permission sets of the project.
