import 'aos/dist/aos.css';
import './globals.css';

export const metadata = {
  title: 'SaintCons — Thiết Kế & Thi Công Toàn Diện Tại Đồng Nai',
  description: 'SaintCons Architecture & Construction',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
