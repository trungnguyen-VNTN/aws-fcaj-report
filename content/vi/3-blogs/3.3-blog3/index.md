---
title: "Blog 3"
pre: "3.3."
weight: 3
status: "ready"
---

# Blog 3

# AWS APPLICATION LOAD BALANCER: TARGET HEALTHY, VÌ SAO VẪN TRẢ 502?

[Bài đã đăng trên AWS Study Group Vietnam](https://www.facebook.com/groups/awsstudygroupfcj/permalink/2343670456397913/)

:::figure{src="/images/blogs/03-alb-502-keepalive.png" alt="blog-3-diagram" caption="Sơ đồ minh họa kèm bài viết"}

Một tình huống khá khó chịu khi vận hành service sau ALB:

Target group báo tất cả target đều Healthy. CPU, memory của service bình thường. Log ứng dụng không có lỗi. Nhưng client thỉnh thoảng nhận về HTTP 502 Bad Gateway, ngẫu nhiên, không tái hiện được.

Phản xạ đầu tiên thường là scale thêm task/instance, tăng health check threshold, hoặc mở ticket nghi ngờ ALB có vấn đề. Nhưng chưa chắc đó là nguyên nhân.

Rất có thể lỗi nằm ở một giá trị timeout mặc định mà không ai để ý.

### 1. LỖI KHÔNG NẰM Ở REQUEST, MÀ NẰM Ở CONNECTION

Giả sử hệ thống có thiết kế:
Application Load Balancer:
  - Idle timeout: 60s (mặc định)
Target – Node.js service trên ECS Fargate:
      http.Server.keepAliveTimeout: 5s (mặc định của Node.js)

ALB duy trì connection keep-alive tới target và tái sử dụng connection đó cho nhiều request khác nhau. Theo ALB, một connection còn được coi là "sống" cho đến khi idle quá 60 giây.

Nhưng phía Node.js, connection idle quá 5 giây sẽ bị server chủ động đóng.

Kịch bản xảy ra 502:
- Connection giữa ALB và target idle khoảng 6 giây.
- Node.js đã đóng connection ở giây thứ 5.
- ALB vẫn coi connection còn sống, gửi request mới lên đó.
- Target trả về TCP FIN/RST, ALB không nhận được response và trả 502 cho client.

Một chi tiết dễ bị bỏ qua: health check vẫn thành công vì health check mở connection mới. Target hoàn toàn khỏe, request lỗi chỉ vì rơi vào đúng connection vừa bị đóng. Đó là lý do lỗi xuất hiện ngẫu nhiên và thường rõ hơn khi traffic thấp (nhiều connection idle hơn).

> Request không hề tới được ứng dụng, nên log ứng dụng không có gì.

### 2. ĐỪNG CHỈ NHÌN VÀO METRIC 5XX TỔNG

Khi gặp 502, thay vì chỉ nhìn tổng số lỗi 5xx, hãy tách hai nhóm metric của ALB:
- HTTPCode_ELB_502_Count: lỗi do chính ALB sinh ra.
- HTTPCode_Target_5XX_Count: lỗi do target trả về.

Nếu ELB_502 tăng mà Target_5XX gần như bằng 0, lỗi nằm ở tầng connection giữa ALB và target, không phải ở logic ứng dụng.

Tiếp theo, bật ALB access logs và xem các request lỗi:
- elb_status_code: 502
- target_status_code: "-" (target không trả về response nào)
- target_processing_time / response_processing_time: -1

Kết hợp thêm metric TargetConnectionErrorCount để loại trừ trường hợp ALB không mở được connection tới target (security group, target chết hẳn).

Điều quan trọng là phân biệt lỗi do ALB sinh ra với lỗi do target trả về, thay vì nhìn chung một con số 5xx.

### 3. SCALE THÊM TARGET CHƯA CHẮC GIẢI QUYẾT ĐƯỢC VẤN ĐỀ

Không phải lỗi 502 nào cũng có cùng nguyên nhân. Các trường hợp phổ biến:

**Trường hợp 1 – Keep-alive timeout của target ngắn hơn idle timeout của ALB**
- Dấu hiệu: 502 ngẫu nhiên, target_status_code "-", target vẫn healthy.
- Cách xử lý: đặt keep-alive timeout của ứng dụng lớn hơn idle timeout của ALB. Ví dụ ALB 60s thì app đặt 65s, để ALB luôn là bên đóng connection idle trước.
  - Node.js: server.keepAliveTimeout = 65000, và headersTimeout lớn hơn keepAliveTimeout.
  - Nginx: keepalive_timeout 65s.
  - Gunicorn: --keep-alive 65.
  - Apache: KeepAliveTimeout 65.

**Trường hợp 2 – Target bị dừng khi còn request đang xử lý**
- Dấu hiệu: 502 tập trung vào thời điểm deploy hoặc scale-in.
- Cách xử lý: cấu hình deregistration delay phù hợp và để ứng dụng xử lý SIGTERM, ngừng nhận request mới nhưng hoàn thành request đang chạy.

**Trường hợp 3 – Response không hợp lệ**
- Dấu hiệu: 502 ổn định với một số endpoint cụ thể.
- Cách xử lý: kiểm tra response header quá lớn, response sai định dạng HTTP, hoặc với Lambda target là payload trả về sai format.

Lưu ý: tăng idle timeout của ALB lên cao hơn mà không chỉnh phía app sẽ làm vấn đề nặng hơn, vì khoảng chênh lệch giữa hai timeout càng lớn.

Vì vậy, đừng scale hay đổi cấu hình ALB trước khi xác định chính xác 502 đến từ đâu.

### 4. BÀI HỌC VỀ SYSTEM DESIGN

Khi đặt một load balancer trước ứng dụng, đừng chỉ cấu hình listener và health check.

Mỗi tầng trong đường đi của request (client, load balancer, reverse proxy, app server) đều có timeout riêng. Các timeout này phải được thiết kế cùng nhau, theo nguyên tắc tầng phía sau giữ connection lâu hơn tầng phía trước.

Đặc biệt, giá trị mặc định của framework thường được chọn cho trường hợp chạy trực tiếp, không phải chạy sau một load balancer có connection pooling.

> Một giá trị timeout mặc định có thể trở thành nguồn lỗi ngẫu nhiên khó debug nhất hệ thống.

Vì vậy, khi gặp 502, hãy tách lỗi của ALB và lỗi của target trước khi scale. Đôi khi vấn đề không nằm ở việc hệ thống thiếu tài nguyên, mà nằm ở hai giá trị timeout không khớp nhau.

### Tài liệu AWS tham khảo

- [How do I troubleshoot Application Load Balancer HTTP 502 errors?](https://repost.aws/knowledge-center/elb-alb-troubleshoot-502-errors)
- [Troubleshoot your Application Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-troubleshooting.html)
- [Access logs for your Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html)
- [CloudWatch metrics for your Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-cloudwatch-metrics.html)
