---
title: "Sự kiện 2"
pre: "4.2."
weight: 2
status: "ready"
---

# Báo cáo tổng kết: AWS First Cloud AI Journey Community Day

### Thông tin sự kiện

- **Tên sự kiện:** AWS First Cloud AI Journey Community Day
- **Thời gian:** Buổi sáng, 31/10/2026
- **Địa điểm:** Tầng 26, Bitexco Financial Tower, TP. Hồ Chí Minh
- **Vai trò:** Người tham dự
- **Diễn giả:** Thinh Nguyen, Henry Duc Bui, Hung Tran, Dao Luong, Khang Duong, Tuan Tran (STYL Solutions, CloudThinker, NAB, FCAJ, AWS Student Builder Group SGU)

### Mục tiêu sự kiện

- Nghe các builder trong cộng đồng chia sẻ dự án thực tế họ đang xây dựng trên AWS.
- Hiểu cách Amazon SQS giúp xây dựng hệ thống xử lý bất đồng bộ đáng tin cậy.
- So sánh cách các nhóm khác thiết kế, vận hành và xử lý sự cố với cách làm trong dự án của mình.
- Kết nối với diễn giả và các thực tập sinh FCAJ khác.

### Nội dung nổi bật

#### Chia sẻ dự án thực tế của các diễn giả

Phần lớn buổi sáng là các diễn giả từ STYL Solutions, CloudThinker, NAB và FCAJ trình bày dự án của chính họ: bài toán ban đầu, kiến trúc chọn trên AWS, những chỗ đã phải sửa khi chạy thật và bài học rút ra. Cách trình bày theo câu chuyện dự án giúp thấy rõ lý do đằng sau từng quyết định kiến trúc, thay vì chỉ liệt kê dịch vụ.

#### AWS SQS: Building Reliable Asynchronous Systems (Dao Luong)

Diễn giả Lương Cẩm Đào (Ban R&D, AWS Student Builder Group SGU) xuất phát từ một dự án AI Content thực tế: các bước sinh nội dung tốn thời gian và tải tăng đột biến làm các service gọi trực tiếp nhau dễ quá tải. Amazon SQS được đặt vào giữa để tách rời producer và consumer, hấp thụ các đợt tăng tải và cho phép xử lý bất đồng bộ.

#### Các khái niệm để hệ thống hàng đợi chạy ổn định

Phần chia sẻ nhấn mạnh những điểm cần nắm khi vận hành thật: visibility timeout phải đủ dài so với thời gian xử lý, xử lý phải idempotent vì một message có thể được nhận hơn một lần, message lỗi lặp lại cần chuyển sang dead-letter queue để không chặn hàng đợi, và cần theo dõi độ dài hàng đợi để biết hệ thống có đang bị dồn việc hay không.

#### Kết nối cộng đồng

Sự kiện cho thấy sinh viên và thực tập sinh cũng có thể đứng chung sân khấu với kỹ sư doanh nghiệp khi có dự án thật để kể. Sau các phần trình bày là thời gian trao đổi trực tiếp với diễn giả về dự án của từng người.

### Bài học rút ra

- Một kiến trúc thuyết phục nhất khi được kể cùng bài toán thật và các lần phải sửa khi chạy thật.
- Hàng đợi giúp tách rời và chịu tải, nhưng chỉ đáng tin khi có visibility timeout đúng, xử lý idempotent và dead-letter queue.
- Giám sát (độ dài hàng đợi, lỗi lặp lại) là một phần của thiết kế, không phải việc làm sau.

### Áp dụng vào dự án của em

- Chủ đề này khớp với bài blog SQS + Lambda + DLQ của nhóm em: em đối chiếu lại các nguyên nhân message rơi vào DLQ với những gì diễn giả trình bày.
- Trong dự án Nutrition E-Commerce, IPN của VNPAY được xử lý idempotent (IPN lặp lại trả mã 02, không cập nhật đơn hai lần), cùng tinh thần với việc xử lý message nhận nhiều lần.
- Đơn VNPAY chưa thanh toán đang được hủy bằng tác vụ định kỳ sau 15 phút; nếu hệ thống lớn hơn, đây là chỗ phù hợp để chuyển sang SQS (delay queue) và có DLQ cho các lần xử lý lỗi.
- Khi bảo vệ đồ án, em trình bày kiến trúc theo kiểu "bài toán → quyết định → sự cố → cách sửa" như các diễn giả đã làm.

### Ảnh check-in

:::figure{src="/images/events/event2-checkin.png" alt="event2-checkin" caption="AWS First Cloud AI Journey Community Day – 31/10/2026"}
