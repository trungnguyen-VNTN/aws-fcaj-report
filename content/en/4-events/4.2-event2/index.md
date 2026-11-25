---
title: "Event 2"
pre: "4.2."
weight: 2
status: "ready"
---

# Event report: First Cloud AI Journey Meetup – AWS Cloud, Cloud Security, and AI Agents

### Event details

- **Event:** First Cloud AI Journey Meetup – AWS Cloud, Cloud Security, and AI Agents
- **Time:** 08:00 – 12:00, 24/10/2026
- **Venue:** Floor 26, Bitexco Financial Tower, Ho Chi Minh City
- **Role:** Attendee
- **Speakers:** Kiệt Trần (Revve AI), Long Huỳnh và Thịnh Nguyễn (Styl Solution), Xuân An (AWS Student Builder Group HCMUTE), Khoa Kiều (ACB), Nghi Danh (AWS Community Builder)

### Event objectives

- See real applications of Voice AI and AI agents on AWS.
- Understand resource sharing and multi-account governance on AWS.
- Learn shift-left security and AI-assisted penetration testing.
- Connect with the AWS engineering community in Ho Chi Minh City.

### Key topics

#### Vietnamese Voice AI: Hear – Think – Speak

A speech recognition → LLM → speech synthesis chain for an automated contact centre. The demo ran a Vietnamese screening interview with an end-to-end latency target of about 1.8 seconds.

#### AWS Resource Access Manager

Sharing subnets, Transit Gateways, and Route 53 Resolver rules across accounts in AWS Organizations, combined with IAM policies and Service Control Policies as organisation-wide guardrails.

#### Shift-left security testing

Reviewing Terraform inside pull requests, catching misconfigurations before deployment, and using an AI security agent for penetration tests in authorised environments.

#### Amazon Bedrock AgentCore and Kiro

AgentCore Runtime isolates agent sessions and scales them; AgentCore Memory keeps short- and long-term context. The Kiro session stressed context-window management and guardrails that stop agents from deleting resources, leaking keys, or changing configuration without approval.

### Lessons learned

- Real AI products need reliable runtime, context management, and safety limits, not only a good model.
- Security belongs in the development flow (pull requests, CI), not just at deployment.
- Multi-account governance needs organisation-level permission boundaries.

### Applying it to my project

- The project AI assistant uses guardrails at two layers: Bedrock Guardrails block medical advice and prompt attacks, and the backend gives the model a single read-only search tool.
- The infrastructure uses a permissions boundary and two permission sets (read-only / deploy), in the same spirit as Service Control Policies.
- Every Terraform change runs `fmt`, `validate`, and `plan` and is reviewed before `apply`.

### Check-in photo

:::figure{src="/images/events/event2-checkin.jpg" alt="event2-checkin" caption="First Cloud AI Journey Meetup – AWS Cloud, Cloud Security, and AI Agents – 24/10/2026"}

:::todo[Photo required — check-in]
Add a clear check-in photo from the event, saved as public/images/events/event2-checkin.jpg.
:::
