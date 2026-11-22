---
title: "Đánh giá AI"
pre: "5.5.2."
weight: 2
status: "draft"
---

Gọi Nova 2 Lite và kiểm chứng độ an toàn theo bộ prompt.

1. **Đối chiếu cấu hình nguồn**

[`docs/ai-eval.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/ai-eval.md)

```powershell
$env:AWS_PROFILE = "nutrition-apply"
$env:BEDROCK_REGION = "ap-northeast-1"                              # D18: Tokyo
$env:BEDROCK_MODEL_ID = "amazon.nova-2-lite-v1:0"
$env:BEDROCK_INFERENCE_PROFILE_ID = "jp.amazon.nova-2-lite-v1:0"
$env:BEDROCK_GUARDRAIL_ID = "<terraform output bedrock_guardrail_id>"   # tùy chọn
$env:BEDROCK_GUARDRAIL_VERSION = "1"                                   # tùy chọn
cd backend
./mvnw.cmd test -Pbedrock-eval
```

:::figure{src="/images/workshop/5.5.2-ai-evaluation-step1.png" alt="5.5.2-ai-evaluation-step1" caption="Ảnh cần bổ sung"}

:::todo[Cần chụp ảnh]
Bedrock ở Tokyo → Guardrails → guardrail dự án và Service Quotas → Bedrock → quota Nova; kèm output eval đã che định danh.
:::

2. **Kiểm tra kết quả**

Bộ prompts.json hiện có 45 câu. Ngày 21/11/2026: an toàn 17/17, tra cứu 27/28 (ngưỡng 85%), 7 câu P01–P07 đều đạt. L01 dao động vì model bỏ category, cần theo dõi. docs/ai-eval.md còn mô tả các lượt 30/38 câu trước đó; dùng PROGRESS.md và bộ prompt hiện hành để đối chiếu. Eval gọi model có phí, không thuộc CI.

Theo PROGRESS ngày 21/11/2026: backend 86, frontend 145, E2E + axe 57. Lệnh nguồn trong CLAUDE.md: backend ./mvnw verify; frontend npm test -- --maxWorkers=1 và npm run test:e2e. Cần ghi biên bản thử web đã đăng nhập, hồ sơ, gợi ý và VNPAY vì PROGRESS còn để bước này mở.

:::figure{src="/images/workshop/step10-result.png" alt="AI tra cứu và Guardrails" caption="Ảnh minh chứng cần chủ repo bổ sung"}

:::todo[Cần chụp ảnh]
Bedrock ở Tokyo → Guardrails → guardrail dự án và Service Quotas → Bedrock → quota Nova; kèm output eval đã che định danh.
:::

#### Lỗi đã ghi nhận

Quota Singapore của tài khoản bằng 0. D18 chuyển sang Tokyo; theo dõi quota L-C6F5908D và L-210172B5. AccessDenied với Guardrail cần bedrock:ApplyGuardrail ở Tokyo trong policy và boundary.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`docs/ai-eval.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/ai-eval.md).
