'use client';

import { useEffect } from 'react';
import Swiper from 'swiper';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

export default function ClientScripts() {
  useEffect(() => {
    let mounted = true;
    const releaseTranslationHold = () => {
      document.documentElement.classList.remove('translate-pending');
    };

    if (window.__loopixInitLangSwitches) {
      window.__loopixInitLangSwitches();
    } else {
      initLanguageSwitches();
    }
    applyManualTranslations();
    syncLanguageButtonClasses();

    import('aos').then(({ default: AOS }) => {
      if (!mounted) return;

      AOS.init({
        duration: 900,
        once: true,
        offset: 30,
        easing: 'ease-out-cubic',
      });

      initLegacyInteractions(AOS);
      initHeroSwiper();
      initHeroTourSwitcher();
      initHeroTourChromeCleanup();
      initMultiSelects();
      initQuoteForm();
    });

    const holdTimeout = window.setTimeout(releaseTranslationHold, 2800);

    return () => {
      mounted = false;
      window.clearTimeout(holdTimeout);
    };
  }, []);

  return null;
}

function getActiveLanguage() {
  return window.localStorage.getItem('loopix-lang') || document.documentElement.dataset.activeLang || 'vi';
}

function syncLanguageButtonClasses() {
  const activeLang = getActiveLanguage();
  document.documentElement.dataset.activeLang = activeLang;
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === activeLang);
  });
}

function applyManualTranslations() {
  const activeLang = getActiveLanguage();
  const translations = window.__loopixTranslations || {};
  const root = document.getElementById('legacy-content') || document.querySelector('main') || document.body;
  document.documentElement.lang = activeLang;
  document.documentElement.dataset.activeLang = activeLang;
  root.querySelectorAll('[data-vi][data-en]').forEach((node) => {
    node.textContent = node.getAttribute(`data-${activeLang}`) || node.getAttribute('data-vi') || '';
  });
  root.querySelectorAll('*').forEach((node) => {
    if (node.childElementCount !== 0 || node.hasAttribute('data-vi')) return;
    const original = node.getAttribute('data-text-vi') || node.textContent?.trim() || '';
    if (!node.getAttribute('data-text-vi')) node.setAttribute('data-text-vi', original);
    node.textContent = activeLang === 'en' && translations[original] ? translations[original] : original;
  });
  root.querySelectorAll('label').forEach((node) => {
    const input = node.querySelector('input');
    if (!input) return;
    const original = node.getAttribute('data-text-vi') || node.textContent?.trim() || '';
    if (!node.getAttribute('data-text-vi')) node.setAttribute('data-text-vi', original);
    const textNode = [...node.childNodes].find((child) => child.nodeType === 3 && child.textContent.trim());
    if (textNode) {
      textNode.textContent = ` ${activeLang === 'en' && translations[original] ? translations[original] : original}`;
    }
  });
  root.querySelectorAll('input[placeholder]').forEach((node) => {
    const original = node.getAttribute('data-placeholder-vi') || node.getAttribute('placeholder') || '';
    if (!node.getAttribute('data-placeholder-vi')) node.setAttribute('data-placeholder-vi', original);
    node.setAttribute('placeholder', activeLang === 'en' && translations[original] ? translations[original] : original);
  });
}

function translateUiText(text) {
  if (getActiveLanguage() !== 'en') return text;
  return window.__loopixTranslations?.[text] || text;
}

function initHeroSwiper() {
  const heroSwiper = document.querySelector('.hero-swiper');
  if (!heroSwiper) return;

  new Swiper(heroSwiper, {
    modules: [Autoplay, EffectFade, Pagination],
    effect: 'fade',
    fadeEffect: { crossFade: true },
    loop: true,
    speed: 900,
    autoplay: {
      delay: 4200,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.hero-swiper .swiper-pagination',
      clickable: true,
    },
  });
}

function initHeroTourSwitcher() {
  const frame = document.querySelector('.hero-tour-iframe');
  const buttons = [...document.querySelectorAll('.hero-tour-switch button[data-tour-src]')];
  if (!frame || buttons.length === 0) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const tourSrc = button.dataset.tourSrc;
      if (!tourSrc || frame.getAttribute('src') === tourSrc) return;

      frame.setAttribute('src', tourSrc);
      frame.setAttribute('title', button.dataset.tourTitle || 'Virtual 360 tour');
      buttons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-selected', String(isActive));
      });
    });
  });
}

function initHeroTourChromeCleanup() {
  const frame = document.querySelector('.hero-tour-iframe');
  if (!frame) return;

  const cleanupCss = `
    [class*="ModalConfirmWrapper"],
    [class*="ModalConfirmWrapper"].show,
    #themeControlbar,
    .copyright,
    .dropdownGroup,
    .dropdownList,
    .dropdownLabel,
    .controlbar-top,
    [class*="ControlbarWrapper"],
    [class*="MapPanelWrapper"],
    [class*="ActionMapWrapper"],
    body > div:last-child[style*="z-index: -99"] {
      display: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
      visibility: hidden !important;
    }

    #__next,
    [class*="TourWrapper"],
    [id^="krpano"] {
      height: 100% !important;
      max-height: 100% !important;
    }
  `;

  const applyCleanup = () => {
    const doc = frame.contentDocument;
    if (!doc?.head) return;

    let style = doc.getElementById('loopix-tour-cleanup');
    if (!style) {
      style = doc.createElement('style');
      style.id = 'loopix-tour-cleanup';
      doc.head.appendChild(style);
    }
    style.textContent = cleanupCss;
  };

  frame.addEventListener('load', () => {
    applyCleanup();
    window.setTimeout(applyCleanup, 600);
    window.setTimeout(applyCleanup, 1800);
  });

  applyCleanup();
}

function initLanguageSwitches() {
  if (document.documentElement.dataset.langSwitchReady === 'true') return;
  document.documentElement.dataset.langSwitchReady = 'true';

  const activeLang = getActiveLanguage();
  document.documentElement.dataset.activeLang = activeLang;

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (!lang) return;
      window.localStorage.setItem('loopix-lang', lang);
      document.documentElement.dataset.activeLang = lang;
      applyManualTranslations();
      syncLanguageButtonClasses();
    });
  });
}

function initLegacyInteractions(AOS) {
  const header = document.getElementById('header');
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', updateHeader);
  updateHeader();

  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');
  const resetBurger = () => {
    if (!burger) return;
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
    burger.setAttribute('aria-expanded', 'false');
    burger.classList.remove('is-active');
    navLinks?.classList.remove('is-active');
    document.body.classList.remove('menu-open');
  };

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('is-active');
      burger.classList.toggle('is-active');
      document.body.classList.toggle('menu-open', navLinks.classList.contains('is-active'));
      burger.setAttribute('aria-expanded', String(navLinks.classList.contains('is-active')));

      const spans = burger.querySelectorAll('span');
      if (navLinks.classList.contains('is-active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        resetBurger();
      }
    });
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const navItems = [...document.querySelectorAll('.nav-links a')];

  const updateActiveNav = () => {
    let current = '';
    const marker = window.scrollY + Math.min(window.innerHeight * 0.4, 320);

    sections.forEach((section) => {
      if (marker >= section.offsetTop) {
        current = section.id || '';
      }
    });

    navItems.forEach((a) => {
      const href = a.getAttribute('href') || '';
      const hash = href.includes('#') ? href.split('#').pop() : '';
      a.classList.toggle('active', Boolean(hash && hash === current));
    });
  };
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav);
  updateActiveNav();

  navItems.forEach((anchor) => {
    anchor.addEventListener('click', function onNavClick(e) {
      const targetId = this.getAttribute('href');
      if (!targetId?.startsWith('#')) return;
      e.preventDefault();
      navItems.forEach((item) => item.classList.toggle('active', item === this));
      resetBurger();

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 82,
          behavior: 'smooth',
        });
      }
    });
  });

  renderProjects(AOS);
}

function renderProjects(AOS) {
  const gallery = document.getElementById('projects-gallery');
  if (!gallery) return;

  const projects = [
    { slug: 'staycation', tag: 'Staycation', image: '/Virtual360%20Tour.jpg', fallback: '/Insta360%20Camera_Travel.jpeg', title: 'Staycation', delay: 0, vi: 'Vượt qua giới hạn của ảnh 2D để lột tả trọn vẹn sự liên kết không gian và tinh thần chữa lành đặc trưng của căn phòng.', en: 'Go beyond flat 2D imagery to showcase the seamless layout and healing atmosphere of your space.' },
    { slug: 'resort', tag: 'Resort', image: '/Villa_Virtual360.png', fallback: '/Insta360%20Camera_Travel.jpeg', title: 'Resort', delay: 100, vi: 'Đưa khách hàng bước vào không gian nghỉ dưỡng đẳng cấp, nơi sự riêng tư được tôn vinh và mỗi góc nhỏ đều mang lại sự tận hưởng tuyệt đối.', en: 'Immerse guests in a world of curated luxury where privacy meets pure architectural indulgence.' },
    { slug: 'hotel', tag: 'Hotel', image: '/Insta360%20Camera_Travel.jpeg', fallback: '/Coworking_Virtual360.jpg', title: 'Hotel', delay: 200, vi: 'Thúc đẩy tỷ lệ chốt phòng tức thì nhờ tính năng tích hợp mượt mà lên Website, Facebook và các sàn OTA.', en: 'Drive instant bookings by integrating immersive virtual tours across your Website, Facebook, and OTAs.' },
    { slug: 'homestay', tag: 'Homestay', image: '/loopix%20homestay.png', fallback: '/Virtual360%20Tour.jpg', title: 'Homestay', delay: 300, vi: 'Cho phép khách hàng tương tác tự do để cảm nhận gu thẩm mỹ và xóa bỏ hoàn toàn nghi ngại về diện tích thực tế nhờ độ chính xác 100%.', en: 'Let guests interactively explore your space with 100% true-to-scale accuracy that eliminates any layout doubts.' },
    { slug: 'love-hotel', tag: 'Love Hotel', image: '/loopix%20love%20hotel.png', fallback: '/Insta360%20Camera.jpg', title: 'Love Hotel', delay: 400, vi: 'Giải mã sự tò mò của khách hàng về không gian thực tế bằng trải nghiệm góc nhìn chiều sâu mà vẫn bảo mật sự riêng tư tuyệt đối.', en: 'Satisfy guest curiosity while maintaining absolute privacy through immersive, high-depth virtual experiences.' },
    { slug: 'co-working-space', tag: 'Co-working Space', image: '/Coworking%20Space_Virtual360.webp', fallback: '/Coworking_Virtual360.jpg', title: 'Co-working Space', delay: 500, vi: 'Khẳng định vị thế dẫn đầu công nghệ hạ tầng, đảm bảo khách thuê hài lòng tuyệt đối vì những gì họ thấy là những gì họ nhận được.', en: "Showcase your modern workspace infrastructure to ensure complete tenant satisfaction with a true 'what-you-see-is-what-you-get' experience." },
    { slug: 'apartment', tag: 'Apartment', image: '/loopix%20apartment.png', fallback: '/Insta360%20camera(1).jpg', title: 'Apartment', delay: 600, vi: 'Tiết kiệm 70% thời gian dẫn khách và thúc đẩy đặt cọc nhanh chóng nhờ khả năng khảo sát chi tiết từ xa.', en: 'Save 70% of viewing time and accelerate deposits by letting remote buyers inspect every corner effortlessly.' },
    { slug: 'real-estate', tag: 'Real Estate', image: '/Real%20estate_Virtual360.jpg', fallback: '/Real%20Estate_Insta360%20Camera.png', title: 'Real Estate', delay: 700, vi: 'Xây dựng niềm tin vững chắc cho người mua bằng cách tích hợp minh bạch thông tin pháp lý và nội thất ngay trong tour.', en: 'Build unshakeable buyer trust by embedding ownership documents and furniture specs directly into your premium virtual tour.' },
  ];
  const lang = getActiveLanguage();

  gallery.innerHTML = projects
    .map(
      (project) => `
        <a class="g-item project-card" href="/projects/${project.slug}" data-aos="fade-up" data-aos-delay="${project.delay}">
          <img src="${project.image}" onerror="this.src='${project.fallback}'" alt="${project.title}" loading="lazy" decoding="async" />
          <div class="g-overlay project-overlay">
            <span class="project-tag">${project.tag}</span>
            <strong>${project.title}</strong>
            <p class="project-desc" data-vi="${project.vi}" data-en="${project.en}">${lang === 'en' ? project.en : project.vi}</p>
            <em>Tìm hiểu thêm</em>
          </div>
        </a>
      `,
    )
    .join('');

  applyManualTranslations();
  AOS.refresh();
}

function initMultiSelects() {
  document.querySelectorAll('.multi-select').forEach((select) => {
    const button = select.querySelector('button');
    const checkboxes = select.querySelectorAll('input[type="checkbox"]');
    const defaultLabel = button?.textContent || '';

    button?.addEventListener('click', () => {
      select.classList.toggle('open');
    });

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const selected = [...checkboxes].filter((item) => item.checked).map((item) => item.value);
        if (button) button.textContent = selected.length ? `${defaultLabel} (${selected.length})` : defaultLabel;
      });
    });
  });

  document.addEventListener('click', (event) => {
    document.querySelectorAll('.multi-select.open').forEach((select) => {
      if (!select.contains(event.target)) select.classList.remove('open');
    });
  });
}

function initQuoteForm() {
  const form = document.getElementById('quote-form');
  const status = document.getElementById('quote-status');
  if (!form || !status) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = '';

    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = translateUiText('Vui lòng kiểm tra email và số điện thoại.');
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    form.querySelectorAll('.multi-select').forEach((select) => {
      const name = select.dataset.name;
      if (!name) return;
      payload[name] = [...select.querySelectorAll('input:checked')].map((input) => input.value);
    });

    try {
      status.textContent = translateUiText('Đang gửi...');
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || translateUiText('Không gửi được thông tin.'));
      form.reset();
      document.querySelectorAll('.multi-select button').forEach((button) => {
        button.textContent = button.textContent?.replace(/ \(\d+\)$/, '') || '';
      });
      status.textContent = translateUiText('Đã nhận thông tin. CRM/SMTP: bổ sung sau khi cấu hình hệ thống.');
    } catch (error) {
      status.textContent = error.message;
    }
  });
}
