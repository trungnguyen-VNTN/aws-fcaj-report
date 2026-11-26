---
title: "Enable Nova 2 Lite and Guardrails"
pre: "5.5.1."
weight: 1
status: "ready"
---

Call Nova 2 Lite and assess safety using the prompt suite.

1. **Review the source configuration**

D18 configures BEDROCK_REGION=ap-northeast-1, model amazon.nova-2-lite-v1:0, and profile jp.amazon.nova-2-lite-v1:0. The Guardrail runs in the same Region. searchProducts is the only tool. The backend validates its schema and uses parameterized SQL. The search, facts, compare, and plan intents use DB data for numerical answers. D32 computes targets and suggestions in code and excludes body measurements from model calls. Chat quota is 30 questions per user per day.

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

:::figure{src="/images/workshop/5.5.1-bedrock-guardrails-step1.png" alt="5.5.1-bedrock-guardrails-step1" caption="Guardrail nutrition-dev-chat in Tokyo: blocks medical advice and prompt attacks"}

2. **Verify the result**

prompts.json currently contains 45 cases. On 21 November 2026, safety was 17/17 and retrieval 27/28 against an 85% threshold; P01–P07 all passed. L01 is variable because the model can omit category. docs/ai-eval.md retains earlier 30/38-case runs; the current prompt fixture is the reference. A real-model rerun on 25 November 2026 passed (BUILD SUCCESS). Live evaluation incurs model charges and is outside CI.

:::figure{src="/images/workshop/step10-result.png" alt="AI lookup and Guardrails" caption="Service Quotas: Nova 2 Lite cross-region 8,000,000 tokens per minute"}

#### Recorded troubleshooting

This account has zero Singapore quota. D18 moves calls to Tokyo; monitor L-C6F5908D and L-210172B5. Guardrail AccessDenied requires bedrock:ApplyGuardrail for Tokyo in the policy and boundary.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/ai-eval.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/ai-eval.md).
