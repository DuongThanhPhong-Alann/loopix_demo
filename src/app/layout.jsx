import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata = {
  title: 'Loopix Virtual 360 Tour - Vietnam',
  description: 'Sense & Scene Studio virtual tour 360 services',
  icons: {
    icon: '/loopix-orb.png',
    apple: '/loopix-orb.png',
  },
};

export default function RootLayout({ children }) {
  const languageBootstrap = `
    (function () {
      try {
        function getActiveLang() {
          return window.localStorage.getItem('loopix-lang') || 'vi';
        }
        var lang = getActiveLang();
        document.documentElement.setAttribute('data-active-lang', lang || 'vi');
        window.__loopixTranslations = {
          'Trang chủ': 'Home',
          'Giới thiệu': 'About',
          'Dự án': 'Projects',
          'Bảng giá': 'Pricing',
          'Báo giá': 'Quote',
          'Tạp chí': 'Magazine',
          'Nhận báo giá cụ thể': 'Get a detailed quote',
          'Xem dự án': 'View projects',
          'Bổ sung hình ảnh minh họa khi có file cập nhật sáng mai.': 'Visual reference will be updated when the new file is available.',
          'Không gian đã kể chuyện bằng 360': 'Spaces Told Through 360',
          'Các khối dự án dùng ảnh đại diện lớn, tag loại không gian và link động đến trang chi tiết.': 'Each project block uses a large cover image, space-type tag, and dynamic link to its detail page.',
          'Tìm hiểu thêm': 'Learn more',
          'Bảng giá theo gói': 'Package Pricing',
          'Áp dụng cho Khách sạn - Resort - Homestay - CHDV. Giá đã bao gồm VAT 10%, cập nhật theo file bảng giá tháng 6/2025.': 'Applicable to hotels, resorts, homestays, and serviced apartments. Prices include 10% VAT, updated from the June 2025 pricing file.',
          '27.9 triệu': 'VND 27.9M',
          '32.9 triệu': 'VND 32.9M',
          '37.5 triệu': 'VND 37.5M',
          '44.9 triệu': 'VND 44.9M',
          'Nội thành: 27.900.000đ · Ngoại thành: 30.500.000đ': 'Urban: VND 27,900,000 · Suburban: VND 30,500,000',
          'Nội thành: 32.900.000đ · Ngoại thành: 34.000.000đ': 'Urban: VND 32,900,000 · Suburban: VND 34,000,000',
          'Nội thành: 37.500.000đ · Ngoại thành: 39.900.000đ': 'Urban: VND 37,500,000 · Suburban: VND 39,900,000',
          'Nội thành: 44.900.000đ · Ngoại thành: 45.900.000đ': 'Urban: VND 44,900,000 · Suburban: VND 45,900,000',
          'Nhỏ ≤15 phòng': 'Small properties ≤15 rooms',
          '10-20 điểm 360° Walkthrough': '10-20 360° walkthrough points',
          '3-5 loại phòng': '3-5 room types',
          'Điều hướng cơ bản': 'Basic navigation',
          'Bảo hành kỹ thuật 3 tháng': '3-month technical warranty',
          '2-3 sao · 15-50 phòng': '2-3 stars · 15-50 rooms',
          '21-30 điểm 360° Walkthrough': '21-30 360° walkthrough points',
          '6-12 phòng + tiện ích chính': '6-12 rooms + key amenities',
          'Hotspot thông tin phòng, giá, tiện nghi': 'Hotspots for room, price, and amenity information',
          'Việt + Anh, hỗ trợ VR, link OTA cơ bản': 'Vietnamese + English, VR support, basic OTA links',
          '4-5 sao · 50-100 phòng': '4-5 stars · 50-100 rooms',
          '31-60 điểm 360° Walkthrough': '31-60 360° walkthrough points',
          'Full phòng + toàn bộ tiện ích': 'All rooms + all amenities',
          'CTA đặt phòng + link OTA từng phòng': 'Booking CTA + OTA links per room',
          'Custom branding, 3 ngôn ngữ, tích hợp sâu': 'Custom branding, 3 languages, deep integration',
          'Resort 100+ phòng': 'Resorts with 100+ rooms',
          '61-100 điểm 360° Walkthrough': '61-100 360° walkthrough points',
          'Full phòng + khu ngoại cảnh': 'All rooms + outdoor areas',
          'CTA + video + form + AI chat': 'CTA + video + form + AI chat',
          'Thiết kế độc quyền 5 sao, bảo hành 12 tháng': 'Exclusive 5-star design, 12-month warranty',
          'Xem chi tiết bảng giá': 'View detailed pricing',
          'Hãy để chúng tôi kết nối bạn': 'Let Us Connect With You',
          'Form gửi bằng Ajax, có validate email và số điện thoại. SMTP/CRM tự động: bổ sung sau khi có thông tin máy chủ mail hoặc endpoint CRM.': 'Ajax form submission with email and phone validation. SMTP/CRM automation will be added after mail server or CRM endpoint details are available.',
          'Thành phố': 'City',
          'Phân loại không gian': 'Space type',
          'Diện tích': 'Area',
          'Số phòng': 'Rooms',
          'Họ Tên': 'Full name',
          'Họ tên': 'Full name',
          'SĐT': 'Phone',
          'Hà Nội': 'Hanoi',
          'Đà Nẵng': 'Da Nang',
          'Đồng Nai': 'Dong Nai',
          'Khách sạn': 'Hotel',
          'Căn hộ': 'Apartment',
          'Nhà đất': 'Real Estate',
          'Văn phòng': 'Office',
          'Dưới 100m2': 'Under 100m2',
          'Trên 800m2': 'Over 800m2',
          'Trên 30': 'Over 30',
          'Du lịch - Bất động sản - Công nghệ': 'Travel - Real Estate - Technology',
          'Tư liệu hình ảnh và video time-lapse từ dự án. CMS quản trị nội dung: bổ sung sau khi chọn nền tảng admin.': 'Project visuals and time-lapse footage. Content management CMS will be added after the admin platform is selected.',
          'Du lịch': 'Travel',
          'Bất động sản': 'Real Estate',
          'Công nghệ': 'Technology',
          'Trải nghiệm lưu trú bắt đầu từ một cú kéo chuột': 'The stay experience begins with a single drag',
          'Virtual tour giúp người mua đọc không gian trước khi đến xem': 'Virtual tours help buyers understand a space before visiting',
          'Time-lapse và 360 tour trong quy trình bán hàng hiện đại': 'Time-lapse and 360 tours in the modern sales journey',
          'Bổ sung': 'To be updated',
          'Gửi thông tin nhanh': 'Quick inquiry',
          'Nhận tư vấn': 'Get consultation',
          'Vui lòng kiểm tra email và số điện thoại.': 'Please check your email and phone number.',
          'Đang gửi...': 'Sending...',
          'Không gửi được thông tin.': 'Could not submit your information.',
          'Đã nhận thông tin. CRM/SMTP: bổ sung sau khi cấu hình hệ thống.': 'Information received. CRM/SMTP will be added after system configuration.',
          'Quay lại dự án': 'Back to projects'
        };
        function applyManualTranslations() {
          var activeLang = getActiveLang();
          var translations = window.__loopixTranslations || {};
          var root = document.getElementById('legacy-content') || document.querySelector('main') || document.body;
          document.documentElement.lang = activeLang;
          document.documentElement.setAttribute('data-active-lang', activeLang || 'vi');
          Array.prototype.forEach.call(root.querySelectorAll('[data-vi][data-en]'), function (node) {
            node.textContent = node.getAttribute('data-' + activeLang) || node.getAttribute('data-vi') || '';
          });
          Array.prototype.forEach.call(root.querySelectorAll('*'), function (node) {
            if (node.childElementCount !== 0 || node.hasAttribute('data-vi')) return;
            var original = node.getAttribute('data-text-vi') || (node.textContent || '').trim();
            if (!node.getAttribute('data-text-vi')) node.setAttribute('data-text-vi', original);
            node.textContent = activeLang === 'en' && translations[original] ? translations[original] : original;
          });
          Array.prototype.forEach.call(root.querySelectorAll('label'), function (node) {
            var input = node.querySelector('input');
            if (!input) return;
            var original = node.getAttribute('data-text-vi') || (node.textContent || '').trim();
            if (!node.getAttribute('data-text-vi')) node.setAttribute('data-text-vi', original);
            var textNode = Array.prototype.find.call(node.childNodes, function (child) {
              return child.nodeType === 3 && child.textContent.trim();
            });
            if (textNode) {
              textNode.textContent = ' ' + (activeLang === 'en' && translations[original] ? translations[original] : original);
            }
          });
          Array.prototype.forEach.call(root.querySelectorAll('input[placeholder]'), function (node) {
            var original = node.getAttribute('data-placeholder-vi') || node.getAttribute('placeholder');
            if (!node.getAttribute('data-placeholder-vi')) node.setAttribute('data-placeholder-vi', original);
            node.setAttribute('placeholder', activeLang === 'en' && translations[original] ? translations[original] : original);
          });
          Array.prototype.forEach.call(root.querySelectorAll('.lang-btn'), function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === activeLang);
          });
        }
        window.__loopixApplyTranslations = applyManualTranslations;
        window.__loopixInitLangSwitches = function () {
          if (document.documentElement.getAttribute('data-lang-switch-ready') === 'true') return;
          document.documentElement.setAttribute('data-lang-switch-ready', 'true');
          var activeLang = getActiveLang();
          document.documentElement.setAttribute('data-active-lang', activeLang || 'vi');
          Array.prototype.forEach.call(document.querySelectorAll('.lang-btn'), function (btn) {
            btn.addEventListener('click', function () {
              var nextLang = btn.getAttribute('data-lang') || 'vi';
              window.localStorage.setItem('loopix-lang', nextLang);
              document.documentElement.setAttribute('data-active-lang', nextLang);
              applyManualTranslations();
            });
          });
          applyManualTranslations();
        };
        if (document.readyState === 'complete') {
          window.setTimeout(window.__loopixInitLangSwitches, 100);
        } else {
          window.addEventListener('load', function () {
            window.setTimeout(window.__loopixInitLangSwitches, 100);
          }, { once: true });
        }
      } catch (error) {}
    })();
  `;

  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playwrite+US+Trad:wght@300;400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script id="loopix-language-bootstrap" strategy="beforeInteractive">
          {languageBootstrap}
        </Script>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
