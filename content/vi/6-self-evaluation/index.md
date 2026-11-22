---
title: "Tự đánh giá"
pre: "6."
weight: 6
status: "ready"
---

Trong thời gian thực tập **09/2026–12/2026 (12 tuần)**, dự án Nền tảng Thương mại Điện tử Dinh dưỡng Cá nhân hóa trên AWS là cơ sở để em tổng hợp kiến thức và nhìn lại quá trình học. Em hướng đến việc hiểu lý do của từng lựa chọn, thử nghiệm có kiểm tra và ghi lại phần cần cải thiện.

| STT | Tiêu chí | Mô tả | Tốt | Khá | Trung bình |
| --- | --- | --- | --- | --- | --- |
| 1 | Kiến thức và kỹ năng chuyên môn | Em từng bước kết nối kiến thức về Terraform, ECS Fargate, PostgreSQL, Cognito và Bedrock thành một kiến trúc có thể triển khai. Em cần tiếp tục học sâu về vận hành và khả năng chịu lỗi. | ☐ | ☐ | ☐ |
| 2 | Khả năng học hỏi | Em chú trọng đọc tài liệu, đối chiếu cấu hình với mã nguồn và dùng kết quả kiểm thử để kiểm tra cách hiểu của mình. Quá trình xử lý quota Bedrock là một ví dụ để nhìn lại cách lựa chọn vùng và model. | ☐ | ☐ | ☐ |
| 3 | Tính chủ động | Em hướng đến cách học có đầu ra cụ thể: cấu hình hạ tầng, tính năng, ca kiểm thử và tài liệu hướng dẫn. Nhật ký quyết định giúp theo dõi các lựa chọn và công việc còn mở. | ☐ | ☐ | ☐ |
| 4 | Tinh thần trách nhiệm | Em coi việc kiểm tra kết quả và ghi rõ hạn chế là một phần của sản phẩm. Với AI, em chú trọng số liệu từ DB, cơ chế fail-closed và giới hạn phạm vi tra cứu. | ☐ | ☐ | ☐ |
| 5 | Tính kỷ luật | Em chú trọng phân tách quyền plan/apply, giữ bí mật ngoài mã nguồn và kiểm tra thay đổi hạ tầng trước khi triển khai. Đây là những thói quen em muốn duy trì khi làm việc với AWS. | ☐ | ☐ | ☐ |
| 6 | Tinh thần cầu tiến | Em nhìn nhận các lần sửa giao diện, mở rộng bộ đánh giá AI và bổ sung kiểm thử là cơ hội cải thiện sản phẩm. Em cần tiếp tục biến mỗi lỗi gặp phải thành một bài học có thể kiểm chứng. | ☐ | ☐ | ☐ |
| 7 | Giao tiếp | Em rèn cách trình bày kiến trúc, lý do chọn công nghệ và các đánh đổi qua tài liệu quyết định và workshop. Em muốn giải thích ngắn gọn hơn để người đọc có thể làm lại từng bước. | ☐ | ☐ | ☐ |
| 8 | Làm việc nhóm | Em nhận thức rằng tài liệu rõ ràng và các bước tái hiện lỗi giúp việc phối hợp hiệu quả hơn. Em cần tiếp tục rèn kỹ năng trao đổi, tiếp nhận góp ý và xác nhận phần việc khi làm cùng người khác. | ☐ | ☐ | ☐ |
| 9 | Tác phong chuyên nghiệp | Em chú trọng bảo vệ dữ liệu cá nhân, trình bày đúng số liệu đã đo và ghi rõ phần chưa xác minh. Em xem sự cẩn trọng này là một phần của tác phong kỹ thuật. | ☐ | ☐ | ☐ |
| 10 | Kỹ năng giải quyết vấn đề | Các tình huống SSO hết hạn, RDS đang dừng, trust policy OIDC và quota Bedrock giúp em học cách kiểm tra từng lớp nguyên nhân. Em hướng đến cách sửa có giải thích và kiểm tra lại kết quả. | ☐ | ☐ | ☐ |
| 11 | Đóng góp cho dự án/nhóm | Dự án có mã Terraform, ứng dụng, kiểm thử và tài liệu làm đầu ra để đối chiếu. Em cần gắn phần việc cá nhân với minh chứng cụ thể khi tổng kết đóng góp. | ☐ | ☐ | ☐ |
| 12 | Tổng thể | Em nhìn nhận quá trình này là một chặng học tập có tiến bộ. Điều em muốn thể hiện là sự kiên trì tìm hiểu, khả năng sửa cách làm khi có dữ kiện mới và ý thức tiếp tục hoàn thiện. | ☐ | ☐ | ☐ |

Dữ kiện đối chiếu ngày **21/11/2026** trong `docs/PROGRESS.md`: 86 test backend, 145 test frontend, 57 test E2E + axe; bộ đánh giá AI 45 câu đạt an toàn 17/17 và tra cứu 27/28. Các số liệu này mô tả kết quả dự án và hỗ trợ việc đối chiếu minh chứng cá nhân.

### Cần cải thiện

- **Học sâu hơn về vận hành AWS.** Em muốn hiểu rõ hơn về phục hồi RDS, log, alarm và chi phí khi ứng dụng chạy liên tục.
- **Kiểm chứng kiến thức bằng thực hành.** Em cần duy trì ghi chú cấu hình, điều kiện thử và kết quả để giải thích được vì sao một cách làm phù hợp.
- **Trình bày kỹ thuật rõ hơn.** Em muốn rèn cách tóm tắt vấn đề, dữ kiện và hướng xử lý trước khi trao đổi.
- **Hoàn thiện kỹ năng phối hợp.** Em cần chủ động xác nhận yêu cầu, tiếp nhận góp ý và ghi rõ phần việc cùng minh chứng.
