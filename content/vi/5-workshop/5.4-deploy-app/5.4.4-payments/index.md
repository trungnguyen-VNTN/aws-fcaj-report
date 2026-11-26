---
title: "Thanh toán VNPAY sandbox"
pre: "5.4.4."
weight: 4
status: "ready"
---

Xác minh sandbox, phân quyền và các luồng demo.

1. **Đối chiếu cấu hình nguồn**

Bật app bằng demo-infra.ps1 up -Vnpay theo runbook. VNPAY sandbox dùng HMAC-SHA512, IPN chỉ cập nhật đơn khi chữ ký và số tiền đúng. Return URL chỉ đọc. Đơn bỏ dở tự hủy sau 15 phút và trả kho đúng một lần. V10 ghi payment_events, API admin lọc/phân trang nhật ký; không lưu chữ ký hay thông tin bí mật. Chạy các kịch bản docs/demo.md, gồm fail-closed và COD.

[`backend/src/main/java/com/nutrition/payments/VnpaySigner.java`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/backend/src/main/java/com/nutrition/payments/VnpaySigner.java)

```java
  static String canonical(Map<String, String> params) {
    return new TreeMap<>(params)
        .entrySet().stream()
            .filter(e -> e.getValue() != null && !e.getValue().isEmpty())
            .filter(e -> !e.getKey().equals(HASH) && !e.getKey().equals(HASH_TYPE))
            .map(e -> encode(e.getKey()) + "=" + encode(e.getValue()))
            .collect(Collectors.joining("&"));
  }
```

[`scripts/demo-infra.ps1`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/scripts/demo-infra.ps1)

```powershell
    .\scripts\demo-infra.ps1 up -Vnpay   # also enable VNPAY sandbox payments (D27)
    .\scripts\demo-infra.ps1 up -Vnpay -Waf   # also put AWS WAF in front of CloudFront
```

:::figure{src="/images/workshop/5.4.4-payments-step1.png" alt="5.4.4-payments-step1" caption="Đơn #10 thanh toán qua VNPAY sandbox: Đã đặt, Đã thanh toán VNPAY"}

2. **Kiểm tra kết quả**

Kết quả kiểm thử tự động ngày 21/11/2026: backend 86, frontend 145, E2E + axe 57. Lệnh chạy ghi trong README của repo: backend `./mvnw verify`; frontend `npm test -- --maxWorkers=1` và `npm run test:e2e`. Thử trên web đã đăng nhập (hồ sơ, gợi ý bữa ăn, thanh toán VNPAY sandbox) đã thực hiện ngày 25/11/2026, xem 5.4.4 và 5.5.3.

:::figure{src="/images/workshop/step13-result.png" alt="Thanh toán và kiểm thử" caption="Trang admin Nhật ký thanh toán: IPN VNPAY sandbox của đơn #10 ghi nhận "Đã thanh toán""}

#### Lỗi đã ghi nhận

Sau khi thanh toán thử bằng thẻ NCB, đơn đứng ở trạng thái "Đang chờ VNPAY xác nhận": log ALB cho thấy VNPAY trả mã 00 về Return URL nhưng không gọi IPN. Nguyên nhân là tài khoản sandbox chưa đăng ký IPN URL; sau khi khai báo `https://<cloudfront>/api/payments/vnpay/ipn` với VNPAY, đơn #10 chuyển sang "Đã thanh toán" và nhật ký thanh toán ghi nhận IPN. Các sự cố khác xem [5.8 Kiểm thử và xử lý sự cố](/5-workshop/5.8-testing-troubleshooting).

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`backend/src/main/java/com/nutrition/payments/VnpaySigner.java`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/backend/src/main/java/com/nutrition/payments/VnpaySigner.java).
