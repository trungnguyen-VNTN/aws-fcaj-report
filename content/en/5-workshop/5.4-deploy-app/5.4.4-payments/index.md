---
title: "VNPAY sandbox payments"
pre: "5.4.4."
weight: 4
status: "ready"
---

Verify sandbox payments, authorization, and demo flows.

1. **Review the source configuration**

Enable the app using demo-infra.ps1 up -Vnpay as documented in the runbook. VNPAY sandbox uses HMAC-SHA512 and IPN updates orders only after signature and amount validation. The return URL is read-only. Abandoned orders expire after 15 minutes with stock restored once. V10 stores payment_events with a paginated admin API and excludes signatures and secrets. Follow docs/demo.md including fail-closed and COD cases.

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

:::figure{src="/images/workshop/5.4.4-payments-step1.png" alt="5.4.4-payments-step1" caption="Order #10 paid through VNPAY sandbox: placed and marked as paid"}

2. **Verify the result**

Automated tests on 21 November 2026: 86 backend, 145 frontend, and 57 E2E plus axe. The repository README lists the commands: backend `./mvnw verify`; frontend `npm test -- --maxWorkers=1` and `npm run test:e2e`. Signed-in live tests (profiles, meal suggestions, VNPAY sandbox payment) were performed on 25 November 2026; see 5.4.4 and 5.5.3.

:::figure{src="/images/workshop/step13-result.png" alt="Payments and testing" caption="Admin payment log: the VNPAY sandbox IPN for order #10 recorded as paid"}

#### Recorded troubleshooting

After a test payment with the NCB card, the order stayed "waiting for VNPAY confirmation": ALB logs showed VNPAY returning code 00 to the Return URL but never calling the IPN. The sandbox account had no IPN URL registered; after registering `https://<cloudfront>/api/payments/vnpay/ipn` with VNPAY, order #10 became paid and the payment log recorded the IPN. Other incidents are listed in [5.8 Testing and troubleshooting](/5-workshop/5.8-testing-troubleshooting).

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`backend/src/main/java/com/nutrition/payments/VnpaySigner.java`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/backend/src/main/java/com/nutrition/payments/VnpaySigner.java).
