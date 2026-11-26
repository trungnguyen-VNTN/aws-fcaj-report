---
title: "Đề xuất dự án"
pre: "2."
weight: 2
status: "ready"
---

# Nền tảng Thương mại Điện tử Dinh dưỡng Cá nhân hóa trên AWS

## Tra cứu dinh dưỡng có nguồn và mua sắm trên hạ tầng AWS

### 1. Tóm tắt đề xuất

Nền tảng thương mại điện tử dinh dưỡng cá nhân hóa trên AWS hỗ trợ tra cứu thực phẩm, mua hàng và gợi ý bữa ăn từ dữ liệu có nguồn. React gọi Spring Boot qua CloudFront và ALB; PostgreSQL lưu dữ liệu, Bedrock chỉ diễn giải yêu cầu. Sản phẩm thiếu dữ liệu bị loại khi lọc dinh dưỡng hoặc allergen. Số liệu trả lời do code lấy từ DB, kết hợp vận hành theo buổi demo để kiểm soát chi phí.

### 2. Vấn đề cần giải quyết

### Vấn đề là gì?

Người mua khó so sánh thực phẩm khi dữ liệu dinh dưỡng và allergen thiếu nhất quán. Câu trả lời AI có thể chứa con số thiếu căn cứ nếu model tự sinh nội dung.

### Giải pháp

Người mua khó đối chiếu dữ liệu dinh dưỡng và allergen giữa các sản phẩm. Chatbot sinh văn bản có thể đưa ra con số không có căn cứ. MVP gồm catalog 152 sản phẩm USDA, tài khoản, bộ lọc theo dinh dưỡng, 9 allergen và 6 nhãn chế độ ăn; phân tích bữa ăn; AI tra cứu chỉ đọc; giỏ hàng, đặt hàng, quản lý sản phẩm, ảnh, đơn, thống kê và nhật ký thanh toán. COD và VNPAY sandbox nằm trong phạm vi.

D32 bổ sung hồ sơ và gợi ý một bữa gồm món protein, rau/trái cây và tinh bột. Mục tiêu tính bằng Mifflin-St Jeor × mức vận động. Chỉ áp dụng cho tuổi 18–65, BMI 17–35, loại trừ mang thai, cho con bú và bệnh cần giám sát. Không có thanh toán thật, hoàn tiền tự động hoặc tư vấn y tế. Danh tính lấy từ JWT; trừ kho bằng UPDATE có điều kiện trong transaction.

### Lợi ích và hiệu quả đầu tư

Người mua tra cứu thông tin từ DB, lọc theo nhu cầu và xem giới hạn dữ liệu. Cửa hàng quản lý catalog, ảnh, đơn và nhật ký thanh toán trong cùng ứng dụng. Cost Explorer ghi 6,44 USD cho 01–21/11/2026, toàn bộ được credit bù. Chưa có số liệu doanh thu hay tiết kiệm lao động để tính ROI tài chính.

### 3. Kiến trúc giải pháp

:::figure{src="/images/architecture/system-overview.png" alt="AWS architecture reference" caption="Sơ đồ kiến trúc AWS vẽ trên draw.io bằng bộ AWS Architecture Icons, cập nhật Multi-AZ và AWS STS ngày 25/11/2026"}

Từ 22/11/2026 (D33), môi trường dev chạy 2 task ECS, mỗi Availability Zone một task, và RDS ở chế độ Multi-AZ với bản dự phòng (Standby) ở AZ thứ hai. Diễn tập *Reboot with failover* ngày 22/11 chuyển AZ chính từ ap-southeast-1a sang ap-southeast-1b trong khoảng 20–45 giây; API gián đoạn khoảng nửa phút rồi tự phục hồi, không mất dữ liệu.

### Các dịch vụ AWS sử dụng

- **CloudFront + S3** — React SPA và ảnh qua OAC; Function viết lại đường dẫn; hai bucket riêng tư.
- **ALB + ECS Fargate + ECR** — ALB nhận CloudFront + header bí mật; Spring Boot 4 / Java 21, ARM64, 0,5 vCPU / 1 GB, 2 task ở 2 AZ.
- **RDS PostgreSQL + Secrets Manager** — db.t4g.micro, 20 GB gp3, Multi-AZ (standby ở AZ thứ hai), private subnet, mã hóa; Flyway V1–V11.
- **Cognito** — JWT sub và cognito:groups; USER / ADMIN.
- **Bedrock + Guardrails** — Nova 2 Lite ở Tokyo; tool chỉ đọc, số liệu do code lấy từ DB.
- **CloudWatch + SNS + Budgets** — Log 14 ngày, 7 alarm, cảnh báo thư điện tử; ngân sách 100 USD.
- **CloudTrail + S3 audit + WAF** — Audit và ALB logs lưu 30 ngày; WAF chỉ bật khi demo; KMS do AWS quản lý.
- **Terraform + IAM + STS + GitHub Actions** — State S3 use_lockfile; SSO, boundary; CI/CD qua OIDC, AWS STS cấp quyền tạm thời (AssumeRoleWithWebIdentity), không lưu access key.

Ứng dụng ở ap-southeast-1, tiền tố nutrition-dev, chỉ một môi trường dev. D15 đặt ECS ở public subnet với IP công khai để tránh chi phí NAT, còn RDS giữ private. D17 chọn một môi trường để phù hợp đồ án. D18 chuyển lời gọi Bedrock và Guardrail sang ap-northeast-1 vì quota Singapore của tài khoản bằng 0; profile jp.amazon.nova-2-lite-v1:0. D24/D31 giới hạn model vào searchProducts với intent search, facts, compare, plan; số liệu do backend ghép. CloudFront → ALB hiện dùng HTTP vì chưa có domain riêng.

### Thiết kế thành phần

- Frontend React + TypeScript hiển thị catalog, giỏ hàng, hồ sơ, gợi ý và trang quản trị.
- Backend Spring Boot 4 / Java 21: catalog quản lý tra cứu; commerce xử lý giỏ/đơn; payments xác minh IPN; ai trích ý định; admin cung cấp API quản trị; profile tính mục tiêu và gợi ý.
- Database PostgreSQL dùng SQL tham số hóa và Flyway V1–V11.
- AI dùng Nova 2 Lite với Guardrails; code kiểm bộ lọc và ghép số liệu từ DB.
- CI/CD GitHub Actions kiểm thử, build ARM64, lấy quyền tạm thời từ AWS STS qua OIDC, đẩy ECR và deploy.

### 4. Triển khai kỹ thuật

Terraform dựng hạ tầng; Maven wrapper và Flyway quản lý backend/schema; React + TypeScript tạo frontend. Pipeline OIDC build, kiểm thử và triển khai theo nhánh master. Các pha được nhóm theo mốc đã ghi trong repo.

| Pha | Thời gian 2026 | Nội dung thực tế |
| --- | --- | --- |
| 1 | 29/10–01/11 | Repo, khung frontend, catalog backend, Cognito |
| 2 | 03–10/11 | Thiết kế giao diện, dữ liệu USDA |
| 3 | 11–12/11 | Terraform mạng/RDS/ECR/Cognito/ALB/ECS/CloudFront; OIDC; chạy AWS lần đầu |
| 4 | 13–18/11 | AI, Guardrails, alarm; tìm kiếm, giới hạn tốc độ, phân tích bữa ăn, VNPAY sandbox, giao diện |
| 5 | 20–22/11 | Tokyo, E2E, audit/WAF tùy chọn; AI đủ intent, D32, apply audit và đo chi phí |

### 5. Kế hoạch và mốc triển khai

| Ngày | Mốc thực tế |
| --- | --- |
| 29/10/2026 | Khởi tạo repo |
| 01/11/2026 | Khung frontend, catalog backend, Cognito |
| 03–06/11/2026 | Thiết kế lại giao diện |
| 10/11/2026 | Dữ liệu USDA |
| 11/11/2026 | Terraform mạng, RDS, ECR, Cognito, ALB, ECS và CloudFront |
| 12/11/2026 | OIDC, ảnh sản phẩm và lần chạy AWS đầu tiên |
| 13/11/2026 | AI, Guardrails, đánh giá và alarm |
| 14–15/11/2026 | Tìm kiếm, quên mật khẩu, thống kê, giới hạn tốc độ, Spring Boot 4 |
| 16/11/2026 | Mở rộng catalog, nhãn chế độ ăn, phân tích bữa, VNPAY sandbox |
| 17–18/11/2026 | Hoàn thiện giao diện |
| 20/11/2026 | Tokyo, E2E, audit, WAF tùy chọn, nhật ký thanh toán |
| 21/11/2026 | AI đủ intent, hồ sơ và gợi ý D32 |
| 22/11/2026 | Apply audit và đo chi phí |

### 6. Ước tính ngân sách

### Chi phí hạ tầng

Ước tính USD/tháng, đối chiếu AWS Pricing Calculator ngày 25/11/2026 cho cấu hình Multi-AZ và 2 task (D33), chưa thuế, sai lệch có thể ±10%. Production là phương án tương lai chưa triển khai. Bedrock thực tế gọi tại Tokyo.

| Dịch vụ / Cấu hình | Demo (~4h/ngày) | 24/7 (Pricing Calculator) | Production đề xuất |
| --- | --- | --- | --- |
| RDS PostgreSQL db.t4g.micro, Multi-AZ, 20 GB gp3 | ~11,6 | 42,75 | ~70 (Multi-AZ, db.t4g.small) |
| ECS Fargate ARM64, 0,5 vCPU / 1 GB, 2 task | ~5,9 | 35,98 | ~36–72 (2–4 task, auto scaling) |
| Application Load Balancer | ~3,1 | 18,63 | ~22 |
| Public IPv4, 4 địa chỉ | ~2,4 | 14,60 | ~15 |
| Secrets Manager, 2 secret | 0,85 | 0,85 | 0,85 |
| Bedrock (Nova Lite làm giá tham chiếu, Tokyo) | <0,7 | 0,70 | Theo lượng dùng |
| CloudFront 1,02 · CloudWatch 1,70 · ECR 0,10 · S3 0,07 · Cognito 0 · CloudTrail 0 | ~2,9 | 2,89 | ~5 |
| **Tổng (không WAF)** | **~27** | **116,40** | **~150–190** |
| WAF (tùy chọn, nhóm Optional) | 0 | 9,60 | ~10 |
| **Tổng có WAF** | — | **126,00** | **~160–200** |

Cost Explorer ghi nhận **6,44 USD** cho 01–21/11/2026, được credit bù toàn bộ. RDS 2,77; ALB 1,29; ECS 1,21; IPv4 0,74; Bedrock 0,21; Secrets Manager 0,20 USD. Các khoản liệt kê là những khoản lớn, không phải phép cộng chi tiết toàn bộ hóa đơn. App chỉ bật khi demo nên không dùng số thực tế này để suy ra mức chạy 24/7. Số thực tế này ghi nhận trước khi bật Multi-AZ.

**Bảng giá AWS Pricing Calculator:** [estimate ngày 25/11/2026](https://calculator.aws/#/estimate?id=8dfa24875b5ab56798dc086bcac564644ffcfce4). Cột 24/7 lấy đúng số của Calculator (Singapore, riêng Bedrock ở Tokyo). Cột Demo quy đổi từ đó cho khoảng 120 giờ chạy mỗi tháng: các khoản tính theo giờ (RDS instance, Fargate, ALB, IPv4) nhân 120/730, còn ổ đĩa RDS (5,52 USD) và các khoản theo lượng dùng giữ nguyên. Giả định tải: 50 người dùng/tháng, 5 GB CloudFront, khoảng 3.600 câu hỏi AI/tháng (1 câu/phút trong 2 giờ/ngày, 1.500 token vào, 300 token ra). Calculator chưa có Amazon Nova 2 Lite nên dùng Amazon Nova Lite làm giá tham chiếu. Estimate không tính RDS Proxy và Database Insights Advanced vì dự án không dùng.

### 7. Đánh giá rủi ro

#### Ma trận rủi ro

| Rủi ro | Ảnh hưởng | Khả năng | Mức độ |
| --- | --- | --- | --- |
| Chi phí ngoài dự kiến | Trung bình | Trung bình | Trung bình |
| Lộ dữ liệu cá nhân | Cao | Thấp | Trung bình |
| AI trả lời sai/y tế | Cao | Trung bình | Cao |
| Quota Bedrock | Trung bình | Cao (đã xảy ra ở Singapore) | Trung bình |
| HTTP từ CloudFront tới ALB | Trung bình | Thấp | Thấp |
| Sự cố một Availability Zone | Cao | Thấp | Trung bình (đã giảm nhờ Multi-AZ) |

Cách chấm: Ảnh hưởng và Khả năng theo ba mức Thấp / Trung bình / Cao; Mức độ là kết hợp của hai yếu tố, sau khi tính các biện pháp giảm thiểu bên dưới. Rủi ro AI được xếp Cao vì sai số liệu dinh dưỡng hoặc lời khuyên y tế có thể ảnh hưởng tới sức khỏe người dùng, nên được ưu tiên kiểm soát nhiều lớp.

#### Biện pháp giảm thiểu

- Chi phí: Budgets 100 USD, alarm và up/down. RDS có thể tự bật sau 7 ngày dừng.
- Dữ liệu cá nhân: JWT và phân quyền; tránh log PII, dữ liệu cơ thể không gửi model; người dùng tự xóa hồ sơ.
- AI: Guardrails, tool chỉ đọc, số liệu từ DB; đánh giá 45 câu ngày 21/11/2026 đạt an toàn 17/17, tra cứu 27/28, ngưỡng 85%. Câu L01 còn dao động.
- Quota: Tokyo thay cho Singapore theo D18; theo dõi quyền ApplyGuardrail.
- Origin: prefix list CloudFront và header bí mật giảm truy cập trực tiếp; HTTP tới ALB vẫn là hạn chế. HTTPS origin cần domain và chứng chỉ trong tương lai.

#### Phương án dự phòng

Khi Bedrock không gọi được, duy trì catalog và luồng mua hàng, trả lỗi AI có kiểm soát. Nếu chi phí tăng, dùng down theo runbook. Khi cần khôi phục DB, làm theo quy trình snapshot trong docs/runbook.md; biên bản diễn tập vẫn chờ chủ repo thực hiện.

### 8. Kết quả kỳ vọng

#### Cải thiện kỹ thuật:

- Web React và API trên CloudFront.
- Mã nguồn, kiểm thử và workflow OIDC trên GitHub.
- Terraform và hướng dẫn vận hành theo buổi demo.
- Bộ workshop 7 mục lớn cùng các bước con và báo cáo song ngữ.

Nguồn đối chiếu: [`README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/README.md), [`docs/architecture.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/architecture.md), [`docs/decisions.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/decisions.md), [`docs/api-contract.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/api-contract.md), [`docs/db-schema.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/db-schema.md).

#### Giá trị dài hạn

Lộ trình production chưa triển khai gồm RDS Multi-AZ, hai task, domain riêng với HTTPS tới ALB và WAF thường trực. Mỗi thay đổi cần plan, đánh giá khả năng chịu lỗi và cập nhật ước tính chi phí.
