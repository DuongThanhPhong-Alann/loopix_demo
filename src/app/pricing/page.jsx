import ClientScripts from '../../frontend/components/ClientScripts';
import PricingScrollSpy from './PricingScrollSpy';

const hotelPlans = [
  {
    id: 'hotel-basic',
    name: 'Basic',
    inner: '27.900.000đ',
    outer: '30.500.000đ',
    scope: 'Nhỏ ≤15 phòng',
    nodes: '10-20',
    areas: '3-5 loại phòng',
    hotspot: 'Điều hướng cơ bản',
    brand: 'Template chuẩn, logo + màu mặc định',
    language: 'Tiếng Việt',
    timeline: '5-7 ngày',
    warranty: '3 tháng',
  },
  {
    id: 'hotel-standard',
    name: 'Standard',
    inner: '32.900.000đ',
    outer: '34.000.000đ',
    scope: '2-3 sao / 15-50 phòng',
    nodes: '21-30',
    areas: '6-12 phòng + tiện ích chính',
    hotspot: 'Thông tin phòng + giá + tiện nghi',
    brand: 'Template chuẩn, logo + màu theo khách sạn',
    language: 'Việt + Anh',
    timeline: '7-10 ngày',
    warranty: '6 tháng',
  },
  {
    id: 'hotel-premium',
    name: 'Premium',
    inner: '37.500.000đ',
    outer: '39.900.000đ',
    scope: '4-5 sao / 50-100 phòng',
    nodes: '31-60',
    areas: 'Full phòng + toàn bộ tiện ích',
    hotspot: 'CTA đặt phòng + link OTA từng phòng',
    brand: 'Custom branding hoàn chỉnh',
    language: '3 ngôn ngữ',
    timeline: '10-15 ngày',
    warranty: '6 tháng',
  },
  {
    id: 'hotel-luxury',
    name: 'Luxury',
    inner: '44.900.000đ',
    outer: '45.900.000đ',
    scope: 'Resort 100+ phòng',
    nodes: '61-100',
    areas: 'Full phòng + khu ngoại cảnh',
    hotspot: 'CTA + video + form + AI chat',
    brand: 'Thiết kế độc quyền 5 sao',
    language: '4+ ngôn ngữ',
    timeline: '15-20 ngày',
    warranty: '12 tháng',
  },
];

const educationPlans = [
  ['Basic', '21.500.000đ', '30.500.000đ', '10-20', '3-5 phòng chức năng + sân chính', 'Điều hướng cơ bản'],
  ['Standard', '25.500.000đ', '34.000.000đ', '21-30', '10-15 phòng + khu tiện ích', 'Thông tin phòng học + lịch học cơ bản'],
  ['Premium', '31.500.000đ', '39.900.000đ', '31-60', 'Toàn trường + ký túc xá + lab', 'Form tuyển sinh + link website + video giới thiệu'],
  ['Luxury', '37.900.000đ', '45.500.000đ', '60-100', 'Full campus + tất cả cơ sở', 'CTA đăng ký + chatbot hỗ trợ + link học liệu'],
];

const addons = [
  ['Điểm 360° bổ sung (Insta360)', 'điểm', '60.000 - 90.000đ'],
  ['Flycam 360° - ảnh trên không', 'điểm', '2.500.000 - 4.000.000đ'],
  ['Giấy phép bay UAV', 'dự án', '3.000.000 - 5.000.000đ'],
  ['Video 360° Panorama', 'video', '1.000.000 - 1.500.000đ'],
  ['Video 360° Panorama Timelapse', 'video', '1.000.000 - 3.000.000đ'],
  ['Video highlight cinematic', 'video', '2.500.000 - 6.000.000đ'],
  ['Hotspot nâng cao thông tin / CTA', 'gói', '1.000.000 - 2.000.000đ'],
  ['Form đăng ký đơn giản email', 'lần', '500.000 - 1.000.000đ'],
  ['Tích hợp CRM + auto-reply', 'lần', '1.000.000 - 2.000.000đ'],
  ['Floorplan 2D cơ bản', 'bản đồ', '1.000.000 - 2.000.000đ'],
  ['Floorplan 2D + radar vị trí', 'bản đồ', '2.000.000 - 3.000.000đ'],
  ['Floorplan 3D Interactive', 'bản đồ', '4.000.000 - 6.000.000đ'],
  ['AR Navigation', 'gói', '5.000.000 - 12.000.000đ'],
  ['Custom branding hoàn chỉnh', 'dự án', '2.000.000 - 5.000.000đ'],
  ['Thiết kế độc quyền 5 sao / UI-UX', 'gói', '5.000.000 - 10.000.000đ'],
  ['Voice-over / MC ảo', 'gói', '1.800.000 - 3.500.000đ'],
  ['Thêm ngôn ngữ', 'ngôn ngữ', '2.000.000 - 4.000.000đ'],
  ['Landing page riêng cho tour', 'trang', '1.500.000 - 3.500.000đ'],
  ['Website hoàn chỉnh', 'dự án', '7.000.000 - 18.000.000đ'],
  ['Tích hợp booking engine (PMS)', 'dự án', '2.500.000 - 6.000.000đ'],
  ['OTA Optimization', 'gói', '1.500.000 - 3.000.000đ'],
];

export default function PricingPage() {
  return (
    <>
      <header id="header" className="pricing-header">
        <div className="wrap nav">
          <a href="/" className="logo" aria-label="Loopix home">
            <span className="logo-mark"><img src="/loopix-orb.png" alt="" /></span>
            <span className="logo-wordmark"><img src="/loopix-wordmark.png" alt="Loopix" /></span>
          </a>
          <nav className="nav-links" aria-label="Pricing navigation">
            <a href="#hotel-pricing" className="active">Hotel / Resort / Homestay</a>
            <a href="#education-pricing">Education / Co-working</a>
            <a href="#addons-pricing">Add-ons</a>
          </nav>
          <div className="nav-r">
            <a href="/" className="btn-contact">Trang chủ</a>
            <button className="burger" id="burger" aria-label="Open menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
      <main className="pricing-page">
        <section className="hero hero-tour pricing-detail-hero">
          <div className="swiper hero-swiper" aria-label="Pricing showcase">
            <div className="swiper-wrapper">
              <div className="swiper-slide hero-slide"><img src="/loopix%20hotel.png" alt="Dự án khách sạn" loading="eager" /></div>
              <div className="swiper-slide hero-slide"><img src="/loopix%20resort.png" alt="Không gian resort" loading="lazy" /></div>
              <div className="swiper-slide hero-slide"><img src="/loopix%20homestay.png" alt="Dự án homestay 360" loading="lazy" /></div>
            </div>
            <div className="swiper-pagination"></div>
          </div>
          <div className="hero-overlay"></div>
          <div className="wrap hero-layout">
            <div className="hero-content">
              <span className="eyebrow">Pricing detail</span>
              <h1>Bảng giá chi tiết</h1>
              <p>Giá đã bao gồm VAT 10%, cập nhật theo file bảng giá tháng 6/2025.</p>
            </div>
          </div>
        </section>

        <section className="pricing-detail-section" id="hotel-pricing">
          <div className="wrap">
            <div className="table-head">
              <span className="eyebrow">Hotel / Resort / Homestay</span>
            </div>
            <div className="detail-plan-grid">
              {hotelPlans.map((plan) => (
                <article className="detail-plan" id={plan.id} key={plan.id}>
                  <span>{plan.name}</span>
                  <h3>{plan.inner}</h3>
                  <p>Ngoại thành: {plan.outer}</p>
                  <dl>
                    <div><dt>Quy mô</dt><dd>{plan.scope}</dd></div>
                    <div><dt>Điểm 360°</dt><dd>{plan.nodes}</dd></div>
                    <div><dt>Khu vực quay</dt><dd>{plan.areas}</dd></div>
                    <div><dt>Hotspot</dt><dd>{plan.hotspot}</dd></div>
                    <div><dt>UI/UX</dt><dd>{plan.brand}</dd></div>
                    <div><dt>Ngôn ngữ</dt><dd>{plan.language}</dd></div>
                    <div><dt>Thời gian</dt><dd>{plan.timeline}</dd></div>
                    <div><dt>Bảo hành</dt><dd>{plan.warranty}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pricing-detail-section alt" id="education-pricing">
          <div className="wrap">
            <div className="table-head">
              <span className="eyebrow">Education / Co-working</span>
            </div>
            <div className="pricing-table-wrap">
              <table className="pricing-table">
                <thead><tr><th>Gói</th><th>Nội thành</th><th>Ngoại thành</th><th>Điểm 360°</th><th>Phạm vi</th><th>Tương tác</th></tr></thead>
                <tbody>{educationPlans.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="pricing-detail-section" id="addons-pricing">
          <div className="wrap">
            <div className="table-head">
              <span className="eyebrow">Add-ons</span>
            </div>
            <div className="pricing-table-wrap">
              <table className="pricing-table addon-table">
                <thead><tr><th>Dịch vụ</th><th>Đơn vị</th><th>Giá</th></tr></thead>
                <tbody>{addons.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>
        <footer>
          <div className="wrap footer-bottom">
            <a href="/" className="logo"><span className="logo-mark"><img src="/loopix-orb.png" alt="" /></span><span className="logo-wordmark"><img src="/loopix-wordmark.png" alt="Loopix" /></span></a>
            <div className="footer-socials">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>
            <div className="foot-b">
              <span>Copyright © 2026 Sense & Scene Studio. All right reserved.</span>
              <span>Loopix Virtual 360 Tour — Vietnam</span>
            </div>
          </div>
        </footer>
      </main>
      <ClientScripts />
      <PricingScrollSpy />
    </>
  );
}
