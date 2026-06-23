import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import './globals.css';

export const metadata = {
  title: 'Loopix Virtual 360 Tour - Vietnam',
  description: 'Sense & Scene Studio virtual tour 360 services',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
