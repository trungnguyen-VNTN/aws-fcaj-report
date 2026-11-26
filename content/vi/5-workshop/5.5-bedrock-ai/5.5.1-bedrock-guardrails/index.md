---
title: "Bật Nova 2 Lite và Guardrails"
pre: "5.5.1."
weight: 1
status: "ready"
---

Gọi Nova 2 Lite và kiểm chứng độ an toàn theo bộ prompt.

1. **Đối chiếu cấu hình nguồn**

D18 đặt BEDROCK_REGION=ap-northeast-1, model amazon.nova-2-lite-v1:0, profile jp.amazon.nova-2-lite-v1:0. Guardrail cùng vùng. searchProducts là tool duy nhất; backend kiểm schema và truy vấn SQL tham số hóa. Intent search, facts, compare, plan dùng DB để ghép số liệu. D32 tính mục tiêu và gợi ý bằng code, không gửi dữ liệu cơ thể cho model. Quota chat 30 câu/ngày/người.

[`infra/modules/guardrail/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/guardrail/main.tf)

```hcl
resource "aws_bedrock_guardrail" "chat" {
  # Must match the region the backend calls Bedrock in (BEDROCK_REGION, D18).
  region                    = var.region
  name                      = "${var.name_prefix}-chat"
  description               = "Food catalog search: no medical advice, no prompt attacks."
  blocked_input_messaging   = "Tôi chỉ hỗ trợ tra cứu thực phẩm trong cửa hàng và không đưa ra lời khuyên y tế."
  blocked_outputs_messaging = "Tôi chỉ hỗ trợ tra cứu thực phẩm trong cửa hàng và không đưa ra lời khuyên y tế."
```

:::figure{src="/images/workshop/5.5.1-bedrock-guardrails-step1.png" alt="5.5.1-bedrock-guardrails-step1" caption="Guardrail nutrition-dev-chat ở Tokyo: chặn lời khuyên y tế và prompt attack"}

2. **Kiểm tra kết quả**

Bộ prompts.json hiện có 45 câu. Ngày 21/11/2026: an toàn 17/17, tra cứu 27/28 (ngưỡng 85%), 7 câu P01–P07 đều đạt. L01 dao động vì model bỏ category, cần theo dõi. docs/ai-eval.md còn mô tả các lượt 30/38 câu trước đó; bộ prompt hiện hành là nguồn chuẩn. Lần chạy lại với model thật ngày 25/11/2026 đạt BUILD SUCCESS. Eval gọi model có phí, không thuộc CI.

:::figure{src="/images/workshop/step10-result.png" alt="AI tra cứu và Guardrails" caption="Service Quotas: Nova 2 Lite cross-region 8.000.000 token mỗi phút"}

#### Lỗi đã ghi nhận

Quota Singapore của tài khoản bằng 0. D18 chuyển sang Tokyo; theo dõi quota L-C6F5908D và L-210172B5. AccessDenied với Guardrail cần bedrock:ApplyGuardrail ở Tokyo trong policy và boundary.

Nguồn: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/ai-eval.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/ai-eval.md).
