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
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  function getActiveLang() {
                    var match = document.cookie.match(/(?:^|; )googtrans=([^;]+)/);
                    var value = match ? decodeURIComponent(match[1]) : '';
                    return value ? value.split('/').pop() : 'vi';
                  }
                  var lang = getActiveLang();
                  document.documentElement.setAttribute('data-active-lang', lang || 'vi');
                  if (lang && lang !== 'vi') {
                    document.documentElement.classList.add('translate-pending');
                    window.setTimeout(function () {
                      document.documentElement.classList.remove('translate-pending');
                    }, 2600);
                  }
                  window.__loopixInitLangSwitches = function () {
                    if (document.documentElement.getAttribute('data-lang-switch-ready') === 'true') return;
                    document.documentElement.setAttribute('data-lang-switch-ready', 'true');
                    var activeLang = getActiveLang();
                    document.documentElement.setAttribute('data-active-lang', activeLang || 'vi');
                    Array.prototype.forEach.call(document.querySelectorAll('.lang-btn'), function (btn) {
                      btn.addEventListener('click', function () {
                        var nextLang = btn.getAttribute('data-lang') || 'vi';
                        document.cookie = 'googtrans=/vi/' + nextLang + '; path=/';
                        document.cookie = 'googtrans=/vi/' + nextLang + '; domain=' + location.hostname + '; path=/';
                        if (nextLang !== 'vi') document.documentElement.classList.add('translate-pending');
                        window.location.reload();
                      });
                    });
                  };
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', window.__loopixInitLangSwitches, { once: true });
                  } else {
                    window.__loopixInitLangSwitches();
                  }
                } catch (error) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playwrite+US+Trad:wght@300;400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
