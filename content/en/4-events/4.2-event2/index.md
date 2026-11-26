---
title: "Event 2"
pre: "4.2."
weight: 2
status: "ready"
---

# Event report: AWS First Cloud AI Journey Community Day

### Event details

- **Event:** AWS First Cloud AI Journey Community Day
- **Time:** 09:00 – 12:00, 31/10/2026
- **Venue:** Floor 26, Bitexco Financial Tower, Ho Chi Minh City
- **Role:** Attendee
- **Speakers:** Thinh Nguyen, Henry Duc Bui, Hung Tran, Dao Luong, Khang Duong, Tuan Tran (STYL Solutions, CloudThinker, NAB, FCAJ, AWS Student Builder Group SGU)

### Event objectives

- Hear community builders present real projects they are building on AWS.
- Understand how Amazon SQS helps build reliable asynchronous systems.
- Compare how other teams design, operate, and troubleshoot with the approach in my own project.
- Connect with speakers and other FCAJ interns.

### Key topics

#### Speakers presenting their own projects

Most of the morning was speakers from STYL Solutions, CloudThinker, NAB, and FCAJ presenting their own projects: the original problem, the architecture chosen on AWS, what had to change once it ran for real, and the lessons learned. Telling the story of a project made the reasoning behind each architecture decision clear, rather than just listing services.

#### AWS SQS: Building Reliable Asynchronous Systems (Dao Luong)

Luong Cam Dao (R&D team, AWS Student Builder Group SGU) started from a real AI Content project: content generation steps are slow and traffic spikes overload services that call each other directly. Amazon SQS sits in between to decouple producers and consumers, absorb spikes, and allow asynchronous processing.

#### Concepts for running queues reliably

The talk stressed what matters in production: the visibility timeout must be long enough for processing, processing must be idempotent because a message can be delivered more than once, repeatedly failing messages should move to a dead-letter queue so they do not block the queue, and queue depth should be monitored to see whether work is piling up.

#### Community connections

The event showed that students and interns can share the stage with industry engineers when they have a real project to tell. After the talks there was time to talk directly with speakers about each person’s project.

### Lessons learned

- An architecture is most convincing when told with the real problem and the fixes made in production.
- Queues decouple services and absorb load, but are only reliable with a correct visibility timeout, idempotent processing, and a dead-letter queue.
- Monitoring (queue depth, repeated failures) is part of the design, not an afterthought.

### Applying it to my project

- The topic matches our team’s SQS + Lambda + DLQ blog post: I compared the causes of messages landing in the DLQ with what the speaker presented.
- In the Nutrition E-Commerce project, VNPAY IPNs are handled idempotently (a repeated IPN returns code 02 and never updates the order twice), the same idea as handling messages delivered more than once.
- Unpaid VNPAY orders are cancelled by a scheduled task after 15 minutes; as the system grows, this is a natural place for SQS (a delay queue) with a DLQ for failed processing.
- For the project defence, I present the architecture as "problem → decision → incident → fix", as the speakers did.

### Check-in photo

:::figure{src="/images/events/event2-checkin.png" alt="event2-checkin" caption="AWS First Cloud AI Journey Community Day – 31/10/2026"}
