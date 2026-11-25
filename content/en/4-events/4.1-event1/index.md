---
title: "Event 1"
pre: "4.1."
weight: 1
status: "ready"
---

# Event report: First Cloud AI Journey – Application and Database Modernization with GenAI

### Event details

- **Event:** First Cloud AI Journey – Application and Database Modernization with GenAI
- **Time:** 08:00 – 17:00, 29/09/2026
- **Venue:** Floor 26, Bitexco Financial Tower, Ho Chi Minh City
- **Role:** Attendee
- **Speakers:** Jignesh Shah (Director, Open Source Databases), Erica Liu (Sr. Application Modernization Specialist), Fabrianne Effendi (Serverless Solutions Architect)

### Event objectives

- Recognise the limits of monolithic architectures as systems grow.
- Learn how to split a system into microservices with Domain-Driven Design.
- Get familiar with asynchronous patterns: queues, pub/sub, streaming.
- See how Amazon Q Developer helps upgrade code and migrate databases.

### Key topics

#### Why monoliths slow down

All modules ship together, so a small change needs a full test and release cycle; scaling one part means duplicating the whole application; a local fault can take down the entire system.

#### Three pillars for moving to microservices

Queues (Amazon SQS) to decouple processing and absorb spikes; caching (Amazon ElastiCache) to offload the database; flexible messaging (Amazon SNS, Amazon EventBridge) so services exchange events without direct dependencies.

#### Domain-Driven Design in four steps

List domain events, order them on a timeline, identify actors, then group them into bounded contexts. Each bounded context is a candidate service, which avoids a "distributed monolith".

#### Modernisation with GenAI

Amazon Q Developer scans legacy Java, proposes upgrades to Java 17/21, helps convert schemas from commercial databases to Aurora PostgreSQL, and flags vulnerabilities in the IDE. A demo showed SQS with a dead-letter queue preserving transactions when a service failed.

### Lessons learned

- Modernisation is structured refactoring, not a plain lift-and-shift.
- Asynchronous decoupling stops failures from spreading and lets each part scale on its own.
- Clear domain boundaries matter more than the number of services.

### Applying it to my project

- The Nutrition E-Commerce project keeps one Spring Boot backend but organises packages by domain (catalog, commerce, payments, ai, admin, profile), applying bounded contexts early so services can be split later.
- Unpaid VNPAY orders are cancelled and restocked after 15 minutes; this is where SQS/EventBridge would fit as the system grows.
- The backend runs Java 21 and Spring Boot 4, in line with the runtime upgrades presented at the event.

### Check-in photo

:::figure{src="/images/events/event1-checkin.jpg" alt="event1-checkin" caption="First Cloud AI Journey – Application and Database Modernization with GenAI – 29/09/2026"}

:::todo[Photo required — check-in]
Add a clear check-in photo from the event, saved as public/images/events/event1-checkin.jpg.
:::
