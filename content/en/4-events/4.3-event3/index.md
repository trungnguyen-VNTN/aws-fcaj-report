---
title: "Event 3"
pre: "4.3."
weight: 3
status: "ready"
---

# Event report: Enterprise AI on AWS Cloud – From Prototype to Production

### Event details

- **Event:** Enterprise AI on AWS Cloud – From Prototype to Production
- **Time:** 09:00 – 12:00, 14/11/2026
- **Venue:** Floor 26, Bitexco Financial Tower, Ho Chi Minh City
- **Role:** Attendee
- **Speakers:** Khang Duong, Phuong Huyen, Bao Nguyen, Khuong Huynh

### Event objectives

- Separate experimental AI from production enterprise AI.
- Understand training versus inference and how tokens drive cost.
- Learn four operating pillars: security, reliability, scalability, cost.
- Get familiar with four common multi-agent patterns.

### Key topics

#### From "home kitchen" to "restaurant chain"

The speakers compared experimental AI with a home kitchen (the dish just has to taste good) and enterprise AI with a restaurant chain (process, safety, consistency, and controlled cost).

#### Training, inference, and tokens

Training runs in batches with heavy resources; inference runs continuously and needs low latency. For LLMs, input and output tokens directly drive latency and the bill, so prompts and context must be optimised.

#### Four operating pillars

Security (IAM, KMS, Guardrails), reliability (Multi-AZ, retries with backoff), scalability (Auto Scaling, Lambda, ALB), and cost optimisation (right-sizing, small models for easy questions).

#### Four multi-agent patterns

Supervisor/Routing sends a question to the right agent; Sequential chains steps like an assembly line; Parallel runs agents at once and merges results; Evaluator–Optimizer lets one agent grade another until the output passes.

### Lessons learned

- Model accuracy is not enough; AI systems need measurement, monitoring, and cost limits.
- Tokens are the cost unit, so the model should receive as little context as possible.
- Multi-AZ resilience is a baseline requirement for production AI.

### Applying it to my project

- The project uses Amazon Nova 2 Lite (a small, low-cost model) and sends only the food question, never personal data, which saves tokens and protects privacy; each account is limited to 30 questions a day.
- After the event the project enabled RDS Multi-AZ and two ECS tasks across two AZs (D33), with a successful failover drill on 22 November.
- The 45-prompt real-model evaluation acts as the "evaluator" that checks quality before each prompt change.

### Check-in photo

:::figure{src="/images/events/event3-checkin.png" alt="event3-checkin" caption="Enterprise AI on AWS Cloud – From Prototype to Production – 14/11/2026"}
