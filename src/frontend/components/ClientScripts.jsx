'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import Swiper from 'swiper';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

export default function ClientScripts() {
  useEffect(() => {
    let mounted = true;

    window.googleTranslateElementInit = function googleTranslateElementInit() {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'vi',
          includedLanguages: 'vi,en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element',
      );
    };

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
      initMultiSelects();
      initQuoteForm();
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Script
      src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      strategy="afterInteractive"
    />
  );
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

function initLegacyInteractions(AOS) {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return undefined;
  };

  const currentLangCookie = getCookie('googtrans');
  const activeLang = currentLangCookie ? currentLangCookie.split('/').pop() : 'vi';

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === activeLang);

    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      document.cookie = `googtrans=/vi/${lang}; path=/`;
      document.cookie = `googtrans=/vi/${lang}; domain=${location.hostname}; path=/`;
      window.location.reload();
    });
  });

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
    { slug: 'homestay-x', tag: 'Homestay', image: '/Virtual360%20Tour.jpg', fallback: '/Insta360%20Camera_Travel.jpeg', title: 'Homestay X', delay: 0 },
    { slug: 'hotel-y', tag: 'Hotel', image: '/Insta360%20Camera_Travel.jpeg', fallback: '/Coworking_Virtual360.jpg', title: 'Hotel Y', delay: 100 },
    { slug: 'love-hotel-z', tag: 'Love Hotel', image: '/Insta360%20Camera.jpg', fallback: '/Insta360%20camera(1).jpg', title: 'Love Hotel Z', delay: 200 },
    { slug: 'resort-nam', tag: 'Resort', image: '/Coworking_Virtual360.jpg', fallback: '/Insta360%20Camera_Travel.jpeg', title: 'Resort Nam', delay: 300 },
    { slug: 'coworking-a', tag: 'Co-working space', image: '/Coworking_Virtual360.jpg', fallback: '/Insta360%20Camera_Travel.jpeg', title: 'Co-working A', delay: 400 },
    { slug: 'apartment-b', tag: 'Apartment', image: '/Insta360%20camera(1).jpg', fallback: '/Virtual360%20Tour.jpg', title: 'Apartment B', delay: 500 },
  ];

  gallery.innerHTML = projects
    .map(
      (project) => `
        <a class="g-item project-card" href="/projects/${project.slug}">
          <img src="${project.image}" onerror="this.src='${project.fallback}'" alt="${project.title}" loading="lazy" decoding="async" />
          <div class="g-overlay project-overlay">
            <span class="project-tag">${project.tag}</span>
            <strong>${project.title}</strong>
            <em>Tìm hiểu thêm</em>
          </div>
        </a>
      `,
    )
    .join('');

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
      status.textContent = 'Vui lòng kiểm tra email và số điện thoại.';
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    form.querySelectorAll('.multi-select').forEach((select) => {
      const name = select.dataset.name;
      if (!name) return;
      payload[name] = [...select.querySelectorAll('input:checked')].map((input) => input.value);
    });

    try {
      status.textContent = 'Đang gửi...';
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Không gửi được thông tin.');
      form.reset();
      document.querySelectorAll('.multi-select button').forEach((button) => {
        button.textContent = button.textContent?.replace(/ \(\d+\)$/, '') || '';
      });
      status.textContent = 'Đã nhận thông tin. CRM/SMTP: bổ sung sau khi cấu hình hệ thống.';
    } catch (error) {
      status.textContent = error.message;
    }
  });
}
