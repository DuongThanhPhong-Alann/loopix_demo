# Loopix implementation status

## 1. Hero Section

- Xong: hero dùng Swiper slider, có slogan lớn "Không gian - Thời gian - Giá trị."
- Xong: slide đang dùng ảnh sẵn trong `public/`.
- Bổ sung: thay bằng video/ảnh virtual tour 360 chất lượng cao WebP/MP4 khi Thái cung cấp.

## 2. About Us

- Xong: bên trái có nội dung sứ mệnh dịch vụ Virtual Tour 360.
- Xong: bên phải có slogan lớn "Chúng tôi lắng nghe - Hình ảnh cất tiếng".
- Bổ sung: ảnh minh họa mới khi có file cập nhật sáng mai.

## 3. Project Grid

- Xong: grid dự án dùng ảnh lớn, tag loại không gian, hover phóng to `scale(1.05)` và hiện nút "Tìm hiểu thêm".
- Xong: mỗi project card là link động dạng `/projects/{slug}` và có trang chi tiết placeholder.
- Bổ sung: slug/URL thật và dữ liệu dự án chính thức.

## 4. Bảng Giá Theo Gói

- Xong: có 4 thẻ đặt ngang hàng trên desktop.
- Xong: gói Standard được scale lớn hơn 10%.
- Bổ sung: giá chính thức từ Google Sheet sau khi bảng giá được chốt.

## 5. Bộ Lọc Thông Minh / Nhận Báo Giá

- Xong: form có Họ Tên, Email, SĐT.
- Xong: có 4 dropdown checkbox nhiều lựa chọn: Thành phố, Phân loại không gian, Diện tích, Số phòng.
- Xong: gửi Ajax tới `/api/quote` không reload trang.
- Xong: validate email và số điện thoại ở frontend/backend.
- Bổ sung: SMTP/CRM tự động sau khi có thông tin máy chủ mail hoặc endpoint CRM.

## 6. Magazine Section

- Xong: có 3 khối nội dung với từ khóa "Du lịch - Bất động sản - Công nghệ".
- Xong: dùng hình ảnh tư liệu hiện có.
- Bổ sung: link bài viết thật, video time-lapse thật và CMS admin sau khi chọn nền tảng quản trị.

## 7. Footer Lead Form

- Xong: có logo, social links, form lead nhanh.
- Xong: copyright "Copyright © 2026 Sense & Scene Studio. All right reserved."
- Xong: dòng phải "Loopix Virtual 360 Tour — Vietnam".
- Bổ sung: hotline và link mạng xã hội thật.
