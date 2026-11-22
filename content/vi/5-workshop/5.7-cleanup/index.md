---
title: "Dọn tài nguyên"
pre: "5.7."
weight: 7
status: "draft"
---

1. **Tắt buổi demo**

Chạy down với -Vnpay nếu cần giữ secret sandbox. Bỏ -Vnpay sẽ loại bỏ secret theo script. Down xóa ALB và ECS service, bỏ API origin CloudFront, dừng RDS; giữ dữ liệu và vẫn có phí lưu trữ. AWS tự bật RDS sau 7 ngày. Hướng dẫn infra/README.md chỉ nêu tổng quát destroy dev; quy trình cụ thể nằm ở docs/runbook.md mục 4.

[`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1)

```powershell
    .\scripts\demo-infra.ps1 down   # remove ALB + ECS service, stop RDS (~5-10 min)
```

:::figure{src="/images/workshop/5.7-cleanup-step1.png" alt="5.7-cleanup-step1" caption="Ảnh cần bổ sung"}

:::todo[Cần chụp ảnh]
ECS → cluster dự án → Services sau down, không có service API; che định danh.
:::

2. **Kiểm tra trạng thái và chu kỳ 7 ngày**

Tắt demo có giữ dữ liệu và phân biệt với destroy.

:::figure{src="/images/workshop/step14-result.png" alt="Dọn tài nguyên và tổng kết" caption="Ảnh minh chứng cần chủ repo bổ sung"}

:::todo[Cần chụp ảnh]
RDS → Databases → stopped, ECS → cluster → Services sau down, và Billing → tài nguyên còn tính phí; bổ sung biên bản restore nếu thực hiện.
:::

:::figure{src="/images/workshop/5.7-cleanup-step2.png" alt="5.7-cleanup-step2" caption="Ảnh cần bổ sung"}

:::todo[Cần chụp ảnh]
RDS → Databases → nutrition-dev-postgres → Status stopped.
:::

3. **Dọn toàn bộ và diễn tập khôi phục**

Full teardown theo runbook: tạo snapshot và chờ Available; người dùng chủ động bỏ deletion protection của RDS/Cognito, đọc plan xóa, destroy dev, rồi khôi phục bảo vệ khi dựng lại. Bucket bootstrap có prevent_destroy và nằm ngoài diễn tập. Biên bản khôi phục chưa có, không khẳng định đã diễn tập.

:::todo[Biên bản khôi phục]
Điền ngày, snapshot, thời gian khôi phục và kết quả kiểm tra theo bảng docs/runbook.md.
:::

:::figure{src="/images/workshop/5.7-cleanup-step3.png" alt="5.7-cleanup-step3" caption="Ảnh cần bổ sung"}

:::todo[Cần chụp ảnh]
RDS → Snapshots → snapshot Available và tài nguyên diễn tập sau cleanup; chỉ bổ sung nếu đã thực hiện.
:::

#### Lỗi đã ghi nhận

Chưa có lỗi cụ thể được ghi nhận cho bước này trong các nguồn đã đối chiếu. Khi phát sinh, ghi thời điểm, thông báo đã che định danh và cách xử lý được xác nhận.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1).
