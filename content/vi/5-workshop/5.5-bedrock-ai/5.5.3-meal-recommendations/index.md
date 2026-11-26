---
title: "Gợi ý bữa ăn (Bonus)"
pre: "5.5.3."
weight: 3
status: "ready"
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

Tạo hồ sơ với dữ liệu thử và sự đồng ý. Kiểm tra sửa/xóa, các trường hợp không đủ điều kiện và gợi ý gồm món protein, rau/trái cây, tinh bột. Chỉ dùng sản phẩm còn hàng, đủ dữ liệu; allergen được loại theo fail-closed. Số gram làm tròn 10 và số liệu tính lại từ DB. Intent plan gọi cùng bộ gợi ý; model chỉ chọn bữa và allergen, không nhận dữ liệu cơ thể. Test tự động ngày 21/11/2026 đã qua; biên bản thử trên web đã đăng nhập ở bên dưới.

**Biên bản thử trên web (25/11/2026, tài khoản khách, môi trường dev trên AWS):**

| Bước | Thao tác | Kết quả |
| --- | --- | --- |
| 1 | `/profile`: nhập năm sinh, giới tính, chiều cao, cân nặng, mức vận động, mục tiêu Tăng cơ; tích đồng ý rồi lưu | Mục tiêu **2.700 kcal/ngày**: protein 96 g, carbohydrate 377 g, chất béo 90 g. Năng lượng nghỉ 1.590 kcal, BMI 20. Trang hiện nhắc "không phải lời khuyên y tế" |
| 2 | `/suggestions` → Bữa trưa | Mục tiêu bữa 1.013 kcal · 36 g protein. Gợi ý: cá ngừ ngâm nước (hộp) 130 g – 111,8 kcal, 25,2 g protein; cải xoăn kale 150 g – 52,5 kcal, 4,4 g protein; đậu gà 200 g – 756 kcal, 41 g protein. Tổng **920,3 kcal (91% mục tiêu)**, protein 70,6 g (196%) |
| 3 | Hỏi trợ lý AI: "Gợi ý bữa trưa cho tôi" | AI trả về **đúng ba món, đúng số gram và số liệu** như trang Gợi ý, tổng 920,3 kcal (91%), kèm dòng "Số liệu tính từ dữ liệu cửa hàng và hồ sơ của bạn. Thông tin tham khảo, không phải tư vấn y tế" |
| 4 | Trường hợp không đủ điều kiện (mang thai/cho con bú, bệnh cần giám sát, tuổi hoặc BMI ngoài ngưỡng) | Kiểm bằng test tự động `NutritionTargetsTest`: hệ thống trả về lý do không đủ điều kiện và không tính mục tiêu cá nhân. Trên form, ô "Có bệnh cần chế độ ăn có giám sát" ghi rõ hệ thống sẽ khuyên gặp chuyên gia |

Kết quả bước 3 chứng minh model không tự tính số: intent `plan` gọi cùng bộ gợi ý với trang web, mọi con số do backend lấy từ PostgreSQL và hồ sơ của người dùng.

#### Lỗi đã ghi nhận

Không phát sinh lỗi trong lần thử. Ghi nhận một điểm cần cải thiện: bộ gợi ý ưu tiên đủ năng lượng nên protein có thể vượt khá xa mục tiêu bữa (196% trong lần thử) khi món tinh bột giàu đạm như đậu gà được chọn; có thể giới hạn thêm theo protein ở phiên bản sau.
