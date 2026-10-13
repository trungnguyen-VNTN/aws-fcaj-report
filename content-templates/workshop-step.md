---
title: "Mục 5.X: Tiêu đề bước Lab Workshop"
weight: 1
pre: "5.X."
description: "Hướng dẫn thực hành kỹ thuật triển khai chi tiết cho bước lab 5.X."
status: "draft"
---

:::notice{type="info"}
🛠️ **Hướng dẫn lab:** Thực hiện tuần tự các bước dưới đây để cấu hình và kiểm tra dịch vụ.
:::

## 1. Mục tiêu bước này
:::todo[Mục tiêu bước lab]
- Mô tả mục tiêu cụ thể cần đạt được sau khi hoàn thành phần này...
:::

## 2. Các bước triển khai chi tiết (Hands-on Steps)

### Bước 2.1: Cấu hình tài nguyên
Thực thi lệnh sau trên AWS CLI hoặc cấu hình trên AWS Console:

```bash
# Ví dụ lệnh AWS CLI
aws s3 mb s3://my-fcaj-nutrition-bucket-2025 --region ap-southeast-1
```

### Bước 2.2: Triển khai mã nguồn
:::todo[Triển khai mã nguồn]
- Đính kèm cấu hình hoặc mã nguồn cần thiết...
:::

## 3. Kết quả mong đợi & Minh chứng (Screenshots)
:::figure{src="/images/workshop/stepX-result.png" alt="Ảnh chụp màn hình kết quả sau khi triển khai" caption="Kết quả cấu hình dịch vụ thành công trên AWS"}

## 4. Kiểm tra & Xác minh (Verification)
Chạy lệnh kiểm tra tính hợp lệ:

```bash
# Lệnh kiểm thử kết quả
aws s3 ls
```

## 5. Các lỗi thường gặp & Cách khắc phục (Troubleshooting)
- **Lỗi 1:** Quyền truy cập IAM bị từ chối (`AccessDeniedException`).
  - *Khắc phục:* Kiểm tra lại chính sách IAM Policy và đảm bảo role được gán quyền tương ứng.
- **Lỗi 2:** Kết nối mạng bị timeout.
  - *Khắc phục:* Xác minh Security Group inbound rules và Route Table của subnet.
