---
title: "Kiểm thử và xử lý sự cố"
pre: "5.8."
weight: 8
status: "ready"
---

Trang này hướng dẫn tự kiểm tra hệ thống sau khi triển khai (gọi API, đọc log, xem alarm), các kịch bản lỗi cần thử, và những sự cố thật đã gặp trong quá trình làm dự án cùng cách xử lý.

#### 1. Kiểm thử API bằng cURL

Đặt địa chỉ ứng dụng (output `app_url` của Terraform) vào biến rồi chạy từng lệnh. Các lệnh dưới dùng PowerShell; `curl.exe` có sẵn trên Windows 10/11.

```powershell
$APP = "https://ddn09pubqlwme.cloudfront.net"

# 1. Catalog công khai: mong đợi 200 và danh sách sản phẩm
curl.exe -s "$APP/api/products?size=3"

# 2. Lọc dinh dưỡng: chỉ trả sản phẩm có đủ dữ liệu (fail-closed)
curl.exe -s "$APP/api/products?maxCalories=200&minProtein=10"

# 3. Gọi API cần đăng nhập mà không có token: mong đợi 401
curl.exe -s -o NUL -w "%{http_code}`n" "$APP/api/orders"

# 4. Tham số sai định dạng: mong đợi 400
curl.exe -s -o NUL -w "%{http_code}`n" "$APP/api/products?sort=khong-hop-le"
```

| Kịch bản | Kết quả mong đợi | Ý nghĩa |
| --- | --- | --- |
| Catalog công khai | 200, có `items` | CloudFront → ALB → ECS → RDS thông suốt |
| Lọc calo / chất đạm | Chỉ sản phẩm `nutrition_complete` | Nguyên tắc fail-closed |
| Không có token | 401 | Danh tính chỉ lấy từ JWT Cognito |
| Người dùng thường gọi `/api/admin/stats` | 403 | Phân quyền theo `cognito:groups` |
| Tham số sai | 400 | Kiểm tra đầu vào ở backend |
| Đặt hàng vượt tồn kho | 409 `OUT_OF_STOCK` | Trừ kho có điều kiện trong transaction |
| Hỏi AI quá 30 câu / ngày | 429 | Quota theo tài khoản, chống lạm dụng Bedrock |
| Hỏi AI về chữa bệnh | Từ chối, khuyên gặp chuyên gia | Bedrock Guardrails chặn lời khuyên y tế |

Kịch bản 403, 409, 429 và câu hỏi y tế cần đăng nhập, nên thử trực tiếp trên giao diện web theo [`docs/demo.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/demo.md).

#### 2. Kiểm tra log và alarm trên CloudWatch

```powershell
# Xem log backend 10 phút gần nhất (chỉ đọc)
aws logs tail /ecs/nutrition-dev-backend --since 10m --profile nutrition-plan --region ap-southeast-1

# Liệt kê 7 alarm và trạng thái hiện tại
aws cloudwatch describe-alarms --alarm-name-prefix nutrition-dev --query "MetricAlarms[].[AlarmName,StateValue]" --output table --profile nutrition-plan --region ap-southeast-1
```

Khi app đang chạy bình thường, các alarm ở trạng thái `OK`. Alarm `nutrition-dev-api-5xx` và `nutrition-dev-api-error-logs` gửi thư qua SNS khi có lỗi; người nhận phải bấm xác nhận subscription một lần.

#### 3. Kiểm thử tự động

| Bộ test | Số lượng (21/11/2026) | Chạy bằng |
| --- | --- | --- |
| Backend (JUnit, Testcontainers PostgreSQL) | 86 | `./mvnw verify` |
| Frontend (Vitest) | 145 | `npm test` |
| E2E + kiểm tra truy cập axe (Playwright) | 57 | `npm run test:e2e` |

GitHub Actions chạy các bộ test này ở mỗi pull request; chỉ khi xanh mới được merge và deploy.

#### 4. Diễn tập chịu lỗi Multi-AZ

Ngày 22/11/2026 thực hiện **RDS → Reboot with failover**. AZ chính chuyển từ ap-southeast-1a sang ap-southeast-1b trong khoảng 20–45 giây; API gián đoạn khoảng nửa phút rồi tự phục hồi, không mất dữ liệu, không cần thao tác tay.

#### 5. Sự cố thực tế và cách xử lý

| Sự cố | Nguyên nhân | Cách xử lý |
| --- | --- | --- |
| Terraform báo `Error acquiring the state lock` | Đóng cửa sổ khi `apply` đang chạy, file khóa `.tflock` trên S3 còn lại | Kiểm tra không còn tiến trình Terraform nào chạy, state không đổi, rồi chạy `terraform force-unlock <LOCK_ID>` |
| `Token has expired` / `InvalidGrantException` khi chạy lệnh AWS | Phiên SSO hết hạn | Chạy lại `aws sso login --sso-session nutrition` rồi lặp lại lệnh |
| Favicon không hiện trên trang thật (CloudFront trả 403) | Bước build tắt thư mục `public` nên file icon không được tải lên S3 | Sửa cấu hình Vite, thêm bước kiểm tra icon trong bản build production |
| Người dùng bị đăng xuất mỗi khi tải lại trang | Token Cognito chỉ giữ trong bộ nhớ | Lưu phiên vào localStorage và khôi phục khi tải trang (D34) |
| Lệnh `up` báo RDS chưa sẵn sàng | RDS dừng quá 7 ngày sẽ tự bật lại, hoặc đang ở trạng thái `stopped` | Script `demo-infra.ps1 up` gọi `start-db-instance` và chờ `available` trước khi apply |
| AI trả lời "tạm thời chưa sẵn sàng" | Tài khoản chưa có quota Bedrock cho model ở Singapore | Gọi Nova 2 Lite qua inference profile ở Tokyo (`BEDROCK_REGION`, D18) |

#### 6. Bài học rút ra

- Luôn chạy `terraform plan` và đọc kỹ phần destroy / replace trước khi apply.
- Không đóng cửa sổ khi `apply` đang chạy; nếu lỡ, kiểm tra state trước khi mở khóa.
- Kiểm tra trên bản build production, không chỉ trên máy dev.
- Bật / tắt hạ tầng theo buổi demo giúp chi phí thấp, nhưng cần script chờ RDS sẵn sàng.

Nguồn: [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/demo.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/demo.md), [`docs/test-plan.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/test-plan.md), [`infra/modules/alarms/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/alarms/main.tf).
