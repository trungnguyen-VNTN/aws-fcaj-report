---
title: "Gợi ý bữa ăn (Bonus)"
pre: "5.5.3."
weight: 3
status: "draft"
---

Kiểm tra hồ sơ và gợi ý bữa tính từ dữ liệu DB.

1. **Đối chiếu cấu hình nguồn**

D32 bổ sung hồ sơ và gợi ý bữa ăn. Backend lấy danh tính từ JWT sub. API GET/PUT/DELETE /api/me/profile lưu hồ sơ và sự đồng ý; GET /api/me/targets tính mục tiêu, GET /api/me/recommendations gợi ý bữa. Mifflin-St Jeor × hệ số vận động là phép tính trong code. Mục tiêu giảm −15%, giữ nguyên hoặc tăng cơ +10%, không thấp hơn năng lượng nghỉ. Tuổi ngoài 18–65, BMI ngoài 17–35, mang thai/cho con bú hoặc bệnh cần giám sát không nhận mục tiêu cá nhân.

[`backend/src/main/java/com/nutrition/profile/RecommendationService.java`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/backend/src/main/java/com/nutrition/profile/RecommendationService.java)

```java
public class RecommendationService {
  /** Share of the day's targets each meal aims for. */
  public enum Meal {
    BREAKFAST(0.25),
    LUNCH(0.375),
    DINNER(0.375);
```

:::figure{src="/images/workshop/5.5.3-meal-recommendations-step1.png" alt="5.5.3-meal-recommendations-step1" caption="Gợi ý bữa trưa theo hồ sơ: số liệu tính từ DB, so với mục tiêu của bữa"}

2. **Kiểm tra kết quả**

Tạo hồ sơ với dữ liệu thử và sự đồng ý. Kiểm tra sửa/xóa, các trường hợp không đủ điều kiện và gợi ý gồm món protein, rau/trái cây, tinh bột. Chỉ dùng sản phẩm còn hàng, đủ dữ liệu; allergen được loại theo fail-closed. Số gram làm tròn 10 và số liệu tính lại từ DB. Intent plan gọi cùng bộ gợi ý; model chỉ chọn bữa và allergen, không nhận dữ liệu cơ thể. PROGRESS ngày 21/11/2026 ghi test tự động đã qua, nhưng thử web đã đăng nhập còn mở.

:::todo[Kết quả thực tế — hồ sơ]
Bổ sung biên bản thử web /profile, /suggestions và câu hỏi AI gợi ý bữa sau khi đăng nhập.
:::

#### Lỗi đã ghi nhận

Chưa có biên bản lỗi thực tế của phần hồ sơ để tổng kết.
