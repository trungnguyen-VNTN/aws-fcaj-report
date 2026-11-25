---
title: "Week 6 Worklog"
pre: "1.6."
weight: 6
status: "ready"
---

**Topic:** Amazon DynamoDB

**Dates:** 19/10/2026 – 23/10/2026

### Week 6 Objectives:

- Design keys for a DynamoDB table.
- Compare read patterns and capacity modes.

### Tasks carried out this week:

| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Monday | Choose the partition key and sort key for lab data | 19/10/2026 | 19/10/2026 | [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) |
| Tuesday | Create the table and load sample items | 20/10/2026 | 20/10/2026 | [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) |
| Wednesday | Compare GetItem, Query, and Scan on the same data | 21/10/2026 | 21/10/2026 | [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) |
| Thursday | Try conditional updates and record rejected cases | 22/10/2026 | 22/10/2026 | [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) |
| Friday | Compare on-demand and provisioned capacity | 23/10/2026 | 23/10/2026 | [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) |

### Week 6 Achievements:

- Designed an orders table with the customer ID as partition key and the order time as sort key.
- Query by key read far less data than Scan on the same data set, so Scan is avoided for frequent lookups.
- A conditional update (`ConditionExpression`) was rejected when stock was insufficient; the project reuses the idea with `UPDATE ... WHERE stock >= :q` in PostgreSQL.
- Concluded the project uses PostgreSQL (RDS) for multi-filter queries and order transactions; DynamoDB fits key-based access better.
