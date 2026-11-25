---
title: "Self-Assessment"
pre: "6."
weight: 6
status: "ready"
---

During the **September–December 2026 internship (12 weeks)**, the AWS Personalized Nutrition E-Commerce Platform provides a basis for consolidating knowledge and reflecting on learning. I aim to understand the reasoning behind choices, verify experiments, and record areas for improvement.

| No. | Criteria | Description | Good | Fair | Average |
| --- | --- | --- | --- | --- | --- |
| 1 | Professional knowledge & skills | I have gradually connected Terraform, ECS Fargate, PostgreSQL, Cognito, and Bedrock into a deployable architecture. I still need to deepen my understanding of operations and fault tolerance. | ✅ |  |  |
| 2 | Ability to learn | I focus on reading documentation, checking configuration against source code, and using tests to examine my understanding. The Bedrock quota issue provides a concrete case for reviewing Region and model choices. |  | ✅ |  |
| 3 | Proactiveness | I aim to produce a concrete outcome from learning: infrastructure configuration, a feature, a test case, or an implementation guide. The decision log helps track choices and open work. |  | ✅ |  |
| 4 | Sense of responsibility | I consider verification and documented limitations part of the deliverable. For AI, I focus on DB-derived numbers, fail-closed handling, and a clearly limited lookup scope. | ✅ |  |  |
| 5 | Discipline | I focus on separating plan/apply permissions, keeping secrets outside source code, and reviewing infrastructure changes before deployment. These are habits I intend to maintain when working with AWS. |  | ✅ |  |
| 6 | Progressive mindset | I see UI revisions, expansion of the AI evaluation suite, and additional tests as opportunities to improve. I need to keep turning encountered failures into verifiable lessons. |  | ✅ |  |
| 7 | Communication | I practice explaining architecture, technology choices, and trade-offs through the decision log and workshop. I want to make those explanations more concise and reproducible. |  | ✅ |  |
| 8 | Teamwork | I recognize that clear documentation and reproducible failure reports support collaboration. I need to keep improving how I communicate, receive feedback, and confirm responsibilities when working with others. |  |  | ✅ |
| 9 | Professional conduct | I focus on protecting personal data, reporting measured figures accurately, and identifying unverified work. I consider that care part of professional engineering practice. | ✅ |  |  |
| 10 | Problem-solving skills | Expired SSO sessions, stopped RDS instances, OIDC trust policies, and Bedrock quotas provide lessons in investigating failures layer by layer. I aim to explain each fix and verify its outcome. |  |  | ✅ |
| 11 | Contribution to project/team | Terraform, the application, tests, and documentation provide project outputs to review. I need to connect my individual contributions to specific evidence when summarizing my work. | ✅ |  |  |
| 12 | Overall | I view this as a period of progressive learning. I want to demonstrate persistence, a willingness to revise my approach when evidence changes, and commitment to continued improvement. |  | ✅ |  |

Recorded project results on **21 November 2026** in `docs/PROGRESS.md` include 86 backend tests, 145 frontend tests, 57 E2E plus axe tests, and a 45-prompt AI evaluation with safety 17/17 and retrieval 27/28. These figures describe project outcomes and provide context for checking individual evidence.

### Needs Improvement

- **Deepen AWS operations knowledge.** I want to understand RDS recovery, logs, alarms, and the cost of continuous operation more thoroughly.
- **Verify understanding through practice.** I need to record settings, test conditions, and outcomes so that I can explain why an approach fits.
- **Improve technical communication.** I want to practice summarizing the problem, evidence, and proposed response before discussing it.
- **Develop collaboration skills.** I need to confirm requirements, respond to feedback, and document responsibilities with evidence.
