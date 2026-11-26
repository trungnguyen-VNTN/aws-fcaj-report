---
title: "Evaluate the AI"
pre: "5.5.2."
weight: 2
status: "ready"
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

prompts.json currently contains 45 cases. On 21 November 2026, safety was 17/17 and retrieval 27/28 against an 85% threshold; P01–P07 all passed. L01 is variable because the model can omit category. docs/ai-eval.md retains earlier 30/38-case runs; the current prompt fixture is the reference. A real-model rerun on 25 November 2026 passed (BUILD SUCCESS). Live evaluation incurs model charges and is outside CI.

Automated tests on 21 November 2026: 86 backend, 145 frontend, and 57 E2E plus axe. The repository README lists the commands: backend `./mvnw verify`; frontend `npm test -- --maxWorkers=1` and `npm run test:e2e`. Signed-in live tests (profiles, meal suggestions, VNPAY sandbox payment) were performed on 25 November 2026; see 5.4.4 and 5.5.3.

:::figure{src="/images/workshop/step10-result.png" alt="AI lookup and Guardrails" caption="Service Quotas: Nova 2 Lite cross-region 8,000,000 tokens per minute"}

#### Recorded troubleshooting

This account has zero Singapore quota. D18 moves calls to Tokyo; monitor L-C6F5908D and L-210172B5. Guardrail AccessDenied requires bedrock:ApplyGuardrail for Tokyo in the policy and boundary.

Sources: [`infra/README.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/README.md), [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/ai-eval.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/ai-eval.md).
