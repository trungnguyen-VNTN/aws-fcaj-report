---
title: "Blog 2"
pre: "3.2."
weight: 2
status: "ready"
---

# Blog 2

# AWS NAT GATEWAY: BILL TĂNG VỌT, TIỀN ĐI ĐÂU?

[Bài đã đăng trên AWS Study Group Vietnam](https://www.facebook.com/groups/awsstudygroupfcj/permalink/2340782970019995/)

:::figure{src="/images/blogs/02-nat-gateway-cost.png" alt="blog-2-diagram" caption="Sơ đồ minh họa kèm bài viết"}

Một tình huống khá khó chịu khi review chi phí AWS cuối tháng:

Số lượng instance không đổi, traffic từ người dùng không tăng. Nhưng dòng "EC2-Other" trên bill tăng gấp mấy lần, và phần lớn nằm ở NAT Gateway.

Phản xạ đầu tiên thường là đi tìm instance thừa, tắt bớt job, hoặc nghi ngờ bị tấn công. Nhưng chưa chắc đó là nguyên nhân.

Rất có thể tiền đang đổ vào một đường đi mà không ai để ý: traffic từ private subnet tới S3.

### 1. TIỀN KHÔNG NẰM Ở COMPUTE, MÀ NẰM Ở ĐƯỜNG ĐI CỦA DỮ LIỆU

Giả sử hệ thống có thiết kế:
VPC:
  - Private subnet: chạy batch/ETL job, đọc và ghi khoảng 20 TB/tháng vào S3.
  - Public subnet: NAT Gateway + Internet Gateway.
Route table của private subnet:
      0.0.0.0/0 → nat-gateway

Đây là thiết kế rất phổ biến, và nó chạy hoàn toàn bình thường. Job vẫn đọc ghi S3 thành công.

Vấn đề: không có route nào dành riêng cho S3, nên mọi request tới S3 đều đi theo default route: private subnet → NAT Gateway → Internet Gateway → public endpoint của S3.

NAT Gateway tính phí theo giờ và tính thêm phí xử lý dữ liệu (data processing) cho mỗi GB đi qua nó, theo cả hai chiều. Ở us-east-1, mức phí này là $0.045/GB.

20 TB/tháng ≈ 20.480 GB × $0.045 ≈ $920/tháng, chỉ riêng phí xử lý của NAT, cho một traffic mà lẽ ra có thể miễn phí.

Một chi tiết dễ bị bỏ qua: nhiều người nhớ rằng "data transfer từ EC2 tới S3 cùng region là miễn phí". Điều đó đúng với phí data transfer, nhưng phí data processing của NAT Gateway là một khoản riêng và vẫn bị tính.

> Resource gây ra chi phí có thể khác với resource mà ứng dụng đang trực tiếp sử dụng.

### 2. ĐỪNG CHỈ NHÌN VÀO TỔNG CHI PHÍ

Khi bill NAT tăng, thay vì chỉ nhìn tổng tiền, hãy tách ra theo usage type trong Cost Explorer:
- NatGateway-Hours: phí theo giờ, thường ổn định.
- NatGateway-Bytes: phí xử lý dữ liệu, đây thường là phần tăng bất thường.

Nếu NatGateway-Bytes chiếm phần lớn, bước tiếp theo là xác định traffic đó đi đâu:
- CloudWatch metric của NAT Gateway: BytesOutToDestination, BytesInFromDestination để xem lưu lượng theo thời gian.
- VPC Flow Logs trên ENI của NAT Gateway: xem destination IP nào chiếm nhiều byte nhất.
- Đối chiếu destination IP với dải IP của AWS (ip-ranges.json) hoặc prefix list của S3/DynamoDB trong region.

Ví dụ một kết quả điển hình khi query Flow Logs bằng Athena hoặc CloudWatch Logs Insights:
- Top destination là các IP thuộc dải S3 của chính region đang chạy.
- Hoặc là ECR / CloudWatch Logs endpoint, khi container pull image và đẩy log liên tục.

Điều quan trọng là xác định đúng destination của traffic, thay vì chỉ nhìn tổng tiền NAT.

### 3. TẮT BỚT JOB CHƯA CHẮC GIẢI QUYẾT ĐƯỢC VẤN ĐỀ

Không phải chi phí NAT nào cũng có cùng nguyên nhân. Ba trường hợp phổ biến:

**Trường hợp 1 – Traffic tới S3 hoặc DynamoDB đi qua NAT**
- Cách xử lý: tạo Gateway VPC Endpoint cho S3 / DynamoDB và gắn vào route table của private subnet. Gateway Endpoint không tính phí theo giờ và không tính phí theo GB. Route table sẽ có thêm một route trỏ prefix list của S3 tới endpoint, traffic S3 đi thẳng mà không qua NAT.

**Trường hợp 2 – Traffic tới các AWS service khác (ECR, CloudWatch Logs, STS, Secrets Manager…)**
- Cách xử lý: cân nhắc Interface VPC Endpoint (PrivateLink). Interface Endpoint có phí theo giờ và theo GB, nhưng phí theo GB thường thấp hơn NAT. Cần tính toán: endpoint chỉ đáng tiền khi lưu lượng đủ lớn.

**Trường hợp 3 – Workload và NAT Gateway nằm khác AZ**
- Cách xử lý: mỗi AZ nên có NAT Gateway riêng và route table của subnet trỏ tới NAT cùng AZ. Nếu không, ngoài phí NAT còn phải trả thêm phí data transfer cross-AZ.

Ngoài ra, còn các nguồn ít gặp hơn như traffic đi Internet thật (gọi API bên thứ ba, tải package) hoặc traffic giữa các VPC đi vòng qua Internet thay vì Peering/Transit Gateway. Mỗi loại có cách xử lý riêng.

Các phương án đều có trade-off. Gateway Endpoint chỉ áp dụng cho S3 và DynamoDB trong cùng region, không dùng được từ on-premises hoặc VPC peering. Endpoint policy nếu viết quá chặt có thể chặn luôn những bucket mà ứng dụng cần, ví dụ bucket chứa image layer của ECR.

Vì vậy, đừng xóa NAT hay đổi kiến trúc trước khi xác định chính xác traffic nào đang đi qua nó.

### 4. BÀI HỌC VỀ SYSTEM DESIGN

Khi thiết kế VPC, đừng chỉ hỏi "subnet này có ra được Internet không", mà hãy hỏi "traffic tới từng service sẽ đi đường nào".

Default route 0.0.0.0/0 → NAT rất tiện, nhưng nó cũng biến NAT Gateway thành "trạm thu phí" cho mọi traffic không có route riêng.

Đặc biệt, với những workload xử lý dữ liệu lớn (data pipeline, backup, ML training, container pull image thường xuyên), Gateway Endpoint cho S3 nên là một phần mặc định của thiết kế VPC chứ không phải một bước tối ưu sau này.

> Một route table thiếu một dòng có thể trở thành một khoản chi phí cố định hàng tháng.

Vì vậy, khi bill tăng, hãy tìm đúng usage type và đúng destination trước khi cắt giảm tài nguyên. Đôi khi vấn đề không nằm ở việc hệ thống dùng quá nhiều, mà nằm ở đường đi mà dữ liệu đang được định tuyến.

### Tài liệu AWS tham khảo

- [Gateway endpoints for Amazon S3](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html)
- [NAT gateway pricing](https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-pricing.html)
- [Amazon VPC pricing](https://aws.amazon.com/vpc/pricing/)
- [Monitor NAT gateways with Amazon CloudWatch](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway-cloudwatch.html)
