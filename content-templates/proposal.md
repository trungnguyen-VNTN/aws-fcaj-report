---
title: "Workshop Proposal — Đề xuất Dự án"
weight: 1
pre: "2."
description: "Thiết kế kiến trúc, phạm vi, vấn đề giải quyết, kế hoạch và ước tính chi phí cho dự án workshop."
status: "draft"
---

:::notice{type="info"}
📋 **FCAJ Proposal Rubric:** Đề tài phải có sơ đồ kiến trúc tự vẽ (Draw.io + AWS Icons) và bảng ước tính chi phí rõ ràng cho cả môi trường Demo và Production.
:::

## 1. Tổng quan Đề xuất (Executive Summary)
:::todo[Executive Summary]
- Giới thiệu tổng quan về đề tài Workshop: AWS Personalized Nutrition E-Commerce Platform...
:::

## 2. Vấn đề cần giải quyết & Mục tiêu (Problem Statement & Scope)
:::todo[Problem Statement]
- Nêu rõ vấn đề thực tế trong ngành dinh dưỡng và bán lẻ trực tuyến...
- Mục tiêu kiến trúc cần đạt được (tính sẵn sàng cao, bảo mật dữ liệu PII, độ trễ thấp)...
:::

## 3. Kiến trúc Giải pháp (Solution Architecture)
:::notice{type="warning"}
⚠️ Lưu ý quan trọng: Không được dùng sơ đồ do AI tạo 100%. Tự vẽ bằng Draw.io và bộ AWS Architecture Icons chính thức.
:::

:::figure{src="/images/architecture/system-overview.png" alt="Sơ đồ Kiến trúc Tổng thể Hệ thống" caption="Kiến trúc Serverless & AI Agent trên AWS"}

## 4. Kế hoạch Triển khai & Timeline
| Giai đoạn | Nội dung công việc | Thời gian | Kết quả bàn giao |
| --- | --- | --- | --- |
| Pha 1: Hạ tầng | VPC, Subnets, IAM, KMS | Tuần 1 - 2 | Mã nguồn IaC / Terraform |
| Pha 2: Dữ liệu & Backend | DynamoDB, S3, Lambda API | Tuần 3 - 5 | REST API hoàn chỉnh |
| Pha 3: AI & Guardrails | Amazon Bedrock, Agents | Tuần 6 - 8 | Agent dinh dưỡng an toàn |
| Pha 4: Frontend & CI/CD | React, CloudFront, GitHub Actions | Tuần 9 - 10 | Ứng dụng trực tuyến |
| Pha 5: Kiểm thử & Báo cáo | Load test, Cost audit, Demo video | Tuần 11 - 12 | Video demo & Báo cáo hoàn thiện |

## 5. Ước tính Chi phí (Cost Estimation)
:::notice{type="tip"}
💡 Mục Chi phí là bắt buộc để đạt điểm trình bày Proposal.
:::

| Dịch vụ AWS | Cấu hình & Thông số | Môi trường Demo ($/tháng) | Môi trường Production ($/tháng) | Ghi chú & Tối ưu Free Tier |
| --- | --- | --- | --- | --- |
| Amazon VPC | 1 VPC, 4 Subnets, VPC Endpoints | $0.00 | $65.70 | Demo không dùng NAT Gateway đắt tiền |
| Amazon DynamoDB | On-Demand, 25GB Storage | $0.00 | $12.50 | Thuộc AWS Always Free Tier |
| AWS Lambda | 1M invocations, 512MB RAM | $0.00 | $8.40 | Miễn phí 1M requests/tháng |
| Amazon Bedrock | Claude 3.5 Haiku, 150k tokens | $3.50 | $45.00 | Sử dụng Haiku tối ưu chi phí |
| S3 & CloudFront | Static hosting & CDN, 50GB transfer | $0.00 | $4.80 | 1TB transfer out miễn phí |
| **TỔNG CỘNG** | **Chi phí ước tính hàng tháng** | **~$3.50 / tháng** | **~$136.40 / tháng** | **Demo tối ưu trong gói Free Tier** |

## 6. Phân tích Rủi ro & Giải pháp Giảm thiểu (Risk Analysis)
:::todo[Risk Analysis]
- Rủi ro về rò rỉ dữ liệu cá nhân y tế / dinh dưỡng: Giải pháp Bedrock Guardrails & mã hóa KMS...
- Rủi ro chi phí ngoài ý muốn: Thiết lập AWS Budgets & CloudWatch Alarms...
:::

## 7. Kết quả Kỳ vọng (Expected Deliverables)
- Ứng dụng web trực tiếp hoạt động ổn định trên CloudFront.
- Repository GitHub mã nguồn mở có CI/CD pipeline tự động.
- Bộ tài liệu hướng dẫn kỹ thuật chi tiết theo định dạng Workshop.
