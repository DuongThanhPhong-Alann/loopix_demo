# Loopix implementation status

## 0. Logo / Brand

- Xong: đã tạo `public/loopix-orb.png` từ file logo chính thức, tách nền ngoài khối tròn để thay chữ `L`.
- Xong: đã thay logo ở header/footer trang chủ và trang `/pricing`, chữ hiển thị là `Loopix` theo mẫu cung cấp.
- Xong: đã chuyển chữ `Loopix` trong logo sang ảnh nền trong suốt `public/loopix-wordmark.png`, tách trực tiếp từ file screenshot chữ Loopix do khách cung cấp, không dựng lại bằng font.
- Xong: toàn site dùng font `Plus Jakarta Sans`; màu chữ chính trên nền trắng là `#393232`.
- Xong: các thành phần nhận diện vẫn giữ palette Blue Zodiac `#112D60` và Submarine `#B6C0C5`.
- Xong: chữ thường trên nền trắng dùng `#393232`; chữ trên slider, ảnh dự án và nền brand xanh/xám dùng trắng để không chìm.
- Xong: hero slider dùng chữ trắng trên overlay tối để không chìm vào ảnh.
- Xong: project grid hiển thị tag và tên dự án sẵn trên ảnh; chỉ nút "Tìm hiểu thêm" hiện khi hover, không còn nền chữ.

## 1. Hero Section

- Xong: hero dùng Swiper slider, có slogan lớn 3 dòng "Không gian / Thời gian / Giá trị".
- Xong: slide đang dùng ảnh mới theo tên trong `public/`: `loopix hotel.png`, `loopix resort.png`, `loopix homestay.png`.
- Bổ sung: thay bằng video/ảnh virtual tour 360 chất lượng cao WebP/MP4 khi Thái cung cấp.

## 2. About Us

- Xong: bên trái có nội dung sứ mệnh dịch vụ Virtual Tour 360.
- Xong: bên phải có slogan lớn "Chúng tôi lắng nghe - Hình ảnh cất tiếng".
- Xong: đã bố cục lại About theo mẫu: bên trái là phần giới thiệu, bên phải dùng ảnh `public/nghe.jpg`; quote dùng text thật với font script để không bị vỡ nét.

## 3. Project Grid

- Xong: grid dự án dùng ảnh lớn, tag loại không gian, hover phóng to `scale(1.05)` và hiện nút "Tìm hiểu thêm".
- Xong: mỗi project card là link động dạng `/projects/{slug}` và có trang chi tiết placeholder.
- Xong: đã cập nhật ảnh dự án theo tên mới trong `public/`: homestay, hotel, love hotel, resort, co-working, apartment.

## 4. Bảng Giá Theo Gói

- Xong: có 4 thẻ đặt ngang hàng trên desktop.
- Xong: gói Standard được làm nổi bật nhưng đã giảm scale để không đè/tràn layout.
- Xong: đã cập nhật giá từ `public/BẢNG GIÁ.xlsx`, sheet `BẢNG GIÁ DỰ KIẾN (THEO GÓI)`, nhóm `KHÁCH SẠN · RESORT · HOMESTAY · CHDV`.
- Xong: trang chủ hiển thị 4 card như mẫu gồm giá + các bullet chính, chỉ có một nút chung `Xem chi tiết bảng giá` ở dưới cụm card.
- Xong: đã đổi phân tách ngành từ dấu chấm giữa sang dấu gạch ngang để dễ đọc hơn.
- Xong: đã giảm cỡ chữ giá trong card để tránh tràn ô.
- Xong: trang `/pricing` có header cố định, nút `Trang chủ`, và hero slider nền ảnh giống trang chủ.
- Xong: section đầu của trang `/pricing` chỉ dùng nhãn `Hotel / Resort / Homestay`, bỏ dòng tiếng Việt dài.
- Xong: đã bỏ nút `Trang chủ` lặp trong hero, chỉ giữ nút `Trang chủ` trên header.
- Xong: đã giảm cỡ giá trong card chi tiết để không tràn khung.
- Xong: header `/pricing` chỉ còn logo, `Hotel / Resort / Homestay`, `Education / Co-working`, `Add-ons`, và nút `Trang chủ`.
- Xong: các section `/pricing` chỉ dùng nhãn `Hotel / Resort / Homestay`, `Education / Co-working`, `Add-ons`, bỏ tiêu đề tiếng Việt phụ.
- Xong: đã thêm thanh footer cuối trang `/pricing` giống trang chủ.
- Xong: nav `/pricing` tự đổi gạch chân active theo section đang lướt tới.
- Xong: nhãn section `/pricing` đã đổi thành chữ lớn màu xanh.
- Xong: đã chuyển bảng giá `TRƯỜNG HỌC · TRUNG TÂM ĐÀO TẠO · TRƯỜNG MẦM NON · CO-WORKING` sang trang `/pricing`.
- Xong: đã chuyển bảng `DỊCH VỤ BỔ SUNG (ADD-ONS)` sang trang `/pricing`.
- Bổ sung: gói Enterprise theo yêu cầu nếu cần hiển thị thành thẻ riêng hoặc popup liên hệ.

## 5. Bộ Lọc Thông Minh / Nhận Báo Giá

- Xong: form có Họ Tên, Email, SĐT.
- Xong: có 4 dropdown checkbox nhiều lựa chọn: Thành phố, Phân loại không gian, Diện tích, Số phòng.
- Xong: gửi Ajax tới `/api/quote` không reload trang.
- Xong: validate email và số điện thoại ở frontend/backend.
- Bổ sung: SMTP/CRM tự động sau khi có thông tin máy chủ mail hoặc endpoint CRM.

## 6. Magazine Section

- Xong: có 3 khối nội dung với từ khóa "Du lịch - Bất động sản - Công nghệ".
- Xong: tiêu đề Magazine đã giảm cỡ để "Công nghệ" không bị xuống dòng trên desktop.
- Xong: dùng hình ảnh tư liệu hiện có.
- Bổ sung: link bài viết thật, video time-lapse thật và CMS admin sau khi chọn nền tảng quản trị.

## 7. Footer Lead Form

- Xong: có logo, social links, form lead nhanh.
- Xong: copyright "Copyright © 2026 Sense & Scene Studio. All right reserved."
- Xong: dòng phải "Loopix Virtual 360 Tour — Vietnam".
- Xong: footer dùng nền chủ đạo của website và chữ màu xanh thương hiệu.
- Bổ sung: hotline và link mạng xã hội thật.

## 8. Tương Tác / Animation

- Xong: cuộn trang mượt bằng `scroll-behavior: smooth` và scroll JS có `behavior: 'smooth'`.
- Xong: ảnh ngoài hero đầu trang dùng `loading="lazy"` và ảnh render động có `decoding="async"`.
- Xong: hamburger menu mobile bung dạng panel lớn trượt từ cạnh phải bằng class `.is-active` và `transform: translateX()`.

## 9. Quy tắc trang mới

- Trang chi tiết mới phải có header tối giản gồm logo Loopix và nút `Trang chủ`.
- Trang chi tiết mới phải có footer giống các trang hiện tại: logo, social links, copyright và dòng `Loopix Virtual 360 Tour — Vietnam`.
