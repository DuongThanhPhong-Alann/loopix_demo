# Loopix UI Guidelines

Tai lieu nay ghi lai cac quy chuan giao dien Loopix Virtual 360 Tour / Sense & Scene Studio de nhung lan sua sau giu duoc tinh dong nhat.

## 1. Che Do Hien Thi

- Giao dien co dinh Light Mode.
- Khong them dark mode, theme toggle, auto theme theo system preference, hoac logic luu theme vao `localStorage`.
- Nen trang uu tien mau trang tinh khiet va khoang trang lon.
- Anh kien truc la diem nhan chinh, khong dung nen toi hoac overlay nang lam mat mau anh.

## 2. He Mau

Dung CSS variables trong `src/frontend/styles/global.css` lam nguon chuan:

```css
:root {
  --bg: #ffffff;
  --bg-soft: #f6f8f8;
  --ink: #112d60;
  --ink-2: #244069;
  --soft: #657487;
  --line: rgba(18, 45, 96, 0.12);
  --submarine: #b6c0c5;
  --blue-zodiac: #112d60;
  --accent: #9d6ad7;
}
```

- `--blue-zodiac` la mau chinh cho logo, heading, CTA quan trong.
- `--submarine` dung cho gradient, chi tiet phu, line trang tri.
- `--bg-soft` dung cho section nen phu, form hoac vung can tach nhe.
- Khong tao palette moi neu khong co ly do ro rang.

## 3. Font Chu

- Heading lon `h1`, `h2`, `h3`, logo text dung serif: `Cormorant Garamond`.
- Body, nav, button, form dung sans-serif: `Inter`.
- Text nen mong, uu tien `font-weight: 300` hoac `400`.
- Khong scale font theo viewport width bang cong thuc tuy tien ngoai cac `clamp()` da co.
- Letter spacing khong duoc am.

## 4. Header

Header la thanh fixed/sticky o dinh trang:

- `position: fixed`
- `top: 0`
- `z-index: 1000`
- Co scroll transition: khi scroll, header co class `scrolled`, nen day hon va chieu cao nho hon.

Header bat buoc co:

- Logo Loopix.
- Language switcher `VI / EN`.
- CTA `Contact us` noi bat voi gradient Blue Zodiac/Submarine.
- Hamburger menu cho tablet/mobile.

Khong them nut theme toggle vao header.

## 5. Bo Cuc Va Khoang Trang

- Layout phai thoang, dung white-space lon.
- Section desktop nen co padding doc lon, hien tai theo chuan:

```css
section { padding: clamp(96px, 12vw, 180px) 0; }
```

- Noi dung chinh can nam trong `.wrap`.
- Khong dat card long trong card.
- Section nen la band full-width hoac layout khong khung; card chi dung cho item lap lai, form, modal, hoac tool can frame.

## 6. Grid Du An

Gallery du an dung asymmetric grid:

- Khong xep anh thanh hang deu nhau.
- Dung `display: grid`, `grid-template-columns: repeat(12, 1fr)`, `grid-auto-flow: dense`.
- Tung anh co `grid-column` va `grid-row` khac nhau de tao nhip dieu.
- Mobile chuyen ve 1 cot, moi anh giu aspect ratio on dinh.

## 7. Hinh Anh

- Uu tien anh kien truc that hoac asset trong `public/`.
- Anh phai ro, dung san pham/cong trinh/khong gian that.
- Tranh overlay den, blur nang, hoac anh stock chung chung.
- Anh trong hero va gallery can dung `object-fit: cover`.

## 8. Nut Va Tuong Tac

- CTA chinh dung Blue Zodiac, chu trang.
- Button phu nen trong/nen trang, border nhe theo `--line`.
- Button dung border radius tron lon `999px` vi hien tai he CTA dang theo dang pill.
- Hover nen tinh te: doi mau, shadow nhe, translate nho.

## 9. Responsive

- Duoi `1100px`: nav links an, hamburger hien.
- Duoi `760px`: gallery ve 1 cot, button hero full-width, anh section ve aspect ratio `4 / 3`.
- Text khong duoc tran container tren mobile.
- Header mobile phai giu duoc logo, CTA va hamburger trong mot hang.

## 10. Khi Them Section Moi

Truoc khi code section moi:

1. Dung lai `.wrap`, `.sec-head`, `.eyebrow`, `.btn` neu phu hop.
2. Dung serif cho heading, sans-serif cho noi dung.
3. Chon nen `--bg` hoac `--bg-soft`, khong tao mau nen moi tuy tien.
4. Neu co anh, can co kich thuoc/aspect ratio on dinh de tranh layout shift.
5. Kiem tra desktop va mobile sau khi sua.

## 11. File Lien Quan

- Markup chinh: `src/frontend/legacy/index.html`
- Style chinh: `src/frontend/styles/global.css`
- Script tuong tac: `src/frontend/components/ClientScripts.jsx`
- Script legacy neu mo HTML truc tiep: `src/frontend/legacy/main.js`
- Font import Next layout: `src/app/layout.jsx`
