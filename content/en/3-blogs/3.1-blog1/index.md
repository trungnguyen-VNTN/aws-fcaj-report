---
title: "Blog 1"
pre: "3.1."
weight: 1
status: "ready"
---

# Blog 1

# AWS SQS + Lambda: Why do messages reach a DLQ when the code has no errors?

[Published post in AWS Study Group Vietnam](https://www.facebook.com/groups/awsstudygroupfcj/permalink/2338552930242999/)

:::figure{src="/images/blogs/01-sqs-lambda-dlq.png" alt="blog-1-diagram" caption="Diagram supplied with the original Vietnamese article"}

A Lambda function consumes SQS messages. Its logs show no exceptions, and individual messages work when tested, yet the dead-letter queue keeps growing. Before changing memory, timeouts, or business logic, investigate whether those messages were actually processed.

### 1. A message in a DLQ does not establish a code failure

Consider this example configuration:

- SQS orders-queue has a 30-second visibility timeout and maxReceiveCount = 2, with orders-dlq as its DLQ.
- Lambda process-order has a 30-second function timeout and reserved concurrency of 5 to protect the database.

An event source mapping polls SQS in batches and invokes the function. As the queue grows, polling can increase while function concurrency remains capped. A polled message becomes in-flight even if an invocation is throttled. Without successful processing and deletion, it can become visible again after the visibility timeout. Subsequent receives increase ApproximateReceiveCount, and repeated receives can move it to the DLQ.

If the visibility timeout equals the function timeout, a slow message can reappear while an earlier attempt is still processing it. That introduces duplicate processing and additional receives. Concurrency and retry settings therefore need to be examined alongside business logic.

### 2. Look beyond function logs

When an invocation is throttled before execution, its function code cannot produce the expected processing log. Compare these signals:

- Lambda Throttles, indicating rejected invocations.
- Lambda ConcurrentExecutions, compared with reserved concurrency.
- SQS ApproximateAgeOfOldestMessage, indicating growing delay.
- SQS ApproximateNumberOfMessagesNotVisible, showing in-flight messages.

Inspect ApproximateReceiveCount on sample DLQ messages as well. A useful pattern to investigate is a spike in Throttles while ConcurrentExecutions remains at 5, increasing message age, and DLQ growth aligned with traffic bursts. The investigation should then examine event-source scaling and retry behavior.

### 3. Increasing timeout or memory may leave the cause unresolved

**Case 1 — Low reserved concurrency causes throttling**

Check for Throttles greater than zero without corresponding function errors. Configure Maximum concurrency on the event source mapping to limit how many concurrent invocations that source generates. At its limit, the mapping stops reading additional messages. Coordinate reserved concurrency with the configured event-source limits.

**Case 2 — The visibility timeout is too short**

Duplicate processing and rising receive counts can occur without throttling. The referenced AWS guidance recommends a visibility timeout of at least six times the function timeout, with the batching window added where applicable.

**Case 3 — One failed message causes a whole batch to retry**

With a batch of ten, one failed item can cause the other nine to return as well. Enable ReportBatchItemFailures and return the failed-message identifiers so only those records are retried.

The referenced guidance also recommends maxReceiveCount of at least 5. Each choice has a trade-off: lower concurrency increases backlog time, and a longer visibility timeout delays retries of genuinely failed messages. Standard SQS delivery is at least once, so the consumer should be idempotent.

### 4. System design lessons

Design visibility timeout, function timeout, concurrency, and maxReceiveCount together. Changing one in isolation can turn the retry path into a source of unexpected DLQ growth.

When protecting a downstream database or external API, account for intake at the event source. When the DLQ grows, compare throttling and receive counts with function execution before changing application code.

### AWS References

- [Creating and configuring an Amazon SQS event source mapping](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html)
- [Using Lambda with Amazon SQS](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html)
- [Introducing maximum concurrency of AWS Lambda functions when using Amazon SQS as an event source](https://aws.amazon.com/blogs/compute/introducing-maximum-concurrency-of-aws-lambda-functions-when-using-amazon-sqs-as-an-event-source/)
- [Understanding how AWS Lambda scales with Amazon SQS standard queues](https://aws.amazon.com/blogs/compute/understanding-how-aws-lambda-scales-when-subscribed-to-amazon-sqs-queues/)
