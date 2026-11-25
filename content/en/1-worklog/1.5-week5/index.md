---
title: "Week 5 Worklog"
pre: "1.5."
weight: 5
status: "ready"
---

**Topic:** Amazon S3

**Dates:** 12/10/2026 – 16/10/2026

### Week 5 Objectives:

- Create a secure bucket and test access.
- Practise versioning and lifecycle rules.

### Tasks carried out this week:

| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Monday | Create a lab bucket and check Block Public Access | 12/10/2026 | 12/10/2026 | [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) |
| Tuesday | Upload a sample file and download it with the right permissions | 13/10/2026 | 13/10/2026 | [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) |
| Wednesday | Overwrite an object to observe versioning | 14/10/2026 | 14/10/2026 | [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) |
| Thursday | Create a lifecycle rule for old versions | 15/10/2026 | 15/10/2026 | [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) |
| Friday | Check access and clean up test objects | 16/10/2026 | 16/10/2026 | [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) |

### Week 5 Achievements:

- Created a bucket with Block Public Access on; the public object URL was denied as expected.
- Used a presigned URL to share a file temporarily without making the bucket public.
- Enabled versioning, overwrote a file, and restored the previous version.
- Added a lifecycle rule that expires old versions after 30 days, later reused for the project log bucket. Deleted all lab objects and the bucket.
