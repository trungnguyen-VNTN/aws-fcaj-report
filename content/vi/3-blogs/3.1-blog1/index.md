---
title: "Blog 1"
pre: "3.1."
weight: 1
status: "ready"
---

# Blog 1

# AWS SQS + LAMBDA: CODE KHÔNG LỖI, VÌ SAO MESSAGE VẪN VÀO DLQ?

[Bài đã đăng trên AWS Study Group Vietnam](https://www.facebook.com/groups/awsstudygroupfcj/permalink/2338552930242999/)

:::figure{src="/images/blogs/01-sqs-lambda-dlq.png" alt="blog-1-diagram" caption="Sơ đồ minh họa kèm bài viết"}

Một tình huống khá khó chịu khi vận hành hệ thống event-driven:

Lambda consume message từ SQS. Log của function không có exception nào, test lại từng message đều chạy đúng. Nhưng Dead Letter Queue (DLQ) vẫn cứ đầy dần lên.

Phản xạ đầu tiên thường là đi debug code, thêm log, tăng memory hoặc timeout của Lambda. Nhưng chưa chắc đó là nguyên nhân.

Rất có thể message chưa từng được xử lý lỗi, mà là chưa từng được xử lý.

### 1. MESSAGE VÀO DLQ KHÔNG CÓ NGHĨA LÀ CODE LỖI

Giả sử hệ thống xử lý đơn hàng có thiết kế:
SQS Queue – orders-queue:
  - Visibility timeout: 30s
  - Redrive policy: maxReceiveCount = 2 → orders-dlq
Lambda – process-order:
  - Timeout: 30s
  - Reserved concurrency: 5 (để bảo vệ database phía sau)

Lambda đọc message từ SQS thông qua Event Source Mapping (ESM). Poller của ESM nhận message theo batch rồi invoke function. Khi queue đầy lên, số poller tăng để kéo message nhanh hơn.

Vấn đề: reserved concurrency chỉ là 5. Poller nhận message về nhưng invoke bị throttle vì function đã hết concurrency.

Message đã được receive thì đã nằm trong trạng thái in-flight. Invoke không thành công, message không bị xóa, nên sau visibility timeout nó hiện lại trên queue và ApproximateReceiveCount tăng thêm 1.

Lặp lại vài lần như vậy, ReceiveCount vượt maxReceiveCount và SQS chuyển message sang DLQ, dù function chưa từng chạy với message đó.

Một chi tiết dễ bị bỏ qua: nếu visibility timeout bằng đúng function timeout, một message xử lý chậm có thể hiện lại trên queue trong khi lần xử lý đầu chưa xong. Kết quả là message bị xử lý trùng và ReceiveCount tăng nhanh hơn dự tính.

> Thứ đẩy message vào DLQ có thể là cấu hình concurrency, không phải business logic.

### 2. ĐỪNG CHỈ NHÌN VÀO LOG CỦA FUNCTION

Message bị throttle thì function không chạy, nên CloudWatch Logs của function không có gì để xem. Hãy nhìn vào metric:
- Lambda – Throttles: số lần invoke bị từ chối do hết concurrency.
- Lambda – ConcurrentExecutions: có chạm mức reserved concurrency không.
- SQS – ApproximateAgeOfOldestMessage: message có đang chờ lâu bất thường không.
- SQS – ApproximateNumberOfMessagesNotVisible: số message đang in-flight.

Và lấy thử vài message trong DLQ, kiểm tra attribute ApproximateReceiveCount. Nếu message vào DLQ mà không có dòng log lỗi nào tương ứng, khả năng cao là do throttle hoặc timeout, không phải code.

Ví dụ một pattern điển hình trên dashboard:
- Throttles tăng vọt cùng thời điểm ConcurrentExecutions đi ngang ở mức 5.
- ApproximateAgeOfOldestMessage tăng dần.
- Số message trong DLQ tăng theo các đợt traffic, không theo deploy.

Lúc này, thứ cần điều tra là cách Lambda scale với SQS, thay vì mặc định kết luận code có bug.

### 3. TĂNG TIMEOUT HAY MEMORY CHƯA CHẮC GIẢI QUYẾT ĐƯỢC VẤN ĐỀ

Không phải message nào vào DLQ cũng có cùng nguyên nhân. Ba trường hợp phổ biến:

**Trường hợp 1 – Throttling do reserved concurrency thấp**
- Dấu hiệu: metric Throttles > 0, log function không có lỗi.
- Cách xử lý: dùng Maximum concurrency trên Event Source Mapping thay vì chỉ dựa vào reserved concurrency. Khi đạt mức maximum concurrency, Lambda ngừng đọc thêm message từ queue, message nằm yên trong queue thay vì bị receive rồi trả lại. Nếu dùng cả hai, reserved concurrency phải cao hơn maximum concurrency.

**Trường hợp 2 – Visibility timeout quá ngắn**
- Dấu hiệu: message bị xử lý trùng, ReceiveCount tăng dù không throttle.
- Cách xử lý: AWS khuyến nghị visibility timeout của queue ít nhất gấp 6 lần function timeout (cộng thêm batching window nếu có).

**Trường hợp 3 – Một message lỗi kéo cả batch retry**
- Dấu hiệu: một message "xấu" trong batch 10 làm cả 9 message còn lại cũng bị retry.
- Cách xử lý: bật ReportBatchItemFailures và trả về danh sách message lỗi (partial batch response) để chỉ những message đó quay lại queue.

Ngoài ra, AWS khuyến nghị maxReceiveCount của redrive policy tối thiểu là 5, để message còn đủ "lượt" vượt qua các đợt throttle ngắn.

Các thay đổi này đều có trade-off. Giới hạn concurrency thấp thì backlog sẽ lâu hơn. Visibility timeout dài thì message lỗi thật sẽ mất nhiều thời gian hơn mới được retry. Và dù cấu hình đúng, function vẫn nên idempotent vì SQS standard queue là at-least-once delivery.

Vì vậy, đừng sửa code trước khi xác định chính xác vì sao message rơi vào DLQ.

### 4. BÀI HỌC VỀ SYSTEM DESIGN

Khi thiết kế SQS + Lambda, đừng chỉ nghĩ đến logic xử lý message.

Visibility timeout, function timeout, concurrency và maxReceiveCount là một bộ tham số phải được thiết kế cùng nhau. Chỉnh một cái mà không nhìn các cái còn lại rất dễ biến cơ chế retry thành cơ chế đẩy message vào DLQ.

Đặc biệt, khi muốn bảo vệ downstream (database, API bên thứ ba), hãy giới hạn tốc độ ở phía event source thay vì để Lambda bị throttle.

> Một tham số cấu hình sai có thể biến DLQ thành "thùng rác" của những message hoàn toàn hợp lệ.

Vì vậy, khi DLQ đầy, hãy kiểm tra throttling và receive count trước khi debug code. Đôi khi vấn đề không nằm ở code, mà nằm ở cách chúng ta cấu hình đường đi của message.

### Tài liệu AWS tham khảo

- [Creating and configuring an Amazon SQS event source mapping](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html)
- [Using Lambda with Amazon SQS](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html)
- [Introducing maximum concurrency of AWS Lambda functions when using Amazon SQS as an event source](https://aws.amazon.com/blogs/compute/introducing-maximum-concurrency-of-aws-lambda-functions-when-using-amazon-sqs-as-an-event-source/)
- [Understanding how AWS Lambda scales with Amazon SQS standard queues](https://aws.amazon.com/blogs/compute/understanding-how-aws-lambda-scales-when-subscribed-to-amazon-sqs-queues/)
