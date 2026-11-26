---
title: "Dọn tài nguyên"
pre: "5.7."
weight: 7
status: "ready"
---

1. **Tắt buổi demo**

Chạy down với -Vnpay nếu cần giữ secret sandbox. Bỏ -Vnpay sẽ loại bỏ secret theo script. Down xóa ALB và ECS service, bỏ API origin CloudFront, dừng RDS; giữ dữ liệu và vẫn có phí lưu trữ. AWS tự bật RDS sau 7 ngày. Hướng dẫn infra/README.md chỉ nêu tổng quát destroy dev; quy trình cụ thể nằm ở docs/runbook.md mục 4.

[`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1)

```powershell
    .\scripts\demo-infra.ps1 down   # remove ALB + ECS service, stop RDS (~5-10 min)
```

:::figure{src="/images/workshop/5.7-cleanup-step1.png" alt="5.7-cleanup-step1" caption="ECS cluster sau khi tắt: 0 service, 0 task"}

2. **Kiểm tra trạng thái và chu kỳ 7 ngày**

Tắt demo có giữ dữ liệu và phân biệt với destroy.

:::figure{src="/images/workshop/step14-result.png" alt="Dọn tài nguyên và tổng kết" caption="EC2 Load balancers sau khi tắt (down): không còn ALB"}

:::figure{src="/images/workshop/5.7-cleanup-step2.png" alt="5.7-cleanup-step2" caption="RDS sau khi tắt: trạng thái Stopped"}

3. **Dọn toàn bộ và diễn tập khôi phục**

Full teardown theo runbook: tạo snapshot và chờ Available; người dùng chủ động bỏ deletion protection của RDS/Cognito, đọc plan xóa, destroy dev, rồi khôi phục bảo vệ khi dựng lại. Bucket bootstrap có prevent_destroy và nằm ngoài diễn tập. Biên bản khôi phục chưa có, không khẳng định đã diễn tập.

**Biên bản diễn tập chịu lỗi (22/11/2026):** thực hiện RDS → *Reboot with failover* trên cấu hình Multi-AZ. AZ chính chuyển từ ap-southeast-1a sang ap-southeast-1b; database khởi động lại sau khoảng 18 giây, AWS báo hoàn tất sau khoảng 43 giây. API gián đoạn khoảng 25–35 giây rồi tự phục hồi, không mất dữ liệu, không cần thao tác tay. Chưa thực hiện diễn tập khôi phục từ snapshot; RDS vẫn có snapshot tự động hằng ngày (ảnh dưới) để khôi phục khi cần.

:::figure{src="/images/workshop/5.7-cleanup-step3.png" alt="5.7-cleanup-step3" caption="RDS System snapshots: 9 bản sao lưu tự động hằng ngày"}

#### Lỗi đã ghi nhận

Đóng cửa sổ khi `down`/`apply` đang chạy để lại khóa state (`Error acquiring the state lock`). Cách xử lý: kiểm tra không còn tiến trình Terraform nào chạy và state không đổi, rồi chạy `terraform force-unlock <LOCK_ID>`. Các sự cố khác xem [5.8 Kiểm thử và xử lý sự cố](/5-workshop/5.8-testing-troubleshooting).

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1).
