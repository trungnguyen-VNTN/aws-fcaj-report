---
title: "Testing and troubleshooting"
pre: "5.8."
weight: 8
status: "ready"
---

This page shows how to verify the system after deployment (API calls, logs, alarms), which failure scenarios to try, and the real incidents met during the project with how they were resolved.

#### 1. API tests with cURL

Put the application address (the Terraform `app_url` output) in a variable and run each command. The commands use PowerShell; `curl.exe` ships with Windows 10/11.

```powershell
$APP = "https://ddn09pubqlwme.cloudfront.net"

# 1. Public catalog: expect 200 and a product list
curl.exe -s "$APP/api/products?size=3"

# 2. Nutrition filter: only products with complete data are returned (fail-closed)
curl.exe -s "$APP/api/products?maxCalories=200&minProtein=10"

# 3. Protected API without a token: expect 401
curl.exe -s -o NUL -w "%{http_code}`n" "$APP/api/orders"

# 4. Malformed parameter: expect 400
curl.exe -s -o NUL -w "%{http_code}`n" "$APP/api/products?sort=invalid"
```

| Scenario | Expected result | What it proves |
| --- | --- | --- |
| Public catalog | 200 with `items` | CloudFront → ALB → ECS → RDS works end to end |
| Calorie / protein filter | Only `nutrition_complete` products | Fail-closed rule |
| No token | 401 | Identity comes only from the Cognito JWT |
| Regular user calls `/api/admin/stats` | 403 | Authorisation by `cognito:groups` |
| Malformed parameter | 400 | Backend input validation |
| Order above stock | 409 `OUT_OF_STOCK` | Conditional stock update in a transaction |
| More than 30 AI questions a day | 429 | Per-account quota protects Bedrock spend |
| Asking the AI for a cure | Refused, user referred to a professional | Bedrock Guardrails block medical advice |

The 403, 409, 429 and medical-question scenarios need a signed-in user, so run them in the web UI following [`docs/demo.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/demo.md).

#### 2. Checking CloudWatch logs and alarms

```powershell
# Backend logs from the last 10 minutes (read-only)
aws logs tail /ecs/nutrition-dev-backend --since 10m --profile nutrition-plan --region ap-southeast-1

# List the 7 alarms and their current state
aws cloudwatch describe-alarms --alarm-name-prefix nutrition-dev --query "MetricAlarms[].[AlarmName,StateValue]" --output table --profile nutrition-plan --region ap-southeast-1
```

While the app is healthy the alarms are `OK`. The `nutrition-dev-api-5xx` and `nutrition-dev-api-error-logs` alarms send e-mail through SNS on errors; the recipient must confirm the subscription once.

#### 3. Automated tests

| Suite | Count (21 Nov 2026) | Command |
| --- | --- | --- |
| Backend (JUnit, Testcontainers PostgreSQL) | 86 | `./mvnw verify` |
| Frontend (Vitest) | 145 | `npm test` |
| E2E + axe accessibility (Playwright) | 57 | `npm run test:e2e` |

GitHub Actions runs these suites on every pull request; only green builds are merged and deployed.

#### 4. Multi-AZ failover drill

On 22 November 2026 an **RDS → Reboot with failover** was performed. The primary moved from ap-southeast-1a to ap-southeast-1b in about 20–45 seconds; the API was interrupted for about half a minute and recovered on its own, with no data loss and no manual action.

#### 5. Real incidents and fixes

| Incident | Cause | Fix |
| --- | --- | --- |
| Terraform reports `Error acquiring the state lock` | The window was closed during `apply`, leaving the `.tflock` file in S3 | Confirm no Terraform process is running and the state is unchanged, then run `terraform force-unlock <LOCK_ID>` |
| `Token has expired` / `InvalidGrantException` on AWS commands | The SSO session expired | Run `aws sso login --sso-session nutrition` and repeat the command |
| Favicon missing on the live site (CloudFront 403) | The build disabled the `public` folder, so the icon was never uploaded to S3 | Fix the Vite config and add an icon check to the production build |
| Users signed out on every page reload | Cognito tokens were kept only in memory | Persist the session in localStorage and restore it on load (D34) |
| `up` fails because RDS is not ready | RDS restarts itself after 7 days stopped, or is still `stopped` | `demo-infra.ps1 up` calls `start-db-instance` and waits for `available` before applying |
| AI answers "temporarily unavailable" | No Bedrock quota for the model in Singapore | Call Nova 2 Lite through the Tokyo inference profile (`BEDROCK_REGION`, D18) |

#### 6. Lessons learned

- Always run `terraform plan` and read every destroy / replace before applying.
- Never close the window while `apply` runs; if it happens, check the state before unlocking.
- Verify on the production build, not only on the dev server.
- Switching the stack on and off per demo keeps cost low, but the script must wait for RDS.

Sources: [`docs/runbook.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/runbook.md), [`docs/demo.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/demo.md), [`docs/test-plan.md`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/docs/test-plan.md), [`infra/modules/alarms/main.tf`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/infra/modules/alarms/main.tf).
