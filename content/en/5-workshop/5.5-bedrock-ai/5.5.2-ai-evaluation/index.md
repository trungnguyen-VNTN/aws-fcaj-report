---
title: "Evaluate the AI"
pre: "5.5.2."
weight: 2
status: "draft"
---

Call Nova 2 Lite and assess safety using the prompt suite.

1. **Review the source configuration**

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

:::figure{src="/images/workshop/5.5.2-ai-evaluation-step1.png" alt="5.5.2-ai-evaluation-step1" caption="Real-model evaluation (-Pbedrock-eval): BUILD SUCCESS on 25 November 2026"}

2. **Verify the result**

prompts.json currently contains 45 cases. On 21 November 2026, safety was 17/17 and retrieval 27/28 against an 85% threshold; P01–P07 all passed. L01 is variable because the model can omit category. docs/ai-eval.md retains earlier 30/38-case runs; reconcile it with PROGRESS.md and the current prompt fixture. Live evaluation incurs model charges and is outside CI.

PROGRESS records 86 backend, 145 frontend, and 57 E2E plus axe tests on 21 November 2026. CLAUDE.md documents backend ./mvnw verify and frontend npm test -- --maxWorkers=1 plus npm run test:e2e. A signed-in live test record for profiles, suggestions, and VNPAY is still needed because PROGRESS leaves this open.

:::figure{src="/images/workshop/step10-result.png" alt="AI lookup and Guardrails" caption="Service Quotas: Nova 2 Lite cross-region 8,000,000 tokens per minute"}

#### Recorded troubleshooting

This account has zero Singapore quota. D18 moves calls to Tokyo; monitor L-C6F5908D and L-210172B5. Guardrail AccessDenied requires bedrock:ApplyGuardrail for Tokyo in the policy and boundary.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/PROGRESS.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/PROGRESS.md), [`docs/ai-eval.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/ai-eval.md).
